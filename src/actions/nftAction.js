import { ethers } from 'ethers';
import {MerkleTree} from "merkletreejs"
import keccak256 from "keccak256"

import { nftContractAddr } from '../config/nftContractAddr';
import nftContractABI from "../contracts/nftContractABI.json"
import influencers from "../data/influencers.json"

const {ethereum} = window
const starTotalSupply = 2000

export class NftAction {
    constructor() {
        if(ethereum) {
            const provider = new ethers.providers.Web3Provider(ethereum)
            const signer = provider.getSigner()
            this.nftContract = new ethers.Contract(nftContractAddr, nftContractABI, signer)
        }

        let leafNodes = influencers.map(item => keccak256(item))
        this.influencerMerkleTree = new MerkleTree(leafNodes, keccak256, {sortPairs: true})
        const root = this.merkleTree.getHexRoot()
        console.log("Merkle Tree Root : ", root)
    }

    usedStar = async() => {
        let usedStars = []
        usedStars = await this.nftContract.usedStar.call()
        return usedStars
    }

    holderMint = async(ids) => {
        await this.nftContract.holderMint(ids)
    }
    
    adminMint = async(wallets, amounts) => {
        await this.nftContract.adminMint([wallets], [amounts])
    }

    influencerMint = async(wallet, amount) => {
        const proof = this.influencerMerkleTree.getHexProof(keccak256(wallet))
        await this.nftContract.influencerMint(amount, proof)
    }

    whitelistMint = async() => {
        // await this.nftContract.whitelistMint(proof, level)
    }

    publicSale = async() => {
        // await this.nftContract.publicSale()
    }
}