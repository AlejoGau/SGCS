CREATE OR ALTER PROCEDURE [dbo].[EliminarEventoSearch]
	@filter [varchar](max) = ''
WITH EXECUTE AS CALLER
AS
BEGIN
  
	IF @filter != ''
		BEGIN 
			--Filters
			DECLARE @SqlFilter AS VARCHAR(4096)
			SELECT @SqlFilter = dbo.GetSqlFilterForJson(@filter, '')
			DECLARE @Sql VARCHAR (MAX);

			/*Pablo : lo saque el 17-10-2018 porque barre todos los historicos sin sentido
			DECLARE @tabla varchar(50);
			DECLARE tablas_cursor CURSOR LOCAL FOR
				SELECT c_periodo
				FROM _sistema..s_tablahistoricos;

			OPEN tablas_cursor;
			FETCH NEXT FROM tablas_cursor INTO @tabla;

			WHILE @@FETCH_STATUS = 0
				 BEGIN
						begin try
						SET  @Sql = 'DELETE FROM _Datos..'+@tabla +' WHERE 1=1 '+@SqlFilter
						print @Sql

						EXEC(@Sql)
						end try
						begin catch
							print 'Hubo un error al elimnar eventos de la tabla '+@tabla +' con el filtro ' +@SqlFilter
						end catch
						FETCH NEXT FROM tablas_cursor INTO @tabla;
				END;
			*/
			SET  @Sql = 'DELETE FROM _Datos..p_recepcion WHERE 1=1 '+@SqlFilter
			EXEC(@Sql)
		END
	ELSE
		BEGIN
			SELECT 'El filtro es requerido' as msg, 1 as error
		END
END