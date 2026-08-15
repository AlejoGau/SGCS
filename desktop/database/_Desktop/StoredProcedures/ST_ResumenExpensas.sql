CREATE OR ALTER PROCEDURE [dbo].[ST_ResumenExpensas]
	@page INT = 1,               
	@start INT = 0,               
	@limit INT = 50,               
	@sort NVARCHAR(256) = '',   
	@group NVARCHAR(256) = '',            
	@filter VARCHAR(2048) = '',
	@_dc NVARCHAR(256) = '',              
	@totalrows INT = 1 OUTPUT, 
	@token VARCHAR(128) = '',
	@nro_cuenta varchar(10) = ''
AS
BEGIN
IF EXISTS(SELECT left(name,18) FROM tempdb.sys.objects WHERE left(name,18) like '#st_resumen_report')
		DROP table #st_resumen_report


create table #st_resumen_report 
( 
fecha_vto datetime,
nro_lote varchar(10),
code varchar(10),
secuencia_id int,
description_resumen varchar(150),
columna1 decimal(10,2),
columna2 decimal(10,2),
columna3 decimal(10,2),
columna4 decimal(10,2),
columna5 decimal(10,2),
flag_reporta int --(0 = no   -  1= Yes)
)

DECLARE @report varchar(10) 
set @report = (select case when @nro_cuenta = '0990' then 'REP004'  WHEN @nro_cuenta > 350 then 'REP002' ELSE 'REP004' end) 

IF EXISTS(SELECT name FROM tempdb.sys.objects WHERE left(name,5) = '#temp')
		DROP table #temp
SELECT  
	ROW_NUMBER() OVER(ORDER BY  secuencia_id  ASC) AS Row_id,* into #temp
	FROM [ST_TANGO].[dbo].[st_resumen_report] where reporte_id   =  @report

 declare 
	@campo1 nvarchar(50),@campo2 nvarchar(50),@campo3 nvarchar(50),@campo4 nvarchar(50), 
	@sql1 nvarchar(1000), @sql2 nvarchar(1000), @sql3 nvarchar(1000), @sql4 nvarchar(1000), 
	@resultado1 decimal(10,2), @resultado2 decimal(10,2), @resultado3 decimal(10,2), @resultado4 decimal(10,2),
	@ParmDefinition NVARCHAR(500) ,  
	@N nvarchar(16) , @rows   int   , @NN int,
	@nrolote nvarchar(16)

set @NN = 1
set @N = @NN

set @campo1 = (select columna1  from #temp where Row_id = @NN)
set @campo2 = (select columna2  from #temp where Row_id = @NN)
set @campo3 = (select columna3  from #temp where Row_id = @NN)
set @campo4 = (select columna4  from #temp where Row_id = @NN)
set @rows = ( select count(Row_id)   from #temp)
 
set @nrolote =      @nro_cuenta  -- '0437'  -- 
 

delete #st_resumen_report


WHILE  @NN <= @rows 
BEGIN
		set @N = @NN
		set @sql1 =   'select @Campo1OUT=isnull('+@campo1+',0)  from [ST_TANGO].[dbo].[st_resumen_expensas_data] cross join #temp where Row_id = ' +  @N + '   and  nro_lote =  ' + '''' + @nrolote + '''' 
		SET @ParmDefinition =   N'  @Campo1OUT decimal(10,2) OUTPUT'  
		EXEC  sp_executesql  @sql1   , @ParmDefinition, @Campo1OUT=@resultado1 OUTPUT
 
		set @sql2 =   'select @Campo1OUT=isnull('+@campo2+',0) from [ST_TANGO].[dbo].[st_resumen_expensas_data] cross join #temp where Row_id = ' +  @N + '   and  nro_lote =  ' + '''' + @nrolote + '''' 
		SET @ParmDefinition = N' @Campo1OUT decimal(10,2) OUTPUT'  
		EXEC  sp_executesql  @sql2   , @ParmDefinition, @Campo1OUT=@resultado2 OUTPUT
 
		set @sql3 =   'select @Campo1OUT=isnull('+@campo3+',0) from [ST_TANGO].[dbo].[st_resumen_expensas_data] cross join #temp where Row_id = ' +  @N + '   and  nro_lote =  ' + '''' + @nrolote + '''' 
		SET @ParmDefinition = N' @Campo1OUT decimal(10,2) OUTPUT';  
		EXEC  sp_executesql  @sql3   , @ParmDefinition, @Campo1OUT=@resultado3 OUTPUT
  
 
		set @sql4 =   'select @Campo1OUT=isnull('+@campo4+',0) from [ST_TANGO].[dbo].[st_resumen_expensas_data] cross join #temp where Row_id = ' +  @N + '   and  nro_lote =  ' + '''' + @nrolote + '''' 
		SET @ParmDefinition = N' @Campo1OUT decimal(10,2) OUTPUT';  
		EXEC  sp_executesql  @sql4   , @ParmDefinition, @Campo1OUT=@resultado4 OUTPUT
 
  
			insert into  #st_resumen_report
			( fecha_vto, Nro_lote,code, secuencia_id,description_resumen,columna1,columna2,columna3,columna4,flag_reporta )
			select fecha_vto,Nro_lote, codigo, secuencia_id, description_resumen, 
			CASE WHEN @resultado1 = 0 THEN null ELSE @resultado1   END, 
			CASE WHEN @resultado2 = 0 THEN null ELSE @resultado2   END, 
			CASE WHEN @resultado3 = 0 THEN null ELSE @resultado3   END, 
			CASE WHEN @resultado4 = 0 THEN null ELSE @resultado4   END, 
			flag_reporta   
			from [ST_TANGO].[dbo].[st_resumen_expensas_data] cross join #temp where nro_lote = @nrolote  and Row_id = @N
 

	set @NN =@NN + 1
	set @campo1 = (select columna1  from #temp where Row_id = @NN)
	set @campo2 = (select columna2  from #temp where Row_id = @NN)
	set @campo3 = (select columna3  from #temp where Row_id = @NN)
	set @campo4 = (select columna4  from #temp where Row_id = @NN)
	set @resultado1=0 
	set @resultado2=0
	set @resultado3=0
	set @resultado4=0

 END
  
select fecha_vto, description_resumen as concepto, isnull(FORMAT(columna4, '$#,###,###,##0'),0) as Monto  
from #st_resumen_report 
WHERE columna4 IS NOT NULL
order by secuencia_id



 END