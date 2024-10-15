import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ChartP from '../../pages/ChartP';
import TableP from '../../pages/TableP';
import LayoutP from '../../pages/Layout';

import mockBackend from '../mockBackend';
let fetchSpy;

describe('Render all components', () => {

  it('renders the layout page', () => {
    render(<LayoutP />);
  });

  it('renders the chart page', () => {
    render(<ChartP />);
  });

  it('renders the table page', () => {
    render(<TableP />);
  });

  it('Render test buttons', () => {
    render(<ChartP />);
    const buttonElement = screen.getByText(/Pull Data from YouTube and Reddit/i);
    expect(buttonElement).toBeInTheDocument();
  });

});

beforeAll(() => {
  fetchSpy = jest.spyOn(global, 'fetch').mockImplementation(mockBackend);
  jest.spyOn(console, 'log').mockImplementation(() => { });
  jest.spyOn(console, 'error').mockImplementation(() => { });
  jest.spyOn(console, 'warn').mockImplementation(() => { });
  jest.spyOn(console, 'info').mockImplementation(() => { });
  jest.spyOn(console, 'debug').mockImplementation(() => { });

});
describe('Test Button Handlers with Mock Functions', () => {

  it('Test handleGetAllPostClick', () => {
    render(
      <ChartP />
    );
    const buttonElement = screen.getByText(/Pull Data from YouTube and Reddit/i);
    expect(buttonElement).toBeInTheDocument();
    fireEvent.click(buttonElement);
    expect(fetchSpy).toHaveBeenCalled();

  });


  it('Test handleFetchClick', () => {
    const handleFetchClick = jest.fn();
    render(<ChartP handleFetchClick={handleFetchClick} />);
    const buttonElement = screen.getByText(/Display DB Data and Update Graph/i);
    buttonElement.click();
    expect(fetchSpy).toHaveBeenCalled();
  });

  it('Test handleDrop', () => {
    const handleDrop = jest.fn();
    render(<ChartP handleDrop={handleDrop} />);
    const buttonElement = screen.getByText(/Drop DB/i);
    buttonElement.click();
    expect(fetchSpy).toHaveBeenCalled()
  });

});

