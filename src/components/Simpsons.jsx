import React, { Component } from "react";
import Character from "./Character.jsx";

class Simpsons extends Component {
  state = {};

  // charIndexViewer = (index) => {
  //   console.log(index);
  // };

  render() {
    const { simpsons, onDelete, onLikeToggle } = this.props;
    return (
      <>
        {simpsons.map((item, index) => {
          return (
            <>
              <Character
                item={item}
                key={item.id}
                onDelete={onDelete}
                onLikeToggle={onLikeToggle}
              />
            </>
          );
        })}
      </>
    );
  }
}

export default Simpsons;

{
  /* <ol>
        {this.state.data.map((item) => {
          return (
            <li
              key={item.quote}
              onClick={() => {
                this.delete(index);
              }}
            >
              {item.character}
            </li>
          );
        })}
      </ol> */
}
