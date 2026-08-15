CREATE OR ALTER PROCEDURE [dbo].[p_recepcionUpdObsSearch]
	@Id [int],
	@rec_cObservaciones NTEXT = '',
	@token NVARCHAR(128) = ''
AS
BEGIN
  update _datos.dbo.p_recepcion set rec_cObservaciones =  @rec_cObservaciones
	where rec_iid = @Id
	
END