CREATE OR ALTER TRIGGER [dbo].[TG_Smarttrack_UPDATE] 
   ON  dbo.SmartTrack 
   AFTER UPDATE
AS 
BEGIN
	SET NOCOUNT ON;
	
	declare @config nvarchar(4000)
	declare @name nVarChar(200)
	declare @stringvalue nvarchar(500)
	declare @HBTime int
	declare @id int
	select @config = config, @id = Id from inserted

	IF @config != ''
		BEGIN

			Declare jCursor Cursor Scroll

			For Select Name,StringValue From _Datos.dbo.parseJSON(@Config) 

			Open jCursor
			FETCH NEXT FROM jCursor INTO @name,@stringValue

			WHILE @@FETCH_STATUS = 0
			Begin
				If (@name ='HBTime' and @stringValue!='null')
				Begin
				Set @HBTime = convert(int,@stringValue)
			print 'nuevo tiempo'
			print @HBTime
			print @id
				Update [dbo].[SmartTrack] Set [HBTime] = @HBTime Where [Id]=@id
				End

				FETCH NEXT FROM  jCursor INTO @name,@stringValue
			End
			Close jCursor
			DEALLOCATE jCursor
		END
END