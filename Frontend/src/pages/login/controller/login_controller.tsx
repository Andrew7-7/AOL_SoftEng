import axios from "axios";
const handleLogin = async (
  email: string,
  password: string,
  setError: React.Dispatch<React.SetStateAction<string>>,
  navigate: any
) => {
  const extraAuth =
    "aolsoftengasdaskjdbasdjbasjbk342342j3aasjdnasjndakjdn73628732h34m23423jh4v2jg32g34c23h42j4k24nl234l2423kn4k23n42k";

  if (!email || !password) {
    setError("All fields must be filled");
    return;
  }

  try {
    const res = await axios.post(
      "http://localhost:3002/user/login",
      { email, password },
      {
        headers: {
          auth: `Bearer ${extraAuth}`,
        },
      }
    );

    if (res.status === 200) {
      console.log(JSON.stringify(res.data));
      window.localStorage.setItem("user", JSON.stringify(res.data.userData));
      window.localStorage.setItem("accToken", res.data.accessToken);
      navigate("/");
    }
  } catch (err: any) {
    if (err.response && err.response.status === 400) {
      setError("Invalid Email or Password");
    } else {
      console.log(err);
    }
  }
};
export default handleLogin;
