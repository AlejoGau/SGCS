--#############################################################################
-- SOFTGUARD DESKTOP
-- updated : 2017-06-15 08:51:39.477 
--#############################################################################

--#############################################################################
-- SOFTGUARD DESKTOP
-- updated : 2017-06-15 08:45:35.390 
--#############################################################################
CREATE OR ALTER PROCEDURE [dbo].[Trackguard_Equipos]  
 @page INT = 1,                 
 @start INT = 0,                 
 @limit INT = 50,                 
 @sort NVARCHAR(64) = '',              
 @filter NVARCHAR(2048) = '',         
 @token NVARCHAR(128) = '',         
 @_dc NVARCHAR(256) = '',                
 @totalrows INT = 1 OUTPUT                
AS  
 SELECT distinct rec_iid AS Id, [rec_cdescripcion] As Equipo   
   FROM [_Datos].[dbo].[m_receptores_cab]
   where rec_iEsGPS = '1'
   Or rec_cdll='CMDSMS' -- pasado por pablo 11/04/2020
   order by rec_cdescripcion asc
  --Join  [_Tablas].[dbo].[t_comandos] On [tcm_iReceptor]=[rec_iid]  
  --Where rec_cdescripcion LIKE '%GPS%'
  --Where [rec_ntcpip]=1 And [tcm_nEsGPS]=1 
  -- mostramos todos los receptores hasta poner campo nuevo de GPS hablado con pablo 9/11/2018
  -- 24/01 se agrego columna rec_iEsGPS para saber si la libreria es de un GPS y listarlo correctamente