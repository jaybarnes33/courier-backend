import { Server, Socket } from "socket.io";
import Rider from "./rider/Rider.model";

export class WebSocketManager {
  private io: Server;
  private connectedRiders: { [riderId: string]: Socket } = {};
  private connectedClients: { [id: string]: Socket } = {};
  constructor(io: Server) {
    this.io = io;

    this.io.on("connect", (socket: Socket) => {
      console.log("A rider connected:", socket.id);

      socket.on(
        "registerRider",
        (rider: {
          id: string;
          location: { latitude: number; longitude: number };
        }) => {
          this.connectedRiders[rider.id] = socket;
          console.log(`Rider registered: ${rider.id}`);
          console.log(rider.location);
        }
      );

      socket.on("locationUpdate", async (data) => {
        const rider = await Rider.findByIdAndUpdate(data.id, {
          location: {
            type: "Point",
            coordinates: [data.coords.latitude, data.coords.longitude],
          },
        });
        if (rider) {
          console.log(rider);
        }
      });
      socket.on("path", (data) => {
        const socks = Object.values(this.getConnectedRiders())[0];

        socks.emit("path", data);
      });
      socket.on("registerClient", async (data) => {
        this.connectedClients[data.id] = socket;
        console.log("Client Connected:", data.name);
      });
      socket.on("riderConnect", (riderName: string) => {
        // Handle the event with the rider's name
        console.log(`Received riderNameEvent from ${socket.id}: ${riderName}`);
      });
      socket.on("disconnect", () => {
        const riderId = Object.keys(this.connectedRiders).find(
          (key) => this.connectedRiders[key] === socket
        );
        if (riderId) {
          delete this.connectedRiders[riderId];
          console.log(`Rider disconnected: ${riderId}`);
        }
      });
    });
  }

  // Getter method to access the connected riders
  getConnectedRiders(): { [riderId: string]: Socket } {
    return this.connectedRiders;
  }
  getConnectedClients(): { [id: string]: Socket } {
    console.log(this.connectedClients);
    return this.connectedClients;
  }
}
