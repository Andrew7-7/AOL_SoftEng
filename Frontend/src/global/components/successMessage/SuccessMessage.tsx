import "./successMessage.css";

interface SuccessMessage {
	message: string;
	show: boolean;
}

const SuccessMessage: React.FC<SuccessMessage> = ({ message, show }) => {
	return (
		<div className={`success-message ${show ? "show" : ""}`}>{message}</div>
	);
};

export default SuccessMessage;
