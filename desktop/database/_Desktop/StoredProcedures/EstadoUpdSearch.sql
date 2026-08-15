CREATE OR ALTER PROCEDURE [dbo].[EstadoUpdSearch]
	@Id [int],
	@Name [nvarchar](128),
	
	@est_iidcuenta int,
	@est_nestado [numeric](1, 0),
	@est_ntipo [numeric](1, 0),
	@est_dfechadesde [datetime],
	@est_nduracion [numeric](3, 0),
	@est_dfechahasta [datetime],
	@est_mnota [text],
	@est_cData [text],
	@token NVARCHAR(128) = ''
AS
BEGIN
  EXEC _desktop..EstadoUpd  @Id = @Id,
									@Name = @Name,
									@est_nestado = @est_nestado,
									@est_ntipo = @est_ntipo,
									@est_dfechadesde = @est_dfechadesde,
									@est_nduracion = @est_nduracion,
									@est_dfechahasta = @est_dfechahasta,
									@est_mnota = @est_mnota,
									@token = @token

	
END