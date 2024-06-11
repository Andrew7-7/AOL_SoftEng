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
  static async getStudentByEmail(req: Request, res: Response){
    try {
      const studentEmail = req.params.studentEmail;
      const q = query(studentCollection, where("email", "==", studentEmail)) 
      
      const querySnapshot = await getDocs(q)

      if (querySnapshot.empty) {
        return res.status(500).json({ error: 'Student not found' });
      }
      const studentData = querySnapshot.docs[0].data();

      res.status(200).json(studentData.activeCourse);
    }catch(error){
      res.status(500).json({error: "Error fetching student by email"})
    }

  }
}
