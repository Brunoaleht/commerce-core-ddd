export interface IQueryParams {
  page?: number;
  limit?: number;
  filters?: { [key: string]: any };
  sort?: { [key: string]: "ASC" | "DESC" };
}

export interface IMetadata<T> {
  page: number;
  limit: number;
  total: number;
  data: T[];
}

export interface IRepositoryInterface<T> {
  create(entity: T): Promise<void>;
  update(entity: T): Promise<void>;
  find(id: string): Promise<T | null>;
  delete(id: string): Promise<void>;
  findAll(): Promise<T[]>;
  paginated(params: IQueryParams): Promise<IMetadata<T>>;
}
