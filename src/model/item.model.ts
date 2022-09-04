import {
  getModelForClass,
  modelOptions,
  prop,
  Ref,
} from "@typegoose/typegoose";
import { Collection } from "./collection.model";
import { Comment } from "./comment.model";
import { Like } from "./like.model";
import { User } from "./user.model";

@modelOptions({
  schemaOptions: {
    timestamps: true,
  },
})
export class Item {
  @prop()
  name: string;

  @prop({ required: false })
  hashtag: string;

  @prop()
  description: string;

  @prop({ ref: () => Comment })
  comments: Comment[];

  @prop({ ref: () => Like })
  likes: Like[];

  @prop({ required: false })
  image: string;

  @prop({ ref: () => User })
  public owner: Ref<User>;

  @prop()
  public ownerName: string;

  @prop()
  public itemCollection: string;
}

const itemModel = getModelForClass(Item);
export default itemModel;
