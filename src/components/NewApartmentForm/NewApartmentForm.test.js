import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import '@testing-library/react/cleanup-after-each';
import NewApartmentForm from './NewApartmentForm';

describe('Input form', () => {
  it('should have input area for name', () => {
    const { getByLabelText } = render(<NewApartmentForm />);
    expect(getByLabelText('Name')).toBeInTheDocument();
  });
});
