-- =============================================
-- Author:		Rodrigo Román
-- Create date: 02/09/2020
-- Description:	agrega comentario en tabla de intercambio para Kasafuerte
-- =============================================
CREATE OR ALTER TRIGGER [dbo].[KasaFuerte_finObservaciones]
   ON  dbo.sertectimeline
   AFTER insert
AS 
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    declare @iservicio int;
	declare @observacion varchar(max);
	declare @stl_cAccion varchar (100) = ''
    
	select top 1 @iservicio = [stl_iServicio]
      ,@stl_cAccion = [stl_cAccion]
      ,@observacion = [stl_cObservacion]
	FROM inserted

	if @stl_cAccion = 'Finalizado'
	BEGIN 
		update [_SharedDB].[dbo].[SG_SAP] set observacion_cierre = @observacion where numatcard = @iservicio
	END

END