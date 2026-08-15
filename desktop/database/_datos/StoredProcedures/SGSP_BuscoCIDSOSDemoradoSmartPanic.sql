CREATE OR ALTER PROCEDURE [dbo].[SGSP_BuscoCIDSOSDemoradoSmartPanic]  As
--Trae los codigos de CID configurados para los eventos de SOSDemorado utilizados en SmartPanicsApp
--Autor :Pablo O. Canónico
--Fecha :03/06/2014
SET NOCOUNT ON
Declare @jSon As nVarChar(max)

Set @json = (Select XmlData From _Desktop.dbo.MetaData WHERE ObjectTypeId = _Desktop.dbo.GetObjectId('UIApplication') AND ObjectId = 30)

If(OBJECT_ID('tempdb..#TempSP') Is Not Null)
Begin
    Drop Table #TempSP
End
Create Table #TempSP ( Valor Varchar(100) )

Insert Into #TempSP
Select Value From _Datos.dbo.SplitDelimited(@json,',\') Where Value Like '%DEMORADO%'

Select Valor From #TempSP