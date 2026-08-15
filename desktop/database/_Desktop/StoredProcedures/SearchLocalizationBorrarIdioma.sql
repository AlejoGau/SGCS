--#############################################################################
-- SOFTGUARD DESKTOP
-- updated : 2017-06-15 08:45:37.647 
--#############################################################################


CREATE OR ALTER PROCEDURE [dbo].[SearchLocalizationBorrarIdioma]
(@Language NVARCHAR(128),
@borrar NVARCHAR(128) = '')
as
begin
	declare @t table (Id int )
	insert into @t select Id from _sistema..Localization where Language = @Language
	
	select l.* from @t t
	 inner join _sistema..Localization l on (t.Id = l.Id)
	
	if(@borrar = 'true')
		delete from _Sistema..Localization where id in (select Id from @t)
	
	
end