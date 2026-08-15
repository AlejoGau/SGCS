CREATE OR ALTER PROCEDURE [dbo].[passwordRecoverySearch]
            
 @email VARCHAR(256) = '',
 @host VARCHAR(MAX) = ''
     
AS  
 SET NOCOUNT ON   
 DECLARE @udw_idkey as int=0
 DECLARE @mailfrom as VARCHAR(256) = ''
 DECLARE @mailsendername as VARCHAR(256) = ''
 DECLARE @mailsender as VARCHAR(256) = ''
 DECLARE @token as VARCHAR(256) = ''

 select @udw_idkey=udw_idkey from _Sistema..UsersDesktopWeb WHERE udw_usuario = @email
 select @mailsendername = par_cValor from _tablas..t_parametros where par_ccodigo='MAILSENDERNAME'
 select @mailsender = par_cValor from _tablas..t_parametros where par_ccodigo='MAILSENDER'

 select @token = NEWID()
 select @mailfrom = @mailsendername + '<'+ @mailsender +'>'

 IF @udw_idkey>0
	BEGIN
		INSERT INTO [_Datos]..[SmartMail_Program](Name,[From], Body,DateStart
			,DateEnd,Status,Query,TransportType,Priority,count)
		select 'Recuperar contraseña',@mailfrom,@host+'/PasswordRecoveryHTML.aspx?token='+@token+'&email='+@email,GETDATE(),DATEADD(MINUTE,1,GETDATE()),'A'
				,'Select strval As Email From _Datos.dbo.ParseArray('''+@email+''','';'')'
				,'MAIL',900,1
	


		INSERT INTO _Datos..temporaltoken(Name,token,creationDate,status,userid)
		SELECT 'passwordrecovery',@token,GETDATE(),'A',@udw_idkey

		SELECT @token as token, @udw_idkey as userid
	END
 else
	begin
		print 'USUARIO NO ENCONTRADO'
	end

 /*
 --Sort
 DECLARE @SqlSort AS VARCHAR(256)
 SELECT @SqlSort = dbo.GetSqlSortForJson(@sort, 'o.[sgn_idkey] DESC')
 
 --Filters
 DECLARE @SqlFilter AS VARCHAR(4096)
 SELECT @SqlFilter = dbo.GetSqlFilterForJson(@filter, 'm_sgnotes')
 
 --Sql
 DECLARE @Sql NVARCHAR(MAX)
 SET @Sql = 'FROM _datos.dbo.m_sgnotes o
			LEFT JOIN _Sistema.dbo.UsersDesktopWeb u on o.sgn_userid = u.udw_idKey
			LEFT JOIN _Sistema.dbo.UsersDesktopWeb fu on o.sgn_fileduserid = fu.udw_idKey
			WHERE 1 = 1 ' + @SqlFilter
 
 --Total Rows
 DECLARE @DynamicSqlTotalRows NVARCHAR(MAX) 
 DECLARE @DynamicSqlTotalRowsParams NVARCHAR(MAX) 
 SET @DynamicSqlTotalRows = ' SELECT @TotalRows = COUNT(*) ' + @Sql
 SET @DynamicSqlTotalRowsParams = '@TotalRows INT OUTPUT'
	 	 
 EXECUTE sp_executesql @DynamicSqlTotalRows, @DynamicSqlTotalRowsParams, @totalrows OUTPUT   

 --Execute Sql (ReturnRows)
 DECLARE @DynamicSqlReturnRows NVARCHAR(MAX)   
 SET @DynamicSqlReturnRows = 'SELECT * 
							   FROM ( SELECT ROW_NUMBER() OVER (ORDER BY ' + @SqlSort + ') AS RowNumber, sgn_idkey Id, o.*
							   ,u.udw_usuario as udw_usuario,fu.udw_usuario as udw_usuario_filed ' + @Sql + ' ) AS T
							  WHERE RowNumber BETWEEN @from AND @to '
							  
 DECLARE @DynamicSqlReturnRowsParams NVARCHAR(MAX)          							  
 SET @DynamicSqlReturnRowsParams = '@from INT, @to INT'							  			  	 
			  	 
 DECLARE @from INT
 DECLARE @to INT
 SELECT @from = (@page - 1) * @limit + 1, @to = @page * @limit
  			  	 
 EXECUTE sp_executesql @DynamicSqlReturnRows, @DynamicSqlReturnRowsParams, @from = @from, @to = @to

 */