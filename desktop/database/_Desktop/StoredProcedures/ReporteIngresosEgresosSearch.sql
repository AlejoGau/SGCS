CREATE OR ALTER PROCEDURE [dbo].[ReporteIngresosEgresosSearch]
    @idpuerta VARCHAR(256) = '',
    @personaautorizada VARCHAR(256) = '',
    @autorizadopor VARCHAR(256) = '',
    @token VARCHAR(128) = '',           
    @IngSinEg varchar(1)='N',
    @fechadesde NVARCHAR(256) = '',
    @fechahasta NVARCHAR(256) = ''
AS
BEGIN
    --Sort
    DECLARE @SqlSort AS VARCHAR(256)
    SELECT @SqlSort = 'o.[cac_idkey] DESC'
    --Filters
    DECLARE @SqlFilter AS VARCHAR(4096)
    SET @SqlFilter=''
    if @IngSinEg='S'
        SET @SqlFilter= @SqlFilter+' AND o.cac_idkey=lst.cac_idkey AND lst.[cac_tipoacceso] = 1  '
    if (@fechadesde!='')
    begin
        SET @SqlFilter = @SqlFilter+' AND o.[cac_fecha]>= '''+@fechadesde+''' '
    end
    if (@fechahasta!='')
    begin
        SET @SqlFilter = @SqlFilter+' AND o.[cac_fecha]<= '''+@fechahasta+''' '
    end
    if (@personaautorizada!='')
    begin
        --SET @SqlFilter = @SqlFilter+' AND o.cac_idautorizado = '+@personaautorizada
	   SET @SqlFilter = @SqlFilter + ' AND ([usu_cnombre] LIKE ''%' + @personaautorizada + '%'' OR [apr_cNombre] LIKE ''%' + @personaautorizada + '%'')'
    end
    if (@autorizadopor!='')
    begin
        SET @SqlFilter = @SqlFilter+' AND o.cac_autorizaid = '+@autorizadopor
    end
    if (@idpuerta!='')
    begin
        SET @SqlFilter = @SqlFilter+' AND o.[cac_idpuerta] = '+@idpuerta
    end

	--RANGOS 
	DECLARE @SqlFilterRango AS VARCHAR(max)
	EXEC getSqlRangesForToken @token = @token, @alias = 'c.', @SqlFilterRango = @SqlFilterRango OUTPUT
	SET @SqlFilter = @SqlFilter + @SqlFilterRango
	--print ' -- Rangos -- '
	--print @SqlFilterRango

    --Sql
    DECLARE @Sql NVARCHAR(MAX)
    SET @Sql = 'SELECT o.cac_idkey Id, o.*, pu.*, u.*,udw.*,c.*,prov.*, cueprov.cue_cnombre as unidad_funcional_prov FROM _datos.dbo.p_controlAcceso_IO o
    LEFT JOIN _datos..m_usuarios u ON usu_idKey = o.cac_idautorizado
    LEFT JOIN _datos..m_cuentas c ON usu_iidcuenta = cue_iid
    LEFT JOIN _tablas..t_controlAcceso_puerta pu ON o.cac_idpuerta = cap_iid
    LEFT JOIN _datos..m_AccesosProveedores prov ON o.cac_idautorizado=prov.apr_idKey and o.cac_autorizadotipoid=3227
    LEFT JOIN _datos..p_controlAcceso_Autorizacion aut ON o.cac_autorizacodigo = aut.caa_codigo and o.cac_autorizacodigo!=''''
    LEFT JOIN _datos..m_cuentas  cueprov /*para obtener la UF de autorizaciones de proveedores*/
                    ON  cueprov.cue_iid = aut.caa_usuautoriza and aut.caa_usuautoriza is not null
    LEFT JOIN _Sistema..UsersDesktopWeb udw ON o.cac_autorizaid=udw.udw_idKey
    OUTER APPLY  (select top 1 * from _datos.dbo.p_controlAcceso_IO 
        where cac_idautorizado=o.cac_idautorizado   ORDER by cac_fecha desc  ) lst 
                WHERE 1 = 1 ' + @SqlFilter+' ORDER BY '+@SqlSort
 
 
    print '----'
    Print @Sql

	Execute ( @Sql)
END