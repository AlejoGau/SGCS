CREATE OR ALTER PROCEDURE [dbo].[HorarioByChildObject]
	@ObjectType VarChar(50),
	@Id Int
AS
set noCount on
										
if(0 = 1) select 1
/*
1
**
Cuentahor_iidcuentam_cuentas
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
			[hor_idKey] Id
			,'' Name
			,hor_iidcuenta
			,convert(numeric(1,0),DATEPART(weekday,cal.diahhoraapertura)) as hor_ndiaapertura
			,CONVERT(VARCHAR(5),cal.diahhoraapertura,108) AS hor_choraapertura
			,convert(numeric(1,0),DATEPART(weekday,cal.diahhoraapertura)) as hor_ndiacierre
			,CONVERT(VARCHAR(5),cal.diahhoracierre,108) AS hor_choracierre
			
		FROM [_Datos].[dbo].[m_horarios]
		inner join _datos..m_cuentas on hor_iidcuenta = cue_iid
		inner join _Tablas..t_timezone on ttz_idkey = cue_izonahoraria
		cross apply (select (ttz_noffset*60) - datepart(tz,SYSDATETIMEOFFSET ( ) ) as _offset
			,dateadd(minute,(ttz_noffset*60) - datepart(tz,SYSDATETIMEOFFSET ( ) ),convert(datetime,DATEADD(day,[hor_ndiaapertura]-@dayNow,@now))) + convert(datetime, [hor_choraapertura]) as diahhoraapertura
			,dateadd(minute,(ttz_noffset*60) - datepart(tz,SYSDATETIMEOFFSET ( ) ),convert(datetime,DATEADD(day,[hor_ndiacierre]-@dayNow,@now))) + convert(datetime, [hor_choracierre]) as diahhoracierre) as cal
		where [hor_iidcuenta] = @Id
	END
	ELSE
	BEGIN
		Select o.[hor_idKey] Id, '' Name, o.hor_iidcuenta, o.hor_ndiaapertura, o.hor_choraapertura, o.hor_ndiacierre, o.hor_choracierre 
			from _Datos.dbo.[m_horarios] o
			where [hor_iidcuenta] = @Id
	END


											
end
										
else
begin
declare @ObjectTypeId int
declare @RelationObjectTypeId int

Select @ObjectTypeId = dbo.GetObjectId(@ObjectType)
Select @RelationObjectTypeId = dbo.GetObjectId('Horario')
										
										
										
Select o.[hor_idKey] Id, '' Name, o.hor_iidcuenta, o.hor_ndiaapertura, o.hor_choraapertura, o.hor_ndiacierre, o.hor_choracierre 
	from _Datos.dbo.[m_horarios] o
		inner join RelationObject r 
			on r.ObjectTypeId = @ObjectTypeId
			and r.ObjectId = @Id
			and r.RelationObjectTypeId = @RelationObjectTypeId
			and r.RelationObjectId = o.[hor_idKey] 
end