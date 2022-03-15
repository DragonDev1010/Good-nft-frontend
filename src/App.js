import { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import NavBar from "./layout/navBar";
import HolderMint from "./pages/holderMint";
import AdminMint from "./pages/adminMint";
import InfluencerMint from "./pages/influencerMint";
import WhitelistMint from "./pages/whitelistMint";

function App() {
	const [account, setAccount] = useState(null)

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
