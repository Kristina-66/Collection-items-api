import { omit } from "lodash";
import itemModel, { Item } from "../model/item.model";

export const createItem = async (input: Partial<Item>) => {
  const item = await itemModel.create(input);
  return omit(item.toJSON());
};
