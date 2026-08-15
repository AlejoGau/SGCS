CREATE OR ALTER PROCEDURE [dbo].[SmartMail_ProgramStatus]
@Id Int,
@Status VarChar(1)
AS
declare @recurrent BIT
declare @FinalDate datetime
declare @startDate datetime


select @recurrent = isnull(Recurrent, 0), @startdate = datestart from smartmail_program where id = @id
set @FinalDate =  null


if @Status = 'C'
begin
	set @FinalDate =  getdate()
end

if  @Status = 'C' and  @recurrent = 1
begin
	set @status = 'A'
	set @startdate = dateadd("mi", 3, getdate())

end

update
	SmartMail_Program
set
	Status = @Status,
	DateEnd = @FinalDate,
	datestart = @startdate
WHERE
Id = @Id