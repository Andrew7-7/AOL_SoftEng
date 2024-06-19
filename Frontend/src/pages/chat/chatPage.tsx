import "./chatPage.css";
import { format } from "date-fns";
import { useEffect, useState, useCallback, useMemo } from "react";
import axios from "axios";
import {
	Timestamp,
	collection,
	onSnapshot,
	orderBy,
	query,
	where,
} from "firebase/firestore";
import { db } from "../../Config/config";
import StudentNav from "../../global/components/navbar/student/student_navbar";
import useFetch from "../../global/hooks/useFetch";
import { useParams } from "react-router-dom";
interface Message {
	email: string;
	message: string;
	timestamp: string;
}

const ChatPage = () => {
	const { tutorId } = useParams();
	const [messages, setMessages] = useState<Message[]>([]);
	const [messageInput, setMessageInput] = useState("");
	const user = JSON.parse(window.localStorage.getItem("user") || "{}");
	const [chatRooms, setChatRooms] = useState<any>([]);
	const [currRoom, setCurrRoom] = useState<string>("");
	const [currProfileURL, setCurrProfileURL] = useState<string>("");
	const [userCache, setUserCache] = useState<{ [key: string]: any }>({});
	const [trigger, setTrigger] = useState(false);

	const createRoom = async () => {
		try {
			const res = await axios.post("http://localhost:3002/chat/createRoom", {
				email: user.email,
				tutorId: tutorId,
			});

			console.log("RESPONSE: ", res);

			setCurrRoom(res.data.room.id);
			const userData = await fetchUserData(res.data.tutor.email);
			setCurrProfileURL(
				userData.profileURL ||
					"https://firebasestorage.googleapis.com/v0/b/aolsofteng.appspot.com/o/Profile%2Fanonymous_profilce_picture.webp?alt=media&token=24c17cb1-3032-432f-a1a1-98c7d9fbff06"
			);
		} catch (error) {}
	};

	useEffect(() => {
		if (tutorId != "x") {
			createRoom();
		}
	}, []);

	useEffect(() => {
		const fetchChatRooms = async () => {
			try {
				const res = await axios.post("http://localhost:3002/chat/getChat", {
					email: user.email,
				});

				if (res != null) {
					setChatRooms(res.data.chatroomDocs);
				}
			} catch (error: any) {}
		};

		fetchChatRooms();
	}, []);

	useEffect(() => {
		console.log("onSnapshot");
		if (currRoom != "") {
			const colRef = collection(db, "ChatRoom", currRoom, "Messages");
			const q = query(colRef, orderBy("timestamp", "asc"));

			const unsubscribe = onSnapshot(q, (querySnapshot) => {
				const msgs: any = [];
				querySnapshot.forEach((doc) => {
					msgs.push(doc.data());
				});
				setMessages(msgs);
			});
			return () => unsubscribe();
		}
	}, [currRoom]);

	const handleRoomClick = (roomId: string, profileURL: string) => {
		setCurrRoom(roomId);
		setCurrProfileURL(profileURL);
	};

	const sendMessage = async () => {
		try {
			await axios.post("http://localhost:3002/chat/postMessage", {
				roomID: currRoom,
				email: user.email,
				message: messageInput,
			});
			setMessageInput("");
		} catch (error) {
			console.log(error);
		}
	};

	const handleInputChange = (e: any) => {
		setMessageInput(e.target.value);
	};

	const fetchUserData = useCallback(
		async (email: string) => {
			if (userCache[email]) {
				return userCache[email];
			}

			console.log("fetchUserData");
			const res = await axios.get(
				`http://localhost:3002/user/getUserByEmail/${email}`
			);
			const userData = res.data;
			setUserCache((prevCache) => ({ ...prevCache, [email]: userData }));
			return userData;
		},
		[userCache]
	);

	interface ChatRoomCardProps {
		roomId: string;
		otherEmail: string;
		lastTimeStamp: Timestamp;
		lastMessage: string;
	}

	const ChatRoomCard: React.FC<ChatRoomCardProps> = ({
		roomId,
		otherEmail,
		lastTimeStamp,
		lastMessage,
	}) => {
		const [userData, setUserData] = useState<any>(null);

		useEffect(() => {
			fetchUserData(otherEmail).then((data) => setUserData(data));
		}, [otherEmail, fetchUserData]);

		const lastTime = new Date(
			lastTimeStamp.seconds * 1000 + lastTimeStamp.nanoseconds / 1000000
		);

		const formattedTime = format(lastTime, "HH:mm");

		if (!userData) {
			return <div></div>;
		}

		return (
			<div
				className={
					currRoom == roomId ? "chat-room-card select" : "chat-room-card"
				}
				key={roomId}
				onClick={() =>
					handleRoomClick(
						roomId,
						userData.profileURL != ""
							? userData.profileURL
							: "https://firebasestorage.googleapis.com/v0/b/aolsofteng.appspot.com/o/Profile%2Fanonymous_profilce_picture.webp?alt=media&token=24c17cb1-3032-432f-a1a1-98c7d9fbff06"
					)
				}
			>
				<img
					src={
						userData.profileURL != ""
							? userData.profileURL
							: "https://firebasestorage.googleapis.com/v0/b/aolsofteng.appspot.com/o/Profile%2Fanonymous_profilce_picture.webp?alt=media&token=24c17cb1-3032-432f-a1a1-98c7d9fbff06"
					}
					alt="User profile"
				/>
				<div className="right">
					<div className="top">
						<div className="name">{userData.username}</div>
						<div className="time">{formattedTime}</div>
					</div>
					<div className="last-message">
						{lastMessage == null ? "Empty chat" : lastMessage}
					</div>
				</div>
			</div>
		);
	};

	return (
		<>
			<StudentNav />
			<div className="chatDiv">
				<div className="leftChatDiv">
					<div className="top">
						<div className="name">{user.username}</div>
						<img
							src={
								user.profileURL != ""
									? user.profileURL
									: "https://firebasestorage.googleapis.com/v0/b/aolsofteng.appspot.com/o/Profile%2Fanonymous_profilce_picture.webp?alt=media&token=24c17cb1-3032-432f-a1a1-98c7d9fbff06"
							}
							alt="Profile"
						/>
					</div>
					<div className="bottom">
						<div className="header">Chat</div>
						<div className="chat-room-container">
							{chatRooms.map((room: any) => (
								<ChatRoomCard
									key={room.id}
									otherEmail={room.otherEmail}
									roomId={room.id}
									lastTimeStamp={room.lastTimeStamp}
									lastMessage={room.lastMessage}
								/>
							))}
						</div>
					</div>
				</div>
				<div className="rightChatDiv">
					<div className="room-container">
						{currRoom === "" ? (
							<div className="blank-room">Blank Room</div>
						) : (
							<div className="message-container">
								<div className="messages">
									{messages.map((message, index) => (
										<>
											{message.email != user.email ? (
												<div className="left-message">
													<img src={currProfileURL} alt="" />
													<div className="message">{message.message}</div>
												</div>
											) : (
												<div
													className="right-message
                      "
												>
													<div className="message">{message.message}</div>
												</div>
											)}
										</>
									))}
								</div>
								<div className="input-form-container">
									<input
										className="input-message"
										type="text"
										name="messageInput"
										onChange={handleInputChange}
										value={messageInput}
									/>
									<div className="send-button" onClick={sendMessage}>
										Send
									</div>
								</div>
							</div>
						)}
					</div>
				</div>
			</div>
		</>
	);
};

export default ChatPage;
