--#############################################################################
-- SOFTGUARD DESKTOP
-- updated : 2017-06-15 08:45:38.413 
--#############################################################################

CREATE OR ALTER PROCEDURE [dbo].[Slbf_CreatePermission]

AS
BEGIN

	declare @o_Id int =0;
	declare @o_Name NVARCHAR(255)='';
	declare @userId int = 1;
	-- por cada objeto me fijo si esta creada la seguridad y sino la genero
	DECLARE object_cursor CURSOR FOR 
		SELECT o.Id, o.Name FROM Object o
	
	OPEN object_cursor

	FETCH NEXT FROM object_cursor INTO @o_Id, @o_Name

	
	WHILE @@FETCH_STATUS = 0
	BEGIN
		print 'Analizo ' + @o_Name;
		if not exists(select * from permission where objectid = @o_Id)
		begin
		print 'no hay permisos, inserto registros';
		insert into _Desktop..Permission (Name, ObjectId, FunctionId, Audit)
		select Name, @o_Id, Id, @userId from [Function]

		--insert into _Datos..relationobject (ObjectTypeId, ObjectId, RelationObjectTypeId , RelationObjectId)
		--select 2,1,3,Id from _Desktop..Permission where ObjectId = @o_Id

		end
		
		-- borro las relaciones y las vuelvo a crear.
		delete from _Datos..relationobject where 
			ObjectTypeId=2 
			AND ObjectId=@userId
			AND RelationObjectTypeId=3
			AND RelationObjectId in ( select Id from _Desktop..Permission where ObjectId = @o_Id)
		

		insert into _Datos..relationobject (ObjectTypeId, ObjectId, RelationObjectTypeId , RelationObjectId)
			select 2,@userId,3,Id from _Desktop..Permission where ObjectId = @o_Id
		
		
		FETCH NEXT FROM object_cursor INTO @o_Id, @o_Name
	END
	CLOSE object_cursor;
	DEALLOCATE object_cursor;

	update [_Desktop].[dbo].[Permission] set audit = 2 where [FunctionId] in (3,4,6)
	-- ajusto permisos de p_push_queue, remotecallservice, bundle, razor, p_posiciones para que no dejen auditoria
	update [_Desktop].[dbo].[Permission] set audit = 0 where ObjectId in(3163,3173,3105,21,50)

END