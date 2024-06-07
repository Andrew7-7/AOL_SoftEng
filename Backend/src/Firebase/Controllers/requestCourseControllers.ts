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

interface RequestCourse {
    id: string;
    [key: string]: any;
}
const RequestCourseCollection = collection(db, "permissions");

export class PermissionControllers {

    static async getPermissions(req: Request, res: Response) {
        try {
            const coursesSnapshot = await getDocs(RequestCourseCollection);
            const courses: RequestCourse[] = coursesSnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            res.status(200).json(courses);
        } catch (error) {
            res.status(500).json({ error: "Error fetching courses" });
        }
    }


    static async getPermission(req: Request, res: Response) {
        try {
            const collectionName = "permissions";
            const documentId = req.params.permissionId;
            const documentRef = doc(db, collectionName, documentId);
            const documentSnapshot = await getDoc(documentRef);

            if (documentSnapshot.exists()) {
                const reqcourse: RequestCourse = {
                    id: documentId,
                    ...documentSnapshot.data(),
                };
                res.status(200).json(reqcourse);
            } else {
                res.status(500).json({ error: "Courses not found" });
            }
        } catch (error) {
            res.status(500).json({ error: "Error fetching tuuutor" });
        }
    }

    static async updatePermission(req: Request, res: Response) {
        try {
            const {
                id,
                message,
                permissionID,
                requestedClass,
                status,
                tutorName,
                certificateImg,
                requestedClassID,
            } = req.body;

            const permissionRef = doc(db, "permissions", id);
            await updateDoc(permissionRef, {
                message,
                permissionID,
                requestedClass,
                status,
                tutorName,
                certificateImg,
                requestedClassID,
            });
            if(status === 'Accepted'){
            // Find the tutor document by tutor name
            const tutorsRef = collection(db, "tutors");
            const tutorQuery = query(tutorsRef, where("name", "==", tutorName));
            const tutorSnapshot = await getDocs(tutorQuery);

            if (tutorSnapshot.empty) {
                throw new Error('Tutor not found');
            }

            tutorSnapshot.forEach(async (doc) => {
                const tutorData = doc.data();
                const courseIds = tutorData.courseIds || [];

                if (!courseIds.includes(requestedClassID)) {
                courseIds.push(requestedClassID);
                }
                await updateDoc(doc.ref, {
                courseIds,
                });
            });
            }
            res.status(200).json({ message: "Permission Request updated successfully" });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}