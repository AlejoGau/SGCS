--#############################################################################
-- SOFTGUARD DESKTOP
-- updated : 2017-06-15 08:51:37.967 
--#############################################################################

--#############################################################################
-- SOFTGUARD DESKTOP
-- updated : 2017-06-15 08:45:34.053 
--#############################################################################
CREATE OR ALTER PROCEDURE [dbo].[ReporteAutoridadesEventosAutomaticos]
	@rec_iid INT,
	@page INT = 1,               
	@start INT = 0,               
	@limit INT = 50,               
	@sort NVARCHAR(64) = '',            
	@filter NVARCHAR(2048) = '',      
	@token NVARCHAR(128) = '',     
	@_dc NVARCHAR(256) = '',              
	@totalrows INT = 1 OUTPUT  	
AS
	SET NOCOUNT ON
	
	--CUENTA
	DECLARE @iIdRec INT
	DECLARE @IdCuenta INT
	DECLARE @cCodAlarma NVARCHAR(32)		
	DECLARE @cZona NVARCHAR(32)
	SELECT @iIdRec = r.rec_iid, @IdCuenta = r.rec_iidcuenta, @cCodAlarma = r.rec_calarma, @cZona = rec_czona FROM _Datos.dbo.p_recepcion r WHERE rec_iid = @rec_iid				

	--AUTORIDADES
	DECLARE @TMP AS TABLE(RowId INT IDENTITY(1,1) PRIMARY KEY, aut_ccodigo NVARCHAR(32), aut_cdealer NVARCHAR(32),aut_cprovincia NVARCHAR(32))
	DECLARE @ReporteAutoridades AS TABLE(rep_cautoridad NVARCHAR(32), rep_iidcuenta INT, rep_calarma NVARCHAR(32), rep_dfechahora DATETIME, rep_czona NVARCHAR(32), rep_iidrecepcion INT)
	
	INSERT INTO @TMP (aut_ccodigo, aut_cdealer,aut_cprovincia)
	SELECT RTRIM(LTRIM(ISNULL(aut_ccodigo,''))), RTRIM(LTRIM(ISNULL(aut_cdealer,''))), RTRIM(LTRIM(ISNULL(aut_cprovincia,''))) FROM _Tablas.dbo.t_autoridades WHERE CHARINDEX(@cCodAlarma,aut_meventos) > 0

	IF (SELECT COUNT(*) FROM @TMP) != 0
	BEGIN
		  DECLARE @cue_cLinea NVARCHAR(32)
		  DECLARE @cue_cProvincia NVARCHAR(32)
		  SELECT @cue_cLinea = cue_cLinea, @cue_cProvincia = cue_cProvincia FROM _Datos.dbo.m_cuentas Where cue_iid=@IdCuenta		  
		
		  DECLARE @Index INT
		  SET @Index = 1
		  WHILE( (SELECT COUNT(*) FROM @TMP WHERE RowId = @Index)!=0 )
		  BEGIN
				DECLARE @Insert BIT
				SET @Insert = 0				
				
				DECLARE @aut_ccodigo NVARCHAR(32)
				DECLARE @aut_cdealer NVARCHAR(32)
				DECLARE @aut_cprovincia NVARCHAR(32)
				
				SELECT @aut_ccodigo = aut_ccodigo, @aut_cdealer = aut_cdealer, @aut_cprovincia = aut_cprovincia FROM @TMP WHERE RowId = @Index 
				
				IF @aut_cdealer = @cue_cLinea AND @aut_cprovincia = @cue_cProvincia
					SET @Insert = 1

				IF @aut_cdealer = '' AND @aut_cprovincia = @cue_cProvincia
					SET @Insert = 1
				
				IF @aut_cdealer	= @cue_cLinea AND @aut_cprovincia = ''
				   SET @Insert = 1
	
				IF @aut_cdealer = '' AND @aut_cprovincia = ''
					SET @Insert = 1

				IF @Insert = 1
				BEGIN
					INSERT INTO _Datos.dbo.p_reporte_autoridades(rep_cautoridad,rep_iidcuenta,rep_calarma,rep_dfechahora,rep_czona,rep_iidrecepcion)
														  VALUES(@aut_ccodigo, @IdCuenta, @cCodAlarma, GetDate(), @cZona, @iIdRec)
														  
					INSERT INTO @ReporteAutoridades (rep_cautoridad, rep_iidcuenta, rep_calarma, rep_dfechahora, rep_czona, rep_iidrecepcion)
									  VALUES(@aut_ccodigo, @IdCuenta, @cCodAlarma, GetDate(), @cZona, @iIdRec)					
				END														  
				
				SET @Index = @Index + 1
		  END		
	END
	
	--TOTAL ROWS
	SELECT @totalrows = COUNT(*) FROM @ReporteAutoridades
	
	--RETURN INSERTS
	SELECT * FROM @ReporteAutoridades