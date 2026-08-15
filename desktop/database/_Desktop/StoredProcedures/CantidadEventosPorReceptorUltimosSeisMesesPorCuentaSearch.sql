CREATE OR ALTER PROCEDURE [dbo].[CantidadEventosPorReceptorUltimosSeisMesesPorCuentaSearch]
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

DECLARE @lastMonth1 VARCHAR(6) = LEFT(CONVERT(VARCHAR(6), DATEADD(MONTH, -1, GETDATE()), 112), 6);
DECLARE @lastMonth2 VARCHAR(6) = LEFT(CONVERT(VARCHAR(6), DATEADD(MONTH, -2, GETDATE()), 112), 6);
DECLARE @lastMonth3 VARCHAR(6) = LEFT(CONVERT(VARCHAR(6), DATEADD(MONTH, -3, GETDATE()), 112), 6);
DECLARE @lastMonth4 VARCHAR(6) = LEFT(CONVERT(VARCHAR(6), DATEADD(MONTH, -4, GETDATE()), 112), 6);
DECLARE @lastMonth5 VARCHAR(6) = LEFT(CONVERT(VARCHAR(6), DATEADD(MONTH, -5, GETDATE()), 112), 6);
DECLARE @lastMonth6 VARCHAR(6) = LEFT(CONVERT(VARCHAR(6), DATEADD(MONTH, -6, GETDATE()), 112), 6);

