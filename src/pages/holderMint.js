import { useState, useEffect } from "react"
import {NftAction} from "../actions/nftAction"
import starHolders from "../data/starHolders.json"

function HolderMint(props) {
    const [ownedStarIds, setOwnedStarIds] = useState([])
    const [usedStarIds, setUsedStarIds] = useState([])
    const [enabledStarIds, setEnabledStarIds] = useState([])
    const [amount, setAmount] = useState(0)

    const nftAction = new NftAction()

    function inputHandler(e) {
        setAmount(+e.target.value)
    }

    async function mintHandler() {
        let ids = []
        for ( let i = 0 ; i < amount ; i++ ) {
            ids.push(enabledStarIds[i])
        }
        let tx
        if(props.currentAccount != null)
            tx = await nftAction.holderMint(props.currentAccount, ids)
        console.log(tx)
    }

    function getOwnedStarIds() {
        let temp = []
        for( let i = 0 ; i < starHolders.length ; i++ ) {
            if ( starHolders[i].wallet.toLowerCase() == props.currentAccount.toLowerCase() )
                temp.push(starHolders[i].id)
        }
        setOwnedStarIds(temp)
    }

    async function getEnableMintIds () {
        let ids = []
        for ( let i = 0 ; i < ownedStarIds.length ; i++ ) {
            let used = await nftAction.usedStarId(ownedStarIds[i])
            if ( !used )
                ids.push(ownedStarIds[i])
        }
        setEnabledStarIds(ids)
    }

    function arrayToString (arr) {
        let str = ""
        for(let i = 0 ; i < arr.length ; i++)
            str += arr[i].toString() + " , "
        return str
    }

    useEffect(() => {
        if(props.currentAccount != null)
            getOwnedStarIds()
    }, [props.currentAccount])
    useEffect(() => {
        getEnableMintIds()
    }, [ownedStarIds])
    return(
        <div>
            Holder : <input value={amount} onChange={inputHandler}></input>
            <button onClick={mintHandler}>Mint</button>
            <br/>
            <p>owned Star Ids: {arrayToString(ownedStarIds)}</p>
            <p>mint enabled StarIds: {arrayToString(enabledStarIds)}</p>
        </div>
    )
}

export default HolderMint