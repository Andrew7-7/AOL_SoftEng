import TutorNav from "../../../../global/components/navbar/tutor/tutorNav";
import "./yeay.css"
import greenCheck from "../../../../global/assets/greenCheck.png"
import { Link } from "react-router-dom";

const Yeay = () => {
    return(
        <div className="yeayMain">
            <TutorNav clickedItem="Wallet"/>
            <div className="rightComponent">
                <img src= {greenCheck}/>
                <p className="text">Withdraw Successful</p>
                <Link to = "/walletPage">
                    <button>
                        <p>Back to Wallet Page</p>
                    </button>
                </Link>
            </div>
        </div>
    )
}

export default Yeay;