CREATE OR ALTER PROCEDURE [dbo].[Searchs_TablaHistoricos] 
	@page [int] = 1,
	@start [int] = 0,
	@limit [int] = 50,
	@sort [nVarChar](256) = '',
	@token [nVarChar](256) = '',
	@group [nVarChar](256) = '',
	@filter [nVarChar](2048) = '',
	@_dc [nVarChar](256) = '',
	@totalrows [int] = 1 OUTPUT
AS
BEGIN
	SET NOCOUNT ON;

    Select [c_periodo] From _Sistema..s_tablahistoricos 
	Where [c_periodo] IN (Select table_name From information_schema.columns)
	And [c_periodo] Not In ('p_recepcion','p_recepcion_notas','p_recepcion_proceso','p_recepcion_D')
	AND convert(int,SUBSTRING(rtrim([c_periodo]), 12, 6)) - convert(int,CONVERT(nvarchar(6), GETDATE(), 112)) <= 0
	Group by [c_periodo]
	Order By [c_periodo] Desc
END