-- =============================================
-- Author:		Román Rodrigo
-- Create date: 12/06/2019
-- Description:	Establece el organizationType basado en el usuario relacionado, deja CLI como default
-- =============================================
CREATE OR ALTER PROCEDURE [dbo].[setOrganizationType]
	-- Add the parameters for the stored procedure here
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

	-- actualizo tipo de organizaciones
	-- CLI
	-- PROV
	-- CENTRAL

	update _datos..organization set OrganizationType = 'CENTRAL'
	where Id in (
		SELECT convert(int, udw_empresa) from _Sistema..usersdesktopweb where udw_tipo in (0,1)
	)
	update _datos..organization set OrganizationType = 'CLI'
	where OrganizationType is null OR OrganizationType = ''

	--select * from _datos..Organization order by OrganizationType desc
END