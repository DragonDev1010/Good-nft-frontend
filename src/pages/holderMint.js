import { useState, useEffect } from "react"
import {NftAction} from "../actions/nftAction"
import starHolders from "../data/starHolders.json"

function HolderMint(props) {
    const [ownedStarIds, setOwnedStarIds] = useState([])
    const [enabledStarIds, setEnabledStarIds] = useState([])
    const [amount, setAmount] = useState(0)

    const nftAction = new NftAction()

    function inputHandler(e) {
        setAmount(+e.target.value)
    }

    function mintHandler() {
        let ids = []
        for ( let i = 0 ; i < amount ; i++ ) {
            ids.push(enabledStarIds[i])
        }
        nftAction.holderMint(ids)
    }

    function getOwnedStarIds() {
        let temp = []
        for( let i = 0 ; i < starHolders.length ; i++ ) {
            if ( starHolders[i].wallet.toLowerCase() == props.currentAccount.toLowerCase() )
                temp.push(starHolders[i].id)
        }
        setOwnedStarIds(temp)
    }

    function getEnableMintIds () {
        let usedIds = [1,2,3]
        let ids = []
        for ( let i = 0 ; i < ownedStarIds.length ; i++ ) {
            if ( !usedIds.includes( ownedStarIds[i] ) )
                ids.push(ownedStarIds[i])
        }
        setEnabledStarIds(ids)
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
            <p>enabledStarIds: {enabledStarIds}</p>
        </div>
    )
}

export default HolderMint