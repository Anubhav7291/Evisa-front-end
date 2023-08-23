import {TailSpin} from "react-loader-spinner";
const Spinner = () => {
 
    return (
        <div style ={{position: "fixed", top: "60%", left: "50%", transform: "translate(-50%, -50%)" }}>
        <TailSpin
            type="TailSpin"
            color="#1a75ff"
            height={90}
            width={90}
            timeout={5000}
        />
        </div>
 
    );
}
export default Spinner;