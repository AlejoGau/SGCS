--#############################################################################
-- SOFTGUARD DESKTOP
-- updated : 2017-06-15 08:51:37.443 
--#############################################################################

--#############################################################################
-- SOFTGUARD DESKTOP
-- updated : 2017-06-15 08:45:33.613 
--#############################################################################

CREATE OR ALTER PROCEDURE [dbo].[RestauracionGenerar](@iIdCuenta NVARCHAR(128), @cEvento NVARCHAR(128), @FechaHoraEvento datetime)
as
begin
set nocount on 
--Hago el select
/*
Select zon_ccodigo,zon_ccodigorestauracion,zon_nminutosrestauracion,zon_nautoprocesa,zon_cAlarmaAGenerar,
    DATEADD(MINUTE,zon_nminutosrestauracion,@FechaHoraEvento) As tLimite
    FROM _datos..m_Zonas
Where zon_cCodigoRestauracion<>'' AND zon_nMinutosrestauracion>0
    And zon_iidcuenta=@iIdCuenta
    And zon_ccodigo=@cEvento
    And zon_codigoalarma=@cEvento
    */
/*
--Si este select trajo algo sigo ( llamo cNoRes al cursor resultante )
    if (cNoRes.zon_nautoprocesa = 1 && Autoprocesa == SI
        @iRecId = es el valor de rec_iid del evento insertado en p_recepcion
    Else             
        @iRecId = 0
    EndIf */
/*
    @tFechaHora es cNoRes.tLimite
    @cAlarma es cNoRes.zon_ccodigorestauracion
    @cUsuario es Cast(cNoRes.zon_nminutosrestauracion as Char(3))
    @cAlarmaAGenerar es cNoRes.zon_cAlarmaAGenerar
*/                 

    --INSERT INTO _datos..p_timer (tim_iidcuenta,tim_tfechahora,tim_calarma,tim_czona,tim_cusuario,tim_copnclo,tim_irecid,tim_cAlarmaAGenerar)
    --VALUES (@iIdCuenta,@tFechaHora,@cAlarma,@cEvento,@cUsuario,'R',@iRecId,@cAlarmaAGenerar)
    
end