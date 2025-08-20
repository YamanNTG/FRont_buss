import { useEffect } from 'react';
import { useNewsStore } from '@/store/news';

// Single news hook
export const useSingleNews = (newsId?: string) => {
  const { singleNews, isLoading, error, getSingleNews, msg } = useNewsStore();

  useEffect(() => {
    if (newsId) {
      getSingleNews(newsId);
    }
  }, [getSingleNews, newsId]);

  return {
    singleNews,
    isLoading,
    error,
    msg,
  };
};

// News list hook
export const useNewsList = () => {
  const { news, count, currentPage, totalPages, hasMore, isLoading, error } =
    useNewsStore();

  return {
    news,
    count,
    currentPage,
    totalPages,
    hasMore,
    isLoading,
    error,
  };
};

// News actions hook
export const useNewsActions = () => {
  const { createNews, updateNews, uploadFile, deleteNews, getAllNews } =
    useNewsStore();

  return {
    createNews,
    updateNews,
    uploadFile,
    deleteNews,
    getAllNews,
  };
};
