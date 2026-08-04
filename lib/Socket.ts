import { APP_CONFIG } from "@/config/app.config";
import { io } from "socket.io-client";

// initialize socket
export const socket = io(APP_CONFIG.app.url);
