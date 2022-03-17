import { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import NavBar from "./layout/navBar";
import HolderMint from "./pages/holderMint";
import AdminMint from "./pages/adminMint";
import InfluencerMint from "./pages/influencerMint";
import WhitelistMint from "./pages/whitelistMint";

const {ethereum} = window

function App() {
	const [account, setAccount] = useState(null)

	async function isWalletConnected() {
        if(!ethereum) {
            console.log("Make sure you have Metamask installed")
            return
        }

        try {
            const accounts = await ethereum.request({method: 'eth_requestAccounts'})
            console.log("Found an account! Address: ", accounts[0])
            setAccount(accounts[0])
            setAccount(accounts[0])
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        isWalletConnected()
    }, [])

	return (
		<Router>
			<NavBar />
			<Switch>
				<Route path="/holder" exact>
					<HolderMint currentAccount={account}/>
				</Route>
				<Route path="/admin" exact>
					<AdminMint currentAccount={account}/>
				</Route>
				<Route path="/influencer" exact>
					<InfluencerMint currentAccount={account}/>
				</Route>
				<Route path="/whitelist" exact>
					<WhitelistMint currentAccount={account}/>
				</Route>
				
			</Switch>
		</Router>
	);
}

export default App;
