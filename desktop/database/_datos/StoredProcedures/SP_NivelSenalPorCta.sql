CREATE OR ALTER PROCEDURE [dbo].[SP_NivelSenalPorCta] @idCta Int, @cDesde Char(8),@cHasta Char(8)  AS 
--Selecciona los niveles de señal/tension de eventos reales ingresados por IR entre fechas
--Autor .Pablo O. Canónico 16-10-2008
SET NOCOUNT ON
Select 1 As nTipo,AVG(nvs_nNivel) As nNivel,Day(nvs_tfechahora) As dia,Month(nvs_tfechahora) As Mes,Year(nvs_tfechahora) As Anio
   FROM [_Datos].[dbo].[p_nivelsenal]  With (NOLOCK)
	Where nvs_idCuenta = @idCta 
	And ( CONVERT(char(8), nvs_tfechahora,112) >= @cDesde And CONVERT(char(8), nvs_tfechahora,112) <= @cHasta )
	Group By Day(nvs_tfechahora),Month(nvs_tfechahora),Year(nvs_tfechahora)
Union (
Select 2 As nTipo,AVG(nvs_nTension/10) As nNivel,Day(nvs_tfechahora) As dia,Month(nvs_tfechahora) As Mes,Year(nvs_tfechahora) As Anio
   FROM [_Datos].[dbo].[p_nivelsenal]  With (NOLOCK)
	Where nvs_idCuenta = @idCta 
	And ( CONVERT(char(8), nvs_tfechahora,112) >= @cDesde And CONVERT(char(8), nvs_tfechahora,112) <= @cHasta )
	Group By Day(nvs_tfechahora),Month(nvs_tfechahora),Year(nvs_tfechahora)
)
Order By Year(nvs_tfechahora),Month(nvs_tfechahora),Day(nvs_tfechahora)