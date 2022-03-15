import { ethers } from 'ethers';
import {MerkleTree} from "merkletreejs"
import keccak256 from "keccak256"
import { soliditySha3 } from 'web3-utils';

import { nftContractAddr } from '../config/nftContractAddr';
import nftContractABI from "../contracts/nftContractABI.json"
import influencers from "../data/influencers.json"
import whitelist from "../data/whitelist.json"

// const { soliditySha3 } = require("web3-utils");
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
        let root = this.influencerMerkleTree.getHexRoot()
        // console.log("Influencer Merkle Tree Root: ", root)

        leafNodes = whitelist.map(item => soliditySha3(item.wallet, item.level))
        this.whitelistMerkleTree = new MerkleTree(leafNodes, keccak256, {sortPairs: true})
        root = this.whitelistMerkleTree.getHexRoot()
        // console.log("Whitelist Merkle Tree Root: ", root)
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

    getWhitelistLevel = (wallet) => {
        for ( let i = 0 ; i < whitelist.length ; i++ ) {
            if( wallet.toLowerCase() == whitelist[i].wallet.toLowerCase() )
                return whitelist[i].level
        }
        return 0
    }

    whitelistMint = async(wallet) => {
        let level = this.getWhitelistLevel(wallet)
        if ( (level > 0) && (level < 4) ) {
            const proof = this.whitelistMerkleTree.getHexProof(soliditySha3(wallet, level))
            await this.nftContract.whitelistMint(proof, level)
        }
    }

    publicSale = async() => {
        // await this.nftContract.publicSale()
    }
}