import { render, screen } from '@testing-library/react';
import List from '../components/Groceries/List'
import {BrowserRouter as Router} from 'react-router-dom'

describe('List Component',()=>{
  test('renders component', () => {
    const component = render(<Router><List /></Router>);
    expect(component.baseElement).toBeInTheDocument();
  });
  test('renders form', () => {
    const component = render(<Router><List /></Router>);
    const getForm = screen.getByTestId('groceries-list-id')
    expect(getForm).toBeTruthy();
  });
  
})