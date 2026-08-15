--#############################################################################
-- SOFTGUARD DESKTOP
-- updated : 2023-05-11 08:51:38.547
--#############################################################################

CREATE OR ALTER PROCEDURE [dbo].[SearchOrganizationOuterApplyTaxonomy]
 @page INT = 1,
 @start INT = 0,
 @limit INT = 50,
 @sort NVARCHAR(256) = '',
 @group NVARCHAR(256) = '',
 @filter NVARCHAR(2048) = '',
 @_dc NVARCHAR(256) = '',
 @token varchar(255) = '',
 @taxonomytype varchar = '', -- reservado para futuro filtro de taxonomy type
 @totalrows INT = 1 OUTPUT
AS
 SET NOCOUNT ON

 --print '[SearchOrganization] Sort'
 DECLARE @SqlSort AS NVARCHAR(256)
 /*select @sort = REPLACE(@sort,'DateCreated','o.DateCreated')
 select @sort = REPLACE(@sort,'Name','o.Name')*/
 SELECT @SqlSort = dbo.GetSqlSortForJson(@sort, 'o.Id DESC')

 --print '[SearchOrganization] Filters'
 DECLARE @SqlFilter AS NVARCHAR(MAX)
 SELECT @SqlFilter = dbo.GetSqlFilterForJsonWithIgnore(@filter, 'Organization','[cue_clinea],[cue_ncuenta]')

 --print '[SearchOrganization] Obtengo los filtros linea y cuenta'
