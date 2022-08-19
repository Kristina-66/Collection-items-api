import { object, string, TypeOf } from "zod";

export const createItemSchema = object({
  body: object({
    name: string({ required_error: "Name is required" }),
    hashtag: string({ required_error: "Hashtag is required" }),
    description: string({ required_error: "Description  is required" }),
    image: string().optional(),
  }),
});

export type CreateItemInput = TypeOf<typeof createItemSchema>["body"];
