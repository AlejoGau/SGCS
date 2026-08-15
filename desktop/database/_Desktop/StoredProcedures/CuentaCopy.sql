--#############################################################################
-- SOFTGUARD DESKTOP
-- updated : 2017-06-15 08:51:36.603 
--#############################################################################

CREATE OR ALTER PROCEDURE [dbo].[CuentaCopy]  
	@token NVARCHAR(128) = '',      
	@cue_clinea CHAR (3),      
	@cue_ncuenta CHAR (10),      
	@cue_cnombre NVARCHAR(60), 
	@cue_iid NVARCHAR(11),
	@skipTabPrincipal int = 0,
	@skipTabUsuarios int = 0,
	@skipTabContactos int = 0,
	@skipTabZonas int = 0,
	@skipTabNotas int = 0,
	@skipTabHorarios int = 0,
	@skipTabInformacionMedica int = 0,
	@skipTabNotificaciones int = 0,
	@skipTabFalsa int = 0,
	@skipTabTest int = 0,
	@skipTabPaneles int = 0,
	@setParticionInfo int = 0,
	@failIfExists int = 0,
	@isPartition int = 0,
	@skipSchedule int = 0,
	@skipVideoLink int = 1,
	@skipEstadosDinamicos int = 1,	--DEFAULT estaba en 0
	@skipControlEstadoPanel int = 1
AS      
SET NOCOUNT ON
	
Declare @message VarChar(Max) = '',
		@StartDateTimeText VarChar(Max) = ''

Declare @UserId int
Select @UserId = dbo.GetUserIdByToken(@token)

Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
Set @message = 'Start DateTime : %s | [CuentaCopy] | UserId = '+Convert(Varchar(10),@UserId)
RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

Declare @udw_usuario varchar(50) 
Select @udw_usuario = udw_usuario from _sistema..UsersDesktopWeb where udw_idKey = @UserId
If @udw_usuario = '' Or @udw_usuario  Is Null
	Set @udw_usuario = 'notlogged@softguard.com'

Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
Set @message = 'Start DateTime : %s | [CuentaCopy] | udw_usuario = '+@udw_usuario
RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

--Validate
DECLARE @CuentaExists INT     
SELECT @CuentaExists = COUNT(*) FROM _Datos.dbo.m_cuentas WHERE cue_clinea = @cue_clinea AND cue_ncuenta = @cue_ncuenta  

Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
Set @message = 'Start DateTime : %s | [CuentaCopy] | CuentaExists = '+Convert(Varchar(10),@CuentaExists)
RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
	
declare @DoCopy int = 1
declare @TargetId int = 0
          
IF @CuentaExists != 0
begin
	if(@failIfExists = 1)
	begin
		SELECT 1 AS Codigo, 'DealerCuentaExiste' AS Descripcion  
		set @DoCopy = 0
	end
	else
	begin
		set @DoCopy = 1
		select @TargetId = cue_iid FROM _Datos.dbo.m_cuentas WHERE cue_clinea = @cue_clinea AND cue_ncuenta = @cue_ncuenta   
	end
end

Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
Set @message = 'Start DateTime : %s | [CuentaCopy] | DoCopy = '+Convert(Varchar(10),@DoCopy) + '| TargetId = '+Convert(Varchar(10),@TargetId)
RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT          
--Insert
IF @DoCopy = 1
BEGIN
	DECLARE @iid INT      
		
	if (@TargetId != 0)
	begin
		set @iid = @TargetId
		if (@skipTabPrincipal = 0)
		begin
			declare @cue_ccalle [varchar](80)
			declare @cue_clocalidad[varchar](40)
			declare @cue_cprovincia[char](3)
			declare @cue_ccodigopostal[varchar](8)
			declare @cue_ccallecorreo[varchar](80)
			declare @cue_clocalidadcorreo[varchar](40)
			declare @cue_cprovinciacorreo[char](3)
			declare @cue_ccodigopostalcorreo[varchar](8)
			declare @cue_ctelefono[varchar](30)
			declare @cue_cclave[varchar](40) 
			declare @cue_cpermiso[varchar](40) 
			declare @cue_ctipo[char](3)
--			declare @cue_cubicacion[text]
			declare @cue_nparticion int
