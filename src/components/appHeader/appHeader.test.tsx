import * as React from "react";
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import AppHeader from "./appHeader.js";

import { Provider } from "react-redux";
import configureStore from "redux-mock-store";

import { BrowserRouter } from "react-router-dom";

const mockedUsedNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedUsedNavigate,
}));

describe("Render appHeader page", () => {
  let wrapper;

  const initialState = {
    characters: { pending: false, characters: [] },
    character: { pending: false, character: [] },
  };
  const mockStore = configureStore();
  const store = mockStore(initialState);

  beforeEach(() => {
    wrapper = (
      <BrowserRouter>
        <Provider store={store}>
          <AppHeader />
        </Provider>
      </BrowserRouter>
    );
  });

  afterEach(cleanup);

  it("Render character list", () => {
    render(wrapper);
    expect(screen.getByText("F1 Web APP")).not.toBeNull();
  });
});
