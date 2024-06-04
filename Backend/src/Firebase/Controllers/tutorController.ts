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
} from "firebase/firestore";
import { db } from "../Config/config";
import { Request, Response } from "express";

interface Tutor {
	id: string;
	rating: number;
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
const sessionCollection = collection(db, "Session");
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

			const sessionQuerySnapshot = await getDocs(sessionCollectionRef);
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

			return res
				.status(200)
				.json({ class: classDocSnapshot.data(), sessions: sessionData });
		} catch (error) {
			res.status(500).json({ error: "Error fetching tutor" });
		}
	}
	static async getTutors(req: Request, res: Response) {
		try {
			// console.log(req)
			const tutorsSnapshot = await getDocs(tutorsCollection);
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
}
