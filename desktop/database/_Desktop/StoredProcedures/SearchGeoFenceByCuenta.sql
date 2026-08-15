CREATE OR ALTER PROCEDURE [dbo].[SearchGeoFenceByCuenta](@IdCuenta int)
as
begin
set nocount on
select g.[Id]
      ,g.[Name]
      ,g.[GeoType]
      ,g.[Dealer]
      ,g.[MetaData]
      ,g.[Style] from _datos..GeoFenseCuenta gc
inner join _datos..GeoFense g on (gc.GeoFenseId = g.Id)
where gc.CuentaId = @IdCuenta
and g.[MetaData]!=''
end