import {
    getModelForClass,
    modelOptions,
    prop,
    Ref
  } from "@typegoose/typegoose";
  import { ObjectId } from "mongoose";
  import { User } from "./user.model";
  
  @modelOptions({
    schemaOptions: {
      timestamps: true
    }
  })
  export class Like {
    @prop({ ref: () => User, unique: false })
    user: Ref<User>;
  
    @prop({ unique: false })
    item: ObjectId;
  }
  
  const likeModel = getModelForClass(Like);
  export default likeModel;