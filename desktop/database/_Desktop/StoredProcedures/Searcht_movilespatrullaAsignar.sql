CREATE OR ALTER PROCEDURE [dbo].[Searcht_movilespatrullaAsignar]
										 (@tmp_idKey Int,
										 @tmp_iAsignado Int)
							--WITH ENCRYPTION			 
							AS
										 set noCount on
										 update [_tablas]..[t_movilespatrulla] 
										 set [tmp_nestado] = 2,[tmp_iAsignado] = @tmp_iAsignado										
										 where [tmp_idKey] = @tmp_idKey