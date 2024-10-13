export interface GeneratedUrlProps {
  id: string;
  code: string;
  originalLink: string;
  newUrl: string;
  views: number;
  createdAt: Date;
  userId: string | null;
}
