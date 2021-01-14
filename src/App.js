import React from 'react'
import './App.css'
import Dropdown from './Dropdown'

const fruit = [
  {
    id: 1,
    name: "Apple"
  },
  {
    id: 2,
    name: "Orange"
  },
  {
    id: 3,
    name: "Pineapple"
  }
]

const iceCream = [
  {
    id: 1,
    name: "Vanilla"
  },
  {
    id: 2,
    name: "Chocolate"
  },
  {
    id: 3,
    name: "Spiderlegs"
  }
]

const dropdowns = [1,2]

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedFruit: fruit[0],
      selectedIceCream: iceCream[0],
      activeDropdown: null
    }
  }

  handleFruitSelection() {
    return (fruit) => {
      this.setState({ selectedFruit: fruit, activeDropdown: null })
    }
  }

  handleIceCreamSelection() {
    return (iceCream) => {
      this.setState({ selectedIceCream: iceCream, activeDropdown: null })
    }
  }

  handleDropdownActivation(id) {
    return () => {
      if (this.state.activeDropdown === id) {
        this.setState({ activeDropdown: null })
      } else {
        this.setState({ activeDropdown: id })}
    }
  }

  render() {
    return (
      <div className="App">
        <section className="wrapper">
          <h1>The dropdown</h1>
          <Dropdown
            label="Your favorite fruit"
            id={dropdowns[0]}
            options={fruit}
            selected={this.state.selectedFruit}
            isOpen={this.state.activeDropdown === dropdowns[0]}
            onSelect={this.handleFruitSelection()}
            onActivate={this.handleDropdownActivation(dropdowns[0])}
          ></Dropdown>

          <Dropdown
            label="Your favorite ice cream"
            id={dropdowns[1]}
            options={iceCream}
            selected={this.state.selectedIceCream}
            isOpen={this.state.activeDropdown === dropdowns[1]}
            onSelect={this.handleIceCreamSelection()}
            onActivate={this.handleDropdownActivation(dropdowns[1])}
          ></Dropdown>
        </section>
      </div>
    )
  }
}
