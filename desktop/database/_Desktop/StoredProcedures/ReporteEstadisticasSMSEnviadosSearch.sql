CREATE OR ALTER PROCEDURE [dbo].[ReporteEstadisticasSMSEnviadosSearch]

	@dealerdesde VARCHAR(256) = '',
	@dealerhasta VARCHAR(256) = '',
	@cuentadesde VARCHAR(256) = '',
	@cuentahasta VARCHAR(256) = '',
	@nombre VARCHAR(256) = '',
	@token VARCHAR(128) = '',           

	@fechadesde NVARCHAR(256) = '',
	@fechahasta NVARCHAR(256) = ''


AS
BEGIN
  
--Sort
DECLARE @SqlSort AS VARCHAR(256)
SELECT @SqlSort = 'cue_cnombre'

DECLARE @SqlFilter as VARCHAR(256)
SET @SqlFilter= '';
 



-- TOMO LOS CAMPOS DE LOS COMBO DEL REPORTE Y ARMO EL WHERE
DECLARE @SqlWhere NVARCHAR(MAX);
SET @SqlWhere = '';

--RANGOS 
DECLARE @SqlFilterRango AS VARCHAR(max) = ''
EXEC getSqlRangesForToken @token = @token, @alias = '', @SqlFilterRango = @SqlFilterRango OUTPUT
SET @SqlWhere = @SqlWhere + @SqlFilterRango

print ' -- Rangos -- '
print @SqlFilterRango

--RANGOS 
--DECLARE @SqlFilterRango AS VARCHAR(max) = ''
--EXEC getSqlRangesForToken @token = @token, @alias = 'c.', @SqlFilterRango = @SqlFilterRango OUTPUT
--SET @SqlWhere = @SqlWhere + @SqlFilterRango





IF (@dealerdesde != '')
	BEGIN
		SET @SqlWhere = @SqlWhere + ' AND c.cue_clinea >= ''' + @dealerdesde + ''' ';
	END

IF (@dealerhasta != '')
	BEGIN
		SET @SqlWhere = @SqlWhere + ' AND c.cue_clinea <= ''' + @dealerhasta + ''' ';
	END

IF (@cuentadesde != '')
	BEGIN
		SET @SqlWhere = @SqlWhere + ' AND c.cue_ncuenta >= ''' + @cuentadesde + ''' ';
	END

IF (@cuentahasta != '')
	BEGIN
		SET @SqlWhere = @SqlWhere + ' AND c.cue_ncuenta <= ''' + @cuentahasta + ''' ';
	END

IF (@nombre != '')
	BEGIN
		print '@nombre: '+@nombre
		SELECT @SqlFilter = dbo.GetSqlFilterForJson(@nombre, 'm_cuentas');
		SET @SqlWhere = @SqlWhere + @SqlFilter;
	END



IF (@fechadesde != '')
	BEGIN
		SET @SqlWhere = @SqlWhere + ' AND ps.que_tfechahora  >= ''' + convert(varchar,convert(date,@fechadesde,120),121)+ '''';
	END



IF (@fechahasta != '')
	BEGIN
		-- SUMO 1 AL DIA QUE VIENE DESDE EL REPORTE PARA OBTENER LAS 24HS DEL DIA ANTERIOR.
		SET @SqlWhere = @SqlWhere + ' AND ps.que_tfechahora  <= ''' + convert(varchar,dateadd(minute,59,dateadd(hour,23,convert(datetime,@fechahasta,120))),121)+ '''';
	END


print 'SqlWhere resultante: '+@SqlWhere

DECLARE @sql AS VARCHAR(MAX)

		SET @sql = '
					Select cue_iid,cue_clinea,cue_ncuenta,cue_cnombre,count(*) as TotalSMS
					From _Datos.dbo.p_SMSqueue ps With (NOLOCK) 
					Inner Join _Datos.dbo.m_cuentas c on ps.que_idCuenta=cue_iid 
					 
					
					WHERE 1=1 and ps.que_nEstado=1 ' + @SqlWhere + '
					group by cue_iid,cue_clinea,cue_ncuenta,cue_cnombre
					ORDER BY ' + @SqlSort 

		
END	


print 'Sqlwhere: '+ @SqlWhere
		EXECUTE (@Sql)