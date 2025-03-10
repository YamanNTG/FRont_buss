export type NewsItem = {
  _id: string;
  title: string;
  description: string;
  image: string;
  user: string;
  createdAt: Date;
};

export type NewsState = {
  news: NewsItem[];
  count: number;
  currentPage: number;
  totalPages: number;
  hasMore: boolean;
  isLoading: boolean;
  error: string | null;
  image: string;
  singleNews: NewsItem | null;
};

export type CreateNewsData = {
  title: string;
  description: string;
  image?: string;
};
