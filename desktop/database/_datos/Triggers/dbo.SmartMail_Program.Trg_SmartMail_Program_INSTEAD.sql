CREATE OR ALTER TRIGGER [dbo].[Trg_SmartMail_Program_INSTEAD]  ON dbo.SmartMail_Program INSTEAD OF INSERT
As
BEGIN
	SET NOCOUNT ON;

	INSERT INTO [dbo].[SmartMail_Program]
           ([Name]
           ,[From]
           ,[Body]
           ,[DateStart]
           ,[DateEnd]
           ,[Count]
           ,[Status]
           ,[Query]
           ,[TransportType]
           ,[Recurrent]
           ,[Priority]
           ,[CueIid]
           ,[RecurrentType]
           ,[RecurrentTime]
           ,[RecurrentDateEnd])
	select [Name]
           ,[From]
           ,REPLACE(Cast([Body] As Varchar(max)),'[[LF]]','<BR>') 
           ,[DateStart]
           ,[DateEnd]
           ,[Count]
           ,[Status]
           ,[Query]
           ,[TransportType]
           ,[Recurrent]
           ,[Priority]
           ,[CueIid]
           ,[RecurrentType]
           ,[RecurrentTime]
           ,[RecurrentDateEnd]
	from inserted  
END