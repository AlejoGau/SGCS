CREATE OR ALTER PROCEDURE [dbo].[Taxo_comonosconocio_create]
AS
BEGIN

	DECLARE @IdPadre INT
	DECLARE @IdLanding INT

  IF NOT EXISTS(SELECT 1 FROM _Datos..TaxonomyValue WHERE Name = '_comoNosConocio' )
		BEGIN

			INSERT INTO _Datos..TaxonomyValue (Name,editable,type) VALUES ('_comoNosConocio',0,1)
			SET @IdPadre = SCOPE_IDENTITY()

			INSERT INTO _Datos..TaxonomyValue (Name,editable,type) VALUES ('Landing',1,1)
			SET @IdLanding = SCOPE_IDENTITY()

			INSERT INTO _Datos..TaxonomyTree (ParentId,ChildId) VALUES (@IdPadre,@IdLanding)

			SELECT 'Se crearon los registros necesarios' as msg, 0 as error
		END
	ELSE IF NOT EXISTS(SELECT 1 FROM _Datos..TaxonomyValue WHERE Name = 'Landing' )
		BEGIN
			
			SELECT @IdPadre = Id FROM _Datos..TaxonomyValue WHERE Name = '_comoNosConocio'

			INSERT INTO _Datos..TaxonomyValue (Name,editable,type) VALUES ('Landing',1,1)
			SET @IdLanding = SCOPE_IDENTITY()

			INSERT INTO _Datos..TaxonomyTree (ParentId,ChildId) VALUES (@IdPadre,@IdLanding)
			
			SELECT 'Se creo solo el registro landing' as msg, 0 as error
		END
	ELSE
		BEGIN
			SELECT 'Ya existien todos los registros necesarios' as msg, 0 as error
		END


END