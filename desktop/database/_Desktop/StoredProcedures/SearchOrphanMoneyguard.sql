--#############################################################################
-- SOFTGUARD DESKTOP
-- updated : 2017-06-15 08:51:38.280 
--#############################################################################

--#############################################################################
-- SOFTGUARD DESKTOP
-- updated : 2017-06-15 08:45:34.263 
--#############################################################################

CREATE OR ALTER PROCEDURE [dbo].[SearchOrphanMoneyguard]
(@idcuenta NVARCHAR(512) = null,
@page INT = 1,               
 @start INT = 0,               
 @limit INT = 50,               
 @sort NVARCHAR(256) = '',   
 @group NVARCHAR(256) = '',            
 @filter NVARCHAR(2048) = '',        
 @_dc NVARCHAR(256) = '')
as
begin
select * from _datos..m_clientes_fc
where cli_icodigo_ID not in (select Account from _datos..Organization)
end