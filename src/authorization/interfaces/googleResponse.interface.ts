export interface UserResponse {
  message: string;
  user: User;
}

export interface User {
  email: string;
  firstName: string;
  lastName: string;
  picture: string;
  accessToken: string;
}
