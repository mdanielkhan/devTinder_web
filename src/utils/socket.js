import { BASE_URL } from "./contants"
import io from "socket.io-client"

export const createSocketConnection = () => {
  return io(BASE_URL, {
    withCredentials: true,
  });
};