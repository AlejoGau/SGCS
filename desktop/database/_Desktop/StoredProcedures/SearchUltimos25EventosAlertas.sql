CREATE OR ALTER PROCEDURE [dbo].[SearchUltimos25EventosAlertas]
	 @page INT = 1,               
	 @start INT = 0,               
	 @limit INT = 50,               
	 @sort NVARCHAR(256) = '',   
	 @group NVARCHAR(256) = '',            
	 @filter NVARCHAR(2048) = '',        
	 @_dc NVARCHAR(256) = '',              
	 @totalrows INT = 1 OUTPUT, 
	 @token VARCHAR(128) = ''

AS
	SET NOCOUNT ON
	/*
	 * ORIGINAL
	 *
	Select top 25 convert(char,rec_tfechahora,105) as rec_tfechahora_format , convert(char,rec_tfechahora,108) as rec_thora ,cod_ccodigo,cod_cdescripcion as descripcion, cod_ncolor as color_fondo, cod_nColorLetra as color_letra,cod_nColorLetra,cue_clinea,cue_ncuenta,cue_cnombre,rec_calarma,rec_nestado  
		From [_Datos].[dbo].[p_recepcion]  
					inner join [_Datos].[dbo].[m_cuentas]  on cue_iid=rec_iidcuenta 
					inner join [_Tablas].[dbo].[t_codigos_alarma]  on cod_ccodigo=rec_calarma 
			where (rec_nestado>=0 and rec_nestado<=3 or (rec_nestado=6 or rec_nestado=7)) 
					and CONVERT(char, rec_tfechahora,112) <= CONVERT(CHAR,GETDATE(),112) 
		order by rec_tfechahora desc
	 */

	/*
	 * APLICANDO FILTROS y RANGOS
	 */
	--Filters
	DECLARE @SqlFilter AS VARCHAR(4096)
	SET @SqlFilter = dbo.GetSqlFilterForJson(@filter, '[_Datos].[dbo].[p_recepcion]')

	--RANGOS 
	DECLARE @SqlFilterRango AS VARCHAR(max) = ''
	EXEC getSqlRangesForToken @table = '[_Datos].[dbo].[p_recepcion]', @token = @token, @alias = 'c.', @SqlFilterRango = @SqlFilterRango OUTPUT

	print '---';
	print @SqlFilterRango
	print '---';

	SET @SqlFilter = @SqlFilter + @SqlFilterRango
	print @SqlFilter
 
	--print  @SqlSort

	--Sql
	DECLARE @Sql NVARCHAR(MAX) = '';
	select @Sql = ' 
			Select top 25 convert(char,rec_tfechahora,105) as rec_tfechahora_format 
					,convert(char,rec_tfechahora,108) as rec_thora 
					,cod_ccodigo,cod_cdescripcion as descripcion
					,cod_ncolor as color_fondo
					,cod_nColorLetra as color_letra
					,cod_nColorLetra
					,cue_clinea
					,cue_ncuenta
					,cue_cnombre
					,rec_calarma
					,
					(CASE 
						WHEN rec_nestado = 0 THEN ''Nuevo/Pendiente''
						WHEN rec_nestado = 1 THEN ''En Proceso''
						WHEN rec_nestado = 2 THEN ''Espera''
						WHEN rec_nestado = 3 THEN ''Procesado''
						WHEN rec_nestado = 4 THEN ''En proceso desde Espera''
						WHEN rec_nestado = 5 THEN ''Procesado (No alerta)''
						WHEN rec_nestado = 6 THEN ''Procesado (Modo prueba)''
						WHEN rec_nestado = 7 THEN ''Procesado (Modo deshabilitado)''
						WHEN rec_nestado = 8 THEN ''Llamado telefónico''
					ELSE ''En proceso múltiple'' END ) as rec_nestado  
			From [_Datos].[dbo].[p_recepcion]  
						inner join [_Datos].[dbo].[m_cuentas] c on c.cue_iid = rec_iidcuenta 
						inner join [_Tablas].[dbo].[t_codigos_alarma] on cod_ccodigo=rec_calarma 
				WHERE 1 = 1 ' + @SqlFilter + '
					AND (rec_nestado>=0 and rec_nestado<=3 or (rec_nestado=6 or rec_nestado=7)) 
					AND CONVERT(char, rec_tfechahora,112) <= CONVERT(CHAR,GETDATE(),112) 
			ORDER BY rec_tfechahora desc
		'

	print @sql
	exec (@sql)