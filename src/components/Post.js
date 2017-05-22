import React, { Component } from 'react';
import './Post.css';

class Post extends Component {
	constructor(props) {
		super(props);

		this.state = {
			isOpen: false,
		};

		this._toggleContent = this._toggleContent.bind(this);
	}

	_toggleContent() {
		if (this.state.isOpen) {
			this.setState({
				isOpen: false,
			});
		} else {
			this.setState({
				isOpen: true,
			});
		}
	}

	render() {
		var contentClasses = 'Post-content';

		if (this.state.isOpen) {
			contentClasses += ' open';
		}

		// **************************************************************
		// BE VERY CAREFUL USING `dangerouslySetInnerHTML` IN PRODUCTION!
		// **************************************************************

		return (
			<div>
				<div className="Post-title" dangerouslySetInnerHTML={{__html: this.props.title}} onClick={this._toggleContent}></div>
				<div className={contentClasses} dangerouslySetInnerHTML={{__html: this.props.content}}></div>
			</div>
		);
	}
}

export default Post;