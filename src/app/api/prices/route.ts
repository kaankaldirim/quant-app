import { NextResponse } from "next/server";
import { ibkr } from "@/lib/ibkr";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const tickersParam = searchParams.get("tickers");

    if (!tickersParam) {
        return NextResponse.json({ error: "No tickers provided" }, { status: 400 });
    }

    const tickers = tickersParam.split(",");

    // Ensure connection
    await ibkr.connect();

    const data: Record<string, { price: string; change: string; color: "green" | "red" }> = {};

    tickers.forEach((ticker) => {
        const marketData = ibkr.getMarketData(ticker);

        if (marketData && marketData.price > 0) {
            const changeVal = marketData.price - marketData.close;
            const changePercent = ((changeVal / marketData.close) * 100).toFixed(2);
            const isPositive = changeVal >= 0;

            data[ticker] = {
                price: marketData.price.toFixed(2),
                change: `${isPositive ? "+" : ""}${changePercent}%`,
                color: isPositive ? "green" : "red",
            };
        } else {
            // Fallback/Loading state: return null or previous dummy if strictly needed, 
            // but here we return null to let frontend show "Loading..."
            // Or better: return the dummy data structure but with empty values
            data[ticker] = {
                price: "...",
                change: "...",
                color: "green"
            };
        }
    });

    return NextResponse.json(data);
}
