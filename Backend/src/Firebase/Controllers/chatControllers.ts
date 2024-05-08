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

  static async getChatRoom(req: Request, res: Response) {
    try {
      const { email } = req.body;

      const q1 = query(chatRoomCollection, where("email1", "==", email));
      const querySnapshot1: QuerySnapshot = await getDocs(q1);
      const chat1 = querySnapshot1.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      const q2 = query(chatRoomCollection, where("email2", "==", email));
      const querySnapshot2: QuerySnapshot = await getDocs(q2);
      const chat2 = querySnapshot2.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      const chat = [...chat1, ...chat2];

      if (chat1.length === 0 && chat2.length === 0) {
        return res.status(404).json({ error: "No chat rooms found for the provided email" });
      }

      const chatRoomId = chat[0].id;

      req.params.roomID = chatRoomId;
      res.status(200).json({ chat });
    } catch (error) {
      console.error("Error fetching chat room:", error);
      res.status(500).json({ error: "Failed to fetch chat room" });
    }
  }


  static async getMessages(req: Request, res: Response) {
    try {
      const roomID = req.params.roomID;
      const messageCollection = collection(db, "ChatRoom", roomID, "Messages");

      const querySnapshot = await getDocs(messageCollection);
      const messages = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      res.status(200).json({ messages });
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
