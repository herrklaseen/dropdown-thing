import React from 'react'
import './Dropdown.css'

export default class Dropdown extends React.Component {
  constructor(props) {
    super(props)
  }

  renderOptions() {
    if (this.props.isOpen) {
      const list = this.props.options.map((option) => {
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
      return (
        <ul className="options is-open">
          { list }
        </ul>
      )
    }
  }

  isSelected(option) {
    return option.id === this.props.selected.id
  }

  handleKeyboardActivation(event) {
    if (event.code === "Space") {
      this.props.onActivate(this.props.id)
      return
    }

    if (this.props.isOpen) {
      let nodes
      switch (event.code) {
        case "ArrowDown":
          nodes = event.target.nextElementSibling.querySelectorAll("li")
          nodes[0].focus()
          break
        case "ArrowUp":
          nodes = event.target.nextElementSibling.querySelectorAll("li")
          nodes[nodes.length - 1].focus()
          break
        case "Escape":
          this.props.onActivate(this.props.id)
          break
        default:
      }
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

  labelText() {
    return "label" + this.props.id
  }

  render() {
    return (
      <div className="dropdown" >
        <label className="label" id={this.labelText()}>
          { this.props.label }
        </label>

        <div
          className={["control", this.props.isOpen ? "is-open" : ""].join(" ")}
        >
          <div
            className="selected"
            tabIndex="0"
            role="button"
            aria-labelledby={this.labelText()}
            onClick={() => { this.props.onActivate() }}
            onKeyUp={(event) => { this.handleKeyboardActivation(event) }}
          >
            { this.props.selected.name }

            <div className="icon" aria-hidden="true">
              { this.props.isOpen ? "▲" : "▼" }
            </div>

          </div>

          { this.renderOptions() }

        </div>
      </div>
    )
  }
}
