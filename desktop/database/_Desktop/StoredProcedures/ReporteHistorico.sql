CREATE OR ALTER PROCEDURE [dbo].[ReporteHistorico]     
 @agruparOrden VARCHAR(50) = 'false',
 @Alertas NVARCHAR(512) = '', 
 @Autoridades VARCHAR(3) = '',
 @Categorizacion VARCHAR(50) = '',
 @CodigosAlarma NVARCHAR(512) = '',    
 @CodigosAlarmaExcluir NVARCHAR(512) = '',              
 @cod_cgrupo NVARCHAR(4) = '',
 @cod_cgrupoExcluir NVARCHAR(512) = '',
 @cod_nMultiMonitor NVARCHAR(1) = '',
 @cod_nLeeSonido INT = null,            
 @CondicionCuenta NVARCHAR(256) = '',
 @Cuentas NVARCHAR(512) = '',            
 @cue_cnombre NVARCHAR(256) = '', 
 @cue_clinea NVARCHAR(3) = '',
 @cue_clineaHasta NVARCHAR(3) = '',
 @cue_ncuenta NVARCHAR(4) = '',
 @cue_ncuentaDesde NVARCHAR(4) = '',  
 @cue_ncuentaHasta NVARCHAR(4) = '',
 @Estados NVARCHAR(512) = '',          
 @est_nstatus int = null,  
 @est_nestado NVARCHAR(128) = '',  
 @extramonth NVARCHAR(5) = 'true',
 @export INT = 0,	 -- BC 402017122 - Se agrega variable export = 0 (default) para el nuevo export de reporte historico segun columnas de parametro
 @FechaDesde NVARCHAR(50) = NULL,            
 @FechaHasta NVARCHAR(50) = NULL,  
 @filter NVARCHAR(2048) = '',  
 @gps_cIMEI NVARCHAR(128) = '',   
 @group NVARCHAR(128) = '',                 
 @idExtendidoDesde VARCHAR(100) = '', -- BC 407862025: Agregado el filtro por ID Extendido
 @idExtendidoHasta VARCHAR(100) = '',
 @IdGrupo INT = 0, 
 @limit INT = 50,      
 @Mostrar INT = 0,            
 @mostrarEventoAlarma INT = 0,	-- BC 385429388 - Se agrega el indicador de solo mostrar Eventos si alguno de la cuenta generó alarma.
 @onlyRec_iid int = 0,	-- es para traer 1 REC e ignora todos los otros parametros		
 @Origenes NVARCHAR(512) = '',     
 @OrdenarFecha NVARCHAR(128) = 'DESC',           
 @Operador NVARCHAR(128) = '',     
 @OperadorNot NVARCHAR(128) = '',  
 @OperadorNotEmpty NVARCHAR(4) = '',
 @page INT = 1,                   
 @Prioridad NVARCHAR(128) = '', 
 @provincia NVARCHAR(MAX) = '',
 @rec_cdll NVARCHAR(128) = null,  
 @rec_iid_from NVARCHAR(512) = '', 
 @Resolucion VARCHAR(50) = '',
 @short int = 0,
 @sort NVARCHAR(256) = '',                
 @start INT = 0,                   
 @table NVARCHAR(128) = 'p_recepcion',   
 @Tipos NVARCHAR(512) = '',            
 @TipoCuenta NVARCHAR(128) = '', 
 @TipoCuentaId NVARCHAR(128) = '', 
 @token NVARCHAR(128) = '',                
 @totalrows INT = 1 OUTPUT,
 @usuario NVARCHAR(512) = '',             
 @zona NVARCHAR(512) = '',
 @_dc NVARCHAR(256) = ''
--Si se agregan parametros POR FAVOR agregarlos en orden alfabetico
AS            
 SET NOCOUNT ON            
 SET DATEFORMAT mdy    

/*para debug
DECLARE @params NVARCHAR(MAX);
SELECT @params =
(
    SELECT
        @agruparOrden       AS agruparOrden,
        @Alertas            AS Alertas,
        @Autoridades        AS Autoridades,
        @Categorizacion     AS Categorizacion,
        @CodigosAlarma      AS CodigosAlarma,
        @CodigosAlarmaExcluir AS CodigosAlarmaExcluir,
        @cod_cgrupo         AS cod_cgrupo,
        @cod_cgrupoExcluir  AS cod_cgrupoExcluir,
        @cod_nMultiMonitor  AS cod_nMultiMonitor,
        @cod_nLeeSonido     AS cod_nLeeSonido,
        @CondicionCuenta    AS CondicionCuenta,
        @Cuentas            AS Cuentas,
        @cue_cnombre        AS cue_cnombre,
        @cue_clinea         AS cue_clinea,
        @cue_clineaHasta    AS cue_clineaHasta,
        @cue_ncuenta        AS cue_ncuenta,
        @cue_ncuentaDesde   AS cue_ncuentaDesde,
        @cue_ncuentaHasta   AS cue_ncuentaHasta,
        @Estados            AS Estados,
        @est_nstatus        AS est_nstatus,
        @est_nestado        AS est_nestado,
        @extramonth         AS extramonth,
        @export             AS export,
        @FechaDesde         AS FechaDesde,
        @FechaHasta         AS FechaHasta,
        @filter             AS [filter],
        @gps_cIMEI          AS gps_cIMEI,
        @group              AS [group],
        @idExtendidoDesde   AS idExtendidoDesde,
        @idExtendidoHasta   AS idExtendidoHasta,
        @IdGrupo            AS IdGrupo,
        @limit              AS [limit],
        @Mostrar            AS Mostrar,
        @mostrarEventoAlarma AS mostrarEventoAlarma,
        @onlyRec_iid        AS onlyRec_iid,
        @Origenes           AS Origenes,
        @OrdenarFecha       AS OrdenarFecha,
        @Operador           AS Operador,
        @OperadorNot        AS OperadorNot,
        @OperadorNotEmpty   AS OperadorNotEmpty,
        @page               AS [page],
        @Prioridad          AS Prioridad,
        @provincia          AS provincia,
        @rec_cdll           AS rec_cdll,
        @rec_iid_from       AS rec_iid_from,
        @Resolucion         AS Resolucion,
        @short              AS [short],
        @sort               AS [sort],
        @start              AS [start],
        @table              AS [table],
        @Tipos              AS Tipos,
        @TipoCuenta         AS TipoCuenta,
        @TipoCuentaId       AS TipoCuentaId,
        @token              AS token,
        @totalrows          AS totalrows,   -- es OUTPUT, pero acá lo ves como llegó
        @usuario            AS usuario,
        @zona               AS zona,
        @_dc                AS _dc
    FOR JSON PATH, WITHOUT_ARRAY_WRAPPER, INCLUDE_NULL_VALUES
);

Declare @message nVarChar(Max) = ''


DECLARE @TraceIDStr NVARCHAR(36);
-- Obtener como string (porque así se guardó)
SET @TraceIDStr = CONVERT(NVARCHAR(36), SESSION_CONTEXT(N'TraceID'));

-- Si nunca se seteó, @TraceID será NULL
IF @TraceIDStr IS NULL
BEGIN
	SET @TraceIDStr = CONVERT(NVARCHAR(36), NEWID());
	-- Opcional: guardarlo en el contexto para futuras llamadas en la misma sesión
	EXEC sp_set_session_context @key = N'TraceID', @value = @TraceIDStr;
END
	
Set @message = '[ReporteHistorico] | | '+@TraceIDStr + ' | '
SET @message = CONCAT(@message, CASE WHEN @message IS NULL OR @message = '' THEN '' ELSE ' | ' END,
                      'SPParams=', @params);

BEGIN TRY
	INSERT INTO [_LogDB].[dbo].[Log4TSQL] ([Date], [Thread], [Level], [Logger], [Message], [Exception], [DbProcId], [DbSchema], [DbName], [DbServer])
								Values (Getdate(), @TraceIDStr, 'DEBUG', OBJECT_NAME(@@PROCID), @message, '', @@PROCID, schema_name(), db_name(), @@SERVERNAME )
END TRY
BEGIN CATCH
END CATCH;	
*/
    
 --Load Security    
 DECLARE @UserId INT    
 SELECT @UserId = dbo.GetUserIdByToken(@token)    

 DECLARE @UserTipo INT
 SELECT @UserTipo = udw_tipo FROM _Sistema.dbo.UsersDesktopWeb WHERE udw_idKey = @UserId

 --Mostrar    
 DECLARE @Top NVARCHAR(64)    
 SET @Top = ' TOP 300'

 -- pongo un top maximo
 If @Mostrar = 0
	set @Mostrar = @limit

 IF @Mostrar != 0    
	SET @Top = ' TOP ' + CAST(@Mostrar AS VARCHAR)    

