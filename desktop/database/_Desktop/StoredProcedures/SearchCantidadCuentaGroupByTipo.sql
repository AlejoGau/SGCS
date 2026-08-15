--[dbo].[SearchCantidadCuentaGroupByTipo] @type = 'dealerCuentasByEstado'

CREATE OR ALTER PROCEDURE [dbo].[SearchCantidadCuentaGroupByTipo]
(
@cue_ctipo varchar(256) = '',
 @page INT = 1,               
 @start INT = 0,               
 @limit INT = 50,               
 @sort VARCHAR(64) = '',            
 @filter VARCHAR(2048) = '',      
 @token VARCHAR(128) = '',     
 @type varchar(32) = '',
 @_dc VARCHAR(256) = '',              
 @totalrows INT = 1 OUTPUT     
)
as


DECLARE @wheres varchar(256) = ''
if @cue_ctipo != ''
BEGIN
		SET @wheres = ' AND (''+@cue_ctipo+'' = c.cue_ctipo)'
END

DECLARE @SqlFilterRango AS VARCHAR(max) = ''
IF @token != ''
BEGIN
	
	EXEC getSqlRangesForToken @token = @token, @alias = 'c.', @SqlFilterRango = @SqlFilterRango OUTPUT
  
	DECLARE @SqlFilterRangoContadores AS VARCHAR(max)
	DECLARE @SqlFilterRangocc5 AS VARCHAR(max)
	DECLARE @SqlFilterRangoczon AS VARCHAR(max)
  SET @SqlFilterRangoContadores = REPLACE(@SqlFilterRango,'c.','cu.')
	SET @SqlFilterRangocc5 = REPLACE(@SqlFilterRango,'c.','cc5.')
	SET @SqlFilterRangoczon = REPLACE(@SqlFilterRango,'c.','czon.')

	SET @wheres = @wheres + @SqlFilterRango
END


DECLARE @Sql VARCHAR(MAX)


SET @Sql = '
	select t.tip_ccodigo, t.tip_cdescripcion , COUNT(c.cue_clinea) Cuentas
		, COUNT(cc0.est_nestado) Estado0 
		, COUNT(cc1.est_nestado) Estado1 
		, COUNT(cc2.est_nestado) Estado2 
		, COUNT(cc3.est_nestado) Estado3 
		, COUNT(cc4.est_nestado) Estado4 

		, ( select COUNT(cc5.cue_iid) 
			from _datos..m_cuentas cc5 
			where cc5.cue_ctipo = t.tip_ccodigo and cc5.cue_nAutomonitoreo = 1
			'+@SqlFilterRangocc5+'
			)  automonitoreo
		
		, ( select COUNT(czon.cue_iid) 
			from _datos..m_cuentas czon 
			where czon.cue_nparticion is not null and czon.cue_nparticion != 0 and t.tip_ccodigo = czon.cue_ctipo
			'+@SqlFilterRangoczon+'
			)  CuentasParticion

		,(
			select COUNT(spa.CuentaId) 
			FROM _datos..SmartPanic spa 
					INNER JOIN _datos..m_cuentas cu on (spa.CuentaId = cu.cue_iid ) 
			WHERE spa.CuentaId is not null AND spa.CuentaId !=0 AND cu.cue_ctipo = t.tip_ccodigo '+@SqlFilterRangoContadores+'
		) as Smartpanics

		--
		-- Agregado por Juan Bonforti
		-- Basecamp 289362246, 30102017
		,(
			select COUNT(sta.CuentaId) 
			FROM _datos..SmartTrack sta 
					INNER JOIN _datos..m_cuentas cu on (sta.CuentaId = cu.cue_iid ) 
			WHERE sta.CuentaId is not null AND sta.CuentaId !=0 AND cu.cue_ctipo = t.tip_ccodigo '+@SqlFilterRangoContadores+' 
		) as VigiControl

		,(
			select COUNT(dm.OwnerId) 
			FROM _datos..DispositivoMovil dm
					INNER JOIN _datos..m_cuentas cu on (dm.OwnerId = cu.cue_iid ) 
			WHERE dm.OwnerId is not null AND dm.OwnerId !=0 AND cu.cue_ctipo = t.tip_ccodigo '+@SqlFilterRangoContadores+'
		) as TrackGuard

		-- Agregado por Juan Bonforti, FIN
		--
		--

    from _Tablas..t_tipos t
    left join _datos..m_cuentas c on (t.tip_ccodigo = c.cue_ctipo)
    left join _datos..m_estado_cuenta_cab cc on (cc.est_iidcuenta = c.cue_iid)
    left join _datos..m_estado_cuenta_cab cc0 on (cc0.est_iidcuenta = c.cue_iid and cc.est_nestado = 0)
    left join _datos..m_estado_cuenta_cab cc1 on (cc1.est_iidcuenta = c.cue_iid and cc.est_nestado = 1)
    left join _datos..m_estado_cuenta_cab cc2 on (cc2.est_iidcuenta = c.cue_iid and cc.est_nestado = 2)
    left join _datos..m_estado_cuenta_cab cc3 on (cc3.est_iidcuenta = c.cue_iid and cc.est_nestado = 3)
    left join _datos..m_estado_cuenta_cab cc4 on (cc4.est_iidcuenta = c.cue_iid and cc.est_nestado = 4)
    --left join _datos..SmartPanic sp on (sp.CuentaId = c.cue_iid)
    --left join _datos..m_cuentas czon on (t.tip_ccodigo = czon.cue_ctipo and czon.cue_nparticion != 0 and czon.cue_nparticion is not null)
    WHERE 1=1 '+@wheres+'
    group by t.tip_ccodigo, t.tip_cdescripcion--, c.cue_clinea, cc0.est_nestado, cc1.est_nestado, cc2.est_nestado, cc3.est_nestado, cc4.est_nestado