--			declare @cue_cobservacion[text]
			declare @cue_cfoto[varchar](60)
			declare @cue_dfechaalta[datetime]
			declare @cue_dservicio[datetime]
			declare @cue_nmostrar[numeric](1, 0)
			declare @cue_nsonidoul[numeric](1, 0)
			declare @cue_nllaveul[numeric](1, 0)
			declare @cue_cemail[varchar](150) 
			declare @cue_cinstalador[char](3)
			declare @cue_cIMEI[varchar](20)
			declare @cue_cLatLng[varchar](30)
			declare @cue_nEfectiva[numeric](1, 0)
			declare @cue_cIdExtendido[varchar](100)
			declare @cue_iZonaHoraria[int]
			declare @cue_cPartitionInfo[varchar](max)
			declare @cue_nAutoMonitoreo[numeric](1, 0)
			declare @cue_nPrioridad[numeric](1, 0)
			
			select @cue_cnombre = cue_cnombre
				,@cue_ccalle = cue_ccalle
				,@cue_clocalidad = cue_clocalidad
				,@cue_cprovincia = cue_cprovincia
				,@cue_ccodigopostal = cue_ccodigopostal
				,@cue_ccallecorreo = cue_ccallecorreo
				,@cue_clocalidadcorreo = cue_clocalidadcorreo
				,@cue_cprovinciacorreo = cue_cprovinciacorreo
				,@cue_ccodigopostalcorreo = cue_ccodigopostalcorreo
				,@cue_ctelefono = cue_ctelefono
				,@cue_cclave = cue_cclave
				,@cue_cpermiso = cue_cpermiso
				,@cue_ctipo = cue_ctipo
				--,@cue_cubicacion = cue_cubicacion
				,@cue_nparticion = @cue_iid
			--	,@cue_cobservacion = cue_cobservacion
				,@cue_cfoto = cue_cfoto
				,@cue_dfechaalta = getdate()--cue_dfechaalta
				,@cue_dservicio = cue_dservicio
				,@cue_nmostrar = cue_nmostrar
				,@cue_nsonidoul = cue_nsonidoul
				,@cue_nllaveul = cue_nllaveul
				,@cue_cemail = cue_cemail
				,@cue_cinstalador = cue_cinstalador
				,@cue_cIMEI = ''--cue_cIMEI
				,@cue_cLatLng = cue_cLatLng
				,@cue_cPartitionInfo = @cue_iid
				,@cue_nAutoMonitoreo = cue_nAutoMonitoreo
				,@cue_nPrioridad = cue_nPrioridad
				from _datos..m_cuentas
				WHERE cue_iid = @cue_iid
				
			if(@setParticionInfo != 1)
			begin
				set @cue_cPartitionInfo = 0
				set @cue_nparticion = 0
			end
			
			update _datos..m_cuentas 
				set cue_cnombre = @cue_cnombre
				,cue_ccalle = @cue_ccalle
				, cue_clocalidad = @cue_clocalidad
				, cue_cprovincia = @cue_cprovincia
				, cue_ccodigopostal = @cue_ccodigopostal
				, cue_ccallecorreo = @cue_ccallecorreo
				, cue_clocalidadcorreo = @cue_clocalidadcorreo
				, cue_cprovinciacorreo = @cue_cprovinciacorreo
				, cue_ccodigopostalcorreo = @cue_ccodigopostalcorreo
				, cue_ctelefono = @cue_ctelefono
				, cue_cclave = @cue_cclave
				, cue_cpermiso = @cue_cpermiso
				, cue_ctipo = @cue_ctipo
				--, cue_cubicacion = @cue_cubicacion
				, cue_nparticion = @cue_nparticion
				--, cue_cobservacion = @cue_cobservacion
				, cue_cfoto = @cue_cfoto
				--, cue_dfechaalta = @cue_dfechaalta
				, cue_dservicio = @cue_dservicio
				, cue_nmostrar = @cue_nmostrar
				, cue_nsonidoul = @cue_nsonidoul
				, cue_nllaveul = @cue_nllaveul
				, cue_cemail = @cue_cemail
				, cue_cinstalador = @cue_cinstalador
				, cue_cIMEI = @cue_cIMEI
				, cue_cLatLng = @cue_cLatLng
				, cue_cPartitionInfo = @cue_cPartitionInfo
				, cue_nAutoMonitoreo = @cue_nAutoMonitoreo
				, cue_nPrioridad = @cue_nPrioridad
				WHERE cue_iid = @iid
				
		End
	End
	Else
	Begin
		Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
		Set @message = 'Start DateTime : %s | [CuentaCopy] | Cuenta Destino No Existe. Se crea'
		RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT   
			
		--SELECT @iid = par_ivalor+1 From _Tablas.dbo.t_parametros (UPDLOCK) Where par_cCodigo='M_CUENTAS'     
		--UPDATE _Tablas.dbo.t_parametros SET par_ivalor = @iid Where par_cCodigo='M_CUENTAS'  
		--Lo mismo que se hizo en CuentaIns
		SELECT @iid = MAX(cue_iid) + 1 FROM [_Datos].[dbo].[m_cuentas]   
		IF EXISTS (SELECT [rec_iidcuenta] FROM [_Datos].[dbo].[p_recepcion] WHERE [rec_iidcuenta] = @iid)
			Set @iid += 10

		IF EXISTS (SELECT [est_iidcuenta] FROM [_Datos].[dbo].[m_estado_cuenta_cab] WHERE [est_iidcuenta] = @iid)
			Set @iid += 5

		UPDATE [_Tablas].[dbo].[t_parametros] SET [par_ivalor] = @iid WHERE [par_cCodigo] = 'M_CUENTAS'
			
		Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
		Set @message = 'Start DateTime : %s | [CuentaCopy] | CuentaID Destino = '+Convert(Varchar(10),@iid)
		RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT       

		set @cue_cPartitionInfo = ''
		set @cue_nparticion = 0
			
		if(@setParticionInfo = 1)
		begin
			set @cue_cPartitionInfo = convert(varchar, @cue_iid)
			set @cue_nparticion = convert(int, @cue_iid )
		end
			
		--Solapa Principal
		INSERT INTO _Datos.dbo.[m_cuentas] (cue_iid, cue_clinea, cue_ncuenta, cue_cnombre, cue_ccalle, cue_clocalidad, cue_cprovincia, cue_ccodigopostal, cue_ccallecorreo, cue_clocalidadcorreo, cue_cprovinciacorreo, cue_ccodigopostalcorreo, cue_ctelefono, cue_cclave, cue_cpermiso, cue_ctipo, cue_cubicacion, cue_nparticion, cue_cobservacion, cue_cfoto, cue_dfechaalta, cue_dservicio, cue_nmostrar, cue_nsonidoul, cue_nllaveul, cue_cemail, cue_cinstalador, cue_cIMEI, cue_cLatLng, cue_cPartitionInfo,cue_nAutoMonitoreo,cue_nPrioridad)      
		SELECT @iid, @cue_clinea, @cue_ncuenta, @cue_cnombre, cue_ccalle, cue_clocalidad, cue_cprovincia, cue_ccodigopostal, cue_ccallecorreo, cue_clocalidadcorreo, cue_cprovinciacorreo, cue_ccodigopostalcorreo, cue_ctelefono, cue_cclave, cue_cpermiso, cue_ctipo, cue_cubicacion, @cue_nparticion, cue_cobservacion, cue_cfoto, getdate() cue_dfechaalta, cue_dservicio, cue_nmostrar, cue_nsonidoul, cue_nllaveul, cue_cemail, cue_cinstalador, '' cue_cIMEI, cue_cLatLng, @cue_cPartitionInfo,cue_nAutoMonitoreo,cue_nPrioridad FROM _Datos.dbo.m_cuentas WHERE cue_iid = @cue_iid
		   	
		--Esto es parte del alta, va siempre
		DECLARE @FechaAlta DATETIME    
		SET @FechaAlta = GETDATE()
		INSERT INTO _Sistema.dbo.s_auditoria(aud_iidOperador,aud_cLogin,aud_cProceso,aud_cAccion,aud_cTerminal,aud_cObservacion) VALUES (@UserId,@udw_usuario,'Cuentas','G','001','')                          
		INSERT INTO _Datos.dbo.M_ESTADO_CUENTA_CAB VALUES (@iid, 1, 3, @FechaAlta, 2, DATEADD(dd, 2, @FechaAlta), '') --ASI ESTABA ANTES FIJO EN DOS DIAS
		--19/03/2024 agrego esta linea para que tome la misma situacio que tiene configurada la cuenta original MAURO , queda comentado para tomarlo por parametro
	--	INSERT INTO _Datos.[dbo].[m_estado_cuenta_cab]([est_iidcuenta],[est_nestado],[est_ntipo],[est_dfechadesde],[est_nduracion],[est_dfechahasta],[est_mnota])
     --   SELECT @iid,[est_nestado],[est_ntipo],@FechaAlta,[est_nduracion],DATEADD(dd, [est_nduracion], @FechaAlta),[est_mnota]  FROM [_Datos].[dbo].[m_estado_cuenta_cab] WHERE [est_iidcuenta] = @cue_iid

		

		-- Creo Status
		IF NOT EXISTS (SELECT * FROM [_Datos].[dbo].[m_status] WHERE [sta_iidcuenta] = @iid)
			INSERT INTO [_Datos].[dbo].[m_status]([sta_iidcuenta], [sta_nestado], [sta_cultimaalarma], [sta_dfechautimaalarma], [sta_ncontadorfa], [sta_dfechaultimotst], [sta_dfechaprimerfa], [sta_dfechaultimooc], [sta_dfechaultimo2dotst], [sta_nEventoParaOPV])	
			VALUES(@iid,0,'','',0,'','','','',0)
	End
		
	------------------
	--Solapa Usuarios
		
	if (@skipTabUsuarios = 0)
	begin
		Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
		Set @message = 'Start DateTime : %s | [CuentaCopy] | Usuarios'
		RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT   

		Delete From _Datos.dbo.m_usuarios where usu_iidcuenta = @iid

		INSERT INTO _Datos.dbo.m_usuarios 
			(usu_iidcuenta, usu_icodigo, usu_cnombre, usu_iid, usu_cclave, usu_ntipo, usu_cimagen, usu_mobservacion) 
		SELECT @iid, usu_icodigo, usu_cnombre, usu_iid, usu_cclave, usu_ntipo, usu_cimagen, usu_mobservacion FROM _Datos.dbo.m_usuarios WHERE usu_iidcuenta = @cue_iid	
	
	end
		
	--Solapa Contactos
	if (@skipTabContactos = 0)
	begin
		Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
		Set @message = 'Start DateTime : %s | [CuentaCopy] | Contactos'
		RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT   

		Delete from _Datos.dbo.m_telefonos where tel_iidcuenta = @iid

		INSERT INTO _Datos.dbo.m_telefonos (tel_iidcuenta, tel_iid, tel_clista, tel_cnombre, tel_cobservacion, tel_ctelefono, tel_ndiscado, tel_cpredigito, tel_cpostdigito, tel_norden, tel_ntr, tel_cclave, tel_cpermiso, tel_nsms, tel_nsp) SELECT @iid, tel_iid, tel_clista, tel_cnombre, tel_cobservacion, tel_ctelefono, tel_ndiscado, tel_cpredigito, tel_cpostdigito, tel_norden, tel_ntr, tel_cclave, tel_cpermiso, tel_nsms, tel_nsp FROM _Datos.dbo.m_telefonos WHERE tel_iidcuenta = @cue_iid	
	end
		
	--Solapa Zonas
	if (@skipTabZonas = 0)
	begin
		Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
		Set @message = 'Start DateTime : %s | [CuentaCopy] | Zonas'
		RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT   

		Delete from _Datos.dbo.m_zonas where zon_iidcuenta = @iid
		--IF @isPartition = 1
			--BEGIN
				INSERT INTO _Datos.dbo.m_zonas (zon_iidcuenta, zon_ccodigo, zon_cdescripcion, zon_codigoalarma, zon_clistaemergencia, zon_cimagen, zon_mobservacion, zon_ccodigorestauracion, zon_nminutosrestauracion, zon_nmostrar, zon_cdealer, zon_ccuenta, zon_nautoprocesa, zon_cAlarmaAGenerar) SELECT @iid, zon_ccodigo, zon_cdescripcion, zon_codigoalarma, zon_clistaemergencia, zon_cimagen, zon_mobservacion, zon_ccodigorestauracion, zon_nminutosrestauracion, zon_nmostrar, zon_cdealer, zon_ccuenta, zon_nautoprocesa, zon_cAlarmaAGenerar 
				FROM _Datos.dbo.m_zonas WHERE zon_iidcuenta = @cue_iid	AND zon_ccodigo NOT LIKE '%PAR%'
			--END
		/*ELSE 
			BEGIN
				INSERT INTO _Datos.dbo.m_zonas (zon_iidcuenta, zon_ccodigo, zon_cdescripcion, zon_codigoalarma, zon_clistaemergencia, zon_cimagen, zon_mobservacion, zon_ccodigorestauracion, zon_nminutosrestauracion, zon_nmostrar, zon_cdealer, zon_ccuenta, zon_nautoprocesa, zon_cAlarmaAGenerar) SELECT @iid, zon_ccodigo, zon_cdescripcion, zon_codigoalarma, zon_clistaemergencia, zon_cimagen, zon_mobservacion, zon_ccodigorestauracion, zon_nminutosrestauracion, zon_nmostrar, zon_cdealer, zon_ccuenta, zon_nautoprocesa, zon_cAlarmaAGenerar FROM _Datos.dbo.m_zonas WHERE zon_iidcuenta = @cue_iid	
			END	
			*/		
	end
		
	--Solapa Notas
	if (@skipTabNotas = 0)
		begin
			Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
			Set @message = 'Start DateTime : %s | [CuentaCopy] | Notas'
			RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT   

			Delete from _Datos.dbo.m_notas where not_iidcuenta = @iid

			INSERT INTO _Datos.dbo.m_notas (not_iidcuenta, not_mnotaprincipal, not_mnotatemporal, not_dtemporaldesde, not_dtemporalhasta) SELECT @iid, not_mnotaprincipal, not_mnotatemporal, not_dtemporaldesde, not_dtemporalhasta  FROM _Datos.dbo.m_notas WHERE not_iidcuenta = @cue_iid	

			Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
			Set @message = 'Start DateTime : %s | [CuentaCopy] | Notas Instrucciones'
			RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT   

			Delete from _Datos.dbo.[m_CuentasXtraInfo] where [cue_iidCuenta] = @iid

			INSERT INTO _Datos.[dbo].[m_CuentasXtraInfo] ([cue_iidCuenta],[cue_cInstrucciones])
			Select @iid,cue_cInstrucciones FROM _Datos.dbo.[m_CuentasXtraInfo] WHERE [cue_iidCuenta] = @cue_iid	

		end
	else
	Begin
		-- inserto vacio
		Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
		Set @message = 'Start DateTime : %s | [CuentaCopy] | Elimino Notas'
		RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT   

		Delete from _Datos.dbo.m_notas where not_iidcuenta = @iid
		INSERT INTO _Datos.dbo.m_notas (not_iidcuenta) values (@iid)

		Delete from _Datos.dbo.[m_CuentasXtraInfo] where [cue_iidCuenta] = @iid
		INSERT INTO _Datos.[dbo].[m_CuentasXtraInfo] ([cue_iidCuenta]) Values (@iid)
	end
		
	--Solapa Horairos
	if (@skipTabHorarios = 0 AND exists (select hor_iidcuenta from _Datos.dbo.m_horarios WHERE hor_iidcuenta = @cue_iid))
	begin
			
		Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
		Set @message = 'Start DateTime : %s | [CuentaCopy] | Horarios'
		RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT   

		Delete from _Datos.dbo.m_horarios where hor_iidcuenta = @iid
		if exists (SELECT * FROM _Datos.dbo.m_horarios WHERE hor_iidcuenta = @cue_iid)
			INSERT INTO _Datos.dbo.m_horarios (hor_iidcuenta, hor_ndiaapertura, hor_choraapertura, hor_ndiacierre, hor_choracierre) SELECT @iid, hor_ndiaapertura, hor_choraapertura, hor_ndiacierre, hor_choracierre FROM _Datos.dbo.m_horarios WHERE hor_iidcuenta = @cue_iid
			
		Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
		Set @message = 'Start DateTime : %s | [CuentaCopy] | Horarios Alternativos'
		RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT   
			
		Delete from _Datos.dbo.m_horarios_alternativos where alt_iidcuenta = @iid
		if exists (SELECT * FROM _Datos.dbo.m_horarios_alternativos WHERE alt_iidcuenta = @cue_iid)
			INSERT INTO _Datos.dbo.m_horarios_alternativos (alt_iidcuenta, alt_ndiaapertura, alt_choraapertura, alt_ndiacierre, alt_choracierre) 
				SELECT @iid, alt_ndiaapertura, alt_choraapertura, alt_ndiacierre, alt_choracierre 
				FROM _Datos.dbo.m_horarios_alternativos 
				WHERE alt_iidcuenta = @cue_iid              
			
		Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
		Set @message = 'Start DateTime : %s | [CuentaCopy] | Horarios Excepcion'
		RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT   

		Delete from _Datos.dbo.[m_horarios_excepcion] where exc_iidcuenta = @iid
			
		if exists (SELECT * FROM _Datos.dbo.[m_horarios_excepcion] WHERE  exc_iidcuenta = @cue_iid )
			INSERT INTO _Datos.dbo.[m_horarios_excepcion] (exc_iidcuenta, exc_cevento) SELECT @iid, exc_cevento FROM _Datos.dbo.m_horarios_excepcion WHERE exc_iidcuenta = @cue_iid              
			
		Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
		Set @message = 'Start DateTime : %s | [CuentaCopy] | Horarios Tolerancia'
		RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT   
			
		Delete from _Datos.dbo.m_horarios_tolerancia where [tol_iidcuenta] = @iid

		if exists (SELECT * FROM _Datos.dbo.m_horarios_tolerancia WHERE  tol_iidcuenta = @cue_iid )
			INSERT INTO _Datos.dbo.m_horarios_tolerancia ([tol_iidcuenta], [tol_naperturaantes], [tol_caperturaantesalarma], [tol_naperturadespues], [tol_caperturadespuesalarma], [tol_ncierreantes], [tol_ccierreantesalarma], [tol_ncierredespues], [tol_ccierredespuesalarma], [tol_nnyo], [tol_nnyc], [tol_nControl], [tol_nModo], [tol_nAPNYO], [tol_nAPNYC]) SELECT @iid, [tol_naperturaantes], [tol_caperturaantesalarma], [tol_naperturadespues], [tol_caperturadespuesalarma], [tol_ncierreantes], [tol_ccierreantesalarma], [tol_ncierredespues], [tol_ccierredespuesalarma], [tol_nnyo], [tol_nnyc], [tol_nControl], [tol_nModo], [tol_nAPNYO], [tol_nAPNYC] FROM _Datos.dbo.m_horarios_tolerancia WHERE tol_iidcuenta = @cue_iid
	end
		
	--Solapa Info Medica
	if (@skipTabInformacionMedica = 0)
	begin
		Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
		Set @message = 'Start DateTime : %s | [CuentaCopy] | Informacion Medica'
		RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT   

		Delete from _Datos.dbo.m_medical_info where mnf_iidcuenta = @iid

		INSERT INTO _Datos.dbo.m_medical_info (mnf_iidcuenta, mnf_iid, mnf_cprotegido, mnf_cdoctor, mnf_cobrasocial, mnf_nsexo, mnf_ndiscapacitado, mnf_nambulancia, mnf_nvivesolo, mnf_dfechanacimiento, mnf_nedad, mnf_tobservaciones, mnf_casociado) 
			SELECT @iid, mnf_iid, mnf_cprotegido, mnf_cdoctor, mnf_cobrasocial, mnf_nsexo, mnf_ndiscapacitado, mnf_nambulancia, mnf_nvivesolo, mnf_dfechanacimiento, mnf_nedad, mnf_tobservaciones, mnf_casociado FROM _Datos.dbo.m_medical_info WHERE mnf_iidcuenta = @cue_iid	
	end
		
	if (@skipTabFalsa = 0)
	begin
		Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
		Set @message = 'Start DateTime : %s | [CuentaCopy] | Falsas Alarmas'
		RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT   

		Delete from _Datos.dbo.m_falsas where fal_iidcuenta = @iid

		INSERT INTO _Datos.dbo.m_falsas (fal_iidcuenta, fal_nmargen, fal_nmeses, fal_mnota) 
			SELECT @iid, fal_nmargen, fal_nmeses, fal_mnota FROM _Datos.dbo.m_falsas WHERE fal_iidcuenta = @cue_iid	   
	end

	if (@skipSchedule = 0)
	begin
		Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
		Set @message = 'Start DateTime : %s | [CuentaCopy] | Scheduler'
		RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT   

		Delete from _Datos.dbo.SchedulerPrograms where cuentaId = @iid

		INSERT INTO _Datos.dbo.SchedulerPrograms (Name,cuentaId,eventos,eventogenerar,zonaiid,usuarioiid,programtype,starthour,startminutes,endhour,endminutes,dayofweek,dayofmonth) 
			SELECT Name,@iid,eventos,eventogenerar,
				(select zon_idKey from _Datos.dbo.m_zonas 
							where zon_iidcuenta = @iid 
										AND zon_ccodigo = (select zon_ccodigo from _Datos.dbo.m_zonas 
																							WHERE zon_idKey = s.zonaiid 
																								AND zon_iidcuenta = @cue_iid)
				) as zonaiid
				,usuarioiid,programtype,starthour,startminutes,endhour,endminutes,dayofweek,dayofmonth
			FROM _Datos.dbo.SchedulerPrograms s WHERE cuentaId = @cue_iid	   
	end

	if (@skipVideoLink = 0)
	begin
		Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
		Set @message = 'Start DateTime : %s | [CuentaCopy] | Links de Video'
		RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT   

		Delete from _Datos.dbo.m_cuentas_video where cuv_iidCuenta = @iid

		INSERT INTO _Datos.dbo.m_cuentas_video (cuv_iidCuenta,cuv_clink,cuv_meventos,cuv_cLinkDSS,cuv_iVideoID,cuv_rLatitud,cuv_rLongitud) 
			SELECT @iid,cuv_clink,cuv_meventos,cuv_cLinkDSS,cuv_iVideoID,cuv_rLatitud,cuv_rLongitud FROM _Datos.dbo.m_cuentas_video WHERE cuv_iidCuenta = @cue_iid	

		Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
		Set @message = 'Start DateTime : %s | [CuentaCopy] | Links de Video Por Zonas'
		RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT   

		Delete from _Datos.dbo.m_cuentas_video_links where cvl_iidCuenta = @iid

		INSERT INTO _Datos.dbo.m_cuentas_video_links (cvl_iidCuenta,cvl_calarma,cvl_czona,cvl_clink,cvl_cLinkDSS,cvl_iVideoID,cvl_rLatitud,cvl_rLongitud) 
			SELECT @iid,cvl_calarma,cvl_czona,cvl_clink,cvl_cLinkDSS,cvl_iVideoID,cvl_rLatitud,cvl_rLongitud FROM _Datos.dbo.m_cuentas_video_links vl WHERE cvl_iidCuenta = @cue_iid	   
	end
		
	if (@skipTabTest = 0)
		begin
			Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
			Set @message = 'Start DateTime : %s | [CuentaCopy] | TST'
			RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT   

			Delete from _Datos.dbo.m_tst_prueba where [tst_iidcuenta] = @iid
