CREATE OR ALTER PROCEDURE [dbo].[SP_BuscoFormatoII] @iReceptor Int, @cFormato nVarChar(10), @iCuenta Int, @cZona  nVarChar(10), @cEvento nVarChar(10) AS
--Busca Formato para ModemIII
--Autor .Pablo O. Canónico

SET NOCOUNT ON
DECLARE @axSelect nVarChar(10)

--Busco cEvento en Formatos
Set @axSelect = (Select Top 1 for_calarma From  m_receptores_cab a With (NOLOCK)
Inner Join m_receptores_item b On b.rec_iid=a.rec_iid
Inner Join m_formatos On for_ccodigo=b.rec_cformato
Where  a.rec_iid = @iReceptor And for_cformato = @cEvento)

If  @axSelect is null
	Begin	
	    --Busco cEvento en las Zonas de la Cuenta
	    Set @axSelect = (Select Top 1 zon_codigoalarma As for_calarma From m_zonas With (NOLOCK)
			Where zon_iidcuenta=@iCuenta And zon_ccodigo=@cEvento)
	
	    If  @axSelect is null
		Begin
	            --No encontro en Zonas de la Cuenta, busca cEvento con *
		    Set @axSelect = (Select Top 1 zon_codigoalarma As for_calarma From m_zonas With (NOLOCK)
			Where zon_iidcuenta=@iCuenta And zon_ccodigo=Left(@cEvento,1)+'*')
	
		      If  @axSelect is null
		       	 Begin
			     --Busco en Zonas de la Cuenta si tiene un MAP
			     SET @axSelect = (Select Top 1 cue_iid FROM m_cuentas  With (NOLOCK)
				Inner Join m_zonas ON cue_clinea=zon_cdealer And cue_ncuenta=zon_ccuenta 
				Where zon_iidcuenta=@iCuenta And zon_ccodigo='MAP' )
	
			      If  @axSelect is null
			       	 Begin
				     --Si no tiene MAP Busco en Zonas de la Cuenta si tiene un FWD
				     SET @axSelect = (Select Top 1 cue_iid FROM m_cuentas  With (NOLOCK)
					Inner Join m_zonas ON cue_clinea=zon_cdealer And cue_ncuenta=zon_ccuenta 
					Where zon_iidcuenta=@iCuenta And zon_ccodigo='FWD' )
	
				      If  @axSelect is null
					Begin
					     --No encontro ni en Zonas ni * ni MAp ni FWD, busca cFormato en formatos del receptor que envio el evento
					     SET @axSelect = (Select Top 1 for_calarma From  m_receptores_cab a With (NOLOCK)
						Inner Join m_receptores_item b On b.rec_iid=a.rec_iid
						Inner Join m_formatos On for_ccodigo=b.rec_cformato
						Where  a.rec_iid = @iReceptor And for_cformato = @cFormato)
					End
				      Else
		    			SET @axSelect = '@F@'+@axSelect
				 End
			      Else
				  SET @axSelect = '@M@'+@axSelect
	        	 End
		End
	End	

Select @axSelect As for_cAlarma