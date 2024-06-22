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
  arrayUnion,
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
      const permissionsSnapshot = await getDocs(RequestCourseCollection);
      const permissions: RequestCourse[] = permissionsSnapshot.docs.map(
        (doc) => ({
          id: doc.id,
          ...doc.data(),
        })
      );
      res.status(200).json(permissions);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async getPermissionsByTutorEmail(req: Request, res: Response) {
    try {
      const tutorEmail = req.params.tutorEmail;

      const permissionsSnapshot = await getDocs(
        query(RequestCourseCollection, where("email", "==", tutorEmail))
      );
      const permissions: RequestCourse[] = permissionsSnapshot.docs.map(
        (doc) => ({
          id: doc.id,
          ...doc.data(),
        })
      );
      res.status(200).json(permissions);
    } catch (error) {
      res.status(500).json({ error: error.message });
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
        res.status(500).json({ error: "Permission not found" });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
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
        email,
        tutorName,
        certificateImg,
        requestedClassID,
      } = req.body;

      console.log(email);

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
      if (status === "Accepted") {
        const tutorsRef = collection(db, "tutors");
        const tutorQuery = query(tutorsRef, where("tutorEmail", "==", email));
        const tutorSnapshot = await getDocs(tutorQuery);

        if (tutorSnapshot.empty) {
          throw new Error("Tutor not found");
        }

        tutorSnapshot.forEach(async (doc) => {
          await updateDoc(doc.ref, {
            courseIds: arrayUnion(requestedClassID),
          });
        });
      }
      res
        .status(200)
        .json({ message: "Permission Request updated successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}
