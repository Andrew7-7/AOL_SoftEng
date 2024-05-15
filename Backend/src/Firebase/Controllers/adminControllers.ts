import {
  collection,
  getDocs,
  updateDoc,
  where,
  query,
  getDoc,
} from "firebase/firestore";
import { storages, db } from "../Config/config";
import { Request, Response } from "express";
import { SendEmail } from "../../others/sendEmail";
// Collection User
const userCollection = collection(db, "users");
export class AdminControllers {
  static async getUser(req: Request, res: Response) {
    try {
      const usersSnapshot = await getDocs(userCollection);
      const users = usersSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ error: "Error fetching users" });
    }
  }

  static async blockUser(req: Request, res: Response) {
    const { email, block } = req.body;
    let updatedUser;
    try {
      const qUser = query(userCollection, where("email", "==", email));
      const queryUser = await getDocs(qUser);
      if (!queryUser.empty) {
        const doc = queryUser.docs[0];
        const docRef = doc.ref;
        await updateDoc(docRef, {
          isBanned: block,
        });
        const updatedDocSnapshot = await getDoc(docRef);
        updatedUser = updatedDocSnapshot.data();
        res.status(200).json({ updatedUser });
      } else {
        console.log("No document found with the given email.");
      }
    } catch (error) {
      res.status(500).json({ error: "Error updating profile data" });
    }
  }

  static async warningUser(req: Request, res: Response) {
    const { email, text } = req.body;
    try {
      const qUser = query(userCollection, where("email", "==", email));
      const queryUser = await getDocs(qUser);
      if (!queryUser.empty) {
        SendEmail(email, "STEPCODE Warning", text);
        res.status(200).json({ message: "warning successfully sent" });
      } else {
        console.log("No document found with the given email.");
      }
    } catch (error) {
      res.status(500).json({ error: "Error updating profile data" });
    }
  }
}
