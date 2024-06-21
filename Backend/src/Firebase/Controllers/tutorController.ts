import {
  collection,
  getDocs,
  addDoc,
  doc,
  query,
  where,
  deleteDoc,
  getDoc,
  Timestamp,
  updateDoc,
  arrayUnion,
  orderBy,
  limit,
} from "firebase/firestore";
import { db } from "../Config/config";
import { Request, Response } from "express";

interface Tutor {
  id: string;
  rating: number;
  [key: string]: any;
}

interface Course {
  id: string;
  [key: string]: any;
}

interface Session {
  id: string;
  session: number;
  present: Array<string>;
  absent: Array<string>;
  outline: string;
  zoomLink: string;
  startDate: Timestamp;
  endDate: Timestamp;
  done: boolean;
}

interface ClassData {
  id: string;
  sessions: Session[];
}

const tutorsCollection = collection(db, "tutors");
const classCollection = collection(db, "Class");
export class TutorController {
  static async getActiveClass(req: Request, res: Response) {
    try {
      const { tutorEmail } = req.body;

      if (!tutorEmail) {
        return res.status(404).json({ error: "tutorEmail is required" });
      }

      const q = query(classCollection, where("tutorEmail", "==", tutorEmail));
      const querySnapshot = await getDocs(q);

      const classList: any[] = [];
      for (const classDoc of querySnapshot.docs) {
        const classData: ClassData = {
          id: classDoc.id,
          ...classDoc.data(),
          sessions: [],
        };

        const sessionsCollection = collection(
          classCollection,
          classDoc.id,
          "Session"
        );
        const sessionsSnapshot = await getDocs(sessionsCollection);

        const sessionsList: any[] = [];
        sessionsSnapshot.forEach((sessionDoc) => {
          sessionsList.push({ id: sessionDoc.id, ...sessionDoc.data() });
        });

        classData.sessions = sessionsList;
        classList.push(classData);
      }
      res.status(200).json(classList);
    } catch (error) {
      res.status(500).json({ error: "Error fetching tutor" });
    }
  }

  static async getActiveClassDetail(req: Request, res: Response) {
    try {
      const { id } = req.body;
  
      if (!id) {
        return res.status(404).json({ error: "document ID is required" });
      }
  
      const classDocRef = doc(classCollection, id);
      const classDocSnapshot = await getDoc(classDocRef);
  
      if (!classDocSnapshot.exists()) {
        return res.status(404).json({ error: "Class not found" });
      }
  
      const sessionCollectionRef = collection(classDocRef, "Session");
      const sessionQuerySnapshot = await getDocs(query(sessionCollectionRef, orderBy("startDate", "asc")));
  
      const sessionData = sessionQuerySnapshot.docs.map((doc) => {
        const data = doc.data();
        const startDate = data.startDate.toDate();
        const endDate = data.endDate.toDate();
        return {
          ...data,
          id: doc.id,
          startDateTimestamp: startDate.getTime(),
          endDateTimestamp: endDate.getTime(),
        };
      });
  
      return res.status(200).json({ class: classDocSnapshot.data(), sessions: sessionData });
    } catch (error) {
      console.error("Error fetching class details:", error);
      res.status(500).json({ error: "Error fetching class details" });
    }
  }

  static async getCurrActiveClass(req: Request, res: Response) {
    try {
      const { id } = req.body;
  
      if (!id) {
        return res.status(404).json({ error: "document ID is required" });
      }
  
      const classDocRef = doc(classCollection, id);
      const classDocSnapshot = await getDoc(classDocRef);
  
      if (!classDocSnapshot.exists()) {
        return res.status(404).json({ error: "Class not found" });
      }
  
      // Get current timestamp in Firestore-compatible format
      const currentTimestamp = Timestamp.now();
  
      const sessionCollectionRef = collection(classDocRef, "Session");
  
      // Query sessions that start after the current timestamp
      const q = query(sessionCollectionRef, where("startDate", ">", currentTimestamp), orderBy("startDate", "asc"), limit(1));
      const sessionQuerySnapshot = await getDocs(q);
  
      if (sessionQuerySnapshot.empty) {
        return res.status(404).json({ error: "No upcoming sessions found" });
      }
  
      const sessionDoc = sessionQuerySnapshot.docs[0];
      const data = sessionDoc.data();
      const startDate = data.startDate.toDate();
      const endDate = data.endDate.toDate();
  
      const sessionData = {
        ...data,
        id: sessionDoc.id,
        startDateTimestamp: startDate.getTime(),
        endDateTimestamp: endDate.getTime(),
      };
  
      return res.status(200).json({ class: classDocSnapshot.data(), session: sessionData });
    } catch (error) {
      console.error("Error fetching class details:", error);
      res.status(500).json({ error: "Error fetching class details" });
    }
  }

  static async getTutors(req: Request, res: Response) {
    try {
      const courseId = req.params.courseId;

      const q = query(
        tutorsCollection,
        where("courseIds", "array-contains", courseId)
      );

      const tutorsSnapshot = await getDocs(q);
      const tutors: Tutor[] = tutorsSnapshot.docs.map((doc) => ({
        id: doc.id,
        rating: null,
        ...doc.data(),
      }));

      for (const tutor of tutors) {
        //Fetch review collection
        const collectionName = "reviews";
        const docRef = doc(db, "tutors", tutor.id);
        const collectionSnapshot = await getDocs(
          collection(docRef, collectionName)
        );

        const reviews: any = [];

        var totalRating = 0;

        if (!collectionSnapshot.empty) {
          collectionSnapshot.forEach((collectionDoc) => {
            reviews.push({
              id: collectionDoc.id,
              ...collectionDoc.data(),
            });
            totalRating += collectionDoc.data().rating;
          });
        }

        tutor.rating = totalRating / reviews.length;

        tutor[collectionName] = reviews;
      }

      res.status(200).json(tutors);
    } catch (error) {
      res.status(500).json({ error: "Error fetching tutors" });
    }
  }

