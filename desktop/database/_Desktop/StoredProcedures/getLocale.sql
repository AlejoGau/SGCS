-- =============================================
-- Author:		Rodrigo Román
-- Create date: 2021/05/03
-- Description:	devuelve la localizacion de una palabra o frase y genera todas las palabras como nuevas si es que no existe.
-- =============================================
CREATE OR ALTER PROCEDURE [dbo].[getLocale]
	-- Add the parameters for the stored procedure here
	@name nvarchar(1024), 
	@language nvarchar(64),
	@application varchar(65) = 'Combined'
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

	declare @translation nvarchar(1024)

    -- busco la traducción
	if len(@language) = 2
	begin
	select top 1 @translation = translation from _Sistema..Localization where Name = @name and substring(Language,0,3)=@language and UiApplication=@application
	end
	else
	begin
		select top 1 @translation = translation from _Sistema..Localization where Name = @name and Language=@language and UiApplication=@application
	end
	-- me fijo si la traduccion existe
	if @translation is null OR @translation = ''
	begin
		-- genero la palabra en español
		INSERT INTO _Sistema..Localization (Name,UiApplication,Language,Translation,Status)
			values (@name,@application,'es-ar',@name,'New')
		--genero el resto de las palabras
		INSERT INTO _Sistema..Localization (Name,UiApplication,Language,Translation,Status)
			values (@name,@application,'en-en',@name,'New')
		INSERT INTO _Sistema..Localization (Name,UiApplication,Language,Translation,Status)
			values (@name,@application,'it-it',@name,'New')
		INSERT INTO _Sistema..Localization (Name,UiApplication,Language,Translation,Status)
			values (@name,@application,'pt-pt',@name,'New')
		INSERT INTO _Sistema..Localization (Name,UiApplication,Language,Translation,Status)
			values (@name,@application,'pt-br',@name,'New')
		INSERT INTO _Sistema..Localization (Name,UiApplication,Language,Translation,Status)
			values (@name,@application,'fi-fi',@name,'New')
		INSERT INTO _Sistema..Localization (Name,UiApplication,Language,Translation,Status)
			values (@name,@application,'fr-fr',@name,'New')

		select @translation = @name 
	end

	select @translation as Translation
END