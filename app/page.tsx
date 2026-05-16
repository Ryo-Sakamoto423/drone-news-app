"use client";

import { useState, useEffect, useCallback } from "react";
import ArticleCard from "@/components/ArticleCard";

type Article = {
  title: string;
  link: string;
  source: string;
  pubDate: string;
};

export default function Home() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [fetchedAt, setFetchedAt] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchNews = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/news");
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "取得に失敗しました");
      setArticles(data.articles);
      setFetchedAt(data.fetchedAt);
    } catch (err) {
      setError(err instanceof Error ? err.message : "エラーが発生しました");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchNews();
  }, [fetchNews]);

  function formatFetchedAt(iso: string) {
    return new Date(iso).toLocaleString("ja-JP", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-2xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🚁</span>
            <h1 className="text-xl font-bold text-gray-900">ドローンニュース</h1>
          </div>
          {fetchedAt && (
            <p className="text-xs text-gray-400 hidden sm:block">
              取得日時: {formatFetchedAt(fetchedAt)}
            </p>
          )}
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-6">
        {loading && (
          <div className="flex flex-col items-center justify-center py-24 gap-4">
            <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
            <p className="text-gray-500 text-sm">ニュースを取得中...</p>
          </div>
        )}

        {error && !loading && (
          <div className="flex flex-col items-center justify-center py-24 gap-4">
            <p className="text-red-500 text-sm">{error}</p>
            <button
              onClick={fetchNews}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 transition-colors"
            >
              再試行
            </button>
          </div>
        )}

        {!loading && !error && (
          <>
            {fetchedAt && (
              <p className="text-xs text-gray-400 mb-4 sm:hidden">
                取得日時: {formatFetchedAt(fetchedAt)}
              </p>
            )}
            <div className="flex flex-col gap-3">
              {articles.map((article, i) => (
                <ArticleCard key={i} {...article} />
              ))}
            </div>
          </>
        )}
      </main>
    </div>
  );
}
