-- =============================================
-- Author:		Rodrigo Román
-- Create date: 01/12/2015
-- Description:	Control de vencimiento de contratos
-- =============================================
CREATE OR ALTER PROCEDURE [dbo].[crm_contratoVencimientoExec]

AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

	-- declaro las variables
	declare @cnt_iid int
	declare @cnt_org_fc int
	declare @cnt_idcliente int
	declare @cnt_fechaalta datetime
	declare @cnt_fechavto datetime
	declare @cnt_formapago int
	declare @cnt_metadata varchar(MAX)
	declare @cnt_estado int
	declare @cnt_tmp_id int


	-- envío los diarios
	DECLARE contrato_cursor CURSOR FOR 
		SELECT 
			[cnt_iid]
			,[cnt_org_fc]
			,[cnt_idcliente]
			,[cnt_fechaalta]
			,[cnt_fechavto]
			,[cnt_formapago]
			,[cnt_metadata]
			,[cnt_estado]
			,[cnt_tmp_id]
			from [_Datos].[dbo].[crm_contrato] c 
			where 
			[cnt_estado] = 1
			And [cnt_fechavto] < getDate()

	
	OPEN contrato_cursor

	FETCH NEXT FROM contrato_cursor INTO @cnt_iid,@cnt_org_fc,@cnt_idcliente,@cnt_fechaalta,@cnt_fechavto,@cnt_formapago,@cnt_metadata,@cnt_estado,@cnt_tmp_id
		
	DECLARE @metaTable TABLE(element_id INT NOT NULL, parent_ID INT, Object_ID INT, NAME VARCHAR(2000), StringValue VARCHAR(MAX) NOT NULL, ValueType VARCHAR(10) NOT null)
	WHILE @@FETCH_STATUS = 0
	BEGIN
		
		-- 1.- doy el contrato por vencido
		update [_Datos].[dbo].[crm_contrato] set [cnt_estado] = 3 where cnt_iid = @cnt_iid
		print 'contrato vencido: ' + CONVERT(varchar(20),@cnt_iid)

		-- 2.- me fijo si tiene renovación y copio el contrato.
		if @cnt_metadata != ''
		BEGIN
			print @cnt_metadata
			-- parseo la metadata
			delete from @metaTable
			INSERT INTO @metaTable (element_id, parent_ID, Object_ID, NAME, StringValue, ValueType) SELECT * FROM dbo.parseJSON(@cnt_metadata)
				WHERE NAME IN ('cantidad', 'tipoperiodo')		
			
			declare @countmeta int = 0
			select @countmeta = count(*) from @metaTable

			if @countmeta = 2
			BEGIN
				-- calculo la nueva fecha de vencimiento
				declare @vto datetime
				declare @tipo varchar(20)
				declare @cant int

				select @tipo = StringValue from @metaTable where NAME = 'tipoperiodo'
				select @cant = convert(INT,StringValue) from @metaTable where NAME = 'cantidad'

				if @tipo = 'dia'
				set @vto = dateadd(DAY,@cant,@cnt_fechavto)

				if @tipo = 'mes'
				set @vto = dateadd(MONTH,@cant,@cnt_fechavto)

				if @tipo = 'ano'
				set @vto = dateadd(YEAR,@cant,@cnt_fechavto)

				--creo un nuevo contrato
				insert into [_Datos].[dbo].[crm_contrato]
					([cnt_org_fc],[cnt_idcliente],[cnt_fechaalta],[cnt_fechavto],[cnt_formapago],[cnt_metadata],[cnt_estado],[cnt_tmp_id])
					VALUES
					(@cnt_org_fc,@cnt_idcliente,@cnt_fechaalta,@vto,@cnt_formapago,@cnt_metadata ,0,@cnt_tmp_id)

				declare @idnuevo int = @@identity
				print 'nuevo contrato'
				print @idnuevo
				-- inserto los items
				insert into [_Datos].[dbo].[crm_contrato_item] select 
					@idnuevo as idcontrato
					,[Price]
					,[Currency]
					,[Status]
					,[Description]
					,[Quantity]
					,[QuantityDelivered]
					,[Code]
					,[VAT]
					,[ProductId]
					,[idlista]  from [_Datos].[dbo].[crm_contrato_item] ci where ci.idcontrato = @cnt_iid
			END
		END
		
		FETCH NEXT FROM contrato_cursor INTO @cnt_iid,@cnt_org_fc,@cnt_idcliente,@cnt_fechaalta,@cnt_fechavto,@cnt_formapago,@cnt_metadata,@cnt_estado,@cnt_tmp_id
		
	END
	CLOSE contrato_cursor;
	DEALLOCATE contrato_cursor;

	-- actualizo tabla de tareas con la ultima ejecución
	--EXEC [dbo].[TaskStatus_SetLastExecutedTime] @JobName = N'[ContratoVencimientoExec]', @Repetition = 1450
	
END