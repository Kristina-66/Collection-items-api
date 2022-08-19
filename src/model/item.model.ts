import { getModelForClass, modelOptions, prop } from "@typegoose/typegoose";

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
}

const itemModel = getModelForClass(Item);
export default itemModel;
