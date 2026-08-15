--#############################################################################
-- SOFTGUARD DESKTOP
-- updated : 2017-06-15 08:45:36.273 
--#############################################################################

CREATE OR ALTER PROCEDURE [dbo].[SearchUiApplicationUpdate]
(
@page INT = 1,               
 @start INT = 0,               
 @limit INT = 50,               
 @sort NVARCHAR(256) = '',   
 @group NVARCHAR(256) = '',            
 @filter NVARCHAR(2048) = '',        
 @_dc NVARCHAR(256) = '')
as
begin
select u.*, 
(select top 1 CustomData from Bundle b where b.Version = u.Version and b.ObjectId = u.Id and b.ObjectTypeId = 51)
CustomData from UIApplication u
end