import { NextFunction, Request, Response } from "express";
import { deleteComments } from "../services/comment.service";
import { createComment } from "../services/item.service";

export const createItemCommentHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { comment } = JSON.parse(req.body.data);
  const { name, email } = res.locals.user;
  const itemId = req.params.id;
  try {
    const item = await createComment(
      {
        name,
        email,
        comment,
      },
      itemId
    );

    res.status(201).json({
      status: "success",
      data: {
        item,
      },
    });
  } catch (err) {
    next(err);
  }
};

export const deleteItemCommentHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id;
    const comments = await deleteComments([id]);
    res.status(200).json({
      status: "success",
      data: {
        comments,
      },
    });
  } catch (err) {
    next(err);
  }
};
