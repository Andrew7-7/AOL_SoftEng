import {
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
import { Request, Response } from "express";

interface Transaction {
    id: string;
    [key: string]: any;
}

const transactionCollection = collection(db, "Transaction");
export class transactionControllers {

    static async getTransactions(req: Request, res: Response) {
        try {
            const coursesSnapshot = await getDocs(transactionCollection);
            const courses: Transaction[] = coursesSnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));

            for (const course of courses) {
                //fetch course detail collection
                const collectionName = "CourseDetail";
                const docRef = doc(db, "Transaction", course.id);
                const collectionSnapshot = await getDocs(
                    collection(docRef, collectionName)
                );

                //TODO tipe interface courseDetail
                const courseDetail: any = [];

                if (!collectionSnapshot.empty) {
                    collectionSnapshot.forEach((collectionDoc) => {
                        courseDetail.push({
                            id: collectionDoc.id,
                            ...collectionDoc.data(),
                        });
                    });
                }
                course[collectionName] = courseDetail;
            }
            res.status(200).json(courses);
        } catch (error) {
            res.status(500).json({ error: "Error fetching courses" });
        }
    }


    static async getTransaction(req: Request, res: Response) {
        try {
            const collectionName = "Transaction";
            const documentId = req.params.transactionId;
            const documentRef = doc(db, collectionName, documentId);
            const documentSnapshot = await getDoc(documentRef);
            const reviews: any = [];

            if (documentSnapshot.exists()) {
                const tutor: Transaction = {
                    id: documentId,
                    ...documentSnapshot.data(),
                };
                console.log(reviews)
                res.status(200).json(tutor);
            } else {
                res.status(500).json({ error: "Courses not found" });
            }
        } catch (error) {
            res.status(500).json({ error: "Error fetching tuuutor" });
        }
    }

    static async registerTransaction(req: Request, res: Response) {
        try {
            const transactionCollection = collection(db, "Transaction");
            let { courseId, paymentMethod, price, tutorEmail, userEmail } = req.body;

            await addDoc(transactionCollection, {
                courseId,
                paymentMethod,
                price,
                tutorEmail,
                userEmail
            });

            const studentsRef = collection(db, "Student");
            const studentQuery = query(studentsRef, where("email", "==", userEmail));
            const studentSnapshot = await getDocs(studentQuery);

            if (studentSnapshot.empty) {
                throw new Error('Student not found');
            }

            studentSnapshot.forEach(async (doc) => {
                const studentData = doc.data();
                const activeCourses = studentData.activeCourse || [];

                if (!activeCourses.includes(courseId)) {
                    activeCourses.push(courseId);
                }
                await updateDoc(doc.ref, {
                    activeCourses,
                });
            });

            res.status(200).json({ message: "New Transaction added successfully" });
        } catch (error) {
            res.status(500).json(error);
        }
    }
}