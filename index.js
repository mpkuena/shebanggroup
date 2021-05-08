import app from "./server.js";
import mongodb from "mongodb";
import dotenv from "dotenv";
import fs from "fs";
import busDAO from "../dao/busDAO.js";
import { connect } from "http2";
dotenv.config();


const MongoClient = mongodb.MongoClient;
const uri = process.env.DATABASE_URI;
const port = process.env.PORT || 8000;
const host = process.env.HOST;

MongoClient.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  poolSize: 50,
  wtimeout: 3000,
  writeConcern: {
    j: true,
  },
})
let gfs;
connect.once('open', () => {
    gfs = new mongodb.GridFSBucket(connect.db, { bucketName: "uploads" });
  })
  .catch((err) => {
    console.error(err.stack);
    process.exit(1);
  })
  .then(async (client) => {
    await busDAO.injectDB(client);
    app.listen(port, () => {
      console.log(`Server is listening on port: ${host}:${port}`);
    });
  });
