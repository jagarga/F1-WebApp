import PropTypes from "prop-types";
import * as React from "react";
import { useEffect, Suspense, useMemo } from "react";
import { memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getIsLoadingCharacterSelector,
  getCharacterSelector,
  getErrorSelector,
} from "../../store/character/selectors";
import { fetchCharacterRequest } from "../../store/character/actions";
import {
  getCharactersSelector,
  getIsLoadingCharactersSelector,
} from "../../store/characters/selectors";
import { fetchCharactersRequest } from "../../store/characters/actions";
import {
  Paper,
  Divider,
  List,
  ListItemText,
  Typography,
  ListItemAvatar,
  Avatar,
  ListItemButton,
} from "@mui/material";
import "./racesPage.scss";
import WaitSpinner from "../../components/waitSpinner/waitSpinner";
import { useWithRouter } from "../../hooks/withRouter";

/**
 * Component with the information of use
 */
const RacesPage = ({ router }) => {
  const dispatch = useDispatch();
  const isLoadingRace = useSelector(getIsLoadingCharacterSelector);
  const racesSelector = useSelector(getCharacterSelector);
  const isLoadingChar = useSelector(getIsLoadingCharactersSelector);
  const charsSelector = useSelector(getCharactersSelector);
  const error = useSelector(getErrorSelector);
  const isLoading = isLoadingRace || isLoadingChar;
  const year = router?.params?.id;

  useEffect(() => {
    // Get the race by year data
    if (year !== undefined) dispatch(fetchCharacterRequest(year));
  }, [year]);

  useEffect(() => {
    // Get the formula 1 data
    if (charsSelector?.length === 0) dispatch(fetchCharactersRequest());
  }, []);

  // Filter the driver champion of the year
  const driveChampion = useMemo(() => {
    let driver = charsSelector.find((char) => char?.season === year?.toString())
      ?.DriverStandings?.Driver?.code;
    return driver;
  }, [charsSelector, year]);

  return (
    <>
      <Suspense fallback={<WaitSpinner />}>
        {isLoading && <WaitSpinner size="2rem" />}
        <Paper elevation={24} className="charContainer">
          <Typography variant="h3" align="center">
            {racesSelector?.name}
          </Typography>
          <Divider />
          <List>
            {racesSelector?.map((char) => {
              return (
                <div key={char.round} data-testid="racesList">
                  <ListItemButton
                    sx={
                      char.Results?.Driver?.code === driveChampion
                        ? {
                            backgroundColor: "bisque",
                          }
                        : {}
                    }
                  >
                    <ListItemAvatar>
                      <Avatar>
                        <img src={char.Results?.image} width="100%" />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={char.raceName}
                      secondary={`${char.Results?.Driver?.givenName} ${char.Results?.Driver?.familyName} - ${char.Results?.Constructor?.name}`}
                    />
                  </ListItemButton>
                  <Divider variant="inset" component="li" />
                </div>
              );
            })}
          </List>
        </Paper>
      </Suspense>
    </>
  );
};

RacesPage.propTypes = {
  router: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.any,
    }),
  }),
};

export default useWithRouter(memo(RacesPage));
