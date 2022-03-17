import { useState, useEffect } from "react"
import {NftAction} from "../actions/nftAction"

function AdminMint(props) {
    const [amount, setAmount] = useState(0)
    const [adminMinted, setAdminMinted] = useState(0)

    const nftAction = new NftAction()

    function inputHandler(e) {
        setAmount(+e.target.value)
    }

    async function mintHandler() {
        if ( props.currentAccount != null )
            await nftAction.adminMint(props.currentAccount, amount)
    }

    async function getMintedAmount() {
        let minted = await nftAction.getAdminMintedAmount()
        setAdminMinted(parseInt(minted))
    }
    useEffect(() => {
        getMintedAmount()
    }, [props.currentAccount])
    return(
        <div>
            <h3>Admin already minted {adminMinted} NFTs.</h3>
            <h3>{100 - adminMinted} NFTs are still remaining.</h3>
            <input value = {amount} onChange = {inputHandler}></input>
            <button onClick={mintHandler}>Mint</button>
            <br/>
        </div>
    )
}

export default AdminMint