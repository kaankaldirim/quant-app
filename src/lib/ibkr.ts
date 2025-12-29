import { IBApi, EventName, ErrorCode, Contract } from "@stoqey/ib";

// Singleton implementation to prevent multiple connections in Next.js dev mode
class IBKRService {
    private static instance: IBKRService;
    private ib: IBApi;
    private isConnected: boolean = false;
    private marketDataCache: Record<string, { price: number; close: number }> = {};

    private constructor() {
        this.ib = new IBApi({
            host: "127.0.0.1",
            port: 4001,
            clientId: Math.floor(Math.random() * 1000), // Random ID to avoid collisions
        });

        this.ib.on(EventName.error, (err: Error, code: ErrorCode, reqId: number) => {
            console.error(`IBKR Error: ${err.message} - Code: ${code} - ReqId: ${reqId}`);
        });

        this.ib.on(EventName.connected, () => {
            console.log("Connected to IBKR TWS on port 4001");
            this.isConnected = true;
        });

        // Listen for price updates
        this.ib.on(EventName.tickPrice, (reqId, field, value) => {
            // Field 4 = Last Price, Field 9 = Close Price
            const symbol = this.reqIdToSymbol[reqId];
            if (!symbol) return;

            if (!this.marketDataCache[symbol]) {
                this.marketDataCache[symbol] = { price: 0, close: 0 };
            }

            if (field === 4) { // Last
                this.marketDataCache[symbol].price = value;
            } else if (field === 9) { // Close
                this.marketDataCache[symbol].close = value;
            }
        });
    }

    private reqIdToSymbol: Record<number, string> = {};
    private nextReqId = 1000;

    public static getInstance(): IBKRService {
        if (!IBKRService.instance) {
            IBKRService.instance = new IBKRService();
        }
        return IBKRService.instance;
    }

    public async connect() {
        if (!this.isConnected) {
            this.ib.connect();
            // Give it a moment to connect
            await new Promise(resolve => setTimeout(resolve, 1000));
        }
    }

    public getMarketData(ticker: string): { price: number; close: number } | null {
        // If we already have live data, return it
        if (this.marketDataCache[ticker] && this.marketDataCache[ticker].price > 0) {
            return this.marketDataCache[ticker];
        }

        // Prevent spamming requests for the same ticker
        // (In a real scenario, we might want to allow re-requesting snapshot if data is stale, 
        // but for now we trust the first request or manual re-trigger from frontend)
        // Note: For true snapshot behavior on re-trigger, we might strictly not check activeSubscriptions here
        // if we want to force a refresh. But let's keep it simple.

        const reqId = this.nextReqId++;
        this.reqIdToSymbol[reqId] = ticker;

        const contract: Contract = {
            symbol: ticker,
            secType: "STK" as any, // Cast to any to avoid strict union type mismatch with library version
            exchange: "SMART",
            currency: "USD",
        };

        // Request SNAPSHOT (true)
        console.log(`Requesting SNAPSHOT for ${ticker}...`);
        this.ib.reqMktData(reqId, contract, "", true, false);
        return null;
    }
}

// Global declaration to persist across hot reloads in development
const globalForIBKR = global as unknown as { ibkr: IBKRService };

export const ibkr = globalForIBKR.ibkr || IBKRService.getInstance();

if (process.env.NODE_ENV !== "production") globalForIBKR.ibkr = ibkr;
