import { useState, useEffect } from "react"

import {NftAction} from "../actions/nftAction"

const nftAction = new NftAction()

function WhitelistMint(props) {
    const [amount, setAmount] = useState(0)

    function inputHandler(e) {
        setAmount(+e.target.value)
    }

    function mintHandler() {
        if(props.currentAccount != undefined)
            nftAction.whitelistMint(props.currentAccount)
    }
    return(
        <div>
            Whitelist : <input value={amount} onChange={inputHandler}></input>
            <button onClick={mintHandler}>Mint</button>
        </div>
    )
}

export default WhitelistMint