'

if (@type = 'totalactivas')
BEGIN
	SET @Sql = '
	select COUNT(c.cue_iid) Cuentas
	from _datos..m_cuentas c
	left join _datos..m_estado_cuenta_cab cc on (cc.est_iidcuenta = c.cue_iid)
	where (cc.est_nestado = 0 or cc.est_nestado = 3) and cue_nparticion = 0 '+ @SqlFilterRango
END

if (@type = 'totallicencias')
BEGIN
SET @Sql = '
	select COUNT(c.cue_iid) Cuentas
		from _datos..m_cuentas c
		left join _datos..m_estado_cuenta_cab cc on (cc.est_iidcuenta = c.cue_iid)
		where (cc.est_nestado = 0 or cc.est_nestado = 3) 
		and cue_nparticion = 0
		and cue_clinea !=''_SG''
'
END

if (@type = 'SmartPanicsPC')
BEGIN
SET @Sql = '
	select COUNT(c.cue_iid) Cuentas
		from _datos..m_cuentas c
		inner join _datos..m_estado_cuenta_cab cc WITH (NOLOCK) on (cc.est_iidcuenta = c.cue_iid)
		inner join _tablas..t_tipos WITH (NOLOCK) on cue_ctipo = tip_ccodigo
		where (cc.est_nestado = 0 or cc.est_nestado = 3) 
		and cue_nparticion = 0
		and tip_ntipo = 10
		and cue_clinea !=''_SG''
'
END

if (@type = 'dealerCuentas')
BEGIN
SET @Sql = '
Select lin_ccodigo,lin_crazonsocial,lin_ccalle,lin_clocalidad,lin_ctelfono,
	( 
	Select Count(*) From _Datos..m_cuentas c 
		left join _datos..m_estado_cuenta_cab cc on (cc.est_iidcuenta = c.cue_iid)
		where (cc.est_nestado = 0 or cc.est_nestado = 3) and cue_nparticion = 0 and cue_clinea = lin_ccodigo'+@SqlFilterRango+' 
	) As nCantidad
From _tablas..t_lineas Order By 1
'
END

