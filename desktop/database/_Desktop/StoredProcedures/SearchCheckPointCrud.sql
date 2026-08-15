--#############################################################################
-- SOFTGUARD DESKTOP
-- updated : 2017-06-15 08:51:36.200 
--#############################################################################

--#############################################################################
-- SOFTGUARD DESKTOP
-- updated : 2017-06-15 08:45:32.343 
--#############################################################################

CREATE OR ALTER PROCEDURE [dbo].[SearchCheckPointCrud]
@Id Int = 0,
@cue_iid Int,
@zon_cdescripcion NVARCHAR(60) = '',
@zon_mobservacion NTEXT = '',
@chp_cReference Char (100) = '', 
@chp_rLatitud REAL, 
@chp_rLongitud REAL,
@chp_nTipo int,
@chp_iTolerancia int,
@zon_cimagen VARCHAR(60) = '',
@chp_cURL VARCHAR(200) = ''
AS
BEGIN
	-- **********************
	-- FALTA AUDITORIA !!!
	-- **********************

	DECLARE @maxId INT = 0
	SET @maxId = (SELECT top 1 z.zon_ccodigo FROM _datos..m_zonas z WHERE z.zon_iidcuenta = @cue_iid AND ISNUMERIC(z.zon_ccodigo) = 1 ORDER BY CAST(z.zon_ccodigo AS INT)  DESC);
	

	SET @maxId = ISNULL(@maxId, 0)



	SET @maxId = @maxId+1--RIGHT('000'+ISNULL(@max,''),3)
	
	
	DECLARE @maxIds NVARCHAR(5)
	SET @maxIds = CAST(@maxId as NVARCHAR(5))

	IF @Id != 0
		BEGIN

			-- busco el codigo de la zona
			declare @zon_ccodigo char(3);
			select @zon_ccodigo = chp_cZona from _tablas..t_checkpoints_vc where chp_idkey = @id
			-- hay que buscar la zona para obtener el id
			declare @zonId int;
			select @zonId = zon_idKey from _Datos..m_zonas where zon_ccodigo = @zon_ccodigo and zon_iidcuenta = @cue_iid
						
			EXEC ZonaUpd @zonId,'',@cue_iid,@zon_ccodigo,@zon_cdescripcion,'','',@zon_cimagen,@zon_mobservacion,'',0,0,'','',0,''
			
			EXEC t_checkPoints_VCUpd @Id,'',@chp_cReference,@zon_ccodigo, @cue_iid, @chp_rLatitud, @chp_rLongitud,@chp_nTipo,@chp_iTolerancia,@chp_cURL
		END
	ELSE
		BEGIN			
			EXEC ZonaIns '',@cue_iid,@maxId,@zon_cdescripcion,'','','',@zon_mobservacion,'',0,0,'','',0,''

			EXEC t_checkPoints_VCIns '',@chp_cReference, @maxId, @cue_iid, @chp_rLatitud, @chp_rLongitud,@chp_nTipo,@chp_iTolerancia, @chp_cURL
		END
	SELECT 1
END