CREATE OR ALTER PROCEDURE [dbo].[AfipCaeResponseSearch]    
 @mcw_macidkey INT,  
 @mcw_estado INT,  
 @mcw_fecha DATETIME,  
 @mcw_requesturl VARCHAR(1024),  
 @mcw_requestxml VARCHAR(MAX),  
 @mcw_responsexml VARCHAR(MAX)   
AS  
 SET NOCOUNT ON  
  
 UPDATE [_Datos].[dbo].[MG_Afip_Cae] SET mac_estado = @mcw_estado, mac_fechamod = GETDATE() WHERE mac_idkey = @mcw_macidkey

 INSERT INTO _Datos.dbo.MG_Afip_Cae_Ws (mcw_macidkey, mcw_estado, mcw_fecha, mcw_requesturl, mcw_requestxml, mcw_responsexml)  
           VALUES (@mcw_macidkey, @mcw_estado, @mcw_fecha, @mcw_requesturl, @mcw_requestxml, @mcw_responsexml)