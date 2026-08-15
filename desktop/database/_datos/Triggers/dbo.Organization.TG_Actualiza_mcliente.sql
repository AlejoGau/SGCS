-- =============================================
-- Author:		Rodrigo Román
-- Create date: 18/2/2019
-- Description:	Actualiza datos del cliente MG si existe
-- =============================================
CREATE OR ALTER TRIGGER [dbo].[TG_Actualiza_mcliente]
   ON  [dbo].[Organization]
   AFTER UPDATE
AS 
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;


	UPDATE
		c
	SET
		c.cli_ccallefiscal = isnull(o.Address,'')
		,cli_cnombre = isnull(o.Name,'')
		,cli_cidentificacion = LEFT(isnull(o.NationalTax,''), 20)
		,cli_clocalidadfiscal = isnull(o.City,'')
		,cli_ccodigopostalfiscal = isnull(o.Zip,'')
		,cli_cprovinciafiscal = isnull(p.pro_ccodigo,'')
	FROM
		_Datos..m_clientes_fc c
		INNER JOIN inserted as o on CONVERT(int,o.Account) = c.cli_icodigo_ID
		left join _Tablas..t_provincias p on o.state = p.pro_idkey
	WHERE
		o.Account is not null and o.Account != ''
	

END