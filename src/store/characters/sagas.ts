import { all, call, put, takeLatest } from "redux-saga/effects";
import axios from "axios";

import { fetchCharactersFailure, fetchCharactersSuccess } from "./actions";
import { FETCH_CHARACTERS_REQUEST } from "./actionTypes";
import { getCharacters, getImage } from "../../api/api";

/*
  Worker Saga: Fired on FETCH_CHARACTERS_REQUEST action
*/
function* fetchCharactersSaga() {
  try {
    const response = yield call(getCharacters);
    const result = response.data?.MRData?.StandingsTable?.StandingsLists;

    // Get drivers images from wikipedia API
    const imagesUrls = yield all(
      result.map((element) => {
        const title = `${element?.DriverStandings[0].Driver?.givenName} ${element?.DriverStandings[0].Driver?.familyName}`;
        const imageUrl = call(getImage, title);
        return imageUrl;
      }),
    );

    //Add the images to the result
    const resultWithImage = result.map((element, index) => {
      const driver = {
        ...element.DriverStandings[0],
        image: imagesUrls[index]?.data?.query?.pages[0]?.thumbnail?.source,
      };
      return {
        ...element,
        DriverStandings: driver,
      };
    });

    yield put(
      fetchCharactersSuccess({
        characters: resultWithImage,
      }),
    );
  } catch (e) {
    yield put(
      fetchCharactersFailure({
        error: e.message,
      }),
    );
  }
}

/*
  Starts worker saga on latest dispatched `FETCH_CHARACTERS_REQUEST` action.
  Allows concurrent increments.
*/
function* charactersSaga() {
  yield all([takeLatest(FETCH_CHARACTERS_REQUEST, fetchCharactersSaga)]);
}

export default charactersSaga;
