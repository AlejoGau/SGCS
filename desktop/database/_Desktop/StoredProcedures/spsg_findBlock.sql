CREATE OR ALTER PROCEDURE [dbo].[spsg_findBlock]
As
Begin
	Declare
	   @limite_bloqueos smallint = 1,   
	   @limite_tiempo_bloqueos int =30000	-- limite es en milisegundos

	Declare @total_bloqueos smallint, @tiempo_espera_bloqueos int
		,  @maxid int, @minid int
	declare @spid_bloqueado smallint, @spid_bloqueado_info varchar(500) 
		, @spid_bloqueado_msg varchar(7000) 
	declare @tbl_bloqueados table (spid int,tid int identity(1,1)) 


	-- Busco, de la tabla de procesos, los que estén bloqueados hace más de 
	-- @limite_tiempo_bloqueos milisegundos
	select @total_bloqueos = count(*) 
	 from master..sysprocesses 
	 where blocked > 0 and waittime > @limite_tiempo_bloqueos

	set @spid_bloqueado = 0
	set @spid_bloqueado_info = ''
	set @spid_bloqueado_msg = CAST(@total_bloqueos as varchar(10)) + '  process(es) are blocked. Blocking info: '  
	Print @spid_bloqueado_msg

	IF (@total_bloqueos > 0 )              
	-- Si hay bloqueados
	 BEGIN
	   insert into @tbl_bloqueados (spid)
		 select spid from master..sysprocesses 
		 where blocked > 0 and waittime > @limite_tiempo_bloqueos 
		 union 
		 select blocked from master..sysprocesses
		  where blocked > 0 and waittime > @limite_tiempo_bloqueos 
	-- blocked tiene el spid del proceso que está bloqueando a los bloqueados
		 select @minid = min(tid), @maxid = max(tid) from @tbl_bloqueados 


	create table #lastcommand(eventtype varchar(60)
		, Parameters int 
		 , EventInfo varchar(600)
	)  

	-- recorro los IDs en orden
		WHILE ( @minid <= @maxid ) 
		 BEGIN
		 -- begin while 
		   if ( @total_bloqueos >= @limite_bloqueos)
			BEGIN 
			  select @spid_bloqueado = spid 
				 from @tbl_bloqueados
			  where tid = @minid 
                        
			  select @spid_bloqueado_info =  'Bloqueo en el proceso ' +  rtrim(@@servername) + ',  SPID='+
				rtrim(convert(varchar(6),p.spid))+',  hecho por '+
					isNull(cast(blocked as varchar(9)), ' ') + ',  '+ 
				rtrim(convert(varchar(15),IsNull(p.status, ' ')))+' ,  '+                     
				rtrim(convert(varchar(25),IsNull(p.loginame, ' ')))+' , '+                     
				rtrim(convert(varchar(15),IsNull(p.hostname, ' ')))+' , '+                     
				rtrim(convert(varchar(30),IsNull(p.program_name, ' ')))+' , '+                     
				rtrim(convert(varchar(25),IsNull(p.cmd, ' ')))+', login_time='+
				rtrim(convert(varchar(19),IsNull(p.login_time,'1900-01-01'),121))+', last_batch='+
				rtrim(convert(varchar(19),IsNull(p.last_batch,'1900-01-01'),121)) + ' '
			   from master..sysprocesses p
			   where p.spid = @spid_bloqueado

			truncate table #lastcommand
        
		--insert into JOBS.dbo.bloqueos (spid, bloqueado_por, status, loginame, hostname,program_name,cmd, login_time, last_batch)
		--select p.spid, p.blocked, p.status, p.loginame, p.hostname, p.program_name, p.cmd, p.login_time, p.last_batch from master..sysprocesses p where p.spid = @spid_bloqueado

		declare @referencia int
		set @referencia = @@identity
		declare @dbcc varchar(50)
		set @dbcc = 'dbcc inputbuffer(' + convert(varchar(8), @spid_bloqueado) + ')'
		insert into #lastcommand exec(@dbcc)

		insert into [dbo].[BlockInfo](blo_id, spid , eventtype , Parameters, EventInfo )
			select @referencia, @spid_bloqueado, eventtype , Parameters, EventInfo 
			 from #lastcommand

			end  -- del if

		  set @spid_bloqueado_msg = @spid_bloqueado_msg + @spid_bloqueado_info
		  set @minid = @minid + 1
		END                
		-- end while loop 
	   drop table #lastcommand

	 END             
End