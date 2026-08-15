CREATE OR ALTER PROCEDURE [dbo].[SGSP_CreoETDepurado]
	@cCierre [char](6), @nError [int] = 0 OUTPUT
As
--Crea el historico de EventosTimeLine
--Autor : Pablo O. Canónico
--Fecha : 14/09/2017
Set NoCount ON
Declare @cSQL nVarChar(Max)

IF OBJECT_ID('EventosTimeLine'+@cCierre) Is NOT Null
   Set @nError = -5
Else
Begin
	BEGIN TRY
	  Set @nError = 0
	  Set @cSQL = 'CREATE TABLE [dbo].[EventosTimeLine' +  @cCierre  +  '] (
			[etl_idKey] [bigint] NULL ,
			[etl_iRecID] [bigint] NULL,
			[etl_iCuenta] [int] NULL,
			[etl_tFechaHora] [datetime] NULL,
			[etl_cAccion] [varchar](100) NULL,
			[etl_cObservacion] [varchar](MAX) NULL,
			[etl_cOwner] [varchar](MAX) NULL,
			[etl_iOperador] [int] NULL,
			[etl_iAccionCode] [int] NULL,
		) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY] ' 
	  
	  Execute sp_executesql @cSQL
	  
	  Set @nError = @@Error
	  IF @nError = 0	
		Begin
			Declare @cTableName Char(21) = 'EventosTimeLine' +  @cCierre 
			Print @cTableName
			
			Declare @cIndxName VarChar(100) = 'PK_'+Rtrim(@cTableName)
			Set @cSQL = 'CREATE UNIQUE CLUSTERED INDEX   [' + @cIndxName+']  ON [dbo].[' + @cTableName + '] ([etl_idKey])'
			Print @cSQL
			Execute sp_executesql @cSQL
			
			Set @cIndxName = 'NC_'+Rtrim(@cTableName)+'FechaHora'
			Set @cSQL = 'CREATE NONCLUSTERED INDEX  [' + @cIndxName+']  ON [dbo].[' + @cTableName + '] ([etl_tFechaHora]) INCLUDE ([etl_idKey])'
			Print @cSQL
			Execute sp_executesql @cSQL

			Set @cIndxName = 'NC_'+Rtrim(@cTableName)+'iRecID'
			Set @cSQL = 'CREATE NONCLUSTERED INDEX  [' + @cIndxName+']  ON [dbo].[' + @cTableName + '] ([etl_iRecID]) INCLUDE ([etl_idKey], [etl_iCuenta], [etl_tFechaHora], [etl_cAccion], [etl_cObservacion], [etl_cOwner], [etl_iOperador], [etl_iAccionCode])'
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