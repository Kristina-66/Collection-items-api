import {
  getModelForClass,
  modelOptions,
  prop,
  Ref,
} from "@typegoose/typegoose";
import { User } from "./user.model";

@modelOptions({
  schemaOptions: {
    timestamps: true,
  },
})
export class Collection {
  @prop()
  name: string;

  @prop({ required: true })
  category: string;

  @prop()
  description: string;

  @prop({ required: false })
  image: string;

  @prop({ ref: () => User })
  public owner: Ref<User>;
}

const collectionModel = getModelForClass(Collection);
export default collectionModel;
