import { collection, getDocs, addDoc, doc } from "firebase/firestore";
import { db } from "../Config/config";
import { encrypt } from "../../others/encrypt";
import { Request, Response } from "express";

interface User {
  id: string;
  [key: string]: any; // Allow any other properties with string keys
}

const userCollection = collection(db, "users");
export class UserControllers {
  // Testing get user and collection inside it
  static async getUser(req: Request, res: Response) {
    try {
      const usersSnapshot = await getDocs(userCollection);
      const users = usersSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      for (const user of users) {
        const collectionName = "Courses";
        const docRef = doc(db, "users", user.id);
        const collectionSnapshot = await getDocs(
          collection(docRef, collectionName)
        );

        const courses: any = [];

        if (!collectionSnapshot.empty) {
          collectionSnapshot.forEach((collectionDoc) => {
            courses.push({
              id: collectionDoc.id,
              ...collectionDoc.data(),
            });
          });
        }

        (user as User)[collectionName] = courses;
      }

      res.status(200).json(users);
    } catch (error) {
      console.error("Error fetching users:", error);
      res.status(500).json({ error: "Error fetching users" });
    }
  }

  // Register User
  static async registerUser(req: Request, res: Response) {
    try {
      let { email, username, password, role } = req.body;
      try {
        password = await encrypt.hashPass(password);
      } catch (error) {
        console.log(error);
      }

      await addDoc(userCollection, {
        email,
        username,
        password,
        role,
      });

      res.status(200).json({ message: "User added successfully" });
    } catch (error) {
      res.status(500).json(error);
    }
  }
}
