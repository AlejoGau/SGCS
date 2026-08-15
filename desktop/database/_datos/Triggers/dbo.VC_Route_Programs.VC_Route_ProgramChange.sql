CREATE OR ALTER TRIGGER [dbo].[VC_Route_ProgramChange] 
   ON  [dbo].[VC_Route_Programs] 
   AFTER INSERT,DELETE,UPDATE
AS 
BEGIN
	SET NOCOUNT ON;

	Declare @message nVarChar(Max) = '',
		@StartDateTimeText VarChar(max)=''


	--si el cambio es de hoy, regenero
	declare @date datetime = GETDATE()
	declare @currentweekday int = datepart(dw,@date)
	declare @currentday int = datepart(d,@date)

	declare @routeId int = 0,
			@id  int = 0

	Select @id=i.id, @routeId=i.routeId from inserted i
	Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  	
	Set @message = 'Start DateTime : %s | [VC_Route_ProgramChange] | @id => '+ Cast(@id As Varchar(10)) + ' | @routeId => '+ Cast(@routeId As Varchar(10))
	RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

	--Si se creo una ronda con inicio a futuro debe considerar ese dia y no el actual
	declare @datestart datetime
	----Select @datestart=r.datestart from inserted i
	----Inner join VC_Routes r On [routeId]=i.[id]
	--Select Top 1 datestart=r.datestart from inserted i
	--		Inner join VC_Routes r On i.[routeId]=r.[id]
	--Order By i.[Id]
	Select @datestart=[datestart] 
		From VC_Routes 
	where [id]=@routeId

	declare @starday int = 0
	If @datestart is not null and @datestart > @date 
		Set @starday = datepart(d,@datestart)

	Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  	
	Set @message = 'Start DateTime : %s | [VC_Route_ProgramChange] | @datestart => '+ Convert(VarChar, @datestart,120)
	RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

	Set @message = 'Start DateTime : %s | [VC_Route_ProgramChange] | @starday => '+ Cast(@starday As Varchar(10))
	RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

	If @starday !=0
	Begin
		declare @startweekday int = datepart(dw,@datestart)
		Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  	
		Set @message = 'Start DateTime : %s | [VC_Route_ProgramChange] | @startweekday => '+ Cast(@startweekday As Varchar(10))
		RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

		if exists (SELECT * from inserted rp 
					where 1=1
					--and rp.datestart <= @date -- el programa tiene que haber empezado
					and (rp.programtype = 1 -- todos los días
								OR (
											rp.programtype = 2 -- de lunes a viernes
											AND (@startweekday BETWEEN 2 and 6)
								)
								OR (
											rp.programtype = 3 -- un dia de la semana
											AND (@startweekday = rp.[dayofweek]+1)
								)
								OR (
											rp.programtype = 4 -- un dia del mes
											AND (@starday = rp.[dayofmonth]+1)
								)
					))
					BEGIN
						-- hay programas para hoy, reprogramo
						Declare @iDays Int = Datediff(day ,@date,@datestart)
						Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  	
						Set @message = 'Start DateTime : %s | [VC_Route_ProgramChange] | Hay programas para hoy, reprogramo | Execute [SchedulercreateVCRoutes] @days => '+ Cast(@iDays As Varchar(10))
						RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

						EXEC _desktop..[SchedulercreateVCRoutes] @days = @iDays, @filterRouteId = @routeId, @filterProgramId = @id  
					END
	End
	Else 
	Begin
		if exists (SELECT * from inserted rp 
					where 1=1
					--and rp.datestart <= @date -- el programa tiene que haber empezado
					and (rp.programtype = 1 -- todos los días
								OR (
											rp.programtype = 2 -- de lunes a viernes
											AND (@currentweekday BETWEEN 2 and 6)
								)
								OR (
											rp.programtype = 3 -- un dia de la semana
											AND (@currentweekday = rp.[dayofweek]+1)
								)
								OR (
											rp.programtype = 4 -- un dia del mes
											AND (@currentday = rp.[dayofmonth]+1)
								)
					))
					BEGIN
						-- hay programas para hoy, reprogramo
						Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  	
						Set @message = 'Start DateTime : %s | [VC_Route_ProgramChange] | Hay programas para hoy, reprogramo | Execute [SchedulercreateVCRoutes] @days => 0'
						RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

						EXEC _desktop..[SchedulercreateVCRoutes] @days = 0, @filterRouteId = @routeId, @filterProgramId = @id  
					END
	End
END