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
import { storages, db } from "../Config/config";
import { Request, Response } from "express";
import { connectStorageEmulator } from "firebase/storage";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

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
      res.status(500).json({ error: "Error fetching Courses" });
    }
  }

  static async createCourse(req: Request, res: Response) {
    try {
      const {
        courseName,
        courseDescription,
        skill,
        totalSession,
        hourPerSession,
        chapterBreakdowns,
      } = req.body;

      const file = req.file;

      if (!file) {
        return res.status(400).json({ message: "No file uploaded" });
      }

      const metadata = {
        contentType: "image/jpeg",
      };

      const storageRef = ref(storages, "courseImage/" + courseName);
      const uploadTask = uploadBytesResumable(
        storageRef,
        file.buffer,
        metadata
      );

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
        },
        (error) => {
          throw new Error(
            "Something went wrong with file upload: " + error.message
          );
        }
      );

      await new Promise((resolve, reject) => {
        uploadTask.on(
          "state_changed",
          null,
          (error) => reject(error),
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              resolve(downloadURL);
            });
          }
        );
      }).then(async (downloadURL) => {
        const docRef = await addDoc(coursesCollection, {
          Chapters: chapterBreakdowns.length,
          Color: "",
          CourseID: "",
          CourseImage: downloadURL,
          CourseName: courseName,
          Sessions: Number(totalSession),
          Status: "Active",
          Type: "",
          banner: "",
          chapterBreakdown: chapterBreakdowns,
          description: courseDescription,
          skill,
          hourPerSession: Number(hourPerSession),
        });

        await updateDoc(docRef, {
          CourseID: docRef.id,
        });

        res.status(200).json({ message: "Course created successfully" });
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async updateCourse(req: Request, res: Response) {
    try {
      const {
        id,
        courseName,
        courseDescription,
        skill,
        totalSession,
        hourPerSession,
        chapterBreakdowns,
      } = req.body;

      const file = req.file;

      if (file) {
        const metadata = {
          contentType: "image/jpeg",
        };

        const storageRef = ref(storages, "courseImage/" + courseName);
        const uploadTask = uploadBytesResumable(
          storageRef,
          file.buffer,
          metadata
        );

        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log("Upload is " + progress + "% done");
          },
          (error) => {
            throw new Error(
              "Something went wrong with file upload: " + error.message
            );
          }
        );

        await new Promise((resolve, reject) => {
          uploadTask.on(
            "state_changed",
            null,
            (error) => reject(error),
            () => {
              getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                resolve(downloadURL);
              });
            }
          );
        }).then(async (downloadURL) => {
          const courseRef = doc(db, "Courses", id);

          await updateDoc(courseRef, {
            Chapters: chapterBreakdowns.length,
            Color: "",
            CourseID: "",
            CourseImage: downloadURL,
            CourseName: courseName,
            Sessions: Number(totalSession),
            Status: "",
            Type: "",
            banner: "",
            chapterBreakdown: chapterBreakdowns,
            description: courseDescription,
            skill,
            hourPerSession: hourPerSession,
          });

          res.status(200).json({ message: "Course updated successfully" });
        });
      } else {
        const courseRef = doc(db, "Courses", id);

        await updateDoc(courseRef, {
          Chapters: chapterBreakdowns.length,
          Color: "",
          CourseID: "",
          CourseName: courseName,
          Sessions: Number(totalSession),
          Status: "",
          Type: "",
          banner: "",
          chapterBreakdown: chapterBreakdowns,
          description: courseDescription,
          skill,
          hourPerSession: Number(hourPerSession),
        });

        res.status(200).json({ message: "Course updated successfully" });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async getApplyCourses(req: Request, res: Response) {
    const { tutorEmail } = req.params;

    const tutorRef = collection(db, "tutors");

    try {
      const tutorDocs = await getDocs(
        query(tutorRef, where("tutorEmail", "==", tutorEmail))
      );
      const activeCourseId = tutorDocs.docs[0].data().courseIds;

      const coursesSnapshot = await getDocs(coursesCollection);
      const permissionSnapshot = await getDocs(collection(db, "permissions"));

      const courses: Course[] = coursesSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      const permissionCourseId: any[] = [];

      const permissions: any[] = permissionSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      permissions.forEach((permission: any) => {
        if (permission.requestedClassID) {
          permissionCourseId.push(permission.requestedClassID);
        }
      });

      const combinedCourseIds = [...activeCourseId, ...permissionCourseId];

      const filteredCourses: any[] = [];

      courses.forEach((course) => {
        if (!combinedCourseIds.includes(course.id)) {
          filteredCourses.push(course);
        }
      });

      res.status(200).json(filteredCourses);
    } catch (error) {
      res.status(500).json({ error: "Error fetching courses" });
    }
  }

  static async deleteCourse(req: Request, res: Response) {
    try {
      const courseId = req.params.courseId;

      const courseDocRef = doc(db, "Courses", courseId);

      await deleteDoc(courseDocRef);

      res.status(200).json({ message: "Course deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async appyCourse(req: Request, res: Response) {
    try {
      const { email, requestedClassID, tutorName, requestedClass } = req.body;

      console.log(req.body);

      const file = req.file;

      if (!file) {
        return res.status(400).json({ message: "No file uploaded" });
      }

      const metadata = {
        contentType: "image/jpeg",
      };

      const storageRef = ref(storages, "certificate/");
      const uploadTask = uploadBytesResumable(
        storageRef,
        file.buffer,
        metadata
      );

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
        },
        (error) => {
          throw new Error(
            "Something went wrong with file upload: " + error.message
          );
        }
      );

      await new Promise((resolve, reject) => {
        uploadTask.on(
          "state_changed",
          null,
          (error) => reject(error),
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              resolve(downloadURL);
            });
          }
        );
      }).then(async (downloadURL) => {
        const docRef = await addDoc(collection(db, "permissions"), {
          certificateImg: downloadURL,
          email: email,
          requestedClassID: requestedClassID,
          status: "Pending",
          tutorName: tutorName,
          requestedClass: requestedClass,
        });

        await updateDoc(docRef, {
          permissionID: docRef.id,
        });

        res.status(200).json({ message: "Course created successfully" });
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}
