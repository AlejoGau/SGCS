--#############################################################################
-- SOFTGUARD DESKTOP
-- updated : 2017-06-15 08:51:37.773 
--#############################################################################

--#############################################################################
-- SOFTGUARD DESKTOP
-- updated : 2017-06-15 08:45:33.850 
--#############################################################################




CREATE OR ALTER PROCEDURE [dbo].[Tables_TecnicoAll]
(
@tec_ccodigo CHAR(3) = null,
@tec_cnombre CHAR(30) = null,
@tec_ctelefono NVARCHAR(30) = null,
@tec_cmail NVARCHAR(60) = null,
@tec_ningreso NUMERIC(1) = null,
@tec_negreso NUMERIC(1) = null,
@tec_cobservaciones NTEXT = null,
@tec_nestado NUMERIC(1) = null
)
AS
	SET NOCOUNT ON
	
	SELECT * FROM _Tablas.dbo.t_tecnicos
	where 1=0 
	 or (@tec_ccodigo is null or tec_ccodigo like  '%' + @tec_ccodigo + '%') or (@tec_cnombre is null or tec_cnombre like  '%' + @tec_cnombre + '%') or (@tec_ctelefono is null or tec_ctelefono like  '%' + @tec_ctelefono + '%') or (@tec_cmail is null or tec_cmail like  '%' + @tec_cmail + '%') or (@tec_cobservaciones is null or tec_cobservaciones like  '%' + cast(@tec_cobservaciones as NVARCHAR(256))+ '%')