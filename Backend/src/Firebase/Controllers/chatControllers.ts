import {
  collection,
  getDocs,
  addDoc,
  doc,
  query,
  where,
  Query,
  QuerySnapshot,
  onSnapshot,
  Timestamp,
} from "firebase/firestore";
import { db } from "../Config/config";
import { NextFunction } from "express";
import { Request, Response } from "express";

const chatRoomCollection = collection(db, "ChatRoom");
const { auth } = require("firebase/auth");
export class chatControllers {
  //chat
  //Read
  static async getChatRoom(req: Request, res: Response, next: NextFunction) {
    try {
      // const email1 = "andrew";
      // const email2 = "charles";
      const {email1, email2} = req.body;
      const q = query(
        chatRoomCollection,
        where("email1", "==", email1),
        where("email2", "==", email2)
      );
      const querySnapshot: QuerySnapshot = await getDocs(q);
      const chat = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      if (chat.length === 0) {
        return res.status(404).json({ error: "Chat room not found" });
      }
      const chatRoomId = chat[0].id;

      req.params.roomID = chatRoomId;

      next();
    } catch (error) {
      console.error("Error fetching chat room:", error);
      res.status(500).json({ error: "Failed to fetch chat room" });
    }
  }

  static async getMessages(req: Request, res: Response) {
    try {
      const roomID = req.params.roomID;
      const messageCollection = collection(db, "ChatRoom", roomID, "Messages");
      const unsubscribe = onSnapshot(messageCollection, (QuerySnapshot) => {
        const messages = QuerySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        res.status(200).json({messages});
      })

      setTimeout(() => {
        unsubscribe();
      }, 1 * 1000 * 60);
    } catch (error) {
      console.error("Error fetching messages:", error);
      res.status(500).json({ error: "Failed to fetch messages" });
    }
  }

  //Create
  static async sendMessage(req: Request, res: Response) {
    try {
      const { roomID, user, message, attachment } = req.body;

      const messageCollection = collection(db, "ChatRoom", roomID, "Messages");
      const timestamp = Timestamp.now();

      await addDoc(messageCollection, {
        user: user,
        message: message,
        attachment: attachment,
        timestamp: timestamp
      });

      res.status(200).json({ message: "Message sent successfully!" });
    } catch (error) {
      console.error("Error sending message:", error);
      res.status(500).json({ error: "Failed to send message" });
    }
  }
}
