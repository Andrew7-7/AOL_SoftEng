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
	id: string;
	[key: string]: any;
}

const coursesCollection = collection(db, "Courses");

export class CoursesController {
	static async getCourses(req: Request, res: Response) {
		try {
			const coursesSnapshot = await getDocs(coursesCollection);
			const courses: Course[] = coursesSnapshot.docs.map((doc) => ({
				id: doc.id,
				...doc.data(),
			}));
			res.status(200).json(courses);
		} catch (error) {
			res.status(500).json({ error: "Error fetching courses" });
		}
	}

	static async getCourseById(req: Request, res: Response) {
		try {
			const courseId = req.params.courseId;

			const courseDocRef = doc(db, "Courses", courseId);

			const courseDocSnapshot = await getDoc(courseDocRef);

			if (courseDocSnapshot.exists()) {
				const course: Course = {
					id: courseId,
					...courseDocSnapshot.data(),
				};
				res.status(200).json(course);
			} else {
				res.status(500).json({ error: "Course not found" });
			}
		} catch (error) {
			res.status(500).json({ error: "Error fetching courses" });
		}
	}

	static async getCourse(req: Request, res: Response) {
		try {
			const collectionName = "Courses";
			const documentId = req.params.courseId;
			const documentRef = doc(db, collectionName, documentId);
			const documentSnapshot = await getDoc(documentRef);
			const reviews: any = [];
			if (documentSnapshot.exists()) {
				const tutor: Course = {
					id: documentId,
					...documentSnapshot.data(),
				};
				tutor["CourseDetail"] = reviews;
				console.log(reviews);
				res.status(200).json(tutor);
			} else {
				res.status(500).json({ error: "Courses not found" });
			}
		} catch (error) {
			res.status(500).json({ error: "Error fetching tuuutor" });
		}
	}
}
