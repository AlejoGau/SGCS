CREATE OR ALTER PROCEDURE [dbo].[EventoDevolverHuerfanos]
as
BEGIN
	declare @rec_iid int

	DECLARE cEventos CURSOR FOR

		--select s.ums_idweb,m.operador, u.udw_usuario, t.accesstoken, p.rec_iid, p.rec_nestado, ttl.datecreated 
		select p.rec_iid
			from _datos..eventospendientes p
			left join _datos..timetolive ttl on ttl.Name = p.[ope_cNombre]
			left join _desktop..token t on ttl.token = t.accesstoken
			where 
			p.rec_cterminal ='_WW'
			and p.rec_ioperador != 0
			and p.rec_nestado != 0
			and (ttl.[Token] is null or ttl.[Token] = '')
			--and (accesstoken is null or datecreated is null) no funcionaba cuando un operador estaba en 2 usuarios, entraba por el usuario desconectado
			--and t.clientid = '191B8347-F356-48DE-8EC1-B996112E80C1'

		
	OPEN cEventos

		FETCH cEventos INTO @rec_iid

		WHILE (@@FETCH_STATUS = 0 )

		BEGIN
			declare @FechaHoraProceso datetime = getdate()
			declare @rec_nestado int = 0 --espera0
			declare @current_nestado int = 0
			declare @Obs varchar(max)
			declare @idOPerador int

			select @Obs = rec_cobservaciones, @current_nestado = rec_nestado, @idOPerador=rec_ioperador from _datos..p_recepcion where rec_iid = @rec_iid

			set @Obs = @Obs 
			+ Char(13) 
			+ '['+convert(varchar, @FechaHoraProceso, 103)+' ' +substring(convert(varchar, getdate(), 114), 1, 5)+  '] [SISTEMA H] '
			+ 'El sistema devolvio el evento a pendiente ' + ' estado actual:'+ convert(varchar,@current_nestado)

			if(@current_nestado = 2)
				set @rec_nestado = 2
	
			update _datos..p_recepcion
			set rec_nestado = @rec_nestado
			,rec_tfechaproceso = @FechaHoraProceso
			,rec_ioperador = 0
			,rec_cTerminal = ''
			,rec_cObservaciones = @Obs
			where rec_iid = @rec_iid

			declare @nProceso int = 31

			Insert Into 
			_datos..p_recepcion_proceso(pro_recid,pro_cterminal,pro_tfechahora,pro_nProceso,pro_iOperador)
			Values(@rec_iid,'_WW',@FechaHoraProceso,@nProceso,@idOPerador)

			FETCH cEventos INTO @rec_iid
		END

	CLOSE cEventos

end