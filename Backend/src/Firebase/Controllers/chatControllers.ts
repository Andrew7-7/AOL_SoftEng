import { collection, getDocs, addDoc, doc, query, where } from "firebase/firestore";
import { db } from "../Config/config";
import { Request, Response } from "express";



const chatRoomCollection = collection(db, "ChatRoom");
const { auth } = require('firebase/auth');
export class chatControllers {
   

    //chat
    //Read
    static async getChatRoom(req: Request, res: Response) {
        try {
            
            const {email} = req.body

            const chatRoom = await getDocs(chatRoomCollection);
            const chat = chatRoom.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            
            res.status(200).json({ chatRooms: chat });
        } catch (error) {
            console.log('error log: ', error);
            res.status(500).json({ error: 'failed to fetch your chat' })
        }
    }

    static async getMessages(req: Request, res: Response) {
        try {
            const roomID = req.params.roomID;
            const messageCollection = collection(db, "ChatRoom", roomID, "Messages");
            const messagesSnapshot = await getDocs(messageCollection);
            const messages = messagesSnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));

            res.status(200).json({ messages });
        } catch (error) {
            console.error('Error fetching messages:', error)
            res.status(500).json({ error: 'Failed to fetch messages' })
        }
    }

    //Create
}
