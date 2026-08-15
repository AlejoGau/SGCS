INSERT INTO SearchObject (Name, ObjectTypeId, Content, SearchType) VALUES ('ReporteHistorico', 3001, 'ReporteHistorico', 'Sql')
GO
CREATE FUNCTION [dbo].[ReporteHistoricoTieneNotificaciones] (@Rec_IId INT)  
RETURNS BIT AS  
BEGIN 
	--DECLARACIONES
	DECLARE @TieneNoficaciones BIT
	SET @TieneNoficaciones = 0
	
	--VERIFICO CAMPO CONTENIDO
	IF @TieneNoficaciones = 0
	BEGIN
		DECLARE @Rec_cContenido VARCHAR(50)
		
		SELECT @Rec_cContenido = ISNULL(rec_ccontenido, '')
		  FROM [_Datos].[dbo].[p_Recepcion] 
		 WHERE rec_ite = @Rec_IId 
			   AND rec_calarma = '_TE'
			   
		IF @Rec_cContenido != ''
			SET @TieneNoficaciones = 1
	END

	--VERIFICO CAMPO OBSERVACION
	IF @TieneNoficaciones = 0
	BEGIN
		DECLARE @Rec_cObservaciones VARCHAR(50)
		
		SELECT @Rec_cObservaciones = rec_cObservaciones 
		  FROM [_Datos].[dbo].[p_Recepcion] 
		 WHERE rec_iid = @Rec_IId
		 
		IF @Rec_cObservaciones != ''
		   SET @TieneNoficaciones = 1		 
	END

	RETURN @TieneNoficaciones
END

GO

CREATE PROCEDURE [dbo].[ReporteHistorico]  
 @Cuentas VARCHAR(512) = '',  
 @CodigosAlarmaExcluir VARCHAR(512) = '',    
 @FechaDesde DATETIME = NULL,  
 @FechaHasta DATETIME = NULL,  
 @Estados VARCHAR(512) = '',
 @Alertas VARCHAR(512) = '',  
 @Tipos VARCHAR(512) = '',  
 @Mostrar INT = 0,  
 @OrdenarFecha VARCHAR(128) = 'ASC'  
AS  
 SET NOCOUNT ON  
   
 DECLARE @SQL VARCHAR(2048)  
    
 DECLARE @TOP VARCHAR(64)   
 SET @TOP = ''  
 IF @Mostrar != 0  
  SET @TOP = 'TOP ' + CAST(@Mostrar AS VARCHAR)  
   
 SET @SQL = 'SELECT ' + @TOP + ' r.*, ta.cod_nprioridad, ta.cod_cdescripcion, ta.cod_ncolor, ta.cod_ncolorletra, z.zon_cdescripcion, u.usu_cnombre, dbo.ReporteHistoricoTieneNotificaciones(r.rec_iid) AS tiene_notificaciones, c.cue_clinea, c.cue_ncuenta, c.cue_cnombre
      FROM [_Datos].[dbo].[p_recepcion] r    
        INNER JOIN [_Tablas].[dbo].[t_codigos_alarma] ta ON ta.cod_ccodigo=r.rec_calarma        
        INNER JOIN [_Datos].[dbo].[m_cuentas] c ON c.cue_iid = r.rec_iidcuenta
        LEFT JOIN [_Datos].[dbo].[m_zonas] z ON z.zon_iidcuenta = r.rec_iidcuenta AND z.zon_ccodigo = r.rec_czona
        LEFT JOIN [_Datos].[dbo].[m_usuarios] u ON u.usu_iidcuenta = r.rec_iidcuenta AND u.usu_icodigo = r.rec_iusuario
     WHERE 1=1'                
  
 IF @Cuentas != ''
  SET @SQL = @SQL + ' AND r.rec_iidcuenta IN (' + CAST(@Cuentas AS VARCHAR) + ') '
    
 IF @CodigosAlarmaExcluir != ''  
  SET @SQL = @SQL + ' AND r.rec_calarma NOT IN (' + @CodigosAlarmaExcluir + ') '  
    
 IF @FechaDesde IS NOT NULL     
  SET @SQL = @SQL + ' AND r.rec_tfechahora >= ''' + CAST(@FechaDesde AS VARCHAR) + ''''  
  
 IF @FechaHasta IS NOT NULL     
  SET @SQL = @SQL + ' AND r.rec_tfechahora <= ''' + CAST(@FechaHasta AS VARCHAR) + ''''    
    
 if @Estados != ''
  SET @SQL = @SQL + ' AND r.rec_nestado IN ( ' + @Estados + ')'    
  
 IF @Alertas != ''  
  SET @SQL = @SQL + ' AND ta.cod_nalerta IN ( ' + @Alertas + ')'  
    
 IF @Tipos != ''  
  SET @SQL = @SQL + ' AND ta.cod_ntipo IN ( ' + @Tipos + ')'    
    
 IF @OrdenarFecha != 'ASC' AND @OrdenarFecha != 'DESC'  
  SET @OrdenarFecha = 'ASC'  
    
 SET @SQL = @SQL + ' ORDER BY r.rec_tfechahora ' + @OrdenarFecha  
    
EXEC (@SQL)  
GO
