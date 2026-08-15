CREATE OR ALTER PROCEDURE [dbo].[SP_BuscoFormato] @iReceptor Int, @cFormato nVarChar(10), @iCuenta Int, @cZona  nVarChar(10) AS
--Busca Formato / Zonas
--Autor .Pablo O. Canónico
--Modificado 14/04/2004 para todos los protocolos (4+2,CID,SIA) Lee 1ero Zona,2do Zona*, 3ero MAP,4to FWD y Ultimo Formatos

SET NOCOUNT ON
DECLARE @axSelect nVarChar(10)
DECLARE @cEvento nVarChar(10)
If @cFormato='#T#'
   SET @axSelect='#T#'
Else
   Begin	
	SET @axSelect='   '
	--Veo si es 4+2
	If @cFormato='###'
	   Set @cEvento = @cZona
        Else
	   Set @cEvento = @cFormato

	Print 'cEvento '+@cEvento	
	Begin	
            --Busco cZona en las Zonas de la Cuenta
	    SET @axSelect = (Select Top 1 zon_codigoalarma As for_calarma From  m_zonas With (NOLOCK)
			Where zon_iidcuenta=@iCuenta And zon_ccodigo=@cEvento)

	    If  @axSelect is null
		   Begin
                      --No encontro en zonas, busca cZona con * si cZona es de 2 digitos ej. 5*
		      If Len(@cEvento) = 2
	        	 Begin
			    SET @axSelect = (Select Top 1 zon_codigoalarma As for_calarma From  m_zonas With (NOLOCK)
				Where zon_iidcuenta=@iCuenta
				   And zon_ccodigo=Left(@cEvento,1)+'*')
			 End

		      If  @axSelect is null
		       	 Begin
			     --Busco en las zonas de la cuenta si tiene un MAP
			     SET @axSelect = (Select Top 1 cue_iid FROM m_cuentas  With (NOLOCK)
				Inner Join m_zonas ON cue_clinea=zon_cdealer And cue_ncuenta=zon_ccuenta 
				Where zon_iidcuenta=@iCuenta And zon_ccodigo='MAP' )

			      If  @axSelect is null
			       	 Begin
				     --Si no tiene MAP Busco en las zonas de la cuenta si tiene un FWD
				     SET @axSelect = (Select Top 1 cue_iid FROM m_cuentas  With (NOLOCK)
					Inner Join m_zonas ON cue_clinea=zon_cdealer And cue_ncuenta=zon_ccuenta 
					Where zon_iidcuenta=@iCuenta And zon_ccodigo='FWD' )

				      If  @axSelect is null
					Begin
					     --No encontro ni zonas ni * ni MAp ni FWD, busca cZona en formatos del receptor que envio el evento
					     SET @axSelect = (Select Top 1 for_calarma From  m_receptores_cab a With (NOLOCK)
						Inner Join m_receptores_item b On b.rec_iid=a.rec_iid
						Inner Join m_formatos On for_ccodigo=b.rec_cformato
						Where  a.rec_iid = @iReceptor And for_cformato = @cEvento)
					End
				      Else
		    			SET @axSelect = '@F@'+@axSelect

				 End
			      Else
				  SET @axSelect = '@M@'+@axSelect
	        	 End
		   End
	End	
   End	

Select @axSelect As for_cAlarma