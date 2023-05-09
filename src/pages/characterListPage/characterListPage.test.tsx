import * as React from "react";
import { cleanup, render, screen } from "@testing-library/react";

import CharacterListPage from "./characterListPage.js";

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

describe("Render CharacterListPage page", () => {
  let wrapper;

  const initialState = {
    characters: { pending: false, characters: characters },
    character: { pending: false, character: races },
  };
  const mockStore = configureStore();
  const store = mockStore(initialState);

  beforeEach(() => {
    wrapper = (
      <Provider store={store}>
        <CharacterListPage />
      </Provider>
    );
  });

  afterEach(cleanup);

  it("Render character list", () => {
    render(wrapper);
    expect(screen.queryAllByTestId("charList").length).toBe(1);
  });
});

describe("Render waitspinner", () => {
  let wrapper;

  const initialState = {
    characters: { pending: true, characters: characters },
  };
  const mockStore = configureStore();
  const store = mockStore(initialState);

  beforeEach(() => {
    wrapper = (
      <BrowserRouter>
        <Provider store={store}>
          <CharacterListPage />
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
