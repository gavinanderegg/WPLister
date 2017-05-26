import React, { Component } from 'react';
import './App.css';

import Post from './components/Post.js';

class App extends Component {
	constructor(props) {
		super(props);

		this.state = {
			searchText: '',
			posts: [],
			info: false,
			error: '',
		};

		this._searchTextChange = this._searchTextChange.bind(this);
		this._handleSearch = this._handleSearch.bind(this);
	}

	_searchTextChange(event) {
		this.setState({
			searchText: event.target.value,
		});
	}

	_handleSearch() {
		var currentText = this.state.searchText;

		var url = currentText.match(/(https:\/\/)?(.*?\.wordpress.com).*/m);

		this.setState({
			posts: [],
			info: false,
		});

		// Demo URL: apidemo.wordpress.com
		if (url !== null && url[2] !== undefined && url[2] !== '') {
			// Get content
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
						error: url[2] + ' returned a 404',
					});
				}
			});

			// Get stats
			fetch('https://public-api.wordpress.com/rest/v1.1/sites/' + url[2], {
				method: 'GET'
			}).then((response) => {
				if (response.ok) {
					response.json().then((json) => {
						this.setState({
							info: {
								id: json.ID,
								name: json.name,
								description: json.description,
								subscribers_count: json.subscribers_count,
							}
						});
					});
				}
			});

		} else {
			this.setState({
				error: 'No WordPress.com URL found',
			});
		}
	}

	render() {
		var statusMessage, info, posts;

		if (this.state.error !== '' && this.state.posts.length === 0) {
			statusMessage = this.state.error;
		} else {
			posts = this.state.posts.map((post, index) => {
				return <Post key={index} title={post.title} content={post.content} />;
			});
		}

		if (this.state.info !== false) {
			info = (
				<div>
					<p><strong>{this.state.info.name}</strong> — {this.state.info.description}<br />
					<strong>ID:</strong> {this.state.info.id} — <strong>Subscribers:</strong> {this.state.info.subscribers_count}</p>
				</div>
			)
		} else {
			info = '';
		}

		return (
			<div className="App">
				<div className="App-header">
					<h2>WordPress.com Lister</h2>
				</div>
				<div className="App-content">
					<div className="App-form">
						<input type="text" className="App-url" onChange={this._searchTextChange} />
						<button className="App-load" onClick={this._handleSearch}>Load</button>
					</div>
					<div className="App-status">
						{statusMessage}
					</div>
					<div className="App-info">
						{info}
					</div>
					<div className="App-posts">
						{posts}
					</div>
				</div>
			</div>
		);
	}
}

export default App;
