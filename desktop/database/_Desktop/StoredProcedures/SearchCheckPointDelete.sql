CREATE OR ALTER PROCEDURE [dbo].[SearchCheckPointDelete]
@Id Int = 0
AS
BEGIN
	
	-- busco el codigo de la zona
	declare @zon_ccodigo char(3);
	select @zon_ccodigo = chp_cZona from _tablas..t_checkpoints_vc where chp_idkey = @id
	-- hay que buscar la zona para obtener el id
	declare @zonId int;
	select @zonId = zon_idKey from _Datos..m_zonas where zon_ccodigo = @zon_ccodigo

	IF exists (
		SELECT [checkpointId] 
		FROM [_Datos].[dbo].[VC_Route_Checkpoints] c
		where c.[checkpointId] = @Id
	)
	BEGIN 
		Raiserror('ERROR: No se puede BORRAR el registro, porque está asignado a una RUTA.',18,1) 
		--RETURN -1
	END 
	ELSE
	BEGIN
		EXEC t_checkPoints_VCDel @Id
		EXEC ZonaDel @zonId			
		
	END
  
END