import Parser from "rss-parser";
import { NextResponse } from "next/server";

type Article = {
  title: string;
  link: string;
  source: string;
  pubDate: string;
};

const parser = new Parser({
  customFields: {
    item: [["source", "sourceTag"]],
  },
});

function extractSource(title: string, sourceTag?: string): string {
  if (sourceTag) return sourceTag;
  const match = title.match(/ - ([^-]+)$/);
  return match ? match[1].trim() : "不明";
}

function cleanTitle(title: string): string {
  return title.replace(/ - [^-]+$/, "").trim();
}

export async function GET() {
  const RSS_URL =
    "https://news.google.com/rss/search?q=ドローン&hl=ja&gl=JP&ceid=JP:ja";

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 10000);

  try {
    const response = await fetch(RSS_URL, {
      signal: controller.signal,
      headers: { "User-Agent": "Mozilla/5.0 (compatible; DroneNewsBot/1.0)" },
    });

    if (!response.ok) {
      throw new Error(`RSS fetch failed: ${response.status}`);
    }

    const xml = await response.text();
    const feed = await parser.parseString(xml);

    const articles: Article[] = feed.items.slice(0, 20).map((item) => ({
      title: cleanTitle(item.title ?? ""),
      link: item.link ?? "",
      source: extractSource(item.title ?? "", (item as any).sourceTag),
      pubDate: item.pubDate ?? "",
    }));

    return NextResponse.json({ articles, fetchedAt: new Date().toISOString() });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  } finally {
    clearTimeout(timeout);
  }
}
