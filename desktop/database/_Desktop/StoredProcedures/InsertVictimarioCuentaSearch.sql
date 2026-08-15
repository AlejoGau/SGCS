CREATE OR ALTER PROCEDURE [dbo].[InsertVictimarioCuentaSearch]

	@idVictimario INT = 0, 
	@arrayjson NVARCHAR(MAX) = ''
AS
BEGIN
	DELETE FROM _Datos..m_victimariosCuentas WHERE vct_idKeyVictimario = @idVictimario
	

--dbo.parseJSON(@filter)
	INSERT INTO  _Datos..m_victimariosCuentas(vct_idKeyVictimario, vct_idKeyCuenta)
	SELECT @idVictimario, convert(int,StringValue) from dbo.parseJSON(@arrayjson) where name is not null
		and valuetype='int'


END