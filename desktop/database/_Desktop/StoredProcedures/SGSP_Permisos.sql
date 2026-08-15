CREATE OR ALTER PROCEDURE [dbo].[SGSP_Permisos]  AS
--Asigna permisos a TODAS las tablas,vistas,sp y funciones a TODOS los usuarios de la plataforma SoftGuard
--Autor .Pablo O. Canónico
--Fecha :16/07/2015

--Primero busco los usuarios de SoftGaurd de la Base de Datos
SET NOCOUNT ON

Declare @id int, @cname Varchar(512), @cnombres Varchar(1024), @cXtype Char(2)
Set @cNombres = ''

Declare c_users cursor FAST_FORWARD READ_ONLY For 
	Select uid,name From sysusers Where ( Left(Name,2) = 'SG' Or Left(Name,9) = 'SoftGuard' ) And Left(Name,9) <> 'SGSERVER\'	

Open c_users
Fetch Next From c_users Into @id,@cname
While @@FETCH_STATUS = 0
Begin
   Set @cNombres = @cNombres + Rtrim(@cName) + ','

   Fetch Next From c_users Into @id,@cname
End
Close c_users
Deallocate c_users

Set @cNombres = Left(@cNombres,Len(@cNombres)-1)
Print '---INICIO---'
Print 'cNombres '+@cNombres
If @cNombres = ''
	Set NoExec On

--Segundo busco las tablas,vistas,sp y funciones de la base de datos en donde se ejecuta
Declare @cTablas Varchar(Max)
Declare @cSelect Varchar(Max)
Set @cTablas = ''
Declare c_tables cursor FAST_FORWARD READ_ONLY for 
	Select name,xtype from sysobjects where xtype='U'  or (xtype='P' and category=0) or (xtype='V' and category=0) or (xtype In ('FS','FT','T','TF','FN') and category=0)
	Order By xtype,name

--Tercero asigno permisos All
Open c_tables
Fetch next from c_tables into @cname,@cXtype
While @@FETCH_STATUS = 0
Begin
   If @cXtype = 'TF'	--Le doy solo permiso de Select si es una Funcion Table-Valued
      Set @cSelect = ' GRANT SELECT ON '+Rtrim(@cName)+' TO ' +@cNombres
   Else
	  If @cXtype In ('P','FS','FT','T','TF','FN')	--Le doy solo permiso de Ejecucion si es un SP o Funcion Scalar-Valued
         Set @cSelect = ' GRANT EXECUTE ON '+Rtrim(@cName)+' TO ' +@cNombres
      Else
         Set @cSelect = ' GRANT SELECT,INSERT,UPDATE,DELETE ON '+Rtrim(@cName)+' TO ' +@cNombres

   Print @cSelect
   Exec ( @cSelect)

   Fetch Next From c_tables Into @cname,@cXtype
End
Close c_tables

Deallocate c_tables

Set NoExec Off		
Print '---FIN---'