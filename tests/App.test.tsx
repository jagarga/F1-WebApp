import React from "react";
import { render } from "@testing-library/react";

import App from "../src/App";

import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { characters } from "./__mocks__/characters";
import { races } from "./__mocks__/races";

describe("Render app", () => {
  const initialState = {
    characters: { pending: false, characters: characters },
    character: { pending: false, character: races },
  };
  const mockStore = configureStore();
  let store;

  it('Shows "F1 Web APP"', () => {
    store = mockStore(initialState);
    const { getByText } = render(
      <Provider store={store}>
        <App />
      </Provider>,
    );

    expect(getByText("F1 Web APP")).not.toBeNull();
  });
});
