import { object, string, TypeOf } from "zod";

export const createCollectionSchema = object({
  body: object({
    name: string({ required_error: "Name is required" }),
    category: string({ required_error: "Category is required" }),
    description: string({ required_error: "Description  is required" }),
    image: string().optional(),
  }),
});

export type CreateCollectionInput = TypeOf<
  typeof createCollectionSchema
>["body"];
