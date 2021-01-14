import { render, screen } from '@testing-library/react';
import Dropdown from './Dropdown';

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
    />);
  const label = screen.getByText(/MyLabel/i);
  expect(label).toBeInTheDocument();
});
