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
          role="menuitem"
        >
          { option.name } { this.isSelected(option) ? <span aria-label="selected"> ✔ </span> : "" }
        </li>
      )
    })
  }

  isSelected(option) {
    return option.id === this.props.selected.id
  }

  handleNativeSelect(event) {
    if (event.target.value) {
      const selected = this.props.options.find(option => event.target.value === option.name)
      if (selected) {
        this.props.onSelect(selected)
      }
    }

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
    } else if (this.isOpen() && event.code === "Escape") {
      this.props.onActivate(this.props.id)
    }
  }

  handleOptionNavigation(event, option) {
    switch (event.code) {
      case "ArrowDown":
        let next = event.target.nextElementSibling
        if (!next) {
          let parent = event.target.parentElement
          let firstNode = parent.querySelector("li")
          firstNode.focus()
          break
        }
        next.focus()
        break
      case "ArrowUp":
        let prev = event.target.previousElementSibling
        if (!prev) {
          let parent = event.target.parentElement
          let nodes = parent.querySelectorAll("li")
          nodes[nodes.length - 1].focus()
          break
        }
        prev.focus()
        break
      case "Space":
        this.props.onSelect(option)
        break
      case "Escape":
        this.props.onActivate(this.props.id)
        break
      default:
    }
  }

  isOpen() {
    return this.props.isOpen(this.props.id)
  }

  labelText() {
    return "label" + this.props.id
  }

  render() {
    return (
      <div className="dropdown" >
        <label className="label" id={this.labelText()}>
          { this.props.label }
        </label>

        <div className={["control", this.isOpen() ? "is-open" : ""].join(" ")} aria-hidden="true">
          <div
            className="selected"
            tabIndex="0"
            role="button"
            aria-labelledby={this.labelText()}
            onClick={() => { this.props.onActivate(this.props.id) }}
            onKeyUp={(event) => { this.handleKeyboardActivation(event) }}
          >
            { this.props.selected.name }
            <div className="icon" aria-hidden="true">{ this.isOpen() ? "▲" : "▼" }</div>
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
