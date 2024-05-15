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
import { Request, Response } from "express";

const coursesCollection = collection(db, "Courses");

export class HomeController {
  static async getCourses(req: Request, res: Response) {
      try {
          const coursesSnapshot = await getDocs(coursesCollection);
          const tutors = coursesSnapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
          }));

          res.status(200).json(tutors);
      } catch (error) {
          res.status(500).json({ error: "Error fetching tutors" });
      }
  }
}
