import {
  collection,
  getDocs,
  addDoc,
  doc,
  query,
  where,
  deleteDoc,
  getDoc,
} from "firebase/firestore";
import { db } from "../Config/config";
import { Request, Response } from "express";

const coursesCollection = collection(db, "Courses");
const studentCollection = collection(db, "Student");
const userCollection = collection(db, "users");

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
  static async getStudent (req: Request, res: Response) {
    try{
      const studentSnapshot = await getDocs(studentCollection)
      const temp = studentSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }))
      
      res.status(200).json(temp);
    }catch (error) {
      res.status(500).json({ error: "Error fetching tutors" });
    }
  }
}
