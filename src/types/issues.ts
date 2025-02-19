export type IssuesItem = {
  _id: string;
  title: string;
  description: string;
  status: string;
  location: {
    lat: number;
    lng: number;
  };
  user: string;
  createdAt: Date;
};

export type IssuesState = {
  issues: IssuesItem[];
  count: number;
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
