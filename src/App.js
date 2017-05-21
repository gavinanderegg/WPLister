import React, { Component } from 'react';
import './App.css';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		return (
			<div className="App">
				<div className="App-header">
					<h2>WordPress.com Lister</h2>
				</div>
				<div className="App-form">
					<input type="text" className="App-url"/>
					<button className="App-load">Load</button>
				</div>
			</div>
		);
	}
}

export default App;
