import {NftAction} from "../actions/nftAction"

function InfluencerMint() {
    const nftAction = new NftAction()
    function mintHandler() {
        nftAction.setBaseURI()
    }
    return(
        <div>
            Influencer : <input></input>
            <br/>
            <button onClick={mintHandler}>mint</button>
        </div>
    )
}

export default InfluencerMint