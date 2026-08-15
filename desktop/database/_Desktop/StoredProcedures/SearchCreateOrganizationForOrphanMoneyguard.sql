--#############################################################################
-- SOFTGUARD DESKTOP
-- updated : 2017-06-15 08:51:38.493 
--#############################################################################

--#############################################################################
-- SOFTGUARD DESKTOP
-- updated : 2017-06-15 08:45:34.450 
--#############################################################################



--select * from _sistema..dealerrango
/*
SearchCreateOrganizationForOrphanCuenta
select count(*) from _datos..m_cuentas where cue_ncuenta not in (select cuentadesde from _sistema..DealerRango)
select count(*) from _sistema..DealerRango
select * from _datos..m_clientes_fc
select * from _sistema..DealerRango
select * from _datos..organization
*/
CREATE OR ALTER PROCEDURE [dbo].[SearchCreateOrganizationForOrphanMoneyguard]
(@idcuenta NVARCHAR(512) = null)
as
begin

declare @tcuenta table (rownum int primary key identity(1,1), id int)
declare @rowcurrent int
declare @rowcount int 
declare @cid int
declare @oid int
declare @cue_ncuenta NVARCHAR(4)
declare @cue_clinea NVARCHAR(3)
declare @ooid NVARCHAR(512)
set @ooid = '';

--todo cliente MG sin organizacion, 
insert into @tcuenta(id)
select cli_icodigo_ID from _datos..m_clientes_fc
where cli_icodigo_ID not in (select Account from _datos..Organization)

select @rowcount = COUNT(*) from @tcuenta
set @rowcurrent = 0

while(@rowcurrent < @rowcount)
begin
	set @rowcurrent = @rowcurrent + 1
	select @cid = id from @tcuenta where rownum = @rowcurrent
	print '@cid ' + convert(varchar, @cid)
	
	--crea una Entidad (organization) usando los datos del cliente 
	insert into _datos..organization(Name, Address, Country, State, City, Zip, Phone, Mobile, Fax, Email, NationalTax, StateTax, Account, Web, LegalName, AddressLat, AddressLong, Status)
	select cli_cnombre Name, cli_ccallefiscal Address, provincias.pro_iParentID Country, provincias.pro_idKey State, cli_clocalidadfiscal City, 
	cli_ccodigopostalfiscal Zip, cli_ctelefono Phone, '' Mobile, '' Fax, '' Email, '' NationalTax, '' StateTax, @cid Account, '' Web, cli_cidentificacion LegalName, 0 AddressLat, 0 AddressLong, 7 Status 
	from _datos..m_clientes_fc clientes
	left join _tablas..t_provincias provincias on clientes.cli_cprovinciafiscal = provincias.pro_ccodigo
	where cli_icodigo_ID = @cid
		
	select @oid = SCOPE_IDENTITY() 
	
	--Busca las cuentas del moneyguard en _datos..[m_relacion_cliente_cuentas_fc]
	--Las relaciona en _sistema..dealerrango
	insert into _sistema..DealerRango	(name, nombreentidad, identidad, dealer, cuentadesde, cuentahasta)
	select '' name, '' nombreentidad, @oid identidad, c.cue_clinea dealer, c.cue_ncuenta cuentadesde, c.cue_ncuenta cuentahasta from _datos..[m_relacion_cliente_cuentas_fc] r
	left join _datos..m_cuentas c on (r.rel_icuenta = c.cue_iid)
	where c.cue_iid = @cid

	set @ooid = @ooid + ',' + convert(varchar, @oid)
--	break
end

exec ('select * from _datos..organization where id in (0' + @ooid + ')')
	
end