-- =============================================
-- Author:		Rodrigo Román
-- Create date: 15/06/2017
-- Description:	Realiza modificaciones Masivas en el codigo de stored procedures
-- =============================================
CREATE OR ALTER PROCEDURE [dbo].[Slbf_BulkReplaceStoredProcedures]

-- #####################
-- ANTES DE USAR CAMBIAR EL CODIGO A MODIFICAR
-- CUANDO ESTE PARA REALMENTE EJECUTAR SACAR TOP Y DESCOMENTAR EXEC
-- #####################
	
AS
BEGIN
	declare
	@header  nvarchar(max),
	@cmd     nvarchar(max)

	declare c1 cursor for 
	select top 10
		definition from sys.sql_modules
	where definition like '%VARCHAR(%'
  
	open c1
	fetch next from c1 into @cmd
	While @@fetch_status <> -1
	begin
		SET @header = convert(nvarchar(max),N'
	--#############################################################################
	-- SOFTGUARD DESKTOP
	-- updated : ' + CONVERT(nvarchar(50),GETDATE(),121) + ' 
	--#############################################################################
	')
	set @cmd = REPLACE(@cmd,'VARCHAR(','NVARCHAR(');
	set @cmd = REPLACE(@cmd,'VARCHAR (','NVARCHAR(');
	set @cmd = REPLACE(@cmd,'VARCHAR(4096','NVARCHAR(MAX');
	set @cmd = REPLACE(@cmd,'VARCHAR (4096','NVARCHAR(MAX');
	set @cmd = REPLACE(@cmd,'VARCHAR(8000','NVARCHAR(MAX');
	set @cmd = REPLACE(@cmd,'VARCHAR (8000','NVARCHAR(MAX');
	set @cmd = REPLACE(@cmd,'NNVARCHAR','NVARCHAR');
	set @cmd = REPLACE(@cmd,'TEXT =','NTEXT =');
	set @cmd = REPLACE(@cmd,'NNTEXT','NTEXT');
	set @cmd = REPLACE(@cmd,'@NTEXT =','@TEXT =');
	set @cmd = REPLACE(@cmd,convert(varchar(max),N'CREATE OR ALTER Procedure'),convert(varchar(max),N'ALTER PROCEDURE'))
	set @cmd = REPLACE(@cmd,convert(varchar(max),N'CREATE FUNCTION'),convert(varchar(max),N'ALTER FUNCTION'))
   SET @cmd =  @header + @cmd
	
	print @cmd
	--exec (@cmd)
	fetch next from c1 into @cmd
	end
	close c1
	deallocate c1
END