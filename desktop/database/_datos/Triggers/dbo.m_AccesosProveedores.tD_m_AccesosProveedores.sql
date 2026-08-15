CREATE OR ALTER TRIGGER [dbo].[tD_m_AccesosProveedores] 
ON [dbo].[m_AccesosProveedores] 
FOR DELETE 
AS
BEGIN
    DECLARE @errno  Int = 0,
            @errmsg  VarChar(Max)='',
            @iOk    Int = 1 -- Inicializado como 1 para evitar conflicto en COMMIT
    
    BEGIN TRANSACTION 

    IF EXISTS (SELECT apr_idKey FROM deleted, _datos.dbo.[p_controlAcceso_IO]
               WHERE _datos.dbo.[p_controlAcceso_IO].cac_idautorizado = deleted.apr_idKey)
    BEGIN 
        SET @errmsg = ' No se puede BORRAR el registro, porque existe una instancia en [p_controlAcceso_IO]'
        SET @iOk = 0
    END

    IF @iOk = 1 AND EXISTS (SELECT apr_idKey FROM deleted, _datos.dbo.[m_AccesosProveedoresAutorizaciones]
                             WHERE _datos.dbo.[m_AccesosProveedoresAutorizaciones].[apa_idKeyProveedor] = deleted.apr_idKey)
    BEGIN 
        SET @errmsg = ' No se puede BORRAR el registro, porque existe una instancia en [m_AccesosProveedoresAutorizaciones]'
        SET @iOk = 0
    END

    IF @iOk = 1 AND EXISTS (SELECT apr_idKey FROM deleted, _datos.dbo.[m_AccesosProveedoresDocumentos]
                             WHERE _datos.dbo.[m_AccesosProveedoresDocumentos].[apd_idKeyProveedor] = deleted.apr_idKey)
    BEGIN 
        SET @errmsg = ' No se puede BORRAR el registro, porque existe una instancia en [[m_AccesosProveedoresDocumentos]]'
        SET @iOk = 0
    END

    IF @iOk = 1 AND EXISTS (SELECT apr_idKey FROM deleted, _datos.dbo.[m_AccesosProveedoresVehiculos]
                             WHERE _datos.dbo.[m_AccesosProveedoresVehiculos].[apv_idKeyProveedor] = deleted.apr_idKey)
    BEGIN 
        SET @errmsg = ' No se puede BORRAR el registro, porque existe una instancia en [[[m_AccesosProveedoresVehiculos]]]'
        SET @iOk = 0
    END

    -- Si hubo errores, hacer rollback
    IF @iOk = 0
    BEGIN
        RAISERROR('%s', 16, 1, @errmsg)
        ROLLBACK TRANSACTION 
    END
    ELSE
    BEGIN
        COMMIT TRANSACTION 
    END
END