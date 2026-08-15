CREATE OR ALTER PROCEDURE [dbo].[SearchRedirectorEventoCecal]
	@page INT = 1,               
	@start INT = 0,               
	@limit INT = 50,               
	@sort NVARCHAR(256) = '',   
	@group NVARCHAR(256) = '',            
	@filter NVARCHAR(2048) = '',        
	@_dc NVARCHAR(256) = '',              
	@totalrows INT = 1 OUTPUT,
	@rec_iid int = 0
AS
BEGIN

	SET NOCOUNT ON;
	IF EXISTS (
		SELECT 1 
		FROM _datos..p_recepcion e
		WHERE e.rec_iid = @rec_iid
	)
	BEGIN
		select top 1 e.rec_calarma,c.cue_clinea,c.cue_ncuenta,e.rec_czona
		from _datos..p_recepcion e
    		inner join _datos..m_cuentas c WITH (NOLOCK) on (c.cue_iid = e.rec_iidCuenta)
		where e.rec_iid = @rec_iid
	END
	ELSE
	BEGIN
		Declare @table nVARCHAR(20) = 'p_recepcion'+ CONVERT(NVARCHAR(6), getdate(), 112)
		DECLARE @Sql nVARCHAR(MAX) = ''
		DECLARE @fields nVARCHAR(MAX) = ''
		DECLARE @Joins nVARCHAR(MAX) = ''
		
		Set @fields = 'e.rec_calarma,c.cue_clinea,c.cue_ncuenta,e.rec_czona'

		set @joins ='
    		inner join _datos..m_cuentas c WITH (NOLOCK) on (c.cue_iid = e.rec_iidCuenta)'

		Set @Sql= 'select top 1 '+@fields+' from _datos..' + Ltrim(@table) +' e ' + @Joins +' where e.rec_iid = @rec_iid';
	
		EXEC sp_executesql @Sql, N'@rec_iid INT', @rec_iid = @rec_iid;
	
	END
END