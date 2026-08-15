--#############################################################################
-- SOFTGUARD DESKTOP
-- updated : 2017-06-15 08:51:37.587 
--#############################################################################
CREATE OR ALTER PROCEDURE [dbo].[m_comprobantes_cab_fcSearch]
@page INT = 1,               
 @start INT = 0,               
 @limit INT = 50,               
 @sort NVARCHAR(256) = '',   
 @group NVARCHAR(256) = '',            
 @filter NVARCHAR(2048) = '',        
 @_dc NVARCHAR(256) = '', 
 @token NVARCHAR(128) = '',                  
 @totalrows INT = 1 OUTPUT     
AS  
 SET NOCOUNT ON   

	DECLARE @HasAdministratorModule INT
	DECLARE @HasMoneyGuardModule INT
	IF @token != ''
		BEGIN
		 DECLARE @UserId INT
		 SELECT @UserId = dbo.GetUserIdByToken(@token)
		 SELECT @HasAdministratorModule = dbo.UserDesktopWebHasModule(@UserId, 'Administrator') 
		 SELECT @HasMoneyGuardModule = dbo.UserDesktopWebHasModule(@UserId, 'WebMG')
		END
	ELSE 
		BEGIN
			SET @HasAdministratorModule = 1
		END


 -- engaño para que los editores listen los campos
 IF 1 = 2
     BEGIN
       -- These are the actual column names and types returned by the real proc
       SELECT 1 AS RowNumber, cbc_iCodigo_id Id, 
			cbc_cCAE as cbc_ccae,
			cbc_cEstado as cbc_cestado,
			cbc_cPrefijoCbte as cbc_cprefijocbte,
			cbc_cTipoCbte as cbc_ctipocbte,
			cbc_cVtoCAE as cbc_cvtocae,
			convert(date,cbc_dFecha) as cbc_dfecha,
			cbc_iCliente as cbc_icliente,
			cbc_iCodigo_ID as cbc_icodigo_id,
			cbc_iNumeroCbte as cbc_inumerocbte,
			cbc_yImpuesto1 as cbc_yimpuesto1,
			cbc_yImpuesto2 as cbc_yimpuesto2,
			cbc_yImpuesto3 as cbc_yimpuesto3,
			cbc_ySubTotal as cbc_ysubtotal,
			cbc_iVersion as cbc_iversion,
			cbc_yTotal as cbc_ytotal,
			RIGHT('0000'+cbc_cPrefijoCbte, 4)+'-'+RIGHT ('00000000'+convert(NVARCHAR(8), cbc_iNumeroCbte), 8) as _numeroComprobante,
			RIGHT('00000000000'+[org_cidentificacion], 11) +RIGHT('00'+convert(varchar(2),tc.[cbt_nCbteCAE]), 2)+RIGHT('0000'+cbc_cPrefijoCbte, 4)+cbc_cCAE+cbc_cVtoCAE as CodBarrasCAE,
			orgs.id as idOrganizacion, 
			--orgs.Name as nombreOrganizacion
			cli.cli_cnombre as nombreOrganizacion
			,cli.cli_iorganizacion
			,[cli_ccategoriaimpositiva]
			,[cli_ccallefiscal]
			,[cli_clocalidadfiscal]
			,[cli_cprovinciafiscal]
			,[cli_ccodigopostalfiscal]
			,[cli_inumero]
			,[cli_ccondicionpago]
			,[cli_cidentificacion]
			,pcli.pro_cdescripcion as cli_pro_cdescripcion
			,clicp.[con_cdescripcion] as cli_con_cdescripcion
			,clici.[cat_cdescripcion] as cli_cat_cdescripcion
			,ofc.org_icodigo_id
			,[org_cnombre]
			,[org_ccallefiscal]
			,[org_clocalidadfiscal]
			,[org_cprovinciafiscal]
			,[org_ccodigopostalfiscal]
			,[org_ctelefono]
			,[org_cmail]
			,[org_ccategoriaimpositiva]
			,[org_cidentificacion]
			,[org_cinicioactividades]
			,[org_cempresacb]
			,[org_cheadercbte]
			,porg.pro_cdescripcion as org_pro_cdescripcion
			,orgci.[cat_cdescripcion] as org_cat_cdescripcion
			,tc.cbt_cletra as cbt_cletra
			,mon_csymbol
			FROM _datos.dbo.m_comprobantes_cab_fc o
			LEFT JOIN  [_Datos]..[Organization] orgs ON cbc_iCliente = orgs.Account
			LEFT JOIN  [_Datos]..m_clientes_fc cli ON cli.cli_icodigo_id = cbc_icliente
			left join _Tablas..t_comprobantes_fc tc on (cbc_cTipoCbte = tc.cbt_ccodigo and cbt_idOrganizacionFacturadora = cli_iOrganizacion)
			LEFT JOIN  _tablas..t_organizacion_fc ofc ON cli.cli_iorganizacion = ofc.org_icodigo_id
			left join _tablas..t_provincias porg on ofc.org_cprovinciafiscal = porg.pro_ccodigo
			left join _tablas..t_provincias pcli on cli.[cli_cprovinciafiscal] = pcli.pro_ccodigo
			left join _tablas..t_monedas mon on mon_ccodigo = org_csymbol
			left join [_Tablas].[dbo].[t_condiciones_pago_fc] clicp on cli.[cli_ccondicionpago] = clicp.[con_ccodigo] and clicp.[con_orgidcodigoid] = cli.cli_iorganizacion
			left join [_Tablas].[dbo].[t_categorias_impositivas_fc] orgci on ofc.[org_ccategoriaimpositiva] = orgci.[cat_ccodigo] and orgci.[cat_orgicodigoid] = ofc.org_icodigo_id
			left join [_Tablas].[dbo].[t_categorias_impositivas_fc] clici on cli.[cli_ccategoriaimpositiva] = clici.[cat_ccodigo] and clici.[cat_orgicodigoid] = cli.cli_iorganizacion
     END;
 
 --Sort
 DECLARE @SqlSort AS NVARCHAR(MAX)
 SELECT @SqlSort = dbo.GetSqlSortForJson(@sort, 'o.[cbc_iCodigo_id] DESC')
 
 --Filters
 DECLARE @SqlFilter AS NVARCHAR(MAX)
 SELECT @SqlFilter = dbo.GetSqlFilterForJson(@filter, 'm_comprobantes_cab_fc')


