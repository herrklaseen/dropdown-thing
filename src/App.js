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

  handleDropdownActivation() {
    return (id) => { 
      if (this.state.activeDropdown === id) {
        this.setState({ activeDropdown: null })
      } else {
        this.setState({ activeDropdown: id })}
    }
  }

  isOpen() {
    return (id) => {
      return id === this.state.activeDropdown
    }
  }

  render() {
    return (
      <div className="App">
        <h1>The dropdown</h1>
        <Dropdown 
          label="Your favorite fruit"
          id={1}
          options={fruit}
          selected={this.state.selectedFruit}
          isOpen={this.isOpen()}
          onSelect={this.handleFruitSelection()}
          onActivate={this.handleDropdownActivation()}
        ></Dropdown>

        <Dropdown 
          label="Your favorite ice cream"
          id={2}
          options={iceCream}
          selected={this.state.selectedIceCream}
          isOpen={this.isOpen()}
          onSelect={this.handleIceCreamSelection()}
          onActivate={this.handleDropdownActivation()}
        ></Dropdown>
      </div>
    )
  }
}
