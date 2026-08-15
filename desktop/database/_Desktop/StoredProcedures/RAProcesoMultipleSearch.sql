-- =============================================
-- Author:		Rodrigo Román
-- Create date: 17/02/2020
-- Description:	Procesa eventos multiples reporte autoridades
-- =============================================
CREATE OR ALTER PROCEDURE [dbo].[RAProcesoMultipleSearch]
	-- Add the parameters for the stored procedure here
	@rep_iid int
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Proceso todos los eventos asociados a la autoridad iguales al id recibido
	-- busco todos los eventos iguales al recibido
	declare @rep_iidcuenta int
	declare @rep_calarma varchar(10)
	declare @rep_cautoridad char(3)
	declare @rep_mcomentario varchar(max)
	declare @rep_nestado int
	declare @rep_dresolfechahora datetime
	select @rep_iidcuenta = rep_iidcuenta
		,@rep_calarma = rep_calarma
		,@rep_cautoridad=rep_cautoridad 
		,@rep_mcomentario = rep_mcomentario
		,@rep_nestado = rep_nestado
		,@rep_dresolfechahora = rep_dresolfechahora
		from _Datos.dbo.p_reporte_autoridades where rep_iid = @rep_iid

	print '[RAProcesoMultipleSearch] @rep_iidcuenta'
	print @rep_iidcuenta
	print '[RAProcesoMultipleSearch] @rep_calarma'
	print @rep_calarma
	print '[RAProcesoMultipleSearch] @rep_cautoridad'
	print @rep_cautoridad

	update _Datos.dbo.p_reporte_autoridades
		set rep_mcomentario = @rep_mcomentario,
		rep_nestado = @rep_nestado,
		rep_dresolfechahora = @rep_dresolfechahora
		where @rep_iidcuenta = rep_iidcuenta AND @rep_calarma = rep_calarma AND @rep_cautoridad=rep_cautoridad
		AND rep_nestado = 0
END