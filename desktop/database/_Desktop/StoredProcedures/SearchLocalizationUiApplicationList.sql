--#############################################################################
-- SOFTGUARD DESKTOP
-- updated : 2017-06-15 08:45:36.517 
--#############################################################################

CREATE OR ALTER PROCEDURE [dbo].[SearchLocalizationUiApplicationList]
(
 @page INT = 1,               
 @start INT = 0,               
 @limit INT = 50,               
 @sort NVARCHAR(256) = '',   
 @group NVARCHAR(256) = '',            
 @filter NVARCHAR(2048) = '',        
 @_dc NVARCHAR(256) = '',              
 @totalrows INT = 1 OUTPUT     )
as
select distinct uiApplication from _sistema..Localization order by uiApplication