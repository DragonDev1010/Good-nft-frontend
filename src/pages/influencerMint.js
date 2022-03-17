import { useState, useEffect } from "react"

import {NftAction} from "../actions/nftAction"

const nftAction = new NftAction()

function InfluencerMint(props) {
    const [amount, setAmount] = useState(0)
    const [mintedAmount, setMintedAmount] = useState(0)

    function inputHandler(e) {
        setAmount(+e.target.value)
    }

    async function getMintedAmount() {
        let minted = await nftAction.getInfluencerMintedAmount()
        setMintedAmount(parseInt(minted))
    }

    async function mintHandler() {
        if(props.currentAccount != undefined)
            await nftAction.influencerMint(props.currentAccount, amount)
    }
    
    useEffect(() => {
        getMintedAmount()
    }, [])

    return(
        <div>
            <h3>Already {mintedAmount} NFTs minted</h3>
            <h3>{100 - mintedAmount} NFTs are remaining.</h3>
            Influencer : <input value={amount} onChange={inputHandler}></input>
            <button onClick={mintHandler}>mint</button>
        </div>
    )
}

export default InfluencerMint