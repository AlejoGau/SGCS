-- =============================================
-- Author:		Roman Rodrigo
-- Create date: 14/1/2019
-- Description:	Ajusta horario según zona horaria antes de update
-- =============================================
CREATE OR ALTER TRIGGER [dbo].[TG_mHorarios_upd_zonahoraria]
   ON  [dbo].[m_horarios]
   instead of update
AS 
BEGIN

	SET NOCOUNT ON;

	-- Si el UPDATE no afecto ninguna fila, no hay nada que procesar
	IF NOT EXISTS (SELECT 1 FROM inserted)
		RETURN

	Declare @iAjustaHora Int
	set @iAjustaHora =  (select par_ivalor From _Tablas.dbo.t_parametros With (NOLOCK) Where par_cCodigo='AJUSTAHORARIO')     
	
	print '[TG_mHorarios_upd_zonahoraria] solo ajusto si la cuenta no esta en default'
	declare @cue_izonahoraria int=0
	select top 1 @cue_izonahoraria = cue_izonahoraria from _datos..m_cuentas where cue_iid in (select hor_iidcuenta from inserted)
	print @cue_izonahoraria

	If @iAjustaHora = 1 AND @cue_izonahoraria > 0
	BEGIN
		declare @now date = getdate()
		declare @dayNow int = DATEPART(weekday,@now)
		print '[TG_mHorarios_upd_zonahoraria] ajusto el horario antes de actualizar (preguntar por zona horaria de la cuenta? si no esta en default?)'
		update h
			set 
				hor_iidcuenta = i.hor_iidcuenta
				,hor_ndiaapertura = convert(numeric(1,0),DATEPART(weekday,cal.diahhoraapertura)) 
				,hor_choraapertura = CONVERT(VARCHAR(5),cal.diahhoraapertura,108)
				,hor_ndiacierre = convert(numeric(1,0),DATEPART(weekday,cal.diahhoracierre))
				,hor_choracierre = CONVERT(VARCHAR(5),cal.diahhoracierre,108)
			FROM inserted i
			inner join _datos..m_cuentas on i.hor_iidcuenta = cue_iid
			inner join _Tablas..t_timezone on ttz_idkey = cue_izonahoraria
			inner join _datos..m_horarios h on i.hor_idKey = h.hor_idKey
			cross apply (select (-ttz_noffset*60) + datepart(tz,SYSDATETIMEOFFSET ( ) ) as _offset
				,dateadd(minute,(-ttz_noffset*60) + datepart(tz,SYSDATETIMEOFFSET ( ) ),convert(datetime,DATEADD(day,i.[hor_ndiaapertura]-@dayNow,@now))) + convert(datetime, i.[hor_choraapertura]) as diahhoraapertura
				,dateadd(minute,(-ttz_noffset*60) + datepart(tz,SYSDATETIMEOFFSET ( ) ),convert(datetime,DATEADD(day,i.[hor_ndiacierre]-@dayNow,@now))) + convert(datetime, i.[hor_choracierre]) as diahhoracierre) as cal
			where i.hor_iidcuenta = h.hor_iidcuenta
	END
	ELSE
	BEGIN
		print '[TG_mHorarios_upd_zonahoraria] actualizo sin ajustar'
		update h 
		 set 
			hor_iidcuenta = i.hor_iidcuenta
			,hor_ndiaapertura = i.hor_ndiaapertura
			,hor_choraapertura = i.hor_choraapertura
			,hor_ndiacierre= i.hor_ndiacierre
			,hor_choracierre = i.hor_choracierre
		 FROM inserted i
		 inner join _datos..m_horarios h on i.hor_idKey = h.hor_idKey
		 where i.hor_iidcuenta = h.hor_iidcuenta
	END

END