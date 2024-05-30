import "./InputForms.css";

interface InputFormProps {
	label: any;
	placeHolder: string;
	type: string;
	name: string;
	value: any;
	onChange: (event: React.ChangeEvent<any>) => void;
}

const InputForm: React.FC<InputFormProps> = ({
	label,
	placeHolder,
	type,
	name,
	value,
	onChange,
}) => {
	return (
		<div className="input-form">
			<p className={type == "file" ? "file" : ""}>{label}</p>
			{type == "textarea" ? (
				<textarea
					className="text-area"
					placeholder={placeHolder}
					name={name}
					value={value}
					required
					onChange={onChange}
				/>
			) : (
				<input
					className={
						type == "date"
							? "date"
							: type == "checkbox"
							? "checkbox"
							: type == "file"
							? "file"
							: ""
					}
					checked={value}
					placeholder={placeHolder}
					name={name}
					value={value}
					required
					type={type}
					onChange={onChange}
				/>
			)}
		</div>
	);
};

export default InputForm;
