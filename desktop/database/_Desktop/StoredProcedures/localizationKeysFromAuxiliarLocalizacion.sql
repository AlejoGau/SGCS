--#############################################################################
-- SOFTGUARD DESKTOP
-- updated : 2017-06-15 08:51:37.777 
--#############################################################################

--#############################################################################
-- SOFTGUARD DESKTOP
-- updated : 2017-06-15 08:45:33.853 
--#############################################################################
-- =============================================
-- Author:		Dedalo
-- Create date: 22/03/2016
-- Description:	toma palabras la base auxiliar y las inserta en localizacion
-- =============================================
CREATE OR ALTER PROCEDURE [dbo].[localizationKeysFromAuxiliarLocalizacion]

AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    insert into _sistema..localization 
		select cat_cdescripcion as name
		,'t_categorizacion' as uiapplication
		,'es-ar' as [language]
		,cat_cdescripcion as translation
		,'New' as [status]
		,getdate() as created
		,null as modified
		,null as userid
		,null as username
		from _auxiliarlocalizacion..t_categorizacion
		where cat_cdescripcion not in (select name from _sistema..localization)


	insert into _sistema..localization 
		select cod_cdescripcion as name
		,'t_codigos_alarma' as uiapplication
		,'es-ar' as [language]
		,cod_cdescripcion as translation
		,'New' as [status]
		,getdate() as created
		,null as modified
		,null as userid
		,null as username
		from _auxiliarlocalizacion..t_codigos_alarma
		where cod_cdescripcion not in (select name from _sistema..localization)


	insert into _sistema..localization 
		select tcm_cdescripcion as name
		,'t_comandos' as uiapplication
		,'es-ar' as [language]
		,tcm_cdescripcion as translation
		,'New' as [status]
		,getdate() as created
		,null as modified
		,null as userid
		,null as username
		from _auxiliarlocalizacion..t_comandos
		where tcm_cdescripcion not in (select name from _sistema..localization)


	insert into _sistema..localization 
		select lin_crazonsocial as name
		,'t_lineas' as uiapplication
		,'es-ar' as [language]
		,lin_crazonsocial as translation
		,'New' as [status]
		,getdate() as created
		,null as modified
		,null as userid
		,null as username
		from _auxiliarlocalizacion..t_lineas
		where lin_crazonsocial not in (select name from _sistema..localization)

	insert into _sistema..localization 
		select lis_cdescripcion as name
		,'t_listas_emergencia' as uiapplication
		,'es-ar' as [language]
		,lis_cdescripcion as translation
		,'New' as [status]
		,getdate() as created
		,null as modified
		,null as userid
		,null as username
		from _auxiliarlocalizacion..t_listas_emergencia
		where lis_cdescripcion not in (select name from _sistema..localization)

	insert into _sistema..localization 
		select CAST(par_mobservacion as NVARCHAR(1024)) as name
		,'t_parametros' as uiapplication
		,'es-ar' as [language]
		,CAST(par_mobservacion as NVARCHAR(1024)) as translation
		,'New' as [status]
		,getdate() as created
		,null as modified
		,null as userid
		,null as username
		from _auxiliarlocalizacion..t_parametros
		where CAST(par_mobservacion as NVARCHAR(1024)) not in (select name from _sistema..localization)

	insert into _sistema..localization 
		select par_cdescripcion as name
		,'t_parametros' as uiapplication
		,'es-ar' as [language]
		,par_cdescripcion as translation
		,'New' as [status]
		,getdate() as created
		,null as modified
		,null as userid
		,null as username
		from _auxiliarlocalizacion..t_parametros
		where par_cdescripcion not in (select name from _sistema..localization)

	insert into _sistema..localization 
		select pls_cdescripcion as name
		,'t_plantillas_sms' as uiapplication
		,'es-ar' as [language]
		,pls_cdescripcion as translation
		,'New' as [status]
		,getdate() as created
		,null as modified
		,null as userid
		,null as username
		from _auxiliarlocalizacion..t_plantillas_sms
		where pls_cdescripcion not in (select name from _sistema..localization)

	insert into _sistema..localization 
		select pls_cdescripcion+'_mplantilla' as name
		,'t_plantillas_sms' as uiapplication
		,'es-ar' as [language]
		,pls_mplantilla as translation
		,'Manual' as [status]
		,getdate() as created
		,null as modified
		,null as userid
		,null as username
		from _auxiliarlocalizacion..t_plantillas_sms
		where pls_cdescripcion+'_mplantilla' not in (select name from _sistema..localization)

	insert into _sistema..localization 
		select pls_cdescripcion+'_mplantillaOpnClo' as name
		,'t_plantillas_sms' as uiapplication
		,'es-ar' as [language]
		,pls_mplantillaOpnClo as translation
		,'Manual' as [status]
		,getdate() as created
		,null as modified
		,null as userid
		,null as username
		from _auxiliarlocalizacion..t_plantillas_sms
		where pls_cdescripcion+'_mplantillaOpnClo' not in (select name from _sistema..localization)

	insert into _sistema..localization 
		select res_cdescripcion as name
		,'t_resoluciones' as uiapplication
		,'es-ar' as [language]
		,res_cdescripcion as translation
		,'New' as [status]
		,getdate() as created
		,null as modified
		,null as userid
		,null as username
		from _auxiliarlocalizacion..t_resoluciones
		where res_cdescripcion not in (select name from _sistema..localization)

	insert into _sistema..localization 
		select rll_cdescripcion as name
		,'t_resolucionesllamada' as uiapplication
		,'es-ar' as [language]
		,rll_cdescripcion as translation
		,'New' as [status]
		,getdate() as created
		,null as modified
		,null as userid
		,null as username
		from _auxiliarlocalizacion..t_resolucionesllamada
		where rll_cdescripcion not in (select name from _sistema..localization)

	insert into _sistema..localization 
		select tsp_cdescripcion as name
		,'t_ServiciosPatrulla' as uiapplication
		,'es-ar' as [language]
		,tsp_cdescripcion as translation
		,'New' as [status]
		,getdate() as created
		,null as modified
		,null as userid
		,null as username
		from _auxiliarlocalizacion..t_ServiciosPatrulla
		where tsp_cdescripcion not in (select name from _sistema..localization)

	insert into _sistema..localization 
		select ttz_ctitle as name
		,'t_timezone' as uiapplication
		,'es-ar' as [language]
		,ttz_ctitle as translation
		,'New' as [status]
		,getdate() as created
		,null as modified
		,null as userid
		,null as username
		from _auxiliarlocalizacion..t_timezone
		where ttz_ctitle not in (select name from _sistema..localization)

	insert into _sistema..localization 
		select tip_cdescripcion as name
		,'t_tipos' as uiapplication
		,'es-ar' as [language]
		,tip_cdescripcion as translation
		,'New' as [status]
		,getdate() as created
		,null as modified
		,null as userid
		,null as username
		from _auxiliarlocalizacion..t_tipos
		where tip_cdescripcion not in (select name from _sistema..localization)
END