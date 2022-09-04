import { NextFunction, Request, Response } from "express";
import { createLike, deleteLikes } from "../services/likes.service";

export const createItemLikeHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const itemId = req.params.id;
  const user = res.locals.user;
  const userId = res.locals.user._id;
  try {
    const like = await createLike(
      {
        user,
      },
      itemId,
      userId
    );

    res.status(201).json({
      status: "success",
      data: { like },
    });
  } catch (err) {
    next(err);
  }
};

export const deleteItemLikeHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id;
    const comments = await deleteLikes([id]);
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
