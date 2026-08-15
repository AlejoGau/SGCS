-- =============================================
-- Author:		Rodrigo Román
-- Create date: 23/02/2015
-- Description:	busca los schedule a ejecutar, realiza el query y genera las alarmas si corresponde
-- 2021-09-08 : Pablo - agregue parametro @fromJob para ejecutar desde un job y que no devuelva registros
-- =============================================
CREATE OR ALTER PROCEDURE [dbo].[SystemTestExecute](
	@debug int = 0,
	@_dc varchar(256) ='',
	@page int = 0,
	@start int =0,
	@limit int = 50,
	@group varchar (256)='',
	@sort varchar(256)='',
	@totalrows int =0 OUTPUT,
	@fromJob char(1) = 'N'
)
AS
BEGIN
	SET NOCOUNT ON;

	-- busco los test a ejecutar
	declare @o_Id int =0;
	declare @o_Name varchar(128)= '';
	declare @o_Sql nvarchar(1024)= '';

	DECLARE test_cursor CURSOR FOR 
		SELECT 
			Id
			,Name
			,[Sql]
			from _sistema..s_SystemTest s
	
	OPEN test_cursor

	FETCH NEXT FROM test_cursor INTO @o_Id
		,@o_Name
		,@o_Sql
		

	if (@debug=1) print 'busco los test a realizar'
	if (@debug=1) print @@FETCH_STATUS
	
	WHILE @@FETCH_STATUS = 0
	BEGIN
		-- por cada uno ejecuto el query
		declare @ParmDefinition nvarchar(1024)= N'@message varchar(1024) output, @status int output';
		declare @messageOut varchar(1024);
		declare @statusOut int;
		declare @message varchar(1024);
		declare @status int;

		EXEC sp_executesql @o_Sql, @ParmDefinition, @message output, @status output

		-- comparo el resultado con la condicion
		UPDATE _sistema..s_SystemTest
			SET status=@status, message = @message, LastExecution = GETDATE()
			WHERE Id = @o_Id
		
		FETCH NEXT FROM test_cursor INTO @o_Id
		,@o_Name
		,@o_Sql
			
	END
	CLOSE test_cursor;
	DEALLOCATE test_cursor;

	If @fromJob='N'
		select * from _sistema..s_SystemTest order by category, LastExecution
END