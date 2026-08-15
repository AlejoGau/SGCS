--#############################################################################
-- SOFTGUARD DESKTOP
-- updated : 2017-06-15 08:45:36.150 
--#############################################################################
CREATE OR ALTER PROCEDURE [dbo].[migradorTipoUsuario]
AS
BEGIN
  DECLARE @userId INT
DECLARE @modules NVARCHAR(MAX)

CREATE TABLE #Temp (id INT IDENTITY(1,1),tipo int, modules NVARCHAR(100), userid INT)  
CREATE TABLE #Temp2 (id INT IDENTITY(1,1),userId int)

CREATE TABLE #resultado (id INT IDENTITY(1,1),tipo int, modules NVARCHAR(100), userid INT)  

INSERT INTO #Temp2 (userId)
	SELECT top 5 dwm_idWeb
	FROM [_Sistema]..[UsersDesktopWebModulos]



DECLARE @Index INT
DECLARE @Index2 INT
SET @Index = 1
WHILE((SELECT COUNT(*) FROM #Temp2 WHERE id = @Index) != 0)
BEGIN	
	SELECT @userId = userid FROM #Temp2 WHERE id = @Index

	INSERT INTO #Temp (tipo,modules,userid)
		SELECT udw_tipo, udm_key_reference, dwm_idWeb
			FROM [_Sistema]..[UsersDesktopWebModulos] o	
			INNER JOIN [_Sistema]..[UsersDesktopWeb] u ON o.dwm_idWeb = u.udw_idKey
			INNER JOIN [_Sistema]..UsersDesktopModules m ON m.udm_idKey = o.dwm_idModules
				WHERE o.dwm_idWeb = @userId

	
	
END

select * from #Temp2

END