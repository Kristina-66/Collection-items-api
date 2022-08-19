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

export const updateCollections = async (ids: [], name: string, category: string, description: string) => {
    const collections = await collectionModel.updateMany(
      { _id: { $in: ids } },
      { $set: { name: name, category: category, description: description } },
      { multi: true, upsert: true, new: true }
    );
    return omit(collections);
  };
  
