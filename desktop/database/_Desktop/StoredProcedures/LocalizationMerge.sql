-- =============================================
-- Author:		dedalo
-- Create date: 31/1/2016
-- Description:	combina las palae diferentes aplicaciones un solo tag
-- =============================================
CREATE OR ALTER PROCEDURE [dbo].[LocalizationMerge]

AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

-- limpio la base
delete from [_Sistema].[dbo].[Localization] where [Name] = ''
delete from [_Sistema].[dbo].[Localization] where [Name] is null
delete from [_Sistema].[dbo].[Localization] where LEFT([Name], 1) = '*'
delete from [_Sistema].[dbo].[Localization] where LEFT([Name], 1) = '|'
delete from [_Sistema].[dbo].[Localization] where LEFT([Name], 1) = '[['
delete from [_Sistema].[dbo].[Localization] where LEFT([Name], 8) = '&lt;&lt;'
delete from [_Sistema].[dbo].[Localization] where [Name] = '&nbsp;'

-- corrijo errores de status
update [_Sistema].[dbo].[Localization] set [Status] = 'New' where [Status] = ''
update [_Sistema].[dbo].[Localization] set [Status] = 'New' where [Status] is null


-- tomo las palabras de cada app y las genero en combined (teniendo en cuenta de tomar la mejor palabra disponible)
insert into [_Sistema].[dbo].[Localization] 
SELECT l.[Name]
	, 'Combined' as UiApplication
      ,l.[Language]
	  ,oa.Translation
	  ,oa.[Status]
	  ,oa.Created
	  ,oa.Modified
	  ,oa.userId
	  ,oa.UserName
  FROM [_Sistema].[dbo].[Localization] l
  outer apply (
		select top 1 *, 
			CASE ll.[Status]
			when '' then 5
			when null then 5
			when 'New' then 4
			when 'Copy' then 3
			when 'Google' then 2
			when 'Manual' then 1
			END as _order
		 from [_Sistema].[dbo].[Localization] ll
			where ll.[Name] = l.[Name] AND ll.[Language] = l.[Language]
			order by _order
	  ) as oa
  where l.UiApplication != 'Installer' AND l.UiApplication != 'ticketera' AND
  NOT EXISTS (select * from [_Sistema].[dbo].[Localization] lo where lo.[Name] = l.[Name] and Lo.[Language] = l.[Language] and lo.UiApplication = 'Combined')
  group by l.[Name], l.[Language],oa.translation
	  ,oa.[Status],oa.Created
	  ,oa.Modified
	  ,oa.userId
	  ,oa.UserName


  -- elimino palabras no combinadas
  delete from [_Sistema].[dbo].[Localization] where uiapplication != 'Combined' and uiapplication != 'ticketera' and uiapplication != 'Installer'

  -- elimino palabras de otros idiomas que no esten en es-ar y no sean manuales
  delete 
  FROM [_Sistema].[dbo].[Localization]
  where [Name] not in (
	select ll.[Name] from [_Sistema].[dbo].[Localization] ll
		where ll.[Language] = 'es-ar'
	)
  --and [Status] != 'Manual'


declare @Created Datetime = getdate()

  -- agrego a otros idiomas las palabras de es-ar que les faltan
  insert into [_Sistema].[dbo].[Localization]
select [Name], uiapplication, 'en-en' as [Language], translation, [Status],@Created
	  ,Modified
	  ,userId
	  ,UserName FROM [_Sistema].[dbo].[Localization]
	where [Name] not in (
		select [Name] FROM [_Sistema].[dbo].[Localization]
			where [Language] = 'en-en'
	) and [Language] = 'es-ar'

insert into [_Sistema].[dbo].[Localization]
select [Name], uiapplication, 'fr-fr' as [Language], translation, [Status],@Created
	  ,Modified
	  ,userId
	  ,UserName FROM [_Sistema].[dbo].[Localization]
	where [Name] not in (
		select [Name] FROM [_Sistema].[dbo].[Localization]
			where [Language] = 'fr-fr'
	) and [Language] = 'es-ar'

insert into [_Sistema].[dbo].[Localization]
select [Name], uiapplication, 'it-it' as [Language], translation, [Status],@Created
	  ,Modified
	  ,userId
	  ,UserName FROM [_Sistema].[dbo].[Localization]
	where [Name] not in (
		select [Name] FROM [_Sistema].[dbo].[Localization]
			where [Language] = 'it-it'
	) and [Language] = 'es-ar'
insert into [_Sistema].[dbo].[Localization]
select [Name], uiapplication, 'pt-pt' as [Language], translation, [Status],@Created
	  ,Modified
	  ,userId 
	  ,UserName FROM [_Sistema].[dbo].[Localization]
	where [Name] not in (
		select [Name] FROM [_Sistema].[dbo].[Localization]
			where [Language] = 'pt-pt'
	) and [Language] = 'es-ar'
insert into [_Sistema].[dbo].[Localization]
select [Name], uiapplication, 'pt-br' as [Language], translation, [Status],@Created
	  ,Modified
	  ,userId 
	  ,UserName FROM [_Sistema].[dbo].[Localization]
	where [Name] not in (
		select [Name] FROM [_Sistema].[dbo].[Localization]
			where [Language] = 'pt-br'
	) and [Language] = 'es-ar'

insert into [_Sistema].[dbo].[Localization]
select [Name], uiapplication, 'es-es' as [Language], translation, [Status],@Created
	  ,Modified
	  ,userId 
	  ,UserName FROM [_Sistema].[dbo].[Localization]
	where [Name] not in (
		select [Name] FROM [_Sistema].[dbo].[Localization]
			where [Language] = 'es-es'
	) and [Language] = 'es-ar'


insert into [_Sistema].[dbo].[Localization]
select [Name], uiapplication, 'es-mx' as [Language], translation, [Status],@Created
	  ,Modified
	  ,userId 
	  ,UserName FROM [_Sistema].[dbo].[Localization]
	where [Name] not in (
		select [Name] FROM [_Sistema].[dbo].[Localization]
			where [Language] = 'es-mx'
	) and [Language] = 'es-ar'

insert into [_Sistema].[dbo].[Localization]
select [Name], uiapplication, 'fi-fi' as [Language], translation, [Status],@Created
	  ,Modified
	  ,userId 
	  ,UserName FROM [_Sistema].[dbo].[Localization]
	where [Name] not in (
		select [Name] FROM [_Sistema].[dbo].[Localization]
			where [Language] = 'fi-fi'
	) and [Language] = 'es-ar'

insert into [_Sistema].[dbo].[Localization]
select [Name], uiapplication, 'ar-ar' as [Language], translation, [Status],@Created
	  ,Modified
	  ,userId 
	  ,UserName FROM [_Sistema].[dbo].[Localization]
	where [Name] not in (
		select [Name] FROM [_Sistema].[dbo].[Localization]
			where [Language] = 'ar-ar'
	) and [Language] = 'es-ar'

insert into [_Sistema].[dbo].[Localization]
select [Name], uiapplication, 'bg-bg' as [Language], translation, [Status],@Created
	  ,Modified
	  ,userId 
	  ,UserName FROM [_Sistema].[dbo].[Localization]
	where [Name] not in (
		select [Name] FROM [_Sistema].[dbo].[Localization]
			where [Language] = 'bg-bg'
	) and [Language] = 'es-ar'

PRINT 'totales por idioma'
select [Language], count(*) FROM [_Sistema].[dbo].[Localization] group by [Language]

PRINT 'totales por estado'
select [Status], count(*) FROM [_Sistema].[dbo].[Localization] group by [Status]
	
END