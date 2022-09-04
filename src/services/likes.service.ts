import { omit } from "lodash";
import { ObjectId } from "mongoose";
import itemModel from "../model/item.model";
import likeModel, { Like } from "../model/like.model";

export const createLike = async (
  user: Partial<Like>,
  id: string,
  userId: ObjectId
) => {
  // find existing like
  const existLikeCount = await likeModel
    .find({ user: userId, item: id })
    .count({});

  //if user already add like to current post we just delete like
  if (existLikeCount > 0) {
    const existLike = await likeModel.find({ user: userId });
    const likeId = omit(existLike)[0]._id;
    const item = deleteLikes([likeId]);

    return item;
  }

  const like = new likeModel({ ...user, item: id });
  like.save();

  const item = await itemModel
    .findOneAndUpdate(
      { _id: { $in: [id] } },
      { $push: { likes: like } },
      { new: true }
    )
    .populate(["likes"]);

  return item?.likes;
};

export const deleteLikes = async (ids: string[]) => {
  await likeModel.deleteMany(
    { _id: { $in: ids } },
    { multi: true, upsert: true, new: true }
  );

  return [];
};
