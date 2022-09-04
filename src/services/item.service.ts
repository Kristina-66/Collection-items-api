import { omit } from "lodash";
import itemModel, { Item } from "../model/item.model";
import commentModel, { Comment } from "../model/comment.model";

export const createItem = async (input: Partial<Item>) => {
  const item = await itemModel.create(input);
  return omit(item.toJSON());
};

export const createComment = async (input: Partial<Comment>, id: string) => {
  const { name, email, comment } = input;
  const commentToItem = new commentModel({ name, email, comment });
  commentToItem.save();

  const item = await itemModel
    .findOneAndUpdate(
      { _id: { $in: [id] } },
      { $push: { comments: commentToItem } },
      { new: true }
    )
    .populate(["comments"])
    .exec();

  return omit(item);
};

export const deleteItems = async (ids: []) => {
  const items = await itemModel.deleteMany(
    { _id: { $in: ids } },
    { multi: true, upsert: true, new: true }
  );
  return omit(items);
};

export const updateItem = async (
  ids: [],
  name: string,
  hashtag: string,
  description: string
) => {
  const item = await itemModel.updateMany(
    { _id: { $in: ids } },
    { $set: { name: name, hashtag: hashtag, description: description } },
    { multi: true, upsert: true, new: true }
  );
  return omit(item);
};

export const findAllItems = async (collectionId: any) => {
  const items = await itemModel
    .find({ itemCollection: collectionId })
    .populate(["likes", { path: "comments", model: "Comment" }]);

  return items;
};

export const findByIdItem = async (id: string) => {
  const item = await itemModel
    .findById(id)
    .populate(["likes", { path: "comments", model: "Comments" }]);

  return item;
};
