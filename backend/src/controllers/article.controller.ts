import { db } from "../database/mongodb";
import { createArticleSchema } from "../schemas/articles.schema";
import { ObjectId } from "mongodb";
import { asyncHandler } from "../utils/asyncHandler";
import { updateArticleSchema } from "../schemas/articles.schema";
export const createArticle = asyncHandler(async (c) => {

  const user = c.get("user");

  const body = await c.req.json();


  const validation = createArticleSchema.safeParse(body);

  if (!validation.success) {
    return c.json(
      {
        message: "Datos inválidos",
        errors: validation.error.issues,
      },
      400
    );
  }

  const article = {
    title: validation.data.title,
    content: validation.data.content,
    imageUrl: validation.data.imageUrl ?? null,
    authorId: new ObjectId(user.id),
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const result = await db
    .collection("articles")
    .insertOne(article);

  return c.json(
    {
      id: result.insertedId,
      ...article,
    },
    201
  );
});

export const getArticles = asyncHandler(async (c) => {
  const user = c.get("user");
  const page = Number(c.req.query("page")) || 1;
  const limit = Number(c.req.query("limit")) || 10;

  const search = c.req.query("search") || "";

  const sortBy = c.req.query("sortBy") || "createdAt";
  const order = c.req.query("order") || "desc";


  const skip = (page - 1) * limit;

const filter: any = {
  authorId: new ObjectId(user.id),
};

  if (search) {
    filter.$or = [
      {
        title: {
          $regex: search,
          $options: "i"
        }
      },
      {
        content: {
          $regex: search,
          $options: "i"
        }
      }
    ];
  }

  const allowedSortFields = [
    "title",
    "createdAt",
    "updatedAt"
  ];

  const sortField = allowedSortFields.includes(sortBy)
    ? sortBy
    : "createdAt";

  const sortOrder = order === "asc" ? 1 : -1;

  const articles = await db
    .collection("articles")
    .find(filter)
    .sort({
      [sortField]: sortOrder
    })
    .skip(skip)
    .limit(limit)
    .toArray();


  const total = await db
    .collection("articles")
    .countDocuments(filter);

  return c.json({
    page,
    limit,
    total,
    totalPages: Math.ceil(total / limit),
    sortBy: sortField,
    order,
    data: articles
  });

});


export const getArticleById = asyncHandler(async (c) => {
  const id = c.req.param("id");

  if (!ObjectId.isValid(id)) {
    return c.json(
      {
        error: "ID inválido",
      },
      400
    );
  }

  const result = await db
    .collection("articles")
    .aggregate([
      {
        $match: {
          _id: new ObjectId(id),
        },
      },
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
        $project: {
          title: 1,
          content: 1,
          imageUrl: 1,
          createdAt: 1,
          updatedAt: 1,
          author: {
            id: "$author._id",
            name: "$author.name",
            email: "$author.email",
          },
        },
      },
    ])
    .toArray();

  if (result.length === 0) {
    return c.json(
      {
        message: "No se encontró el artículo",
      },
      404
    );
  }

  return c.json(result[0]);
});

export const updateArticle = asyncHandler(async (c) => {
  const user = c.get("user");
  const id = c.req.param("id");

  if (!ObjectId.isValid(id)) {
    return c.json(
      {
        error: "ID inválido"
      },
      400
    );
  }

  const article = await db
    .collection("articles")
    .findOne({
      _id: new ObjectId(id)
    });


  if (!article) {
    return c.json(
      {
        error: "Artículo no encontrado"
      },
      404
    );
  }

  if (article.authorId.toString() !== user.id) {
    return c.json(
      {
        error: "No tienes permisos para editar este artículo"
      },
      403
    );
  }

  const body = await c.req.json();
  const validation = updateArticleSchema.safeParse(body);

if (!validation.success) {
  return c.json(
    {
      message: "Datos inválidos",
      errors: validation.error.issues
    },
    400
  );
}
  await db
    .collection("articles")
    .updateOne(
      {
        _id: new ObjectId(id)
      },
      {
       $set: {
        ...validation.data,
        updatedAt: new Date()
        }
      }
    );

  return c.json({
    message: "Artículo actualizado"
  });

});

export const deleteArticle = asyncHandler(async (c) => {
  const user = c.get("user");
  const id = c.req.param("id");


  if (!ObjectId.isValid(id)) {
    return c.json(
      {
        error: "ID inválido"
      },
      400
    );
  }

  const article = await db
    .collection("articles")
    .findOne({
      _id: new ObjectId(id)
    });


  if (!article) {
    return c.json(
      {
        error: "Artículo no encontrado"
      },
      404
    );
  }


  if (article.authorId.toString() !== user.id) {
    return c.json(
      {
        error: "No tienes permisos para eliminar este artículo"
      },
      403
    );
  }


  await db
    .collection("articles")
    .deleteOne({
      _id: new ObjectId(id)
    });


  return c.json({
    message: "Artículo eliminado"
  });
});