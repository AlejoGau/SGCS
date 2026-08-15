CREATE OR ALTER PROCEDURE Searchm_cuentas_video_control
 @IdCta Int
AS
 Select [cvc_idKey] Id, '' Name
      , [cvc_iIdCta], [cvc_iActivacionTotal], [cvc_cActivacionParcial], 
        [cvc_iDesactivacion], [cvc_iActivacionParcial]
 from _Datos..m_cuentas_video_control
 where [cvc_iIdCta] = @IdCta