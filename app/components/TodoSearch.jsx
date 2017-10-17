var React = require('react');

var TodoSearch = React.createClass({
	handleSearch: function(){
		var showComplete = this.refs.showComplete.checked;
		var searchText = this.refs.searchText.value;

		this.props.onSearch(showComplete, searchText);
	},
	render: function(){
		return (
			<div>
				<div>
					<input type="search" ref="searchText" placeholder="Search Todo" onChange={this.handleSearch}/>
				</div>
				<div>
					<label>
						<input type="checkbox" ref="showComplete" onChange={this.handleSearch}/>Show completed Todos
					</label>
				</div>
			</div>
		);
	}
});
 
module.exports = TodoSearch;