import { useState } from "react";

import Header from "./layout/header";
import HolderMint from "./pages/holderMint";
import AdminMint from "./pages/adminMint";
import InfluencerMint from "./pages/influencerMint";

function App() {
	const [account, setAccount] = useState(null)

	return (
		<div className="App">
			<Header setAccount={setAccount}/>
			<HolderMint currentAccount={account}/>
			<AdminMint currentAccount = {account} />
			<InfluencerMint/>
		</div>
	);
}

export default App;
