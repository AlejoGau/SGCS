CREATE OR ALTER PROCEDURE [dbo].[AlarmasEnEventosPendientesSearch]
 @page INT = 1,               
 @start INT = 0,               
 @limit INT = 1000,               
 @sort VARCHAR(256) = '',   
 @group VARCHAR(256) = '',            
 @filter VARCHAR(2048) = '',        
 @_dc VARCHAR(256) = '', 
 @completo VARCHAR(10) = '', 
 @token VARCHAR(128) = '',              
 @totalrows INT = 1 --OUTPUT  
AS
BEGIN
  

 --RANGOS 
DECLARE @SqlFilterRango AS VARCHAR(max)

EXEC getSqlRangesForToken @table = 'eventospendientes', @token = @token, @alias = 'c.', @SqlFilterRango = @SqlFilterRango OUTPUT


DECLARE @sql AS VARCHAR(MAX)

SET @sql = 'SELECT rec_cAlarma as Codigo, max(cod_cDescripcion) Descripcion  
FROM _datos..EventosPendientes o (nolock) inner join _Datos..m_cuentas c on c.cue_iid = o.rec_iidcuenta

WHERE 1=1 '+@SqlFilterRango + ' GROUP BY rec_cAlarma'

EXECUTE (@Sql)

END