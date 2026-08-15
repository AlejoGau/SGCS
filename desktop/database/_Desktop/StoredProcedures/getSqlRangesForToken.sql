--#############################################################################
-- SOFTGUARD DESKTOP
-- updated : 2017-06-15 08:51:36.870 
-- 2023-11-28 : Pablo se agrego control de @HasAccessControlModule para el uso de un guardia que no usa rangos pero solo utiliza el modulo Control de Accesos (DSS-876)
--#############################################################################
CREATE OR ALTER PROCEDURE [dbo].[getSqlRangesForToken]
 @table NVARCHAR(128) = '',
 @token NVARCHAR(128) = '',
 @SqlFilterRango NVARCHAR(MAX) OUTPUT,
 @alias NVARCHAR(10) = ''
AS
BEGIN

/***
@token = Token del usuario para tomar el rango
@alias = es string para acoplar con el store que lo utiliza
@SqlFilterRango = output

**** CODIGO DE IMPLEMENTACION ****

 --RANGOS 
DECLARE @SqlFilterRango AS NVARCHAR(max)
EXEC getSqlRangesForToken @token = @token, @alias = 'o.', @SqlFilterRango = @SqlFilterRango OUTPUT

SET @SqlFilter = @SqlFilter + @SqlFilterRango

*/

Declare @cDebug Char(2) = 'No'		--'Si' 
 DECLARE @Sql NVARCHAR(MAX)   
 set @Sql = '';

 IF @cDebug = 'Si'
	Print 'Load Security'

