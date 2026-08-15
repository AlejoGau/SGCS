CREATE OR ALTER PROCEDURE [dbo].[SYS_modoDebug]
 @modo INT = 1
AS  
 UPDATE _Tablas..t_parametros
	SET par_iValor = @modo
	WHERE par_ccodigo = 'DEBUGSQL'