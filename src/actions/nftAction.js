import { ethers } from 'ethers';
import { nftContractAddr } from '../config/nftContractAddr';
import nftContractABI from "../contracts/nftContractABI.json"
const {ethereum} = window

export class NftAction {
    constructor() {
        if(ethereum) {
            const provider = new ethers.providers.Web3Provider(ethereum)
            const signer = provider.getSigner()
            this.nftContract = new ethers.Contract(nftContractAddr, nftContractABI, signer)

            console.log(this.nftContract)
        }
    }

    setBaseURI = async () => {
        await this.nftContract.setBaseURI("test url")
    }


}