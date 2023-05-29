import React, { Component } from "react";

class Name extends Component {
  render() {
    const { liked, character, onLikeToggle, id } = this.props;

    return (
      <div>
        <p>{character}</p>
        <button onClick={() => onLikeToggle(id)}>
          {liked ? "liked" : "not liked"}
        </button>
      </div>
    );
  }
}

export default Name;
