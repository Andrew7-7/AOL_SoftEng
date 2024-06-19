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

	static async createChatRoom(req: Request, res: Response) {
		const { email, tutorId } = req.body;

		if (tutorId == "x") {
			res.status(501);
		}

		const tutorRef = doc(db, "tutors", tutorId);

		const tutorSnapshot = await getDoc(tutorRef);

		const tutorEmail = tutorSnapshot.data().tutorEmail;

		const tutor = tutorSnapshot.data();

		const tutorEmailQuery = query(
			chatRoomCollection,
			where("emails", "array-contains", tutorEmail)
		);
		const emailQuery = query(
			chatRoomCollection,
			where("emails", "array-contains", email)
		);

		const tutorEmailSnapshot = await getDocs(tutorEmailQuery);
		const emailSnapshot = await getDocs(emailQuery);

		const combinedResults: any = [];
		const final: any = [];

		tutorEmailSnapshot.forEach((doc) => {
			combinedResults.push({ id: doc.id, ...doc.data() });
		});

		emailSnapshot.forEach((doc) => {
			// Avoid adding duplicate documents
			if (
				!combinedResults.some(
					(existingDoc: { id: string }) => existingDoc.id === doc.id
				)
			) {
				final.push({ id: doc.id, ...doc.data() });
			}
		});

		if (final.length > 0) {
			const room = final[0];

			console.log(room);

			return res.status(200).json({ room, tutor });
		} else {
			console.log("No documents found");
		}

		//create chat room
		const chatRoomRef = collection(db, "ChatRoom");

		const docRef = await addDoc(chatRoomRef, {
			lastTimeStamp: Timestamp.now(),
			emails: [email, tutorEmail],
		});

		const roomSnapshot = await getDoc(docRef);

		if (roomSnapshot.exists()) {
			const room = { id: roomSnapshot.id, ...roomSnapshot.data() };
			return res.status(200).json({ room, tutor });
		} else {
			return res.status(404).json({ error: "Room not found" });
		}
	}

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
