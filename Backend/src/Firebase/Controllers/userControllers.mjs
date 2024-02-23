import { collection, getDocs, addDoc, doc } from "firebase/firestore";
import { db } from "../Config/config.mjs";

export class UserControllers {
  static async getUser(req, res) {
    try {
      const usersSnapshot = await getDocs(collection(db, "users"));
      const users = usersSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      for (const user of users) {
        const collectionName = "Courses";
        const docRef = doc(db, "users", user.id);
        const collectionSnapshot = await getDocs(
          collection(docRef, collectionName)
        ); 

        const courses = [];

        if (!collectionSnapshot.empty) {
          collectionSnapshot.forEach((collectionDoc) => {
            courses.push({
              id: collectionDoc.id,
              ...collectionDoc.data(),
            });
          });
        }

        user[collectionName] = courses;
      }

      res.status(200).json(users);
    } catch (error) {
      console.error("Error fetching users:", error);
      res.status(500).json({ error: "Error fetching users" });
    }
  }
}
