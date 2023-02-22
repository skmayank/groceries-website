import { render, screen } from '@testing-library/react';
import Checkout from '../components/Groceries/Checkout'
import {BrowserRouter as Router} from 'react-router-dom'

describe('List Component',()=>{
  test('renders component', () => {
    const component = render(<Router><Checkout /></Router>);
    expect(component.baseElement).toBeInTheDocument();
  });
  test('renders form', () => {
    const component = render(<Router><Checkout /></Router>);
    const getForm = screen.getByTestId('groceries-checkout-id')
    expect(getForm).toBeTruthy();
  });
})