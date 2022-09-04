import { omit } from "lodash";
import itemModel from "../model/item.model";
import commentModel, { Comment } from "../model/comment.model";

export const createComment = async (input: Partial<Comment>, id: string) => {
  const { name, email, comment } = input;
  const commentToItem = new commentModel({ name, email, comment });
  commentToItem.save();

  const item = await itemModel
    .findOneAndUpdate(
      { _id: { $in: [id] } },
      { $push: { comments: commentToItem } },
      { comments: 1 },
      
    )
    .populate("comments");

  return omit(item);
};

export const deleteComments = async (ids: string[]) => {
  const comments = await commentModel.deleteMany(
    { _id: { $in: ids } },
    { multi: true, upsert: true, new: true }
  );

  return omit(comments);
};
