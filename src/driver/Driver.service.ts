import DriverModel from "./Driver.model"; // Import the Rider interface and model
import { Driver } from "./Driver.types";

class DriverService {
  async createDriver(data: Partial<Driver>): Promise<Driver> {
    // Create a new rider using the DriverModel and save it to the database
    const driver = await DriverModel.create(data);
    return driver;
  }

  async getDriverById(id: string): Promise<Driver | null> {
    // Find a Driver by ID in the database
    const driver = await DriverModel.findById(id);
    return driver;
  }

  async updateDriver(
    id: string,
    data: Partial<Driver>
  ): Promise<Driver | null> {
    // Find the Driver by ID and update its properties in the database
    const driver = await DriverModel.findByIdAndUpdate(id, data, { new: true });
    return driver;
  }

  async deleteDriver(id: string): Promise<Driver | null> {
    // Find the Driver by ID and remove it from the database
    const driver = await DriverModel.findByIdAndRemove(id);
    return driver;
  }

  async getDrivers(status: string): Promise<Driver[]> {
    // Get all Drivers from the database
    let drivers: Driver[];

    drivers = await DriverModel.find({ verificationStatus: status });

    return drivers;
  }
}

export default new DriverService();
