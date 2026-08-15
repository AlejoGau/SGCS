CREATE OR ALTER PROCEDURE [dbo].[CA_vehiculo_AlarmaGenerar]
	@idCuenta varchar(3) = '',
	@cAlarmavtv [varchar](128) = '_VV',
	@cAlarmaseguro [varchar](128) = '_VS',
	@cObservaciones [varchar](max) = '',
	@cContenido [varchar](max) = '',
	@rec_norigen [int] = 5,
	@cUser [varchar](max) = 'SISTEMA'
WITH EXECUTE AS CALLER
AS
BEGIN
    SET NOCOUNT ON;
		
    -- Genero el CURSOR y VARIABLES a UTILIZAR
    DECLARE @usu_idkey INT;
	DECLARE @usu_icodigo INT;
	DECLARE @usu_iidcuenta INT;
	DECLARE @usu_cnombre varchar(256);
    DECLARE @fechaVencimiento DATE;

    -- busco vehiculos con seguro vencido
    DECLARE SeguroAlert CURSOR READ_ONLY FORWARD_ONLY FOR 
    select [usu_idKey],[usu_icodigo],[usu_iidcuenta],usu_cnombre,convert(date,JSON_VALUE(usu_cmetadata,'$.seguroVto')) as fechaVencimiento  
	FROM [_Datos].[dbo].[m_usuarios]
	where ISJSON(usu_cmetadata)=1
	  and JSON_VALUE(usu_cmetadata,'$.seguroVto') is not null
	  and isdate(JSON_VALUE(usu_cmetadata,'$.seguroVto')) = 1
	  --and dateadd(day,-30,convert(date,JSON_VALUE(usu_cmetadata,'$.seguroVto'))) < getdate()
	  and convert(date,JSON_VALUE(usu_cmetadata,'$.seguroVto')) < getdate()

    -- Apertura del CURSOR
    OPEN SeguroAlert

    -- Recorrido del CURSOR
    FETCH NEXT FROM SeguroAlert INTO
        @usu_idkey
        ,@usu_icodigo
        ,@usu_iidcuenta
        ,@usu_cnombre
        ,@fechaVencimiento
    WHILE @@fetch_status = 0
        BEGIN
            EXEC AlarmaGenerar
                @idCta = @usu_iidcuenta,
                @cAlarma = @cAlarmaseguro,
                @cObservaciones = @usu_cnombre,
                @cContenido = '',
                @idUsuario = @usu_icodigo,
                @cZona = '',
                @rec_norigen = @rec_norigen,
                @cUser = @cUser,
                @rec_idReceptor = NULL,
                @iPuerto = 0,
                @rec_idMap = 0,
                @rec_idFwd = 0,
                @cDll = '',
                @cMethod = ''

            FETCH NEXT FROM SeguroAlert INTO
                @usu_idkey
				,@usu_icodigo
				,@usu_iidcuenta
				,@usu_cnombre
				,@fechaVencimiento
        END

    -- Cierre del CURSOR
    CLOSE SeguroAlert
    DEALLOCATE SeguroAlert




	-- busco vehiculos con seguro vencido
	select @usu_idkey = 0
	select @usu_icodigo = 0
	select @usu_iidcuenta = 0
	select @usu_cnombre = ''
	select @fechaVencimiento = null
    
    DECLARE VTVAlert CURSOR READ_ONLY FORWARD_ONLY FOR 
    select [usu_idKey],[usu_icodigo],[usu_iidcuenta],usu_cnombre,convert(date,JSON_VALUE(usu_cmetadata,'$.seguroVto')) as fechaVencimiento  
	FROM [_Datos].[dbo].[m_usuarios]
	where ISJSON(usu_cmetadata)=1
	  and JSON_VALUE(usu_cmetadata,'$.vtv') is not null
	  and isdate(JSON_VALUE(usu_cmetadata,'$.vtv')) = 1
	  --and dateadd(day,-30,convert(date,JSON_VALUE(usu_cmetadata,'$.vtv'))) < getdate()
	  and convert(date,JSON_VALUE(usu_cmetadata,'$.vtv')) < getdate()

    -- Apertura del CURSOR
    OPEN VTVAlert

    -- Recorrido del CURSOR
    FETCH NEXT FROM VTVAlert INTO
        @usu_idkey
        ,@usu_icodigo
        ,@usu_iidcuenta
        ,@usu_cnombre
        ,@fechaVencimiento
    WHILE @@fetch_status = 0
        BEGIN
            EXEC AlarmaGenerar
                @idCta = @usu_iidcuenta,
                @cAlarma = @cAlarmavtv,
                @cObservaciones = @usu_cnombre,
                @cContenido = '',
                @idUsuario = @usu_icodigo,
                @cZona = '',
                @rec_norigen = @rec_norigen,
                @cUser = @cUser,
                @rec_idReceptor = NULL,
                @iPuerto = 0,
                @rec_idMap = 0,
                @rec_idFwd = 0,
                @cDll = '',
                @cMethod = ''

            FETCH NEXT FROM VTVAlert INTO
                @usu_idkey
				,@usu_icodigo
				,@usu_iidcuenta
				,@usu_cnombre
				,@fechaVencimiento
        END

    -- Cierre del CURSOR
    CLOSE VTVAlert
    DEALLOCATE VTVAlert
		
END