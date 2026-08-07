import { db } from "../database/mongodb";
import { asyncHandler } from "../utils/asyncHandler";

export const getAuthors = asyncHandler(async (c) => {
  const authors = await db
    .collection("user")
    .aggregate([
      {
        $lookup: {
          from: "articles",
          localField: "_id",
          foreignField: "authorId",
          as: "articles",
        },
      },
      {
        $project: {
          _id: 1,
          name: 1,
          articles: {
            $size: "$articles",
          },
        },
      },
      {
        $sort: {
          articles: -1,
        },
      },
    ])
    .toArray();

  return c.json(authors);
});

export const searchArticles = asyncHandler(async (c) => {

  const search = c.req.query("search") || "";

  const articles = await db
    .collection("articles")
    .aggregate([
      {
        $lookup: {
          from: "user",
          localField: "authorId",
          foreignField: "_id",
          as: "author",
        },
      },
      {
        $unwind: "$author",
      },
      {
        $match: {
          $or: [
            {
              title: {
                $regex: search,
                $options: "i",
              },
            },
            {
              content: {
                $regex: search,
                $options: "i",
              },
            },
            {
              "author.name": {
                $regex: search,
                $options: "i",
              },
            },
          ],
        },
      },
      {
        $project: {
          _id: 1,
          title: 1,
          content: 1,
          imageUrl: 1,
          createdAt: 1,
          author: {
            name: "$author.name",
          },
        },
      },
      {
        $sort: {
          createdAt: -1,
        },
      },
    ])
    .toArray();

  return c.json(articles);

});