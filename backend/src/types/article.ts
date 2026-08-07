import { ObjectId } from "mongodb";

export interface Article {
  _id?: ObjectId;
  title: string;
  content: string;
  authorId: ObjectId;
  createdAt: Date;
  updatedAt: Date;
}