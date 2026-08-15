CREATE OR ALTER PROCEDURE [dbo].[SearchCantidadEventosPorReceptorPorPuerto]
 @page INT = 1,               
 @start INT = 0,               
 @limit INT = 1000,               
 @sort VARCHAR(256) = '',   
 @group VARCHAR(256) = '',            
 @filter VARCHAR(2048) = '',        
 @_dc VARCHAR(256) = '', 
 @completo VARCHAR(10) = '', 
 @token VARCHAR(128) = '',
 @receptorcombo varchar(10) = '',             
 @totalrows INT = 1 --OUTPUT  
AS
BEGIN
  

--RANGOS 
DECLARE @SqlFilterRango AS VARCHAR(max)
EXEC getSqlRangesForToken @table = 'p_recepcion', @token = @token, @alias = 'PR.', @SqlFilterRango = @SqlFilterRango OUTPUT

--FILTRO
DECLARE @SqlFilter AS VARCHAR(4096)
IF (@receptorcombo != '')
	SET @SqlFilter = ' AND PR.rec_idReceptor = ''' + @receptorcombo + ''''
ELSE
	SET @SqlFilter = ''

print @SqlFilter

DECLARE @sql AS VARCHAR(MAX)
/*
SET @sql = ';With Query As (
                Select Top 100000 Receptor = Rtrim(Max(MR.rec_cdescripcion)), PR.rec_iPuerto, PR.rec_iidcuenta, Cantidad_Eventos_xCta =  Count(*), Cuentas = 1
                FROM [_Datos].[dbo].[p_recepcion] PR 
                    Left Outer Join [_Datos].[dbo].[m_receptores_cab] MR On MR.rec_iid = PR.rec_idReceptor
                    Where PR.rec_nOrigen=2
                    AND rec_tfechahora >= DATEADD(hour,-24,getdate())
                    --AND PR.rec_tfechahora <= CONVERT(Char(8), GetDate(),112)
                    ' + @SqlFilter + '
                Group By rec_iPuerto, rec_iidcuenta
                Order By rec_iPuerto, rec_iidcuenta
            ) 
            Select Receptor, rec_iPuerto as Puerto, Cantidad_Eventos = Sum(Cantidad_Eventos_xCta), Cantidad_Cuentas = Sum(Cuentas), Promedio_Eventos = (Sum(Cantidad_Eventos_xCta)/Sum(Cuentas))
                FROM Query
                    Left Outer Join [_Datos].[dbo].[m_receptores_cab] MR On MR.rec_cdescripcion = Receptor
                WHERE 1=1' + @SqlFilterRango + '
            Group By Receptor, rec_iPuerto
            Order By 2 Desc'
*/
--2025-05-19 Pablo : Con el Top tardar 39s y sin el Top 15, lo dejamos asi para que no de TimeOut 
SET @sql = ';With Query As (
                Select Receptor = Rtrim(Max(MR.rec_cdescripcion)), PR.rec_iPuerto, PR.rec_iidcuenta, Cantidad_Eventos_xCta =  Count(*), Cuentas = 1
                FROM [_Datos].[dbo].[p_recepcion] PR 
                    Left Outer Join [_Datos].[dbo].[m_receptores_cab] MR On MR.rec_iid = PR.rec_idReceptor
                    Where PR.rec_nOrigen=2
                    AND rec_tfechahora >= DATEADD(hour,-24,getdate())
                    --AND PR.rec_tfechahora <= CONVERT(Char(8), GetDate(),112)
                    ' + @SqlFilter + '
                Group By rec_iPuerto, rec_iidcuenta
                Order By rec_iPuerto, rec_iidcuenta
            ) 
            Select Receptor, rec_iPuerto as Puerto, Cantidad_Eventos = Sum(Cantidad_Eventos_xCta), Cantidad_Cuentas = Sum(Cuentas), Promedio_Eventos = (Sum(Cantidad_Eventos_xCta)/Sum(Cuentas))
                FROM Query
                    Left Outer Join [_Datos].[dbo].[m_receptores_cab] MR On MR.rec_cdescripcion = Receptor
                WHERE 1=1' + @SqlFilterRango + '
            Group By Receptor, rec_iPuerto
            Order By 2 Desc'

/*
EXECUTE (@Sql)
print @Sql
*/

END