import React, { Component } from 'react';
import './App.css';

class App extends Component {
	constructor(props) {
		super(props);

		this.state = {
			searchText: '',
			posts: [],
			error: "asdfads",
		};

		this._searchTextChange = this._searchTextChange.bind(this);
		this._handleSearch = this._handleSearch.bind(this);
	}

	_searchTextChange(event) {
		this.setState({
			searchText: event.target.value
		});
	}

	_handleSearch() {
		var currentText = this.state.searchText;

		// https://public-api.wordpress.com/rest/v1.1/sites/apidemo.wordpress.com/posts/?number=1
		// (https:\/\/)?(.*?\.wordpress.com).*

		this.setState({
			text: currentText
		})
	}

	render() {
		var message;

		if (this.state.error !== false) {
			message = this.state.error;
		} else {
			message = this.state.text;
		}

		// var namesList = names.map(function(name) {
		// 	return <li>{name}</li>;
		// });
		// return <ul>{ namesList }</ul>

		return (
			<div className="App">
				<div className="App-header">
					<h2>WordPress.com Lister</h2>
				</div>
				<div className="App-form">
					<input type="text" className="App-url" onChange={this._searchTextChange} />
					<button className="App-load" onClick={this._handleSearch}>Load</button>
				</div>
				<div>
					{ message }
				</div>
			</div>
		);
	}
}

export default App;
