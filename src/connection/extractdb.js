export const insertNewData = (conn, columns) => {
    return new Promise((resolve, reject) => {
      const sql = `INSERT INTO UserData(ID,Year_Birth,Education,Marital_Status,Income,Kidhome,Teenhome,Dt_Customer,Recency,MntWines,MntFruits,MntMeatProducts,MntFishProducts,MntSweetProducts,MntGoldProds,NumDealsPurchases,NumWebPurchases,NumCatalogPurchases,NumStorePurchases,NumWebVisitsMonth,AcceptedCmp3,AcceptedCmp4,AcceptedCmp5,AcceptedCmp1,AcceptedCmp2,Complain,Z_CostContact,Z_Revenue,Response) VALUES ?`;
      conn.query(sql, [columns], (err, conn) => {
        if (err) {
          reject(err);
        } else {
          resolve(conn);
        }
      });
    });
  };

export const getSummary = (conn) => {
    return new Promise((resolve, reject) => {
      const sql = `SELECT COUNT(*) AS jumlah_pembeli,
      AVG(Year_Birth) AS tahun_lahir,
      AVG(Income) AS penghasilan
      FROM UserData;`;
      conn.query(sql, (err, conn) => {
        if (err) {
          reject(err);
        } else {
          resolve(conn);
        }
      });
    });
  };

export const getGroupBy = (conn, group) => {
    return new Promise((resolve, reject) => {
      const sql = `SELECT ${group} FROM UserData GROUP BY ${group}`;
      conn.query(sql, group, (err, conn) => {
        if (err) {
          reject(err);
        } else {
          resolve(conn);
        }
      });
    });
  };

export const getGroupByResult = (conn, group, agg, col) => {
    return new Promise((resolve, reject) => {
      const sql = `SELECT ${agg}(${col}) as result FROM UserData GROUP BY ${group}`;
      conn.query(sql, [agg, col, group], (err, conn) => {
        if (err) {
          reject(err);
        } else {
          resolve(conn);
        }
      });
    });
  };

//   SELECT * FROM User LEFT OUTER JOIN Asdos ON User.id = Asdos.idU WHERE role = 'asdos'



