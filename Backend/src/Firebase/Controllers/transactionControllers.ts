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
import firebase from "firebase/compat/app";

interface Transaction {
    id: string;
    [key: string]: any;
}
const firestore = firebase.firestore();
const docRef = firestore.collection('collectionName').doc('documentId');
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
            const userCollection = collection(db, "Transaction");
            let { courseId, paymentMethod, price, tutorEmail, userEmail } = req.body;

            await addDoc(userCollection, {
                courseId,
                paymentMethod,
                price,
                tutorEmail,
                userEmail
            });

            res.status(200).json({ message: "New Transaction added successfully" });
        } catch (error) {
            res.status(500).json(error);
        }
    }

    static async addActiveCourse(req: Request, res: Response) {
        try {
            

            // Step 1: Retrieve the Document
            docRef.get().then((doc) => {
                if (doc.exists) {
                    // Step 2: Update the Array
                    const data = doc.data();
                    const newArray = data.arrayField; // Assume 'arrayField' is the name of your array field
                    newArray.push('newElement'); // Adding a new element to the array

                    // Step 3: Update the Document
                    return docRef.update({ arrayField: newArray });
                } else {
                    console.log("Document not found");
                }
            }).then(() => {
                console.log("Document updated successfully");
            }).catch((error) => {
                console.error("Error updating document: ", error);
            });
        } catch (error) {

        }
    }
}
