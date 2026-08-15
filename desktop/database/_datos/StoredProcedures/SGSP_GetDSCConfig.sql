CREATE OR ALTER PROCEDURE [dbo].[SGSP_GetDSCConfig]

WITH EXECUTE AS CALLER
AS
--Es el store que ejecuta el servicio de TSPIntegration para obetener configuracion del panel
--Autor :Pablo O. Canónico
--Fecha :31/07/2023

Set NoCount On

Select [pan_iidcuenta],[pan_cConfig]
	From [dbo].[m_Paneles] mp WITH (NOLOCK)
	Inner Join [_Tablas].[dbo].[t_paneles] tp On tp.[pan_ccodigo]=mp.[pan_ccodigo] 
	Inner Join [dbo].[m_estado_cuenta_cab] On [pan_iidcuenta] = [est_iidcuenta] 
Where tp.[pan_iModelo]=14 And [est_nEstado]=0 And [pan_cConfig] Like '%_integrationid%'
Order By [pan_iidcuenta]