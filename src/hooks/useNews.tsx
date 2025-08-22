import { useEffect } from 'react';
import { useNewsStore } from '@/store/news';

// Single news hook
export const useSingleNews = () => {
  const { singleNews, isLoading, error, msg } = useNewsStore();

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
// Fetch Single News
export const useLoadSingleNews = (newsId: string) => {
  const { getSingleNews } = useNewsActions();

  useEffect(() => {
    if (newsId) {
      getSingleNews(newsId);
    }
  }, [newsId]);
};

// News actions hook
export const useNewsActions = () => {
  const {
    createNews,
    updateNews,
    uploadFile,
    deleteNews,
    getAllNews,
    addNewsFromSocket,
    updateNewsFromSocket,
    removeNewsFromSocket,
    getSingleNews,
  } = useNewsStore();

  return {
    createNews,
    updateNews,
    uploadFile,
    deleteNews,
    getAllNews,
    addNewsFromSocket,
    updateNewsFromSocket,
    removeNewsFromSocket,
    getSingleNews,
  };
};
