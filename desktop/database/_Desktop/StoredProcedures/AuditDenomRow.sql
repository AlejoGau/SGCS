-- =============================================
-- Author:		Rodrigo Román
-- Create date: 18/03/2015
-- Description:	Desnormaliza los datos de auditoria
-- =============================================
CREATE OR ALTER PROCEDURE [dbo].[AuditDenomRow]
	@auditId int
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    declare @xml varchar(max);
	declare @objectName varchar(128);

	declare @f_nodename varchar(128);
	declare @f_value varchar(128);
	declare @f_sql NVARCHAR(max);
	declare @out varchar(max);
	declare @count int = 0;
	declare @json varchar(max);
	declare @countExtended int;

	-- tomo el xml de los datos viejos
	select @xml=xmlold, @objectName=ObjectName  from _audit.dbo.Frameworkaudit where id = @auditId

	-- busco campos y valores
	-- por cada campo ejecuto la desnormalizacion
		DECLARE fieldOld_cursor CURSOR FOR 
			SELECT 
				x.nodename, x.value, a.DenormalizationSelect
				FROM _Desktop.dbo.XMLTable(@xml) x
				inner join _audit.dbo.AuditDenormalizationConfig a on (a.ObjectName collate modern_spanish_ci_as = @objectName and a.FieldName collate modern_spanish_ci_as = x.nodename)
				where x.depth = 3 and x.ParentName = 'Data'
	
		OPEN fieldOld_cursor

		FETCH NEXT FROM fieldOld_cursor INTO @f_nodename, @f_value, @f_sql

		set @json = '{';
		WHILE @@FETCH_STATUS = 0
		BEGIN

			EXEC sp_executesql @f_sql, 
					  N'@value varchar(128), @out varchar(max) OUTPUT', 
					  @f_value, 
					  @out OUTPUT

			if (@count > 0)
				set @json = @json + ',';

			set @json = @json + '''' + @f_nodename + ''':''' + @out + ''''
			set @count = @count+1;
			--print @f_value
			--print @f_sql
			--print @out

			FETCH NEXT FROM fieldOld_cursor INTO @f_nodename, @f_value, @f_sql
		END
		CLOSE fieldOld_cursor;
		DEALLOCATE fieldOld_cursor;
		set @json = @json +'}';

		print @json;

		update _audit.dbo.FrameworkauditExtend set OldValueDenom = @json where Id = @auditId
		/*
		-- me fijo si existe el registro extended
		select @countExtended = count(*) from _audit.dbo.FrameworkauditExtend where Id = @auditId
		if (@countExtended > 0)
		BEGIN
			-- actualizo valores 
			update _audit.dbo.FrameworkauditExtend set OldValueDenom = @json where Id = @auditId
		END
		else
		BEGIN
			-- inserto el registro INSERT [INTO] table_or_view [(column_list)] data_values
			insert into _audit.dbo.FrameworkauditExtend (Id, OldValueDenom) values (@auditId, @json)
		END
		*/


	-- AHORA LOS DATOS NUEVOS

	-- tomo el xml de los datos nuevos
	select @xml=xmlnew, @objectName=ObjectName  from _audit.dbo.Frameworkaudit where id = @auditId
	set @count=0; -- vuelvo el contador a 0
	-- busco campos y valores
	-- por cada campo ejecuto la desnormalizacion
		DECLARE fieldNew_cursor CURSOR FOR 
			SELECT 
				x.nodename, x.value, a.DenormalizationSelect
				FROM _Desktop.dbo.XMLTable(@xml) x
				inner join _audit.dbo.AuditDenormalizationConfig a on (a.ObjectName = @objectName and a.FieldName collate modern_spanish_ci_as = x.nodename)
				where x.depth = 3 and x.ParentName = 'Data'
	
		OPEN fieldNew_cursor

		FETCH NEXT FROM fieldNew_cursor INTO @f_nodename, @f_value, @f_sql

		set @json = '{';
		WHILE @@FETCH_STATUS = 0
		BEGIN

			EXEC sp_executesql @f_sql, 
					  N'@value varchar(128), @out varchar(max) OUTPUT', 
					  @f_value, 
					  @out OUTPUT

			if (@count > 0)
				set @json = @json + ',';

			set @json = @json + '''' + @f_nodename + ''':''' + @out + ''''
			set @count = @count+1;
			--print @f_value
			--print @f_sql
			--print @out

			FETCH NEXT FROM fieldNew_cursor INTO @f_nodename, @f_value, @f_sql
		END
		CLOSE fieldNew_cursor;
		DEALLOCATE fieldNew_cursor;
		set @json = @json +'}';

		print @json;


		update _audit.dbo.FrameworkauditExtend set NewValueDenom = @json where Id = @auditId
		/*

		-- me fijo si existe el registro extended
		select @countExtended = count(*) from _audit.dbo.FrameworkauditExtend where Id = @auditId
		if (@countExtended > 0)
		BEGIN
			-- actualizo valores 
			update _audit.dbo.FrameworkauditExtend set NewValueDenom = @json where Id = @auditId
		END
		else
		BEGIN
			-- inserto el registro INSERT [INTO] table_or_view [(column_list)] data_values
			insert into _audit.dbo.FrameworkauditExtend (Id, NewValueDenom) values (@auditId, @json)
		END
		*/
	--select * from _audit.dbo.FrameworkauditExtend where Id = 29753


	--select * from _audit.dbo.Frameworkaudit a left join _desktop.dbo.object o on a.objecttypeID = o.id where a.id = 29645 


	--alter table _audit.dbo.FrameworkauditExtend add NewValueDenom nvarchar(max) ;

END