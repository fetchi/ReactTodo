var React = require('react');
var uuid = require('node-uuid');
var moment = require('moment');

var TodoList =require('TodoList');
var AddTodo = require('AddTodo');
var TodoSearch = require('TodoSearch');
var TodoAPI = require('TodoAPI');


var TodoApp = React.createClass({
	getInitialState: function(){
		return{
			todos: TodoAPI.getTodos(),
			showCompleted: false,
			searchText: '',

		}
	},
	componentDidUpdate: function (){
		TodoAPI.setTodos(this.state.todos);
	},
	handleAddTodo: function(text){
		//alert('new todo' + text);
		this.setState({
			todos: [
			...this.state.todos, {
			id: uuid(), 
			text: text,
			completed: false,
			createdAt: moment().unix(),
			completedAt: undefined
			}
			]	
		});
	},
	handleToggle: function(id){
		//alert(id);
		var updateTodo = this.state.todos.map((todo)=>{
			if(todo.id === id){
				todo.completed = !todo.completed;
				todo.completedAt = todo.completed ? moment().unix() : undefined;
			}

			return todo;
		});
		this.setState({
			todos: updateTodo
		})
	},
	handleSearch: function(showCompleted, searchText){
		this.setState({
			showCompleted: showCompleted,
			searchText: searchText.toLowerCase()
		})
	},
	render: function(){
		var {todos, showCompleted, searchText} = this.state;
		var filterTodos = TodoAPI.filterTodos(todos, showCompleted, searchText);

		return (
			<div>
				<h1 className="page-title">Junwen Todo</h1>
				<div className="row">
					<div className="column small-centered small-11  medium-10 large-9">
						<div className="container">
							<TodoSearch onSearch={this.handleSearch}/>
							<TodoList todos={filterTodos} onToggle={this.handleToggle}/>
							<AddTodo onAddTodo={this.handleAddTodo}/>
						</div>
					</div>
					
				</div>
			</div>
		);
	}
});

module.exports = TodoApp;