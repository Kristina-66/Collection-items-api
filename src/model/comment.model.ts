import { getModelForClass, modelOptions, prop } from "@typegoose/typegoose";

@modelOptions({
  schemaOptions: {
    timestamps: true
  }
})
export class Comment {
  @prop()
  name: string;

  @prop()
  email: string;

  @prop()
  comment: string;
}

const commentModel = getModelForClass(Comment);
export default commentModel;