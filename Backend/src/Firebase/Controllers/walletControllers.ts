import { Request, Response} from "express";
import { db } from "../Config/config";
import { collection, getDocs, where, query, addDoc } from "firebase/firestore";
import { encrypt } from "../../others/encrypt";

const walletCollection = collection(db, "Wallet");
const transactionCollection = collection(db, "Transaction");
const courseCollection = collection(db, "Courses");
const userCollection = collection(db, "users");
interface UserData {
  email?: string;
  password?: string;
  role?: string;
  username?: string;
}

export class WalletController {
  static async getFinalTransaction(req: Request, res: Response){
    try{
      const email = req.params.email;

      if (!email) {
        return res.status(400).json({ error: 'Email parameter is required' });
      }

      const q = query(walletCollection, where("email", "==", email), where("status", "==", "successful"));
      const querySnapshot = await getDocs(q)

      if (querySnapshot.empty) {
        return res.status(500).json({ error: 'tutor not found' });
      }
      const data = querySnapshot.docs.map(doc => {
        const docData = doc.data();
        if (docData.date && docData.date.toDate) {
          const date = docData.date.toDate();
          // docData.date = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')} ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}:${String(date.getSeconds()).padStart(2, '0')}`;
        }
        return docData;
      });
      data.sort((a, b) => (a.date > b.date ? -1 : 1));
      
      res.status(200).json(data)
    }catch(error){
      res.status(500).json({error: "error fetching data"})
    }
  }static async countValues (req: Request, res:Response){
    try{
      const email = req.params.email;
      const q = query(walletCollection, where("email", "==", email), where("status", "==", "successful"))

      const querySnapshot = await getDocs(q)

      let totalAmount = 0;

      querySnapshot.forEach((doc) => {
        const data = doc.data();
        if(data.type){
          totalAmount += data.amount;
        }else{
          totalAmount -= data.amount;
        }
      });
      
      res.status(200).json(totalAmount)
    }catch(error){
      res.status(500).json({error: "error fetching value"})
    }
  }static async getPendingPayment (req: Request, res: Response){
    try{
      const email = req.params.email;

      const q = query(transactionCollection, where("tutorEmail", "==", email), where("status", "==", "onGoing")) 

      const querySnapshot = await getDocs(q);
      const data = querySnapshot.docs.map(doc => doc.data());

      res.status(200).json(data);
    }catch(error){
      res.status(500).json({error: "failed to fetch pending payment"})
    }
  }static async getCourseName (req: Request, res: Response){
    try{
      const id = req.params.id;

      if (!id) {
        return res.status(400).json({ error: "ID parameter is missing" });
      }

      const q = query(courseCollection, where("CourseID", "==", id));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot) {
        return res.status(404).json({ error: "Course not found" });
      }

      const courseData = querySnapshot.docs.map(doc => doc.data());

      res.status(200).json(courseData[0].CourseName);
    }catch(error){
      res.status(500).json({error: "error fetching course name"})
    }
  }static async getPaymentReceived(req: Request, res: Response){
    try{
      const email = req.params.email;
      const q = query(walletCollection, where("email", "==", email));
      const querySnapshot = await getDocs(q)

      const data = querySnapshot.docs.map(doc => doc.data());

      res.status(200).json(data)
    }catch(error){
      res.status(500).json({error: "error fetching data"})
    }
  }static async validateUser(req: Request, res: Response){
    try{
      const {email, password} = req.body;
      const q = query(userCollection, where("email", "==", email));
      const user = await getDocs(q);

      if (user.empty) {
        return res.status(400).json({ message: "Invalid Email" });
      }

      let userData: UserData = {};
      user.forEach((doc) => {
        userData = { ...doc.data() };
      });

      const passwordMatch = await encrypt.comparePass(
        password,
        userData.password
      );

      if (!passwordMatch) {
        return res.status(401).json({ error: "Invalid password" });
      }else{
        res.status(200).json({message: "valid"})
      }
    }catch(error){
      res.status(500).json({error: "error fetching user"})
    }
  }static async addWallet (req: Request, res: Response){
    try{
      const {email, status, amount} = req.body;
      const date = new Date();

      await addDoc(walletCollection, {
        amount: amount,
        date: date,
        email: email,
        status: status,
        title: "withdrawal",
        type: false
      })

      res.status(200).json({message: "successfully adding data"})
    }catch(error){
      res.status(500).json({error: "error fetching data"})
    }
  }
}