if (@type = 'dealerCuentasByEstado')
BEGIN
SET @Sql = '
				Select lin_ccodigo,lin_crazonsocial,lin_ccalle,lin_clocalidad,lin_ctelfono,
					( 
					Select Count(*) From _Datos..m_cuentas c 
						INNER JOIN _Tablas..t_tipos as t ON c.cue_ctipo = t.tip_ccodigo
						left join _datos..m_estado_cuenta_cab cc on (cc.est_iidcuenta = c.cue_iid)
						where cc.est_nestado = 0  and cue_nparticion = 0 and cue_clinea = lin_ccodigo and t.tip_nCondicion = ''0''
					) As nCantidadHabilitadasFija,
					( 
					Select Count(*) From _Datos..m_cuentas c 
						INNER JOIN _Tablas..t_tipos as t ON c.cue_ctipo = t.tip_ccodigo
						left join _datos..m_estado_cuenta_cab cc on (cc.est_iidcuenta = c.cue_iid)
						where cc.est_nestado = 1  and cue_nparticion = 0 and cue_clinea = lin_ccodigo and t.tip_nCondicion = ''0''
					) As nCantidadEnPruebaFija,
					( 
					Select Count(*) From _Datos..m_cuentas c 
						INNER JOIN _Tablas..t_tipos as t ON c.cue_ctipo = t.tip_ccodigo
						left join _datos..m_estado_cuenta_cab cc on (cc.est_iidcuenta = c.cue_iid)
						where cc.est_nestado = 2  and cue_nparticion = 0 and cue_clinea = lin_ccodigo and t.tip_nCondicion = ''0''
					) As nCantidadNoHabilitadasFija,
					( 
					Select Count(*) From _Datos..m_cuentas c 
						INNER JOIN _Tablas..t_tipos as t ON c.cue_ctipo = t.tip_ccodigo
						left join _datos..m_estado_cuenta_cab cc on (cc.est_iidcuenta = c.cue_iid)
						where cc.est_nestado = 3  and cue_nparticion = 0 and cue_clinea = lin_ccodigo and t.tip_nCondicion = ''0''
					) As nCantidadEnPruebaPorZonaFija,
					( 
					Select Count(*) From _Datos..m_cuentas c 
						INNER JOIN _Tablas..t_tipos as t ON c.cue_ctipo = t.tip_ccodigo
						left join _datos..m_estado_cuenta_cab cc on (cc.est_iidcuenta = c.cue_iid)
						where cc.est_nestado = 4  and cue_nparticion = 0 and cue_clinea = lin_ccodigo and t.tip_nCondicion = ''0''
					) As nCantidadPedidoEliminarFija,
					( 
					Select Count(*) From _Datos..m_cuentas c 
						INNER JOIN _Tablas..t_tipos as t ON c.cue_ctipo = t.tip_ccodigo
						left join _datos..m_estado_cuenta_cab cc on (cc.est_iidcuenta = c.cue_iid)
						where cc.est_nestado = 0  and cue_nparticion = 0 and cue_clinea = lin_ccodigo and t.tip_nCondicion in (''1'',''2'') 
					) As nCantidadHabilitadasMovil,
					( 
					Select Count(*) From _Datos..m_cuentas c 
						INNER JOIN _Tablas..t_tipos as t ON c.cue_ctipo = t.tip_ccodigo
						left join _datos..m_estado_cuenta_cab cc on (cc.est_iidcuenta = c.cue_iid)
						where cc.est_nestado = 1  and cue_nparticion = 0 and cue_clinea = lin_ccodigo and t.tip_nCondicion in (''1'',''2'') 
					) As nCantidadEnPruebaMovil,
					( 
					Select Count(*) From _Datos..m_cuentas c 
						INNER JOIN _Tablas..t_tipos as t ON c.cue_ctipo = t.tip_ccodigo
						left join _datos..m_estado_cuenta_cab cc on (cc.est_iidcuenta = c.cue_iid)
						where cc.est_nestado = 2  and cue_nparticion = 0 and cue_clinea = lin_ccodigo and t.tip_nCondicion in (''1'',''2'')
					) As nCantidadNoHabilitadasMovil,
					( 
					Select Count(*) From _Datos..m_cuentas c 
						INNER JOIN _Tablas..t_tipos as t ON c.cue_ctipo = t.tip_ccodigo
						left join _datos..m_estado_cuenta_cab cc on (cc.est_iidcuenta = c.cue_iid)
						where cc.est_nestado = 3  and cue_nparticion = 0 and cue_clinea = lin_ccodigo and t.tip_nCondicion in (''1'',''2'')
					) As nCantidadEnPruebaPorZonaMovil,
					( 
					Select Count(*) From _Datos..m_cuentas c 
						INNER JOIN _Tablas..t_tipos as t ON c.cue_ctipo = t.tip_ccodigo
						left join _datos..m_estado_cuenta_cab cc on (cc.est_iidcuenta = c.cue_iid)
						where cc.est_nestado = 4  and cue_nparticion = 0 and cue_clinea = lin_ccodigo and t.tip_nCondicion in (''1'',''2'')
					) As nCantidadPedidoEliminarMovil,
					( 
					Select Count(*) From _Datos..m_cuentas c 
						INNER JOIN _Tablas..t_tipos as t ON c.cue_ctipo = t.tip_ccodigo
						left join _datos..m_estado_cuenta_cab cc on (cc.est_iidcuenta = c.cue_iid)
						where cc.est_nestado = 0  and cue_nparticion = 0 and cue_clinea = lin_ccodigo and t.tip_nCondicion = ''4''
					) As nCantidadHabilitadasCercos,
					( 
					Select Count(*) From _Datos..m_cuentas c 
						INNER JOIN _Tablas..t_tipos as t ON c.cue_ctipo = t.tip_ccodigo
						left join _datos..m_estado_cuenta_cab cc on (cc.est_iidcuenta = c.cue_iid)
						where cc.est_nestado = 1  and cue_nparticion = 0 and cue_clinea = lin_ccodigo and t.tip_nCondicion = ''4''
					) As nCantidadEnPruebaCercos,
					( 
					Select Count(*) From _Datos..m_cuentas c 
						INNER JOIN _Tablas..t_tipos as t ON c.cue_ctipo = t.tip_ccodigo
						left join _datos..m_estado_cuenta_cab cc on (cc.est_iidcuenta = c.cue_iid)
						where cc.est_nestado = 2  and cue_nparticion = 0 and cue_clinea = lin_ccodigo and t.tip_nCondicion = ''4''
					) As nCantidadNoHabilitadasCercos,
					( 
					Select Count(*) From _Datos..m_cuentas c 
						INNER JOIN _Tablas..t_tipos as t ON c.cue_ctipo = t.tip_ccodigo
						left join _datos..m_estado_cuenta_cab cc on (cc.est_iidcuenta = c.cue_iid)
						where cc.est_nestado = 3  and cue_nparticion = 0 and cue_clinea = lin_ccodigo and t.tip_nCondicion = ''4''
					) As nCantidadEnPruebaPorZonaCercos,
					( 
					Select Count(*) From _Datos..m_cuentas c 
						INNER JOIN _Tablas..t_tipos as t ON c.cue_ctipo = t.tip_ccodigo
						left join _datos..m_estado_cuenta_cab cc on (cc.est_iidcuenta = c.cue_iid)
						where cc.est_nestado = 4  and cue_nparticion = 0 and cue_clinea = lin_ccodigo and t.tip_nCondicion = ''4''
					) As nCantidadPedidoEliminarCercos
				From _tablas..t_lineas Order By 1
