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
            

            const q = query(chatRoomCollection, where('user1.email', '==', email))
            const chatRoomSnap = await getDocs(q)

            

            const chatRoom = await getDocs(chatRoomCollection);
            const chat = chatRoom.docs.map((doc) => ({
                ...doc.data(),
            }));

            for (const chats of chat) {
                console.log(chats.roomID)
            }
            res.status(200).json({ chatRooms: chat });
        } catch (error) {
            console.log('error log: ', error);
            res.status(500).json({ error: 'failed to fetch your chat' })
        }
    }

    //Create
}
