-- =============================================
-- Author:		Rodrigo Román
-- Create date: 19/06/2017
-- Description:	ejecuta los worflow correspondientes al evento.
-- =============================================
CREATE OR ALTER PROCEDURE [dbo].[WorkflowExecute](
	@rec_iid int
)
AS
BEGIN
	SET NOCOUNT ON;

	-- busco los schedules a ejecutar

	declare @rec_nestado int
	declare @rec_nproceso int
	declare @rec_calarma char(3)
	declare @cue_clinea char(3)

	declare @pew_name nvarchar(125)
	declare @pew_sql nvarchar(500)
	declare @pew_config varchar(max)

	select @rec_nestado = rec_nestado 
		,@rec_calarma = rec_calarma
		,@cue_clinea = c.cue_clinea
	from _datos..p_recepcion r
	inner join _datos..m_cuentas c on cue_iid = rec_iidcuenta
	where rec_iid = @rec_iid
	
	
	DECLARE workflow_cursor CURSOR FOR 
		SELECT 
			pew_name
			,pew_sql
			,pew_config
			from _Datos..p_evento_workflow w where 1=1
			and (w.pew_evento_estados is null or w.pew_evento_estados ='' or @rec_nestado in (w.pew_evento_estados))
			and (w.pew_dealers is null or w.pew_dealers ='' or @cue_clinea in (w.pew_dealers))
			and (w.pew_codalarmas is null or w.pew_codalarmas ='' or @rec_calarma in (w.pew_codalarmas))
	
	OPEN workflow_cursor

	FETCH NEXT FROM workflow_cursor INTO @pew_name
		,@pew_sql
		,@pew_config


	print 'busco los workflow'
	print @@FETCH_STATUS
	print @pew_name
	print @pew_sql
	print @pew_config

	
	WHILE @@FETCH_STATUS = 0
	BEGIN
		print 'por cada uno ejecuto el query '+@pew_sql
		declare @ParmDefinition NVARCHAR(256)= N'@rec_iid int, @result_out NVARCHAR(254) OUTPUT';
		declare @result NVARCHAR(254) = N'';

		EXEC sp_executesql @pew_sql
			,@ParmDefinition
			,@rec_iid = @rec_iid
			,@result_out = @result OUTPUT

		FETCH NEXT FROM workflow_cursor INTO @pew_name
		,@pew_sql
		,@pew_config
			
	END
	CLOSE workflow_cursor;
	DEALLOCATE workflow_cursor;
END