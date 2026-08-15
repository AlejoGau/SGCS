--#############################################################################
-- SOFTGUARD DESKTOP
-- updated : 2017-06-15 08:51:38.337 
--#############################################################################

--#############################################################################
-- SOFTGUARD DESKTOP
-- updated : 2017-06-15 08:45:34.407 
--#############################################################################


--select * from _sistema..dealerrango
/*
SearchCreateOrganizationForOrphanCuenta
select count(*) from _datos..m_cuentas where cue_ncuenta not in (select cuentadesde from _sistema..DealerRango)
select count(*) from _sistema..DealerRango
select * from _datos..m_cuentas where cue_iid = 958
select * from _sistema..DealerRango
*/
CREATE OR ALTER PROCEDURE [dbo].[SearchCreateOrganizationForOrphanCuenta]
(@idcuenta NVARCHAR(512) = null)
as
begin

create table #tcuenta (rownum int primary key identity(1,1), id int)
declare @rowcurrent int
declare @rowcount int 
declare @cid int
declare @oid int
declare @cue_ncuenta NVARCHAR(4)
declare @cue_clinea NVARCHAR(3)
declare @ooid NVARCHAR(512)
set @ooid = '';

--toda cuenta SIN ENTIDAD PADRE, 
--Si paso lista de cuentas filtra por esa
IF (@idcuenta is null)
BEGIN
	insert into #tcuenta(id)
	select a.cue_iid from _datos..m_cuentas a
	where a.cue_iid not in( 
			select c.cue_iid from _Datos.dbo.m_cuentas c inner join _Sistema.dbo.DealerRango r
			on c.cue_clinea = r.Dealer and c.cue_ncuenta = r.CuentaDesde)
END
ELSE
BEGIN
	exec ('
	insert into #tcuenta(id)
	select cue_iid from _datos..m_cuentas
	where cue_iid 
	not in (
		select c.cue_iid from _Datos.dbo.m_cuentas c 
		inner join _Sistema.dbo.DealerRango r
			on c.cue_clinea = r.Dealer and c.cue_ncuenta = r.CuentaDesde)
	and cue_iid in ('+@idcuenta+')
	')
END

select @rowcount = COUNT(*) from #tcuenta
set @rowcurrent = 0

while(@rowcurrent < @rowcount)
begin
	set @rowcurrent = @rowcurrent + 1
	select @cid = id from #tcuenta where rownum = @rowcurrent
	print '@cid ' + convert(varchar, @cid)
	
	--crea una Entidad (organization) usando los datos de la cuenta 
	insert into _datos..organization(Name, Address, Country, State, City, Zip, Phone, Mobile, Fax, Email, NationalTax, StateTax, Account, Web, LegalName, AddressLat, AddressLong, Status)
	select cue_cnombre Name, cue_ccalle Address, provincias.pro_iParentID Country, provincias.pro_idKey State, cue_clocalidad City, 
	cue_ccodigopostal Zip, cue_ctelefono Phone, '' Mobile, '' Fax, cue_cemail Email, '' NationalTax, '' StateTax, '' Account, '' Web, cue_cnombre LegalName, 0 AddressLat, 0 AddressLong, 7 Status 
	from _datos..m_cuentas cuentas
	left join _tablas..t_provincias provincias on (cuentas.cue_cprovincia = provincias.pro_ccodigo)
	where cue_iid = @cid
	
	select @cue_ncuenta = cue_ncuenta, @cue_clinea = cue_clinea from _datos..m_cuentas where cue_iid = @cid
	
	select @oid = SCOPE_IDENTITY() 

	--y le relaciona la cuenta
	insert into _sistema..DealerRango	(name, nombreentidad, identidad, dealer, cuentadesde, cuentahasta)
	values('', '', @oid, @cue_clinea, @cue_ncuenta, @cue_ncuenta)
	
	set @ooid = @ooid + ',' + convert(varchar, @oid)
--	break
end

exec ('select * from _datos..organization where id in (0' + @ooid + ')')
	
end