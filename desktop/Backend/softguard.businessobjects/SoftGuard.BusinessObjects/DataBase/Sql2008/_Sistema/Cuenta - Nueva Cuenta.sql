INSERT INTO SearchObject (Name, ObjectTypeId, Content, SearchType) VALUES ('CuentaByDealerValidate', 3001, 'CuentaByDealerValidate', 'Sql')
GO
CREATE PROCEDURE CuentaByDealerValidate
	@token VARCHAR(128) = '',
	@linea VARCHAR(3),
	@cuenta VARCHAR(10)
AS 
	SET NOCOUNT ON
	
	--Chequeo si la cuenta existe
	DECLARE @CuentaExists INT
	
	SELECT @CuentaExists = COUNT(*) FROM _Datos.dbo.m_cuentas WHERE cue_clinea = @linea AND cue_ncuenta = @cuenta
	
	IF @CuentaExists != 0
		SELECT 1 AS Codigo, 'CuentaExiste' AS Descripcion
GO		