--2022-10-20 Pablo. Para mejorar perfomance en eventos de la cuenta al atender un evento
DECLARE @InTop NVARCHAR(20) = ''
DECLARE @InSort NVARCHAR(50) = ''
IF (@Cuentas != '' AND @Cuentas != '0' And @filter Not LIke '%rec_iid%') Or @Origenes = 'SMARTPANICS'	--2022-12-12 Pablo.El llamado desde SP envia rec_iid en filter en lugar de enviarlo como parametro
Begin
	--Set @InTop = ' TOP 1000'-- + CAST(@Mostrar*5 AS VARCHAR)        
	Set @InTop = @Top
	Set @InSort = 'Order by r.rec_tfechahora DESC'
End     
--

 --Order            
DECLARE @SqlSort AS NVARCHAR(256)   
If @agruparOrden = 'true'
	Set @SqlSort = 'cuentayfecha'
Else
Begin
	IF @sort != ''              
		SELECT @SqlSort = dbo.GetSqlSortForJson(@sort, 'r.rec_tfechahora DESC')
	ELSE
		set @SqlSort = 'r.rec_tfechahora DESC'
End
--PRINT '@SqlSort= ' + CAST(@SqlSort AS VARCHAR(MAX));

--2023-03-10 Pablo. Si el @mostrar es un numero chico y hay muchos eventos en el mes actual, los select individuales de los Union pueden cortar el mes
Declare @querysintop varchar(20) = ''


Declare @table_posiciones varchar(200) = ''

if(@extramonth = 'false')
BEGIN
	set @table = 'p_recepcion'+ CONVERT(NVARCHAR(6), getdate(), 112) 
	set @table += ',eventospendientes'

	set @table_posiciones += ',p_Posiciones'+ CONVERT(NVARCHAR(6), getdate(), 112)
	set @table_posiciones += ',p_Posiciones'+ CONVERT(NVARCHAR(6), getdate(), 112)	--Para eventos pendiente tambien se utiliza la depurada del mes actual
END
Else
Begin
	-- no se ven los eventos pendientes en una consulta comun de historicos.
	If(@table = 'p_recepcion' OR @table='')
	BEGIN
		set @table = 'p_recepcion'+ CONVERT(NVARCHAR(6), DATEADD (MONTH , -1 , getdate() )  , 112) 
		set @table +=',p_recepcion'+ CONVERT(NVARCHAR(6), getdate(), 112) 
		set @table += ',eventospendientes'

		--2024-08-07 Si el evento es del mes anterior solamente buscaba en el histórico de posiciones del mes actual
		set @table_posiciones = 'p_Posiciones'+ CONVERT(NVARCHAR(6), DATEADD (MONTH , -1 , getdate() ) , 112) 
		set @table_posiciones += ',p_Posiciones'+ CONVERT(NVARCHAR(6), getdate(), 112)
		set @table_posiciones += ',p_Posiciones'+ CONVERT(NVARCHAR(6), getdate(), 112)	--Para eventos pendiente tambien se utiliza la depurada del mes actual

		Set @querysintop = 'p_recepcion'+ CONVERT(NVARCHAR(6), getdate(), 112)
	END
	else
	begin
		--Daniel O. Medina 2023-07-14 para agregar histórico de posiciones_
		set @table_posiciones = replace(@table,'p_recepcion','p_Posiciones')
	end
End
--print 'historico deposiciones: '+@table_posiciones


-- me fijo si ordena por fecha para odernar por ID tambien se lleva a las patadas con mostrar ultimos 100
if (PATINDEX('%rec_tfechahora%',@SqlSort) > 0 AND PATINDEX('%ope_cnombre%',@SqlSort) <= 0)
Begin
    -- me fijo si es DESC o ASC
    if (PATINDEX('%DESC%',@SqlSort) > 0)
        set @SqlSort = ' r.rec_tfechahora DESC '  -- si es por fecha no lleva cue_iid el reporte es multicuenta
    else
        set @SqlSort = ' r.rec_tfechahora ASC' -- si es por fecha no lleva cue_iid el reporte es multicuenta
End

if (PATINDEX('%rec_iPrioridad%',@SqlSort) > 0 AND PATINDEX('%ope_cnombre%',@SqlSort) <= 0)
begin
	-- me fijo si es DESC o ASC
	if (PATINDEX('%DESC%',@SqlSort) > 0)
		set @SqlSort = 'r.rec_iPrioridad DESC, r.rec_tfechahora ASC'
	else
		set @SqlSort = 'r.rec_iPrioridad ASC, r.rec_tfechahora ASC'
End

/*
-- Nuevo para ordenar por fecha y cue_iid
-- Agregado Juan Bonforti 17/08 - BC : 362557017
-- Mejorado Juan Bonforti 20/05/2020 - BC: https://basecamp.com/2249105/projects/12939010/todos/416879616
IF (PATINDEX('%cuentayfecha%', @SqlSort) > 0 AND @export = 0)
begin
	-- me fijo si es DESC o ASC
	if (PATINDEX('%DESC%', @SqlSort) > 0)
        BEGIN
            IF (PATINDEX('%fechaEspecial%', @SqlSort) > 0 )
                BEGIN
                    if (CHARINDEX('UP', @SqlSort) > 0)
                        BEGIN 
                            --print '----------- Entre UP por DESC de cuentayfecha';
                            set @SqlSort = 'cue_iid DESC, r.rec_tfechahora ASC'
                        END
                    ELSE
                        BEGIN 
                            --print '----------- Entre DOWN por DESC de cuentayfecha';
                            set @SqlSort = 'cue_iid DESC, r.rec_tfechahora DESC'
                        END
                END
            ELSE
                BEGIN
                    --print '----------- NO reconoci fechaEspecial en cuentayfecha ASC';
                    set @SqlSort = 'cue_iid DESC, r.rec_tfechahora DESC'
                END
        END
	ELSE
        begin
            IF (PATINDEX('%fechaEspecial%', @SqlSort) > 0 )
                BEGIN
                    if (CHARINDEX('UP', @SqlSort) > 0)
                        BEGIN
                            --print '----------- Entre UP por ASC de cuentayfecha';
                            set @SqlSort = 'cue_iid ASC, r.rec_tfechahora ASC'
                        END
                    ELSE
                        BEGIN
                            --print '----------- Entre DOWN por ASC de cuentayfecha';
                            set @SqlSort = 'cue_iid ASC, r.rec_tfechahora DESC'
                        END
                END
            ELSE
                BEGIN
                    --print '----------- NO reconoci fechaEspecial en cuentayfecha DESC';
                    set @SqlSort = 'cue_iid ASC, r.rec_tfechahora ASC'
                END
        end
end
ELSE IF (PATINDEX('%cuentayfecha%', @SqlSort) > 0 AND @export = 1)
    BEGIN
        -- me fijo si es DESC o ASC
        if (PATINDEX('%DESC%',@SqlSort) > 0)
        begin
            set @SqlSort = 'cue_clinea DESC, c.cue_iid DESC, r.rec_tfechahora DESC'            
        end
        else
        begin
            set @SqlSort = 'cue_clinea ASC, c.cue_iid ASC, r.rec_tfechahora ASC'
        end
    END
*/
--2025-10-16 Pablo. No se porque hacia lo de arriba con export en 0 pero eso hacia que salga mal ordenado cuando ponen agrupar por cuenta asc
IF (PATINDEX('%cuentayfecha%', @SqlSort) > 0 )
    BEGIN
        -- me fijo si es DESC o ASC
        if (PATINDEX('%DESC%',@SqlSort) > 0)
        begin
            set @SqlSort = 'cue_clinea DESC, c.cue_ncuenta DESC, r.rec_tfechahora DESC'            
        end
        else
        begin
            set @SqlSort = 'cue_clinea ASC, c.cue_ncuenta ASC, r.rec_tfechahora ASC'
        end
    END


