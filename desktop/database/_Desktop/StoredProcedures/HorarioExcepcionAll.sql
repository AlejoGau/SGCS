CREATE OR ALTER PROCEDURE [dbo].[HorarioExcepcionAll]
 @idCta VARCHAR(10) = '0'
AS  
 SET NOCOUNT ON   
 

 --Sql
 Declare @cSQL nVarchar(MAX)
 SET @cSQL = ';WITH cteFeriados AS (
	SELECT  exc_idKey as RowNumber, [exc_iidcuenta],rtrim(ltrim([exc_cevento])) as exc_cevento
      ,[exc_idKey],[exc_cHoraApertura],[exc_cHoraCierre],eve_cdescripcion FROM _datos.dbo.m_horarios_excepcion o
	Left JOIN _Tablas..t_eventos_feriados ef ON eve_ccodigo = exc_cevento
			WHERE [exc_iidcuenta] = '+@idCta+' 
	Union All
	SELECT 0 as RowNumber, 14835 as [exc_iidcuenta] ,eve_ccodigo as exc_cevento,0 As [exc_idKey],eve_dfechadesdes As  [exc_cHoraApertura] ,eve_dfechahasta As  [exc_cHoraCierre],eve_cdescripcion
	  FROM _Tablas.dbo.t_eventos_feriados 
			WHERE eve_ccodigo NOT IN (Select exc_cevento from _datos..m_horarios_excepcion where  [exc_iidcuenta] = '+@idCta+' 
			) )
SELECT ROW_NUMBER() OVER (ORDER BY exc_cevento DESC) AS RowNumber, * From cteFeriados			'

/*
Print '----'
Print @cSQL
Print '----'
*/

Execute sp_executesql @cSQL