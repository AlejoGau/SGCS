--#############################################################################
-- SOFTGUARD DESKTOP
-- updated : 2017-06-15 08:51:39.583 
--#############################################################################

CREATE OR ALTER PROCEDURE [dbo].[Trackguard_ComandosForEquipos]  
 @Id INT,  
 @tcm_iid int = 0,
 @idmodelo int = 0,
 @page INT = 1,                 
 @start INT = 0,                 
 @limit INT = 50,                 
 @sort NVARCHAR(64) = '',              
 @filter NVARCHAR(2048) = '',         
 @token NVARCHAR(128) = '',       
 @_dc NVARCHAR(256) = '',                
 @totalrows INT = 1 OUTPUT,
 -- BC 384713978
 @idNvoModelo INT = 0
AS  


DECLARE @Sql NVARCHAR(MAX)
SET @Sql = 'SELECT * 
				FROM _tablas..[t_comandos] o
			WHERE [tcm_iReceptor] =' + convert(varchar(10), @Id)  

if (@tcm_iid>0)
BEGIN
	set @Sql = @Sql + ' and tcm_iid='+ convert(varchar(10),@tcm_iid)
END

if (@idmodelo>0)
BEGIN
	set @Sql = @Sql + ' and (tcm_rpmidKey='+ convert(varchar(10),@idmodelo) +' or tcm_rpmidKey is null)' -- saco tcm_rpmidKey=0 pedido por Pablo 22/11/20129
END

Declare @dll varchar(50) = ''
Select @dll=rec_cdll From _Datos.dbo.m_receptores_cab Where  rec_iid=@Id
If @dll = 'NtComPacketParser'
	Begin
		--2023-10-31 Pablo. Para NTCOM TCP-PROTOCOL si en [dbo].[T_PanelesModelos] no hay modelo se pasa con valor 0 y TIENE que filtrar
		IF (@idNvoModelo>0)
			SET @Sql = @Sql + ' and (tcm_iModeloPanel='+ convert(varchar(10),@idNvoModelo) +' )'
	End
Else
Begin
	IF (@idNvoModelo>0)
		SET @Sql = @Sql + ' and (tcm_iModeloPanel='+ convert(varchar(10),@idNvoModelo) +' )'
END

/*
print '----'
print CAST(@Sql AS VARCHAR(MAX))
*/
execute (@Sql)