import config from "config";
import { omit } from "lodash";
import { FilterQuery, QueryOptions } from "mongoose";
import userModel, { User } from "../model/user.model";
import { excludedFields } from "../controllers/auth.controller";
import { DocumentType } from "@typegoose/typegoose";
import { signJwt } from "../utils/jwt";
import redisClient from "../utils/connectRedis";

export const createUser = async (input: Partial<User>) => {
  const user = await userModel.create(input);
  return omit(user.toJSON(), excludedFields);
};
export const findUserById = async (id: string) => {
  const user = await userModel.findById(id).lean();
  return omit(user, excludedFields);
};

export const findByIdAndUpdate = async (id: string) => {
  const user = await userModel
    .findByIdAndUpdate(id, { lastLogin: Date.now() })
    .lean();
  return omit(user, excludedFields);
};

export const updateStatuses = async (ids: [], status: string) => {
  const users = await userModel.updateMany(
    { _id: { $in: ids } },
    { $set: { status: status } },
    { multi: true, upsert: true, new: true }
  );
  return omit(users, excludedFields);
};

export const updateRole = async (ids: [], role: string) => {
  const users = await userModel.updateMany(
    { _id: { $in: ids } },
    { $set: { role: role } },
    { multi: true, upsert: true, new: true }
  );
  return omit(users, excludedFields);
};

export const deleteUsers = async (ids: []) => {
  const users = await userModel.deleteMany(
    { _id: { $in: ids } },
    { multi: true, upsert: true, new: true }
  );
  return omit(users, excludedFields);
};

export const findAllUsers = async () => {
  return await userModel.find();
};

export const findUser = async (
  query: FilterQuery<User>,
  options: QueryOptions = {}
) => {
  return await userModel.findOne(query, {}, options).select("+password");
};

export const signToken = async (user: DocumentType<User>) => {
  const access_token = signJwt({ sub: user._id }, "accessTokenPrivateKey", {
    expiresIn: `${config.get<number>("accessTokenExpiresIn")}m`,
  });

  const refresh_token = signJwt({ sub: user._id }, "refreshTokenPrivateKey", {
    expiresIn: `${config.get<number>("refreshTokenExpiresIn")}m`,
  });

  redisClient.set(user._id.toString(), JSON.stringify(user), {
    EX: 60 * 60,
  });

  return { access_token, refresh_token };
};