IF @filter != ''
BEGIN
	declare @filtrocustom varchar(max)=''
	DECLARE @cue_clinea VARCHAR(10) = ''
    DECLARE @cue_ncuenta VARCHAR(10) = ''

    SELECT * INTO #FilterTable FROM dbo.parseJSON(@filter)

	--print '[SearchOrganization] Obtengo el dealer'
    SELECT TOP 1 @cue_clinea = StringValue FROM #FilterTable WHERE NAME = 'value' AND parent_ID = (select parent_ID FROM #FilterTable WHERE NAME='property' AND StringValue = 'cue_clinea')

	--print '[SearchOrganization] Filtro por dealer'
    IF @cue_clinea != '' and @cue_clinea is not null
    BEGIN
        SET @filtrocustom = @filtrocustom + ' AND [Dealer] = '''+@cue_clinea+''''
    END

	--print '[SearchOrganization] objtengo ncuenta'
	SELECT TOP 1 @cue_ncuenta = StringValue FROM #FilterTable WHERE NAME = 'value' AND parent_ID = (select parent_ID FROM #FilterTable WHERE NAME='property' AND StringValue = 'cue_ncuenta')

	--print '[SearchOrganization] Filtro por la fecha'
    IF @cue_ncuenta !='' and @cue_ncuenta is not null
    BEGIN
        SET @filtrocustom = @filtrocustom + ' AND '''+@cue_ncuenta+''' BETWEEN [CuentaDesde] AND [CuentaHasta] '
    END

	--print '[SearchOrganization] si tengo que agregar el filtro'
	if @filtrocustom != ''
	BEGIN
		--print '[SearchOrganization] hay @filtrocustom '+@filtrocustom
		select @SqlFilter = @SqlFilter + 'AND o.id IN (select org.id from [_Datos].dbo.[Organization] org inner join _Sistema..DealerRango r on org.id = r.[IdEntidad] where 1=1 '+@filtrocustom+')'
	END

END

--print '[SearchOrganization] agrego el filtro por organizacion padre'
DECLARE @SqlFilterOrganization AS NVARCHAR(max) = ''
EXEC _desktop..[getSqlOrganizationParentForToken] @token = @token, @SqlFilterOrganization = @SqlFilterOrganization OUTPUT


 --print '[SearchOrganization] Sql'

 DECLARE @Sql NVARCHAR(MAX)
 SET @Sql = ' FROM [_Datos].dbo.[Organization] o
	left JOIN _Datos..m_clientes_fc cli WITH (NOLOCK) ON cli_iCodigo_ID = o.Account
	left JOIN _Tablas..t_Organizacion_fc orgf WITH (NOLOCK) ON org_icodigo_ID = cli_iOrganizacion
	LEFT JOIN _Tablas..t_condiciones_pago_fc cp WITH (NOLOCK)
		ON cp.con_ccodigo = cli.cli_ccondicionpago
		AND cp.con_orgidcodigoid = cli.cli_iOrganizacion
	LEFT JOIN _Tablas..t_monedas mon WITH (NOLOCK) ON mon_ccodigo = org_csymbol
	left join _tablas..t_provincias pstate WITH (NOLOCK) on (o.state = pstate.pro_idkey)
	left join _tablas..t_provincias pcountry WITH (NOLOCK) on (o.country = pcountry.pro_idkey)
	outer apply
	(select 	top 1								ot.TaxonomyId ,
								tv.id,
								tv.Name ,
								tv.editable,
								tv.metadata,
								tv.type   from _Datos..ObjectTaxonomy ot WITH (NOLOCK)
	left join _Datos..TaxonomyValue tv WITH (NOLOCK) on ot.TaxonomyId = tv.Id

	/****esto se agrega porque el "como nos conoció funcionaba mal"****/
	LEFT JOIN _Datos..TaxonomyTree tt ON tt.ChildId = tv.Id
	LEFT JOIN _Datos..TaxonomyValue tvp ON tt.ParentId = tvp.Id
	where o.Id = ot.ObjectId AND ot.ObjectTypeId = 600
	and /*esto se agrega porque el "como nos conoció funcionaba mal"*/ (tv.Id is null or tvp.Name = ''_comoNosConocio'') /**/
	 order by tv.id desc) tax
	/*************************************************************/

	WHERE 1 = 1   ' + @SqlFilter + @SqlFilterOrganization

--print @Sql

 --Total Rows
 DECLARE @DynamicSqlTotalRows NVARCHAR(MAX)
 DECLARE @DynamicSqlTotalRowsParams NVARCHAR(MAX)
 SET @DynamicSqlTotalRows = ' SELECT @TotalRows = COUNT(*) ' + @Sql
 SET @DynamicSqlTotalRowsParams = '@TotalRows INT OUTPUT'

 EXECUTE sp_executesql @DynamicSqlTotalRows, @DynamicSqlTotalRowsParams, @totalrows OUTPUT

 --Execute Sql (ReturnRows)
 DECLARE @DynamicSqlReturnRows NVARCHAR(MAX)
 SET @DynamicSqlReturnRows = 'SELECT *
						   FROM ( SELECT ROW_NUMBER() OVER (ORDER BY ' + @SqlSort + ') AS RowNumber, o.*,
								pstate.pro_cdescripcion StateName,
								pcountry.pro_cdescripcion CountryName,
								cli.* ,
								tax.TaxonomyId as cnc_id,
								tax.Name as cnc_name,
								tax.editable as cnc_editable,
								tax.metadata as cnc_metadata,
								tax.type as cnc_type,
								orgf.*,
								mon.*,
								cp.con_cdescripcion,
								cp.con_ncuotas,
								cp.con_idias,
								cp.con_ifrecuencia,
								cp.con_cFormaPagoCobrAut,
								cp.con_orgidcodigoid
' + @Sql + ' ) AS T
						  WHERE RowNumber BETWEEN @from AND @to '

 DECLARE @DynamicSqlReturnRowsParams NVARCHAR(MAX)
 SET @DynamicSqlReturnRowsParams = '@from INT, @to INT'

 DECLARE @from INT
 DECLARE @to INT
 SELECT @from = (@page - 1) * @limit + 1, @to = @page * @limit

 EXECUTE sp_executesql @DynamicSqlReturnRows, @DynamicSqlReturnRowsParams, @from = @from, @to = @to
