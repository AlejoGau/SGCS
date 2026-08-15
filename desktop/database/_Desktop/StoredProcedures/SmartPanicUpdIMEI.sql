CREATE OR ALTER PROCEDURE [dbo].[SmartPanicUpdIMEI] 
@id INT = 0,
@IMEI NVARCHAR (128) = ''
AS 

DECLARE @Idretorno INT = 0

if @id > 0 and RTRIM( @IMEI)<>''
	BEGIN

		SELECT @Idretorno = Id FROM _Datos.dbo.SmartPanic WHERE Id=@id AND Imei=@IMEI
		Update _datos.dbo.SmartPanic set Imei='' WHERE Id=@id AND Imei=@IMEI

		SELECT * FROM _Datos.DBO.SmartPanic WHERE Id = @Idretorno		


	END
ELSE IF @id>0 
	BEGIN
		SELECT @Idretorno = Id FROM _Datos.dbo.SmartPanic WHERE Id=@id
		Update _datos.dbo.SmartPanic set Imei='' WHERE Id=@id 

		SELECT * FROM _Datos.DBO.SmartPanic WHERE Id = @Idretorno
	END
ELSE IF RTRIM(@IMEI)<>''
	 BEGIN
		SELECT @Idretorno = Id FROM _Datos.dbo.SmartPanic WHERE Imei=@IMEI
		Update _datos.dbo.SmartPanic set Imei='' WHERE Imei=@IMEI 

		SELECT * FROM _Datos.DBO.SmartPanic WHERE Id = @Idretorno		
	 END