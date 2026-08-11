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

  const page = Number(c.req.query("page")) || 1;
  const limit = Number(c.req.query("limit")) || 9;

  const skip = (page - 1) * limit;

  const searchFilter = {
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
  };

  const result = await db
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
        $match: searchFilter,
      },
      {
        $facet: {
          data: [
            {
              $sort: {
                createdAt: -1,
              },
            },
            {
              $skip: skip,
            },
            {
              $limit: limit,
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
          ],
          total: [
            {
              $count: "count",
            },
          ],
        },
      },
    ])
    .toArray();

  const data = result[0]?.data ?? [];
  const total = result[0]?.total[0]?.count ?? 0;

  return c.json({
    page,
    limit,
    total,
    totalPages: Math.ceil(total / limit),
    data,
  });
});