--19-03-2024 se agregaron estas lineas para que copie el evento de autoprocesofalla test ,[tst_cAlarmaAutoprocesa],[tst_cAlarma2Autoprocesa],[tst_cAlarma3Autoprocesa] MAURO
			INSERT INTO _Datos.dbo.m_tst_prueba ([tst_iidcuenta], [tst_ncada], [tst_ntipo], [tst_ireinicio], [tst_calarma], [tst_ncada2], [tst_ntipo2], [tst_calarmaesperada], [tst_calarmagenerar], [tst_ncada3], [tst_ntipo3], [tst_calarma3esperada], [tst_calarma3generar],[tst_cAlarmaAutoprocesa],[tst_cAlarma2Autoprocesa],[tst_cAlarma3Autoprocesa]) 
				SELECT @iid, [tst_ncada], [tst_ntipo], [tst_ireinicio], [tst_calarma], [tst_ncada2], [tst_ntipo2], [tst_calarmaesperada], [tst_calarmagenerar], [tst_ncada3], [tst_ntipo3], [tst_calarma3esperada], [tst_calarma3generar],[tst_cAlarmaAutoprocesa],[tst_cAlarma2Autoprocesa],[tst_cAlarma3Autoprocesa]  FROM _Datos.dbo.m_tst_prueba WHERE tst_iidcuenta = @cue_iid
		end
	else IF @CuentaExists = 0
	begin
		Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
		Set @message = 'Start DateTime : %s | [CuentaCopy] | TST en vacio'
		RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT   

		INSERT INTO _Datos.dbo.M_TST_PRUEBA ([tst_iidcuenta], [tst_ncada], [tst_ntipo], [tst_ireinicio], [tst_calarma], [tst_ncada2], [tst_ntipo2], [tst_calarmaesperada], [tst_calarmagenerar], [tst_ncada3], [tst_ntipo3], [tst_calarma3esperada], [tst_calarma3generar]) 
			VALUES (@iid, 0, 0, 0, '', 0, 0, '', '', 0, 0, '', '')
	end
		
	if (@skipTabPaneles = 0)
	begin
		Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
		Set @message = 'Start DateTime : %s | [CuentaCopy] | Paneles'
		RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT   

		Delete from _Datos.dbo.m_paneles where pan_iidcuenta = @iid
		/*
		--19/03/2024 se agregaron las columnas ,[pan_iReceptor],[pan_rpmidKey] para que copien los datos MAURO	
		INSERT INTO _Datos.dbo.m_paneles (pan_iidcuenta, pan_ccodigo, pan_mubicacion, pan_ccallerid1, pan_ccallerid2, pan_ccallerid3, pan_ccallerid4, pan_ccallerid5, pan_nmostrar, pan_csender,pan_cNroSim1, pan_cCompania1, pan_cNroSim2, pan_cCompania2,[pan_iReceptor],[pan_rpmidKey],[pan_cConfig]) 
			SELECT @iid, pan_ccodigo, pan_mubicacion, pan_ccallerid1, pan_ccallerid2, pan_ccallerid3, pan_ccallerid4, pan_ccallerid5, pan_nmostrar, pan_csender,pan_cNroSim1, pan_cCompania1, pan_cNroSim2, pan_cCompania2,[pan_iReceptor],[pan_rpmidKey],[pan_cConfig] FROM _Datos.dbo.m_paneles WHERE pan_iidcuenta = @cue_iid	
		*/
		--2024-08-05 Pablo se agregaron las columnas [pan_iTipoCom],[pan_cModemSMS],[pan_cClavePanel]
		INSERT INTO _Datos.dbo.m_paneles (pan_iidcuenta, pan_ccodigo, pan_mubicacion, pan_ccallerid1, pan_ccallerid2, pan_ccallerid3, pan_ccallerid4, pan_ccallerid5, pan_nmostrar, pan_csender,pan_cNroSim1, pan_cCompania1, pan_cNroSim2, pan_cCompania2,[pan_iReceptor],[pan_rpmidKey],[pan_cConfig],[pan_iTipoCom],[pan_cModemSMS],[pan_cClavePanel]) 
			SELECT @iid, pan_ccodigo, pan_mubicacion, pan_ccallerid1, pan_ccallerid2, pan_ccallerid3, pan_ccallerid4, pan_ccallerid5, pan_nmostrar, pan_csender,pan_cNroSim1, pan_cCompania1, pan_cNroSim2, pan_cCompania2,[pan_iReceptor],[pan_rpmidKey],[pan_cConfig],[pan_iTipoCom],[pan_cModemSMS],[pan_cClavePanel] FROM _Datos.dbo.m_paneles WHERE pan_iidcuenta = @cue_iid	

	end
	else IF @CuentaExists = 0
	begin
		Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
		Set @message = 'Start DateTime : %s | [CuentaCopy] | Paneles en vacio'
		RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT   

		INSERT INTO _Datos.dbo.M_PANELES (pan_iidcuenta, pan_ccodigo, pan_mubicacion, pan_ccallerid1, pan_ccallerid2, pan_ccallerid3, pan_ccallerid4, pan_ccallerid5, pan_nmostrar, pan_csender,pan_cNroSim1, pan_cCompania1, pan_cNroSim2, pan_cCompania2 )
			VALUES (@iid, '', '', '', '', '', '', '', 2, '', '', '', '', '')       
	end
		
	--Solapa Notificaciones
	if (@skipTabNotificaciones = 0)
	begin
		Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
		Set @message = 'Start DateTime : %s | [CuentaCopy] | Notificaciones Reportes Automaticos'
		RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT   

		Delete from _Datos.dbo.m_reportes_automaticos where [rep_iidcuenta] = @iid
			
		INSERT INTO _Datos.dbo.m_reportes_automaticos (	[rep_iidcuenta], [rep_ntipo], [rep_tproximoenvio], [rep_nfrecuencia], [rep_cmail],[rep_iLimiteSMS],[rep_nLimiteCada],[rep_nCadaUnidadTiempo],[rep_cMailRuteoSMS],[rep_cSMSParaInforme],[rep_iModemSMS],[rep_idGrupo] ) 
			SELECT @iid, [rep_ntipo], [rep_tproximoenvio], [rep_nfrecuencia], [rep_cmail],[rep_iLimiteSMS],[rep_nLimiteCada],[rep_nCadaUnidadTiempo],[rep_cMailRuteoSMS],[rep_cSMSParaInforme],[rep_iModemSMS],[rep_idGrupo]
			FROM _Datos.dbo.m_reportes_automaticos 
			WHERE rep_iidcuenta = @cue_iid	
			
		Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
		Set @message = 'Start DateTime : %s | [CuentaCopy] | Notificaciones SMS'
		RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT   

		Delete from _Datos.dbo.m_sms where sms_iidcuenta = @iid

		INSERT INTO _Datos.dbo.m_sms (sms_iidcuenta, sms_iid, sms_meventos, sms_csmsparaeventos,
			sms_imodemsms, sms_cplantillasms,sms_cidsPushSmartpanic, sms_cPlantillaPush, sms_iNotificarAlertas, 
			sms_iGrupoAlarmas, sms_cmailparaeventos, sms_cplantillamail, sms_cDescripcion) 
		SELECT @iid, sms_iid, sms_meventos, sms_csmsparaeventos, sms_imodemsms, 
			sms_cplantillasms,sms_cidsPushSmartpanic, sms_cPlantillaPush, sms_iNotificarAlertas, 
			sms_iGrupoAlarmas, sms_cmailparaeventos, sms_cplantillamail, sms_cDescripcion
		FROM _Datos.dbo.m_sms WHERE sms_iidcuenta = @cue_iid
	end
	else IF @CuentaExists = 0
	begin
		Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
		Set @message = 'Start DateTime : %s | [CuentaCopy] | Notificaciones Reportes Automaticos en vacio'
		RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT   

		INSERT INTO _Datos.dbo.M_REPORTES_AUTOMATICOS ([rep_iidcuenta], [rep_ntipo], [rep_tproximoenvio], [rep_nfrecuencia], [rep_cmail]) 
			VALUES (@iid, 0, @FechaAlta, 0, '')       
	end

	if (@skipEstadosDinamicos = 0)
	begin
		Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
		Set @message = 'Start DateTime : %s | [CuentaCopy] | Estados Dinamicos'
		RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT   

		Delete from _Tablas.dbo.t_estadosdinamicos where [ted_idCta] = @iid
			
		INSERT INTO _Tablas.dbo.t_estadosdinamicos (ted_cCodigo,ted_cDescripcion,ted_cEventos,ted_iValor,ted_iPorUsuario,ted_iActivo,ted_iEditable,ted_idCta) 
			SELECT ted_cCodigo,ted_cDescripcion,ted_cEventos,ted_iValor,ted_iPorUsuario,ted_iActivo,ted_iEditable,@iid 
			FROM _Tablas.dbo.t_estadosdinamicos 
			WHERE ted_idCta = @cue_iid	
	end
		
	if (@skipControlEstadoPanel = 0)
	begin
		Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
		Set @message = 'Start DateTime : %s | [CuentaCopy] | Estados Panel'
		RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT   

		Delete from [_Datos].[dbo].[m_EstadosPanel] where [mep_idCuenta] = @iid
			
		INSERT INTO [_Datos].[dbo].[m_EstadosPanel] ([mep_idCuenta],[mep_cAlarmaControl],[mep_iUsuarioControl],[mep_cAlarmaEsperada],[mep_iUsuarioEsperado],[mep_iMinutos],[mep_iAutoProcesa],[mep_cAlarmaAGenerar]) 
			SELECT @iid,[mep_cAlarmaControl],[mep_iUsuarioControl],[mep_cAlarmaEsperada],[mep_iUsuarioEsperado],[mep_iMinutos],[mep_iAutoProcesa],[mep_cAlarmaAGenerar]
			FROM [_Datos].[dbo].[m_EstadosPanel]
			WHERE [mep_idCuenta] = @cue_iid	
	end

	--Audit
	/*Deprecated
	Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
	Set @message = 'Start DateTime : %s | [CuentaCopy] | Auditoria'
	RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT   
	INSERT INTO _Sistema.dbo.s_auditoria(aud_iidOperador,aud_cLogin,aud_cProceso,aud_cAccion,aud_cTerminal,aud_cObservacion) VALUES (@UserId,@udw_usuario,'Cuentas','G','001','Los datos fueron Guardados (' + @cue_clinea + '-' + @cue_ncuenta + ')')    
	*/
	Declare @cue_clineaxml varchar(10)
	Select @cue_clineaxml = replace(@cue_clinea,'&','&amp;')

	Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
	Set @message = 'Start DateTime : %s | [CuentaCopy] | FrameworkAudit'
	RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT   

	INSERT INTO [_Audit].[dbo].[FrameworkAudit]
        ([UserId]
        ,[ObjectTypeId]
        ,[ObjectId]
        ,[ObjectName]
        ,[FunctionId]
        ,[AuditDate]
        ,[XmlOld]
        ,[XmlNew])
	VALUES
        (1
        ,3001
        ,0
        ,'Cuenta'
        ,4
        ,GETDATE()
        ,'<Object><Data><Id>0</Id><Name></Name><cue_clinea></cue_clinea><cue_ncuenta></cue_ncuenta><cue_cnombre>CUENTA COPY</cue_cnombre><cue_ccalle></cue_ccalle><cue_clocalidad></cue_clocalidad><cue_cprovincia></cue_cprovincia><cue_ccodigopostal></cue_ccodigopostal><cue_ccallecorreo></cue_ccallecorreo><cue_clocalidadcorreo></cue_clocalidadcorreo><cue_cprovinciacorreo></cue_cprovinciacorreo><cue_ccodigopostalcorreo></cue_ccodigopostalcorreo><cue_ctelefono></cue_ctelefono><cue_cclave></cue_cclave><cue_cpermiso></cue_cpermiso><cue_ctipo></cue_ctipo><cue_cubicacion></cue_cubicacion><cue_nparticion></cue_nparticion><cue_cobservacion></cue_cobservacion><cue_cfoto></cue_cfoto><cue_dfechaalta></cue_dfechaalta><cue_dservicio></cue_dservicio><cue_nmostrar></cue_nmostrar><cue_nsonidoul></cue_nsonidoul><cue_nllaveul></cue_nllaveul><cue_cemail></cue_cemail><cue_cinstalador></cue_cinstalador><cue_cIMEI></cue_cIMEI><cue_cLatLng></cue_cLatLng><Situacion>habilitada</Situacion><cue_nEfectiva>0</cue_nEfectiva><cue_cIdExtendido></cue_cIdExtendido><cue_iZonaHoraria>0</cue_iZonaHoraria><cue_cPartitionInfo></cue_cPartitionInfo><cue_nAutoMonitoreo></cue_nAutoMonitoreo><cue_nPrioridad></cue_nPrioridad><cue_cCustom></cue_cCustom></Data><Type><Id></Id><Name>Cuenta</Name><FullName></FullName><Namespace></Namespace><Assembly></Assembly><TableName></TableName></Type></Object>'
        ,'<Object><Data><Id>'+convert(varchar(10),@iid)+'</Id><Name>'+rtrim(@cue_cnombre)+'</Name><cue_clinea>'+rtrim(@cue_clineaxml)+'</cue_clinea><cue_ncuenta>'+rtrim(@cue_ncuenta)+'</cue_ncuenta><cue_cnombre>'+rtrim(@cue_cnombre)+'</cue_cnombre><cue_ccalle></cue_ccalle><cue_clocalidad></cue_clocalidad><cue_cprovincia></cue_cprovincia><cue_ccodigopostal></cue_ccodigopostal><cue_ccallecorreo></cue_ccallecorreo><cue_clocalidadcorreo></cue_clocalidadcorreo><cue_cprovinciacorreo></cue_cprovinciacorreo><cue_ccodigopostalcorreo></cue_ccodigopostalcorreo><cue_ctelefono></cue_ctelefono><cue_cclave></cue_cclave><cue_cpermiso></cue_cpermiso><cue_ctipo></cue_ctipo><cue_cubicacion></cue_cubicacion><cue_nparticion>0</cue_nparticion><cue_cobservacion></cue_cobservacion><cue_cfoto></cue_cfoto><cue_dfechaalta></cue_dfechaalta><cue_dservicio></cue_dservicio><cue_nmostrar></cue_nmostrar><cue_nsonidoul></cue_nsonidoul><cue_nllaveul></cue_nllaveul><cue_cemail></cue_cemail><cue_cinstalador></cue_cinstalador><cue_cIMEI></cue_cIMEI><cue_cLatLng></cue_cLatLng><Situacion></Situacion><cue_nEfectiva></cue_nEfectiva><cue_cIdExtendido></cue_cIdExtendido><cue_iZonaHoraria></cue_iZonaHoraria><cue_cPartitionInfo></cue_cPartitionInfo><cue_nAutoMonitoreo></cue_nAutoMonitoreo><cue_nPrioridad></cue_nPrioridad><cue_cCustom></cue_cCustom></Data><Type><Id></Id><Name>Cuenta</Name><FullName></FullName><Namespace></Namespace><Assembly></Assembly><TableName></TableName></Type></Object>')

	Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
	Set @message = 'Start DateTime : %s | [CuentaCopy] | FrameworkAuditExtend'
	RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT   

	INSERT INTO [_Audit].[dbo].[FrameworkAuditExtend]
        ([Id]
        ,[UserName]
        ,[ParentObjectTypeId]
        ,[ParentObjectId]
        ,[ParentDescription])
	VALUES
        (SCOPE_IDENTITY()
        ,@udw_usuario
        ,3001
        ,@iid
        ,@cue_clinea+'-'+@cue_ncuenta+' '+@cue_cnombre)

	EXEC CuentaSel @iid     
END