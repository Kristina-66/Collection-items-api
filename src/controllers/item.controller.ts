import { NextFunction, Request, Response } from "express";
import { CreateItemInput } from "../schema/item.schema";
import {
  createItem,
  deleteItems,
  findAllItems,
  findByIdItem,
  updateItem,
} from "../services/item.service";

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
      itemCollection: req.body.itemCollection,
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

export const deleteItemsHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const items = await deleteItems(req.body.id);
    res.status(200).json({
      status: "success",
      result: items,
      data: {
        items,
      },
    });
  } catch (err: any) {
    next(err);
  }
};

export const updateItemHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id, name, hashtag, description } = req.body;
    const item = await updateItem(id, name, hashtag, description);
    res.status(200).json({
      status: "success",
      result: item,
    });
  } catch (err: any) {
    next(err);
  }
};

export const getAllItemsInCollectionHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const idCollection = req.params.id;
    const items = await findAllItems(idCollection);
    res.status(200).json({
      status: "success",
      result: items.length,
      data: {
        items,
      },
    });
  } catch (err: any) {
    next(err);
  }
};

export const getItemHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    console.log(req.params.id);
    const item = await findByIdItem(req.params.id);
    res.status(200).json({
      status: "success",
      data: {
        item,
      },
    });
  } catch (err: any) {
    next(err);
  }
};
