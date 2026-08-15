CREATE OR ALTER PROC [dbo].[verificaInsertaAlarma]
	@minHora varchar(10),
	@maxHora varchar(10),
	@dia varchar(10),
	@evento char(3),
	@idLogin int = 0, 
	@Terminal char(3),
	@tipoAlarma char(3),
	@cuenta int,
	@zona char(3)
AS

SET nocount ON
DECLARE @resultado int
IF not exists (
	SELECT * FROM [_Datos].[dbo].[p_recepcion]
	WHERE rec_iidcuenta = @cuenta
		AND rec_czona = @zona
		AND rec_calarma = @evento
		AND cast(@minhora as datetime) <= CONVERT(nvarchar(20), rec_tfechahora, 108) 
		AND CONVERT(nvarchar(20), rec_tfechahora, 108) <= cast(@maxHora as datetime)
		AND cast(@dia as datetime) = convert(nvarchar(20),rec_tfechahora, 101)
	) 

	SELECT  @resultado=0 
ELSE  
	SELECT @resultado=1
IF @resultado = 0
	BEGIN
		DECLARE @idSQL int
		SELECT @idSQL=0 
		DECLARE @login varchar(20)
		DECLARE @id int
		DECLARE @result int
		SELECT @login = [ope_cnombre], @idSQL= [ope_nsql] from [_Sistema].[dbo].[s_operadores] where [ope_iid] = @idlogin
		SELECT @id = max(rec_iid)+1 from [_Datos].[dbo].[p_recepcion]
		--INSERT INTO [_Datos].[dbo].[p_recepcion] (rec_iid, rec_iidcuenta, rec_calarma, rec_czona, rec_iusuario, rec_tFechaHora, rec_nestado, rec_ioperador, rec_cTerminal, rec_tFechaRecepcion, rec_iMinutosEspera)
		--VALUES (@id, @cuenta, @tipoAlarma, @zona, @idSQL, getdate(), 0, @idLogin, @Terminal, getdate(), 0)
		INSERT INTO [_Datos].[dbo].[p_recepcion] (rec_iid, rec_iidcuenta, rec_calarma, rec_czona, rec_iusuario, rec_tFechaHora, rec_nestado, rec_ioperador, rec_cTerminal, rec_tFechaRecepcion, rec_nOrigen)
		VALUES (@id, @cuenta, @tipoAlarma, '', 0, getdate(), 0, 0, @Terminal, getdate(), 7)

		RETURN 1
	END
ELSE
	RETURN 0