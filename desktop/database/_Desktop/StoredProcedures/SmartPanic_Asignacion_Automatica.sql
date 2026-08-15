-- =============================================
-- Author:		Rodrigo Román
-- Create date: 05/11/2018
-- Description:	Creacion de usuario por alta directa desde APP SmartPanic
-- =============================================
CREATE OR ALTER PROCEDURE [dbo].[SmartPanic_Asignacion_Automatica]
	@id INT,
    @nombre varchar(60),
    @telefono varchar(128)

AS
BEGIN
	SET NOCOUNT ON;

    declare @dealer char(3) = 'URS';
    declare @plantillaSP varchar(3) = '_SP';
	declare @groupMax varchar(3) = 2;
    declare @automonitoreo varchar(2) = 'si';
    declare @diasprueba int = 90;
    declare @cuentatipo varchar(128) = '009';
    declare @enviarEmail varchar(2) = 'no';
    declare @crearSP VARCHAR(256) = 'false';
    declare @awcc INT = 0;
	
    -- Llamo al SP de AltaLanding para la creacion del usuario
    EXEC AltaLandingSearch 
        @dealer = @dealer, 
        @plantillaSP = @plantillaSP, 
        @groupMax = @groupMax, 
        @automonitoreo = @automonitoreo, 
        @diasprueba = @diasprueba, 
        @cuentatipo = @cuentatipo, 
        @enviarEmail = @enviarEmail, 
        @crearSP = @crearSP, 
        @awcc = @awcc,
        @nombre = @nombre,
        @telefono = @telefono,
        @SPcreado = @id,

        @email = null,
        @pais = null,
        @provincia = 1,
        @mailTo = null,
        @mailSubject = null,
        @mailBody = null,
        @mailSubjectCustomer = null,
	    @mailBodyCustomer = null,
        @cuentaCreada = null,
	    @cuentaSPCreada = null

END