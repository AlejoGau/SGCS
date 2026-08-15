CREATE OR ALTER PROCEDURE [dbo].[ReporteACAutorizacionesSearch]

	
	@personaautorizada VARCHAR(256) = '',

	@fechadesde NVARCHAR(256) = '',
	@fechahasta NVARCHAR(256) = '',
	@activas NVARCHAR(256)='',
	@usu_iidcuenta NVARCHAR(256)=''
	


AS
BEGIN

DECLARE @SqlSort AS VARCHAR(256)
 SELECT @SqlSort =  'o.[caa_idkey] DESC'
 
 --Filters
 DECLARE @SqlFilter AS VARCHAR(4096)
 SET @SqlFilter=''


 if(@usu_iidcuenta!='')
	begin
		SET @SqlFilter = @SqlFilter+' AND usu_iidcuenta='+@usu_iidcuenta
	end

 if(@fechadesde!='')
	begin
		SET @SqlFilter = @SqlFilter + ' AND caa_fechadesde>= '''+@fechadesde+''' '
	end

if(@fechahasta!='')  
	begin
		SET @SqlFilter = @SqlFilter + ' AND caa_fechahasta>= '''+@fechadesde+''' '
	end

if(@activas!='')  
	begin
		SET @SqlFilter = @SqlFilter + ' AND caa_fechahasta>= '''+@fechadesde+''' '
	end

if(@personaautorizada!='')
	begin
		SET @SqlFilter = @SqlFilter + ' AND caa_idautorizado=' +@personaautorizada
	end

 --Sql
 DECLARE @Sql NVARCHAR(MAX)
 SET @Sql = 'SELECT 
	 caa_idkey Id, o.*, c.*, u.*, cac.*,
			CASE
				WHEN GETDATE() > caa_fechahasta+convert(datetime,caa_horahasta) THEN ''estado0''
				WHEN GETDATE() < caa_fechadesde+convert(datetime,caa_horadesde) THEN ''estado0''
				ELSE ''''
			END as estadoStyle
 
	FROM _datos.dbo.p_controlAcceso_Autorizacion o
		left join _datos..m_usuarios u ON caa_idautorizado = usu_idKey
		left join _datos..m_cuentas c ON cue_iid = usu_iidcuenta 
		left join _datos..p_controlAcceso_IO cio on o.caa_idkey = cio.cac_autorizaid 
		
		outer apply 
			(
				select top 1 * from _datos..p_controlacceso_io 
					where cac_idautorizado = caa_idautorizado
					order by 1 desc
			) as cac
			WHERE 1 = 1 AND caa_estado < 2 AND cio.cac_autorizaid IS  NULL ' + @SqlFilter -- se agregó caa_estado <> 2 para no tomar invitaciones pendientes
	if @activas='S'
		SET @sql = @sql + ' AND GETDATE() < caa_fechahasta+convert(datetime,caa_horahasta)'
	if @activas='N'
		SET @sql = @sql + ' AND GETDATE() > caa_fechahasta+convert(datetime,caa_horahasta)'

 print @Sql
 --Total Rows
	 



  			  	 
 EXECUTE (@Sql)


  
END