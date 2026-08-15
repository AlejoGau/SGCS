CREATE OR ALTER PROCEDURE [dbo].[SGSP_VCFGInsertComandos]
    @cIMEI [VarChar](50) = '',
    @cValores [VarChar](500) = '',
    @iValor [int] = 0 OUTPUT,
    @iCta [int] = 0 OUTPUT,
    @iidIRS [int] = 0 OUTPUT

AS
--Es el store que ejecuta VettiConfigGateway para insertar los comandos a enviar por IRS
--Autor :Pablo O. Canónico
--Fecha :27/04/2022
--2026-06-09 : Pablo Castrovinci. Se ajusta obtención de cmd_iid debido a trigger INSTEAD OF INSERT en p_comandos_ip; se reemplaza SCOPE_IDENTITY() por búsqueda mediante identificador único en cmd_cObservaciones.

Set NoCount On

BEGIN TRY

    Declare @message VarChar(Max) = '',
            @StartDateTimeText VarChar(Max) = ''

    Select Top(1) 
        @iCta = cue_iid, 
        @iidIRS = IsNull([cue_iidIRS],0)  
    From [dbo].[m_cuentas] 
    Left Outer Join [dbo].[m_CuentasXtraInfo] 
        On [cue_iidCuenta]=[cue_iid]
    Where PATINDEX('%'+convert(Varchar(100),@cIMEI)+'%' ,cue_cIMEI)>0

    If @iCta Is Null Or @iCta = 0
    Begin
        Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
        Set @message = 'Start DateTime : %s | [SGSP_VCFGInsertComandos] | Id Cuenta en cero. No hay cuenta para el IMEI '+@cIMEI
        RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
    
        Set NoExec On
    End

    Declare @iReceptor Int = 
    (
        Select Max(rec_iid) 
        From [dbo].[m_receptores_cab] 
        Where [rec_cdll] = 'VettiPacketParser'
    )

    If @iReceptor Is Null Or @iReceptor = 0
    Begin
        Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
        Set @message = 'Start DateTime : %s | [SGSP_VCFGInsertComandos] | Id Receptor en cero. No se encontro VettiPacketParser'
        RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

        Set NoExec On
    End

    Declare @frame Char(2) = Substring(@cValores,5,2)

    -- Marca única para poder recuperar el cmd_iid real, ya que p_comandos_ip tiene INSTEAD OF INSERT
    Declare @cObs VarChar(100) = 'Comando Vetti Config Interno|' + CONVERT(VARCHAR(36), NEWID())

    Insert Into [dbo].[p_comandos_ip] 
    (
        [cmd_idCuenta],
        [cmd_idReceptor],
        [cmd_iComando],
        [cmd_cValores],
        [cmd_nEstado],
        [cmd_cObservaciones]
    )
    VALUES 
    (
        @iCta, 
        @iReceptor, 
        0, 
        @frame + '|' + @cValores + '|', 
        1,
        @cObs
    )

    -- SCOPE_IDENTITY() no funciona acá porque el INSERT real lo hace el trigger INSTEAD OF INSERT.
    Select Top 1 @iValor = [cmd_iid]
    From [dbo].[p_comandos_ip]
    Where [cmd_cObservaciones] = @cObs
    Order By [cmd_iid] Desc

    Set NoExec Off        

END TRY
BEGIN CATCH

    IF ERROR_NUMBER() = 2627
    BEGIN
        PRINT 'Handling PK violation...';
    END;
    ELSE IF ERROR_NUMBER() = 547
    BEGIN
        PRINT 'Handling CHECK/FK constraint violation...';
    END;
    ELSE IF ERROR_NUMBER() = 515
    BEGIN
        PRINT 'Handling NULL violation...';
    END;
    ELSE IF ERROR_NUMBER() = 245
    BEGIN
        PRINT 'Handling conversion error...';
    END;
    ELSE
    BEGIN
        PRINT 'Re-throwing error...';
    END;

    PRINT 'Error Number  : ' + CAST(ERROR_NUMBER() AS VARCHAR(10));
    PRINT 'Error Message : ' + ERROR_MESSAGE();
    PRINT 'Error Severity: ' + CAST(ERROR_SEVERITY() AS VARCHAR(10));
    PRINT 'Error State   : ' + CAST(ERROR_STATE() AS VARCHAR(10));
    PRINT 'Error Line    : ' + CAST(ERROR_LINE() AS VARCHAR(10));
    PRINT 'Error Proc    : ' + ISNULL(ERROR_PROCEDURE(), 'Not within proc');

    IF @@TRANCOUNT>0
        ROLLBACK TRAN

END CATCH