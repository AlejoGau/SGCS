CREATE OR ALTER PROCEDURE [dbo].[SGSP_GetJsonVehicleData]
    @iCta INT
AS
BEGIN
    SET NOCOUNT ON;

	Select d.[Year] As anio,d.[Colour] As color,Replace(d.[Domain],' ','') As id,Cast([gps_rLatitud] As Decimal(9,5)) As latitud,Cast([gps_rLongitud] As Decimal(9,5)) As longitud,
			IsNull(b.[Name],'') As marca,IsNull(v.[Name],'') As modelo,c.[cue_cobservacion] As observacion,IsNull(t.[tip_cdescripcion],'') As tipo
	From [_Datos].[dbo].[m_cuentas] c
		Inner Join [_Datos].[dbo].[DispositivoMovil] d On  d.[OwnerId]=c.[cue_iid]
		Inner Join [_Datos].[dbo].[p_gps] g On g.[gps_cIMEI]=c.[cue_cimei]
		Left Join [_Tablas].[dbo].[t_tipos] t On t.[tip_ccodigo]=c.[cue_ctipo]
		Left Join [_Tablas].[dbo].[VehicleBrand] b On b.[Id] = d.[VehicleBrand]
		Left Join [_Tablas].[dbo].[VehicleModel] v On v.[Id] = d.[VehicleModel]
	Where c.[cue_iid] = @iCta
	For JSON PATH, WITHOUT_ARRAY_WRAPPER

END