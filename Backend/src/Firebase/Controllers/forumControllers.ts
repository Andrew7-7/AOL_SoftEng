import { QuerySnapshot, addDoc, collection, getDocs, Timestamp, getDoc, doc, updateDoc, deleteDoc, increment } from "firebase/firestore";
import { db } from "../Config/config";
import { Request, Response } from "express";

const forumCollection = collection(db, "Forum");

export class forumControllers{
    
    static async getForum(req: Request, res: Response) {
        try {
            const querySnapshot: QuerySnapshot = await getDocs(collection(db, "Forum"));
            const forums = await Promise.all(querySnapshot.docs.map(async (doc) => {
                const forumData = doc.data();
                const forumId = doc.id;

                const repliesSnapshot = await getDocs(collection(db, "Forum", forumId, "Replies"));
                const repliesCount = repliesSnapshot.size;

                return {
                    id: forumId,
                    ...forumData,
                    repliesCount: repliesCount
                };
            }));

            res.status(200).json({ forums });
        } catch (error) {
            console.error("Error fetching forum:", error);
            res.status(500).json({ error: "Failed to fetch forum" });
        }
    }

    static async getForumDetail(req: Request, res: Response) {
        try {
            const forumId = req.params.forumsId;
            const forumDetailCollection = collection(db, "Forum", forumId, "ForumDetail");
            const querySnapshot: QuerySnapshot = await getDocs(forumDetailCollection);
            const forumDetails = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
            }));

            res.status(200).json({ forumDetails });
        } catch (error) {
            console.error("Error fetching forum detail:", error);
            res.status(500).json({ error: "Failed to fetch forum detail" });
        }
    }

    static async getReplies(req: Request, res: Response){
        try {
            const forumId = req.params.forumsId;
            const repliesCollection = collection(db, "Forum", forumId, "Replies");
            const querySnapshot2: QuerySnapshot = await getDocs(repliesCollection);
            const replies = querySnapshot2.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));

            res.status(200).json({replies});
        } catch (error) {
            console.error("Error fetching replies:", error);
            res.status(500).json({ error: "Failed to fetch replies" });
        }
    }

    static async sendReply(req: Request, res: Response){
        try {
            const {message, senderEmail} = req.body;
            const forumId = req.params.forumsId;
            const repliesCollection = collection(db, "Forum", forumId, "Replies");

            await addDoc(repliesCollection, {
                message: message,
                senderEmail: senderEmail
            });

            res.status(200).json({message: "Message sent successfully!"});
        } catch (error) {
            console.error("Error sending message:", error);
            res.status(500).json({ error: "Failed to send message" });
        }
    }

    static async updateReply(req: Request, res: Response) {
        try {
            const { message } = req.body;
            const forumId = req.params.forumsId;
            const replyId = req.params.replyId;

            const replyDocRef = doc(db, "Forum", forumId, "Replies", replyId);
            const replyDocSnapshot = await getDoc(replyDocRef);

            if (!replyDocSnapshot.exists()) {
                return res.status(404).json({ error: "Reply not found" });
            }

            await updateDoc(replyDocRef, {
                message: message || replyDocSnapshot.data().message,
            });

            res.status(200).json({ message: "Reply updated successfully!" });
        } catch (error) {
            console.error("Error updating reply:", error);
            res.status(500).json({ error: "Failed to update reply" });
        }
    }

    static async postForum(req: Request, res: Response) {
        try {
            const { course, detailSnippet, question, forumDetail } = req.body;

            const { color, courseName } = course;
            const { imageURL, sender } = forumDetail;
            const { senderEmail, senderImageUrl } = sender;

            const date = Timestamp.now();
            const view = 0;

            const forumRef = await addDoc(forumCollection, {
                course: { courseName, color },
                detailSnippet,
                question,
                view,
            });

            const forumDetailRef = await addDoc(collection(forumRef, 'ForumDetail'), {
                imageURL,
                sender: { senderEmail, senderImageUrl },
                date,
            });

            res.status(200).json({ message: 'Forum posted successfully' });
        } catch (error) {
            console.error('Error posting forum:', error);
            res.status(500).json({ error: 'Failed to post forum' });
        }
    }

    static async updateForum(req: Request, res: Response) {
        try {
            const { forumId } = req.params;
            const { course, detailSnippet, question, forumDetail } = req.body;
            const { color, courseName } = course;
            const { imageURL } = forumDetail;

            const date = Timestamp.now();

            const forumDocRef = doc(db, "Forum", forumId);
            await updateDoc(forumDocRef, {
                course: { courseName, color },
                detailSnippet,
                question,
            });

            const forumDetailQuerySnapshot = await getDocs(collection(forumDocRef, "ForumDetail"));
            const forumDetailDocId = forumDetailQuerySnapshot.docs[0].id;

            const forumDetailRef = doc(db, "Forum", forumId, "ForumDetail", forumDetailDocId);
            await updateDoc(forumDetailRef, {
                imageURL: imageURL,
                date: date
            });

            res.status(200).json({ message: 'Forum updated successfully' });
        } catch (error) {
            console.error('Error updating forum:', error);
            res.status(500).json({ error: 'Failed to update forum' });
        }
    }

    static async deleteReply(req: Request, res: Response){
        try {
            const { forumId, replyId } = req.params;

            const replyDocRef = doc(db, "Forum", forumId, "Replies", replyId);

            await deleteDoc(replyDocRef);

            res.status(200).json({ message: 'Reply deleted successfully' });
        } catch (error) {
            console.error('Error deleting reply:', error);
            res.status(500).json({ error: 'Failed to delete reply' });
        }
    }

    static async deleteForum(req: Request, res: Response) {
        try {
            const { forumId } = req.params;

            const forumDocRef = doc(db, "Forum", forumId);

            await deleteDoc(forumDocRef);

            res.status(200).json({ message: 'Forum deleted successfully' });
        } catch (error) {
            console.error('Error deleting forum:', error);
            res.status(500).json({ error: 'Failed to delete forum' });
        }
    }

    static async incrementView(req: Request, res: Response){
        try {
            const { forumId } = req.params;
            const forumDocRef = doc(db, "Forum", forumId);
            await updateDoc(forumDocRef,{
                view: increment(1)
            });
            res.status(200).json({message: 'view count incremented'})
        } catch (error) {
            console.error('Error incrementing view count:', error);
            res.status(500).json({error: 'Failed to increment view count'});
        }
    }

}