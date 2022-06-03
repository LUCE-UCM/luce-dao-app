import { getWeb3 } from "../utils/web3";
import enrollmentContract from "./build/Enrollment.json";

let contractInstance;

//We obtain an instance of the web3 in order to interact with smart contracts.
const web3 = getWeb3();

//We have to check if web3 has a value.
//If we don't check it we don't obtain any
//output in the Microsoft Edge Browser, for instance,
//and the console displays an error message.
if (web3) {
  contractInstance = new web3.eth.Contract(
    enrollmentContract.abi,
    process.env.REACT_APP_ENROLLMENT_CONTRACT_ADDRESS
  );
}

export default contractInstance;
