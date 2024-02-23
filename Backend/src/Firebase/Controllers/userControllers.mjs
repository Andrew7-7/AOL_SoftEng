// import { Request, Response } from "express";
import { collection, getDocs, addDoc } from "firebase/firestore";
import { db } from "../Config/config.mjs";

export class UserControllers {
    static async getUser(req, res){
        try {
          const usersSnapshot = await getDocs(collection(db, "users"));
          const users = usersSnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));

          res.status(200).json(users);
        } catch (error) {
          console.error("Error fetching users:", error);
          res.status(500).json({ error: "Error fetching users" });
        }
    }
}
