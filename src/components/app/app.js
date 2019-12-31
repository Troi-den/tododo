import React, { Component } from "react";
import AppHeader from "../app-header";
import SearchPanel from "../search-panel";
import TodoList from "../todo-list";
import ItemStatusFilter from "../item-status-filter";
import ItemAddForm from "../item-add-form";
import "./app.css";

export default class App extends Component {
  maxId = 100;

  state = {
    todoData: [
      this.createTodoItem("Vorui ubivai"),
      this.createTodoItem("Ebi Gusei"),
      this.createTodoItem("Jdi obratnogo gudka")
    ],
    filteredData: [],
    filtered: false,
    value: ""
  };

  createTodoItem(label) {
    return {
      label,
      important: false,
      done: false,
      id: this.maxId++
    };
  }

  deleteItem = id => {
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex(el => el.id === id);

      const newArray = [
        ...todoData.slice(0, idx), //
        ...todoData.slice(idx + 1)
      ];

      return {
        todoData: newArray
      };
    });
  };

  addItem = text => {
    //
    const newItem = this.createTodoItem(text);

    this.setState(({ todoData }) => {
      const newArr = [...todoData, newItem];
      return {
        todoData: newArr
      };
    });
  };

  toggleProperty(arr, id, propName) {
    const idx = arr.findIndex(el => el.id === id);
    const oldItem = arr[idx];
    const newItem = { ...oldItem, [propName]: !oldItem[propName] };
    return [
      ...arr.slice(0, idx), //
      newItem,
      ...arr.slice(idx + 1)
    ];
  }

  onToggleImportant = id => {
    this.setState(({ todoData }) => {
      return {
        todoData: this.toggleProperty(todoData, id, "important")
      };
    });
  };

  onToggleDone = id => {
    this.setState(({ todoData }) => {
      return {
        todoData: this.toggleProperty(todoData, id, "done")
      };
    });
  };

  filterOnChange = ({ target: { value } }) => {
    this.setState(({ todoData }) => ({
      filteredData: todoData.filter(el =>
        el.label.toLowerCase().includes(value.toLowerCase())
      ),
      value
    }));
  };

  oldfilterOnChange = e => {
    const a = e.target.value;
    this.setState(({ todoData, filteredData, filtered }) => {
      const filteredArr = todoData.filter(el =>
        el.label.toLowerCase().includes(a.toLowerCase())
      );
      //console.log(a);
      return {
        filteredData: filteredArr,
        value: a
      };
    });
  };

  render() {
    const { todoData, value, filteredData } = this.state;
    const doneCount = todoData //
      .filter(el => el.done).length;

    const todoCount = todoData //
      .filter(el => !el.done).length;

    return (
      <div className="todo-app">
        <AppHeader toDo={todoCount} done={doneCount} />

        <div className="top-panel d-flex">
          <SearchPanel filterOnChange={this.filterOnChange} />
          <ItemStatusFilter />
        </div>
        <TodoList
          todos={value.length > 0 ? filteredData : todoData} //
          onDeleted={this.deleteItem}
          onToggleImportant={this.onToggleImportant}
          onToggleDone={this.onToggleDone}
        />
        <ItemAddForm onItemAdded={this.addItem} />
      </div>
    );
  }
}
