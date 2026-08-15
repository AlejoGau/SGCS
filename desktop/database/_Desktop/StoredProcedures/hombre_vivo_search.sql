-- =============================================
-- Author:		Martin Velez
-- Create date: 16/09/2022
-- Description:	Workflow alternativo, landing Pilar
-- =============================================
CREATE OR ALTER PROCEDURE [dbo].[hombre_vivo_search]
	@cue_iid int = 0

AS
BEGIN
	SET NOCOUNT ON;
	DECLARE @control VARCHAR

	SELECT 
     @control=dvc_config

	FROM [_Datos].[dbo].[m_dealer_vcconfig] A
	INNER JOIN [_Datos].[dbo].[m_cuentas] B ON A.dvc_cdealer=B.cue_clinea
	WHERE cue_iid=@cue_iid

	IF(@control != '')
	BEGIN
		SELECT 
			dvc_config
		FROM [_Datos].[dbo].[m_dealer_vcconfig] A
		INNER JOIN [_Datos].[dbo].[m_cuentas] B ON A.dvc_cdealer=B.cue_clinea
		WHERE cue_iid=@cue_iid
	END
	--ELSE
	--BEGIN
	--  SELECT REPLACE(CONVERT(VARCHAR(MAX),XmlData), '\', '') AS dvc_config FROM [_Datos].[dbo].[MetaData]
	--	WHERE ObjectId=52
	--END

END