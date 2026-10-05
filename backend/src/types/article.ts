import { ObjectId } from "mongodb";

export interface Article {
  _id?: ObjectId;
  title: string;
  content: string;
  authorId: ObjectId;
  createdAt: Date;
  updatedAt: Date;
  comments: Comment[];
}
export interface Comment {
  _id: ObjectId;
  authorId: ObjectId;
  comment: string;
  createdAt: Date;
  updatedAt: Date;
}