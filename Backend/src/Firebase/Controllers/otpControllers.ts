import {
  collection,
  getDocs,
  updateDoc,
  where,
  query,
  getDoc,
  addDoc,
  Timestamp,
  deleteDoc,
} from "firebase/firestore";
import { storages, db } from "../Config/config";
import { Request, Response } from "express";
import { generateOTP } from "../../others/generateOTP";
import nodemailer from "nodemailer";
import { encrypt } from "../../others/encrypt";
import { SendEmail } from "../../others/sendEmail";
const { OTP_EMAIL, OTP_PASS } = process.env;
// Collection OTP
const otpCollection = collection(db, "OTP");

interface OTPData {
  createdAt?: Timestamp;
  email?: string;
  expiredAt?: Timestamp;
  otp?: string;
}
export class OTPControllers {
  static async sendOTP(req: Request, res: Response) {
    try {
      const { email } = req.body;
      if (!email) {
        res.status(404).json({ message: "Provide email" });
        return;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!emailRegex.test(email)) {
        res.status(404).json({ message: "Invalid email address format" });
        return;
      }

      const otp = await generateOTP();
      SendEmail(email, "STEPCODE Verification OTP Code", otp);

      const hashedOTP = await encrypt.hashPass(otp);

      const q = query(otpCollection, where("email", "==", email));
      const queryOTP = await getDocs(q);
      if (!queryOTP.empty) {
        const doc = queryOTP.docs[0];
        const docRef = doc.ref;
        await updateDoc(docRef, {
          otp: hashedOTP,
          createdAt: Timestamp.now(),
          expiredAt: Timestamp.fromMillis(Date.now() + 10 * 60 * 1000),
        });
        res.status(200).json({ message: "OTP successfully sent" });
      } else {
        await addDoc(otpCollection, {
          email,
          otp: hashedOTP,
          createdAt: Timestamp.now(),
          expiredAt: Timestamp.fromMillis(Date.now() + 10 * 60 * 1000),
        });
        res.status(200).json({ message: "OTP successfully sent" });
      }
    } catch (error) {
      throw error;
    }
  }

  static async checkOTP(req: Request, res: Response) {
    try {
      const { email, otp } = req.body;
      const q = query(otpCollection, where("email", "==", email));
      const queryOTP = await getDocs(q);
      let otpData: OTPData = {};
      let doc;
      if (!queryOTP.empty) {
        doc = queryOTP.docs[0];
        otpData = doc.data();

        if (Timestamp.now() > otpData.expiredAt) {
          res.status(404).json({ message: "OTP expired" });
          return;
        }

        const otpMatch = await encrypt.comparePass(otp, otpData.otp);
        if (otpMatch === true) {
          await deleteDoc(doc.ref);
          res.status(200).json({ message: "OTP matched" });
        } else {
          res.status(404).json({ message: "OTP not matched" });
        }
      } else {
        res.status(404).json({ message: "No email with OTP found" });
      }
    } catch (error) {
      throw error;
    }
  }
}
