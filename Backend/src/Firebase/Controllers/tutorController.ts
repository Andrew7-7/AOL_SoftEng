import {
	collection,
	getDocs,
	addDoc,
	doc,
	query,
	where,
	deleteDoc,
} from "firebase/firestore";
import { db } from "../Config/config";
import { Request, Response } from "express";

interface Tutor {
	id: string;
	rating: number;
	[key: string]: any;
}

const tutorsCollection = collection(db, "tutors");

export class TutorController {
	static async getTutors(req: Request, res: Response) {
		try {
			const tutorsSnapshot = await getDocs(tutorsCollection);
			const tutors: Tutor[] = tutorsSnapshot.docs.map((doc) => ({
				id: doc.id,
				rating: null,
				...doc.data(),
			}));

			for (const tutor of tutors) {
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
}