DECLARE @joins NVARCHAR(MAX) = ''
IF @HasAdministratorModule != 1 AND @HasMoneyGuardModule != 1
BEGIN
	print 'Por token'
	SET @joins = 'INNER JOIN _Sistema..UsersDesktopWeb udw ON udw_empresa = orgs.Id AND udw_idKey = '+ CONVERT(varchar(50), @UserId)
END
 
 --Sql
 DECLARE @Sql VARCHAR(MAX)
 SET @Sql = 'FROM _datos.dbo.m_comprobantes_cab_fc o
					OUTER APPLY (SELECT TOP 1 * FROM [_Datos]..m_cuenta_corriente_fc WHERE cta_iCodigoCbte = o.cbc_icodigo_id) cc
					OUTER APPLY (SELECT TOP 1 * FROM [_Datos]..[Organization] WHERE Account = cbc_iCliente and Account > 0) orgs
					LEFT JOIN  [_Datos]..m_clientes_fc cli ON cli.cli_icodigo_id = cbc_icliente
					OUTER APPLY (SELECT TOP 1 * FROM [_Tablas]..t_comprobantes_fc WHERE cbt_ccodigo = cbc_cTipoCbte AND cbt_idOrganizacionFacturadora = cli_iOrganizacion) com
					LEFT JOIN  _tablas..t_organizacion_fc ofc ON cli.cli_iorganizacion = ofc.org_icodigo_id
					left join _tablas..t_provincias porg on ofc.org_cprovinciafiscal = porg.pro_ccodigo
					left join _tablas..t_provincias pcli on cli.[cli_cprovinciafiscal] = pcli.pro_ccodigo
					left join _tablas..t_monedas mon on mon_ccodigo = org_csymbol
					OUTER APPLY (SELECT TOP 1 * FROM [_Tablas].[dbo].[t_condiciones_pago_fc] WHERE con_ccodigo = cli.[cli_ccondicionpago] AND con_orgidcodigoid = cli.cli_iorganizacion) clicp
					OUTER APPLY (SELECT TOP 1 * FROM [_Tablas].[dbo].[t_categorias_impositivas_fc] WHERE cat_ccodigo = ofc.[org_ccategoriaimpositiva] AND cat_orgicodigoid = ofc.org_icodigo_id) orgci
					OUTER APPLY (SELECT TOP 1 * FROM [_Tablas].[dbo].[t_categorias_impositivas_fc] WHERE cat_ccodigo = cli.[cli_ccategoriaimpositiva] AND cat_orgicodigoid = cli.cli_iorganizacion) clici
					OUTER APPLY (SELECT TOP 1 * FROM [_datos].[dbo].[MG_ComprobanteFacturacionContrato] WHERE cfc_cbcicodigoid = o.cbc_icodigo_id) cfc

					'+@joins+'
			WHERE 1 = 1 ' + @SqlFilter
 print @Sql
 --Total Rows
 DECLARE @DynamicSqlTotalRows NVARCHAR(MAX) 
 DECLARE @DynamicSqlTotalRowsParams NVARCHAR(MAX) 
 SET @DynamicSqlTotalRows = ' SELECT @TotalRows = COUNT(DISTINCT o.cbc_icodigo_id) ' + @Sql
 SET @DynamicSqlTotalRowsParams = '@TotalRows INT OUTPUT'
	 	 
 EXECUTE sp_executesql @DynamicSqlTotalRows, @DynamicSqlTotalRowsParams, @totalrows OUTPUT   

 --Execute Sql (ReturnRows)
 DECLARE @DynamicSqlReturnRows NVARCHAR(MAX)   
 SET @DynamicSqlReturnRows = 'SELECT * 
							   FROM ( SELECT ROW_NUMBER() OVER (ORDER BY ' + @SqlSort + ') AS RowNumber, cbc_iCodigo_id Id, 
								cbc_cCAE as cbc_ccae,
								cbc_cEstado as cbc_cestado,
								cbc_cPrefijoCbte as cbc_cprefijocbte,
								cbc_cTipoCbte as cbc_ctipocbte,
								cbc_cVtoCAE as cbc_cvtocae,
								cbc_dFecha as cbc_dfecha,
								cbc_iCliente as cbc_icliente,
								cbc_iCodigo_ID as cbc_icodigo_id,
								cbc_iNumeroCbte as cbc_inumerocbte,
								cbc_yImpuesto1 as cbc_yimpuesto1,
								cbc_yImpuesto2 as cbc_yimpuesto2,
								cbc_yImpuesto3 as cbc_yimpuesto3,
								cbc_ySubTotal as cbc_ysubtotal,
								cbc_yTotal as cbc_ytotal,
								cbc_iVersion as cbc_iversion,
								--RIGHT(RTRIM (''0000''+ISNULL(NULLIF(convert(NVARCHAR(4),cbc_cPrefijoCbte),''''),0)),4)	+''-''+RIGHT (''00000000''+convert(NVARCHAR(8), cbc_iNumeroCbte), 8) as _numeroComprobante,
								RIGHT(RTRIM (''0000''+ISNULL(NULLIF(convert(NVARCHAR(4),cbc_cPrefijoCbte),''''),0)),4)	+''-''+RIGHT (''00000000''+convert(NVARCHAR(8), ISNULL(NULLIF(convert(NVARCHAR(50),cbc_iNumeroCbte),''''),0) ), 8) as _numeroComprobante,
								orgs.id as idOrganizacion, 
								orgs.Name as nombreOrganizacion
								,cli.cli_iorganizacion
								,[cli_ccategoriaimpositiva]
								,[cli_ccallefiscal]
								,[cli_clocalidadfiscal]
								,[cli_cprovinciafiscal]
								,[cli_ccodigopostalfiscal]
								,[cli_inumero]
								,[cli_ccondicionpago]
								,[cli_cidentificacion]
								,clici.[cat_cdescripcion] as cli_cat_cdescripcion
								,pcli.pro_cdescripcion as cli_pro_cdescripcion
								,clicp.[con_cdescripcion] as cli_con_cdescripcion
								,org_csymbol 
								,org_cnombre as orgfac_org_cnombre
								,org_ccallefiscal as orgfac_org_ccallefiscal
								,org_clocalidadfiscal as orgfac_org_clocalidadfiscal
								,org_cprovinciafiscal as orgfac_org_cprovinciafiscal
								,org_ccodigopostalfiscal as orgfac_org_ccodigopostalfiscal
								,org_ctelefono as orgfac_org_ctelefono
								,org_cmail as orgfac_org_cmail
								,org_ccategoriaimpositiva as orgfac_org_ccategoriaimpositiva
								,org_cidentificacion as orgfac_org_cidentificacion
								,org_cinicioactividades as orgfac_org_cinicioactividades
								,org_cempresacb as orgfac_org_cempresacb
								,org_cheadercbte as orgfac_org_cheadercbte
								,org_cmetadata as orgfac_org_cmetadata
								,org_csymbol as orgfac_org_csymbol
								,org_icodigo_id as orgfac_org_icodigo_id
								,[org_cnombre]
								,[org_ccallefiscal]
								,[org_clocalidadfiscal]
								,[org_cprovinciafiscal]
								,[org_ccodigopostalfiscal]
								,[org_ctelefono]
								,[org_cmail]
								,[org_ccategoriaimpositiva]
								,[org_cidentificacion]
								,[org_cinicioactividades]
								,[org_cempresacb]
								,[org_cheadercbte]
								,porg.pro_cdescripcion as org_pro_cdescripcion
								,orgci.[cat_cdescripcion] as org_cat_cdescripcion
								,cc.*
								,com.*
								,cfc.*
								,mon_csymbol
								, CONVERT(varchar(10), org_icodigo_id)
								+''-''+ CONVERT(varchar(10),RIGHT(RTRIM (''000''+ISNULL(NULLIF(convert(NVARCHAR(4),cbc_ctipocbte),''''),0)),3)) 
								+''-''+ CONVERT(varchar(10),RIGHT(RTRIM (''0000''+ISNULL(NULLIF(convert(NVARCHAR(4),cbc_cPrefijoCbte),''''),0)),4))	
								+''-''+ CONVERT(varchar(10),RIGHT (''00000000''+convert(NVARCHAR(8), ISNULL(NULLIF(convert(NVARCHAR(50),cbc_iNumeroCbte),''''),0) ), 8)	)
									AS _filename
								 ' + @Sql + ' ) AS T
							  WHERE RowNumber BETWEEN @from AND @to '

print @Sql
							  
 DECLARE @DynamicSqlReturnRowsParams NVARCHAR(MAX)          							  
 SET @DynamicSqlReturnRowsParams = '@from INT, @to INT'							  			  	 
			  	 
 DECLARE @from INT
 DECLARE @to INT
 SELECT @from = (@page - 1) * @limit + 1, @to = @page * @limit
  			  	 
 EXECUTE sp_executesql @DynamicSqlReturnRows, @DynamicSqlReturnRowsParams, @from = @from, @to = @to