import Web3 from 'web3';
import UserRegistrationABI from './UserRegistrationABI.json';

const web3 = new Web3('https://sepolia.base.org');
const contractAddress = '0x384f50459c350f21AdD079449BD07F8B8dfBEC51';
const contractABI = UserRegistrationABI;
const userRegistrationContract = new web3.eth.Contract(contractABI, contractAddress);

export default userRegistrationContract;