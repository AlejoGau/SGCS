CREATE OR ALTER PROCEDURE [dbo].[SGSP_UniviewAnalyticsGetTargets]
AS
BEGIN
    SET NOCOUNT ON;

    ;WITH Targets AS
    (
        SELECT
            cuv_idKey AS idKey,
            cuv_iidCuenta AS idCta,
            cue_ncuenta AS Cuenta,
            cue_cIMEI AS IMEI,
            cuv_cLinkDSS AS cLinkDSS,
            CAST('' AS varchar(100)) AS Zona,
            tvi_cdescripcion AS VideoTypeRaw
        FROM [dbo].[m_cuentas]
        INNER JOIN [dbo].[m_cuentas_video] ON cue_iid = cuv_iidCuenta
        INNER JOIN [_Tablas].[dbo].[t_VideoID] ON tvi_iid = cuv_iVideoID
        INNER JOIN [_Desktop].[dbo].[m_estado_cuenta_cab_situacion] ON cue_iid = est_iidcuenta AND Situacion = 'Habilitado'
        WHERE tvi_cdescripcion IN ('UNV:', 'UVC:')

        UNION ALL

        SELECT
            cvl_idKey AS idKey,
            cvl_iidCuenta AS idCta,
            cue_ncuenta AS Cuenta,
            cue_cIMEI AS IMEI,
            cvl_cLinkDSS AS cLinkDSS,
            cvl_cZona AS Zona,
            tvi_cdescripcion AS VideoTypeRaw
        FROM [dbo].[m_cuentas]
        INNER JOIN [dbo].[m_cuentas_video_links] ON cue_iid = cvl_iidCuenta
        INNER JOIN [_Tablas].[dbo].[t_VideoID] ON tvi_iid = cvl_iVideoID
        INNER JOIN [_Desktop].[dbo].[m_estado_cuenta_cab_situacion] ON cue_iid = est_iidcuenta AND Situacion = 'Habilitado'
        WHERE tvi_cdescripcion IN ('UNV:', 'UVC:')
    ),
    Parsed AS
    (
        SELECT
            *,
            CASE
                WHEN NULLIF(LTRIM(RTRIM(cLinkDSS)), '') IS NULL THEN 0
                WHEN ISJSON(cLinkDSS) = 1 THEN 1
                ELSE 0
            END AS IsValidJson
        FROM Targets
    )
    SELECT
        idKey,
        idCta,
        Cuenta,
        IMEI,
        cLinkDSS,
        Zona,
        REPLACE(VideoTypeRaw, ':', '') AS VideoType,
        CASE
            WHEN VideoTypeRaw = 'UNV:' THEN 'LOCAL'
            WHEN VideoTypeRaw = 'UVC:' THEN 'CLOUD'
        END AS ConnectionType,
        IsValidJson,
        CASE
            WHEN IsValidJson = 0 THEN
                CASE
                    WHEN NULLIF(LTRIM(RTRIM(cLinkDSS)), '') IS NULL THEN 'EMPTY_METADATA'
                    ELSE 'INVALID_JSON'
                END
            ELSE NULL
        END AS InvalidReason,
        CASE WHEN IsValidJson = 1 THEN JSON_VALUE(cLinkDSS, '$.formdata._ip') END AS Ip,
        CASE WHEN IsValidJson = 1 THEN TRY_CONVERT(int, JSON_VALUE(cLinkDSS, '$.formdata._port')) END AS Port,
        CASE WHEN IsValidJson = 1 THEN JSON_VALUE(cLinkDSS, '$.formdata._user') END AS Username,
        CASE WHEN IsValidJson = 1 THEN JSON_VALUE(cLinkDSS, '$.formdata._password') END AS Password,
        CASE WHEN IsValidJson = 1 THEN JSON_VALUE(cLinkDSS, '$.formdata._nube') END AS CloudProvider,
        CASE
            WHEN IsValidJson = 1 AND JSON_VALUE(cLinkDSS, '$.formdata._nube') = 'Cloud'
                THEN 'en.ezcloud.uniview.com'
            WHEN IsValidJson = 1 AND JSON_VALUE(cLinkDSS, '$.formdata._nube') = 'OEM'
                THEN 'global.star4live.com'
            ELSE NULL
        END AS CloudUrl,
        CASE
            WHEN IsValidJson = 1 AND VideoTypeRaw = 'UVC:' THEN 443
            ELSE NULL
        END AS CloudPort,

        CASE
            WHEN IsValidJson = 1 AND VideoTypeRaw = 'UVC:' THEN JSON_VALUE(cLinkDSS, '$.formdata._user')
            ELSE NULL
        END AS CloudUsername,

        CASE
            WHEN IsValidJson = 1 AND VideoTypeRaw = 'UVC:' THEN JSON_VALUE(cLinkDSS, '$.formdata._password')
            ELSE NULL
        END AS CloudPassword,

        CASE
            WHEN IsValidJson = 1 THEN JSON_VALUE(cLinkDSS, '$.formdata._name')
            ELSE NULL
        END AS SiteName,

        CASE
            WHEN IsValidJson = 1 THEN TRY_CONVERT(int, JSON_VALUE(cLinkDSS, '$.formdata._camara'))
            ELSE NULL
        END AS Channel,

        CONVERT(varchar(64), HASHBYTES(
            'SHA2_256',
            CONCAT(
                ISNULL(VideoTypeRaw, ''), '|',
                ISNULL(cLinkDSS, ''), '|',
                ISNULL(Zona, '')
            )
        ), 2) AS ConfigurationHash
    FROM Parsed
    ORDER BY idKey, idCta;
END;