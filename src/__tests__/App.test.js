import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from "react-redux";
import { render, cleanup } from "@testing-library/react";
import App from '../App';
import rootReducers from '../redux/reducers';
import { createStore, combineReducers } from 'redux';

const rootReducer = combineReducers({
  rootReducers
});

const store = createStore( rootReducer );

afterEach(cleanup);

it("matches snapshot", () => {
  const { asFragment } = render( <Provider store={store}><Router><App/></Router> </Provider>);
  expect(asFragment()).toMatchSnapshot();
});