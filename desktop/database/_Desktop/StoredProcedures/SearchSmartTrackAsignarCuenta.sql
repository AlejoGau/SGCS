--#############################################################################
-- SOFTGUARD DESKTOP
-- updated : 2017-06-15 08:51:38.920 
--#############################################################################

--#############################################################################
-- SOFTGUARD DESKTOP
-- updated : 2017-06-15 08:45:34.970 
--#############################################################################



CREATE OR ALTER PROCEDURE [dbo].[SearchSmartTrackAsignarCuenta]
(
 			@SmartTrackId int,
 			@CuentaId Int)
--WITH ENCRYPTION			 
AS
begin
	set noCount on
	
	

update [_datos].dbo.[SmartTrack] set [CuentaId] = @CuentaId
	where [Id] = @SmartTrackId

declare @telefono NVARCHAR(128)
declare @nombre NVARCHAR(128)
---
declare @nOrden smallint
declare @tel_iid int
---
select @telefono = telefono, @nombre = Nombre from _datos..smarttrack where id = @SmartTrackId

if not exists(select * from _datos..m_telefonos where tel_ctelefono = @telefono and tel_iidcuenta = @cuentaid)
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

select @tel_iid = tel_iid from _datos..m_telefonos where tel_ctelefono = @telefono and tel_iidcuenta = @cuentaid
If Not @tel_iid Is Null
	Begin 
		if not exists(select usu_idKey from _datos..m_usuarios where usu_icodigo = 700+@tel_iid and usu_iidcuenta = @cuentaid)
		Begin
			declare @code int
			select @code = 700+@tel_iid
			insert into _datos..m_usuarios(usu_iidcuenta, usu_icodigo, usu_cnombre, usu_iid,usu_ntipo)
			values(@CuentaId, @code, @nombre, @code,2)
		End
	End
---



exec SmartTrackSel @SmartTrackId  

end