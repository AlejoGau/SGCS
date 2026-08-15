CREATE OR ALTER PROCEDURE [dbo].[SGSP_jSonMailParser] @json As nVarChar(max) As
--Parsea el jSon de los mails recibidos de HikVision
--Autor :Pablo O. Canónico
--Fecha :05/05/2016
--27/03/2018	NO PUEDEN SER NVARCHAR x que romper el parseo hacia la dll de IR
SET NOCOUNT ON
Declare @name As VarChar(max) = '',
 @stringValue As VarChar(max) = '',
 @subject As VarChar(250) = '',
 @body As VarChar(2000) = '',
 @path As VarChar(1000) = ''
--No son VarChar(Max) for backguard compatibility

If Len(@json) > 2
Begin
	Declare jCursor Cursor Scroll
		For Select Name,StringValue From _Datos.dbo.parseJSON(@json) 

		Open jCursor
		FETCH NEXT FROM jCursor INTO @name,@stringValue

		WHILE @@FETCH_STATUS = 0
		Begin
			If @name ='subject'
				Set @subject = @stringValue
			Else
				If @name ='body'
					Set @body = @stringValue
				Else
					If @name ='path'
						Set @path = @path + @stringValue +'|'

			FETCH NEXT FROM  jCursor INTO @name,@stringValue
		End

	Close jCursor
	DEALLOCATE jCursor
End
Select @subject As Subject, @body As Body, @path As Path