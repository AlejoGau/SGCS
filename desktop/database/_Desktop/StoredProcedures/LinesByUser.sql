--#############################################################################
-- SOFTGUARD DESKTOP
-- updated : 2017-06-15 08:45:36.900 
--#############################################################################
CREATE OR ALTER PROCEDURE [dbo].[LinesByUser]  
 @page INT = 1,                 
 @start INT = 0,                 
 @limit INT = 50,                 
 @sort NVARCHAR(64) = '',              
 @filter NVARCHAR(2048) = '',        
 @token NVARCHAR(128)= '',
 @_dc NVARCHAR(256) = '',                
 @totalrows INT = 1 OUTPUT                 
AS    
 SET NOCOUNT ON    
 
 --Load Security
 DECLARE @UserId INT
 SELECT @UserId = dbo.GetUserIdByToken(@token)
 
 DECLARE @HasAdministratorModule INT 
 SELECT @HasAdministratorModule = dbo.UserDesktopWebHasModule(@UserId, 'Administrator')
 
 --Query
 DECLARE @Sql NVARCHAR(1024)
 
 SET @Sql = ' SELECT lin_ccodigo, lin_ccodigo + '' - '' + lin_crazonsocial AS lin_crazonsocial,lin_ccalle,lin_inumero,lin_npiso,lin_cdepartamento,lin_clocalidad,lin_cprovincia,lin_cestado,lin_ccodigopostal,lin_ctelfono,lin_cfax,lin_cimagen,lin_cusuario,lin_cclave,lin_nacceso,lin_cmail,lin_cimagen
			    FROM _Tablas.dbo.t_lineas  
			   WHERE 1=1 ' 

 --Filter Security	
 IF @HasAdministratorModule = 0
	SET @Sql = @Sql + ' AND lin_ccodigo IN (SELECT dwm_dealer FROM _Sistema.dbo.UsersDesktopWebModulos WHERE dwm_idWeb = ' + CAST(@UserId AS VARCHAR) + ')'
 
 -- Execute Query
 EXEC(@Sql)