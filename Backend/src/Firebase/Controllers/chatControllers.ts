import {
  Query,
  QuerySnapshot,
  onSnapshot,
  Timestamp,
  collection,
  getDocs,
  addDoc,
  doc,
  query,
  where,
  deleteDoc,
  getDoc,
  updateDoc,
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

      const q = query(
        chatRoomCollection,
        where("emails", "array-contains", email)
      );

      const chatroomSnapshot = await getDocs(q);

      if (chatroomSnapshot.empty) {
        return res.status(404).send("There is no chat");
      }

      const chatroomDocs: any = [];

      chatroomSnapshot.forEach((doc) => {
        const otherEmail = doc
          .data()
          .emails.find((currEmail: any) => currEmail !== email);
        chatroomDocs.push({ id: doc.id, otherEmail, ...doc.data() });
      });

      res.status(200).json({ chatroomDocs });
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
      const { roomID, email, message } = req.body;

      const messageCollection = collection(db, "ChatRoom", roomID, "Messages");
      const chatroomRef = doc(db, "ChatRoom", roomID);
      const timestamp = Timestamp.now();

      await addDoc(messageCollection, {
        email: email,
        message: message,
        timestamp: timestamp,
      });

      await updateDoc(chatroomRef, {
        lastTimeStamp: timestamp,
        lastMessage: message,
      });

      res.status(200).json({ message: "Message sent successfully!" });
    } catch (error) {
      console.error("Error sending message:", error);
      res.status(500).json({ error: "Failed to send message" });
    }
  }
}
