-- ============================================================
-- Job: ProcesoEstadisticas
-- Generado por pull-db.ps1 - NO editar manualmente
-- ============================================================
USE msdb;
GO

IF EXISTS (SELECT 1 FROM msdb.dbo.sysjobs WHERE name = N'ProcesoEstadisticas')
    EXEC msdb.dbo.sp_delete_job @job_name = N'ProcesoEstadisticas', @delete_unused_schedule = 0;
GO

EXEC msdb.dbo.sp_add_job
    @job_name          = N'ProcesoEstadisticas',
    @enabled           = 1,
    @description       = N'No description available.',
    @category_name     = N'Verificacion',
    @owner_login_name  = N'sa',
    @delete_level      = 0;
GO

EXEC msdb.dbo.sp_add_jobserver
    @job_name   = N'ProcesoEstadisticas',
    @server_name = N'(LOCAL)';
GO

EXEC msdb.dbo.sp_add_jobstep
    @job_name          = N'ProcesoEstadisticas',
    @step_id           = 1,
    @step_name         = N'Situacion',
    @subsystem         = N'TSQL',
    @command           = N'Insert Into [_Sistema].[dbo].[s_stats]([sts_ctipo], [sts_icantidad], [sts_cdescripcion])
Select ''SC'' As Tipo, Count(MC.cue_iid) As nCant,
	 (Case When est_nEstado=1 And GetDate() BetWeen est_dfechadesde And est_dfechahasta Then ''Prueba'' 
	       When est_nEstado=2 Then ''No Habilitado'' 
	       When est_nEstado=3 Then ''Prueba x Zonas ''
		Else ''Habilitado'' End ) As Situacion
FROM [_Datos].[dbo].[m_cuentas] MC 
 Left Outer Join [_Datos].[dbo].[m_estado_cuenta_cab] EC On MC.cue_iid = EC.est_iidcuenta 
	Group By (Case When EC.est_nEstado=1 And GetDate() BetWeen EC.est_dfechadesde And EC.est_dfechahasta Then ''Prueba'' 
	       When EC.est_nEstado=2 Then ''No Habilitado'' 
	       When EC.est_nEstado=3 Then ''Prueba x Zonas ''
		Else ''Habilitado'' End )
',
    @database_name     = N'_Sistema',
    @on_success_action = 3,
    @on_success_step_id = 0,
    @on_fail_action    = 2,
    @on_fail_step_id   = 0,
    @retry_attempts    = 0,
    @retry_interval    = 1;
GO

EXEC msdb.dbo.sp_add_jobstep
    @job_name          = N'ProcesoEstadisticas',
    @step_id           = 2,
    @step_name         = N'Eventos',
    @subsystem         = N'TSQL',
    @command           = N'--Eventos
Insert Into [_Sistema].[dbo].[s_stats]( [sts_ctipo], [sts_cdescripcion],[sts_icantidad])
Select ''EI'' As Tipo, IsNull(Rtrim(Max(MR.rec_cdescripcion))+'' (''+Cast(PR.rec_iPuerto As Varchar(10))+'')''+(Case When PR.rec_iPuerto Between 1 And 99 Then ''(PG)'' 
      Else ''(IR)'' End ),
	(Case When PR.rec_nOrigen=1 Then ''Timer'' 
	       When PR.rec_nOrigen=3 Then ''Manual'' 
	       When PR.rec_nOrigen=5 Then ''Sistema''
	       When PR.rec_nOrigen=7 Then ''Scheduler'' 
		Else Cast(PR.rec_nOrigen As Varchar(10)) End )
) As Receptor, Count(*) As Cant
FROM [_Datos].[dbo].[p_recepcion] PR With (NOLOCK)
Left Outer Join [_Datos].[dbo].[m_receptores_cab] MR On MR.rec_iid=PR.rec_idReceptor
Where Convert(Char(8),PR.rec_tfechahora,112)=CONVERT(Char(8), GetDate()-1,112) 
And PR.rec_nOrigen<>8 
Group By MR.rec_cdescripcion,PR.rec_iPuerto,PR.rec_nOrigen
Union All
Select ''EI'' As Tipo, ''Job'' As Receptor, Count(*) As Cant
FROM [_Datos].[dbo].[p_recepcion] PR With (NOLOCK)
Left Outer Join [_Datos].[dbo].[m_receptores_cab] MR On MR.rec_iid=PR.rec_idReceptor
Where Convert(Char(8),PR.rec_tfechahora,112)=CONVERT(Char(8), GetDate()-1,112) 
And PR.rec_nOrigen=8
Group By PR.rec_nOrigen

