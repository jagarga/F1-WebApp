import axios from "axios";
import { ICharacters, IImage, ICharacter } from "../constants/interfaces";

import { API_ROUTES } from "./apiRoutes";

export const getCharacters = () =>
  axios.get<ICharacters[]>(`${API_ROUTES.getCharacters}`);

export const getCharacter = (year) =>
  axios.get<ICharacter[]>(`${API_ROUTES.getCharacter}${year}/results/1.json`);

export const getImage = (title) =>
  axios.get<IImage[]>(`${API_ROUTES.getImage}${title}`);
