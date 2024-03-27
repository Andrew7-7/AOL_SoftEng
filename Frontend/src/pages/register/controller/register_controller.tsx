import axios from "axios";
const handleRegister = (
  username: string,
  email: string,
  password: string,
  confirmPassword: string,
  setError: React.Dispatch<React.SetStateAction<string>>,
  navigate: any
) => {
  const fetchRegister = async () => {
    const role = "student";
    const isBanned = false;
    const education = "";
    const extraAuth =
      "aolsoftengasdaskjdbasdjbasjbk342342j3aasjdnasjndakjdn73628732h34m23423jh4v2jg32g34c23h42j4k24nl234l2423kn4k23n42k";

    if (!username || !email || !password || !confirmPassword) {
      setError("All fields must be filled");
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:3002/user/register",
        { username, email, password, role, isBanned, education },
        {
          headers: {
            auth: `Bearer ${extraAuth}`,
          },
        }
      );

      if (res.status === 200) {
        console.log(res.data.message);

        navigate("/login");
      }
    } catch (err: any) {
      if (err.response && err.response.status === 400) {
        setError("Email already exists");
      } else {
        console.log(err);
      }
    }
  };

  fetchRegister();
};
export default handleRegister;
