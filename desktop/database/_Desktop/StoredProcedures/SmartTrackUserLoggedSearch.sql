--#############################################################################
-- SOFTGUARD DESKTOP
-- Author : Juan Bonforti
-- Created : 13/05/2019
-- Description : Grilla de SmartTrack de Vigiladores Conectados para envio de mensajes PUSH.
--#############################################################################

CREATE OR ALTER PROCEDURE [dbo].[SmartTrackUserLoggedSearch]
	@page INT = 1,               
	@start INT = 0,               
	@limit INT = 50,               
	@sort VARCHAR(256) = '',   
	@group VARCHAR(256) = '',            
	@filter VARCHAR(2048) = '',        
	@_dc VARCHAR(256) = '',
	@token VARCHAR(128) = '',              
	@totalrows INT = 1 OUTPUT     
AS 
	SET NOCOUNT ON

	--Sort
	 DECLARE @SqlSort AS VARCHAR(256)
	 SELECT @SqlSort = dbo.GetSqlSortForJson(@sort, 'st.Id DESC')
	--('cue_clinea')+'-'+record.get('cue_ncuenta')+ ' ' +record.get('cue_cnombre')
	 --print 'antes del replace '+@SqlSort
	 SET @SqlSort = replace(@SqlSort,'objetivo',' c.cue_clinea ')
	 SET @SqlSort = replace(@SqlSort,'[','')
	 SET @SqlSort = replace(@SqlSort,']','')
	 --print 'despues del replace '+@SqlSort
	 --Filters
	 DECLARE @SqlFilter AS VARCHAR(4096)
	 SELECT @SqlFilter = dbo.GetSqlFilterForJson(@filter, 'SmartTrack')

	--RANGOS 
	DECLARE @SqlFilterRango AS NVARCHAR(max)
	EXEC getSqlRangesForToken @token = @token, @alias = 'c.', @SqlFilterRango = @SqlFilterRango OUTPUT
	SET @SqlFilter = @SqlFilter + @SqlFilterRango
 
	 --Sql
	 DECLARE @Sql NVARCHAR(MAX)
	 SET @Sql = 'FROM [_Datos]..[SmartTrack] st
				INNER JOIN [_Datos]..[VigicontrolUserCurrentSession] vcucs ON (vcucs.vucs_vcid = st.Id)
				INNER JOIN [_Datos]..[m_usuarios] mu ON (vcucs.vucs_usuidkey = mu.usu_idkey)
				INNER JOIN [_Datos].[dbo].[m_cuentas] c ON (c.cue_iid = mu.usu_iidcuenta)
				LEFT JOIN _Tablas.dbo.t_tipos ON tip_ccodigo = c.cue_ctipo
				OUTER APPLY (
					SELECT TOP 1 *
						FROM [_Datos].[dbo].[p_recepcion] pr
							LEFT JOIN [_Tablas].[dbo].[t_codigos_alarma] tca ON (pr.rec_calarma = tca.cod_ccodigo)
					WHERE rec_iusuario = mu.usu_icodigo AND rec_iidcuenta = mu.usu_iidcuenta
					ORDER BY 1 DESC
				) as ultimoEvento
				WHERE 1 = 1 ' + @SqlFilter
 



	 --Total Rows
	 DECLARE @DynamicSqlTotalRows NVARCHAR(MAX) 
	 DECLARE @DynamicSqlTotalRowsParams NVARCHAR(MAX) 
	 SET @DynamicSqlTotalRows = ' SELECT @TotalRows = COUNT(*) ' + @Sql
	 SET @DynamicSqlTotalRowsParams = '@TotalRows INT OUTPUT'
	 	 
	 EXECUTE sp_executesql @DynamicSqlTotalRows, @DynamicSqlTotalRowsParams, @totalrows OUTPUT   

	 --Execute Sql (ReturnRows)
	 DECLARE @DynamicSqlReturnRows NVARCHAR(MAX)   
	 SET @DynamicSqlReturnRows = 'SELECT * 
								   FROM ( SELECT ROW_NUMBER() OVER (ORDER BY ' + @SqlSort + ') AS RowNumber, 
									vcucs.*
									,mu.*
									,st.pushToken
									,st.telefono
									,ultimoEvento.rec_iid
									,rec_calarma
									,rec_tfechahora
									,ultimoEvento.cod_ccodigo
									,ultimoEvento.cod_cdescripcion
									,ultimoEvento.cod_ncolor
									,ultimoEvento.cod_nColorLetra								
									,c.cue_clinea
									,c.cue_ncuenta
									,c.cue_cnombre ' + @Sql + ' ) AS T
								  WHERE RowNumber BETWEEN @from AND @to '
							  
	 DECLARE @DynamicSqlReturnRowsParams NVARCHAR(MAX)          							  
	 SET @DynamicSqlReturnRowsParams = '@from INT, @to INT'							  			  	 
			  	 
	 DECLARE @from INT
	 DECLARE @to INT
	 SELECT @from = (@page - 1) * @limit + 1, @to = @page * @limit
  			  	 
	 EXECUTE sp_executesql @DynamicSqlReturnRows, @DynamicSqlReturnRowsParams, @from = @from, @to = @to
	 
	 
	 print '------'
	 print cast(@DynamicSqlReturnRows as NTEXT)