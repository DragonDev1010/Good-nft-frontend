import {useState, useEffect} from "react"

const {ethereum} = window

function Header(props) {
    const [account, setAccount] = useState(null)
    async function isWalletConnected() {
        if(!ethereum) {
            console.log("Make sure you have Metamask installed")
            return
        }

        try {
            const accounts = await ethereum.request({method: 'eth_requestAccounts'})
            console.log("Found an account! Address: ", accounts[0])
            props.setAccount(accounts[0])
            setAccount(accounts[0])
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        isWalletConnected()
    }, [])
    return(
        <div>
            <button>{account == null ? "Connect" : account}</button>
        </div>
    )
}

export default Header