import "reflect-metadata";
import {createConnection} from "typeorm";
import UserRelease from '@modules/userReleases/typeorm/entities/UserRelease';
import Transaction from '@modules/transactions/typeorm/entities/Transaction';
import User from "../../modules/users/typeorm/entities/User";

export async function intializeDB(): Promise<void> {
  createConnection({
    type: "postgres",
    host: "ec2-52-86-56-90.compute-1.amazonaws.com",
    port: 5432,
    username: "rnixveopvxgapd",
    password: "924bbc9ac4ad9542594411d69b19c30138f3a138e3750014d124af014593ca22",
    database: "du4k9vug9n84e",
    schema: "filipe_abner",
    ssl: {
      "rejectUnauthorized": false
    },
    entities: [
        User,
        Transaction,
        UserRelease,
    ]
  })
  .then(()=> console.log("Database connected"))
  .catch((error)=> console.log("Database error: "+error));
}