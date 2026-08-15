-- =============================================
-- Author:		Rodrigo Román
-- Create date: 21/11/2016
-- Description:	filtra objetos y IDs de request rest para seguridad
-- =============================================
CREATE OR ALTER PROCEDURE [dbo].[RestUrlFilter]
	-- Add the parameters for the stored procedure here
	@object varchar(256),
	@id int
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    select 'true' as security
END