CREATE OR ALTER PROCEDURE [dbo].[Tables_ProvinciasAll]	
AS
	SET NOCOUNT ON
	
	SELECT rtrim([pro_ccodigo]) as [pro_ccodigo]
      ,[pro_cdescripcion]
      ,[pro_cletra]
      ,[pro_nTipo]
      ,[pro_idKey]
      ,[pro_iParentID] FROM _Tablas.dbo.t_provincias