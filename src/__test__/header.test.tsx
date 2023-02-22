import { render, screen } from '@testing-library/react';
import Header from '../components/common/header'
import {BrowserRouter as Router} from 'react-router-dom'

describe('List Component',()=>{
  test('renders component', () => {
      //@ts-ignore
    const component = render(<Router><Header /></Router>);
    expect(component.baseElement).toBeInTheDocument();
  });
  test('renders form', () => {
      //@ts-ignore
    const component = render(<Router><Header /></Router>);
    const getForm = screen.getByTestId('groceries-header-id')
    expect(getForm).toBeTruthy();
  });
})