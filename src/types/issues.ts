export type IssuesItem = {
  _id: string;
  title: string;
  description: string;
  status: string;
  location: {
    lat: number;
    lng: number;
  };
  user: {
    _id: string;
    name: string;
    profileImage: string;
  };
  createdAt: Date;
};

export type IssuesState = {
  issues: IssuesItem[];
  count: number;
  currentPage: number;
  totalPages: number;
  hasMore: boolean;
  isLoading: boolean;
  error: string | null;
  singleIssue: IssuesItem | null;
};

export type CreateIssuesData = {
  title: string;
  description: string;
  location: {
    lat: number;
    lng: number;
  };
};
