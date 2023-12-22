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


//   SELECT * FROM User LEFT OUTER JOIN Asdos ON User.id = Asdos.idU WHERE role = 'asdos'