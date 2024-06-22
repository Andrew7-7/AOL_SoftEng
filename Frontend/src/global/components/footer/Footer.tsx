import "./footer.css";
import facebookIcon from "../../assets/facebookIcon.png";
import twitterIcon from "../../assets/twitterIcon.png";
import linkedinIcon from "../../assets/linkedinIcon.png";
import instagramIcon from "../../assets/instagramIcon.png";

const Footer = () => {
	return (
		<div className="footer">
			<div className="top">
				<a
					href="https://www.facebook.com"
					target="_blank"
					rel="noopener noreferrer"
				>
					<img src={facebookIcon} alt="Facebook" className="social-icon" />
				</a>
				<a
					href="https://www.twitter.com"
					target="_blank"
					rel="noopener noreferrer"
				>
					<img src={twitterIcon} alt="Twitter" className="social-icon" />
				</a>
				<a
					href="https://www.linkedin.com"
					target="_blank"
					rel="noopener noreferrer"
				>
					<img src={linkedinIcon} alt="LinkedIn" className="social-icon" />
				</a>
				<a
					href="https://www.instagram.com"
					target="_blank"
					rel="noopener noreferrer"
				>
					<img src={instagramIcon} alt="Instagram" className="social-icon" />
				</a>
			</div>
			<div className="bottom">
				<p style={{ color: "#E24E03" }}>STEP</p>
				<p>CODE</p>
			</div>
		</div>
	);
};

export default Footer;
