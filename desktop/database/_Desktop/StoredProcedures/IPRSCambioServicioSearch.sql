CREATE OR ALTER PROCEDURE [dbo].[IPRSCambioServicioSearch]
	@servicioDestino INT,
	@conexiones VARCHAR(MAX)
AS
BEGIN

	DECLARE @Sql VARCHAR(MAX)

	SET @Sql = '
		UPDATE _tablas..t_IPRSConn SET 
		iprsc_iprsiid = '+convert(varchar(20),@servicioDestino)+'
		WHERE iprsc_idKey IN ('+@conexiones+')
	';
print @Sql
	EXEC(@Sql)
END