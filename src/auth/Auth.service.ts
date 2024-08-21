import { AuthRes } from "./Auth.types";
import jwt from "jsonwebtoken";
import DriverModel from "../driver/Driver.model";
import { randomBytes } from "crypto";
import axios from "axios";
import UserModel from "../user/User.model";

class AuthService {
  async authRider(data: { phone: string }): Promise<{ id: string }> {
    // Create a new rider using the DriverModel and save it to the database
    const driver = await DriverModel.findOne({ phone: data.phone });
    //@ts-ignore
    if (driver) {
      const otp = this.generateOtp();
      driver.otp = otp;

      await this.sendOTP(data.phone, otp);
      await driver.save();
      return {
        id: driver._id,
      };
    } else {
      const newDriver = await DriverModel.create(data);
      const otp = this.generateOtp();
      newDriver.otp = otp;

      await this.sendOTP(data.phone, otp);
      await newDriver.save();
      return {
        id: newDriver._id,
      };
    }
  }

  async authUser(data: {
    phone: string;
    name: string;
  }): Promise<{ id: string }> {
    // Create a new rider using the DriverModel and save it to the database
    const user = await UserModel.findOne({ phone: data.phone });
    //@ts-ignore
    if (user) {
      const otp = this.generateOtp();
      user.otp = otp;

      await this.sendOTP(data.phone, otp);
      await user.save();
      return {
        id: user._id,
      };
    } else {
      const newUser = await UserModel.create(data);
      const otp = this.generateOtp();
      newUser.otp = otp;

      await this.sendOTP(data.phone, otp);
      await newUser.save();
      return {
        id: newUser._id,
      };
    }
  }

  async sendOTP(phone: string, otp: string) {
    const apiKey = process.env.SMS_KEY;
    const senderId = "MoveEasy";
    const message = `Your OTP is: ${otp}. Do not share this OTP with anyone, not even our employees`;

    try {
      const response = await axios.post(
        "https://sms.arkesel.com/api/v2/sms/send",
        {
          recipients: [phone],
          message,
          sender: senderId,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "api-key": apiKey,
          },
        }
      );

      if (response.data.status === "success") {
        console.log("OTP sent successfully");
      } else {
        console.error("Failed to send OTP:", response.data.message);
      }
    } catch (error) {
      console.error("Error sending OTP:", error.message);
    }
  }

  generateTokens(id: string) {
    const accessToken = jwt.sign({ id }, process.env.JWT_ACCESS_SECRET, {
      expiresIn: "15m",
    });
    const refreshToken = jwt.sign({ id }, process.env.JWT_REFRESH_SECRET, {
      expiresIn: "7d",
    });
    return { accessToken, refreshToken };
  }
  async verifyOtp(
    data: {
      id: string;
      otp: string;
    },
    type: string
  ): Promise<AuthRes | { message: string }> {
    const user =
      type === "driver"
        ? await DriverModel.findById(data.id)
        : await UserModel.findById(data.id);

    if (user) {
      if (user.otp !== data.otp) {
        return { message: "OTPs don't match" };
      }

      return this.generateTokens(user.id);
    } else {
      return { message: "Rider not found" };
    }
  }

  generateOtp() {
    const buffer = randomBytes(6);
    const digits = "0123456789";
    let otp = "";

    for (let i = 0; i < 6; i++) {
      const randomIndex = buffer[i] % digits.length;
      otp += digits[randomIndex];
    }

    return otp;
  }

  async getAuth(id: string, type: string) {
    const rider =
      type === "driver"
        ? await DriverModel.findById(id)
        : await UserModel.findById(id);
    if (!rider) {
      return "User not found";
    } else {
      return rider;
    }
  }

  refreshToken(token: string) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET) as {
        id: string;
      };
      console.log(decoded);
      const tokens = this.generateTokens(decoded.id);
      return tokens.accessToken;
    } catch (error) {
      return "Refresh token is invalid";
    }
  }
}

export default new AuthService();
