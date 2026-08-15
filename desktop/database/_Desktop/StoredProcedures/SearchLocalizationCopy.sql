CREATE OR ALTER PROCEDURE [dbo].[SearchLocalizationCopy]
(@from varchar(128), 
@to varchar(128),
@copy varchar(128) = null,
@page INT = 1,               
 @start INT = 0,               
 @limit INT = 50,               
 @sort VARCHAR(256) = '',   
 @group VARCHAR(256) = '',            
 @filter VARCHAR(2048) = '',        
 @_dc VARCHAR(256) = '',              
 @totalrows INT = 1
)
as
begin
set nocount on


select l1.Name, l1.UIApplication, @to Language, l1.Translation, 'Copy' Status 
into #localizationcopy 
from _sistema..Localization l1
left join _sistema..Localization l2 on 
	(l2.Name = l1.Name and l2.UiApplication = l1.UiApplication 
	and l1.Language = @from and l2.Language = @to)
where l2.Id is null
and l1.Language = @from

select * from #localizationcopy 

if(@copy = 'true' or @copy = 'copy')
begin
insert into _sistema..Localization(Name, UiApplication, Language, Translation, Status)
select Name, UIApplication, @to Language, Translation, 'Copy' Status from #localizationcopy
end

drop table #localizationcopy 
end