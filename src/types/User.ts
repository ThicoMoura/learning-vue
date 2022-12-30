import type Permission from "./Permission";

export default interface User {
  Token: string;
  Name: string;
  Cpf: string;
  Permission: Array<Permission>;
  Image?: string;
}
