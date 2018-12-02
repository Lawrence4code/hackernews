import React, { Component } from 'react';
import Search from './components/Search';
import List from './components/List';
import './App.css';

// const list = [
//   {
//     title: 'React',
//     url: 'https://reactjs.org',
//     author: 'Jordan Walke',
//     num_comments: 3,
//     points: 4,
//     objectId: 0
//   },
//   {
//     title: 'Redux',
//     url: 'https://redux.org/',
//     author: ['Dan Abramov', 'Andrew Clark'],
//     num_comments: 2,
//     points: 5,
//     objectId: 1
//   }
// ];

const DEFAULT_QUERY = 'redux';
const PATH_BASE = 'https://hn.algolia.com/api/v1';
const PATH_SEARCH = '/search';
const PARAM_SEARCH = 'query';

const url = `${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}=${DEFAULT_QUERY}`;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { list: null, searchTerm: DEFAULT_QUERY };
    this.setSearchTopStories = this.setSearchTopStories.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);
    this.onDismiss = this.onDismiss.bind(this);
  }

  setSearchTopStories(list) {
    this.setState(() => {
      return { list };
    });
  }

  componentDidMount() {
    const { searchTerm } = this.state;
    fetch(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}=${DEFAULT_QUERY}`)
      .then(response => response.json())
      .then(list => this.setSearchTopStories(list))
      .catch(error => error);
  }

  onDismiss(id) {
    const isNotId = item => item.objectID !== id;
    const newList = this.state.list.hits.filter(isNotId);
    this.setState(() => {
      return {
        list: {
          ...this.state.list,
          hits: newList
        }
      };
    });
  }

  onSearchChange(event) {
    this.setState({ searchTerm: event.target.value });
  }

  render() {
    // object destructuring
    const { list, searchTerm } = this.state;

    // if no data in list, return null
    if (!list) {
      return null;
    }

    // filtering the list based on search input and then mapping over it to render filtered list
    const filteredList = list.hits.filter(item => {
      return item.title.toLowerCase().includes(searchTerm.toLowerCase());
    });

    return (
      <div className="page">
        <div className="interactions">
          {/* Search only handles the search term event */}
          <Search value={searchTerm} onChange={this.onSearchChange}>
            {/* Passing Search text as child to this component which can be access from this.props in Search component */}
            Search:
          </Search>
          <List filteredList={filteredList} onDismiss={this.onDismiss} />
        </div>
      </div>
    );
  }
}

export default App;
