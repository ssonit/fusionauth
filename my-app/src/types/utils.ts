export interface ResponseApi<Data> {
  msg: string;
  data: Data;
}

export interface TimeTamps {
  createdAt: string;
  updatedAt: string;
}