  static async getTutor(req: Request, res: Response) {
    try {
      const tutorId = req.params.tutorId;

      const tutorDocRef = doc(db, "tutors", tutorId);

      const tutorDocSnapshot = await getDoc(tutorDocRef);

      if (tutorDocSnapshot.exists()) {
        const tutor: Tutor = {
          id: tutorId,
          rating: null,
          ...tutorDocSnapshot.data(),
        };

        //Fetch review collection
        const collectionName = "reviews";
        const docRef = doc(db, "tutors", tutor.id);
        const collectionSnapshot = await getDocs(
          collection(docRef, collectionName)
        );

        const reviews: any = [];

        var totalRating = 0;

        if (!collectionSnapshot.empty) {
          collectionSnapshot.forEach((collectionDoc) => {
            reviews.push({
              id: collectionDoc.id,
              ...collectionDoc.data(),
            });
            totalRating += collectionDoc.data().rating;
          });
        }

        tutor.rating = totalRating / reviews.length;

        tutor[collectionName] = reviews;
        res.status(200).json(tutor);
      } else {
        res.status(500).json({ error: "Tutor not found" });
      }
    } catch (error) {
      res.status(500).json({ error: "Error fetching tutor" });
    }
  }

  static async editSessionTime(req: Request, res: Response) {
    try {
      const { classID, sessionID, updatedStartDate, updatedEndDate } = req.body;

      if (!classID || !sessionID || !updatedStartDate || !updatedEndDate) {
        return res.status(404).json({ error: "required all items" });
      }

      const classDocRef = doc(classCollection, classID);

      const classDocSnapshot = await getDoc(classDocRef);

      if (!classDocSnapshot.exists()) {
        return res.status(404).json({ error: "Class not found" });
      }
      const sessionDocRef = doc(classDocRef, "Session", sessionID);
      const parsedStartDate = Timestamp.fromMillis(parseInt(updatedStartDate));
      const parsedEndDate = Timestamp.fromMillis(parseInt(updatedEndDate));
      await updateDoc(sessionDocRef, {
        startDate: parsedStartDate,
        endDate: parsedEndDate,
      });

      return res.status(200).json({ message: "success" });
    } catch (error) {
      res.status(500).json({ error: "Error fetching tutor" });
    }
  }

  static async submitAttendance(req: Request, res: Response) {
    try {
      const { classId, sessionId, attend, absent } = req.body;

      console.log(req.body);

      if (!classId || !sessionId || !attend || !absent) {
        return res.status(404).json({ error: "required all items" });
      }

      const classDocRef = doc(classCollection, classId);

      const classDocSnapshot = await getDoc(classDocRef);

      if (!classDocSnapshot.exists()) {
        return res.status(404).json({ error: "Class not found" });
      }
      const sessionDocRef = doc(classDocRef, "Session", sessionId);

      await updateDoc(sessionDocRef, {
        attend: attend,
        absent: absent,
        done: true,
      });

      return res
        .status(200)
        .json({ message: "Attendance submitted successfully" });
    } catch (error) {
      res.status(500).json({ error: "error" });
    }
  }

  


  static async studentApplyClass(req: Request, res: Response) {
    const {student, tutorEmail, courseId } = req.body

    const classRef = collection(db, "Class")

    const q = query(
      classRef,
      where("courseId", "==", courseId),
      where("tutorEmail", "==", tutorEmail)
    )

    const classQuerySnapshot = await getDocs(q)

    if(classQuerySnapshot.empty){
      const courseDocRef = doc(db, "Courses", courseId);

      const courseDocSnapshot = await getDoc(courseDocRef);

      const course: Course = {
        id: courseId,
        ...courseDocSnapshot.data(),
      };

      const sessions: any = []

      const currentDate = new Date()

      for(let sessionNumber = 0 ; sessionNumber < course.Sessions ; sessionNumber++){
        const startDate = new Date(currentDate.getTime() + (sessionNumber + 1) * 7 * 24 * 60 * 60 * 1000);
        const endDate = new Date(startDate.getTime() + parseInt(course.hourPerSession) * 60 * 60 * 1000);

        const outline = (sessionNumber + 1 > course.chapterBreakdown.length) ? "Extra material" : course.chapterBreakdown[sessionNumber] 

        const baseUrl = 'https://zoom.us/j/';
        const meetingId = Math.floor(Math.random() * 1000000000); // Generate a random meeting ID
        const password = Math.random().toString(36).slice(2, 8); // Generate a random 6-character password

        const session: any = {
          absent: [],
          done: false,
          endDate: Timestamp.fromDate(endDate),
          outline: outline,
          present: [],
          startDate: Timestamp.fromDate(startDate),
          zoomLink: `${baseUrl}${meetingId}?pwd=${password}`,
        };

        sessions.push(session)
      }

      const classDocRef = await addDoc(classRef, {
        student: [student],
        tutorEmail: tutorEmail,
        course: {
          courseName: course.CourseName,
          totalSession: course.Sessions
        }
      })

      for (const session of sessions) {
        await addDoc(collection(classDocRef, 'Session'), session);
      }

      return res.status(200)
    }else{
      const classDocRef = classQuerySnapshot.docs[0].ref

      await updateDoc(classDocRef, {
        student: arrayUnion(student)
      })

      return res.status(200)
    }
  }
}
	
