import React from 'react'
import './Dropdown.css'

export default class Dropdown extends React.Component {
  constructor(props) {
    super(props)
  }

  renderOptions() {
    return this.props.options.map((option) => {
      return (
        <li 
         className="option"
         tabIndex="0"
         key={option.id.toString()}
         onClick={() => { this.props.onSelect(option) }}
         onKeyUp={(event) => { this.handleOptionNavigation(event, option) }}
        >
          { option.name } { this.isSelected(option) ? " ✔" : "" } 
        </li>
      )
    })
  }

  isSelected(option) {
    return option.id === this.props.selected.id
  }

  handleKeyboardActivation(event) {
    if (event.code === "Space") {
      this.props.onActivate(this.props.id)
    } else if (this.isOpen() && event.code === "ArrowDown") {
      let nodes = event.target.nextElementSibling.querySelectorAll("li")
      nodes[0].focus()
    } else if (this.isOpen() && event.code === "ArrowUp") {
      let nodes = event.target.nextElementSibling.querySelectorAll("li")
      nodes[nodes.length - 1].focus()
    }

    return
  }

  handleOptionNavigation(event, option) {
    if (event.code === "ArrowDown") {
      let next = event.target.nextElementSibling
      if (!next) {
        let parent = event.target.parentElement
        let firstNode = parent.querySelector("li")
        firstNode.focus()
        return
      }
      next.focus()
    } else if (event.code === "ArrowUp") {
      let prev = event.target.previousElementSibling
      if (!prev) {
        let parent = event.target.parentElement
        let nodes = parent.querySelectorAll("li")
        nodes[nodes.length - 1].focus()
        return
      }
      prev.focus()
    } else if (event.code === "Space") {
      event.stopPropagation()
      this.props.onSelect(option)
    }
  }

  isOpen() {
    return this.props.isOpen(this.props.id)
  }

  render() {
    return (
      <div className="dropdown" >
        <div className="label">
          { this.props.label }
        </div>
        <div className={["control", this.isOpen() ? "is-open" : ""].join(" ")}>
          <div 
           className="selected"
           tabIndex="0"
           onClick={() => { this.props.onActivate(this.props.id) }}
           onKeyUp={(event) => { this.handleKeyboardActivation(event) }}
          >
            { this.props.selected.name } 
            <div className="icon">{ this.isOpen() ? "▲" : "▼" }</div>
          </div>

          <ul className={["options", this.isOpen() ? "is-open" : ""].join(" ")}
          >
            { this.renderOptions() }
          </ul>
        </div>
      </div>
    )
  }
}
