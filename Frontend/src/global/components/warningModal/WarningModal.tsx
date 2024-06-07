import "./warningModal.css";

interface WarningModalProps {
	message: string;
	show: boolean;
	confirm: any;
	cancel: any;
}

const WarningModal: React.FC<WarningModalProps> = ({
	message,
	show,
	confirm,
	cancel,
}) => {
	if (!show) {
		return null;
	}

	return (
		<div className="warning-modal">
			<div className="overlay"></div>
			<div className="warning-modal-container">
				<div className="content">
					<div className="message">{message}</div>
					<div className="bottom-section">
						<div className="cancel-button" onClick={cancel}>
							Cancel
						</div>
						<div className="confirm-button" onClick={confirm}>
							Confirm
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default WarningModal;
