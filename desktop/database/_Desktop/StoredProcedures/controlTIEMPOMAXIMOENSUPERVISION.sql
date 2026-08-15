-- =============================================
-- Author:		Rodrigo Romçan
-- Create date: 27/6/2018
-- Description:	<Description,,>
-- =============================================
CREATE OR ALTER PROCEDURE [dbo].[controlTIEMPOMAXIMOENSUPERVISION]

AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	DECLARE  @TIEMPOMAXIMOENSUPERVISION Int = ( Select par_ivalor From _Tablas.dbo.t_parametros With (NOLOCK) Where par_cCodigo='TIEMPOMAXIMOENSUPERVISION' )
	declare @rec_iid int
	declare @idOPerador int

	DECLARE evento_cursor CURSOR FOR   
		SELECT rec_iid, rec_ioperador
		  FROM [_Datos].[dbo].[EventosPendientes]
		  where pro_nproceso = 40
		  and DATEDIFF (minute,rec_tFechaProceso, getdate()) > @TIEMPOMAXIMOENSUPERVISION

		OPEN evento_cursor  
		FETCH NEXT FROM evento_cursor INTO @rec_iid, @idOPerador

		WHILE @@FETCH_STATUS = 0  
		BEGIN  
			print 'Evento con timepo vencido, lo devuelvo'
			update _datos..p_recepcion
				set rec_nestado = 0
				,rec_tfechaproceso = getdate()
				,rec_ioperador = 0
				,rec_cTerminal = ''
				,rec_cObservaciones = 'Supero el TIEMPOMAXIMOENSUPERVISION'
				where rec_iid = @rec_iid

			Insert Into 
			_datos..p_recepcion_proceso(pro_recid,pro_cterminal,pro_tfechahora,pro_nProceso,pro_iOperador)
			Values(@rec_iid,'SYS',GETDATE(),0,@idOPerador)
			FETCH NEXT FROM evento_cursor INTO @rec_iid, @idOPerador
		END  

	CLOSE evento_cursor  
	DEALLOCATE evento_cursor  
END