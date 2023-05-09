export interface ICharacters {
  data: Data;
  status: number;
  statusText: string;
  headers: ICharactersHeaders;
  config: Config;
  request: Request;
}

export interface Config {
  transitional: Transitional;
  transformRequest: null[];
  transformResponse: null[];
  timeout: number;
  xsrfCookieName: string;
  xsrfHeaderName: string;
  maxContentLength: number;
  maxBodyLength: number;
  env: Env;
  headers: ConfigHeaders;
  method: string;
  url: string;
}

export interface Env {
  FormData: null;
}

export interface ConfigHeaders {
  Accept: string;
}

export interface Transitional {
  silentJSONParsing: boolean;
  forcedJSONParsing: boolean;
  clarifyTimeoutError: boolean;
}

export interface Data {
  MRData: MRData;
}

export interface MRData {
  xmlns: string;
  series: string;
  url: string;
  limit: string;
  offset: string;
  total: string;
  StandingsTable: StandingsTable;
}

export interface StandingsTable {
  driverStandings: string;
  StandingsLists: StandingsList[];
}

export interface StandingsList {
  season: string;
  round: string;
  DriverStandings: DriverStanding[];
}

export interface DriverStanding {
  position: string;
  positionText: string;
  points: string;
  wins: string;
  Driver: Driver;
  Constructors: Constructor[];
}

export interface Constructor {
  constructorId: ConstructorID;
  url: string;
  name: Name;
  nationality: Nationality;
}

export enum ConstructorID {
  Ferrari = "ferrari",
  Mclaren = "mclaren",
  Mercedes = "mercedes",
  RedBull = "red_bull",
}

export enum Name {
  Ferrari = "Ferrari",
  McLaren = "McLaren",
  Mercedes = "Mercedes",
  RedBull = "Red Bull",
}

export enum Nationality {
  Austrian = "Austrian",
  British = "British",
  German = "German",
  Italian = "Italian",
}

export interface Driver {
  driverId: string;
  permanentNumber?: string;
  code: string;
  url: string;
  givenName: string;
  familyName: string;
  dateOfBirth: Date;
  nationality: string;
}

export interface ICharactersHeaders {
  "cache-control": string;
  "content-type": string;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Request {}

export interface IImage {
  thumbnail: {
    width: number;
    heigth: number;
    source: string | null;
  };
}

export interface ICharacter {
  data: Data;
  status: number;
  statusText: string;
  headers: ICharacterHeaders;
  config: Config;
  request: Request;
}

export interface Config {
  transitional: Transitional;
  transformRequest: null[];
  transformResponse: null[];
  timeout: number;
  xsrfCookieName: string;
  xsrfHeaderName: string;
  maxContentLength: number;
  maxBodyLength: number;
  env: Env;
  headers: ConfigHeaders;
  method: string;
  url: string;
}

export interface Env {
  FormData: null;
}

export interface ConfigHeaders {
  Accept: string;
}

export interface Transitional {
  silentJSONParsing: boolean;
  forcedJSONParsing: boolean;
  clarifyTimeoutError: boolean;
}

export interface Data {
  MRData: MRData;
}

export interface MRData {
  xmlns: string;
  series: string;
  url: string;
  limit: string;
  offset: string;
  total: string;
  RaceTable: RaceTable;
}

export interface RaceTable {
  season: string;
  position: string;
  Races: Race[];
}

export interface Race {
  season: string;
  round: string;
  url: string;
  raceName: string;
  Circuit: Circuit;
  date: Date;
  time: string;
  Results: Result[];
}

export interface Circuit {
  circuitId: string;
  url: string;
  circuitName: string;
  Location: Location;
}

export interface Location {
  lat: string;
  long: string;
  locality: string;
  country: string;
}

export interface Result {
  number: string;
  position: string;
  positionText: string;
  points: string;
  Driver: Driver;
  Constructor: Constructor;
  grid: string;
  laps: string;
  status: Status;
  Time: ResultTime;
  FastestLap: FastestLap;
}

export interface Constructor {
  constructorId: ConstructorID;
  url: string;
  name: Name;
  nationality: Nationality;
}

export interface Driver {
  driverId: string;
  code: string;
  url: string;
  givenName: string;
  familyName: string;
  dateOfBirth: Date;
  nationality: string;
  permanentNumber?: string;
}

export interface FastestLap {
  rank: string;
  lap: string;
  Time: FastestLapTime;
  AverageSpeed: AverageSpeed;
}

export interface AverageSpeed {
  units: Units;
  speed: string;
}

export enum Units {
  Kph = "kph",
}

export interface FastestLapTime {
  time: string;
}

export interface ResultTime {
  millis: string;
  time: string;
}

export enum Status {
  Finished = "Finished",
}

export interface ICharacterHeaders {
  "cache-control": string;
  "content-type": string;
}
