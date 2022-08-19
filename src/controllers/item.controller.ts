import { NextFunction, Request, Response } from "express";
import { CreateItemInput } from "../schema/item.schema";
import { createItem } from "../services/item.service";

export const createItemHandler = async (
  req: Request<{}, {}, CreateItemInput>,
  res: Response,
  next: NextFunction
) => {
  try {
    const item = await createItem({
      name: req.body.name,
      hashtag: req.body.hashtag,
      description: req.body.description,
      image: req.body.image,
    });

    res.status(201).json({
      status: "success",
      data: {
        item,
      },
    });
  } catch (err: any) {
    next(err);
  }
};
