import PropTypes from "prop-types";
import * as React from "react";
import { memo } from "react";
import {
  Grid,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
} from "@mui/material";
import { useWithRouter } from "../../hooks/withRouter";

/**
 * Component with the card information of the driver
 */
const CharacterCard = ({ year, driver, router, image }) => {
  const navigate = router?.navigate;
  return (
    <>
      <Grid item xs={12} sm={6} md={3}>
        <Card sx={{ maxWidth: 345 }}>
          <CardActionArea onClick={() => navigate(`/${year}`)}>
            <CardMedia
              component="img"
              height="360"
              image={image}
              title={driver?.driverId}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                {year}
              </Typography>
              <Typography gutterBottom variant="h5" component="h2">
                {`${driver?.givenName} ${driver?.familyName}`}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Grid>
    </>
  );
};

CharacterCard.propTypes = {
  driver: PropTypes.shape({
    driverId: PropTypes.any,
    familyName: PropTypes.any,
    givenName: PropTypes.any,
    id: PropTypes.any,
    image: PropTypes.any,
    name: PropTypes.any,
    status: PropTypes.string,
    type: PropTypes.any,
  }),
  image: PropTypes.any,
  router: PropTypes.shape({
    navigate: PropTypes.func,
  }),
  year: PropTypes.string,
};

export default useWithRouter(memo(CharacterCard));
