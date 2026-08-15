CREATE OR ALTER PROCEDURE [dbo].[t_novedades_fcInsSearch]
	@nov_cdescripcion NVARCHAR(50) = '',
	@nov_mimporte  Money = 0,
	@nov_cimpuesto1 Char (3) = '' ,
	@nov_cimpuesto2 Char (3) = '' ,
	@nov_cimpuesto3 Char (3) = '' ,
	@nov_idproducto int,
	@nfc_icliente Int,
	@nfc_nrecurrente numeric (1,0) = 0,
	@nfc_nestado numeric (1,0) = 0
--WITH ENCRYPTION			 
AS
set noCount on

-- inerto la novedad

INSERT INTO [_Tablas].[dbo].[t_novedades_fc]
           ([nov_cdescripcion]
           ,[nov_mimporte]
           ,[nov_cimpuesto1]
           ,[nov_cimpuesto2]
           ,[nov_cimpuesto3]
           ,[nov_idproducto])
     VALUES
           (@nov_cdescripcion
           ,@nov_mimporte
           ,@nov_cimpuesto1
           ,@nov_cimpuesto2
           ,@nov_cimpuesto3
           ,@nov_idproducto
		   )



declare @nov_icodigo_ID int
select @nov_icodigo_ID= @@Identity

EXECUTE [_Desktop].[dbo].[m_novedades_facturacion_fcIns] 
   ''
  ,@nfc_icliente
  ,@nov_icodigo_ID
  ,@nfc_nrecurrente
  ,@nfc_nestado
										
exec t_novedades_fcSel @nov_icodigo_ID