IF (PATINDEX('%usuyfecha%', @SqlSort) > 0 AND @export = 0)
    BEGIN
        -- me fijo si es DESC o ASC
	    if (PATINDEX('%DESC%', @SqlSort) > 0)
            BEGIN
                IF (PATINDEX('%fechaEspecial%', @SqlSort) > 0 )
                BEGIN
                    if (CHARINDEX('UP', @SqlSort) > 0)
                        BEGIN 
                            --print '----------- Entre UP por DESC de usuyfecha';
                            set @SqlSort = 'usu_cnombre DESC, r.rec_tfechahora ASC, cue_iid DESC'
                        END
                    ELSE
                        BEGIN 
                            --print '----------- Entre DOWN por DESC de usuyfecha';
                            --set @SqlSort = 'cue_iid DESC, usu_cnombre DESC, r.rec_tfechahora DESC'
							set @SqlSort = ' usu_cnombre DESC, r.rec_tfechahora DESC'
                        END
                    END
                ELSE
                    BEGIN
                        --print '----------- NO reconoci fechaEspecial en usuyfecha ASC';
                        set @SqlSort = 'usu_cnombre DESC, r.rec_tfechahora DESC, cue_iid DESC'
                    END
            END
        ELSE
            BEGIN
                IF (PATINDEX('%fechaEspecial%', @SqlSort) > 0 )
                BEGIN
                    if (CHARINDEX('UP', @SqlSort) > 0)
                        BEGIN
                            --print '----------- Entre UP fecha y por ASC de usuyfecha';
                            set @SqlSort = 'usu_cnombre ASC, r.rec_tfechahora ASC, cue_iid ASC'
                        END
                    ELSE
                        BEGIN
                            --print '----------- Entre DOWN fecha y por ASC de usuyfecha';
                            set @SqlSort = 'cue_iid ASC, usu_cnombre ASC, r.rec_tfechahora DESC'
                        END
                    END
                ELSE
                    BEGIN
                        --print '----------- NO reconoci fechaEspecial en usuyfecha DESC';
                        set @SqlSort = 'usu_cnombre ASC, r.rec_tfechahora ASC, cue_iid ASC'
                    END
            END
    END
ELSE IF (PATINDEX('%usuyfecha%', @SqlSort) > 0 AND @export = 1)
    BEGIN
        -- me fijo si es DESC o ASC
        if (PATINDEX('%DESC%',@SqlSort) > 0)
        begin
            set @SqlSort = 'cue_clinea DESC, usu_cnombre DESC, r.rec_tfechahora DESC'            
        end
        else
        begin
            set @SqlSort = 'cue_clinea ASC, usu_cnombre ASC, r.rec_tfechahora DESC'
        end
    END


-- Agregado Juan Bonforti 0709 - BC : 363909333
IF (PATINDEX('%fechaycuentacheck%', @SqlSort) > 0 )
begin
	-- me fijo si es DESC o ASC
	if (PATINDEX('%DESC%',@SqlSort) > 0)
		set @SqlSort = 'cue_iid DESC, r.rec_tfechahora DESC'
	else
		set @SqlSort = 'cue_iid ASC, r.rec_tfechahora ASC'
end

--PRINT '@SqlSort= ' + CAST(@SqlSort AS VARCHAR(MAX));

-- si tengo un group by hago sort por el group
if @group != ''
BEGIN
	set @group = REPLACE ( @group , '_rec_nestado' , 'rec_nestado' ) 
	SELECT @SqlSort = dbo.GetSqlSortForJson(@group, 'r.rec_tfechahora DESC')  
END

-- genero el reverse del sort para calcular mejor el total
declare @sortreversed varchar(max)
select @sortreversed = replace(@sqlsort, 'DESC','ASC2')
select @sortreversed = replace(@sortreversed, 'ASC','DESC')
select @sortreversed = replace(@sortreversed, 'ASC2','ASC')

