import { render, screen } from '@testing-library/react';
import Dropdown from './Dropdown';

test('renders an element with label', () => {
  render(<Dropdown
    label="MyLabel"
    isOpen={() => {}}
    selected={
      { name: "Name", id: 0 }
    }
    options={[ { name: "Name", id: 0 } ]}
    />);
  const label = screen.getByText(/MyLabel/i);
  expect(label).toBeInTheDocument();
});
