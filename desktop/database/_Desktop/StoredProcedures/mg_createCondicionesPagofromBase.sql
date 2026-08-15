-- =============================================
-- Author:		Rodrigo Román
-- Create date: 26/02/2020
-- Description:	Genera una Condicion de pago por cada forma de pago de la tabla t_formapago_fc
-- =============================================
CREATE OR ALTER PROCEDURE [dbo].[mg_createCondicionesPagofromBase]
	@idorganizacion int
AS
BEGIN
	
	SET NOCOUNT ON;

	print '[mg_createCondicionesPagofromBase]'

	INSERT INTO [_Tablas].[dbo].[t_condiciones_pago_fc]
           ([con_ccodigo]
           ,[con_cdescripcion]
           ,[con_ncuotas]
           ,[con_idias]
           ,[con_ifrecuencia]
           ,[con_nPideDatos]
           ,[con_nCobranzaAut]
           ,[con_cCodigoBarra]
           ,[con_iRemesa]
           ,[con_cDatosExtra]
           ,[con_cFormaPagoCobrAut]
           ,[con_orgidcodigoid])
     select Distinct
           [fpg_ccodigo]
           ,fpg_cdescripcion
           ,1
           ,0
           ,0
           ,0
           ,0
           ,0
		   ,0
		   ,''
		   ,[fpg_ccodigo]
           ,@idorganizacion
	from _tablas..t_formas_pago_fc
	where [fpg_ccodigo] not in (select [con_ccodigo] from _tablas..[t_condiciones_pago_fc] where [con_orgidcodigoid] = @idorganizacion)

	select * from [_Tablas].[dbo].[t_condiciones_pago_fc]

END