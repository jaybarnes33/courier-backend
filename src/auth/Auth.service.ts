import { AuthRes } from "./Auth.types";
import jwt from "jsonwebtoken";
import RiderModel from "../rider/Rider.model";
import { randomBytes } from "crypto";
import axios from "axios";
import Rider from "../rider/Rider.model";

class RiderService {
  async authRider(data: { phoneNumber: string }): Promise<{ id: string }> {
    // Create a new rider using the RiderModel and save it to the database
    const rider = await RiderModel.findOne({ phoneNumber: data.phoneNumber });
    //@ts-ignore
    if (rider) {
      const otp = this.generateOtp();
      rider.otp = otp;

      await this.sendOTP(data.phoneNumber, otp);
      await rider.save();
      return {
        id: rider._id,
      };
    } else {
      const rider = await RiderModel.create(data);
    }
  }

  async sendOTP(phoneNumber: string, otp: string) {
    const apiKey = "Olp0RGZDakhDdnRJU2VKR2U=";
    const senderId = "Plug";
    const message = `Your OTP is: ${otp}`;

    try {
      const response = await axios.post(
        "https://sms.arkesel.com/api/v2/sms/send",
        {
          recipients: [phoneNumber],
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
  async verifyOtp(data: {
    id: string;
    otp: string;
  }): Promise<AuthRes | { message: string }> {
    const rider = await RiderModel.findById(data.id);

    if (rider) {
      if (rider.otp !== data.otp) {
        return { message: "OTPs don't match" };
      }

      return this.generateTokens(rider.id);
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

  async getAuth(id: string) {
    const rider = await Rider.findById(id);
    if (!rider) {
      return "Rider not found";
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

export default new RiderService();
