-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE OR ALTER PROCEDURE [dbo].[LocalizationCreateFiles] 

AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    
Declare @fileName nVarchar(max)   
Declare @sqlStr nVarchar(max) 
Declare @Lang nVarchar(64)
Declare @Name nVarchar(256)
Declare @UiApplication nVarchar(64)
Declare @Language nVarchar(64)
Declare @Translation nVarchar(1024)

Declare LangCursor Cursor Scroll
	For Select [Language] From _sistema..[Localization]
		Group By [Language]

	Open LangCursor
	FETCH NEXT FROM LangCursor INTO @Lang

	WHILE @@FETCH_STATUS = 0
	Begin
		Set @fileName = 'C:\Temp\Localization_'+Ltrim(Rtrim(@Lang))+'.sql'
		Raiserror('%s',0,1,@fileName)

		Declare TmpCursor Cursor Scroll
			For Select Replace(_Desktop.dbo.fn_HTMLDecode([Name]),N'''',N''''''), UiApplication, Language, Replace(_Desktop.dbo.fn_HTMLDecode([Translation]),N'''',N'''''')
				From _Sistema.dbo.Localization
				Where Language In(Ltrim(Rtrim(@Lang)))
				And Not UiApplication Like 'CS_%'
				Order By Id 
				
		Open TmpCursor
		FETCH NEXT FROM  TmpCursor INTO @Name,@UiApplication,@Language,@Translation

		WHILE @@FETCH_STATUS = 0
		Begin

			Set @sqlStr = N'	INSERT INTO [_Sistema].[dbo].[Localization] (Name, UiApplication, Language, Translation)
				VALUES (N'''+@Name+N''',N'''+Rtrim(@UiApplication)+N''',N'''+Rtrim(@Language)+N''',N'''+Rtrim(@Translation)+N''')
				Go																				
				'

			Print @sqlStr

			EXEC USP_SaveFile @sqlStr, @fileName

			FETCH NEXT FROM  TmpCursor INTO @Name,@UiApplication,@Language,@Translation
	
		End

		Close TmpCursor
		DEALLOCATE TmpCursor

		FETCH NEXT FROM LangCursor INTO @Lang
	
	End

	Close LangCursor
	DEALLOCATE LangCursor


END