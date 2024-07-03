import { Request, Response } from "express";
import packageService from "./Package.service"; // Import the Package service
import { WebSocketManager } from "../SocketClass";
import { webSocketManager } from "..";

export const createPackage = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const packageData = req.body; // Assuming the request body contains the package data

    const newPackage = await packageService.createPackage(packageData);

    const socks = Object.values(webSocketManager.getConnectedRiders())[0];

    socks.emit("packageEvent", newPackage);

    res.status(201).json(newPackage);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Unable to create a new package." });
  }
};

export const getPackageById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params; // Assuming the package ID is passed as a parameter
    const item = await packageService.getPackageById(id);
    if (item) {
      res.status(200).json(item);
    } else {
      res.status(404).json({ message: "Package not found." });
    }
  } catch (error) {
    res.status(500).json({ error: "Unable to fetch the package." });
  }
};

export const assignPackage = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params; // Assuming the package ID is passed as a parameter
    console.log(id);
    const item = await packageService.getPackageById(id);
    if (item) {
      item.assignedTo = req.user.id;
      item.status = "assigned";
      const updated = await item.save();
      const withRider = await updated.populate("assignedTo");
      const socks = Object.values(webSocketManager.getConnectedClients())[0];
      socks.emit("packagedAccepted", withRider);
      res.status(200).json({ item: withRider });
    } else {
      res.status(404).json({ message: "Package not found." });
    }
  } catch (error) {
    res.status(500).json({ error: "Unable to fetch the package." });
  }
};

export const updatePage = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params; // Assuming the package ID is passed as a parameter
    const packageData = req.body; // Assuming the request body contains the updated rider data
    const updatedPackage = await packageService.updatePackage(id, packageData);
    if (updatedPackage) {
      res.status(200).json(updatedPackage);
    } else {
      res.status(404).json({ message: "Package not found." });
    }
  } catch (error) {
    res.status(500).json({ error: "Unable to update the package." });
  }
};

export const deletePackage = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params; // Assuming the package ID is passed as a parameter
    const deletedPackage = await packageService.deletePackage(id);
    if (deletedPackage) {
      res.status(200).json(deletedPackage);
    } else {
      res.status(404).json({ message: "Package not found." });
    }
  } catch (error) {
    res.status(500).json({ error: "Unable to delete the package." });
  }
};
