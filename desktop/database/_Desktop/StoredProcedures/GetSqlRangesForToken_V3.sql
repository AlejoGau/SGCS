CREATE OR ALTER PROCEDURE [dbo].[GetSqlRangesForToken_V3]
    @token NVARCHAR(128) = '',
    @HasDataOutput BIT = 0 OUTPUT
AS
BEGIN
    SET NOCOUNT ON;
    
    DECLARE @cDebug CHAR(2) = 'No'
    DECLARE @UserId INT
	DECLARE @Message NVARCHAR(MAX) = ''
    
    -- Load Security
    SELECT @UserId = dbo.GetUserIdByToken(@token)
    
    IF (@UserId IS NULL OR @UserId = 0)
    BEGIN
		SET @Message = N'[GetSqlRangesForToken_V2] Token Invalido: ' + @token
        RAISERROR(@Message, 10, 1) WITH NOWAIT
        SET @HasDataOutput = 0
        RETURN
    END
    
    -- Cargar todos los módulos (mismo código que tenías)
    DECLARE @HasAdministratorModule INT 
    SELECT @HasAdministratorModule = dbo.UserDesktopWebHasModule(@UserId, 'Administrator')
    
    DECLARE @HasWebManagerModule INT 
    SELECT @HasWebManagerModule = dbo.UserDesktopWebHasModule(@UserId, 'WebManager')
    
    DECLARE @HasWebRemotoModule INT 
    SELECT @HasWebRemotoModule = dbo.UserDesktopWebHasModule(@UserId, 'WebRemoto')
    
    DECLARE @HasDealerModule INT 
    SELECT @HasDealerModule = dbo.UserDesktopWebHasModule(@UserId, 'WebDealer')
    
    DECLARE @HasMasterDealerModule INT 
    SELECT @HasMasterDealerModule = dbo.UserDesktopWebHasModule(@UserId, 'MasterWebDealer')
    
    DECLARE @HasTrackguardModule INT 
    SELECT @HasTrackguardModule = dbo.UserDesktopWebHasModule(@UserId, 'TrackGuard')
    
    DECLARE @HasSmarttrackModule INT 
    SELECT @HasSmarttrackModule = dbo.UserDesktopWebHasModule(@UserId, 'VigiControl')
    
    DECLARE @HasCleanAppModule INT 
    SELECT @HasCleanAppModule = dbo.UserDesktopWebHasModule(@UserId, 'CleanApp')
    
    DECLARE @HasSmartpanicsModule INT 
    SELECT @HasSmartpanicsModule = dbo.UserDesktopWebHasModule(@UserId, 'SmartPanics')
    
    DECLARE @HasTrackGuardMonitoreoModule INT 
    SELECT @HasTrackGuardMonitoreoModule = dbo.UserDesktopWebHasModule(@UserId, 'TrackGuardMonitoreo')
    
    DECLARE @HasSerTecModule INT 
    SELECT @HasSerTecModule = dbo.UserDesktopWebHasModule(@UserId, 'SerTec')
    
    DECLARE @HasAwccModule INT 
    SELECT @HasAwccModule = dbo.UserDesktopWebHasModule(@UserId, 'AWCC')
    
    DECLARE @HasAccessControlModule INT 
    SELECT @HasAccessControlModule = dbo.UserDesktopWebHasModule(@UserId, 'SgAppAccessControl')
    
    DECLARE @HasWebmonRanges INT 
    DECLARE @webmonsecurity NVARCHAR(MAX)
    SELECT @webmonsecurity = ums_data 
    FROM _Sistema.dbo.UsersDesktopWebModulosSecurity 
    WHERE ums_idWeb = @UserId AND ums_idModules = 2
    
    SET @HasWebmonRanges = 0;
    IF PATINDEX('%porrango%', @webmonsecurity) > 0
        SET @HasWebmonRanges = 1;
    
    -- LÓGICA PRINCIPAL
    IF (@HasDealerModule = 1 
        OR @HasTrackguardModule = 1 
        OR @HasTrackGuardMonitoreoModule = 1
        OR @HasSmarttrackModule = 1
        OR @HasSmartpanicsModule = 1
        OR @HasSerTecModule = 1
        OR @HasMasterDealerModule = 1
        OR @HasWebmonRanges = 1
        OR @HasWebManagerModule = 1
        OR @HasCleanAppModule = 1
        OR @HasAwccModule = 1
        OR @HasAccessControlModule = 1)
        AND @HasAdministratorModule != 1
	BEGIN
		-- Verificamos si el usuario tiene permisos pre-calculados
		DECLARE @RowsInserted INT = 0
    
		-- Verificar si tiene registros en UserAccountAccess
		IF EXISTS(SELECT 1 FROM _Sistema.dbo.UserAccountAccess WHERE uaa_userId = @UserId)
		BEGIN
			-- Usuario tiene permisos específicos - copiarlos
			INSERT INTO #FilteredAccounts (cue_iid)
			SELECT uaa_cue_iid
				FROM _Sistema.dbo.UserAccountAccess
				WHERE uaa_userId = @UserId
        
			SET @RowsInserted = @@ROWCOUNT
			SET @HasDataOutput = 1
		END
		ELSE
		BEGIN
			-- Usuario no tiene registros en UserAccountAccess
			-- Verificar si tiene acceso total
			IF (@HasWebRemotoModule = 1 OR @HasAdministratorModule = 1)
			BEGIN
				-- Tiene acceso total
				INSERT INTO #FilteredAccounts (cue_iid) VALUES (-1)
				SET @HasDataOutput = 1
			END
			ELSE
			BEGIN
				-- No tiene acceso a nada
				SET @HasDataOutput = 0
			END
		END
	END
    ELSE
    BEGIN
        -- Verificar si tiene acceso total
        IF @HasAdministratorModule = 1 OR @HasWebRemotoModule = 1
        BEGIN
            INSERT INTO #FilteredAccounts (cue_iid) VALUES (-1)
            SET @HasDataOutput = 1
        END
        ELSE
        BEGIN
            SET @HasDataOutput = 0
        END
    END
END