--Load Security    
 DECLARE @UserId INT    
 SELECT @UserId = dbo.GetUserIdByToken(@token)
 
 IF @cDebug = 'Si'
	Print @UserId 

 if (@UserId is null OR @UserId = 0)
 BEGIN
	print ('[getSqlRangesForToken] Token Invalido:' +@token)
	select @SqlFilterRango = ' AND 1=2 '
	set noexec on
 END
     
 DECLARE @HasAdministratorModule INT 
 SELECT @HasAdministratorModule = dbo.UserDesktopWebHasModule(@UserId, 'Administrator') 
 IF @cDebug = 'Si'
 Begin
	Print '@HasAdministratorModule'
	Print @HasAdministratorModule
 End
 DECLARE @HasWebManagerModule INT 
 SELECT @HasWebManagerModule = dbo.UserDesktopWebHasModule(@UserId, 'WebManager')  
 IF @cDebug = 'Si'
 Begin
	Print '@HasWebManagerModule'
	Print @HasWebManagerModule
 End
 
 DECLARE @HasWebRemotoModule INT 
 SELECT @HasWebRemotoModule = dbo.UserDesktopWebHasModule(@UserId, 'WebRemoto') 
 IF @cDebug = 'Si'
 Begin
	Print '@HasWebRemotoModule'
	Print @HasWebRemotoModule
 End
 
 DECLARE @HasDealerModule INT 
 SELECT @HasDealerModule = dbo.UserDesktopWebHasModule(@UserId, 'WebDealer')
 IF @cDebug = 'Si'
 Begin
	Print '@HasDealerModule'
	Print @HasDealerModule
 End

 DECLARE @HasMasterDealerModule INT 
 SELECT @HasMasterDealerModule = dbo.UserDesktopWebHasModule(@UserId, 'MasterWebDealer')
 IF @cDebug = 'Si'
 Begin
	Print '@HasMasterDealerModule'
	Print @HasMasterDealerModule
 End
 
 DECLARE @HasTrackguardModule INT 
 SELECT @HasTrackguardModule = dbo.UserDesktopWebHasModule(@UserId, 'TrackGuard') 
 IF @cDebug = 'Si'
 Begin
	Print '@HasTrackguardModule'
	Print @HasTrackguardModule
 End

 DECLARE @HasSmarttrackModule INT 
 SELECT @HasSmarttrackModule = dbo.UserDesktopWebHasModule(@UserId, 'VigiControl')  
 IF @cDebug = 'Si'
 Begin
	Print '@HasSmarttrackModule'
	Print @HasSmarttrackModule
 End

 DECLARE @HasCleanAppModule INT 
 SELECT @HasCleanAppModule = dbo.UserDesktopWebHasModule(@UserId, 'CleanApp')  
 IF @cDebug = 'Si'
 Begin
	Print '@HasCleanAppModule'
	Print @HasCleanAppModule
 End

 DECLARE @HasSmartpanicsModule INT 
 SELECT @HasSmartpanicsModule = dbo.UserDesktopWebHasModule(@UserId, 'SmartPanics')
 IF @cDebug = 'Si'
 Begin
	Print '@HasSmartpanicsModule'
	Print @HasSmartpanicsModule
 End

 DECLARE @HasTrackGuardMonitoreoModule INT 
 SELECT @HasTrackGuardMonitoreoModule = dbo.UserDesktopWebHasModule(@UserId, 'TrackGuardMonitoreo')  
 IF @cDebug = 'Si'
 Begin
	Print '@HasTrackGuardMonitoreoModule'
	Print @HasTrackGuardMonitoreoModule
 End

 DECLARE @HasSerTecModule INT 
 SELECT @HasSerTecModule = dbo.UserDesktopWebHasModule(@UserId, 'SerTec') 
 IF @cDebug = 'Si'
 Begin
	Print '@HasSerTecModule'
	Print @HasSerTecModule
 End

 DECLARE @HasAwccModule INT 
 SELECT @HasAwccModule = dbo.UserDesktopWebHasModule(@UserId, 'AWCC') 
 IF @cDebug = 'Si'
 Begin
	Print '@HasAwccModule'
	Print @HasAwccModule
 End

 DECLARE @HasAccessControlModule INT 
 SELECT @HasAccessControlModule = dbo.UserDesktopWebHasModule(@UserId, 'SgAppAccessControl') 
 IF @cDebug = 'Si'
 Begin
	Print '@HasAccessControlModule'
	Print @HasAccessControlModule
 End

 -- Video no es un modulo con filtro de rango
 -- DECLARE @HasVideoModule INT 
 -- SELECT @HasAwccModule = dbo.UserDesktopWebHasModule(@UserId, 'Video') 

 -- se saca control de rangos para webreport BC 406582514
 --DECLARE @HasWebReportModule INT 
 --SELECT @HasWebReportModule = dbo.UserDesktopWebHasModule(@UserId, 'SgAppWebReport') 

 DECLARE @HasWebmonRanges INT 
 DECLARE @webmonsecurity NVARCHAR(MAX)

 SELECT @webmonsecurity = ums_data FROM _Sistema.dbo.UsersDesktopWebModulosSecurity WHERE ums_idWeb = @UserId AND ums_idModules = 2

 SET @HasWebmonRanges = 0;
 if PATINDEX('%porrango%',@webmonsecurity) > 0
	SET @HasWebmonRanges = 1;

 IF @cDebug = 'Si'
	Print 'Busco rangos para el token: '+@token

 DECLARE @HasRanges INT 

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
	--OR @HasVideoModule = 1
	Or @HasAccessControlModule = 1
	)
	AND (@HasAdministratorModule != 1 OR @table='eventospendientes')
 BEGIN
	IF @cDebug = 'Si'
		Print ('Load Ranges by User')

	DECLARE @Ranges TABLE (id INT IDENTITY(1,1), dealer NVARCHAR(3), desde NVARCHAR(4), hasta NVARCHAR(4))
	
	INSERT INTO @Ranges (dealer, desde, hasta)
	SELECT um.dwm_dealer, um.dwm_cuenta_desde, um.dwm_cuenta_hasta
	  FROM _Sistema.dbo.UsersDesktopWebModulos um
	       --INNER JOIN _Sistema.dbo.UsersDesktopModules m ON m.udm_idKey = um.dwm_idModules
	 WHERE um.dwm_idWeb = @UserId
	 and (dwm_dealer != '' and dwm_cuenta_desde != '' and dwm_cuenta_hasta != '')

	 if ((select count(*) from @Ranges) = 0)
	 BEGIN
		IF @cDebug = 'Si'	
			Print('no tiene rangos tengo que ver que tipo de usuario es')

		if (@HasWebRemotoModule = 1 OR @HasAdministratorModule=1)
		BEGIN
			IF @cDebug = 'Si'
				Print('tiene webremoto no hago nada')

			SET @Sql = @Sql;
		END
		ELSE
		BEGIN
			IF @cDebug = 'Si'
				Print('no tiene web remoto, no tiene rangos no ve nada')

			SET @Sql += ' AND 1=2 '
		END
	 END
	 ELSE
	 BEGIN
		IF @cDebug = 'Si'
			Print('hay rangos sumo los filtros')
		 
		 --Each
		 SET @Sql += ' AND ( 1=2 '

		 DECLARE @Pos INT
		 SET @Pos = 1
		 WHILE( (SELECT COUNT(*) FROM @Ranges WHERE id = @Pos) != 0)
		 BEGIN
			DECLARE @DealerLinea NVARCHAR(3)
			DECLARE @DealerDesde NVARCHAR(4)
			DECLARE @DealerHasta NVARCHAR(4)
		
			SELECT @DealerLinea = dealer, @DealerDesde = ISNULL(desde, ''), @DealerHasta = ISNULL(hasta,'') FROM @Ranges WHERE id = @Pos		
			
			IF @DealerDesde = '' OR @DealerHasta = ''	
			BEGIN
				SET @Sql += ' OR ('+@alias+'cue_clinea = ''' + @DealerLinea + ''' ) ' 
				SET @Sql += ' OR ('+@alias+'cue_cMadreLinea = ''' + @DealerLinea + ''' ) ' -- DEDALO 06/03/2020 agrego al rango las particiones de la cuenta madre
			END
			ELSE
			BEGIN
				SET @Sql += ' OR ('+@alias+'cue_clinea = ''' + @DealerLinea + ''' AND '+@alias+'cue_ncuenta BETWEEN ''' + @DealerDesde + ''' AND ''' + @DealerHasta + ''') '	
				SET @Sql += ' OR ('+@alias+'cue_cMadreLinea = ''' + @DealerLinea + ''' AND '+@alias+'cue_cMadreCuenta BETWEEN ''' + @DealerDesde + ''' AND ''' + @DealerHasta + ''') '	
			END
		
			SET @Pos = @Pos + 1
		 END
		
		 SET @Sql += ' )'
		
	 END

 END   
 else 
	begin
		IF @cDebug = 'Si'
			print 'NO tiene ningun modulo asignado'

		if @HasAdministratorModule != 1 and @HasWebRemotoModule != 1 and @HasWebmonRanges!=1 and @HasAccessControlModule!=1
			Select @Sql = ' AND 1=2 '
	end

IF @cDebug = 'Si'
	Print cast (@Sql as NTEXT)

SET @SqlFilterRango = @Sql
set noexec off

END