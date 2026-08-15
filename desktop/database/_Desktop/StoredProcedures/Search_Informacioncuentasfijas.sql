CREATE OR ALTER PROCEDURE [dbo].[Search_Informacioncuentasfijas]
(
    @token NVARCHAR(200) = NULL     -- para ser compatible con el esquema de SearchObject
    -- si quisieras filtros, podés sumar @filter NVARCHAR(MAX) etc.
)
AS
BEGIN
    SET NOCOUNT ON;

    SELECT  
          [cue_iid] AS IDINTERNO
        , TP.[pan_cdescripcion] AS PANEL
        , [cue_cCustom] AS EXPEDIENTE
        , [cue_clinea] AS DEALER
        , [cue_ncuenta] AS NUMERO_CUENTA
        , [cue_cnombre] AS NOMBRE_CUENTA
        , [cue_ccalle] AS CALLE
        , [cue_clocalidad] AS LOCALIDAD
        , [cue_cprovincia] AS CODIGO_ESTADO
        , [pro_cdescripcion] AS NOMBRE_ESTADO
        , [cue_dFechaOPN] AS ULTIMA_APERTURA
        , [cue_dFechaCLO] AS ULTIMO_CIERRE
        , [cue_dFechaUltimaAlarmaRecibida] AS ULTIMA_ALARMA
    FROM [_Datos].[dbo].[m_cuentas]
        LEFT JOIN [_Tablas].[dbo].[t_provincias]
            ON cue_cprovincia = pro_ccodigo
        LEFT JOIN [_Datos].[dbo].m_CuentasXtraInfo
            ON cue_iid = cue_iidCuenta
        LEFT JOIN [_Datos].[dbo].[m_paneles] AS MP
            ON cue_iid = pan_iidcuenta
        LEFT JOIN [_Tablas].[dbo].[t_paneles] AS TP
            ON MP.pan_ccodigo = TP.pan_ccodigo
        LEFT JOIN [_Tablas].[dbo].[t_tipos]
            ON cue_ctipo = tip_ccodigo
    WHERE tip_nCondicion = 0
    ORDER BY cue_clinea, cue_ncuenta;
END