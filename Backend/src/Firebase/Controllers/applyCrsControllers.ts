import { collection, QuerySnapshot, getDocs, getDoc, doc, addDoc } from "firebase/firestore";
import { db } from "../Config/config";
import { Request, Response } from "express";

const tutorCollection = collection(db, "tutors")
const permissionCollection = collection(db, "permissions")
const courseCollection =  collection(db, "Courses")

interface Tutor {
    id: string;
    courseIds?: string[];
    email: string;
}

interface Course {
    id: string;
    CourseID: number;
}

interface Permission{
    id: string;
    tutorName: string;
}


export class courseControllers{

    static async getApplication(req: Request, res: Response){
        try {
            const {email} = req.body;
            const querySnapshot: QuerySnapshot = await getDocs(permissionCollection);
            const permissions = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            })) as Permission[];

            const filteredPermissions = email
                ? permissions.filter(permission => permission.tutorName.toLowerCase() === email.toLowerCase())
                : permissions;

            res.status(200).json({permissions: filteredPermissions})
        } catch (error) {
            console.error("Error fetching permissions:", error);
            res.status(500).json({ error: "Failed to fetch permissions" });
        }
    }

    static async getTutorCourses(req: Request, res: Response) {
        try {
            const {email} = req.body;
            const tutorSnapshot: QuerySnapshot = await getDocs(tutorCollection);
            const courseSnapshot: QuerySnapshot = await getDocs(courseCollection);

            console.log("Fetched tutors:", tutorSnapshot.docs.map(doc => doc.data()));
            console.log("Fetched courses:", courseSnapshot.docs.map(doc => doc.data()));
    
            const tutors = tutorSnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            })) as Tutor[];
    
            const courses = courseSnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            })) as Course[];

            const filteredTutors = email
                ? tutors.filter(tutor => tutor.email.toLowerCase() === email.toLowerCase())
                : tutors;
    
            const tutorCourses = filteredTutors.map(tutor => {

                const join = courses.filter(course => !tutor.courseIds.includes(course.CourseID.toString()));
                return {
                    ...tutor,
                    courses: join,
                }
            })
    
            res.status(200).json({ tutorCourses })
        }
         catch (error) {
            console.error('Error fetching tutors with courses:', error);
            res.status(500).json({ error: 'Failed to fetch tutors with courses' });
        }
    }

    static async postPermission(req: Request, res: Response){
        try {
            const { permissionID, requestedClass, requestedClassID, tutorName } = req.body;
            const status = '';
            const message = '';

            const certificateImg = req.file.path;

            const newPermission = {
                permissionID,
                requestedClass,
                requestedClassID,
                tutorName,
                status,
                message,
                certificateImg
            };

            await addDoc(permissionCollection, newPermission);

            res.status(200).json({ message: 'Permission request submitted successfully' });
        } catch (error) {
            console.error('Error in postPermission:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }

}