CREATE OR ALTER PROCEDURE [dbo].[SGSP_BuscoFormato] @iReceptor Int, @cFormato nVarChar(10), @iCuenta Int, @cZona  nVarChar(10), @cEvento nVarChar(10) As
--Busca formato y devuelve si se resolvio por CIDExtendido en la zona de la cuenta
--Autor :Pablo O. Canónico
--Fecha :02/07/2015

SET NOCOUNT ON
Declare @cAlarma nVarChar(10)=''
Declare @cExtendido nVarChar(10)=''

--Busco cEvento en Formatos
Set @cAlarma = (Select Top 1 for_calarma From  m_receptores_cab a With (NOLOCK)
Inner Join m_receptores_item b On b.rec_iid=a.rec_iid
Inner Join m_formatos On for_ccodigo=b.rec_cformato
Where a.rec_iid = @iReceptor And for_cformato = @cEvento)

If @cAlarma is null
	Begin	

	    --Busco cEvento en las Zonas de la Cuenta
	    Set @cAlarma = (Select Top 1 zon_codigoalarma As for_calarma From m_zonas With (NOLOCK)	Where zon_iidcuenta=@iCuenta And zon_ccodigo=@cEvento)
	
	    If  @cAlarma is null
		  Begin
	        --No encontro en Zonas de la Cuenta, busca cEvento con *
		    Set @cAlarma = (Select Top 1 zon_codigoalarma As for_calarma From m_zonas With (NOLOCK)	Where zon_iidcuenta=@iCuenta And zon_ccodigo=Left(@cEvento,1)+'*')
	
		      If  @cAlarma is null
		       	 Begin
					--Busco en Zonas de la Cuenta si tiene un MAP
					Set @cAlarma = (Select Top 1 cue_iid From m_cuentas With (NOLOCK)
									Inner Join m_zonas On cue_clinea=zon_cdealer And cue_ncuenta=zon_ccuenta 
									Where zon_iidcuenta=@iCuenta And zon_ccodigo='MAP' )
	
					If  @cAlarma is null
			       		Begin
							--Si no tiene MAP Busco en Zonas de la Cuenta si tiene un FWD
							Set @cAlarma = (Select Top 1 cue_iid From m_cuentas With (NOLOCK)
											Inner Join m_zonas On cue_clinea=zon_cdealer And cue_ncuenta=zon_ccuenta 
											Where zon_iidcuenta=@iCuenta And zon_ccodigo='FWD' )
	
							If  @cAlarma is null
								Begin
									--No encontro ni en Zonas ni * ni MAp ni FWD, busca cFormato en formatos del receptor que envio el evento
									Set @cAlarma = (Select Top 1 for_calarma From  m_receptores_cab a With (NOLOCK)
													Inner Join m_receptores_item b On b.rec_iid=a.rec_iid
													Inner Join m_formatos On for_ccodigo=b.rec_cformato
													Where  a.rec_iid = @iReceptor And for_cformato = @cFormato)
								End
							Else
		    					Set @cAlarma = '@F@'+@cAlarma
						End
					Else
						Set @cAlarma = '@M@'+@cAlarma
	        	 End
		  End
		Else
			Set @cExtendido = @cEvento
	End	

Select @cAlarma As for_cAlarma, @cExtendido As cExtendido