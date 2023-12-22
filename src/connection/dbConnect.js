import mysql from "mysql"

const pool = mysql.createPool({
    user: "root",
    password: "",
    database: "marketingcampaign",
    host: "localhost",
  });

const dbConnect = () => {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, conn) => {
        if (err) {
            reject(err);
        } else {
            resolve(conn);
        }
        });
    });
};

export const conn = await dbConnect()