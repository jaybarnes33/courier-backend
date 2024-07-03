import PackageModel from "./Package.model"; // Import the Package interface and model
import { Package } from "./Package.types";

class PackageService {
  async createPackage(data: Partial<Package>): Promise<Package> {
    // Create a new Package using the PackageModel and save it to the database
    const item = await PackageModel.create(data);
    return item;
  }

  async getPackageById(id: string): Promise<Package | null> {
    // Find a Package by ID in the database
    const item = await PackageModel.findById(id);
    return item;
  }

  async updatePackage(
    id: string,
    data: Partial<Package>
  ): Promise<Package | null> {
    // Find the Package by ID and update its properties in the database
    const item = await PackageModel.findByIdAndUpdate(id, data, { new: true });
    return item;
  }

  async deletePackage(id: string): Promise<Package | null> {
    // Find the Package by ID and remove it from the database
    const item = await PackageModel.findByIdAndRemove(id);
    return item;
  }
}

export default new PackageService();
