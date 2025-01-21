export interface IDatabaseConfig {
  database: string;
  username: string;
  password: string;
  host: string;
  port?: number;
  dialect?: string;
}

export interface IDatabaseConnection {
  connect(): Promise<void>;
  disconnect(): Promise<void>;
  getInstance(): any;
}
