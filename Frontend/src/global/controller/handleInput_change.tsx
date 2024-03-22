const handleChange = (
  event: React.ChangeEvent<HTMLInputElement>,
  setValue: React.Dispatch<React.SetStateAction<string>>
) => {
  setValue(event.target.value);
};

export { handleChange };
