import React , { Component } from 'react';
import './App.css';

import ToDoList from './Container/ToDoLists/ToDoList';
import Layout from './Container/Layout/Layout';

class App extends Component {
  render() {
    return (
      <Layout>
          <ToDoList />
      </Layout>
    )
  }
}

export default App;
