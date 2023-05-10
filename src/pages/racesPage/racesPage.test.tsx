import * as React from "react";
import { cleanup, render, screen } from "@testing-library/react";

import RacesPage from "./racesPage.js";

import { Provider } from "react-redux";
import configureStore from "redux-mock-store";

import { characters } from "../../../tests/__mocks__/characters.js";
import { races } from "../../../tests/__mocks__/races.js";
import { BrowserRouter } from "react-router-dom";

const mockedUsedNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedUsedNavigate,
}));

describe("Render RacesPage page", () => {
  let wrapper;

  const initialState = {
    characters: { pending: false, characters: characters },
    character: { pending: false, character: races },
  };
  const mockStore = configureStore();
  const store = mockStore(initialState);

  beforeEach(() => {
    wrapper = (
      <BrowserRouter>
        <Provider store={store}>
          <RacesPage />
        </Provider>
      </BrowserRouter>
    );
  });

  afterEach(cleanup);

  it("Render races list", () => {
    render(wrapper);
    expect(screen.queryAllByTestId("racesList").length).toBe(18);
  });
});

describe("Render waitspinner", () => {
  let wrapper;

  const initialState = {
    characters: { pending: true, characters: [] },
    character: { pending: true, character: races },
  };
  const mockStore = configureStore();
  const store = mockStore(initialState);

  beforeEach(() => {
    wrapper = (
      <BrowserRouter>
        <Provider store={store}>
          <RacesPage />
        </Provider>
      </BrowserRouter>
    );
  });

  afterEach(cleanup);

  it("Render wait spinner", () => {
    render(wrapper);
    expect(screen.queryAllByTestId("wait").length).toBe(1);
  });
});
