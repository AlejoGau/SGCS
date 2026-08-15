--#############################################################################
-- SOFTGUARD DESKTOP
-- updated : 2017-06-15 08:51:36.757 
--#############################################################################

--#############################################################################
-- SOFTGUARD DESKTOP
-- updated : 2017-06-15 08:45:32.890 
--#############################################################################
CREATE OR ALTER PROCEDURE [dbo].[PosponerCierre]
	@dia INT,
	@pospuestaHora NVARCHAR(50) = '',
	@pospuestaDia NVARCHAR(50) = '',
	@aperturaHora NVARCHAR(50) = '',
	@aperturaDia NVARCHAR(50) = '',
	@cue_iid INT,
	@idKey INT = 0,
	@fechaFull NVARCHAR(50) = '',
	@userid int = 0
AS



		--verifico si el dia nuevo es mayor al original y hago un insert
		--if convert(NVARCHAR(10), GETDATE(), 120) = convert(NVARCHAR(10), @fechaFull, 120)  
		--BEGIN
			if @fechaFull != ''
				BEGIN
					--Si no “salto de dia” es decir si el nuevo cierre es antes de las 23.59 del dia actual entonces hay que actualizar p_Timer
					INSERT INTO _Datos..p_timer (tim_iidcuenta,tim_tfechahora,tim_calarma,tim_czona,tim_cusuario,tim_copnclo) VALUES
					(@cue_iid,@fechaFull,'CLO',Left(@pospuestaHora,3),Right(@pospuestaHora,2),'X')
					
				END
		--END



-- Antes de la grabacion anterior borro los horarios alternativos previos
-- Delete From m_horarios_alternativos Where alt_iidcuenta = @IdCta

	DELETE FROM _Datos.dbo.[m_horarios_alternativos] 
		WHERE alt_iidcuenta = @cue_iid


	INSERT INTO _Datos.dbo.[m_horarios_alternativos] (
		alt_iidcuenta,
		alt_ndiaapertura,
		alt_choraapertura,
		alt_ndiacierre,
		alt_choracierre)
								VALUES (
		@cue_iid,
		CAST( @aperturaDia AS numeric(1,0)) ,
		@aperturaHora,
		CAST( @pospuestaDia AS numeric(1,0)),
		@pospuestaHora
	) 

	-- grabo en auditoria

	INSERT INTO [_Audit]..[FrameworkAudit]
			   ([UserId]
			   ,[ObjectTypeId]
			   ,[ObjectId]
			   ,[ObjectName]
			   ,[FunctionId]
			   ,[AuditDate]
			   ,[XmlOld]
			   ,[XmlNew])
		 VALUES
			   (@userid
			   ,3004
			   ,SCOPE_IDENTITY()
			   ,'HorarioAlternativo'
			   ,4
			   ,getdate()
			   ,''
			   ,'<Object><Data><Id>0</Id><Name></Name><alt_iidcuenta>'+convert(nvarchar,@cue_iid)
				+'</alt_iidcuenta><alt_ndiaapertura>'+@aperturaDia
				+'</alt_ndiaapertura><alt_choraapertura>'+@aperturaHora
				+'</alt_choraapertura><alt_ndiacierre>'+@pospuestaDia
				+'</alt_ndiacierre><alt_choracierre>'+@pospuestaHora
				+'</alt_choracierre></Data><Type><Id>3004</Id><Name>HorarioAlternativo</Name><FullName></FullName><Namespace></Namespace><Assembly></Assembly><TableName></TableName></Type></Object>')