import React from 'react'
import './Dropdown.css'

export default class Dropdown extends React.Component {
  constructor(props) {
    super(props)
  }

  handleSelect(option) {
    this.props.onSelect(option)
  }

  handleActivate() {
    this.props.onActivate(this.props.id)
  }

  renderOptions() {
    return this.props.options.map((option) => {
      return (
        <li 
         className="option"
         tabIndex="0"
         key={option.id.toString()}
         onClick={() => { this.handleSelect(option) }}
        >
          { option.name } { this.isSelected(option) ? " ✔" : "" } 
        </li>
      )
    })
  }

  isSelected(option) {
    return option.id === this.props.selected.id
  }

  render() {
    return (
      <div className="dropdown" >
        <div className="label">
          { this.props.label }
        </div>
        <div className={["control", this.props.isOpen(this.props.id) ? "is-open" : ""].join(" ")}>
          <div 
           className="selected"
           tabIndex="0"
           onClick={() => { this.handleActivate() }}
          >
            { this.props.selected.name } 
            <div className="icon">{ this.props.isOpen(this.props.id) ? "▲" : "▼" }</div>
          </div>

          <ul className={["options", this.props.isOpen(this.props.id) ? "is-open" : ""].join(" ")}
          >
            { this.renderOptions() }
          </ul>
        </div>
      </div>
    )
  }
}
