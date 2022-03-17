import { useState, useEffect } from "react"

import {NftAction} from "../actions/nftAction"

const nftAction = new NftAction()

function InfluencerMint(props) {
    const [amount, setAmount] = useState(0)

    function inputHandler(e) {
        setAmount(+e.target.value)
    }

    function mintHandler() {
        if(props.currentAccount != undefined)
            nftAction.influencerMint(props.currentAccount, amount)
    }
    
    return(
        <div>
            Influencer : <input value={amount} onChange={inputHandler}></input>
            <button onClick={mintHandler}>mint</button>
        </div>
    )
}

export default InfluencerMint