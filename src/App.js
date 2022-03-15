import { useState } from "react";

import Header from "./layout/header";
import InfluencerMint from "./pages/influencerMint";

function App() {
	const [account, setAccount] = useState(null)

	return (
		<div className="App">
			<Header setAccount={setAccount}/>
			<InfluencerMint/>
		</div>
	);
}

export default App;
