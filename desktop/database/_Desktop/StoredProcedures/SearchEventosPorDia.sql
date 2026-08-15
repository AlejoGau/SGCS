CREATE OR ALTER PROCEDURE [dbo].[SearchEventosPorDia]
	 @page INT = 1,               
	 @start INT = 0,               
	 @limit INT = 50,               
	 @sort NVARCHAR(256) = '',   
	 @group NVARCHAR(256) = '',            
	 @filter NVARCHAR(2048) = '',        
	 @_dc NVARCHAR(256) = '',              
	 @totalrows INT = 1 OUTPUT, 
	 @token VARCHAR(128) = '',
	 @fechadesde NVARCHAR(50) = '',
	 @fechahasta NVARCHAR(50) = '',
	 --@extramonth NVARCHAR(5) = 'true',
	 @table NVARCHAR(128) = ''

AS
SET NOCOUNT ON

/*
 * APLICANDO FILTROS y RANGOS
 */
--Filters
DECLARE @SqlFilter AS VARCHAR(4096)
SET @SqlFilter = dbo.GetSqlFilterForJson(@filter, '[_Datos].[dbo].[p_recepcion]')

--RANGOS 
DECLARE @SqlFilterRango AS VARCHAR(max) = ''
EXEC getSqlRangesForToken @table = '[_Datos].[dbo].[m_cuentas]', @token = @token, @alias = 'c.', @SqlFilterRango = @SqlFilterRango OUTPUT

print '--- RANGO';
print @SqlFilterRango
print '---';

SET @SqlFilter = isnull(@SqlFilter,'') + isnull(@SqlFilterRango,'')
print @SqlFilter

/* APLICANDO LOS VALORES HORA */
DECLARE @SqlWhere NVARCHAR(MAX);
SET @SqlWhere = '';

IF @fechadesde != '' 
	BEGIN
		SET @SqlWhere = @SqlWhere + ' AND pr.rec_tfechahora >= '''+convert(varchar,convert(date,@fechadesde,120),112)+'''';
	END
IF @fechahasta != '' 
	BEGIN
		SET @SqlWhere = @SqlWhere + ' AND pr.rec_tfechahora <= '''+convert(varchar,convert(date,@fechahasta,120),112)+'''';
	END

IF @token != ''
	BEGIN
		EXEC getSqlRangesForToken @token = @token, @alias = 'c.', @SqlFilterRango = @SqlFilterRango OUTPUT
		SET @SqlWhere = @SqlWhere + @SqlFilterRango
	END

IF (@table = '' )
    BEGIN
        set @table = '[_Datos]..p_recepcion pr, [_Datos]..eventospendientes ev'
    END
ELSE
    BEGIN
        set @table = '_Datos..'+@table+' pr With (NOLOCK)'
    END 

print '--- TABLA';
print @table
print '---';


-- SUMO EL GETLOCALE PARA INTERPRETAR A LA COLUMNA ITEM DONDE SE INDICA IR, TI, PG, SG, ETC.
DECLARE @language VARCHAR(256);
SELECT @language = par_cValor FROM _tablas..t_parametros

-- DECLARO SELECT con la informacion que necesito.
DECLARE @Sql NVARCHAR(MAX) = '';

SET @Sql = '
	-- CREACION DE TABLA PARA HORARIO
	DECLARE @tabla TABLE (evento NVARCHAR(MAX), horas VARCHAR(2), cantidad INT);
	DECLARE @horas TABLE (evento VARCHAR(30), tradux VARCHAR(250), horas INT);

	--CARGA DE TABLA Y DECLARACION DE VARIABLES
	DECLARE @first AS INT = 0
	DECLARE @last AS INT = 23
	DECLARE @pg AS VARCHAR(30) = ''PG :''
	DECLARE @pgt AS VARCHAR(30) 
	EXECUTE [dbo].[LocalizationGetLocale] @Name = @pg, @soloOutput=1, @translation = @pgt OUTPUT;
	DECLARE @ti AS VARCHAR(30) = ''TI : Evento de Control''
	DECLARE @tit AS VARCHAR(30)
	EXECUTE [dbo].[LocalizationGetLocale] @Name = @ti, @soloOutput=1, @translation = @tit OUTPUT;
	DECLARE @ir AS VARCHAR(30) = ''IR :''
	DECLARE @irt AS VARCHAR(30)
	EXECUTE [dbo].[LocalizationGetLocale] @Name = @ir, @soloOutput=1, @translation = @irt OUTPUT;
	
	WHILE(@first <= @last)
		BEGIN
			INSERT INTO @horas VALUES(@pg,@pgt,@first)
			INSERT INTO @horas VALUES(@ti,@tit,@first)
			INSERT INTO @horas VALUES(@ir,@irt,@first)
			SET @first += 1
		END

	INSERT INTO @tabla 
		SELECT ORD.item as evento, DATEPART(HOUR, pr.rec_tfechahora) as hora, COUNT(1) as cant
		FROM '+@table+'
			INNER JOIN [_Datos].[dbo].[m_cuentas] c on c.cue_iid = rec_iidcuenta
			OUTER APPLY (
				SELECT *
				FROM _Desktop..SplitString(_Origen,''%'')
				WHERE id = 2
			) ORD

		WHERE 1 = 1 ' + @SqlWhere + '
		GROUP BY DATEPART(HOUR, pr.rec_tfechahora), ORD.item
		ORDER BY DATEPART(HOUR, pr.rec_tfechahora)

	SELECT isnull(h.horas,t.horas) mishoras, isnull(t.evento,h.evento) evento, isnull(cantidad,0) cant FROM @tabla t
	FULL JOIN @horas h on h.horas = t.horas AND t.evento = h.evento
	order by mishoras

	'

PRINT (@Sql);
EXEC (@Sql)