import { sequelizeConnection } from "./connections";
import { DatabaseAdapter } from "./DatabaseAdapter";

const dbAdapter = new DatabaseAdapter(sequelizeConnection);

export default dbAdapter;
