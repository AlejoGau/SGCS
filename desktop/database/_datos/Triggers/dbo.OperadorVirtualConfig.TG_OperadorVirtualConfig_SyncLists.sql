--TG_OperadorVirtualConfig_SyncLists

CREATE OR ALTER TRIGGER [dbo].[TG_OperadorVirtualConfig_SyncLists]
ON [dbo].[OperadorVirtualConfig]
AFTER INSERT, UPDATE
AS
BEGIN
    SET NOCOUNT ON;

    -- Evitar recursión (porque abajo hacemos UPDATE a la misma tabla)
    IF TRIGGER_NESTLEVEL() > 1 RETURN;

    -------------------------------------------------------------------------
    -- 1) LastUpdated 100% SQL (para INSERT y UPDATE)
    -------------------------------------------------------------------------
    UPDATE t
        SET ovc_tLastUpdated = GETDATE()
    FROM dbo.OperadorVirtualConfig t
    INNER JOIN inserted i ON i.ovc_idKey = t.ovc_idKey;

    -------------------------------------------------------------------------
    -- 2) Keys afectadas
    -------------------------------------------------------------------------
    DECLARE @Affected TABLE (ovc_idKey int PRIMARY KEY);

    INSERT INTO @Affected(ovc_idKey) SELECT DISTINCT ovc_idKey FROM inserted;

    -------------------------------------------------------------------------
    -- 3) Parse Dealers / Eventos desde INSERTED 
    -------------------------------------------------------------------------
    DECLARE @DealersDistinct TABLE
    (
        ovc_idKey int NOT NULL,
        code     varchar(50) NOT NULL,
        PRIMARY KEY (ovc_idKey, code)
    );

    INSERT INTO @DealersDistinct(ovc_idKey, code)
    SELECT DISTINCT i.ovc_idKey, UPPER(LTRIM(RTRIM(s.value))) AS code
		FROM inserted i
    CROSS APPLY STRING_SPLIT(i.ovc_cDealers, ',') s
    WHERE LTRIM(RTRIM(s.value)) <> '';

    -- Validaciones Dealers
	IF EXISTS (SELECT 1 FROM @DealersDistinct WHERE LEN(code) NOT IN (2,3) OR code LIKE '%[^A-Z0-9_]%')
    BEGIN
        RAISERROR('OperadorVirtualConfig: ovc_cDealers invalido. Cada dealer debe ser alfanumerico y de 2/3 caracteres con underscore permitido (ej: SOP, QA1, _XD).', 16, 1);
        ROLLBACK TRANSACTION;
        RETURN;
    END
    IF EXISTS ( SELECT 1 FROM @Affected a WHERE NOT EXISTS (SELECT 1 FROM @DealersDistinct d WHERE d.ovc_idKey = a.ovc_idKey) )
    BEGIN
        RAISERROR('OperadorVirtualConfig: ovc_cDealers no puede quedar vacio.', 16, 1);
        ROLLBACK TRANSACTION;
        RETURN;
    END

    -- Sync Dealers: delete missing (not exist any more)
    DELETE tgt
    FROM dbo.OperadorVirtualConfigDealers tgt
    JOIN @Affected a ON a.ovc_idKey = tgt.ovd_iOperadorVirtualConfigId
    WHERE NOT EXISTS ( SELECT 1 FROM @DealersDistinct d WHERE d.ovc_idKey = tgt.ovd_iOperadorVirtualConfigId AND d.code = tgt.ovd_cDealer );

    -- Sync Dealers: insert new
    INSERT INTO dbo.OperadorVirtualConfigDealers(ovd_iOperadorVirtualConfigId, ovd_cDealer)
    SELECT d.ovc_idKey, CAST(d.code AS char(3))
    FROM @DealersDistinct d
    WHERE NOT EXISTS ( SELECT 1 FROM dbo.OperadorVirtualConfigDealers tgt WHERE tgt.ovd_iOperadorVirtualConfigId = d.ovc_idKey AND tgt.ovd_cDealer = d.code );

    -------------------------------------------------------------------------
    -- EVENTOS
    -------------------------------------------------------------------------
    DECLARE @EventosDistinct TABLE
    (
        ovc_idKey int NOT NULL,
        code     varchar(50) NOT NULL,
        PRIMARY KEY (ovc_idKey, code)
    );

    INSERT INTO @EventosDistinct(ovc_idKey, code)
    SELECT DISTINCT i.ovc_idKey, UPPER(LTRIM(RTRIM(s.value))) AS code
		FROM inserted i
    CROSS APPLY STRING_SPLIT(i.ovc_cEventos, ',') s
    WHERE LTRIM(RTRIM(s.value)) <> '';

    -- Validaciones Eventos
	IF EXISTS (SELECT 1 FROM @EventosDistinct WHERE LEN(code) NOT IN (2,3) OR code LIKE '%[^A-Z0-9_#]%')
    BEGIN
        RAISERROR('OperadorVirtualConfig: ovc_cEventos invalido. Cada evento debe ser de 2/3 caracteres. Permitidos: letras (A-Z), numeros, underscore, hash (ej: _AJ, #01, #15, EV1).', 16, 1);
        ROLLBACK TRANSACTION;
        RETURN;
    END

    IF EXISTS ( SELECT 1 FROM @Affected a WHERE NOT EXISTS (SELECT 1 FROM @EventosDistinct e WHERE e.ovc_idKey = a.ovc_idKey) )
    BEGIN
        RAISERROR('OperadorVirtualConfig: ovc_cEventos no puede quedar vacio.', 16, 1);
        ROLLBACK TRANSACTION;
        RETURN;
    END

	-------------------------------------------------------------------------
    -- 4) Control: no permitir duplicidad (Dealer, Evento) cuando Status=1
    -------------------------------------------------------------------------
	IF EXISTS (
		SELECT 1
		FROM inserted i
		JOIN @DealersDistinct d ON d.ovc_idKey = i.ovc_idKey
		JOIN @EventosDistinct e ON e.ovc_idKey = i.ovc_idKey
		JOIN dbo.OperadorVirtualConfig c2
			ON c2.ovc_iStatus = 1
		   AND c2.ovc_idKey <> i.ovc_idKey
		JOIN dbo.OperadorVirtualConfigDealers d2
			ON d2.ovd_iOperadorVirtualConfigId = c2.ovc_idKey
		   AND d2.ovd_cDealer = d.code
		JOIN dbo.OperadorVirtualConfigEventos e2
			ON e2.ove_iOperadorVirtualConfigId = c2.ovc_idKey
		   AND e2.ove_cEvento = e.code
		WHERE i.ovc_iStatus = 1
	)
	BEGIN
		RAISERROR('OperadorVirtualConfig: Error. Existe duplicidad Dealer-Evento con otra configuracion habilitada.', 16, 1);
		ROLLBACK TRANSACTION;
		RETURN;
	END

	-------------------------------------------------------------------------
    -- 5) Sync Eventos: delete missing - insert new
    -------------------------------------------------------------------------
    DELETE tgt
    FROM dbo.OperadorVirtualConfigEventos tgt
    JOIN @Affected a ON a.ovc_idKey = tgt.ove_iOperadorVirtualConfigId
    WHERE NOT EXISTS ( SELECT 1 FROM @EventosDistinct e WHERE e.ovc_idKey = tgt.ove_iOperadorVirtualConfigId AND e.code = tgt.ove_cEvento );

    INSERT INTO dbo.OperadorVirtualConfigEventos(ove_iOperadorVirtualConfigId, ove_cEvento)
    SELECT e.ovc_idKey, CAST(e.code AS char(3))
    FROM @EventosDistinct e
    WHERE NOT EXISTS ( SELECT 1 FROM dbo.OperadorVirtualConfigEventos tgt WHERE tgt.ove_iOperadorVirtualConfigId = e.ovc_idKey AND tgt.ove_cEvento = e.code );
END