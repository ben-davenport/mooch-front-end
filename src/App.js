import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import NavBar from './components/NavBar/NavBar';
import Home from './components/Home/Home';
import LendTool from './components/LendTool/LendTool';
import LoginPage from './components/LoginPage';
import SingleTool from './components/SingleTool/SingleTool';
import SearchTool from './components/Search/SearchTool'
import Account from './components/Account/Account'
import Messages2 from './components/Messages/messages2'



function App() {
	return (
		<Router>
			<div className="App">
				<Route path="/" component={NavBar} />
				<Route exact path="/" component={Home} />
				<Route path="/tool/newTool" component={LendTool} />
				<Route exact path="/login" component={LoginPage} />
				{/* <Route exact path="/tool/:tool_id" component={SingleTool} /> */}
				<Route exact path="/account" component={Account}/>
				<Route path="/tool/find" component={SearchTool} />
				<Route path="/messages" component={Messages2} />

			</div>
		</Router>
	);
}

export default App;
