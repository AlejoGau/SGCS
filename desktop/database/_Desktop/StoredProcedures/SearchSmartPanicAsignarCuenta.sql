CREATE OR ALTER PROCEDURE [dbo].[SearchSmartPanicAsignarCuenta]
(
	@SmartPanicId int,
	@CuentaId Int,
	@usu_cidentificacion VARCHAR(20) = ''		
)
--WITH ENCRYPTION			 
AS
begin
	set noCount on

update [_datos].dbo.[SmartPanic] set [CuentaId] = @CuentaId
	where [Id] = @SmartPanicId

declare @telefono varchar(128)
declare @nombre varchar(128)
---
declare @nOrden smallint
declare @tel_iid int
---
select @telefono = telefono, @nombre = Nombre from _datos..smartpanic where id = @SmartPanicId

declare @SIGNATURENOMBRE varchar(1024) = 'SmartPanics2' 
select  @SIGNATURENOMBRE = isnull(par_cvalor,'SmartPanics2') from _tablas..t_parametros where par_ccodigo = 'SIGNATURENOMBRE';


if not exists(select * from _datos..m_telefonos where right(tel_ctelefono,8) = right(@telefono,8) and tel_iidcuenta = @cuentaid)
---
       Begin
             Set @nOrden = (Select Max(tel_norden) From _Datos.dbo.m_telefonos Where tel_iidcuenta = @cuentaid)
             If @nOrden Is Null
                    Set @nOrden = 0

			 select @tel_iid = ISNULL(MAX(tel_iid),0) + 1 FROM _Datos.dbo.m_telefonos WHERE tel_iidcuenta = @cuentaid             
             insert into _datos..m_telefonos(tel_iidcuenta, tel_ctelefono, tel_cnombre, tel_nsp, tel_norden,tel_iid,tel_clista)
             values(@CuentaId, @telefono, @nombre, 1, @nOrden+1, @tel_iid,'001')
       End
---

select @tel_iid = tel_iid from _datos..m_telefonos where right(tel_ctelefono,8) = right(@telefono,8) and tel_iidcuenta = @cuentaid
If Not @tel_iid Is Null
	Begin 
		if not exists(select usu_idKey from _datos..m_usuarios where usu_icodigo = 700+@tel_iid and usu_iidcuenta = @cuentaid)
		Begin
			declare @code int
			select @code = 700+@tel_iid
			insert into _datos..m_usuarios(usu_iidcuenta, usu_icodigo, usu_cnombre, usu_iid,usu_ntipo, usu_cidentificacion)
			values(@CuentaId, @code, @nombre, @code, 2, @usu_cidentificacion)
		End
	End
---

---
If (Select Count(*) From _Datos.dbo.m_zonas Where zon_ccodigo IN('SP1','SP2','SP3','SP4','SP5','SP6','SP7','SP8') And zon_iidcuenta=@cuentaid ) <> 8
Begin
	Declare @jSon As nVarChar(max)

	Set @json = (Select XmlData From _Desktop.dbo.MetaData WHERE ObjectTypeId = _Desktop.dbo.GetObjectId('UIApplication') AND ObjectId = 30)

	Select Value INTO #Auxiliar From _Datos.dbo.SplitDelimited(@json,',\') Where Value Like '%CIDE%' Or Value Like '%CIDT%' Or Value Like '%SOSDEMO%'

	Declare TmpCursor Cursor Scroll For
	   Select ( Case When Value Like '%CIDESOS\%' Then 'SP1' 
					 When Value Like '%CIDEFIRE\%' Then 'SP2' 
					 When Value Like '%CIDEASSIST\%' Then 'SP3' 
					 When Value Like '%CIDTST\%' Then 'SP4' 
					 When Value Like '%CIDESOSDEMORADOI\%' Then 'SP5' 
					 When Value Like '%CIDESOSDEMORADONOW\%' Then 'SP6' 
					 When Value Like '%CIDESOSDEMORADOMIN\%' Then 'SP7' 
					 When Value Like '%CIDRSOSDEMORADOI\%' Then 'SP8' 
					 Else 'NO' End ) As Zona,
			  ( Case When Value Like '%CIDESOS\%' Then 'S51' 
					 When Value Like '%CIDEFIRE\%' Then 'S53' 
					 When Value Like '%CIDEASSIST\%' Then 'S55' 
					 When Value Like '%CIDTST\%' Then 'S57' 
					 When Value Like '%CIDESOSDEMORADOI\%' Then 'S60' 
					 When Value Like '%CIDESOSDEMORADONOW\%' Then 'S58' 
					 When Value Like '%CIDESOSDEMORADOMIN\%' Then 'S61' 
					 When Value Like '%CIDRSOSDEMORADOI\%' Then 'S63' 
					 Else 'NO' End ) As Alarma
		From #Auxiliar

		Declare @cZona char(3)
		Declare @cAlarma char(3)
		Declare @cDesc char(40)
		Declare @cLista char(3)

		

		Open TmpCursor
		
		FETCH NEXT FROM  TmpCursor INTO @cZona,@cAlarma
		WHILE @@FETCH_STATUS = 0
		   Begin

				if not exists(select zon_idKey from _datos..m_zonas where zon_ccodigo = @cZona and zon_iidcuenta = @cuentaid)
					Begin
						Set @cDesc = (Select cod_cdescripcion From _Tablas.dbo.t_codigos_alarma Where cod_ccodigo = @cAlarma )
						If  @cDesc Is Null
							Set @cDesc = @SIGNATURENOMBRE+@cZona

						Set @cLista = (Select Top 1 lis_ccodigo From _Tablas.dbo.t_listas_emergencia Order By lis_ccodigo)
						If  @cLista Is Null
							Set @cLista = '001'

						insert into _datos..m_zonas(zon_iidcuenta, zon_ccodigo, zon_cdescripcion, zon_codigoalarma, zon_clistaemergencia, zon_nminutosrestauracion, zon_nmostrar, zon_nautoprocesa, zon_cimagen, zon_mobservacion, zon_ccodigorestauracion)
						values(@CuentaId, @cZona, @cDesc, @cAlarma, @cLista, 0, 2, 2, '', '', '')
					End

			FETCH NEXT FROM  TmpCursor INTO @cZona,@cAlarma
  		   End
		
		Close TmpCursor
		DEALLOCATE TmpCursor


		-- si no existe una zona GEO crearla
	Drop table #Auxiliar
End
---

exec SmartPanicAltaEvent @SmartPanicId

exec SmartPanicSel @SmartPanicId

end