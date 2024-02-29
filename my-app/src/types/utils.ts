export interface ResponseApi<Data> {
  msg: string;
  data: Data;
}

export interface TimeTamps {
  createdAt: string;
  updatedAt: string;
}

export interface User {
  id: string;

  firstName: string;

  lastName: string;

  email: string;
}
