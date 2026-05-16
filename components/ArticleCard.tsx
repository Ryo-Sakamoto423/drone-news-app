type Props = {
  title: string;
  link: string;
  source: string;
  pubDate: string;
};

function formatDate(dateStr: string): string {
  if (!dateStr) return "日時不明";
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return dateStr;
  return d.toLocaleString("ja-JP", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function ArticleCard({ title, link, source, pubDate }: Props) {
  return (
    <article className="bg-white rounded-xl border border-gray-200 p-4 hover:shadow-md transition-shadow">
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="block group"
      >
        <h2 className="text-base font-semibold text-gray-900 group-hover:text-blue-600 leading-snug mb-2">
          {title}
        </h2>
      </a>
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-gray-500">
        <span className="inline-flex items-center gap-1">
          <span className="font-medium text-gray-700">{source}</span>
        </span>
        <span className="text-gray-300">·</span>
        <time dateTime={pubDate}>{formatDate(pubDate)}</time>
      </div>
    </article>
  );
}
