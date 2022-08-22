import {
  getModelForClass,
  modelOptions,
  prop,
  Ref,
} from "@typegoose/typegoose";
import { Collection } from "./collection.model";

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

  @prop({ required: false })
  image: string;

  @prop({ ref: () => Collection })
  public itemCollection: Ref<Collection>;
}

const itemModel = getModelForClass(Item);
export default itemModel;
