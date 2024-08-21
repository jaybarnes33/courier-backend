import { Request, Response } from "express";
import DriverService from "./Driver.service";

export const createRider = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const driverData = req.body; // Assuming the request body contains the rider data
    console.log(driverData);
    const newRider = await DriverService.createDriver(driverData);
    res.status(201).json(newRider);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Unable to create a new rider." });
  }
};

export const getRiderById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params; // Assuming the rider ID is passed as a parameter
    const rider = await DriverService.getDriverById(id);
    if (rider) {
      res.status(200).json(rider);
    } else {
      res.status(404).json({ message: "Rider not found." });
    }
  } catch (error) {
    res.status(500).json({ error: "Unable to fetch the rider." });
  }
};

export const updateRider = async (
  req: Request & {
    file: {
      location: string;
    };
  },
  res: Response
): Promise<void> => {
  try {
    console.log(req.body);
    const { id } = req.params; // Assuming the rider ID is passed as a parameter
    const driverData = req.body; // Assuming the request body contains the updated rider data
    const updatedRider = await DriverService.updateDriver(id, {
      ...driverData,
      avatar: req.file?.location,
    });
    if (updatedRider) {
      res.status(200).json({ data: updatedRider });
    } else {
      res.status(404).json({ message: "Rider not found." });
    }
  } catch (error) {
    res.status(500).json({ error: "Unable to update the rider." });
  }
};

export const deleteRider = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params; // Assuming the rider ID is passed as a parameter
    const deletedRider = await DriverService.deleteDriver(id);
    if (deletedRider) {
      res.status(200).json(deletedRider);
    } else {
      res.status(404).json({ message: "Rider not found." });
    }
  } catch (error) {
    res.status(500).json({ error: "Unable to delete the rider." });
  }
};

export const getDrivers = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { status } = req.query;
    const drivers = await DriverService.getDrivers(status as string);
    res.status(200).json(drivers);
  } catch (error) {
    res.status(500).json({ error: "Unable to fetch drivers." });
  }
};
