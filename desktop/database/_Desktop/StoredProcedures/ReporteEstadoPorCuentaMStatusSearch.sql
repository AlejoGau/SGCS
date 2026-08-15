CREATE OR ALTER PROCEDURE [dbo].[ReporteEstadoPorCuentaMStatusSearch]
@page INT = 1,               
 @start INT = 0,               
 @limit INT = 50,     
 @table NVARCHAR(128) = 'p_recepcion',
 @sort VARCHAR(256) = '',   
 @group VARCHAR(256) = '',            
 @filter VARCHAR(2048) = '',        
 @_dc VARCHAR(256) = '',  
	@token VARCHAR(256) = '',  
 @totalrows INT = 1 --OUTPUT     
AS  
 SET NOCOUNT ON   
 
 --Sort
 DECLARE @SqlSort AS NVARCHAR(MAX)
 SELECT @SqlSort = dbo.GetSqlSortForJson(@sort, 'p1.[rec_iid] DESC')
 print @filter
 --Filters
 DECLARE @SqlFilter AS NVARCHAR(MAX)
 SELECT @SqlFilter = dbo.GetSqlFilterForJson(@filter, 'p_recepcion')
 print @SqlFilter


IF (@table IS NULL OR @table = '')
BEGIN
	set @table = 'p_recepcion'+ CONVERT(NVARCHAR(6), DATEADD (MONTH , -1 , getdate() )  , 112) 
END

IF @token != ''
 BEGIN
	 DECLARE @SqlFilterRango AS NVARCHAR(MAX)
	 EXEC getSqlRangesForToken @token = @token, @alias = 'c.', @SqlFilterRango = @SqlFilterRango OUTPUT

	 SET @SqlFilter = @SqlFilter  + @SqlFilterRango
 END



-- Traduccion
DECLARE @h AS VARCHAR(30) = 'Habilitado'
DECLARE @ht AS VARCHAR(30)  --cambio relacionado con https://softguard.atlassian.net/browse/DSS-411 
EXECUTE [dbo].[LocalizationGetLocale] @Name = @h, @soloOutput=1, @translation = @ht OUTPUT;
DECLARE @p AS VARCHAR(30) = 'Prueba'
DECLARE @pt AS VARCHAR(30) 
EXECUTE [dbo].[LocalizationGetLocale] @Name = @p, @soloOutput=1, @translation = @pt OUTPUT;
DECLARE @nh AS VARCHAR(30) = 'No Habilitado'
DECLARE @nht AS VARCHAR(30) 
EXECUTE [dbo].[LocalizationGetLocale] @Name = @nh, @soloOutput=1, @translation = @nht OUTPUT;
DECLARE @pz AS VARCHAR(30) = 'Prueba x Zonas'
DECLARE @pzt AS VARCHAR(30) 
EXECUTE [dbo].[LocalizationGetLocale] @Name = @pz, @soloOutput=1, @translation = @pzt OUTPUT;
DECLARE @s AS VARCHAR(30) = 'Solicitar Eliminar'
DECLARE @st AS VARCHAR(30) 
EXECUTE [dbo].[LocalizationGetLocale] @Name = @s, @soloOutput=1, @translation = @st OUTPUT;
DECLARE @cs AS VARCHAR(30) = 'Cambio Situacion en Cuenta'
DECLARE @cst AS VARCHAR(30)
EXECUTE [dbo].[LocalizationGetLocale] @Name = @cs, @soloOutput=1, @translation = @cst OUTPUT;

 --Sql
 DECLARE @Sql NVARCHAR(MAX)
 SET @Sql = N' 

		SELECT cue_iid Id, c.*, p1.*, s.*,e.* , 
			( CASE 
				WHEN p1.rec_calarma = ''_SN'' THEN '''+@nh+''' /*_SN Cambio a situacion no habilitado*/
				WHEN p1.rec_calarma = ''_SH'' THEN '''+@ht+''' /*Cambio a situacion habilitado*/
				WHEN p1.rec_calarma = ''_SP'' THEN '''+@pt+''' /*Cambio a situacion en prueba*/
				WHEN p1.rec_calarma = ''_SZ'' THEN '''+@pzt+''' /*Cambio a situacion en prueba por zonas*/
				WHEN p1.rec_calarma = ''_EC'' THEN '''+@st+'''  /*_EC Solicitud de Eliminacion de Cuenta*/
				WHEN p1.rec_calarma = ''_CS'' THEN '''+@cst+'''  /*_CS Cambio Situacion en Cuenta*/
			ELSE '''+@ht+''' END ) AS Situacion

	 from _datos..m_cuentas c
		--INNER JOIN 
		-- (select rec_iidcuenta, max(rec_iid) as maxid from _datos..p_recepcion group by rec_iidcuenta) as b on
		-- p1.rec_iid = b.maxid
		--INNER JOIN _datos..m_cuentas c ON p1.rec_iidcuenta = cue_iid
		INNER JOIN _datos..'+@table+' p1 ON p1.rec_iidcuenta = cue_iid
		INNER JOIN _datos..m_estado_cuenta_cab e ON est_iidcuenta = cue_iid
		INNER JOIN _datos..m_status s ON s.sta_iidcuenta = p1.rec_iidcuenta
		WHERE 1 = 1
		--AND p1.rec_calarma in (''_SP'',''_SH'',''_SN'',''_SZ'',''_EC'') 
		' + @SqlFilter
 print '****************************************************'
 print cast(@SqlFilter as ntext)
 --Total Rows  			  	 
 EXECUTE sp_executesql @Sql