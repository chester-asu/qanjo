export namespace DTC {
  type Token = {
    token: string;
  };
  type CreateBand = {
    name: string;
  };
  type JwtPayload = {
    username: string;
    email: string;
    id: number;
  };
  type Login = {
    username: string;
    password: string;
  };
  type Register = {
    username: string;
    password: string;
    email: string;
  };
  type UpdateUser = {
    username: string;
    email: string;
  };
  type User = {
    username: string;
    email: string;
    id: number;
  };
  type CreateMembership = {
    bandID: number;
    userID: number;
  };
  type Band = {
    id: number;
    name: string;
  };
  type Membership = {
    id: number;
    user: DTC.User;
    band: DTC.Band;
  };
  type CreateSong = {
    title: string;
    key: string;
    bandID: number;
  };
  type Song = {
    title: string;
    key: string;
    band: DTC.Band;
    id: number;
  };
}
