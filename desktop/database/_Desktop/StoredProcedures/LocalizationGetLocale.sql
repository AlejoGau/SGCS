CREATE OR ALTER PROCEDURE [dbo].[LocalizationGetLocale]
	@Name [varchar](256)='',
	@Language [varchar](256) = null,
	@UiApplication [varchar](256) = null,
	@soloOutput [int] = 0,
	@sys varchar(256)='',
	@translation [nvarchar](1024) = '' OUTPUT
WITH EXECUTE AS CALLER
AS
begin

--print '[LocalizationGetLocale] Select t_parametros '	
	if (@language is null)
		select @language = par_cValor from _tablas..t_parametros  where par_ccodigo = 'IDIOMAMSJ'

	if (@UiApplication is null)
		set @UiApplication = 'Sql'

--print '[LocalizationGetLocale] @language '	+ @language
--print '[LocalizationGetLocale] @UiApplication '	+ @UiApplication

	if not exists(
		select * from _sistema..localization
		where Name = @Name
		and Language = @Language
		and UIApplication in ('Combined',@UiApplication)
		)
	begin
		insert into _sistema..Localization(Name, Language, UiApplication, Translation, Status)
			values (@Name, @Language, @UiApplication, @Name, 'New')
	end
	

--print '[LocalizationGetLocale] Select top 1 @translation '	
	select top 1 @translation = isnull(translation,@name) from _sistema..localization
		where Name = @Name
		and Language = @Language
		and UIApplication in ('Combined',@UiApplication)
	

--print '[LocalizationGetLocale] @translation ' + @translation	
--print '[LocalizationGetLocale] @soloOutput ' + cast(@soloOutput as varchar(10))	
	If @soloOutput = 0
		select @translation As [translation]

--print '[LocalizationGetLocale] Fin'	
end