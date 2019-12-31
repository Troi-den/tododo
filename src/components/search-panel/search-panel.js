import React, { Component } from "react";
import "./search-panel.css";

export default class SearchPanel extends Component {
  render() {
    const { filterOnChange } = this.props;

    return (
      <form className="search-panel d-flex">
        <input
          className="form-control search-input" //
          placeholder="search"
          onChange={filterOnChange}
        />
      </form>
    );
  }
}
