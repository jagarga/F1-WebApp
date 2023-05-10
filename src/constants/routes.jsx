import CharacterListPage from "../pages/characterListPage/characterListPage";
import RacesPage from "../pages/racesPage/racesPage";

export const createRootes = () => {
  const rootes = [
    {
      exact: true,
      path: "/",
      component: CharacterListPage,
    },
    {
      path: ":id",
      component: RacesPage,
    },
  ];

  return rootes;
};

export const ROUTES = createRootes();
