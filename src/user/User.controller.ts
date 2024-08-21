import { Request, Response } from "express";
import UserService from "./User.service";

export const createUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const driverData = req.body; // Assuming the request body contains the user data
    console.log(driverData);
    const newUser = await UserService.createUser(driverData);
    res.status(201).json(newUser);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Unable to create a new user." });
  }
};

export const getUserById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params; // Assuming the user ID is passed as a parameter
    const user = await UserService.getUserById(id);
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: "User not found." });
    }
  } catch (error) {
    res.status(500).json({ error: "Unable to fetch the user." });
  }
};

export const updateUser = async (
  req: Request & {
    file: {
      location: string;
    };
  },
  res: Response
): Promise<void> => {
  try {
    console.log(req.body);
    const { id } = req.params;
    console.log(id);
    // Assuming the user ID is passed as a parameter
    const driverData = req.body; // Assuming the request body contains the updated user data
    const updatedUser = await UserService.updateUser(id, {
      ...driverData,
    });
    if (updatedUser) {
      res.status(200).json({ data: updatedUser });
    } else {
      res.status(404).json({ message: "User not found." });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Unable to update the user." });
  }
};

export const deleteUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params; // Assuming the user ID is passed as a parameter
    const deletedUser = await UserService.deleteUser(id);
    if (deletedUser) {
      res.status(200).json(deletedUser);
    } else {
      res.status(404).json({ message: "User not found." });
    }
  } catch (error) {
    res.status(500).json({ error: "Unable to delete the user." });
  }
};

export const getUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const { status } = req.query;
    const drivers = await UserService.getUsers(status as string);
    res.status(200).json(drivers);
  } catch (error) {
    res.status(500).json({ error: "Unable to fetch drivers." });
  }
};
