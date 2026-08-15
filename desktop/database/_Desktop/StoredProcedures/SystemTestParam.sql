-- =============================================
-- Author:		dedalo
-- Create date: 15/2/2016
-- Description:	testea el valor de un parámetro
-- =============================================
CREATE OR ALTER PROCEDURE [dbo].[SystemTestParam]
	-- Add the parameters for the stored procedure here
	@field varchar(128) = '',
	@par_ccodigo char(30) = '',
	@ivalor int = 0,
	@message varchar(1024) = '' output,
	@status int = 0 output
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

	declare @par_ivalor int;
	declare @par_cvalor varchar(1000);
	--print @field
	--Print @par_ccodigo

    -- Insert statements for procedure here
	if (@field = 'par_ivalor')
	BEGIN
		select @par_ivalor = par_ivalor from _Tablas..t_parametros where par_ccodigo = @par_ccodigo
		if(@par_ivalor=0)
		BEGIN 
			select @message = 'El parámetro tiene valor 0', @status=3
		END
		if(@ivalor!=0 AND @ivalor != @par_ivalor)
		BEGIN 
			select @message = 'El parámetro tiene valor erróneo' , @status=3
		END
		ELSE
		BEGIN
			select @message = 'OK', @status=1
		END
	END

	if (@field = 'par_cvalor')
	BEGIN
		select @par_cvalor = par_cvalor from _Tablas..t_parametros where par_ccodigo = @par_ccodigo
		if(@par_cvalor is NULL or @par_cvalor = '' )
		BEGIN 
			select @message = 'El parámetro no está configurado', @status=3
		END
		ELSE
		BEGIN
			select @message = 'OK', @status=1
		END
	END

	--select @message, @status
END