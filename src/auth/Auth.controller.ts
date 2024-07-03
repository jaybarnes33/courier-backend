import { Request, Response } from "express";
import authService from "./Auth.service"; // Import the Rider service

export const auth = async (req: Request, res: Response): Promise<void> => {
  try {
    const { type } = req.query;
    const authData = req.body;
    console.log(authData);
    const authRes =
      type === "rider"
        ? await authService.authRider(authData)
        : { accessToken: "addafsadf", refreshToken: "hjkljkhlhjkljkademnmnmh" };
    res.status(201).json(authRes);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Unable to create a new rider." });
  }
};

export const verify = async (req: Request, res: Response): Promise<void> => {
  try {
    const { type } = req.query;
    const { id } = req.params;
    const { otp } = req.body;
    if (otp) {
      const authRes =
        type === "rider"
          ? await authService.verifyOtp({ id, otp })
          : {
              accessToken: "addafsadf",
              refreshToken: "hjkljkhlhjkljkademnmnmh",
            };
      res.status(200).json(authRes);
    } else {
      res.status(400).json("OTP is required");
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Couldn't verify token" });
  }
};

export const refreshToken = async (req: Request, res: Response) => {
  try {
    const { refreshToken } = req.body;
    if (refreshToken) {
      const token = authService.refreshToken(refreshToken);
      return res.status(200).json({ accessToken: token });
    } else {
      res.status(400).json({ message: "No token provided" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Couldn't verify token" });
  }
};

export const getAuth = async (req: Request, res: Response) => {
  try {
    console.log(req.user);
    const data = await authService.getAuth(req.user.id);
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Couldn't verify token" });
  }
};
// export const getRiderById = async (
//   req: Request,
//   res: Response
// ): Promise<void> => {
//   try {
//     const { id } = req.params; // Assuming the rider ID is passed as a parameter
//     const rider = await riderService.getRiderById(id);
//     if (rider) {
//       res.status(200).json(rider);
//     } else {
//       res.status(404).json({ message: "Rider not found." });
//     }
//   } catch (error) {
//     res.status(500).json({ error: "Unable to fetch the rider." });
//   }
// };

// export const updateRider = async (
//   req: Request,
//   res: Response
// ): Promise<void> => {
//   try {
//     const { id } = req.params; // Assuming the rider ID is passed as a parameter
//     const riderData = req.body; // Assuming the request body contains the updated rider data
//     const updatedRider = await riderService.updateRider(id, riderData);
//     if (updatedRider) {
//       res.status(200).json(updatedRider);
//     } else {
//       res.status(404).json({ message: "Rider not found." });
//     }
//   } catch (error) {
//     res.status(500).json({ error: "Unable to update the rider." });
//   }
// };

// export const deleteRider = async (
//   req: Request,
//   res: Response
// ): Promise<void> => {
//   try {
//     const { id } = req.params; // Assuming the rider ID is passed as a parameter
//     const deletedRider = await riderService.deleteRider(id);
//     if (deletedRider) {
//       res.status(200).json(deletedRider);
//     } else {
//       res.status(404).json({ message: "Rider not found." });
//     }
//   } catch (error) {
//     res.status(500).json({ error: "Unable to delete the rider." });
//   }
// };
