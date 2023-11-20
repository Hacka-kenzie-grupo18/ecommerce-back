import { Request, Response } from "express";
import { sendEmailResetPasswordService } from "../services/resetPassword/sendEmailResetPassword.service";
import { userRequest, userResponse } from "../interfaces/user.interfaces";
import { createUserService } from "../services/user/createUser.service";
import { resetPasswordService } from "../services/resetPassword/resetPassword.service";
import { createAdminService } from "../services/user/createAdmin.service";

export const createUserController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const userRequest: userRequest = req.body;
  const newUser: userResponse = await createUserService(userRequest);

  return res.status(200).json(newUser);
};

export const sendEmailResetPasswordController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { email } = req.body;

  await sendEmailResetPasswordService(email);

  return res.status(200).json({ message: "Token send" });
};

export const createAdminController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const newAdmin: userResponse = await createAdminService();
    return res.status(200).json(newAdmin);
  } catch (error) {
    console.error("Error creating admin:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const resetPasswordController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { password } = req.body;
  const { token } = req.params;

  await resetPasswordService(password, token);

  return res.status(200).json({ message: "Password changed" });
};
