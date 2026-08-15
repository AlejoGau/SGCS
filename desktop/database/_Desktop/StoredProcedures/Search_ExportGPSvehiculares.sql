CREATE OR ALTER PROCEDURE [dbo].[Search_ExportGPSvehiculares]
(
    @token NVARCHAR(200) = NULL,
	@dealer char(3) = '',
	@ctadesde char(4) = '',
	@ctahasta char(4) = ''
)
AS
BEGIN
    SET NOCOUNT ON;

    SELECT  
          [cue_iid] AS IDINTERNO
        , [cue_clinea] AS DEALER
        , [cue_ncuenta] AS NUMERO_CUENTA
        , [cue_cnombre] AS NOMBRE_CUENTA
        , [DOMAIN] AS MATRICULA
        , [YEAR] AS ANIO
        , VB.[Name] AS MARCA
        , VM.[Name] AS MODELO
        , [COLOUR] AS COLOR
        , [SIM1] AS TELEFONO
        , [cue_cimei] AS IMEI
        , CAST([cue_cprovincia] AS NVARCHAR(50)) AS CODIGO_ESTADO
        , [pro_cdescripcion] AS NOMBRE_ESTADO
        , [cue_ccustom] AS EXPEDIENTE
        , [usu_cnombre] AS RESPONSABLE
        , [cue_dFechaUltimaAlarmaRecibida] AS ULTIMA_ALARMA
        , [gps_tfechahora] AS ULTIMA_POSICION

        -- ACTUALIZACION con minutos / horas / días
        , CASE 
            WHEN gps_tfechahora IS NULL 
                THEN 'S/A'

            WHEN DATEDIFF(MINUTE, gps_tfechahora, GETDATE()) < 60
                THEN CAST(DATEDIFF(MINUTE, gps_tfechahora, GETDATE()) AS VARCHAR(10)) + ' min'

            WHEN DATEDIFF(HOUR, gps_tfechahora, GETDATE()) < 24
                THEN CAST(DATEDIFF(HOUR, gps_tfechahora, GETDATE()) AS VARCHAR(10)) + ' hs'

            ELSE
                CAST(DATEDIFF(DAY, gps_tfechahora, GETDATE()) AS VARCHAR(10)) + ' días'
          END AS ACTUALIZACION

    FROM [_Datos].[dbo].[m_cuentas]
    LEFT JOIN [_Tablas].[dbo].[t_provincias]
        ON cue_cprovincia = [pro_ccodigo]
    LEFT JOIN [_Datos].[dbo].[DispositivoMovil]
        ON cue_iid = OwnerId
    LEFT JOIN [_Tablas].[dbo].[t_tipos]
        ON cue_ctipo = tip_ccodigo
    LEFT JOIN [_Datos].[dbo].[m_CuentasXtraInfo]
        ON cue_iid = cue_iidCuenta
    LEFT JOIN [_Datos].[dbo].[m_usuarios]
        ON usu_iidcuenta = cue_iid
       AND usu_icodigo   = 1 
    LEFT JOIN [_Tablas].[dbo].[VehicleBrand] AS VB
        ON VehicleBrand = VB.Id  
    LEFT JOIN [_Tablas].[dbo].[VehicleModel] AS VM
        ON VehicleModel = VM.Id
    LEFT JOIN [_Datos].[dbo].[p_Gps]
        ON cue_iid = gps_idCuenta
       AND cue_cIMEI = gps_cIMEI
    WHERE tip_nCondicion = 1
      AND tip_nTipo = 1
	  And ( [cue_clinea] = @Dealer Or @Dealer = '' )
	  And ( [cue_ncuenta] >= @ctadesde Or @ctadesde = '' )
	  And ( [cue_ncuenta] <= @ctahasta Or @ctahasta = '' )

    ORDER BY cue_clinea, cue_ncuenta;
END