import {
  getModelForClass,
  modelOptions,
  prop,
  Ref,
} from "@typegoose/typegoose";
import { Item } from "./item.model";

@modelOptions({
  schemaOptions: {
    timestamps: true,
  },
})
export class Collection {
  @prop({ ref: () => Item })
  public Item?: Ref<Item>[];
  @prop()
  name: string;

  @prop({ required: true })
  category: string;

  @prop()
  description: string;

  @prop({ required: false })
  image: string;
}

const collectionModel = getModelForClass(Collection);
export default collectionModel;
