import { formatDate } from '@/utils/formatDate';
import { useSingleNews } from '@/hooks/useNews';

interface SingleNewsContentProps {
  newsId: string;
}

const SingleNewsContent = ({ newsId }: SingleNewsContentProps) => {
  const { singleNews, isLoading, error } = useSingleNews(newsId);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!singleNews) {
    return <div>News not found</div>;
  }

  return (
    <article className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-md">
      <h1
        className="text-xl font-bold tracking-tight text-gray-900 
      line-clamp-2 leading-tight 
      group-hover:text-blue-600 transition-colors"
      >
        {singleNews.title}
      </h1>
      {singleNews.image && (
        <div className="aspect-video w-full overflow-hidden rounded-lg mb-6">
          <img
            src={singleNews.image}
            alt={singleNews.title}
            className="w-full h-full object-cover"
          />
        </div>
      )}
      <p className="text-gray-700 leading-relaxed whitespace-pre-wrap mb-8">
        {singleNews.description}
      </p>
      <div className="text-center border-t border-gray-200 pt-4">
        <p className="text-sm text-gray-500">
          {formatDate(singleNews.createdAt)}
        </p>
      </div>
    </article>
  );
};

export default SingleNewsContent;
