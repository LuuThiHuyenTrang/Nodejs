import bcryptjs from "bcryptjs";
import User from "../models/User";
import { signUpValid, UpUserValid, signInValid } from "../validation/user";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const { SECRET_KEY } = process.env;
export const signUp = async (req, res) => {
  try {
    // Bước 1: Kiểm tra thông tin client gửi về:
    const { error } = signUpValid.validate(req.body, { abortEarly: false });
    if (error) {
      const errors = error.details.map((err) => err.message);
      return res.status(400).json({
        message: errors,
      });
    }

    // Bước 2: Kiểm tra email đã tồn tại trong hệ thống hay chưa?
    const userExists = await User.findOne({ email: req.body.email });

    if (userExists) {
      return res.status(400).json({
        message: "Email này đã được đăng ký, bạn có muốn đăng nhập không?",
      });
      // throw new Error("Email này đã được đăng ký, bạn có muốn đăng nhập không?")
    }

    // Bước 3: Mã hoá mật khẩu
    const hashPassword = await bcryptjs.hash(req.body.password, 10);
    console.log("hashPassword: ", hashPassword);

    // Bước 4: Tạo account cho người dùng:
    const user = await User.create({
      userName: req.body.userName,
      email: req.body.email,
      password: hashPassword,
    });

    // Bước 5: Trả về thông báo:
    user.password = undefined;
    return res.status(200).json({
      message: "Tạo tài khoản thành công!",
      user,
    });
  } catch (error) {
    return res.status(500).json({
      name: error.name,
      message: error.message,
    });
  }
};
export const signIn = async (req, res) => {
  try {
    //b1: Validation data from client
    const { error } = signInValid.validate(req.body, { abortEarly: false });
    if (error) {
      const errors = error.details.map((err) => err.message);
      return res.status(400).json({
        message: errors,
      });
    }
    // b2:kiem tra email ton tai trong database hay k?
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(400).json({
        message: "Email này chưa được đăng ký, bạn có muốn đăng ký không?",
      });
    }
    //b3: so sanh password co dung khong?
    console.log(user);
    const isMatch = await bcryptjs.compare(req.body.password, user.password);
    console.log(isMatch);
    if (!isMatch) {
      return res.status(400).json({
        message: "Mật khẩu không đúng!",
      });
    }
    // b4: Tao jwt
    const accessToken = jwt.sign({ _id: user.id }, SECRET_KEY, {
      expiresIn: "1d",
    });
    //b5: Response thonng tin dang nhap
    user.password = undefined;
    return res.status(200).json({
      message: "Đăng nhập thành công!",
      accessToken,
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      name: error.name,
      message: error.message,
    });
  }
};
export const updateUser = async (req, res) => {
  try {
    console.log("🚀 ~ file: auth.js:100 ~ updateUser ~ req:", req.body);
    const userId = req.body._id;

    // Bước 0: Kiểm tra thông tin client gửi về:
    const { error } = UpUserValid.validate(req.body, { abortEarly: false });
    if (error) {
      const errors = error.details.map((err) => err.message);
      return res.status(400).json({
        message: errors,
      });
    }

    // Bước 3: Mã hoá mật khẩu nếu có
    if (req.body.password) {
      const hashPassword = await bcryptjs.hash(req.body.password, 10);
      req.body.password = hashPassword; // Update the request body with the hashed password
    }

    // Bước 1: Cập nhật thông tin người dùng trong cơ sở dữ liệu
    const updatedUser = await User.findByIdAndUpdate(userId, req.body, {
      new: true,
    });

    // Bước 2: Trả về thông tin người dùng đã được cập nhật
    res.status(200).json({
      message: "Cập nhật thông tin người dùng thành công!",
      user: updatedUser,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      name: error.name,
      message: error.message,
    });
  }
};
