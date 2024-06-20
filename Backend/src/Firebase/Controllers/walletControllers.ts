import { Request, Response} from "express";
import { db } from "../Config/config";
import { collection, getDocs, where, query, orderBy } from "firebase/firestore";

const walletCollection = collection(db, "Wallet");

export class WalletController {
  static async getFinalTransaction(req: Request, res: Response){
    try{
      const email = req.params.email;

      if (!email) {
        return res.status(400).json({ error: 'Email parameter is required' });
      }

      const q = query(walletCollection, where("email", "==", email));
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
      const q = query(walletCollection, where("email", "==", email))

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
  }
}