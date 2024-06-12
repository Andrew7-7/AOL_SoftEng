import { collection, getDoc, getDocs, query, where } from "firebase/firestore";
import { db } from "../Config/config";
import { Request, Response } from "express";

const reportCollection = collection(db, "reportList");

export class reportControllers {
  static async getAllReport(req: Request, res: Response) {
    try {
      const q = query(reportCollection, where("reviewed", "==", false));

      const reportSnapshot = await getDocs(q);
      const reports = reportSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      res.status(200).json(reports);
    } catch (error) {
      res.status(500).json({ error: "Error fetching courses" });
    }
  }
}
