-- =============================================
-- Author:		Roman Rodrigo
-- Create date: 14/1/2019
-- Description:	Ajusta horario según zona horaria antes de insert o update
-- =============================================
CREATE OR ALTER TRIGGER [dbo].[TG_mHorarios_zonahoraria]
   ON  [dbo].[m_horarios]
   instead of insert
AS 
BEGIN

	SET NOCOUNT ON;

	Declare @iAjustaHora Int
	set @iAjustaHora =  (select par_ivalor From _Tablas.dbo.t_parametros With (NOLOCK) Where par_cCodigo='AJUSTAHORARIO')     
	-- solo ajusto si la cuenta no esta en default
	declare @cue_izonahoraria int=0
	select top 1 @cue_izonahoraria = cue_izonahoraria from _datos..m_cuentas where cue_iid in (select hor_iidcuenta from inserted)
	
	If @iAjustaHora = 1 AND @cue_izonahoraria > 0
	BEGIN
		declare @now date = getdate()
		declare @dayNow int = DATEPART(weekday,@now)
		-- ajusto el horario antes de insertar
		INSERT INTO _datos..m_horarios (hor_iidcuenta,hor_ndiaapertura,hor_choraapertura,hor_ndiacierre,hor_choracierre) 
			SELECT 
				hor_iidcuenta
				,convert(numeric(1,0),DATEPART(weekday,cal.diahhoraapertura)) as _hor_ndiaapertura
				,CONVERT(VARCHAR(5),cal.diahhoraapertura,108) AS _hor_choraapertura
				,convert(numeric(1,0),DATEPART(weekday,cal.diahhoracierre)) as _hor_ndiacierre
				,CONVERT(VARCHAR(5),cal.diahhoracierre,108) AS _hor_choracierre
			FROM inserted
			inner join _datos..m_cuentas on hor_iidcuenta = cue_iid
			inner join _Tablas..t_timezone on ttz_idkey = cue_izonahoraria
			cross apply (select (-ttz_noffset*60) + datepart(tz,SYSDATETIMEOFFSET ( ) ) as _offset
				,dateadd(minute,(-ttz_noffset*60) + datepart(tz,SYSDATETIMEOFFSET ( ) ),convert(datetime,DATEADD(day,[hor_ndiaapertura]-@dayNow,@now))) + convert(datetime, [hor_choraapertura]) as diahhoraapertura
				,dateadd(minute,(-ttz_noffset*60) + datepart(tz,SYSDATETIMEOFFSET ( ) ),convert(datetime,DATEADD(day,[hor_ndiacierre]-@dayNow,@now))) + convert(datetime, [hor_choracierre]) as diahhoracierre) as cal
	END
	ELSE
	BEGIN
	
		INSERT INTO _datos..m_horarios (hor_iidcuenta,hor_ndiaapertura,hor_choraapertura,hor_ndiacierre,hor_choracierre) 
			SELECT hor_iidcuenta,hor_ndiaapertura,hor_choraapertura,hor_ndiacierre,hor_choracierre FROM inserted
	END

END