declare @rec_fields NVARCHAR(MAX);
set @rec_fields ='  
	r.rec_iid Id,
        r.rec_cCategorizacion,
        r.rec_cObservaciones,
        r.rec_cContenido,
        r.rec_calarma,
        r.rec_czona,
        r.rec_idResolucion,
        r.rec_iid,
        r.rec_iidcuenta,
        r.rec_ioperador,
        r.rec_iusuario,
        r.rec_iPuerto,
        r.rec_nOrigen,
        r.rec_nestado,
        r.rec_tFechaProceso,
        r.rec_tFechaRecepcion,
        r.rec_tfechahora,
        LEFT (r.rec_iprioridad, 1) as rec_iPrioridad,
        CONVERT(VARCHAR, r.rec_tfechahora, 126) AS rec_isoFechaHora,
        CONVERT(VARCHAR, r.rec_tFechaProceso, 126) AS rec_isoFechaProceso,
        CONVERT(VARCHAR, r.rec_tFechaRecepcion, 126) AS rec_isoFechaRecepcion,
        CONVERT(VARCHAR, r.rec_tfechahora, 103)+'' ''+CONVERT(VARCHAR, r.rec_tfechahora, 24) AS rec_spanishFechaHora,
        CONVERT(VARCHAR, r.rec_tFechaProceso, 103)+'' ''+CONVERT(VARCHAR, rec_tFechaProceso, 24) AS rec_spanishFechaProceso,
        CONVERT(VARCHAR, r.rec_tFechaRecepcion, 103)+'' ''+CONVERT(VARCHAR, rec_tFechaRecepcion, 24) AS rec_spanishchaRecepcion,
        r._origen,
        r._puerto,
        r.rec_cTerminal,
        r.rec_iMinutosEspera,
        r.rec_iNYR,
        r.rec_iTE,
        r.rec_idFwd,
        r.rec_idLoc,
        r.rec_idMap,
			/*Daniel O. Medina 23/02/2022 https://basecamp.com/2249105/projects/12939010/todos/452397858 */
			/*antes se usaba usu_cnombre pero se cambia al campo de tablas históricas usuario_cnombre
			  Cuando los campos se listen en la tabla eventospendientes se usa un resultado vacío entre 
			  comillas ya que esta tabla no tiene ese campo. Se usa más abajo CHARINDEX para detectar
			  la tabla y reemplazar usuario_cnombre con comillas.
			*/
		Case When usuario_cnombre = ''0'' Then ''Master'' Else usuario_cnombre End As usr_cnombre,
        r.rec_idReceptor,
        dbo.ReporteHistoricoTieneNotificaciones(r.rec_iid) AS tiene_notificaciones,
		r.zonas_ccodigo,r.zonas_cdescripcion,
		g.pos_idrec as gps_idRec,
		g.pos_idCuenta as gps_idCuenta,
		ISNULL(g.pos_cIMEI, '''') as gps_cimei,
		g.pos_rLatitud as gps_rLatitud,
		g.pos_cDireccion as gps_cDireccion,
		g.pos_rLongitud as gps_rLongitud,
		g.pos_rAccuracy as gps_rAccuracy,
		g.pos_cMethod as gps_cMethod,
		g.pos_tRawfechahora as gps_tRawfechahora,
		'
 
 declare @fields NVARCHAR(MAX);
set @fields ='  
    ta.cod_cdescripcion,
        ta.cod_ncolor,
        ta.cod_ncolorletra,
        ta.cod_nWebCliente,
        ta.cod_nMultiMonitor,
        c.cue_iid,
        c.cue_clinea,
        c.cue_ncuenta,
        c.cue_cnombre,
        c.cue_ccalle,
        c.cue_cubicacion,
        c.cue_clatlng,
        c.cue_clocalidad,
        c.cue_cprovincia,
        c.cue_ctelefono,
        c.cue_cIdExtendido,
		tip.tip_nTipo,
        o.ope_cnombre,
        pro_cdescripcion,
		rxt_nSPIP,
        rxt_nSPSMS,
        rxt_nVCIP,
        rxt_nVCSMS,
        rxl_cLineCard as rxl_clinecard,
        SUBSTRING(xl.rxl_cLog, 1, 350) AS rxl_cLog,
		c.cue_nparticion,
        c.cue_cclave,
        c.cue_cpermiso,
        madre.cue_clinea as madre_clinea,
        madre.cue_ncuenta as madre_ncuenta,
        madre.cue_cnombre as madre_cnombre,
        tr.res_cdescripcion,
        tc.cat_cDescripcion ,
        convert(
            datetime,
            SWITCHOFFSET (
                TODATETIMEOFFSET (
                    r.rec_tfechahora,
                    DATENAME(TZoffset, SYSDATETIMEOFFSET())
                ),
                IsNull(gmt.ttz_nOffSet, 0) * 60
            )
        ) as _tfechahoraOffset,
        ta.cod_nprioridad,
        ta.cod_ntipo,
        ta.cod_nalerta,
        c.cue_cobservacion,
        x.cue_ccustom,
        (
            SELECT TOP 1 rec_ioperador
            FROM _Datos.dbo.p_recepcion subre
            WHERE subre.rec_iidcuenta = c.cue_iid
                AND subre.rec_nestado in (1, 9)
                AND rec_ioperador != 0
        ) as operadorAtendiendoCuenta,
        z.zon_cAlarmaAGenerar,
        z.zon_ccodigorestauracion,
        z.zon_ccuenta,
        z.zon_cdealer,
        z.zon_cimagen,
        z.zon_clistaemergencia,
        z.zon_codigoalarma,
        z.zon_idKey,
        z.zon_iidcuenta,
        z.zon_mobservacion,
        z.zon_nautoprocesa,
        z.zon_nminutosrestauracion,
        z.zon_nmostrar,
		z.zon_cdescripcion,
        o.ope_clogin,
        ta.cod_nLeeSonido,
        ta.cod_cSonido,
        ta.cod_cGrupo,
        cab.rec_cdescripcion,
        cab.rec_cdll,
        cab.rec_ntcpip,
        sta.sta_ncontadorfa,
        fal.fal_nmargen,
        gmt.ttz_noffset,
        au.*,
        z.zon_ccodigo
        ,CASE
			When ta.cod_nResuelve In(0,3) And r.zonas_ccodigo != N'''' 
				THEN N''(''+RTRIM(LTRIM(r.zonas_ccodigo))+N'') ''+r.zonas_cdescripcion
			When ta.cod_nResuelve In(1,2) Then N''''
            When ( RTRIM(LTRIM(r.rec_czona)) != '''' AND RTRIM(LTRIM(r.rec_czona)) != ''0'') 
				THEN N''('' + RTRIM(LTRIM(r.rec_czona)) + N'') '' + ISNULL(z.zon_cdescripcion,'''')
            WHEN ( z.zon_cdescripcion != N''''  OR z.zon_ccodigo != N'''' )
				THEN z.zon_cdescripcion
            When CAST(rxt_cRoute AS NVARCHAR(max)) != N''''
				Then rxt_cRoute
            When CAST(rxt_cGeoFenceName AS NVARCHAR(max)) != N''''
				Then rxt_cGeoFenceName
			When ta.cod_nResuelve In(0,3) And xl.rxl_cEvento != '''' 
				Then ( Select IsNull(MZ.zon_cdescripcion,'''')
						From _Datos.dbo.m_zonas MZ WITH (NOLOCK) Where xl.rxl_cEvento=MZ.zon_cCodigo And zon_iidcuenta=c.cue_iid
					 )
            else N''''
        END as _zon_cdescripcion
		,Case When ta.cod_nResuelve In(1,3) Then
			/*Daniel O. Medina 23/02/2022 */
			/*antes se usaba usu_cnombre pero se cambia al campo de tablas históricas usuario_cnombre*/
			--N'' (''+CONVERT(VARCHAR, r.rec_iusuario, 126)+N'') ''+ isnull(usuario_cnombre,isnull(st.Nombre,N'''')) 
			--else ''''
			--DSS-505 : no se visualizan los nombres de los usuarios de la cuenta si el evento no esta procesado. Si el evento se procesa, si se visualiza el nombre.
			--Case When usr_cnombre='''' Then N''(''+CONVERT(VARCHAR, r.rec_iusuario, 126)+N'') ''+ isnull(usu_cnombre,N'''') Else N''(''+CONVERT(VARCHAR, r.rec_iusuario, 126)+N'') ''+ isnull(usr_cnombre,isnull(st.Nombre,N'''')) End 
			Case When usr_cnombre='''' Then ''(''+Rtrim(CAST(r.rec_iusuario As VarChar(10)))+'') ''+ isnull(usu_cnombre,N'''') Else ''(''+Rtrim(CAST(r.rec_iusuario As VarChar(10)))+'') ''+ isnull(usr_cnombre,isnull(st.Nombre,N'''')) End 
		END as Usuario_cnombre
		,est_nestado
		,u.usu_cIdExtendido --DS-634|adrianlara|20230504 => se agrego el campo de id extendido de usuario para poder usarlo en el RedirectorTamesis
		--,'''' as rxi_cTipo -- Dedalo 20/10/2022 lo sacamos porque el join contra imagenes da event duplicado si tiene mas de una imagen, no se puede hacer un join directo contra imagenes de un evento.
		,rxi_cTipo = (Select Top 1 rxi_cTipo From [_Datos].[dbo].p_RXImg img with (NOLOCK) Where rxi_iRecId = r.rec_iid  ) --Pablo 06-05-23 Jira DSS-635
 '
 
 -- BC 402017122 - Se agrega variable export = 0 (default) para el nuevo export de reporte historico segun columnas de parametro
 IF @export > 0
    BEGIN
        -- Si vino por export, consulto el parametro EXPORTREPORTEHISTORICOCOLUMNAS INTERNO 
		--Print 'export'
        DECLARE @columns varchar(MAX) = '';
        Set @columns = ( Select Cast(par_cvalor As Varchar(MAX)) From _Tablas.dbo.t_parametros Where par_ccodigo = 'EXPORTREPORTEHISTORICOCOLUMNAS' )
        Set @columns = Ltrim( Rtrim(@columns) )

        IF ( @columns != '' )
            SET @fields = ' '+@columns;

		--print 'export fields'
		--print @fields
    END

 DECLARE @Sql NVARCHAR(MAX) = ''
 declare @union NVARCHAR(max) = ''
 declare @whereunion NVARCHAR(max) = ' WHERE 1=1 
	AND (r.rec_nestado != 8 or r.rec_calarma=''#T#'') '

 declare @joinunion NVARCHAR(max) = '
	LEFT JOIN [_Tablas].[dbo].[t_codigos_alarma] ta WITH (NOLOCK) ON ta.cod_ccodigo = r.rec_calarma
	INNER JOIN [_Datos].[dbo].[m_cuentas] c WITH (NOLOCK) ON c.cue_iid = r.rec_iidcuenta '

IF @Origenes = 'SMARTPANICS'	--2023-08-23 Pablo.Si SP esta asignado a una cuenta de TG pueden tener miles de eventos que no son de SP y en los UNION se pierde por el TOP
Begin
	Set @joinunion +='Left Join [_Datos].[dbo].p_RXtraInfo rxi WITH (NOLOCK) on (rxi.rxt_irecid = r.rec_iid)  '
	Set @whereunion += ' AND (rxt_nspip = 1 or rxt_nspsms = 1 )'  
End

--2023-07-10 Pablo :Eventos de VC no se ven cuando hay muchos eventos de otro tipo de cuenta
IF @TipoCuenta != '' 
Begin
	Set @whereunion += ' AND tip.[tip_nTipo] IN (' + @TipoCuenta + ')'  
	Set @joinunion += '	LEFT JOIN [_Tablas].[dbo].[t_tipos] tip WITH (NOLOCK) ON LTRIM(RTRIM(tip.tip_ccodigo)) =  LTRIM(RTRIM(c.cue_ctipo))'
End     
--
 
 -- armo los joins
 declare @join NVARCHAR(MAX)=' 
		LEFT JOIN [_Tablas].[dbo].[t_codigos_alarma] ta WITH (NOLOCK) ON ta.cod_ccodigo=r.rec_calarma                  
		INNER JOIN [_Datos].[dbo].[m_cuentas] c WITH (NOLOCK) ON c.cue_iid = r.rec_iidcuenta      
		LEFT JOIN [_Tablas].[dbo].[t_tipos] tip WITH (NOLOCK) ON LTRIM(RTRIM(tip.tip_ccodigo)) =  LTRIM(RTRIM(c.cue_ctipo))
		LEFT JOIN [_Datos].[dbo].[m_zonas] z WITH (NOLOCK) ON z.zon_iidcuenta = r.rec_iidcuenta AND LTRIM(RTRIM(z.zon_ccodigo)) = LTRIM(RTRIM(r.rec_czona))  
		LEFT JOIN [_Datos].[dbo].[m_usuarios] u WITH (NOLOCK) ON u.usu_iidcuenta = r.rec_iidcuenta AND u.usu_iid = r.rec_iusuario and r.rec_iusuario>0    
		LEFT JOIN [_datos].[dbo].[m_estado_cuenta_cab] ec WITH (NOLOCK) ON ec.est_iidcuenta = c.cue_iid      
		LEFT JOIN [_Datos].[dbo].[m_cuentas] madre WITH (NOLOCK) ON madre.cue_iid = c.cue_nparticion
		LEFT JOIN [_tablas].[dbo].[t_provincias] pro WITH (NOLOCK) ON c.cue_cprovincia = pro.pro_ccodigo
		left join [_Sistema].[dbo].s_operadores o WITH (NOLOCK) on (r.rec_ioperador = o.ope_iid)    
		left join [_Datos].[dbo].m_receptores_cab cab WITH (NOLOCK) on (cab.rec_iid = r.rec_idReceptor)  
		left join [_Datos].[dbo].p_RXtraInfo rxi WITH (NOLOCK) on (rxi.rxt_irecid = r.rec_iid)  
		left join [_Datos].[dbo].m_cuentasXtraInfo x WITH (NOLOCK) on (x.cue_iidcuenta = r.rec_iidcuenta)  
		LEFT JOIN [_Datos].[dbo].[SmartTrack] st WITH (NOLOCK) on r.gps_cimei = st.imei COLLATE SQL_Latin1_General_CP1_CI_AS and r.gps_cimei != '''' 
		LEFT JOIN [_Datos].[dbo].p_RXLog xl WITH (NOLOCK) ON xl.rxl_iRecId = r.rec_iid
		LEFT JOIN [_Tablas].[dbo].t_Grupos gru WITH (NOLOCK) ON gru.gru_ccodigo = ta.cod_cGrupo
		left join [_Tablas].[dbo].t_timezone gmt WITH (NOLOCK) on c.cue_iZonaHoraria = gmt.ttz_idkey
		left join [_Datos].[dbo].m_status sta WITH (NOLOCK) on c.cue_iid = sta.sta_iidcuenta
		left join [_Datos].[dbo].m_falsas fal WITH (NOLOCK) on c.cue_iid = fal.fal_iidcuenta
		left join [_Tablas].[dbo].t_resoluciones tr WITH (NOLOCK) on (tr.res_ccodigo = r.rec_idResolucion) 
		left join [_Tablas].[dbo].t_categorizacion tc WITH (NOLOCK) on (tc.cat_cCodigo = r.rec_cCategorizacion) 
		left join [_Datos].[dbo].p_reporte_autoridades ra WITH (NOLOCK) on r.rec_iid = ra.rep_iidrecepcion
		left join [_Tablas].[dbo].t_autoridades au WITH (NOLOCK) on au.aut_ccodigo  = ra.rep_cautoridad
		-- se comentan por falta de uso y performance [2022/05/04]
		--LEFT JOIN [_Datos].[dbo].p_RXImg img with (NOLOCK) ON rxi_iRecId = r.rec_iid // puede haber mas de una imagen no descomentar asi como esta.
		--LEFT JOIN [_Datos].[dbo].p_grabacion_mp4 mp4 with (NOLOCK) ON grm_iidRecepcion = r.rec_iid
';

-- armo todos los filtros
--PRINT 'Armo todos los filtros'



declare @where NVARCHAR(max) = ' WHERE 1=1 '           

--print '@where'+ CAST(@where AS VARCHAR(MAX))

SET @where = @where + ' And r.rec_tfechahora <= DATEADD(MINUTE,1,GetDate()) '    
     
IF @Cuentas != ''   AND @Cuentas != '0'   
	begin
		SET @where = @where + ' AND r.rec_iidcuenta IN (' + @Cuentas + ') ' 
		SET @whereunion = @whereunion + ' AND r.rec_iidcuenta IN (' + @Cuentas + ') ' 
	end
             
IF @CodigosAlarmaExcluir != ''
 begin
  SET @where = @where + ' AND r.rec_calarma NOT IN (''' + replace (@CodigosAlarmaExcluir, ',', ''',''') + ''') '
  SET @whereunion = @whereunion + ' AND r.rec_calarma NOT IN (''' + replace (@CodigosAlarmaExcluir, ',', ''',''') + ''') '
  end
     
IF @cod_cgrupo != ''
  SET @where = @where + ' AND cod_cgrupo IN (''' + replace (@cod_cgrupo, ',', ''',''') + ''') '
 
IF @IdGrupo != 0
Begin
	--2025-02-06 Pablo. el grupo en la tabla d codigos de alarma es un campo seeparado por comas
	--SET @where = @where + ' AND gru.gru_idKey = '+CONVERT(NVARCHAR(10), @IdGrupo)
	Declare @cAux Char(3) =''
	Select @cAux=gru_ccodigo  From  [_Tablas].[dbo].t_Grupos where gru_idKey=@IdGrupo
	If @cAux Is Not null And @cAux!= ''
		SET @where += ' AND ta.cod_cGrupo LIKE ''%'+Rtrim(@cAux)+'%''' 
  
End
IF @cod_cgrupoExcluir != ''
  SET @where = @where + ' AND cod_cgrupo NOT IN (''' + replace (@cod_cgrupoExcluir, ',', ''',''') + ''') '

IF @CodigosAlarma != ''            
Begin
  SET @where = @where + ' AND r.rec_calarma IN (''' + replace (@CodigosAlarma, ',', ''',''') + ''') '            
  SET @whereunion = @whereunion + ' AND r.rec_calarma IN (''' + replace (@CodigosAlarma, ',', ''',''') + ''') '            
End 
IF @cod_nMultiMonitor != ''            
  SET @where = @where + ' AND ta.cod_nMultiMonitor = ''' +@cod_nMultiMonitor+''''
  
              
IF @FechaDesde IS NOT NULL AND @FechaDesde != ''   
begin
  SET @where = @where + ' AND r.rec_tfechahora >= '''+  @FechaDesde  +''''   
  SET @whereunion = @whereunion + ' AND r.rec_tfechahora >= '''+  @FechaDesde  +''''   
end
            
IF @FechaHasta IS NOT NULL AND @FechaHasta != ''               
begin
  SET @where = @where + ' AND r.rec_tfechahora <= '''+  @FechaHasta  +''''   
  SET @whereunion = @whereunion + ' AND r.rec_tfechahora <= '''+  @FechaHasta  +''''   
end
              
if @Estados != ''        
begin
  SET @where = @where + ' AND r.rec_nestado IN ( ' + @Estados + ')'   
  SET @whereunion = @whereunion + ' AND r.rec_nestado IN ( ' + @Estados + ')'   
end
  
if @Operador != ''             
  SET @where = @where + ' AND o.ope_clogin = ''' + @Operador + ''''  
    
if @OperadorNot != ''             
  SET @where = @where + ' AND o.ope_clogin not in (''' + replace(@OperadorNot, ',', ''',''') + ''') '  

if @OperadorNotEmpty != ''             
  SET @where = @where + ' AND o.ope_clogin != '''' '  

SET @where = @where + ' AND (r.rec_nestado != 8 or r.rec_calarma=''#T#'')'    
    
if @Origenes = 'SMARTPANICS'  
Begin
  SET @where = @where + ' AND (rxt_nspip = 1 or rxt_nspsms = 1 )'  
End
else if @Origenes != ''      
begin
  SET @where = @where + ' AND r.rec_norigen IN ( ' + @Origenes + ')' 
  SET @whereunion = @whereunion + ' AND r.rec_norigen IN ( ' + @Origenes + ')' 
end
   
IF @Alertas != ''         
begin
  SET @where = @where + ' AND ta.cod_nalerta IN ( ' + @Alertas + ')'      
  SET @whereunion = @whereunion + ' AND ta.cod_nalerta IN ( ' + @Alertas + ')'      
end
              
IF @Tipos != ''            
begin
  SET @where = @where + ' AND ta.cod_ntipo IN ( ' + @Tipos + ')'     
  SET @whereunion = @whereunion + ' AND ta.cod_ntipo IN ( ' + @Tipos + ')'     
end
      
IF @rec_cdll != ''            
  SET @where = @where + ' AND cab.rec_cdll IN ( ' + @rec_cdll + ' ) '        
     
IF @rec_iid_from != ''  
begin
  SET @where = @where + ' AND (r.rec_iid >= ' + @rec_iid_from + ')'  
  SET @whereunion = @whereunion + ' AND (r.rec_iid >= ' + @rec_iid_from + ')'  
end
      
if @cod_nLeeSonido is not null    
begin
 set @where=@where + ' AND ta.cod_nLeeSonido = ' + CAST(@cod_nLeeSonido AS NVARCHAR(1))   
 set @whereunion=@whereunion + ' AND ta.cod_nLeeSonido = ' + CAST(@cod_nLeeSonido AS NVARCHAR(1))  
end
   
IF @est_nestado != ''  
	SET @where = @where + ' AND ec.est_nestado IN ( ' + @est_nestado + ')'         
ELSE  
	SET @where = @where + ' AND (ec.est_nestado != 2 OR r.rec_calarma = ''_SN'')'    
  
IF @cue_clinea != '' AND @cue_clineaHasta = '' 
begin
	SET @where = @where + ' AND c.cue_clinea = ''' + @cue_clinea + ''''     
	SET @whereunion = @whereunion + ' AND c.cue_clinea = ''' + @cue_clinea + '''' 
end

IF @cue_clinea != '' AND @cue_clineaHasta != '' 
begin
	SET @where = @where + ' AND c.cue_clinea >= ''' + @cue_clinea + '''  AND c.cue_clinea <= ''' + @cue_clineaHasta + ''' '       
	SET @whereunion = @whereunion + ' AND c.cue_clinea >= ''' + @cue_clinea + '''  AND c.cue_clinea <= ''' + @cue_clineaHasta + ''' '   
end

IF @cue_cnombre != ''  
begin
  SET @where = @where + ' AND c.cue_cnombre LIKE '''+'%'+ @cue_cnombre + '%'''
  SET @whereunion = @whereunion + ' AND c.cue_cnombre LIKE '''+'%'+ @cue_cnombre + '%'''
end

IF @cue_ncuentaDesde != ''  
begin
  SET @where = @where + ' AND c.cue_ncuenta >= ''' + @cue_ncuentaDesde + ''''
  SET @whereunion = @whereunion + ' AND c.cue_ncuenta >= ''' + @cue_ncuentaDesde + ''''
end

IF @cue_ncuentaHasta != ''  
begin
  SET @where = @where + ' AND c.cue_ncuenta <= ''' + @cue_ncuentaHasta + ''''
  SET @whereunion = @whereunion + ' AND c.cue_ncuenta <= ''' + @cue_ncuentaHasta + ''''
end

IF @TipoCuenta != ''  
 SET @where = @where + ' AND tip.[tip_nTipo] IN (' + @TipoCuenta + ')'  

IF @TipoCuentaId != ''  
 SET @where = @where + ' AND tip.[tip_idKey] IN (' + @TipoCuentaId + ')' 

IF @CondicionCuenta != ''  
 SET @where = @where + ' AND tip.[tip_ncondicion] IN (' + @CondicionCuenta + ')'  

IF @Prioridad != ''  
begin
 SET @where = @where + ' AND LEFT( r.rec_iprioridad , 1 ) IN (' + @Prioridad + ')'  
 SET @whereunion = @whereunion + ' AND LEFT( r.rec_iprioridad , 1 ) IN (' + @Prioridad + ')'  
end

IF @usuario != ''  
begin
 SET @where = @where + ' AND rec_iusuario = ''' + @usuario + '''' 
 SET @whereunion = @whereunion + ' AND rec_iusuario = ''' + @usuario + '''' 
end

IF @onlyRec_iid != 0
BEGIN
	SET @where = 'WHERE r.rec_iid = '+	CONVERT(NVARCHAR(10), @onlyRec_iid)
	SET @whereunion = 'WHERE r.rec_iid = '+	CONVERT(NVARCHAR(10), @onlyRec_iid)
END

IF @cue_ncuenta != ''  
 SET @where = @where + ' AND LTRIM(RTRIM(c.cue_ncuenta)) = ''' + @cue_ncuenta + ''''  

IF @gps_cIMEI != ''  
   SET @where = @where + ' AND LTRIM(RTRIM(r.gps_cimei)) = ''' + @gps_cIMEI + ''''  
 --SET @where = @where + ' AND LTRIM(RTRIM(g.pos_cimei)) = ''' + @gps_cIMEI + ''''  
 

IF @zona != ''  
 SET @where = @where + ' AND z.zon_ccodigo = ''' + @zona + ''''  

IF @Autoridades != ''  
 SET @where = @where + ' AND aut_ccodigo = ''' + @Autoridades + '''' 

IF @UserTipo = 2
Begin
	SET @where = @where + ' AND cod_nWebCliente = 1'
	SET @whereunion = @whereunion + ' AND cod_nWebCliente = 1'
End

-- BC 407862025: Agregado el filtro por ID Extendido y provincia
IF @idExtendidoDesde != ''  
begin
    SET @where = @where + ' AND c.cue_cIdExtendido >= ''' + @idExtendidoDesde + ''''
	SET @whereunion = @whereunion + ' AND c.cue_cIdExtendido >= ''' + @idExtendidoDesde + ''''
end
IF @idExtendidoHasta != ''  
begin
    SET @where = @where + ' AND c.cue_cIdExtendido <= ''' + @idExtendidoHasta + ''''
	SET @whereunion = @whereunion + ' AND c.cue_cIdExtendido <= ''' + @idExtendidoHasta + ''''
end
IF @provincia != ''
begin
   SET @where = @where + ' AND c.cue_cprovincia = ''' + @provincia + '''' 
   SET @whereunion = @whereunion + ' AND c.cue_cprovincia = ''' + @provincia + '''' 
end
IF @Categorizacion != ''
	SET @where +=' AND r.rec_idResolucion = ''' +@Categorizacion+''''

If @Resolucion != ''
	SET @where += ' AND r.rec_cCategorizacion = ''' +@Resolucion+''''

--print '@where'+ CAST(@where AS VARCHAR(MAX))

declare @SqlFilter NVARCHAR(max);
EXEC [SqlFilterForJson] @Filter = @filter, @ObjectType = 'p_recepcion', @SqlFilter = @SqlFilter OUTPUT

--RANGOS 
--DECLARE @SqlFilterRango AS NVARCHAR(max) = N''  
--EXEC getSqlRangesForToken @token = @token, @alias = 'c.', @SqlFilterRango = @SqlFilterRango OUTPUT
--SET @SqlFilter = @SqlFilter + @SqlFilterRango
--SET @where = @where + @SqlFilter
--set @whereunion = @whereunion + @SqlFilterRango


DECLARE @FilterRangos NVARCHAR(max) = N''  
DECLARE @HasData BIT = 0
DECLARE @JoinRangos NVARCHAR(MAX) = N''  

-- Crear tabla temporal
CREATE TABLE #FilteredAccounts (cue_iid INT PRIMARY KEY)

-- Ejecutar el nuevo store
EXEC [dbo].[GetSqlRangesForToken_V3] @token = @token, @HasDataOutput = @HasData OUTPUT

-- Verificar resultado
IF @HasData = 1
BEGIN
    -- Verificar si es acceso total (flag = -1)
    IF EXISTS (SELECT 1 FROM #FilteredAccounts WHERE cue_iid = -1)
    BEGIN
        -- Acceso total, no agregamos filtro
        DELETE FROM #FilteredAccounts
        SET @JoinRangos = ''
        SET @FilterRangos = ''
    END
    ELSE
    BEGIN
        -- Hay cuentas específicas, agregamos JOIN con alias 'c.'
		SET @JoinRangos = ' INNER JOIN #FilteredAccounts AS fa ON c.cue_iid = fa.cue_iid '
        SET @FilterRangos = '' -- No necesitamos nada en el WHERE
    END
END
ELSE
BEGIN
    -- Sin acceso - no agregamos JOIN pero sí filtro que bloquea todo
    SET @JoinRangos = ''
    SET @FilterRangos = ' AND 1=2 '
END

--print '@where'+ CAST(@where AS VARCHAR(MAX))
    -- recorro las tablas 
declare @items NVARCHAR(max);
select @items = @table;
DECLARE @itemsFinalesPrueba NVARCHAR(MAX)= '';
DECLARE @specialWhere VARCHAR(MAX) = '';

    --print @items
DECLARE  @TempTables TABLE (id int IDENTITY(1,1) PRIMARY KEY,Item NVARCHAR(max))
insert INTO @TempTables select Item FROM dbo.SplitString(@items, ',')

DECLARE  @TempPosTables TABLE (id int IDENTITY(1,1) PRIMARY KEY,Item NVARCHAR(max))
insert INTO @TempPosTables select Item FROM dbo.SplitString(@table_posiciones, ',')

DECLARE @IndexTables INT
SET @IndexTables = 1
--print '*****************INICIO DEL WHILE QUE HACE LA CONCATENACION************************'
	
WHILE ((SELECT COUNT(*) FROM @TempTables WHERE Id = @IndexTables) != 0)
BEGIN
	DECLARE @item NVARCHAR(100)
	select  @item = CAST (Item AS VARCHAR)
		FROM @TempTables 
		WHERE Id = @IndexTables	
	
	DECLARE @positem VARCHAR(100)
	select  @positem = CAST (Item AS VARCHAR)
		FROM @TempPosTables 
		WHERE Id = @IndexTables	

	if @IndexTables > 1
		select @union = @union + ' UNION ALL '

	declare @unionfields NVARCHAR(max) =  @fields 

	declare @posjoinunion NVARCHAR(max) = ''
	Set @posjoinunion = 'LEFT JOIN [_History].[dbo].['+@positem+'] g WITH (NOLOCK) ON (g.pos_idrec = r.rec_iid  and g.[pos_idCuenta] = r.rec_iidcuenta)	 	'
	
	if CHARINDEX('eventospendientes',@item)>0
	Begin
		--SET @rec_fields = replace(@rec_fields,'usuario_cnombre As usr_cnombre',''''' as usr_cnombre' )
		SET @rec_fields = replace(@rec_fields,'Case When usuario_cnombre = ''0'' Then ''Master'' Else usuario_cnombre End As usr_cnombre',''''' as usr_cnombre' )
		SET @rec_fields = replace(@rec_fields,'r.zonas_ccodigo,r.zonas_cdescripcion','r.[zon_cCodigo] As zonas_ccodigo, r.[zon_cDescripcion] As zonas_cdescripcion' )
	End

	IF @export = 0
		BEGIN
			declare @sqlparcial nvarchar(max);
			-- DEDALO 2022/05/04 se agregar whereunion por problemas de performance NO SACAR
			--select @sqlparcial = 'select '+@rec_fields+' '''+@item+''' as tablaDatos '+' from [_Datos].[dbo].['+@item+'] r' +@joinunion + @whereunion
			--Pablo 2022/10/18 se agrego TOP a cada Select por problemas de performance NO SACAR
			--select @sqlparcial = 'select '+@InTop +' '+@rec_fields+' '''+@item+''' as tablaDatos '+' from [_Datos].[dbo].['+@item+'] r' +@joinunion + @whereunion

			--2023-03-10 Pablo. Si el @mostrar es un numero chico y hay muchos eventos en el mes actual, los select individuales de los Union pueden cortar el mes
			set @sqlparcial = 'select '
			if @querysintop = @item
			Begin
				/*--2023-05-19 Pablo. Si el @mostrar es mayor a 1000 fue x que lo selecciono desde DSS
				If @Mostrar >= 1000
					Set @sqlparcial += ' TOP ' + CAST(@Mostrar AS VARCHAR)  
				Else
					set @sqlparcial +=' TOP 1000'
                */
				--2024-05-08 Pablo-Hernan. Si el @mostrar es 1 y @limit es 1, se llamo desde SP para ver el evento en la App
				if @Mostrar = 1 and @limit = 1
					set @sqlparcial +=' TOP 10000'
				Else
				if @mostrarEventoAlarma = 1 and @limit < 5000	--2025-03-20 Pablo : (DSS-1228) Viene de ReporteDealerExec y con Dealers con centenar de cuentas y miles de registros por dia solo traia 1000 del total
				Begin
					set @sqlparcial +=' TOP 5000'
					Set @limit = 5000		--2025-03-26 Pablo : (DSS-1228) Viene de ReporteDealerExec y con Dealers con centenar de cuentas y miles de registros por dia solo muestra 1000 del total general
				End
				Else
					begin
						If @Mostrar >= 1000
							Set @sqlparcial += ' TOP ' + CAST(@Mostrar AS VARCHAR)  
						Else
							set @sqlparcial +=' TOP 1000'
					End
				---
			End
			else
				set @sqlparcial += @InTop 
						
			set @sqlparcial +=' '+@rec_fields+' '''+@item+''' as tablaDatos '+' from [_Datos].[dbo].['+@item+'] r' 
			--set @sqlparcial += @joinunion + @posjoinunion + @whereunion
			set @sqlparcial += @joinunion + @JoinRangos + @posjoinunion + @whereunion + @FilterRangos
			--print '------------ SUMO SELECT AL UNION ------------'
			--print  CAST(@sqlparcial AS VARCHAR(MAX))
			--print '----------------------------------------------------'
			select @union = @union + @sqlparcial
		END
	ELSE
		BEGIN
			--select @union = @union + 'select '+@rec_fields+' from [_Datos].[dbo].['+@item+'] r' +@joinunion
			declare @sqlparcial2 nvarchar(max);
			-- DEDALO 2022/05/04 se agregar whereunion por problemas de performance NO SACAR
			--select @sqlparcial2 = 'select '+@rec_fields+' 1 as Dummi from [_Datos].[dbo].['+@item+'] r' +@joinunion+ @whereunion
			--Pablo 2022/10/18 se agrego TOP a cada Select por problemas de performance NO SACAR
			set @sqlparcial2 = 'select '+@InTop +' '+@rec_fields+' 1 as Dummi from [_Datos].[dbo].['+@item+'] r'
			--set @sqlparcial2 += @joinunion+ @posjoinunion +@whereunion
			set @sqlparcial2 += @joinunion + @JoinRangos + @posjoinunion + @whereunion + @FilterRangos
			--print '------------ SUMO SELECT AL UNION ------------'
			--print  CAST(@sqlparcial2 AS VARCHAR(MAX))
			--print '----------------------------------------------------'
			select @union = @union + @sqlparcial2
		END
			
	Set @union += @InSort

	select @IndexTables = @IndexTables + 1

	SET @itemsFinalesPrueba = @itemsFinalesPrueba + @item;
END
--PRINT @sqlparcial
--PRINT '----xxxxxxxxxxxxxxxxxxxxxxxxx-----------EL ULTIMO CONCAT DE @union ----------xxxxxxxxxxxxxxxxxxxxxxxxxxxx--------- '

declare @sqlrows nvarchar(max)= ''
select @sqlrows = @sqlrows + ' ,ROW_NUMBER() OVER (ORDER BY r.rec_iid) AS RowNumber FROM ('+ @union + @join+ @where +') r '
--print @sqlrows
--Total Rows mejorar para usar un solo llamado
DECLARE @DynamicSqlTotalRows NVARCHAR(MAX) 
DECLARE @DynamicSqlTotalRowsParams NVARCHAR(MAX) 
SET @DynamicSqlTotalRows = ';with CTE as ( '+@union+'),
 cte2 as (SELECT '+@Top+' r.rec_iid from CTE r ' + @join + @where + @specialWhere + ') select @totalrows=count(*) from cte2 '

SET @DynamicSqlTotalRowsParams = '@TotalRows INT OUTPUT'
 -- pongo el mostrar como limite para el total de registros y el paginador, pedido por PABLO CAS por reclamo de vicar
-- select @DynamicSqlTotalRows DynamicSqlTotalRows
	 	 
 -- SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED;
 -- agregue los nolock en lugar del uncommitted dedalo 5/8/2019
 
EXECUTE sp_executesql @DynamicSqlTotalRows, @DynamicSqlTotalRowsParams, @totalrows OUTPUT  
 
-- paginacion abajo 

--2025-01-24 Pablo : Saque el r.*, porque si viene por @export=1 que tiene columnas filtradas, igualmente traia todo de r
/*
IF @export = 0
Begin
	set @sql = ';with CTE as (' +@union+') 
		select r.*,' + @fields + ' from CTE r' + @join + @where + @specialWhere
		--+' ORDER BY ' +REPLACE(REPLACE(REPLACE(@SqlSort,'r.','')  ,'o.','') ,'u.','')
		+' ORDER BY ' +@SqlSort
		+' OFFSET '+convert(varchar(10),(@page - 1) * @limit)+' ROWS FETCH NEXT '+cast(@limit as NVARCHAR(6))+' ROWS ONLY'    
End
Else
Begin
	set @sql = ';with CTE as (' +@union+') 
		select ' + @fields + ' from CTE r' + @join + @JoinRangos + @where + @FilterRangos + @specialWhere
		--+' ORDER BY ' +REPLACE(REPLACE(REPLACE(@SqlSort,'r.','')  ,'o.','') ,'u.','')
		+' ORDER BY ' +@SqlSort
		+' OFFSET '+convert(varchar(10),(@page - 1) * @limit)+' ROWS FETCH NEXT '+cast(@limit as NVARCHAR(6))+' ROWS ONLY'    
End
*/

	set @sql = ';with CTE as (' +@union+') '
IF @export = 0
	set @sql +=' select r.*,'
Else
	set @sql +=' select     '

set @sql += ' ' + @fields + ' from CTE r' + @join + @JoinRangos + @where + @FilterRangos + @specialWhere
set @sql +=' ORDER BY ' +@SqlSort
set @sql +=' OFFSET '+convert(varchar(10),(@page - 1) * @limit)+' ROWS FETCH NEXT '+cast(@limit as NVARCHAR(6))+' ROWS ONLY'    


--select @sql
--Pablo Debug
/*
Declare @message nVarChar(Max) = @sql
BEGIN TRY
	INSERT INTO [_LogDB].[dbo].[Log4TSQL] ([Date], [Thread], [Level], [Logger], [Message], [Exception], [DbProcId], [DbSchema], [DbName], [DbServer])
									Values (Getdate(), @@SPID, 'DEBUG', OBJECT_NAME(@@PROCID), @message, '', @@PROCID, schema_name(), db_name(), @@SERVERNAME )
END TRY
BEGIN CATCH
END CATCH;		
*/

/*
print '-------'
--Si @SQL es muy largo (19200 chars) el print se corta, por lo cual hay que imprimirlo por lotes
DECLARE @StartIndex INT = 1
DECLARE @ChunkSize INT = 4000

WHILE @StartIndex <= LEN(@SQL)
BEGIN
    DECLARE @Chunk NVARCHAR(MAX)
    SET @Chunk = SUBSTRING(@SQL, @StartIndex, @ChunkSize)

    -- Encuentra el último espacio en blanco en el fragmento
    DECLARE @LastSpaceIndex INT = CHARINDEX(' ', REVERSE(@Chunk))

    -- Si se encuentra un espacio, ajusta el fragmento
    IF @LastSpaceIndex > 0
        SET @Chunk = SUBSTRING(@Chunk, 1, @ChunkSize - @LastSpaceIndex)

    -- Imprime el fragmento
    PRINT @Chunk

    -- Actualiza el índice de inicio para la próxima iteración
    SET @StartIndex = @StartIndex + @ChunkSize - @LastSpaceIndex
END
*/

Execute (@SQL)