import { Server, Socket } from "socket.io";
import Driver from "./driver/Driver.model";

export class WebSocketManager {
  private io: Server;
  private connectedDrivers: {
    [driverId: string]: {
      socket: Socket;
      location: { latitude: number; longitude: number };
    };
  } = {};
  private connectedClients: { [id: string]: Socket } = {};
  constructor(io: Server) {
    this.io = io;

    this.io.on("connect", (socket: Socket) => {
      console.log("A user connected:", socket.id);

      socket.on(
        "registerDriver",
        (driver: {
          id: string;
          location: { latitude: number; longitude: number };
        }) => {
          this.connectedDrivers[driver.id] = {
            socket,
            location: driver.location,
          };
          console.log(`Driver registered: ${driver.id}`);
          console.log(driver.location);
        }
      );

      socket.on("locationUpdate", async (data) => {
        const driver = await Driver.findByIdAndUpdate(data.id, {
          location: {
            type: "Point",
            coordinates: [data.coords.latitude, data.coords.longitude],
          },
        });
        if (driver) {
          console.log(driver);
        }
      });
      socket.on("path", (data) => {
        const socks = Object.values(this.getConnectedDrivers())[0].socket;

        socks.emit("path", data);
      });
      socket.on("registerClient", (data) => {
        console.log(data);
        this.connectedClients[data.id] = socket;
        console.log("Client Connected:", data.name);
      });
      socket.on("driverConnect", (driverName: string) => {
        // Handle the event with the driver's name
        console.log(
          `Received driverNameEvent from ${socket.id}: ${driverName}`
        );
      });
      socket.on("disconnect", () => {
        const driverId = Object.keys(this.connectedDrivers).find(
          (key) => this.connectedDrivers[key].socket === socket
        );
        if (driverId) {
          delete this.connectedDrivers[driverId];
          console.log(`Driver disconnected: ${driverId}`);
        }
      });
    });
  }

  // Getter method to access the connected drivers
  getConnectedDrivers(): {
    [driverId: string]: {
      socket: Socket;
      location: { latitude: number; longitude: number };
    };
  } {
    return this.connectedDrivers;
  }
  getConnectedClients(): { [id: string]: Socket } {
    console.log(this.connectedClients);
    return this.connectedClients;
  }
}
