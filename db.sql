-- buat db terlebih dahulu
CREATE DATABASE MarketingCampaign

-- baru jalankan query pada db tersebut
CREATE TABLE `UserData` (
  `ID` int(11) NOT NULL,
  `Year_Birth` smallint(11),
  `Education` varchar(50),
  `Marital_Status` varchar(50),
  `Income` int(11),
  `Kidhome` tinyint(11),
  `Teenhome` tinyint(11),
  `Dt_Customer` DATE,
  `Recency` smallint(11),
  `MntWines` int(11),
  `MntFruits` int(11),
  `MntMeatProducts` int(11),
  `MntFishProducts` int(11),
  `MntSweetProducts` int(11),
  `MntGoldProds` int(11),
  `NumDealsPurchases` int(11),
  `NumWebPurchases` int(11),
  `NumCatalogPurchases` int(11),
  `NumStorePurchases` int(11),
  `NumWebVisitsMonth` int(11),
  `AcceptedCmp3` tinyint(11),
  `AcceptedCmp4` tinyint(11),
  `AcceptedCmp5` tinyint(11),
  `AcceptedCmp1` tinyint(11),
  `AcceptedCmp2` tinyint(11),
  `Complain` tinyint(11),
  `Z_CostContact` int(11),
  `Z_Revenue` int(11),
  `Response` tinyint(11)
);