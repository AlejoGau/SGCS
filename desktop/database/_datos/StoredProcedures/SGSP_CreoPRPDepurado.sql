CREATE OR ALTER PROCEDURE [dbo].[SGSP_CreoPRPDepurado]
	@cCierre [char](6), @nError [int] = 0 OUTPUT
As
--Crea el historico de p_recepcion_proceso
--Autor : Pablo O. Canónico
--Fecha : 26/02/2018
Set NoCount ON
Declare @cSQL nVarChar(Max)

IF OBJECT_ID('p_recepcion_proceso'+@cCierre) Is NOT Null
   Set @nError = -5
Else
Begin
	BEGIN TRY
	  Set @nError = 0
	  Set @cSQL = 'CREATE TABLE [dbo].[p_recepcion_proceso' +  @cCierre  +  '] (
			[pro_iid] [bigint] NULL,
			[pro_recid] [bigint] NULL,
			[pro_cterminal] [char](3) NULL,
			[pro_tfechahora] [datetime] NULL,
			[pro_nProceso] [numeric](2, 0) NULL,
			[pro_iOperador] [int] NULL,
			[pro_iRecIdPadre] [bigint] NULL,
			) ON [PRIMARY] ' 
	  
	  Execute sp_executesql @cSQL
	  
	  Set @nError = @@Error
	  IF @nError = 0	
		Begin
			Declare @cTableName Char(25) = 'p_recepcion_proceso' +  @cCierre 
			Print @cTableName
			
			Declare @cIndxName VarChar(100) = 'PK_'+Rtrim(@cTableName)
			Set @cSQL = 'CREATE CLUSTERED INDEX   [' + @cIndxName+']  ON [dbo].[' + @cTableName + '] ([pro_iid])'
			Print @cSQL
			Execute sp_executesql @cSQL
			
			Set @cIndxName = 'NC_'+Rtrim(@cTableName)+'RecIdPadre'
			Set @cSQL = 'CREATE NONCLUSTERED INDEX  [' + @cIndxName+']  ON [dbo].[' + @cTableName + '] ([pro_iRecIdPadre]) '
			Print @cSQL
			Execute sp_executesql @cSQL

			Set @cIndxName = 'NC_'+Rtrim(@cTableName)+'RecId'
			Set @cSQL = 'CREATE NONCLUSTERED INDEX  [' + @cIndxName+']  ON [dbo].[' + @cTableName + '] ([pro_recid])'
			Print @cSQL
			Execute sp_executesql @cSQL

			Declare @cname Varchar(512), @cnombres Varchar(1024)
			Set @cNombres = ''

			Declare c_users CURSOR STATIC LOCAL READ_ONLY FORWARD_ONLY For 
				Select name From sysusers Where ( Left(Name,2) = 'SG' Or Left(Name,9) = 'SoftGuard' ) And Left(Name,9) <> 'SGSERVER\'	

			Open c_users
			Fetch Next From c_users Into @cname
			While @@FETCH_STATUS = 0
			Begin
				Set @cNombres = @cNombres + Rtrim(@cName) + ','

				Fetch Next From c_users Into @cname
			End
			Close c_users
			Deallocate c_users

			If Len(@cNombres) > 0
				Set @cNombres = Left(@cNombres,Len(@cNombres)-1)
			Else
				Set @cnombres = '[SGDesktopAccess]'

			Set @cSQL = 'GRANT  REFERENCES ,  SELECT ,  UPDATE ,  INSERT ,  DELETE  ON  [dbo].[' +  @cTableName + '] TO ' + @cNombres
			Print @cSQL
			Execute sp_executesql @cSQL
		End
	END TRY

	BEGIN CATCH
		PRINT 'Error Number  : ' + CAST(ERROR_NUMBER() AS VARCHAR(10));
		PRINT 'Error Message : ' + ERROR_MESSAGE();
		PRINT 'Error Severity: ' + CAST(ERROR_SEVERITY() AS VARCHAR(10));
		PRINT 'Error State   : ' + CAST(ERROR_STATE() AS VARCHAR(10));
		PRINT 'Error Line    : ' + CAST(ERROR_LINE() AS VARCHAR(10));
		PRINT 'Error Proc    : ' + ISNULL(ERROR_PROCEDURE(), 'Not within proc');
		Set @nError = -9
	END CATCH
End