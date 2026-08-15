CREATE OR ALTER TRIGGER [dbo].[TG_Del_Zona] ON [dbo].[m_zonas] FOR DELETE AS
BEGIN
 DECLARE @errno   int,
         @errmsg  varchar(255)
    BEGIN TRANSACTION 
    IF exists (
       SELECT [zon_idKey] From [_Datos].[dbo].[m_cuentas_video_links] 
	   Inner Join deleted On [cvl_czona] = [zon_ccodigo] And [cvl_iidCuenta] = [zon_iidcuenta]
			  )
		BEGIN 
			SELECT @errmsg = ' No se puede BORRAR el registro, porque existe una instancia en VideoLinks.'
			Raiserror('%s',0,1,@errmsg)
			ROLLBACK TRANSACTION 
		END 
	ELSE IF exists (
       SELECT [zon_idKey] From [_Tablas].[dbo].[t_CheckPoints_VC]
	   Inner Join deleted On [chp_cZona] = [zon_ccodigo] And [chp_iCuenta] = [zon_iidcuenta]
			  )
		BEGIN 
			SELECT @errmsg = ' No se puede BORRAR el registro, porque existe un checkpoint asociado'
			Raiserror('%s',0,1,@errmsg)
			ROLLBACK TRANSACTION 
		END 
    ELSE 
       COMMIT 
END