import React, { Component } from 'react';

export default class App extends Component {
  constructor() {
    super();

    this.state = {
      newTextValue: "",
      list: []
    }
    this.editText = ""
    this.handleChange = this.handleChange.bind(this)
    this.handleEditChange = this.handleEditChange.bind(this)
    this.handleKeyPress = this.handleKeyPress.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)

  }

  handleChange = (event) => {
    this.setState({
      newTextValue: event.target.value
    })
  }

  handleEditChange = (e) => {
    this.editText = e.target.value
  };

  handleKeyPress = (event) => {
    if (event.keyCode === 13)
      this.handleSubmit(event);
  }

  handleSubmit = (event) => {
    event.preventDefault();

    if (this.state.newTextValue !== "") {
      let newItem = {
        index: this.state.list.length + 1,
        value: this.state.newTextValue
        ,
        completed: true,
        editing: false,

      }
      this.setState((prevState) => {
        return {
          list: prevState.list.concat(newItem)
        }
      })
    }
    else {
      alert("CANNOT ADD EMPTY TASK!!")
    }
    this.setState({ newTextValue: "" })
  }

  handleDelete = (key) => {
    let updatedlist = this.state.list.filter(function filteredItems(item) {
      return (item.index !== key);
    })
    this.setState({
      list: updatedlist
    })
  }

  handleEdit = (key) => {
    const editedList = this.state.list.map((item) => {
      if (item.index === key) {
        item.editing = !item.editing;
      }
      return item;
    });

    this.setState({
      list: editedList

    })
  }

  handleSubmitEdit = (key, value, prevVal) => {
    const editedList = this.state.list.map((item) => {
      if (item.index === key) {
        item.value = (value === "" ? prevVal : value);
        item.editing = !item.editing;
      }
      return item;
    });

    this.setState({
      list: editedList
    })
  }

  render() {
    return (
      <div>
        <h1>To-Do </h1>
        <div>
          <input
            type="text"
            placeholder="Enter your todo"
            value={this.state.newTextValue
            }
            onChange={this.handleChange}
            onKeyDown={this.handleKeyPress} />

          <button type="submit" onClick={this.handleSubmit}>ADD</button>

          {this.state.list.map((item) => (
            <div className="task-wrapper" key={item.index}>
              {item.editing ? (
                <div>
                  <input
                    type="text"
                    defaultValue={item.value}
                    onChange={this.handleEditChange}
                  />
                  <button disabled={!item.completed} onClick={() => this.handleSubmitEdit(item.index, this.editText, item.value)}>Save</button>
                </div>
              ) : (
                <div>
                  <span>{item.value}</span>
                  <button disabled={!item.completed} onClick={() => this.handleEdit(item.index)}>Edit</button>
                </div>
              )}
              <button onClick={() => this.handleDelete(item.index)}>DELETE</button>
            </div>
          ))}
        </div>
      </div >
    );
  }
}