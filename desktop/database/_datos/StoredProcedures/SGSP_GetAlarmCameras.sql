CREATE OR ALTER PROCEDURE [dbo].[SGSP_GetAlarmCameras]
	@cDealer [VarChar](150) = '',
    @cVideoLnk [Char](4) = ''
WITH EXECUTE AS CALLER
AS
--Es el store que ejecuta CameraAlarmsReceiverService para obetener los links de video de las camaaras que envian alarma
--Autor :Pablo O. Canónico
--Fecha :11/04/2019
--2019-11-01 : Se agrego HAR-Hikvision Alarm Receiver
--2023-03-21 : Se agrego DAP-Dahua Alarm Receiver P2P Mode
--2024-08-12 : DK-297 Se agrego IAR:Intelbras Alarm Receiver P2P Mode
--2024-10-29 : DK-404 Si eliminan links y el servicio esta ejecutando no se entera y al traer de nuevo los links no queda ninguno da error
--2025-03-10 : Se agrego parametro para filtrar puntualmente por Integracion
--2026-06-30 : Se agrego DFR-Dahua Face Recognition
Set NoCount On
BEGIN TRY
	Select tvi_iid,cuv_iidCuenta As idCta,cue_ncuenta,cue_cIMEI,cuv_cLinkDSS As cLinkDSS,'' As Zona
		From [dbo].[m_cuentas]
			Inner Join [dbo].[m_cuentas_video] On cue_iid=cuv_iidCuenta
			Inner Join [_Tablas].[dbo].[t_VideoID] ON [tvi_iid]=cuv_iVideoID
			where (
				(@cVideoLnk = '' And [tvi_cdescripcion] IN ('DAR:', 'HAR:', 'DAP:', 'IAR:', 'DFR:'))
				OR
				(@cVideoLnk <> '' And [tvi_cdescripcion] = @cVideoLnk)
			)
			And ( [cue_clinea] = @cDealer Or @cDealer = '' )
	Union All
	(
	Select tvi_iid,cvl_iidCuenta As idCta,cue_ncuenta,cue_cIMEI,cvl_cLinkDSS As cLinkDSS,cvl_cZona As Zona
		From [dbo].[m_cuentas]
			Inner Join [dbo].[m_cuentas_video_links] cuv  On cue_iid=cvl_iidCuenta
			Inner Join [_Tablas].[dbo].[t_VideoID] ON [tvi_iid]=cvl_iVideoID
			where (
				(@cVideoLnk = '' And [tvi_cdescripcion] IN ('DAR:', 'HAR:', 'DAP:', 'IAR:', 'DFR:'))
				OR
				(@cVideoLnk <> '' And [tvi_cdescripcion] = @cVideoLnk)
			)
			And ( [cue_clinea] = @cDealer Or @cDealer = '' )
	)
	Union All
	(
	Select 0 AS tvi_iid,0 AS idCta,'' AS cue_ncuenta,'' AS cue_cIMEI,'' AS cLinkDSS,'' AS Zona
		Where NOT EXISTS (
			Select 1 From [dbo].[m_cuentas]
				Inner Join [dbo].[m_cuentas_video] On cue_iid=cuv_iidCuenta
				Inner Join [_Tablas].[dbo].[t_VideoID] ON [tvi_iid]=cuv_iVideoID
				where (
					(@cVideoLnk = '' And [tvi_cdescripcion] IN ('DAR:', 'HAR:', 'DAP:', 'IAR:', 'DFR:'))
					OR
					(@cVideoLnk <> '' And [tvi_cdescripcion] = @cVideoLnk)
				)
				And ( [cue_clinea] = @cDealer Or @cDealer = '' )
						)
		And NOT EXISTS (
			Select 1 From [dbo].[m_cuentas]
				Inner Join [dbo].[m_cuentas_video_links] cuv  On cue_iid=cvl_iidCuenta
				Inner Join [_Tablas].[dbo].[t_VideoID] ON [tvi_iid]=cvl_iVideoID
				where (
					(@cVideoLnk = '' And [tvi_cdescripcion] IN ('DAR:', 'HAR:', 'DAP:', 'IAR:', 'DFR:'))
					OR
					(@cVideoLnk <> '' And [tvi_cdescripcion] = @cVideoLnk)
				)
				And ( [cue_clinea] = @cDealer Or @cDealer = '' )
					 )
	)
	Order By tvi_iid,idCta

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

END CATCH