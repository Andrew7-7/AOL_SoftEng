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
            const transactionSnapshot = await getDocs(transactionCollection);
            const transactions: Transaction[] = transactionSnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));

            for (const transaction of transactions) {
                const collectionName = "CourseDetail";
                const docRef = doc(db, "Transaction", transaction.id);
                const collectionSnapshot = await getDocs(
                    collection(docRef, collectionName)
                );
                const courseDetail: any = [];

                if (!collectionSnapshot.empty) {
                    collectionSnapshot.forEach((collectionDoc) => {
                        courseDetail.push({
                            id: collectionDoc.id,
                            ...collectionDoc.data(),
                        });
                    });
                }
                transaction[collectionName] = courseDetail;
            }
            res.status(200).json(transactions);
        } catch (error) {
            res.status(500).json({ error: error.message });
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
                const transaction: Transaction = {
                    id: documentId,
                    ...documentSnapshot.data(),
                };
                console.log(reviews)
                res.status(200).json(transaction);
            } else {
                res.status(500).json({ error: "Transaction not found" });
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async registerTransaction(req: Request, res: Response) {
        try {
            const transactionCollection = collection(db, "Transaction");
            let { courseId, paymentMethod, price, tutorName, userEmail } = req.body;

            await addDoc(transactionCollection, {
                courseId,
                paymentMethod,
                price,
                tutorName,
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
                const activeCourse = studentData.activeCourse || [];

                if (!activeCourse.includes(courseId)) {
                    activeCourse.push(courseId);
                }
                await updateDoc(doc.ref, {
                    activeCourse,
                });
            });

            res.status(200).json({ message: "New Transaction added successfully" });
        } catch (error) {
            console.error("Error making new transaction:", error);
            res.status(500).json({ error: error.message });
        }
    }
}