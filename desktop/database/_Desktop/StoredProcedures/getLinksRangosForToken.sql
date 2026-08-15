-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE OR ALTER PROCEDURE [dbo].[getLinksRangosForToken]
	@table NVARCHAR(128) = '',
	@token NVARCHAR(128) = '',
	@SqlFilterRango NVARCHAR(MAX) OUTPUT,
	@alias NVARCHAR(10) = ''
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;
	 DECLARE @Sql NVARCHAR(MAX)   
	set @Sql = '';

	--Load Security    
	DECLARE @UserId INT    
	SELECT @UserId = dbo.GetUserIdByToken(@token)
	 if (@UserId is null OR @UserId = 0)
	BEGIN
		print ('[getSqlRangesForToken] Token Invalido:' +@token)
		select @SqlFilterRango = ' AND 1=2 '
		set noexec on
	END

	 DECLARE @HasAdministratorModule INT 
	SELECT @HasAdministratorModule = dbo.UserDesktopWebHasModule(@UserId, 'Administrator') 

	If(@HasAdministratorModule != 1 OR @table='eventospendientes')
	begin
		DECLARE @Ranges TABLE (id INT IDENTITY(1,1), dealer NVARCHAR(3), desde NVARCHAR(4), hasta NVARCHAR(4))
		
		INSERT INTO @Ranges (dealer, desde, hasta)


		SELECT um.dwm_dealer, um.dwm_cuenta_desde, um.dwm_cuenta_hasta
		FROM _Sistema.dbo.UsersDesktopWebModulos um
		WHERE um.dwm_idWeb = @UserId
		and (dwm_dealer != '' and dwm_cuenta_desde != '' and dwm_cuenta_hasta != '')
		if ((select count(*) from @Ranges) = 0)
		BEGIN
	
		--print('no tiene rangos tengo que ver que tipo de usuario es')
		if (@HasAdministratorModule=1)
		BEGIN
			--print('tiene webremoto no hago nada')
			SET @Sql = @Sql;
		END
		ELSE
		BEGIN
			--print('no tiene web remoto, no tiene rangos no ve nada')
			SET @Sql = @Sql + ' AND 1=2 '
		END
	END
	else
		BEGIN
			SET @Sql = @Sql + ' AND url_cDealer IN (' 
			DECLARE @Pos INT
			IF @Pos = 0 
			PRINT 'ES IGUAL A CERO'
			SET @Pos = 1
			WHILE( (SELECT COUNT(*) FROM @Ranges WHERE id = @Pos) != 0)
			BEGIN

				DECLARE @DealerLinea NVARCHAR(3)
				DECLARE @DealerDesde NVARCHAR(4)
				DECLARE @DealerHasta NVARCHAR(4)

				SELECT @DealerLinea = dealer, @DealerDesde = ISNULL(desde, ''), @DealerHasta = ISNULL(hasta,'') FROM @Ranges WHERE id = @Pos	
				
					
					IF @Pos = 1
					BEGIN 
						PRINT 'ES IGUAL A 1 '+@DealerLinea 
						SET @Sql = @Sql + ''''+@DealerLinea +''''
					END
					ELSE
					BEGIN 
						PRINT 'NO ES IGUAL A 1 '+@DealerLinea
						SET @Sql = @Sql + ','''+@DealerLinea +''''
					END

				SET @Pos = @Pos + 1
			END

			SET @Sql = @Sql+') OR url_cDealer = '''''


		END

	END
	else 
	begin
		 --print 'SALE POR EL ELSE'
		 if @HasAdministratorModule != 1 
		 BEGIN
			select @Sql = ' AND 1=2 '
		 END
	end
	print '***************************'
	



--print cast (@Sql as NTEXT)
SET @SqlFilterRango = @Sql
set noexec off

END