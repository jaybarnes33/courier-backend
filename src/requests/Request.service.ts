import RideRequestModel from "./Request.model"; // Import the RideRequest model
import { RideRequest } from "./Request.types";

class RequestService {
  async createRequest(data: Partial<RideRequest>): Promise<RideRequest> {
    // Create a new RideRequest using the RideRequestModel and save it to the database
    const item = await RideRequestModel.create(data);
    return item;
  }

  async getRequestById(id: string): Promise<RideRequest | null> {
    // Find a RideRequest by ID in the database
    const item = await RideRequestModel.findById(id);
    return item;
  }

  async updateRequest(
    id: string,
    data: Partial<RideRequest>
  ): Promise<RideRequest | null> {
    // Find the RideRequest by ID and update its properties in the database
    const item = await RideRequestModel.findByIdAndUpdate(id, data, {
      new: true,
    }).populate(["driver", "passenger"]);
    return item;
  }

  async deleteRequest(id: string): Promise<RideRequest | null> {
    // Find the RideRequest by ID and remove it from the database
    const item = await RideRequestModel.findByIdAndRemove(id);
    return item;
  }
}

export default new RequestService();
