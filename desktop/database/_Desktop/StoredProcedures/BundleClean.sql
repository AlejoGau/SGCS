CREATE OR ALTER PROCEDURE [dbo].[BundleClean]
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;
	delete from Bundle where Bundle.Id in (
		select Bundle.Id from bundle 
		inner join UIApplication on Bundle.ObjectTypeId = 51 and UIApplication.Id = Bundle.ObjectId
		where UIApplication.Version != Bundle.Version
	)

	delete from Bundle where Bundle.Name in ('Razor','Organization','Geography','Taxonomy','DataApplicationManager'
	,'VehicleBrand','EventosTiempoReal','SearchObject','BundleManager')

	delete from Razor where name in ('XMLKeyGenerator') --,'LicenseHelper')

	--delete from Razor where razortype in ('Controller','Model','Store','View')

END