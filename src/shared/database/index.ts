import {createConnection} from "typeorm";

createConnection()
.then(()=>{
  console.info("\tDatabase: Connected\n");
  process.env.database_status = 'connected';
})
.catch((err: string) => {
  console.error(`\tDatabase: ${err}\n`);
  process.env.database_status = 'error '+err;
});
