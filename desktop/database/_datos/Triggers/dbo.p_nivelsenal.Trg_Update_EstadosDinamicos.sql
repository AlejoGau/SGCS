CREATE OR ALTER TRIGGER [dbo].[Trg_Update_EstadosDinamicos] ON [dbo].[p_nivelsenal] AFTER INSERT AS
BEGIN
	Declare @iCuenta Int = 0,
			@iNivel Int = 0,
			@iTension Int = 0,
			@iRuido Int = 0

	Select  @iCuenta = [nvs_idCuenta], @iNivel = [nvs_nNivel], @iTension = [nvs_nTension], @iRuido = [nvs_iRuido] From inserted

	--Detectar si la cuenta es de tipo Cerco
	Declare @iCerco Int = 0
	Select @iCerco=[cue_iid]
		From [_Datos].[dbo].[m_cuentas] With (NOLOCK)
	Where [cue_iid]=@iCuenta 
		And [cue_ctipo] IN ( Select [tip_ccodigo] FROM [_Tablas].[dbo].[t_tipos] With (NOLOCK) Where [tip_nTipo]=6)

	If @iCerco > 0
	Begin
		--Nivel de Señal
		MERGE INTO [dbo].[p_EstadosDinamicos] AS TGT
		USING ( Select '_Nivel' As cCodigo, @iNivel As iValor, 0 As iUsuario, @iCuenta As iCuenta ) AS SRC 
				ON TGT.[ped_iCtaId] = SRC.[iCuenta] And TGT.[ped_iUsuario] = SRC.[iUsuario] And TGT.[ped_cCodigo] = SRC.[cCodigo]
		WHEN MATCHED THEN
			UPDATE SET
				TGT.[ped_iValor] = SRC.[iValor]
		WHEN NOT MATCHED THEN 
			INSERT ([ped_cCodigo],[ped_iValor],[ped_iUsuario],[ped_iCtaId])
			VALUES (SRC.[cCodigo],SRC.[iValor],SRC.[iUsuario],SRC.[iCuenta]);

		--Ruido de Linea
		MERGE INTO [dbo].[p_EstadosDinamicos] AS TGT
		USING ( Select '_Ruido' As cCodigo, @iRuido As iValor, 0 As iUsuario, @iCuenta As iCuenta ) AS SRC 
				ON TGT.[ped_iCtaId] = SRC.[iCuenta] And TGT.[ped_iUsuario] = SRC.[iUsuario] And TGT.[ped_cCodigo] = SRC.[cCodigo]
		WHEN MATCHED THEN
			UPDATE SET
				TGT.[ped_iValor] = SRC.[iValor]
		WHEN NOT MATCHED THEN 
			INSERT ([ped_cCodigo],[ped_iValor],[ped_iUsuario],[ped_iCtaId])
			VALUES (SRC.[cCodigo],SRC.[iValor],SRC.[iUsuario],SRC.[iCuenta]);

		--Tension
		MERGE INTO [dbo].[p_EstadosDinamicos] AS TGT
		USING ( Select '_Tension' As cCodigo, @iTension As iValor, 0 As iUsuario, @iCuenta As iCuenta ) AS SRC 
				ON TGT.[ped_iCtaId] = SRC.[iCuenta] And TGT.[ped_iUsuario] = SRC.[iUsuario] And TGT.[ped_cCodigo] = SRC.[cCodigo]
		WHEN MATCHED THEN
			UPDATE SET
				TGT.[ped_iValor] = SRC.[iValor]
		WHEN NOT MATCHED THEN 
			INSERT ([ped_cCodigo],[ped_iValor],[ped_iUsuario],[ped_iCtaId])
			VALUES (SRC.[cCodigo],SRC.[iValor],SRC.[iUsuario],SRC.[iCuenta]);
	End
END