export interface User {
  user_id: number;
  name: string;
  email: string;
}
export interface CreateUserInput {
  name: string;
  email: string;
  password: string;
}