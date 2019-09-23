import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Todos from './Todos';
import Header from './Header';
import AddTodo from './AddTodo';
import About from './About';
import './App.css';
import Axios from 'axios';

class App extends React.Component{

  state = { todos:[] }

  componentDidMount() {
    Axios.get('https://jsonplaceholder.typicode.com/todos?limit=5')
    .then(res => this.setState({ todos: res.data }))
  }


  // toggle complete
  markComplete = (id) => {
    this.setState({ todos: this.state.todos.map(todo => {
      if(todo.id === id) {
        todo.completed = !todo.completed
      }
      return todo;
    }) });
  }


  // delete todo
  delTodo = (id) => {
    Axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`)
    .then(res => this.setState({ todos: [...this.state.todos.filter(todo => todo.id !== id)] }));
  }


  // add todo
  addTodo = (title) => {
    Axios.post('https://jsonplaceholder.typicode.com/todos', {
      title: title,
      completed: false
    })
    .then(res => this.setState({ todos: [...this.state.todos, res.data] }));
  }

  
  render(){
    return (
      <Router>
        <div className="App">
          <div className="container">
            <Header/>
            <Route exact path="/" render={props => (
              <React.Fragment>
                <AddTodo addTodo={this.addTodo}/>
                <Todos todos={this.state.todos} markComplete={this.markComplete} delTodo={this.delTodo}/>
              </React.Fragment>
            )} />
            <Route path="/about" component={About} />
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
