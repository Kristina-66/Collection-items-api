import { omit } from "lodash";
import collectionModel, { Collection } from "../model/collection.model";

export const createCollection = async (input: Partial<Collection>) => {
  const collection = await collectionModel.create(input);
  return omit(collection.toJSON());
};

export const deleteCollections = async (ids: []) => {
  const collections = await collectionModel.deleteMany(
    { _id: { $in: ids } },
    { multi: true, upsert: true, new: true }
  );
  return omit(collections);
};

export const updateCollections = async (
  ids: [],
  name: string,
  category: string,
  description: string,
  image: string
) => {
  const collections = await collectionModel.updateMany(
    { _id: { $in: ids } },
    { $set: { name: name, category: category, description: description, image: image } },
    { multi: true, upsert: true, new: true }
  );
  return omit(collections);
};

export const findAllCollectionForUser = async (user: any) => {
  const collection = await collectionModel.aggregate([
    {
      $match: { owner: { $in: [user._id] } },
    },
    {
      $lookup: {
        from: "users",
        localField: "owner",
        foreignField: "_id",
        as: "ownerInfo",
      },
    },
    {
      $project: {
        name: 1,
        createdAt: 1,
        description: 1,
        category: 1,
        image: 1,
        updatedAt: 1,
        owner: 1,
        "ownerInfo.name": 1,
      },
    },
  ]);
  return collection;
};

export const findAllCollection = async () => {
  const collection = await collectionModel.aggregate([
    {
      $lookup: {
        from: "users",
        localField: "owner",
        foreignField: "_id",
        as: "ownerInfo",
      },
    },
    {
      $project: {
        name: 1,
        createdAt: 1,
        description: 1,
        category: 1,
        image: 1,
        updatedAt: 1,
        owner: 1,
        "ownerInfo.name": 1,
      },
    },
  ]);

  return collection;
};

export const findByIdCollection = async (id: string) => {
  const collection = await collectionModel.findById(id);
  return collection;
};
