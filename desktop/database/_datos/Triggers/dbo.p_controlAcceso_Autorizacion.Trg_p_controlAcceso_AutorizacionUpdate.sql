-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE OR ALTER TRIGGER [dbo].[Trg_p_controlAcceso_AutorizacionUpdate] ON [dbo].[p_controlAcceso_Autorizacion] AFTER INSERT AS 
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;
--caa_idkey
--@caa_idautorizado
    DECLARE @caa_idkey AS INT
	DECLARE @caa_idautorizado AS INT
	DECLARE @caa_codigo AS VarChar (1024)
	DECLARE @cantidad_insertados AS INT
	SET @cantidad_insertados = (SELECT COUNT(*) FROM inserted )
	if @cantidad_insertados=1
		begin
			SET @caa_codigo = (SELECT caa_codigo FROM inserted )
		end
	if @cantidad_insertados=1 AND @caa_codigo = ''-- esta validacion es para evitar el insert que viene de un bulk insert de proveedores por lotes
		begin
			SET @caa_idkey = (SELECT ins.caa_idkey FROM inserted ins)
			SET @caa_idautorizado = (SELECT ins.caa_idautorizado FROM inserted ins)
			SET @caa_codigo = substring( master.dbo.fn_varbintohexstr(HASHBYTES('MD5'
						, concat(CONVERT(VARCHAR,@caa_idkey)
						,convert(varchar,getDate(),121)
						,convert(varchar,@caa_idautorizado)))),3,32)
			update p_controlAcceso_Autorizacion set caa_codigo=@caa_codigo
				where caa_idkey = @caa_idkey
		end

	

END