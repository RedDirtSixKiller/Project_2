IF OBJECT_ID('RIB.dbo.AJPK_MTR_GEO', 'U') IS NOT NULL 
  DROP TABLE RIB.dbo.AJPK_MTR_GEO; 




SELECT * INTO RIB.dbo.AJPK_MTR_GEO FROM (
									
SELECT M.MTR_ID,
       M.SP_ID,
       M.MODEL_CD,
       M.DIV_NAME,
       M.PHASE,
       M.FORM_NBR,
       M.PREM_ID,
       M.ADDR_LINE_1,
       M.ADDR_LINE_2,
       M.CITY,
       M.STATE,
       M.ZIP,
       M.CUST_CLASS_CD,
       cast(M.PREM_LATITUDE as float) as PREM_LATITUDE,
       cast(M.PREM_LONGTITUDE as float) as PREM_LONGITUDE,
       M.MR_ROUTE_TYPE,
       PR.PHYSICAL_RTE,
       SA.SubArea,
       SA.Office
FROM (MIB.dbo.REF_FMO_PHYSICAL_ROUTE    PR
      LEFT OUTER JOIN MIB.dbo.REF_SUBAREA SA
         ON (PR.PHYSICAL_RTE = SA.[Route]))
     RIGHT OUTER JOIN MIB.dbo.MSTR_MTR_ELEC M ON (M.SP_ID = PR.SP_ID)
WHERE M.CURR_TRANS_CD = 's'

union

SELECT M.MTR_ID,
       M.SP_ID,
       M.MODEL_CD,
       M.DIV_NAME,
       null AS PHASE,
       MODEL_CD as FORM_NBR,
       M.PREM_ID,
       M.ADDR_LINE_1,
       M.ADDR_LINE_2,
       M.CITY,
       M.STATE,
       M.ZIP,
       M.CUST_CLASS_CD,
       M.PREM_LATITUDE,
       M.PREM_LONGTITUDE,
       M.MR_ROUTE_TYPE,
       PR.PHYSICAL_RTE,
       SA.SubArea,
       SA.Office

FROM (MIB.dbo.REF_FMO_PHYSICAL_ROUTE    PR
      LEFT OUTER JOIN MIB.dbo.REF_SUBAREA SA
         ON (PR.PHYSICAL_RTE = SA.[Route]))
     RIGHT OUTER JOIN MIB.dbo.MSTR_MTR_GAS M ON (M.SP_ID = PR.SP_ID)
WHERE M.CURR_TRANS_CD = 's') as tmp
