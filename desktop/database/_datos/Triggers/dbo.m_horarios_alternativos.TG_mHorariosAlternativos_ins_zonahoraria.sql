-- =============================================
-- Author:		Roman Rodrigo
-- Create date: 14/1/2019
-- Description:	Ajusta horariohorario alternativo según zona horaria antes de insert
-- =============================================
CREATE OR ALTER TRIGGER [dbo].[TG_mHorariosAlternativos_ins_zonahoraria]
   ON  [dbo].[m_horarios_alternativos]
   instead of insert
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
		INSERT INTO _datos..m_horarios_alternativos (alt_iidcuenta,alt_ndiaapertura,alt_choraapertura,alt_ndiacierre,alt_choracierre) 
			SELECT 
				alt_iidcuenta
				,convert(numeric(1,0),DATEPART(weekday,cal.diahhoraapertura)) as alt_ndiaapertura
				,CONVERT(VARCHAR(5),cal.diahhoraapertura,108) AS alt_choraapertura
				,convert(numeric(1,0),DATEPART(weekday,cal.diahhoraapertura)) as alt_ndiacierre
				,CONVERT(VARCHAR(5),cal.diahhoracierre,108) AS alt_choracierre
			FROM inserted
			inner join _datos..m_cuentas on alt_iidcuenta = cue_iid
			inner join _Tablas..t_timezone on ttz_idkey = cue_izonahoraria
			cross apply (select (-ttz_noffset*60) + datepart(tz,SYSDATETIMEOFFSET ( ) ) as _offset
				,dateadd(minute,(-ttz_noffset*60) + datepart(tz,SYSDATETIMEOFFSET ( ) ),convert(datetime,DATEADD(day,[alt_ndiaapertura]-@dayNow,@now))) + convert(datetime, [alt_choraapertura]) as diahhoraapertura
				,dateadd(minute,(-ttz_noffset*60) + datepart(tz,SYSDATETIMEOFFSET ( ) ),convert(datetime,DATEADD(day,[alt_ndiacierre]-@dayNow,@now))) + convert(datetime, [alt_choracierre]) as diahhoracierre) as cal
	END
	ELSE
	BEGIN
	
		INSERT INTO _datos..m_horarios_alternativos(alt_iidcuenta,alt_ndiaapertura,alt_choraapertura,alt_ndiacierre,alt_choracierre) 
			SELECT alt_iidcuenta,alt_ndiaapertura,alt_choraapertura,alt_ndiacierre,alt_choracierre FROM inserted
	END

END