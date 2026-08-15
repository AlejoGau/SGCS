CREATE OR ALTER PROCEDURE [dbo].[SGSP_VCAAEnabled]
AS
--Obtiene cantidad de dealers que tienen la opcion AutoAsignacion habilitada
--Autor : Pablo O. Canónico
--Fecha : 26/08/2024

Set NoCount ON

Select Count(*) As Cuantos
	From [_Datos].[dbo].[m_dealer_vcconfig_desnormalized]
Where [aa_Enabled]=1