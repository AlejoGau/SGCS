CREATE OR ALTER PROCEDURE [dbo].[ReporteEventosPorOperadorSearch]
	@alarmadesde VARCHAR(256) = '',
	@alarmahasta VARCHAR(256) = '',
	@dealerdesde VARCHAR(256) = '',
	@dealerhasta VARCHAR(256) = '',
	@cuentadesde VARCHAR(256) = '',
	@cuentahasta VARCHAR(256) = '',

	@table NVARCHAR(128) = 'p_recepcion',	

	@operadordesde VARCHAR(256) = '',
	@operadorhasta VARCHAR(256) = '',

	@token VARCHAR(128) = '',           

	@fechadesde NVARCHAR(256) = '',
	@fechahasta NVARCHAR(256) = ''


AS
BEGIN
  
--Sort
DECLARE @SqlSort AS VARCHAR(256)
SELECT @SqlSort = 'o.ope_cnombre,ta.cod_ccodigo,ta.cod_cdescripcion'


 if( @table ='') 
BEGIN
	set @table = 'p_recepcion'+ CONVERT(NVARCHAR(6), DATEADD (MONTH , -1 , getdate() )  , 112) +',p_recepcion'+ CONVERT(NVARCHAR(6), getdate(), 112) + ',eventospendientes'
END


-- TOMO LOS CAMPOS DE LOS COMBO DEL REPORTE Y ARMO EL WHERE
DECLARE @SqlWhere NVARCHAR(MAX);
SET @SqlWhere = '';

--RANGOS 
DECLARE @SqlFilterRango AS VARCHAR(max) = ''
EXEC getSqlRangesForToken @token = @token, @alias = 'c.', @SqlFilterRango = @SqlFilterRango OUTPUT
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

IF (@operadordesde != '')
	BEGIN
		SET @SqlWhere = @SqlWhere + ' AND o.ope_cnombre >= ''' + @operadordesde + ''' ';
	END

IF (@operadorhasta != '')
	BEGIN
		SET @SqlWhere = @SqlWhere + ' AND o.ope_cnombre <= ''' + @operadorhasta + ''' ';
	END

IF (@alarmadesde != '')
	BEGIN
		SET @SqlWhere = @SqlWhere + ' AND ta.cod_ccodigo >= ''' + @alarmadesde + ''' ';
	END

IF (@alarmahasta != '')
	BEGIN
		SET @SqlWhere = @SqlWhere + ' AND ta.cod_ccodigo <= ''' + @alarmahasta + ''' ';
	END

IF (@fechadesde != '')
	BEGIN
		SET @SqlWhere = @SqlWhere + ' AND r.rec_tfechahora  >= ''' + convert(varchar,convert(date,@fechadesde,120),121)+ '''';
	END


IF (@fechahasta != '')
	BEGIN
		-- SUMO 1 AL DIA QUE VIENE DESDE EL REPORTE PARA OBTENER LAS 24HS DEL DIA ANTERIOR.
		SET @SqlWhere = @SqlWhere + ' AND r.rec_tfechahora   <= ''' + convert(varchar,dateadd(minute,59,dateadd(hour,23,convert(datetime,@fechahasta,120))),121)+ '''';
	END




DECLARE @sql AS VARCHAR(MAX)

		SET @sql = '
					Select o.ope_cnombre,cue_clinea/*,cue_clinea as dealer,c.cue_ncuenta as cuenta*/,ta.cod_ccodigo,ta.cod_cdescripcion,count(*) as cantidad
					From _datos.dbo.'+@table+' r  With (NOLOCK) 
					Inner Join _Sistema.dbo.s_operadores o on rec_iOperador=ope_iid 
					Left Outer Join _datos.dbo.m_cuentas c on rec_iidcuenta=cue_iid 
					Left Outer Join _Tablas.dbo.t_codigos_alarma ta on rec_calarma=cod_ccodigo
					
					WHERE 1=1   ' + @SqlWhere + '
					group by ope_cnombre,cue_clinea,ta.cod_ccodigo,ta.cod_cdescripcion
					ORDER BY ' + @SqlSort 

		
END	


print 'Sqlwhere: '+ @SqlWhere
		EXECUTE (@Sql)