declare namespace DTC {
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
}
