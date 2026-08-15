-- =============================================
-- Author:		Roman Rodrigo
-- Create date: 14/1/2019
-- Description:	Ajusta horario_alternativo según zona horaria antes de update
-- =============================================
CREATE OR ALTER TRIGGER [dbo].[TG_mHorariosAlternativos_upd_zonahoraria]
   ON  [dbo].[m_horarios_alternativos]
   instead of update
AS 
BEGIN

	SET NOCOUNT ON;

	Declare @iAjustaHora Int
	set @iAjustaHora =  (select par_ivalor From _Tablas.dbo.t_parametros With (NOLOCK) Where par_cCodigo='AJUSTAHORARIO')     
											    
	If @iAjustaHora = 1
	BEGIN
		declare @now date = getdate()
		declare @dayNow int = DATEPART(weekday,@now)
		-- ajusto el horario antes de insertar
		update h
			set 
				alt_iidcuenta = i.alt_iidcuenta
				,alt_ndiaapertura = convert(numeric(1,0),DATEPART(weekday,cal.diahhoraapertura)) 
				,alt_choraapertura = CONVERT(VARCHAR(5),cal.diahhoraapertura,108)
				,alt_ndiacierre = convert(numeric(1,0),DATEPART(weekday,cal.diahhoraapertura))
				,alt_choracierre = CONVERT(VARCHAR(5),cal.diahhoracierre,108)
			FROM inserted i
			inner join _datos..m_cuentas on i.alt_iidcuenta = cue_iid
			inner join _Tablas..t_timezone on ttz_idkey = cue_izonahoraria
			inner join _datos..m_horarios_alternativos h on i.alt_idKey = h.alt_idKey
			cross apply (select (-ttz_noffset*60) + datepart(tz,SYSDATETIMEOFFSET ( ) ) as _offset
				,dateadd(minute,(-ttz_noffset*60) + datepart(tz,SYSDATETIMEOFFSET ( ) ),convert(datetime,DATEADD(day,i.[alt_ndiaapertura]-@dayNow,@now))) + convert(datetime, i.[alt_choraapertura]) as diahhoraapertura
				,dateadd(minute,(-ttz_noffset*60) + datepart(tz,SYSDATETIMEOFFSET ( ) ),convert(datetime,DATEADD(day,i.[alt_ndiacierre]-@dayNow,@now))) + convert(datetime, i.[alt_choracierre]) as diahhoracierre) as cal
			where i.alt_iidcuenta = h.alt_iidcuenta
	END
	ELSE
	BEGIN
	
		update h 
		 set 
			alt_iidcuenta = i.alt_iidcuenta
			,alt_ndiaapertura = i.alt_ndiaapertura
			,alt_choraapertura = i.alt_choraapertura
			,alt_ndiacierre= i.alt_ndiacierre
			,alt_choracierre = i.alt_choracierre
		 FROM inserted i
		 inner join _datos..m_horarios_alternativos h on i.alt_idKey = h.alt_idKey
		 where i.alt_iidcuenta = h.alt_iidcuenta
	END

END