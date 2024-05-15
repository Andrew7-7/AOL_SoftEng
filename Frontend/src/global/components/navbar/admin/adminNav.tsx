import { Link, useNavigate } from "react-router-dom";
import permissionImage from "../../../assets/key.png";
import accountImage from "../../../assets/account.png";
import reportImage from "../../../assets/report.png";
import courseImage from "../../../assets/online-learning.png";
import signOutImage from "../../../assets/logout.png";
import "./adminNav_css.css";
import { useState } from "react";
const AdminNav = () => {
	const [clicked, setClicked] = useState("Permission");
	const navigate = useNavigate();
	const signOut = () => {
		window.localStorage.removeItem("accToken");
		window.localStorage.removeItem("profile");
		window.localStorage.removeItem("user");
		navigate("/login");
	};

	const NavigationLabel = ({
		image,
		title,
		link,
	}: {
		image: string;
		title: string;
		link: string;
	}) => {
		return (
			<Link to={link}>
				<div
					onClick={() => setClicked(title)}
					className={`navLabel ${clicked === title ? "clicked" : ""}`}
				>
					<img className="navLabelImage" src={image}></img>
					<p>{title}</p>
				</div>
			</Link>
		);
	};
	return (
		<div className="adminNav">
			<div className="adminNavTitle">
				<p style={{ color: "#E24E03" }}>STEP</p>
				<p>CODE</p>
			</div>
			<div>
				<NavigationLabel image={permissionImage} title="Permission" link="" />
				<NavigationLabel
					image={accountImage}
					title="Account"
					link="/accountManagement"
				/>
				<NavigationLabel image={reportImage} title="Report" link="" />
				<NavigationLabel
					image={courseImage}
					title="Course"
					link="/courseManagement"
				/>
			</div>
			<div onClick={signOut} className="signOutAdmin">
				<img className="navLabelImage" src={signOutImage}></img>
				<p>Sign Out</p>
			</div>
		</div>
	);
};

export default AdminNav;
