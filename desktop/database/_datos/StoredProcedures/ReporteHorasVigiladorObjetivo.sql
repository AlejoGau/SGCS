--EXEC ReporteHorasVigiladorObjetivo

CREATE OR ALTER PROCEDURE ReporteHorasVigiladorObjetivo
	@page INT = 1,               
	@start INT = 0,               
	@limit INT = 1000,               
	@sort VARCHAR(256) = '',              
	@filter VARCHAR(2048) = '',        
	@_dc VARCHAR(256) = '',  
	@token VARCHAR(128) = '',

	@mes int = 1,
	@anio int = 2024,
	@idCuenta int = 0,
	              
	@totalrows INT = 1 --OUTPUT  
AS
BEGIN
    CREATE TABLE #TablaTemporal (
        EMPRESA VARCHAR(150),
        MES VARCHAR(10),
        OBJETIVO VARCHAR(150),
		VIGILADOR VARCHAR(150),
		IDENTIFICADOR VARCHAR(150),
		OBSERVACION VARCHAR(MAX),
		cue_ctipo VARCHAR(150),
		tip_cdescripcion VARCHAR(150),
		FECHA DATE,
		vus_iusuario INT,
		vus_logout_idrec INT,
		ACCION VARCHAR(150),
		vus_dlogin DATETIME,
		vus_dlogout DATETIME
		)
	INSERT INTO #TablaTemporal (EMPRESA, MES, OBJETIVO, VIGILADOR, IDENTIFICADOR, OBSERVACION,
	cue_ctipo, tip_cdescripcion, FECHA, vus_iusuario, vus_logout_idrec, ACCION, vus_dlogin, vus_dlogout)
	SELECT 
		D.lin_crazonsocial AS EMPRESA, 
		@mes AS MES, 
		cue_cnombre AS OBJETIVO, 
		ISNULL(E.usu_cnombre, 'VIGILADOR ELIMINADO') AS VIGILADOR,
		E.usu_cIdExtendido AS IDENTIFICADOR,
		CONVERT(VARCHAR(MAX),E.usu_mobservacion) AS OBSERVACION,
		cue_ctipo, 
		C.tip_cdescripcion,
		CONVERT(VARCHAR(5), YEAR(A.vus_dlogin)) + '-' +
		CONVERT(VARCHAR(5), MONTH(A.vus_dlogin)) + '-' +
		CONVERT(VARCHAR(5), DAY(A.vus_dlogin)) AS FECHA, 
		A.vus_iusuario,
		A.vus_logout_idrec,
		CASE 
			WHEN F.rec_calarma = 'V97' OR G.rec_calarma = 'V97' THEN 'V97 8hs'
			ELSE 'suma: ' + CONVERT(VARCHAR(50),(DATEDIFF(minute, A.vus_dlogin, A.vus_dlogout) / 60)) + ':' + 
	CONVERT(VARCHAR(50),(DATEDIFF(minute, A.vus_dlogin, A.vus_dlogout) % 60))
		END AS ACCION,
		A.vus_dlogin,
		A.vus_dlogout
	FROM VigicontrolUserSessions A 
	INNER JOIN m_cuentas B ON A.vus_idcuenta=B.cue_iid --AND A.vus_iusuario=B.
	INNER JOIN _Tablas..t_tipos C ON B.cue_ctipo=C.tip_ccodigo
	INNER JOIN _Tablas..t_lineas D ON B.cue_clinea=D.lin_ccodigo
	LEFT JOIN m_usuarios E ON A.vus_iusuario=E.usu_icodigo AND E.usu_iidcuenta=A.vus_idcuenta
	LEFT JOIN p_recepcion F ON A.vus_logout_idrec=F.rec_iid
	LEFT JOIN p_recepcion202401 G ON A.vus_logout_idrec=G.rec_iid
	WHERE YEAR(A.vus_dlogin) = @anio AND MONTH(A.vus_dlogin) = @mes --AND DAY(A.vus_dlogin) = 19
	AND A.vus_dlogout IS NOT NULL;

	WITH CTE AS (
		SELECT *,
           ROW_NUMBER() OVER (PARTITION BY EMPRESA, MES, OBJETIVO, VIGILADOR, FECHA ORDER BY 
		   CASE WHEN ACCION = 'V97 8hs' THEN 0 ELSE 1 END) AS rn
		FROM #TablaTemporal
	)
	SELECT A.EMPRESA, A.MES, A.OBJETIVO, A.VIGILADOR, A.FECHA, A.ACCION
	FROM (
    SELECT *,
           ROW_NUMBER() OVER (PARTITION BY EMPRESA, MES, OBJETIVO, VIGILADOR, FECHA ORDER BY 
		   CASE WHEN ACCION = 'V97 8hs' THEN 0 ELSE 1 END) AS rn
    FROM #TablaTemporal
    WHERE ACCION = 'V97 8hs'
    UNION ALL
    SELECT *,
           ROW_NUMBER() OVER (PARTITION BY EMPRESA, MES, OBJETIVO, VIGILADOR, FECHA ORDER BY 
		   CASE WHEN ACCION <> 'V97 8hs' THEN 0 ELSE 1 END) AS rn
    FROM #TablaTemporal AS T
    WHERE ACCION <> 'V97 8hs'
        AND NOT EXISTS (
            SELECT 1
            FROM #TablaTemporal AS TT
            WHERE TT.ACCION = 'V97 8hs'
                AND T.EMPRESA = TT.EMPRESA
                AND T.MES = TT.MES
                AND T.OBJETIVO = TT.OBJETIVO
                AND T.VIGILADOR = TT.VIGILADOR
                AND T.FECHA = TT.FECHA
        )
) AS A
WHERE rn = 1;

	    DROP TABLE #TablaTemporal;

END;