DECLARE @sql VARCHAR(MAX) = '';
SET @sql = 'SELECT * FROM (

    SELECT 
        DATENAME(MONTH, DATEADD(MONTH, 0, GETDATE())) as Mes
        , convert(VARCHAR(50),Count(pr.rec_iid),1) as Cantidad
        --, DATEADD(MONTH, DATEDIFF(MONTH, 0, getdate()), -31) as fechaInicio
        --, DATEADD(MONTH, DATEDIFF(MONTH, 0, getdate()), -1) as fechaFin
    FROM [_Datos].[dbo].[p_recepcion] PR 
        Left Outer Join [_Datos].[dbo].[m_receptores_cab] MR On MR.rec_iid = PR.rec_idReceptor
    WHERE PR.rec_nOrigen = 2 AND
    rec_tfechahora >= DATEADD(MONTH, DATEDIFF(MONTH, -1, getdate()), -31)

    UNION ALL

    SELECT 
        DATENAME(MONTH, DATEADD(MONTH, -1, GETDATE())) as Mes
        , convert(VARCHAR(50),Count(pr.rec_iid),1) as Cantidad
        --, DATEADD(MONTH, DATEDIFF(MONTH, 0, getdate()), -31) as fechaInicio
        --, DATEADD(MONTH, DATEDIFF(MONTH, 0, getdate()), -1) as fechaFin
    FROM [_Datos].[dbo].[p_recepcion'+@lastMonth1+'] PR 
        Left Outer Join [_Datos].[dbo].[m_receptores_cab] MR On MR.rec_iid = PR.rec_idReceptor
    WHERE PR.rec_nOrigen = 2 AND rec_tfechahora >= DATEADD(MONTH,-2,getdate()) AND rec_tfechahora <= DATEADD(MONTH,-1,getdate())
    
    UNION ALL

    SELECT 
        DATENAME(MONTH, DATEADD(MONTH, -2, GETDATE())) as Mes
        , convert(VARCHAR(50),Count(pr.rec_iid),1) as Cantidad
        --, DATEADD(MONTH, DATEDIFF(MONTH, 0, DATEADD(MONTH, -1, GETDATE())), -31) as fechaInicio
        --, DATEADD(MONTH, DATEDIFF(MONTH, 0, DATEADD(MONTH, -1, GETDATE())), -1) as fechaFin
    FROM [_Datos].[dbo].[p_recepcion'+@lastMonth2+'] PR 
        Left Outer Join [_Datos].[dbo].[m_receptores_cab] MR On MR.rec_iid = PR.rec_idReceptor
    WHERE PR.rec_nOrigen = 2 AND rec_tfechahora >= DATEADD(MONTH,-3,getdate()) AND rec_tfechahora <= DATEADD(MONTH,-2,getdate())

    UNION ALL

    SELECT 
        DATENAME(MONTH, DATEADD(MONTH, -3, GETDATE())) as Mes
        , convert(VARCHAR(50),Count(pr.rec_iid),1) as Cantidad
        --, DATEADD(MONTH, DATEDIFF(MONTH, 0, DATEADD(MONTH, -2, GETDATE())), -31) as fechaInicio
        --, DATEADD(MONTH, DATEDIFF(MONTH, 0, DATEADD(MONTH, -2, GETDATE())), -1) as fechaFin
    FROM [_Datos].[dbo].[p_recepcion'+@lastMonth3+'] PR 
        Left Outer Join [_Datos].[dbo].[m_receptores_cab] MR On MR.rec_iid = PR.rec_idReceptor
    WHERE PR.rec_nOrigen = 2 AND rec_tfechahora >= DATEADD(MONTH,-4,getdate()) AND rec_tfechahora <= DATEADD(MONTH,-3,getdate())

    UNION ALL

    SELECT 
        DATENAME(MONTH, DATEADD(MONTH, -4, GETDATE())) as Mes
        , convert(VARCHAR(50),Count(pr.rec_iid),1) as Cantidad
        --, DATEADD(MONTH, DATEDIFF(MONTH, 0, DATEADD(MONTH, -3, GETDATE())), -31) as fechaInicio
        --, DATEADD(MONTH, DATEDIFF(MONTH, 0, DATEADD(MONTH, -3, GETDATE())), -1) as fechaFin
    FROM [_Datos].[dbo].[p_recepcion'+@lastMonth4+'] PR 
        Left Outer Join [_Datos].[dbo].[m_receptores_cab] MR On MR.rec_iid = PR.rec_idReceptor
    WHERE PR.rec_nOrigen = 2 AND rec_tfechahora >= DATEADD(MONTH,-5,getdate()) AND rec_tfechahora <= DATEADD(MONTH,-4,getdate())

    UNION ALL

    SELECT 
        DATENAME(MONTH, DATEADD(MONTH, -5, GETDATE())) as Mes
        , convert(VARCHAR(50),Count(pr.rec_iid),1) as Cantidad
        --, DATEADD(MONTH, DATEDIFF(MONTH, 0, DATEADD(MONTH, -4, GETDATE())), -31) as fechaInicio
        --, DATEADD(MONTH, DATEDIFF(MONTH, 0, DATEADD(MONTH, -4, GETDATE())), -1) as fechaFin
    FROM [_Datos].[dbo].[p_recepcion'+@lastMonth5+'] PR 
        Left Outer Join [_Datos].[dbo].[m_receptores_cab] MR On MR.rec_iid = PR.rec_idReceptor
    WHERE PR.rec_nOrigen = 2 AND rec_tfechahora >= DATEADD(MONTH,-6,getdate()) AND rec_tfechahora <= DATEADD(MONTH,-5,getdate())

    UNION ALL

    SELECT 
        DATENAME(MONTH, DATEADD(MONTH, -6, GETDATE())) as Mes
        , convert(VARCHAR(50),Count(pr.rec_iid),1) as Cantidad
        --, DATEADD(MONTH, DATEDIFF(MONTH, 0, DATEADD(MONTH, -5, GETDATE())), -31) as fechaInicio
        --, DATEADD(MONTH, DATEDIFF(MONTH, 0, DATEADD(MONTH, -5, GETDATE())), -1) as fechaFin
    FROM [_Datos].[dbo].[p_recepcion'+@lastMonth6+'] PR 
        Left Outer Join [_Datos].[dbo].[m_receptores_cab] MR On MR.rec_iid = PR.rec_idReceptor
    WHERE PR.rec_nOrigen = 2 AND rec_tfechahora >= DATEADD(MONTH,-7,getdate()) AND rec_tfechahora <= DATEADD(MONTH,-6,getdate())
    
) as Meses '

PRINT @sql
EXEC (@sql)

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