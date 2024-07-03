import RiderModel from "./Rider.model"; // Import the Rider interface and model
import { Rider } from "./Rider.types";

class RiderService {
  async createRider(data: Partial<Rider>): Promise<Rider> {
    // Create a new rider using the RiderModel and save it to the database
    const rider = await RiderModel.create(data);
    return rider;
  }

  async getRiderById(id: string): Promise<Rider | null> {
    // Find a rider by ID in the database
    const rider = await RiderModel.findById(id);
    return rider;
  }

  async updateRider(id: string, data: Partial<Rider>): Promise<Rider | null> {
    // Find the rider by ID and update its properties in the database
    const rider = await RiderModel.findByIdAndUpdate(id, data, { new: true });
    return rider;
  }

  async deleteRider(id: string): Promise<Rider | null> {
    // Find the rider by ID and remove it from the database
    const rider = await RiderModel.findByIdAndRemove(id);
    return rider;
  }
}

export default new RiderService();
