import React from "react";
import "./styles.css";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: [1, 2, 3, 4, 5, 6],
      destination: 0
    };
  }
  onDragLeave = (e) => {
    e.preventDefault();
    e.target.classList.remove("over");
  };
  onDragOver = (e) => {
    e.preventDefault();
    // console.log("over", e.target.id, e.target.classList);
    e.target.classList.add("over");
  };
  onDrop = (e) => {
    e.preventDefault();
    this.setState({ destination: e.target.id });
    console.log("ondrop", e.target.id);
  };
  onDragEnd = (e) => {
    e.preventDefault();
    const { destination, columns } = this.state;
    const source = e.target.id;
    if (source == null || destination == null) return;
    const _arr = [...columns];
    //extracting the source item from the list
    const _item = _arr.splice(source, 1)[0];
    //inserting it at the destination index.
    _arr.splice(destination, 0, _item);

    this.setState({ columns: _arr });
    console.log("source", e.target.id, "destination ", destination);
    console.log("_arr", _arr);
  };
  render() {
    const { columns } = this.state;
    return (
      <div className="container">
        {columns.map((c, i) => (
          <div
            key={i}
            id={i}
            draggable={true}
            onDragOver={this.onDragOver}
            onDragEnd={this.onDragEnd}
            onDrop={this.onDrop}
            onDragLeave={this.onDragLeave}
            className="item"
            drag
          >
            {c}
          </div>
        ))}
      </div>
    );
  }
}
