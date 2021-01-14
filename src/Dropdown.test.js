import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Dropdown from './Dropdown'

const options = [
  {
    name: "Option1",
    id: 0
  },
  {
    name: "Option2",
    id: 1
  },
  {
    name: "Option3",
    id: 2
  },
]

test('renders an element with label', () => {
  render(<Dropdown
    label="MyLabel"
    isOpen={() => {}}
    selected={
      options[0]
    }
    options={options}
    />)
  const label = screen.getByText(/MyLabel/i)
  expect(label).toBeInTheDocument()
})

test('options are not visible when dropdown is closed', () => {
  render(<Dropdown
    label="MyLabel"
    isOpen={false}
    selected={
      options[0]
    }
    options={options}
    />)
  const anOption = screen.queryByText(/option2/i)
  expect(anOption).not.toBeInTheDocument()
})

test('options are visible when dropdown is open', () => {
  render(<Dropdown
    label="MyLabel"
    isOpen={true}
    selected={
      options[0]
    }
    options={options}
    />)
  const anOption = screen.queryByText(/option2/i)
  expect(anOption).toBeInTheDocument()
})

test('activation handler is called when entrypoint is clicked', () => {
  let activeDropdown = null
  let dropDownId = 0
  render(<Dropdown
    label="MyLabel"
    id={dropDownId}
    onActivate={() => { activeDropdown = 0 }}
    selected={
      options[0]
    }
    options={options}
    />)
  expect(activeDropdown).not.toEqual(0)
  userEvent.click(screen.getByRole('button'))
  expect(activeDropdown).toEqual(0)
})
