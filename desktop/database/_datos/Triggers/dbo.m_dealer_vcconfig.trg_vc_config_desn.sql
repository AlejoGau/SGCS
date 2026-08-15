CREATE OR ALTER TRIGGER trg_vc_config_desn ON m_dealer_vcconfig
AFTER INSERT, UPDATE
AS
BEGIN
    SET NOCOUNT ON;

	Declare @message nVarChar(Max) = '',
			@StartDateTimeText VarChar(Max) = ''

	Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
	Set @message = 'Start DateTime : %s | [trg_vc_config_desn] | Inicio'
	RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

    Declare @apptype Varchar(64) = '',
			@config Varchar(max) = ''
	Declare @idKey Int = 0

	Select @apptype=[dvc_apptype], @config=[dvc_config], @idKey=[dvc_idKey] From inserted

    IF @apptype = 'VIGICONTROL' And @config Like '%aa_Enabled%'
    BEGIN

		Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
		Set @message = 'Start DateTime : %s | [trg_vc_config_desn] | apptype=VIGICONTROL | Tiene valores aa_'
		RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

        MERGE m_dealer_vcconfig_desnormalized As TGT
        USING (
            SELECT 
                @idKey As idKey,
                JSON_VALUE(@config, '$.aa_Enabled') As aa_Enabled,
                JSON_VALUE(@config, '$.aa_eventos') As aa_eventos,
                JSON_VALUE(@config, '$.aa_nearEnabled') As aa_nearEnabled,
                JSON_VALUE(@config, '$.aa_nearDistance') As aa_nearDistance,
                JSON_VALUE(@config, '$.aa_categorizacion') As aa_categorizacion,
                JSON_VALUE(@config, '$.aa_resolucion') As aa_resolucion,
                JSON_VALUE(@config, '$.aa_operador') As aa_operador
        ) As SRC
        ON (TGT.[dealer_idKey] = SRC.[idKey])
        WHEN MATCHED THEN
            UPDATE SET 
                TGT.aa_Enabled = SRC.aa_Enabled,
                TGT.aa_eventos = SRC.aa_eventos,
                TGT.aa_nearEnabled = SRC.aa_nearEnabled,
                TGT.aa_nearDistance = SRC.aa_nearDistance,
                TGT.aa_categorizacion = SRC.aa_categorizacion,
                TGT.aa_resolucion = SRC.aa_resolucion,
                TGT.aa_operador = SRC.aa_operador
        WHEN NOT MATCHED THEN
            INSERT (dealer_idKey, aa_Enabled, aa_eventos, aa_nearEnabled, aa_nearDistance, aa_categorizacion, aa_resolucion, aa_operador)
            VALUES (SRC.idKey, SRC.aa_Enabled, SRC.aa_eventos, SRC.aa_nearEnabled, SRC.aa_nearDistance, SRC.aa_categorizacion, SRC.aa_resolucion, SRC.aa_operador);
    END

	Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
	Set @message = 'Start DateTime : %s | [trg_vc_config_desn] | Fin'
	RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

END;