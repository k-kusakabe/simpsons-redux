import React, { Component } from "react";

class Controls extends Component {
  state = {};
  render() {
    const { onSearchInput, onNameInput, onResetInput } = this.props;
    return (
      <>
        <input onInput={onSearchInput} type="text" />
        <select onChange={onNameInput}>
          <option value=""></option>
          <option value="asc">Asc</option>
          <option value="desc">Desc</option>
        </select>
        <button onClick={onResetInput}>reset</button>
      </>
    );
  }
}

export default Controls;
