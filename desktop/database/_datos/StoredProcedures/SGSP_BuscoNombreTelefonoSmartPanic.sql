CREATE OR ALTER PROCEDURE [dbo].[SGSP_BuscoNombreTelefonoSmartPanic] @cIMEI VarChar(128)  As
--Trae el nombre del telefono asignado a un dispositivo con SmartPanicsApp
--Autor :Pablo O. Canónico
--Fecha :25/07/2013
--22/08/2014 Se agrego campo telefono para identificar a que destino no enviar SMS x Evento
--31/03/2017 Se considera tel_nsp Si y Ambos
SET NOCOUNT ON
Select [tel_cnombre],[tel_iid],[tel_ctelefono]
  From [dbo].[m_telefonos]
Inner Join [dbo].[SmartPanic] On [tel_iidcuenta]=[CuentaId] And Ltrim(Rtrim([Telefono]))=Ltrim(Rtrim([tel_ctelefono]))
Where [Imei]=@cIMEI
And [tel_nsp] IN(1,3)