import mysql from "mysql2";

let connection;

const dbconnection = () => {
    
    if (!connection) {
      connection = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "",
        database: "online_store",
  });

  connection.connect((err) => {
    if (err) return console.log("database error", err);

    console.log("database connected successfuly...");
  });
}
  return connection
};

export default dbconnection;
