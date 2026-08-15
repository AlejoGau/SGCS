CREATE OR ALTER PROCEDURE [dbo].[SGSP_VerificaGeocercaCoberturaSP]
    @Dealer Char(3)='',
    @Lat Float = 0.0,
	@Lng Float = 0.0,
	@IdCta Int = 0
WITH EXECUTE AS CALLER
AS
--Es el store que ejecuta el handler de Validacion de area de Cobertura post-registro de una Signature [CheckGeofenceCoverageByDealer]
--Autor :Pablo O. Canónico
--Fecha :08/01/2026
Set NoCount On
BEGIN TRY
	Declare @Result VarChar(20) = ''

    ;WITH geocerca_existe AS (
		SELECT 
            [dsp_cdealer],
            CASE 
                WHEN [dsp_config] LIKE '%geocercaCoords%'
                    AND JSON_VALUE([dsp_config], '$.geocercaCoords') IS NOT NULL
                    AND JSON_VALUE([dsp_config], '$.geocercaCoords') != '{}'
                    AND LEN(LTRIM(RTRIM(JSON_VALUE([dsp_config], '$.geocercaCoords')))) > 2
                THEN 1
                ELSE 0
            END AS tiene_geocerca
        FROM [_Datos].[dbo].[m_dealer_spconfig]
        WHERE [dsp_cdealer] = @Dealer
    ),
    extracted_coords AS (
        SELECT 
            [dsp_cdealer],
            CAST(JSON_VALUE(value, '$.lat') AS FLOAT) AS coord_lat,
            CAST(JSON_VALUE(value, '$.lng') AS FLOAT) AS coord_lng,
            ROW_NUMBER() OVER (PARTITION BY [dsp_cdealer] ORDER BY (SELECT 1)) AS rn
        FROM [_Datos].[dbo].[m_dealer_spconfig]
        CROSS APPLY OPENJSON(JSON_VALUE([dsp_config], '$.geocercaCoords'))
        WHERE [dsp_cdealer] = @Dealer
            AND [dsp_config] LIKE '%geocercaCoords%'
            AND JSON_VALUE([dsp_config], '$.geocercaCoords') IS NOT NULL
            AND JSON_VALUE([dsp_config], '$.geocercaCoords') != '{}'
            AND LEN(LTRIM(RTRIM(JSON_VALUE([dsp_config], '$.geocercaCoords')))) > 2
    ),
    polygon_coords AS (
        SELECT 
            [dsp_cdealer],
            STRING_AGG(CAST(coord_lng AS VARCHAR(20)) + ' ' + CAST(coord_lat AS VARCHAR(20)), ',') 
                + ',' + (SELECT CAST(coord_lng AS VARCHAR(20)) + ' ' + CAST(coord_lat AS VARCHAR(20)) FROM extracted_coords ec WHERE ec.rn = 1 AND ec.[dsp_cdealer] = extracted_coords.[dsp_cdealer])
            AS polygon_wkt
        FROM extracted_coords
        GROUP BY [dsp_cdealer]
    )
    SELECT @Result = CASE 
        WHEN @Lat = 0.0 AND @Lng = 0.0 AND ge.tiene_geocerca = 1
        THEN 'INVALIDA'
        WHEN @Lat = 0.0 AND @Lng = 0.0 AND ge.tiene_geocerca = 0
        THEN 'VALIDA'
        WHEN ge.tiene_geocerca = 0
        THEN 'SIN_GEOCERCA'
        WHEN geometry::STGeomFromText('POLYGON((' + pc.polygon_wkt + '))', 4326)
            .STContains(geometry::STGeomFromText('POINT(' + CAST(@Lng AS VARCHAR(20)) + ' ' + CAST(@Lat AS VARCHAR(20)) + ')', 4326)) = 1
        THEN 'DENTRO'
        ELSE 'FUERA'
    END
    FROM geocerca_existe ge
    LEFT JOIN polygon_coords pc ON ge.[dsp_cdealer] = pc.[dsp_cdealer]

	IF @Result IN ('INVALIDA','FUERA') And @IdCta>0
	BEGIN
		Update [_Datos].[dbo].[m_cuentas]
			Set [cue_clinea] = '_FC'	--Dealer interno
		Where [cue_iid] = @IdCta
	END

	SELECT @Result AS Result;

END TRY
BEGIN CATCH
	IF ERROR_NUMBER() = 2627
	BEGIN
		PRINT 'Handling PK violation...';
	END;
	ELSE IF ERROR_NUMBER() = 547
	BEGIN
		PRINT 'Handling CHECK/FK constraint violation...';
	END;
	ELSE IF ERROR_NUMBER() = 515
	BEGIN
		PRINT 'Handling NULL violation...';
	END;
	ELSE IF ERROR_NUMBER() = 245
	BEGIN
		PRINT 'Handling conversion error...';
	END;
	ELSE
	BEGIN
		PRINT 'Re-throwing error...';
	END;

	PRINT 'Error Number  : ' + CAST(ERROR_NUMBER() AS VARCHAR(10));
	PRINT 'Error Message : ' + ERROR_MESSAGE();
	PRINT 'Error Severity: ' + CAST(ERROR_SEVERITY() AS VARCHAR(10));
	PRINT 'Error State   : ' + CAST(ERROR_STATE() AS VARCHAR(10));
	PRINT 'Error Line    : ' + CAST(ERROR_LINE() AS VARCHAR(10));
	PRINT 'Error Proc    : ' + ISNULL(ERROR_PROCEDURE(), 'Not within proc');

END CATCH