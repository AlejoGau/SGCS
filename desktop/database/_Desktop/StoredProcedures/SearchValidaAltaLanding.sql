CREATE OR ALTER PROCEDURE [dbo].[SearchValidaAltaLanding]
(
	@imei NVARCHAR(128),
	@autogenerate INT
)
AS
	BEGIN
		DECLARE @plw_token VARCHAR(MAX)=''
		DECLARE @idSmarPanic int=0
		DECLARE @idCuenta int=0
		DECLARE @control bit=1	

		IF @autogenerate = 1
		BEGIN
			SELECT @plw_token = ISNULL(plw_token, '') 
			FROM _Datos..p_landingWorkflow p
			WHERE p.plw_imei = @imei AND p.plw_status = 1

			SELECT @idSmarPanic = ISNULL(s.Id, 0)
			FROM _Datos..SmartPanic s
			WHERE s.Imei = @imei

			IF @plw_token = '' OR @idSmarPanic = 0
			BEGIN
				SET @control=0
			END
		END
		IF @autogenerate = 0
		BEGIN
			SELECT @plw_token = ISNULL(plw_token, '') 
			FROM _Datos..p_landingWorkflow p
			WHERE p.plw_imei = @imei AND p.plw_status = 0
			IF @plw_token = ''
			BEGIN
				SET @control=0
			END
		END

		IF @control = 1
		BEGIN
			SELECT @plw_token
		END
		ELSE
		BEGIN
			SELECT ''
		END
	END