import { NextResponse } from "next/server";

const API_KEY = "d3susa1r01qpdd5lg6ggd3susa1r01qpdd5lg6h0";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const tickersParam = searchParams.get("tickers");

    if (!tickersParam) {
        return NextResponse.json({ error: "No tickers provided" }, { status: 400 });
    }

    const tickers = tickersParam.split(",");

    // Fetch data in parallel from Finnhub
    const promises = tickers.map(async (ticker) => {
        try {
            const res = await fetch(`https://finnhub.io/api/v1/quote?symbol=${ticker}&token=${API_KEY}`, {
                next: { revalidate: 10 } // Cache for 10 seconds to avoid rate limits
            });

            if (!res.ok) return null;

            const data = await res.json();
            // Finnhub response: { c: current, d: change, dp: percent change, h: high, l: low, o: open, pc: prev close }
            return { ticker, data };
        } catch (error) {
            console.error(`Error fetching ${ticker}:`, error);
            return null;
        }
    });

    const results = await Promise.all(promises);
    const data: Record<string, { price: string; change: string; color: "green" | "red" }> = {};

    results.forEach((result) => {
        if (result && result.data && result.data.c) {
            const { c, dp } = result.data;
            const isPositive = dp >= 0;

            data[result.ticker] = {
                price: c.toFixed(2),
                change: `${isPositive ? "+" : ""}${dp.toFixed(2)}%`,
                color: isPositive ? "green" : "red",
            };
        } else {
            // Fallback for error/rate limit
            data[result.ticker] = {
                price: "---",
                change: "---",
                color: "green"
            };
        }
    });

    return NextResponse.json(data);
}
