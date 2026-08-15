--#############################################################################
-- SOFTGUARD DESKTOP
-- updated : 2017-06-15 08:51:35.260 
--#############################################################################

--#############################################################################
-- SOFTGUARD DESKTOP
-- updated : 2017-06-15 08:45:31.553 
--#############################################################################
CREATE OR ALTER PROCEDURE [dbo].[HorarioAlternativoByChildObject]
@ObjectType NVARCHAR(50),
@Id Int
AS
set noCount on
										
if(0 = 1) select 1
/*
1
**
Cuentaalt_iidcuentam_cuentas
*/
										
else if(@ObjectType = 'Cuenta')
begin

	-- me fijo en el parametro si ajusto timezone
	Declare @iAjustaHora Int
	set @iAjustaHora =  (select par_ivalor From _Tablas.dbo.t_parametros With (NOLOCK) Where par_cCodigo='AJUSTAHORARIO')     
											    
	If @iAjustaHora = 1
	BEGIN
	declare @now date = getdate()
	declare @dayNow int = DATEPART(weekday,@now)
	select 
			[alt_idKey] Id
			,'' Name
			,alt_iidcuenta
			,convert(numeric(1,0),DATEPART(weekday,cal.diahhoraapertura)) as alt_ndiaapertura
			,CONVERT(VARCHAR(5),cal.diahhoraapertura,108) AS alt_choraapertura
			,convert(numeric(1,0),DATEPART(weekday,cal.diahhoraapertura)) as alt_ndiacierre
			,CONVERT(VARCHAR(5),cal.diahhoracierre,108) AS alt_choracierre
			
		FROM [_Datos].[dbo].[m_horarios_alternativos]
		inner join _datos..m_cuentas on alt_iidcuenta = cue_iid
		inner join _Tablas..t_timezone on ttz_idkey = cue_izonahoraria
		cross apply (select (ttz_noffset*60) - datepart(tz,SYSDATETIMEOFFSET ( ) ) as _offset
			,dateadd(minute,(ttz_noffset*60) - datepart(tz,SYSDATETIMEOFFSET ( ) ),convert(datetime,DATEADD(day,[alt_ndiaapertura]-@dayNow,@now))) + convert(datetime, [alt_choraapertura]) as diahhoraapertura
			,dateadd(minute,(ttz_noffset*60) - datepart(tz,SYSDATETIMEOFFSET ( ) ),convert(datetime,DATEADD(day,[alt_ndiacierre]-@dayNow,@now))) + convert(datetime, [alt_choracierre]) as diahhoracierre) as cal
		where [alt_iidcuenta] = @Id
	END
	ELSE
	BEGIN
		Select o.[alt_idKey] Id, '' Name, o.alt_iidcuenta, o.alt_ndiaapertura, o.alt_choraapertura, o.alt_ndiacierre, o.alt_choracierre 
			from _Datos.dbo.[m_horarios_alternativos] o
			where [alt_iidcuenta] = @Id
	END


											
end
										
else
begin
declare @ObjectTypeId int
declare @RelationObjectTypeId int

Select @ObjectTypeId = dbo.GetObjectId(@ObjectType)
Select @RelationObjectTypeId = dbo.GetObjectId('HorarioAlternativo')
										
										
										
Select o.[alt_idKey] Id, '' Name, o.alt_iidcuenta, o.alt_ndiaapertura, o.alt_choraapertura, o.alt_ndiacierre, o.alt_choracierre 
	from _Datos.dbo.[m_horarios_alternativos] o
		inner join RelationObject r 
			on r.ObjectTypeId = @ObjectTypeId
			and r.ObjectId = @Id
			and r.RelationObjectTypeId = @RelationObjectTypeId
			and r.RelationObjectId = o.[alt_idKey] 
end