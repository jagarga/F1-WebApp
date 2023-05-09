import * as React from "react";
import { useEffect, Suspense, useState } from "react";
import { memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getIsLoadingCharactersSelector,
  getCharactersSelector,
  getErrorSelector,
} from "../../store/characters/selectors";
import { fetchCharactersRequest } from "../../store/characters/actions";
import { Grid } from "@mui/material";
import "./characterListPage.scss";
import WaitSpinner from "../../components/waitSpinner/waitSpinner";
const CharacterCard = React.lazy(() =>
  import("../../components/characterCard/characterCard"),
);

/**
 * Component with the information of use
 */
const CharacterListPage = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(getIsLoadingCharactersSelector);
  const charsSelector = useSelector(getCharactersSelector);
  const error = useSelector(getErrorSelector);

  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    // Get the formula 1 data
    dispatch(fetchCharactersRequest());
  }, []);

  useEffect(() => {
    setCharacters(charsSelector);
  }, [charsSelector]);

  /**
   * Function for render the characters card component
   * @param {Object} array category
   */
  const renderCharactersCard = (characters) =>
    characters?.map((char) => {
      return (
        <CharacterCard
          key={char?.season}
          year={char?.season}
          driver={char?.DriverStandings?.Driver}
          image={char?.DriverStandings?.image}
        />
      );
    });

  return (
    <>
      <Suspense fallback={<WaitSpinner />}>
        {isLoading && <WaitSpinner size="2rem" />}
        <div className="container">
          <Grid container spacing={2} data-testid="charList">
            {renderCharactersCard(characters)}
          </Grid>
        </div>
      </Suspense>
    </>
  );
};

export default memo(CharacterListPage);
