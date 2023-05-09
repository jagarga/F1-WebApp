import { all, call, put, takeLatest } from "redux-saga/effects";

import { fetchCharacterFailure, fetchCharacterSuccess } from "./actions";
import { FETCH_CHARACTER_REQUEST } from "./actionTypes";
import { getCharacter, getImage } from "../../api/api";

/*
  Worker Saga: Fired on FETCH_CHARACTER_REQUEST action
*/
function* fetchCharacterSaga(payload) {
  try {
    const response = yield call(getCharacter, payload?.payload);
    const result = response.data?.MRData?.RaceTable?.Races;

    // Get drivers images from wikipedia API
    const imagesUrls = yield all(
      result.map((element) => {
        const title = `${element.Results[0]?.Driver?.givenName} ${element.Results[0]?.Driver?.familyName}`;
        const imageUrl = call(getImage, title);
        return imageUrl;
      }),
    );

    //Add the images to the result
    const resultWithImage = result.map((element, index) => {
      const driver = {
        ...element.Results[0],
        image: imagesUrls[index]?.data?.query?.pages[0]?.thumbnail?.source,
      };
      return {
        ...element,
        Results: driver,
      };
    });

    yield put(
      fetchCharacterSuccess({
        character: resultWithImage,
      }),
    );
  } catch (e) {
    yield put(
      fetchCharacterFailure({
        error: e.message,
      }),
    );
  }
}

/*
  Starts worker saga on latest dispatched `FETCH_CHARACTER_REQUEST` action.
  Allows concurrent increments.
*/
function* characterSaga() {
  yield all([takeLatest(FETCH_CHARACTER_REQUEST, fetchCharacterSaga)]);
}

export default characterSaga;
