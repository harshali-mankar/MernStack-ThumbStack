export interface IBook {
  _id: string;
  title: string;
  author: string;
  tags: string[];
  status: 'Want to Read' | 'Reading' | 'Completed';
  createdAt: string;
}
