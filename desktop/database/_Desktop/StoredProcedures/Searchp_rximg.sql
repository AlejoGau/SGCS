CREATE OR ALTER PROCEDURE [dbo].[Searchp_rximg]
	-- Add the parameters for the stored procedure here
	@token NVARCHAR(256) = '', 
	@rec_iid int,
	@nestado int = 0,
	@page INT = 1,        
	@start INT = 0,        
	@limit INT = 50,        
	@sort NVARCHAR(256) = '',  
	@group NVARCHAR(256) = '',      
	@filter NVARCHAR(2048) = '', 
	@rxi_cTipo NVARCHAR(20) = 'JPG',   
	@_dc NVARCHAR(256) = '',
	@tabla varchar(256) = 'p_recepcion',       
	@totalrows INT = 1 OUTPUT 
AS
BEGIN
​
	SET NOCOUNT ON;
​
	if (@nestado = 1)
	BEGIN
		update [_Datos]..[p_RXImg] set rxi_nEstado = 1 where [rxi_iRecId] = @rec_iid and [rxi_cTipo] = @rxi_cTipo
	END
	ELSE
	BEGIN
		declare @sql_recepcion nvarchar(max)
		SELECT @sql_recepcion = N'SELECT *
			FROM [_Datos]..[p_RXImg] i
			left join [_Datos]..' + quotename(@tabla) + N' r on i.[rxi_iRecId] = r.rec_iid 
			left join [_Datos]..[m_cuentas] c WITH (NOLOCK) on c.cue_iid = r.rec_iidcuenta
			where [rxi_iRecId] = '+convert(varchar(10),@rec_iid)+' and lower(i.[rxi_cTipo]) collate database_default in (select * from _desktop.dbo.ParseArray('''+@rxi_cTipo+''','',''))'

		--print @sql_recepcion
		EXEC (@sql_recepcion)

	END
END
​