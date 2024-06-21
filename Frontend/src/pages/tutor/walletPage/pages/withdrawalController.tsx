import axios from "axios";



const verifyPassword = async (
  email: string,
  password: string,
  setError: React.Dispatch<React.SetStateAction<string>>,
  navigate: any,
  amount: Number
) => {
  const extraAuth =
    "aolsoftengasdaskjdbasdjbasjbk342342j3aasjdnasjndakjdn73628732h34m23423jh4v2jg32g34c23h42j4k24nl234l2423kn4k23n42k";

  if (!email || !password) {
    setError("All fields must be filled");
    return;
  }
  
  try {
    const res = await axios.post(
      "http://localhost:3002/wallet/validate",
      { email, password },
      {
        headers: {
          auth: `Bearer ${extraAuth}`,
        },
      }
    );

    if (res.status === 200) {
      try{
        const res2 = await axios.post(
          "http://localhost:3002/wallet/addWallet", 
          {email, status: "successful", amount },
          {
            headers: {
              auth: `Bearer ${extraAuth}`,
            },
          }
        )
      }catch(error){
        console.error(error)
      }
      navigate("/walletPage/withdraw/yeay");
    } else {
      setError("Password verification failed");
    }
  } catch (err: any) {
      setError("Invalid Password");
  }
};

export default verifyPassword;
