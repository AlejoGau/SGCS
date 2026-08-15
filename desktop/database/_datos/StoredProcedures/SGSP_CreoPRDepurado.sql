CREATE OR ALTER PROCEDURE [dbo].[SGSP_CreoPRDepurado] @cCierre [Char](6), @nError [Int] = 0 OUTPUT, @CrearSynonym [Bit] = 1 As
--Crea el historico de p_recepcion en _History y su correspondiente SYNONYM en _Datos 
--Autor .Pablo O. Canónico
--Fecha : 22/07/2025
--Basado en SP_CreoHistoria
BEGIN
    SET NOCOUNT ON;

    Declare @cTableName VarChar(17) = 'p_recepcion' +  @cCierre 
    Declare @cSQL nVarChar(Max)
	Declare @collateDatos SYSNAME, @collateHistory SYSNAME

    -- Validar si ya existe el SYNONYM
    IF OBJECT_ID(@cTableName, 'SN') IS NOT NULL
    BEGIN
        SET @nError = -5;
        RETURN @nError;
    END

    BEGIN TRY
	  Select @collateDatos = collation_name From sys.databases WHERE name = '_Datos'
	  Select @collateHistory = collation_name From sys.databases WHERE name = '_History'
	  Declare @UseExplicitCollate BIT = CASE WHEN @collateDatos <> @collateHistory THEN 1 ELSE 0 END

	  Print 'CollateDatos : ' + @collateDatos
	  Print 'CollateHistory : ' + @collateHistory
	  Print 'Tablename : ' + @cTableName

      -- Crear tabla en _History
	  Set @cSQL = 'USE [_History];' + CHAR(13) + CHAR(10);
	  Set @cSQL += 'CREATE TABLE [dbo].[' + @cTableName + '] (' + CHAR(13) + CHAR(10);
	  Set @cSQL += '[rec_iid] BIGINT NOT NULL,' + CHAR(13) + CHAR(10);
	  Set @cSQL += '[rec_iidcuenta] INT NOT NULL,' + CHAR(13) + CHAR(10);
      Set @cSQL += '[rec_calarma] CHAR(3) ' + CASE WHEN @UseExplicitCollate = 1 THEN 'COLLATE ' + @collateDatos + ' ' ELSE '' END + 'NOT NULL,' + CHAR(13) + CHAR(10);
      Set @cSQL += '[rec_czona] CHAR(3) ' + CASE WHEN @UseExplicitCollate = 1 THEN 'COLLATE ' + @collateDatos + ' ' ELSE '' END + 'NOT NULL,' + CHAR(13) + CHAR(10);
      Set @cSQL += '[rec_iusuario] INT NOT NULL,' + CHAR(13) + CHAR(10);
      Set @cSQL += '[rec_tfechahora] DATETIME NOT NULL,' + CHAR(13) + CHAR(10);
      Set @cSQL += '[rec_nestado] NUMERIC(1, 0) NOT NULL,' + CHAR(13) + CHAR(10);
      Set @cSQL += '[rec_cContenido] NVARCHAR(50) ' + CASE WHEN @UseExplicitCollate = 1 THEN 'COLLATE ' + @collateDatos + ' ' ELSE '' END + 'NULL,' + CHAR(13) + CHAR(10);
      Set @cSQL += '[rec_tFechaProceso] DATETIME NULL,' + CHAR(13) + CHAR(10);
      Set @cSQL += '[rec_ioperador] INT NULL,' + CHAR(13) + CHAR(10);
      Set @cSQL += '[rec_cObservaciones] VARCHAR(Max) ' + CASE WHEN @UseExplicitCollate = 1 THEN 'COLLATE ' + @collateDatos + ' ' ELSE '' END + 'NULL,' + CHAR(13) + CHAR(10);
      Set @cSQL += '[rec_cTerminal] CHAR(3) ' + CASE WHEN @UseExplicitCollate = 1 THEN 'COLLATE ' + @collateDatos + ' ' ELSE '' END + 'NULL,' + CHAR(13) + CHAR(10);
      Set @cSQL += '[rec_idResolucion] CHAR(3) ' + CASE WHEN @UseExplicitCollate = 1 THEN 'COLLATE ' + @collateDatos + ' ' ELSE '' END + 'NULL,' + CHAR(13) + CHAR(10);
      Set @cSQL += '[rec_idReceptor] INT NULL,' + CHAR(13) + CHAR(10);
      Set @cSQL += '[rec_cCategorizacion] CHAR(3) ' + CASE WHEN @UseExplicitCollate = 1 THEN 'COLLATE ' + @collateDatos + ' ' ELSE '' END + 'NULL,' + CHAR(13) + CHAR(10);
      Set @cSQL += '[rec_iNYR] BIGINT NULL,' + CHAR(13) + CHAR(10);
      Set @cSQL += '[rec_iTE] BIGINT NULL,' + CHAR(13) + CHAR(10);
      Set @cSQL += '[rec_tFechaRecepcion] DATETIME NULL,' + CHAR(13) + CHAR(10);
      Set @cSQL += '[rec_nOrigen] NUMERIC(1, 0) NULL,' + CHAR(13) + CHAR(10);
      Set @cSQL += '[rec_idMap] BIGINT NULL,' + CHAR(13) + CHAR(10);
      Set @cSQL += '[rec_idFwd] BIGINT NULL,' + CHAR(13) + CHAR(10);
      Set @cSQL += '[rec_iMinutosEspera] INT NOT NULL,' + CHAR(13) + CHAR(10);
      Set @cSQL += '[rec_iPuerto] INT NOT NULL,' + CHAR(13) + CHAR(10);
      Set @cSQL += '[rec_idLoc] INT NULL,' + CHAR(13) + CHAR(10);
      Set @cSQL += '[rec_iPrioridad] INT NULL,' + CHAR(13) + CHAR(10);
      Set @cSQL += '[usuario_iCodigo] INT NULL,' + CHAR(13) + CHAR(10);
      Set @cSQL += '[usuario_cNombre] NVARCHAR(30) ' + CASE WHEN @UseExplicitCollate = 1 THEN 'COLLATE ' + @collateDatos + ' ' ELSE '' END + 'NULL,' + CHAR(13) + CHAR(10);
      Set @cSQL += '[zonas_cCodigo] CHAR(10) ' + CASE WHEN @UseExplicitCollate = 1 THEN 'COLLATE ' + @collateDatos + ' ' ELSE '' END + 'NULL,' + CHAR(13) + CHAR(10);
      Set @cSQL += '[zonas_cDescripcion] NVARCHAR(60) ' + CASE WHEN @UseExplicitCollate = 1 THEN 'COLLATE ' + @collateDatos + ' ' ELSE '' END + 'NULL,' + CHAR(13) + CHAR(10);
      Set @cSQL += '[_Origen] VARCHAR(100) ' + CASE WHEN @UseExplicitCollate = 1 THEN 'COLLATE ' + @collateDatos + ' ' ELSE '' END + 'NULL,' + CHAR(13) + CHAR(10);
      Set @cSQL += '[_Puerto] VARCHAR(100) ' + CASE WHEN @UseExplicitCollate = 1 THEN 'COLLATE ' + @collateDatos + ' ' ELSE '' END + 'NULL' + CHAR(13) + CHAR(10);
      Set @cSQL += ') ON [PRIMARY] TEXTIMAGE_ON [PRIMARY];';

	  Print @cSQL
	  Execute sp_executesql @cSQL

	  Set @nError = @@Error
	  IF @nError = 0	
	  Begin		-- Crear índices en _History
		Declare @cIndxName VarChar(100) = ''

		Set @cSQL = 'USE [_History];'
		Set @cSQL += 'CREATE CLUSTERED INDEX [iid] ON [dbo].[' + @cTableName + '] ([rec_iid]) ON [PRIMARY];'
		Print @cSQL
		Execute sp_executesql @cSQL

		Set @cIndxName = 'NC_' + RTRIM(@cTableName) + '_IdCta';
		Set @cSQL = 'USE [_History];'
		Set @cSQL += 'CREATE NONCLUSTERED INDEX [' + @cIndxName + '] ON [dbo].[' + @cTableName + '] ([rec_iidcuenta]);'
		Print @cSQL
		Execute sp_executesql @cSQL

		Set @cIndxName = 'NC_' + RTRIM(@cTableName) + '_FechaHora';
		Set @cSQL = 'USE [_History];'
		Set @cSQL += 'CREATE NONCLUSTERED INDEX [' + @cIndxName + '] ON [dbo].[' + @cTableName + '] ([rec_tfechahora]) INCLUDE ([rec_iid], [rec_iidcuenta], [rec_calarma], [rec_czona], [rec_iusuario], [rec_nestado], [rec_idResolucion], [rec_cCategorizacion], [rec_idReceptor]);'
		Print @cSQL
		Execute sp_executesql @cSQL

		Set @cIndxName = 'NC_' + RTRIM(@cTableName) + '_PuertoFechaOrigen';
		Set @cSQL = 'USE [_History];'
		Set @cSQL += 'CREATE NONCLUSTERED INDEX [' + @cIndxName + '] ON [dbo].[' + @cTableName + '] ([rec_iPuerto], [rec_tFechaRecepcion], [rec_nOrigen]);'
		Print @cSQL
		Execute sp_executesql @cSQL

		Set @cIndxName = 'NC_' + RTRIM(@cTableName) + '_CuentaFecha';
		Set @cSQL = 'USE [_History];'
		Set @cSQL += 'CREATE NONCLUSTERED INDEX [' + @cIndxName + '] ON [dbo].[' + @cTableName + '] ([rec_iidcuenta], [rec_tfechahora]) INCLUDE ([rec_iid], [rec_calarma], [rec_czona], [rec_iusuario], [rec_nestado], [rec_idResolucion], [rec_cCategorizacion], [_Origen]);'
		Print @cSQL
		Execute sp_executesql @cSQL

		IF @CrearSynonym = 1
		Begin
			-- Crear SYNONYM en _Datos apuntando a _History
			Set @cSQL = 'USE [_Datos];'
			Set @cSQL = 'CREATE SYNONYM [dbo].[' + @cTableName + '] FOR [_History].[dbo].[' + @cTableName + '];'
			Print @cSQL
			Execute sp_executesql @cSQL
		End
        -- Asignar permisos (en _History) Los users de _Datos deberian ser los mismos
		Declare @cname Varchar(512) = '',
				@cnombres Varchar(1024) = ''

		Declare c_users CURSOR STATIC LOCAL READ_ONLY FORWARD_ONLY For 
			Select name From sysusers Where ( Left(Name,2) = 'SG' Or Left(Name,9) = 'SoftGuard' ) And Left(Name,9) <> 'SGSERVER\'	

		Open c_users
		Fetch Next From c_users Into @cname
		While @@FETCH_STATUS = 0
		Begin
			Set @cNombres = @cNombres + Rtrim(@cName) + ','

			Fetch Next From c_users Into @cname
		End
		Close c_users
		Deallocate c_users

		If Len(@cNombres) > 0
			Set @cNombres = Left(@cNombres,Len(@cNombres)-1)
		Else
			Set @cnombres = '[SGDesktopAccess]'

        Set @cSQL = 'USE [_History];'
		Set @cSQL += 'GRANT  REFERENCES ,  SELECT ,  UPDATE ,  INSERT ,  DELETE  ON  [dbo].[' +  @cTableName + '] TO ' + @cNombres
		Print @cSQL
        Execute sp_executesql @cSQL

		--Actualizo la tabla [s_tablahistoricos]
		If Not Exists ( Select Top 1 [c_periodo] From [_Sistema].[dbo].[s_tablahistoricos] Where [c_periodo] = @cTableName)
			INSERT INTO [_Sistema].[dbo].[s_tablahistoricos] ([iid_reporte],[c_periodo],[n_usado]) VALUES (0,@cTableName,0)

        SET @nError = 0;
	End
    END TRY
    BEGIN CATCH
		PRINT 'Error Number  : ' + CAST(ERROR_NUMBER() AS VARCHAR(10));
		PRINT 'Error Message : ' + ERROR_MESSAGE();
		PRINT 'Error Severity: ' + CAST(ERROR_SEVERITY() AS VARCHAR(10));
		PRINT 'Error State   : ' + CAST(ERROR_STATE() AS VARCHAR(10));
		PRINT 'Error Line    : ' + CAST(ERROR_LINE() AS VARCHAR(10));
		PRINT 'Error Proc    : ' + ISNULL(ERROR_PROCEDURE(), 'Not within proc');
		Set @nError = -9
    END CATCH

    RETURN @nError;
END