import { Request, Response } from "express";
import RequestService from "./Request.service";
import { webSocketManager } from "..";
export const createRequest = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    const connectedDrivers = Object.values(
      webSocketManager.getConnectedDrivers()
    );

    if (!connectedDrivers.length) {
      return res.status(404).json({ message: "No drivers available" });
    }
    const newRequest = await RequestService.createRequest(data);
    const pickupLocation = newRequest.pickupLocation;

    connectedDrivers.forEach((driver) => {
      const driverLocation = driver.location;
      const distance = Math.abs(
        pickupLocation.latitude - driverLocation.latitude
      );
      if (distance < 0.1) {
        driver.socket.emit("new-request", newRequest);
      }
    });

    res.status(201).json(newRequest);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

export const getRequestById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const request = await RequestService.getRequestById(id);
    if (!request) {
      return res.status(404).json({ message: "Request not found" });
    }
    res.status(200).json(request);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateRequest = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const data = req.body;
    let updatedRequest;
    if (req.body.driver) {
      updatedRequest = await RequestService.updateRequest(id, {
        ...data,
        status: "accepted",
      });
      console.log(updatedRequest);
      webSocketManager
        .getConnectedClients()
        [updatedRequest.passenger._id]?.emit("driver-assigned", updatedRequest);
    } else {
      updatedRequest = await RequestService.updateRequest(id, data);
    }

    if (!updatedRequest) {
      return res.status(404).json({ message: "Request not found" });
    }
    res.status(200).json(updatedRequest);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

export const deleteRequest = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deletedRequest = await RequestService.deleteRequest(id);
    if (!deletedRequest) {
      return res.status(404).json({ message: "Request not found" });
    }
    res.status(200).json({ message: "Request deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
