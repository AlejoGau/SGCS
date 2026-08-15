CREATE OR ALTER PROCEDURE [dbo].[SearchCodigosFalloTest]
as
begin
set nocount on 
SELECT tst_cAlarma FROM _datos..m_tst_prueba
Where tst_cAlarma>''
Group By tst_cAlarma
end