'
END





if (@type = 'receptores')
BEGIN
SET @Sql = '
Select Max(R.rec_cdescripcion) As Receptor,P.rec_iPuerto, Count(*) As Cant
			From _datos..p_recepcion P 
			Inner Join _datos..m_receptores_cab R On R.rec_iid=P.rec_idReceptor
			Where rec_tfechahora>=  DATEADD(hour,-24,getdate()) -- pedido por leo (2021/06/29)
			And rec_nOrigen In(2,6)
			Group By rec_cdescripcion,rec_iPuerto
'
END


if (@type = 'awccmobilelogin')
BEGIN
SET @Sql = '
Select Top 1 fecha,hora  From _sistema..w_logs_sistema
		Where fecha>=GetDate()-1 And Lower(operacion)=Lower(''Login Mobile'')
		Order By fecha DESC ,hora DESC
'
END

if (@type = 'spacep_recepcion')
BEGIN
SET @Sql = '
use _datos
exec sp_spaceused ''p_recepcion''
'
END

if (@type = 'spacep_posicionesGPS')
BEGIN
SET @Sql = '
use _datos
exec sp_spaceused ''p_posicionesGPS''
'
END

if (@type = 'spacep_RXLog')
BEGIN
SET @Sql = '
use _datos
exec sp_spaceused ''p_RXLog''
'
END


if (@type = 'spcount')
BEGIN
SET @Sql = '
Select Count(*) As nCant From _Datos..Smartpanic 
			Where CuentaId Is Not Null 
				And CuentaId != 0
'
END

if (@type = 'vccount')
BEGIN
SET @Sql = '
Select Count(*) As nCant From _Datos..SmartTrack
			Where CuentaId Is Not Null 
				And CuentaId != 0 and apptype=''VIGICONTROL''
'
END

if (@type = 'cacount')
BEGIN
SET @Sql = '
Select Count(*) As nCant From _Datos..SmartTrack
			Where CuentaId Is Not Null 
				And CuentaId != 0 and apptype=''CLEANAPP''
'
END




BEGIN TRY
    PRINT(@Sql)
	EXEC(@Sql)
END TRY  
BEGIN CATCH  
     select 'error' as msg
END CATCH  
/*
select * From _datos..m_cuentas where cue_nparticion != 0

MON
SGD
520
MON
MON
SGD
SGD
SGD
*/