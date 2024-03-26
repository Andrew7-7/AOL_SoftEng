import {
  collection,
  getDocs,
  addDoc,
  doc,
  query,
  where,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../Config/config";
import { encrypt } from "../../others/encrypt";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
interface User {
  id: string;
  [key: string]: any;
}

interface UserData {
  email?: string;
  password?: string;
  role?: string;
  username?: string;
}

interface SessionData {
  id?: string;
  email?: string;
  refreshToken?: string;
}

// Collection User
const userCollection = collection(db, "users");

// Collection Session
const sessionCollection = collection(db, "session");

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
      res.status(500).json({ error: "Error fetching users" });
    }
  }

  // Login User
  static async loginUser(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      // Cek Email
      const q = query(userCollection, where("email", "==", email));
      const user = await getDocs(q);
      if (user.empty) {
        return res.status(400).json({ message: "Invalid Email" });
      }

      // Masukkin data user
      let userData: UserData = {};

      user.forEach((doc) => {
        userData = { ...doc.data() };
      });

      if(userData.role){
        return res.status(200).json({userData})
      }

      // Cek Password
      const passwordMatch = await encrypt.comparePass(
        password,
        userData.password
      );

      if (!passwordMatch) {
        return res.status(401).json({ error: "Invalid password" });
      }

      // JWT Token
      const payload = userData;

      // Refresh Token exp 7 hari
      const REFRESH_TOKEN = process.env.REFRESH_TOKEN!;
      const refreshToken = jwt.sign(payload, REFRESH_TOKEN, {
        expiresIn: "7d",
      });

      // Access Token exp 1 hari
      const ACCESS_TOKEN = process.env.ACCESS_TOKEN!;
      const accessToken = jwt.sign(payload, ACCESS_TOKEN, {
        expiresIn: "1d",
      });

      // Masukkin Refresh Token ke firebase
      await addDoc(sessionCollection, {
        email,
        refreshToken,
      });

      
      res.status(200).json({ accessToken, userData });
    } catch (error) {
      res.status(500).json(error);
    }
  }

  // Register User
  static async registerUser(req: Request, res: Response) {
    try {
      let { username, email, password, role } = req.body;

      // Hash Password
      try {
        password = await encrypt.hashPass(password);
      } catch (error) {
        console.log(error);
      }

      // Cek email sama
      const q = query(userCollection, where("email", "==", email));
      const existingUser = await getDocs(q);
      if (!existingUser.empty) {
        return res.status(400).json({ message: "Email already exists" });
      }

      // Masukkin User ke firebase
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

  static async verifyAccToken(req: Request, res: Response) {
    const { accToken, email } = req.body;

    if (!accToken || !email) {
      return res.status(401).json({
        message: "Missing access token or user",
      });
    }

    const ACCESS_TOKEN = process.env.ACCESS_TOKEN;

    try {
      const decode = jwt.verify(accToken, ACCESS_TOKEN);

      if (typeof decode !== "string") {
        if (decode.email === email) {
          return res.status(200).json({
            user: decode,
          });
        }

        return res.status(401).json({
          message: "Token and the email is different",
        });
      } else {
        return res.status(401).json({
          message: "Token Expired / Invalid",
        });
      }
    } catch (error) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }
  }

  static async verifyRefreshToken(req: Request, res: Response) {
    const { user } = req.body;

    if (!user) {
      return res.status(401).json({
        message: "Missing User",
      });
    }

    const REFRESH_TOKEN = process.env.REFRESH_TOKEN;

    // Cek Session
    const q = query(sessionCollection, where("email", "==", user.email));
    const session = await getDocs(q);
    if (session.empty) {
      return res
        .status(400)
        .json({ message: "Invalid Email Or No Refresh Token" });
    }

    // Masukkin data user
    let sessionData: SessionData = {};

    session.forEach((doc) => {
      sessionData = { id: doc.id, ...doc.data() };
    });

    try {
      const decode = jwt.verify(sessionData.refreshToken, REFRESH_TOKEN);

      if (typeof decode !== "string") {
        // Access Token exp 1 hari
        const ACCESS_TOKEN = process.env.ACCESS_TOKEN!;
        const accessToken = jwt.sign(user, ACCESS_TOKEN, {
          expiresIn: "1d",
        });
        return res.status(200).json({
          accessToken,
        });
      } else {
        // Hapus Session dari firebase
        const docRef = doc(sessionCollection, sessionData.id);
        try {
          const deleteRes = await deleteDoc(docRef);
          return res.status(200).json({
            message: "Document successfully deleted because Token has expired",
          });
        } catch (error) {
          console.error("Error removing document: ", error);
          return res.status(500).json({
            message: "Internal Server Error",
          });
        }
      }
    } catch (error) {
      // Hapus Session dari firebase
      const docRef = doc(sessionCollection, sessionData.id);
      try {
        const deleteRes = await deleteDoc(docRef);
        return res.status(200).json({
          message: "Document successfully deleted because Token has expired",
        });
      } catch (error) {
        console.error("Error removing document: ", error);
        return res.status(500).json({
          message: "Internal Server Error",
        });
      }
    }
  }
}
