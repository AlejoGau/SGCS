CREATE OR ALTER PROCEDURE [dbo].[USP_SaveFile] @text as NVarchar(Max), @Filename Varchar(200) AS
	
		Declare
			@Object int,
			@rc int,
			@FileID Int,
			@Append bit

		EXEC @rc = sp_OACreate 'Scripting.FileSystemObject', @Object OUT

		--- Check File already exist
		EXEC sp_OAMethod @Object, 'FileExists', @Append out, @Filename

		IF @Append = 1
			BEGIN
				--open the text stream for append
				EXECUTE @rc = sp_OAMethod  @Object,'OpenTextFile',@FileID OUTPUT, @Filename, 8
			END
		ELSE
			BEGIN
				--Create the text file for write
				EXECUTE @rc = sp_OAMethod  @Object,'CreateTextFile', @FileID OUTPUT,@Filename,-1
			END

		EXEC @rc = sp_OAMethod @FileID , 'WriteLine' , Null , @text
		Exec @rc = sp_OADestroy @FileID

		If @rc <> 0
		Begin
			Exec @rc = sp_OAMethod @Object, 'SaveFile',null,@text ,@Filename,@Append
		End

		Exec @rc = sp_OADestroy @Object