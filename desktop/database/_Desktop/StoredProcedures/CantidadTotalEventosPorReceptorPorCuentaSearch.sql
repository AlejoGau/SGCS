CREATE OR ALTER PROCEDURE [dbo].[CantidadTotalEventosPorReceptorPorCuentaSearch]
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
EXEC getSqlRangesForToken @table = 'eventospendientes', @token = @token, @alias = 'o.', @SqlFilterRango = @SqlFilterRango OUTPUT

--FILTRO
DECLARE @SqlFilter AS VARCHAR(4096)
IF (@receptorcombo != '')
	SET @SqlFilter = ' AND PR.rec_idReceptor = ''' + @receptorcombo + ''''
ELSE
	SET @SqlFilter = ''

print @SqlFilter

DECLARE @sql AS VARCHAR(MAX)
SET @sql = '
				Select Titulo = ''Total'', Count(*) as CantidadEventosTotales
                FROM [_Datos].[dbo].[p_recepcion] PR 
                    Left Outer Join [_Datos].[dbo].[m_receptores_cab] MR On MR.rec_iid=PR.rec_idReceptor
                WHERE PR.rec_nOrigen=2 
                    AND rec_tfechahora >= DATEADD(hour,-24,getdate())
					--And PR.rec_tfechahora < CONVERT(Char(8), GetDate(),112)' + @SqlFilter + @SqlFilterRango

EXECUTE (@Sql)
print @Sql

END


/* QUERY ORIGINAL ENVIADA POR PABLO
Use _Datos

;With Query As (
Select Top 100000 Receptor = Rtrim(Max(MR.rec_cdescripcion)),PR.rec_iidcuenta, Cantidad_Eventos_xCta =  Count(*), Cuentas = 1
FROM [_Datos].[dbo].[p_recepcion] PR 
Left Outer Join [_Datos].[dbo].[m_receptores_cab] MR On MR.rec_iid=PR.rec_idReceptor
Where PR.rec_nOrigen=2
And PR.rec_tfechahora>=CONVERT(Char(8), GetDate()-1,112) 
And PR.rec_tfechahora<CONVERT(Char(8), GetDate(),112) 
Group By rec_idReceptor,rec_iidcuenta
Order By rec_idReceptor,rec_iidcuenta
) 
Select Receptor , Cantidad_Eventos =  Sum(Cantidad_Eventos_xCta), Cantidad_Cuentas = Sum(Cuentas), Primedio_Eventos = (Sum(Cantidad_Eventos_xCta)/Sum(Cuentas))
	From Query
Group By Receptor
Order By 2 Desc,3 Desc,1
*/