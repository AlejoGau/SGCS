CREATE OR ALTER PROCEDURE [dbo].[SGSP_CreoRXTIDepurado]
	@cCierre [char](6), @nError [int] = 0 OUTPUT
As
--Crea el historico de p_RXtraInfo
--Autor : Pablo O. Canónico
--Fecha : 16/07/2018
Set NoCount ON
Declare @cSQL nVarChar(Max)

IF OBJECT_ID('p_RXtraInfo'+@cCierre) Is NOT Null
   Set @nError = -5
Else
Begin
	BEGIN TRY
	  Set @nError = 0
	  Set @cSQL = 'CREATE TABLE [dbo].[p_RXtraInfo' +  @cCierre  +  '] (
			[rxt_iId] [bigint] IDENTITY(1,1) NOT NULL,
			[rxt_iRecId] [bigint] NULL,
			[rxt_nSPIP] [numeric](1, 0) NULL,
			[rxt_nSPSMS] [numeric](1, 0) NULL,
			[rxt_cEvento] [varchar](10) NULL,
			[rxt_iSecuencia] [smallint] NULL,
			[rxt_cGeoFenceName] [varchar](100) NULL,
			[rxt_cRoute] [text] NULL,
			[rxt_iRouteID] [int] NULL,
			[rxt_nVCIP] [numeric](1, 0) NULL,
			[rxt_nVCSMS] [numeric](1, 0) NULL,
			[rxt_cData] [varchar](max) NULL,
			[rxt_dFechaHoraProcesaEvento] [datetime] NULL,
			[rxt_iProceso] [int] NULL,
			[rxt_iConexion] [int] NULL
			) ON [PRIMARY] ' 
	  
	  Print @cSQL
	  Execute sp_executesql @cSQL

	  Set @nError = @@Error
	  IF @nError = 0	
		Begin
			Declare @cTableName Char(25) = 'p_RXtraInfo' +  @cCierre 
			Print @cTableName
			
			Declare @cIndxName VarChar(100) = 'PK_'+Rtrim(@cTableName)
			Set @cSQL = 'ALTER TABLE [' + @cTableName + '] WITH NOCHECK ADD CONSTRAINT [' + @cIndxName + '] PRIMARY KEY  CLUSTERED 	( [rxt_iid]	)  ON [PRIMARY] '
			Print @cSQL
			Execute sp_executesql @cSQL

			Set @cIndxName = 'NC_'+Rtrim(@cTableName)+'_iRecID'
			Set @cSQL = 'CREATE UNIQUE NONCLUSTERED INDEX  [' + @cIndxName+']  ON [dbo].[' + @cTableName + '] ([rxt_iRecId]) '
			Print @cSQL
			Execute sp_executesql @cSQL

			Set @cIndxName = 'NC_'+Rtrim(@cTableName)+'_SP'
			Set @cSQL = 'CREATE NONCLUSTERED INDEX  [' + @cIndxName+']  ON [dbo].[' + @cTableName + '] ([rxt_nSPIP] ASC,[rxt_nSPSMS] ASC)
					INCLUDE ( [rxt_iRecId],	[rxt_cEvento],[rxt_iSecuencia],	[rxt_cGeoFenceName],[rxt_iRouteID])'
			Print @cSQL
			Execute sp_executesql @cSQL

			Set @cIndxName = 'NC_'+Rtrim(@cTableName)+'_VC'
			Set @cSQL = 'CREATE NONCLUSTERED INDEX  [' + @cIndxName+']  ON [dbo].[' + @cTableName + '] ([rxt_iRecId] ASC,[rxt_nVCIP] ASC,[rxt_nVCSMS] ASC)
					INCLUDE ( [rxt_cEvento],[rxt_iSecuencia],[rxt_cGeoFenceName],[rxt_iRouteID])'
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