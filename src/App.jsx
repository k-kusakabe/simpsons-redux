import React, { Component } from "react";
import axios from "axios";
import Loading from "./components/Loading";
import Simpsons from "./components/Simpsons";
import Controls from "./components/Controls";
import "./App.css";
import { connect } from "react-redux";
import { NEW_API_DATA, SET_SEARCH_INPUT, SET_NAME_INPUT } from "./store/types";

class App extends Component {
  state = {}; //=> removing blank state causes crash until everything has been migrated

  async componentDidMount() {
    const { data } = await axios.get(
      `https://thesimpsonsquoteapi.glitch.me/quotes?count=10`
    );
    //fixed the api data to have unique id
    data.forEach((element, index) => {
      element.id = index + Math.random();
    });

    this.props.dispatch({ type: NEW_API_DATA, payload: data });
  }

  onLikeToggle = (id) => {
    const indexOf = this.state.simpsons.findIndex((char) => {
      return char.id === id;
    });

    const simpsons = [...this.state.simpsons];

    //invert if liked or not
    simpsons[indexOf].liked = !simpsons[indexOf].liked;

    this.setState({ simpsons });
  };

  onDelete = (id) => {
    const indexOf = this.state.simpsons.findIndex((char) => {
      return char.id === id;
    });
    const simpsons = [...this.state.simpsons];
    simpsons.splice(indexOf, 1);
    this.setState({ simpsons });
  };

  //function to add state to filter by name
  onSearchInput = (e) => {
    // this.setState({ searchInput: e.target.value });
    this.props.dispatch({ type: SET_SEARCH_INPUT, payload: e.target.value });
  };

  //function to add state to sort by name
  onNameInput = (e) => {
    // this.setState({ nameInput: e.target.value });
    this.props.dispatch({ type: SET_NAME_INPUT, payload: e.target.value });
  };

  //function to get filtered list
  getFilteredList = () => {
    const { simpsons, searchInput, nameInput } = this.props;

    let filteredList = [...simpsons];

    // filter by name
    if (searchInput) {
      filteredList = filteredList.filter((item) => {
        if (
          item.character.toLowerCase().startsWith(searchInput.toLowerCase())
        ) {
          return true;
        }
      });
    }

    //sort by name
    if (nameInput === "asc") {
      filteredList.sort((itemOne, itemTwo) => {
        if (itemOne.character.toUpperCase() < itemTwo.character.toUpperCase()) {
          return -1;
        }
        if (itemOne.character.toUpperCase() > itemTwo.character.toUpperCase()) {
          return 1;
        }
        return 0;
      });
    } else if (nameInput === "desc") {
      filteredList.sort((itemOne, itemTwo) => {
        if (itemOne.character.toUpperCase() < itemTwo.character.toUpperCase()) {
          return 1;
        }
        if (itemOne.character.toUpperCase() > itemTwo.character.toUpperCase()) {
          return -1;
        }
        return 0;
      });
    }

    return filteredList;
  };

  // function to reset the state
  onResetInput = () => {
    this.setState({ searchInput: "", nameInput: "" });
  };

  render() {
    const { simpsons } = this.props;

    if (!simpsons) return <Loading />;
    if (simpsons.length === 0) return <p>You deleted everything!</p>;

    //calculate the total
    let total = 0;
    simpsons.forEach((char) => {
      if (char.liked) total++;
    });

    return (
      <>
        <h1>Total no of liked chars #{total}</h1>
        <Controls
          onNameInput={this.onNameInput}
          onSearchInput={this.onSearchInput}
          onResetInput={this.onResetInput}
        />
        <Simpsons
          simpsons={this.getFilteredList()}
          onDelete={this.onDelete}
          onLikeToggle={this.onLikeToggle}
        />
      </>
    );
  }
}

function mapStateToProps(state) {
  return {
    simpsons: state.simpsons,
    searchInput: state.searchInput,
    nameInput: state.nameInput,
  };
}

export default connect(mapStateToProps)(App);

//for loop cannot be used. Use map method (map method always returns something)
//use key to improve performance for iteration (otherwise, React re-render all list items)
//function can be passed to children as props. Those funcs can be run as callback in child components
//State cannot be passed sideways, only can inherit from parent components.
//If you want to pass the state to sibling, pass the parent so that other siblings can access.
