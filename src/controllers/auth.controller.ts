import config from "config";
import { CookieOptions, NextFunction, Request, Response } from "express";
import { CreateUserInput, LoginUserInput } from "../schema/user.schema";
import {
  createUser,
  findUser,
  signToken,
  findByIdAndUpdate,
} from "../services/user.service";
import AppError from "../middleware/appError";

export const excludedFields = ["password"];

const accessTokenCookieOptions: CookieOptions = {
  expires: new Date(
    Date.now() + config.get<number>("accessTokenExpiresIn") * 60 * 1000
  ),
  maxAge: config.get<number>("accessTokenExpiresIn") * 60 * 1000,
  httpOnly: true,
  sameSite: "lax",
};

if (process.env.NODE_ENV === "production")
  accessTokenCookieOptions.secure = true;

export const registerHandler = async (
  req: Request<{}, {}, CreateUserInput>,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await createUser({
      email: req.body.email,
      name: req.body.name,
      password: req.body.password,
    });

    res.status(201).json({
      status: "success",
      data: {
        user,
      },
    });
  } catch (err: any) {
    if (err.code === 11000) {
      return res.status(409).json({
        status: "fail",
        message: "Email already exist",
      });
    }
    next(err);
  }
};

export const loginHandler = async (
  req: Request<{}, {}, LoginUserInput>,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await findUser({ email: req.body.email });

    if (
      !user ||
      !(await user.comparePasswords(user.password, req.body.password))
    ) {
      return next(new AppError("Invalid email or password", 401));
    }

    if (user.status === "block") {
      return next(new AppError("You are BLOCKED", 401));
    }

    findByIdAndUpdate(user.id);
    const { access_token } = await signToken(user);

    res.cookie("accessToken", access_token, accessTokenCookieOptions);
    res.cookie("logged_in", true, {
      ...accessTokenCookieOptions,
      httpOnly: false,
    });

    res.status(200).json({
      status: "success",
      access_token,
    });
  } catch (err: any) {
    next(err);
  }
};

const logout = (res: Response) => {
  res.cookie("access_token", "", { maxAge: 1 });
  res.cookie("logged_in", "", { maxAge: 1 });
};

export const logoutHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = res.locals.user;
    logout(res);
    res.status(200).json({ status: "success" });
  } catch (err: any) {
    next(err);
  }
};
