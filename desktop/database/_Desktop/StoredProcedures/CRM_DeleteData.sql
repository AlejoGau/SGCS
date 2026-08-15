--#############################################################################
-- SOFTGUARD DESKTOP
-- updated : 2017-06-15 08:51:37.167 
--#############################################################################

--#############################################################################
-- SOFTGUARD DESKTOP
-- updated : 2017-06-15 08:45:33.273 
--#############################################################################
-- =============================================
-- Author:		Dedalo
-- Create date: 06/09/2014
-- Description:	Limpieza de bases SLBF
-- =============================================
CREATE OR ALTER PROCEDURE [dbo].[CRM_DeleteData]
	@doexecute BIT = 0, -- No ejecuta los delete solo devuelve el texto del sql a ejecutar
	@verbose BIT = 1 -- hace print de cada paso
AS
BEGIN

	SET NOCOUNT ON;
	DECLARE	@sql NVARCHAR(max) = '';
	declare @sqltemp NVARCHAR(max)='
	USE _Datos
	';


	-- elimino contenidos crm
	set @sqltemp = '
		delete from person
		delete from Action
		delete from organization
		delete from Order
		delete from orderitem
		delete from issue
		delete from Event
		delete from project
		delete from Product
		delete from survey
		delete from Task
		';
		
	SET @sql = @sql + @sqltemp;
	if (@verbose=1) print @sqltemp;
	if (@doexecute = 1) exec (@sqltemp);

	-- elimino las metadatas de las cuales no existe el objeto
	declare @o_Id int =0;
	declare @o_tableName NVARCHAR(256)= '';

	-- por cada objeto me fijo si hay metadatas huerfanas
	DECLARE object_cursor CURSOR FOR 
		SELECT o.Id,o.TableName
			FROM _Desktop..Object o where (o.TableName is not null and o.TableName !='')
	
	OPEN object_cursor

	FETCH NEXT FROM object_cursor INTO @o_Id, @o_tableName

	
	WHILE @@FETCH_STATUS = 0
	BEGIN

		if (@o_tableName != 'RelationObject')
		BEGIN
			set @sqltemp ='
				delete from Metadata where '
					+'ObjectTypeId = '+convert(NVARCHAR(5),@o_Id)
					+' and Id not in ('
					+'select m.Id from MetaData m inner join ['+@o_tableName+']'
					+' o on (m.ObjectId = o.Id and m.ObjectTypeId = '+convert(NVARCHAR(5),@o_Id)+')'
					+')'
			if (@verbose=1) print @sqltemp;
			if (@doexecute = 1) exec (@sqltemp);
			set @sql = @sql +@sqltemp;
		END
		FETCH NEXT FROM object_cursor INTO @o_Id, @o_tableName
	END
	CLOSE object_cursor;
	DEALLOCATE object_cursor;



	-- elimino las relaciones de las cuales no existe el objeto
	set @o_Id =0;
	set @o_tableName = '';

	-- por cada objeto me fijo si hay metadatas huerfanas
	DECLARE object_cursor CURSOR FOR 
		SELECT o.Id,o.TableName
			FROM _Desktop..Object o where (o.TableName is not null and o.TableName !='')
	
	OPEN object_cursor

	FETCH NEXT FROM object_cursor INTO @o_Id, @o_tableName

	
	WHILE @@FETCH_STATUS = 0
	BEGIN

		if (@o_tableName != 'RelationObject')
		BEGIN
			-- borro cuando no existen los padres
			set @sqltemp ='
				delete from RelationObject where '
					+'ObjectTypeId = '+convert(NVARCHAR(5),@o_Id)
					+' and RelationId not in ('
					+'select r.RelationId from RelationObject r inner join ['+@o_tableName+']'
					+' o on (r.ObjectId = o.Id and r.ObjectTypeId = '+convert(NVARCHAR(5),@o_Id)+')'
					+')'
			if (@verbose=1) print @sqltemp;
			if (@doexecute = 1) exec (@sqltemp);
			set @sql = @sql +@sqltemp;

			-- borro cuando no existen los hijos
			set @sqltemp ='
				delete from RelationObject where '
					+'RelationObjectTypeId = '+convert(NVARCHAR(5),@o_Id)
					+' and RelationId not in ('
					+'select r.RelationId from RelationObject r inner join ['+@o_tableName+']'
					+' o on (r.RelationObjectId = o.Id and r.RelationObjectTypeId = '+convert(NVARCHAR(5),@o_Id)+')'
					+')'
			if (@verbose=1) print @sqltemp;
			if (@doexecute = 1) exec (@sqltemp);
			set @sql = @sql +@sqltemp;
		END
		FETCH NEXT FROM object_cursor INTO @o_Id, @o_tableName
	END
	CLOSE object_cursor;
	DEALLOCATE object_cursor;

END