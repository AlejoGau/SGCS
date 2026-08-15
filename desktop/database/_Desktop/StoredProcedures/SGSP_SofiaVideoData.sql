CREATE OR ALTER PROCEDURE [dbo].[SGSP_SofiaVideoData]
    @iRecID INT
AS
BEGIN
    SET NOCOUNT ON;

    -- Recupera los metadatos del evento desde p_recepcion (no se contemplan tablas históricas).
    DECLARE @idCta INT, @cAlarma CHAR(3), @cZona CHAR(3), @cContenido VARCHAR(MAX), @routeId INT;
    SELECT 
        @idCta = rec_iidcuenta, 
        @cAlarma = rec_calarma, 
        @cZona = rec_czona, 
        @cContenido = rec_ccontenido 
    FROM _datos..p_recepcion WITH (NOLOCK)
    WHERE rec_iid = @iRecID;

    IF @cAlarma = '_SR'
    BEGIN
        SELECT TOP 1 @routeId = rxt_iRouteID
        FROM _datos..p_RXtraInfo WITH (NOLOCK)
        WHERE rxt_iRecId = @iRecID;

        IF @routeId IS NULL
        BEGIN
            RAISERROR('SGSP_SofiaVideoData -> no se encontro rxt_iRouteID para rec %d', 10, 1, @iRecID);
        END
    END

    /*
        Diccionario de datos de la salida (todas las filas comparten estructura):
        - id: Identificador de la fuente (tabla origen).
        - source: Tipo de fuente ('cuentas_video', 'cuentas_video_links', 'rximg', 'grabacion_mp4').
        - cuv_iidCuenta: Cuenta asociada a la fuente.
        - link / link_dss: Enlace directo y JSON DSS de la cámara.
        - video_id / czona / launch / descripcion / nombre / plataforma: Metadatos de la cámara o recurso.
        - sra_iid: Identificador del punto de control (solo eventos ruta; proviene de `SV_Route_AnalysisPoints.sra_iid` filtrado por `rxt_iRouteID`).
        - sra_cReference: Referencia/nombre del punto de control.
        - sra_cConfig: JSON de configuración asociado al punto de control.
    */

    /*
        Contexto de rutas (_SR):
        - Una ruta es un contenedor con puntos de control (cámaras) y un programa horario.
        - El scheduler genera el evento `_SR` incluyendo en `rec_ccontenido` los datos de la ruta ejecutada.
        - Este stored obtiene la cuenta/alarma, identifica si el evento es `_SR` y, en ese caso,
          usa el `rxt_iRouteID` de `p_RXtraInfo` para relacionar cada cámara con sus puntos de
          control en `SV_Route_AnalysisPoints`, devolviendo el JSON de configuración que se
          almacenó como `sra_cConfig`.
        - Para alarmas que no son `_SR`, la salida es idéntica al comportamiento anterior.
    */

    SELECT * FROM (
        SELECT 
            cuv_idkey AS id,
            'cuentas_video' AS source,
            cuv_iidCuenta,
            cuv_cLink AS link,
            cuv_cLinkDSS AS link_dss,
            cuv_iVideoID AS video_id,
            NULL AS czona,
            tvi_nLaunch AS launch,
            tvi_cdescripcion AS descripcion,
            cuv_cCameraName AS nombre,
            tvi_iplatform AS plataforma,
            -- Datos adicionales del punto de control (solo para eventos de ruta).
            CASE WHEN @cAlarma = '_SR' THEN routeData.sra_iid END AS sra_iid,
            CASE WHEN @cAlarma = '_SR' THEN routeData.sra_cReference END AS sra_cReference,
            CASE WHEN @cAlarma = '_SR' THEN routeData.sra_cConfig END AS sra_cConfig
        FROM _Datos.dbo.m_cuentas_video WITH (NOLOCK)
        INNER JOIN _Tablas.dbo.t_VideoID WITH (NOLOCK) ON cuv_iVideoID = tvi_iid
        OUTER APPLY (
            -- Relaciona la cámara con el punto de control configurado en SV_Route_AnalysisPoints.
            SELECT TOP 1
                rap.sra_iid,
                RTRIM(rap.sra_cReference) AS sra_cReference,
                rap.sra_cConfig
            FROM _Datos..SV_Route_AnalysisPoints rap WITH (NOLOCK)
            INNER JOIN _Datos..SV_Routes rt WITH (NOLOCK) ON rt.svr_iid = rap.sra_iRouteId
            WHERE @cAlarma = '_SR'
              AND rap.sra_iRouteId = @routeId
              AND rt.svr_iCuentaId = @idCta
              AND rap.sra_iCameraRefId = cuv_idkey
            ORDER BY rap.sra_iOrder
        ) AS routeData
        WHERE cuv_iidCuenta = @idCta
          AND (
                @cAlarma <> '_SR'
                OR routeData.sra_iid IS NOT NULL  -- En eventos de ruta, solo devolver cámaras que estén configuradas en puntos de control.
              )

        UNION ALL

        SELECT 
            cvl_idkey AS id,
            'cuentas_video_links' AS source,
            cvl_iidCuenta AS cuv_iidCuenta,
            cvl_cLink AS link,
            cvl_cLinkDSS AS link_dss,
            cvl_iVideoID AS video_id,
            cvl_czona AS czona,
            tvi_nLaunch AS launch,
            tvi_cdescripcion AS descripcion,
            cvl_cCameraName AS nombre,
            tvi_iplatform AS plataforma,
            CASE WHEN @cAlarma = '_SR' THEN routeData.sra_iid END AS sra_iid,
            CASE WHEN @cAlarma = '_SR' THEN routeData.sra_cReference END AS sra_cReference,
            CASE WHEN @cAlarma = '_SR' THEN routeData.sra_cConfig END AS sra_cConfig
        FROM _Datos.dbo.m_cuentas_video_links WITH (NOLOCK)
        INNER JOIN _Tablas.dbo.t_VideoID WITH (NOLOCK) ON cvl_iVideoID = tvi_iid
        OUTER APPLY (
            SELECT TOP 1
                rap.sra_iid,
                RTRIM(rap.sra_cReference) AS sra_cReference,
                rap.sra_cConfig
            FROM _Datos..SV_Route_AnalysisPoints rap WITH (NOLOCK)
            INNER JOIN _Datos..SV_Routes rt WITH (NOLOCK) ON rt.svr_iid = rap.sra_iRouteId
            WHERE @cAlarma = '_SR'
              AND rap.sra_iRouteId = @routeId
              AND rt.svr_iCuentaId = @idCta
              AND rap.sra_iCameraRefId = cvl_idkey
            ORDER BY rap.sra_iOrder
        ) AS routeData
        WHERE cvl_iidCuenta = @idCta
          AND (
                @cAlarma <> '_SR'
                OR routeData.sra_iid IS NOT NULL  -- Excluir cámaras no asociadas a puntos de control en rutas.
              )

        UNION ALL

        SELECT 
            rxi_iid AS id,
            'rximg' AS source,
            @idCta AS cuv_iidCuenta,
            rxi_cCarpeta + CASE WHEN RIGHT(rxi_cCarpeta,1) = '\' THEN '' ELSE '\' END + rxi_cImg AS link,
            NULL AS link_dss,
            NULL AS video_id,
            NULL AS czona,
            NULL AS launch,
            NULL AS descripcion,
            NULL AS nombre,
            NULL AS plataforma,
            NULL AS sra_iid,
            NULL AS sra_cReference,
            NULL AS sra_cConfig
        FROM _Datos.dbo.p_RXImg WITH (NOLOCK)
        WHERE rxi_iRecId = @iRecID
          AND @cAlarma <> '_SR' -- Las imágenes sueltas no forman parte del flujo de rutas.

        UNION ALL

        SELECT 
            grm_idkey AS id,
            'grabacion_mp4' AS source,
            @idCta AS cuv_iidCuenta,
            grm_cCarpeta + CASE WHEN RIGHT(grm_cCarpeta,1) = '\' THEN '' ELSE '\' END + grm_cArchivo AS link,
            NULL AS link_dss,
            NULL AS video_id,
            NULL AS czona,
            NULL AS launch,
            NULL AS descripcion,
            NULL AS nombre,
            NULL AS plataforma,
            NULL AS sra_iid,
            NULL AS sra_cReference,
            NULL AS sra_cConfig
        FROM _Datos.dbo.p_grabacion_mp4 WITH (NOLOCK)
        WHERE grm_iidRecepcion = @iRecID
          AND @cAlarma <> '_SR' -- Excluir grabaciones MP4 en eventos de ruta.
    ) AS Q;
END