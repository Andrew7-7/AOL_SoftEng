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
import { connectStorageEmulator } from "firebase/storage";
interface Course {
    [key: string]: any;
}

const coursesCollection = collection(db, "Courses");

export class CoursesController {
    static async getCourses(req: Request, res: Response) {
        try {
            const coursesSnapshot = await getDocs(coursesCollection);
            const courses = coursesSnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            res.status(200).json(courses);
        } catch (error) {
            res.status(500).json({ error: "Error fetching courses" });
        }
    }

    static async getCourse(req: Request, res: Response) {
        try {
            const collectionName = "Courses";
            const documentId = req.params.courseId;

            // Create a reference to the document
            const documentRef = doc(db, collectionName, documentId);

            // Retrieve the document snapshot
            const documentSnapshot = await getDoc(documentRef);

            // Check if the document exists
            if (documentSnapshot.exists()) {
                const tutor: Course = {
                    ...documentSnapshot.data(),
                };
                res.status(200).json(tutor)
            } else {
                res.status(500).json({ error: "Courses not found" })
            }

        } catch (error) {
            res.status(500).json({ error: "Error fetching tuuutor" });
        }

    }
}
