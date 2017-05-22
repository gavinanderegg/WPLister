import React, { Component } from 'react';
import './App.css';

class App extends Component {
	constructor(props) {
		super(props);

		this.state = {
			searchText: '',
			posts: [],
			error: '',
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

		var url = currentText.match(/(https:\/\/)?(.*?\.wordpress.com).*/m);

		// Demo URL: apidemo.wordpress.com
		if (url !== null && url[2] !== undefined && url[2] !== '') {
			fetch('https://public-api.wordpress.com/rest/v1.1/sites/' + url[2] + '/posts/?number=10', {
				method: 'GET'
			}).then((response) => {
				if (response.ok) {
					response.json().then((json) => {
						this.setState({
							posts: json.posts,
						});
					});
				} else {
					this.setState({
						error: url[2] + ' returned a 404'
					});
				}
			});
		} else {
			this.setState({
				error: 'No WordPress.com URL found'
			});
		}
	}

	render() {
		var message;

		if (this.state.error !== false && this.state.posts === []) {
			message = this.state.error;
		} else {
			var posts = this.state.posts.map((post, index) => {
				return <li key={index}>{post.title}</li>;
			});

			message = <ul>{posts}</ul>
		}

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
