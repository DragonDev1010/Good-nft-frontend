import { useState, useEffect } from "react"
import {NftAction} from "../actions/nftAction"

function AdminMint(props) {
    const [amount, setAmount] = useState(0)

    const nftAction = new NftAction()

    function inputHandler(e) {
        setAmount(+e.target.value)
    }

    function mintHandler() {
        if ( props.currentAccount != null )
            nftAction.adminMint(props.currentAccount, amount)
    }
    return(
        <div>
            Admin : <input value = {amount} onChange = {inputHandler}></input>
            <button onClick={mintHandler}>Mint</button>
            <br/>
        </div>
    )
}

export default AdminMint