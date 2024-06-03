import "./loadingMessage.css";

interface LoadingMessageProps {
	show: boolean;
}

const LoadingMessage: React.FC<LoadingMessageProps> = ({ show }) => {
	return (
		<div className={`loading-message ${show ? "show" : ""}`}>Loading...</div>
	);
};

export default LoadingMessage;
