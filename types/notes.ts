export default interface INote {
  id: number;
  createdAt: Date;
  updatedAt: Date | null;
  title: string;
  content: string | null;
}