--Eventos x Dia
Insert Into [_Sistema].[dbo].[s_stats]( [sts_ctipo], [sts_cdescripcion],[sts_icantidad])
Select ''ET'' As Tipo,''Eventos Totales'' As Descripcion, Count(*) As Cant
FROM [_Datos].[dbo].[p_recepcion] PR With (NOLOCK)
Where Convert(Char(8),PR.rec_tfechahora,112)=CONVERT(Char(8), GetDate()-1,112) 
Group By Convert(Char(8),PR.rec_tfechahora,112)

--Eventos Alerta x Dia
Insert Into [_Sistema].[dbo].[s_stats]( [sts_ctipo], [sts_cdescripcion],[sts_icantidad])
Select ''EA'' As Tipo,''Eventos Alerta'' As Descripcion, Count(*) As Cant
FROM [_Datos].[dbo].[p_recepcion] PR With (NOLOCK)
Left Outer Join  [_Tablas].[dbo].[t_codigos_alarma] CA On CA.cod_ccodigo=PR.rec_calarma
Where Convert(Char(8),PR.rec_tfechahora,112)=CONVERT(Char(8), GetDate()-1,112) 
And cod_nalerta = 1
Group By Convert(Char(8),PR.rec_tfechahora,112)

--Eventos Falsas Alarma x Dia
Insert Into [_Sistema].[dbo].[s_stats]( [sts_ctipo], [sts_cdescripcion],[sts_icantidad])
Select ''FA'' As Tipo,RE.res_cdescripcion, Count(*) As Cant
FROM [_Datos].[dbo].[p_recepcion] PR With (NOLOCK)
Left Outer Join  [_Tablas].[dbo].[t_resoluciones] RE On RE.res_ccodigo=PR.rec_idResolucion
Where Convert(Char(8),PR.rec_tfechahora,112)=CONVERT(Char(8), GetDate()-1,112) 
And res_nfalsaalarma = 1
Group By Convert(Char(8),PR.rec_tfechahora,112),RE.res_cdescripcion
',
    @database_name     = N'_Sistema',
    @on_success_action = 3,
    @on_success_step_id = 0,
    @on_fail_action    = 2,
    @on_fail_step_id   = 0,
    @retry_attempts    = 0,
    @retry_interval    = 1;
GO

EXEC msdb.dbo.sp_add_jobstep
    @job_name          = N'ProcesoEstadisticas',
    @step_id           = 3,
    @step_name         = N'Apps',
    @subsystem         = N'TSQL',
    @command           = N'--SmartPanics
Insert Into [_Sistema].[dbo].[s_stats]([sts_ctipo], [sts_icantidad], [sts_cdescripcion])
Select ''SP'', Count(id), Max(AppType) FROM [_Datos].[dbo].[SmartPanic] 
	where Imei != ''''  and [fechaAlta] Is Not null
Group By AppType


--VigiControl
Insert Into [_Sistema].[dbo].[s_stats]([sts_ctipo], [sts_icantidad], [sts_cdescripcion])
Select ''VC'', Count(id), Max(AppType) FROM [_Datos].[dbo].[SmartTrack] 
	where Imei != ''''  and [fechaAlta] Is Not null
Group By AppType',
    @database_name     = N'_Sistema',
    @on_success_action = 3,
    @on_success_step_id = 0,
    @on_fail_action    = 2,
    @on_fail_step_id   = 0,
    @retry_attempts    = 0,
    @retry_interval    = 0;
GO

EXEC msdb.dbo.sp_add_jobstep
    @job_name          = N'ProcesoEstadisticas',
    @step_id           = 4,
    @step_name         = N'TaskStatus',
    @subsystem         = N'TSQL',
    @command           = N'-- Aviso que la tarea esta funcionando	60min * 25hs = 1500
Exec [dbo].[TaskStatus_SetLastExecutedTime] @JobName = N''ProcesoEstadisticas'', @Repetition = 1500
--	',
    @database_name     = N'_Datos',
    @on_success_action = 1,
    @on_success_step_id = 0,
    @on_fail_action    = 2,
    @on_fail_step_id   = 0,
    @retry_attempts    = 0,
    @retry_interval    = 0;
GO

EXEC msdb.dbo.sp_update_job
    @job_name      = N'ProcesoEstadisticas',
    @start_step_id = 1;
GO

EXEC msdb.dbo.sp_add_schedule
    @schedule_name          = N'Proceso',
    @enabled                = 1,
    @freq_type              = 4,
    @freq_interval          = 1,
    @freq_subday_type       = 1,
    @freq_subday_interval   = 0,
    @freq_relative_interval = 0,
    @freq_recurrence_factor = 0,
    @active_start_date      = 20100901,
    @active_end_date        = 99991231,
    @active_start_time      = 4500,
    @active_end_time        = 235959;
GO

EXEC msdb.dbo.sp_attach_schedule
    @job_name      = N'ProcesoEstadisticas',
    @schedule_name = N'Proceso';
GO
