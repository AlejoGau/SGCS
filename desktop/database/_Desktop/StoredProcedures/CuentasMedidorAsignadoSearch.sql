-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE OR ALTER PROCEDURE [dbo].[CuentasMedidorAsignadoSearch]
	-- Agrega los parámetros para el procedimiento almacenado aquí
	@sort VARCHAR(200) = '',
	@page INT = 1,               
	@start INT = 0,               
	@limit INT = 50,               
	@filter VARCHAR(2048) = ''
AS
BEGIN
	-- SET NOCOUNT ON se agrega para evitar que los conjuntos de resultados adicionales
	-- interfieran con las instrucciones SELECT.
	SET NOCOUNT ON;
	  
	-- Order
	DECLARE @SortField VARCHAR(64)           
	DECLARE @SortDirection VARCHAR(4)          
	SELECT @SortField = 'cue_iid', @SortDirection = 'ASC'          
           
	IF @sort != ''          
	BEGIN          
		SELECT @SortField = StringValue from dbo.parseJson(@sort) WHERE NAME = 'property' ORDER BY element_ID DESC          
		SELECT @SortDirection = StringValue from dbo.parseJson(@sort) WHERE NAME = 'direction' ORDER BY element_ID DESC          
         
		IF @SortField = 'Situacion'      
			SET @SortField = 'est_nEstado' 
		IF @SortField = 'cue_clinea' AND @SortDirection = 'DESC'    
			SET @SortField = 'cue_clinea DESC, cue_ncuenta ';
		ELSE IF @SortField = 'sta_dfechautimaalarma' 
			SET @SortField = 'sta_dfechautimaalarma ';
	END  

	-- Crear la tabla temporal #Temp
	CREATE TABLE #Temp (RowNumber INT, Id INT,ped_idCta VARCHAR(100),ped_cUri VARCHAR(100), ped_cDeviceID VARCHAR(100),ped_cLabel VARCHAR(50),ped_cName varchar(50),ped_iVarCount VARCHAR(50),ped_tCreatedAt DATETIME,cue_clinea VARCHAR(50), cue_cnombre VARCHAR(50),cue_ncuenta VARCHAR(50))

	-- Construir la consulta SQL dinámica
	DECLARE @Sql NVARCHAR(MAX)          
	SET @Sql = 'INSERT INTO #Temp (RowNumber, Id,ped_idCta,ped_cUri,ped_cDeviceID,ped_cLabel,ped_cName,ped_iVarCount,ped_tCreatedAt,cue.cue_clinea,cue.cue_cnombre,cue.cue_ncuenta)          
	    SELECT ROW_NUMBER() OVER (ORDER BY ' + @SortField + ' ' + @SortDirection + ') AS RowNumber, ped.ped_idKey, ped.ped_idCta,ped.ped_cUri,ped.ped_cDeviceID,ped.ped_cLabel,ped.ped_cName,ped.ped_iVarCount,ped.ped_tCreatedAt, cue.cue_clinea,cue.cue_cnombre,cue.cue_ncuenta   
	      FROM _Datos.dbo.p_EnergyDevices ped
			LEFT OUTER JOIN _Datos.dbo.m_cuentas cue ON ped.ped_idCta = cue.cue_iid
			WHERE 1 = 1'         

	-- FILTER - 
	DECLARE @FilterFieldText VARCHAR(MAX)
	DECLARE @FilterValueText VARCHAR(MAX)
	IF @filter != ''          
	BEGIN        
		SELECT * INTO #FilterTable FROM dbo.parseJSON(@filter) 

		SELECT TOP 1 @FilterFieldText = StringValue FROM #FilterTable
		SELECT @FilterValueText = StringValue FROM #FilterTable WHERE NAME = 'value' 

		-- Imprime el valor de @FilterFieldText
		PRINT @FilterFieldText
		PRINT @FilterValueText
		-- Selecciona todos los registros de la tabla temporal
		SELECT * FROM #FilterTable
	END

	IF @FilterFieldText IS NOT NULL      
	BEGIN
		
		IF @FilterFieldText = 'Name'
		BEGIN
			SET @Sql = @Sql + ' AND ped_cName != ''' + @FilterValueText + ''''
		END
		ELSE IF @FilterFieldText = 'cue_iid'
		BEGIN
			SET @Sql = @Sql + ' AND ' + @FilterFieldText + '=''' + @FilterValueText + '''' 
		END
		ELSE IF @FilterFieldText = 'ped_idKey'
		BEGIN
			SET @Sql = @Sql + ' AND ' + @FilterFieldText + '=''' + @FilterValueText 
		END
		ELSE IF @FilterFieldText = 'ped_cDeviceID'
		BEGIN
			SET @Sql = @Sql + ' AND ' + @FilterFieldText + ' LIKE ''%' + @FilterValueText + '%'''
		END
		ELSE IF @FilterFieldText = 'ped_tCreatedAt'
		BEGIN 
			SET @Sql = @Sql + ' AND ' + @FilterFieldText + ' >= ' + @FilterValueText + '''' 
		END
		ELSE IF @FilterFieldText = 'ped_tCreatedAt'
		BEGIN 
			SET @Sql = @Sql + ' AND ' + @FilterFieldText + ' <= ' + @FilterValueText + '''' 
		END

	END

	-- Imprime la consulta SQL generada
	PRINT @Sql
	
	-- Ejecuta la consulta SQL generada
	INSERT INTO #Temp (RowNumber, Id)
	EXEC sp_executesql @Sql

	-- Realiza cualquier operación adicional con los resultados si es necesario

	-- Finalmente, selecciona los resultados de #Temp
	SELECT * FROM #Temp

	-- Elimina la tabla temporal
	DROP TABLE #Temp
END