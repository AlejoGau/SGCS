
    using System;
    using System.Xml;
    using System.Data;
    using Slbf;
    using Slbf.Helpers;	    	 

namespace SoftGuard.BusinessObjects
{ 	
   ///<summary>
     ///Caller object class   
     ///</summary>
    public class Callerm_CuentasXtraInfo : CallerObject
    { 	
				     private int _cue_iidcuenta;
					
				     private string _cue_ccustom;
					
				     private string _cue_cconfig;
					
				     private int _cue_ilicenciassp;
					
				     private int _cue_iImportancia;
					
				     private int _cue_iteclado;
					
				     private string _cue_cHoraAperturaAutomonitoreo;
					
				     private string _cue_cHoraCierreAutomonitoreo ;
					
				     private int _cue_ilicenciapar;
					
				     private int _cue_iTipoServicio;
					
				     private int _cue_iExcesoLimiteDia;
					
				     private int _cue_iExcesoLimiteHora;
					
				     private string _cue_cInstrucciones;
					
				     private int _cue_iInstrMostrar;
					
				     private int _cue_iVigiladoresVC;
				 ///<summary>
     ///cue_iidcuenta property   
     ///</summary>   
     public int cue_iidcuenta 
		 { 
		        
                    get{ return this._cue_iidcuenta; }
        						set{ this._cue_iidcuenta = value; } 										
	   }
	  ///<summary>
     ///cue_ccustom property   
     ///</summary>   
     public string cue_ccustom 
		 { 
		        
                    get{ return this._cue_ccustom; }
        						set{ this._cue_ccustom = value; } 										
	   }
	  ///<summary>
     ///cue_cconfig property   
     ///</summary>   
     public string cue_cconfig 
		 { 
		        
                    get{ return this._cue_cconfig; }
        						set{ this._cue_cconfig = value; } 										
	   }
	  ///<summary>
     ///cue_ilicenciassp property   
     ///</summary>   
     public int cue_ilicenciassp 
		 { 
		        
                    get{ return this._cue_ilicenciassp; }
        						set{ this._cue_ilicenciassp = value; } 										
	   }
	  ///<summary>
     ///cue_iImportancia property   
     ///</summary>   
     public int cue_iImportancia 
		 { 
		        
                    get{ return this._cue_iImportancia; }
        						set{ this._cue_iImportancia = value; } 										
	   }
	  ///<summary>
     ///cue_iteclado property   
     ///</summary>   
     public int cue_iteclado 
		 { 
		        
                    get{ return this._cue_iteclado; }
        						set{ this._cue_iteclado = value; } 										
	   }
	  ///<summary>
     ///cue_cHoraAperturaAutomonitoreo property   
     ///</summary>   
     public string cue_cHoraAperturaAutomonitoreo 
		 { 
		        
                    get{ return this._cue_cHoraAperturaAutomonitoreo; }
        						set{ this._cue_cHoraAperturaAutomonitoreo = value; } 										
	   }
	  ///<summary>
     ///cue_cHoraCierreAutomonitoreo  property   
     ///</summary>   
     public string cue_cHoraCierreAutomonitoreo  
		 { 
		        
                    get{ return this._cue_cHoraCierreAutomonitoreo ; }
        						set{ this._cue_cHoraCierreAutomonitoreo  = value; } 										
	   }
	  ///<summary>
     ///cue_ilicenciapar property   
     ///</summary>   
     public int cue_ilicenciapar 
		 { 
		        
                    get{ return this._cue_ilicenciapar; }
        						set{ this._cue_ilicenciapar = value; } 										
	   }
	  ///<summary>
     ///cue_iTipoServicio property   
     ///</summary>   
     public int cue_iTipoServicio 
		 { 
		        
                    get{ return this._cue_iTipoServicio; }
        						set{ this._cue_iTipoServicio = value; } 										
	   }
	  ///<summary>
     ///cue_iExcesoLimiteDia property   
     ///</summary>   
     public int cue_iExcesoLimiteDia 
		 { 
		        
                    get{ return this._cue_iExcesoLimiteDia; }
        						set{ this._cue_iExcesoLimiteDia = value; } 										
	   }
	  ///<summary>
     ///cue_iExcesoLimiteHora property   
     ///</summary>   
     public int cue_iExcesoLimiteHora 
		 { 
		        
                    get{ return this._cue_iExcesoLimiteHora; }
        						set{ this._cue_iExcesoLimiteHora = value; } 										
	   }
	  ///<summary>
     ///cue_cInstrucciones property   
     ///</summary>   
     public string cue_cInstrucciones 
		 { 
		        
                    get{ return this._cue_cInstrucciones; }
        						set{ this._cue_cInstrucciones = value; } 										
	   }
	  ///<summary>
     ///cue_iInstrMostrar property   
     ///</summary>   
     public int cue_iInstrMostrar 
		 { 
		        
                    get{ return this._cue_iInstrMostrar; }
        						set{ this._cue_iInstrMostrar = value; } 										
	   }
	  ///<summary>
     ///cue_iVigiladoresVC property   
     ///</summary>   
     public int cue_iVigiladoresVC 
		 { 
		        
                    get{ return this._cue_iVigiladoresVC; }
        						set{ this._cue_iVigiladoresVC = value; } 										
	   }
	  ///<summary>
     ///Constructor   
     ///</summary>
        public Callerm_CuentasXtraInfo() : base()
        {
            InitClass();
        }  
 ///<summary>
     ///Constructor   
     ///</summary>		
        public Callerm_CuentasXtraInfo(int Id, string Name, int cue_iidcuenta, string cue_ccustom, string cue_cconfig, int cue_ilicenciassp, int cue_iImportancia, int cue_iteclado, string cue_cHoraAperturaAutomonitoreo, string cue_cHoraCierreAutomonitoreo , int cue_ilicenciapar, int cue_iTipoServicio, int cue_iExcesoLimiteDia, int cue_iExcesoLimiteHora, string cue_cInstrucciones, int cue_iInstrMostrar, int cue_iVigiladoresVC) : base()
        {
            base.Id = Id;
						base.Name = Name;				 																																					 
				    this._cue_iidcuenta = cue_iidcuenta;
this._cue_ccustom = cue_ccustom;
this._cue_cconfig = cue_cconfig;
this._cue_ilicenciassp = cue_ilicenciassp;
this._cue_iImportancia = cue_iImportancia;
this._cue_iteclado = cue_iteclado;
this._cue_cHoraAperturaAutomonitoreo = cue_cHoraAperturaAutomonitoreo;
this._cue_cHoraCierreAutomonitoreo  = cue_cHoraCierreAutomonitoreo ;
this._cue_ilicenciapar = cue_ilicenciapar;
this._cue_iTipoServicio = cue_iTipoServicio;
this._cue_iExcesoLimiteDia = cue_iExcesoLimiteDia;
this._cue_iExcesoLimiteHora = cue_iExcesoLimiteHora;
this._cue_cInstrucciones = cue_cInstrucciones;
this._cue_iInstrMostrar = cue_iInstrMostrar;
this._cue_iVigiladoresVC = cue_iVigiladoresVC;

            InitClass();
        }  								

				private void InitClass()
        {														
  				  base.Type = new ObjectType(3127, "m_CuentasXtraInfo");
        }
 ///<summary>
     ///Gets the caller object   
     ///</summary>		
		public override CallerObject GetObject()
		{
			return (CallerObject) this;
		}
 ///<summary>
     ///Gets a simpleobject   
     ///</summary>	
		public override SimpleBaseObject GetSimpleObject()
		{
			Simplem_CuentasXtraInfo Simple = new Simplem_CuentasXtraInfo();
			Simple.Id = base.Id;
			Simple.Name = base.Name;
			Simple.cue_iidcuenta = this._cue_iidcuenta;
Simple.cue_ccustom = this._cue_ccustom;
Simple.cue_cconfig = this._cue_cconfig;
Simple.cue_ilicenciassp = this._cue_ilicenciassp;
Simple.cue_iImportancia = this._cue_iImportancia;
Simple.cue_iteclado = this._cue_iteclado;
Simple.cue_cHoraAperturaAutomonitoreo = this._cue_cHoraAperturaAutomonitoreo;
Simple.cue_cHoraCierreAutomonitoreo  = this._cue_cHoraCierreAutomonitoreo ;
Simple.cue_ilicenciapar = this._cue_ilicenciapar;
Simple.cue_iTipoServicio = this._cue_iTipoServicio;
Simple.cue_iExcesoLimiteDia = this._cue_iExcesoLimiteDia;
Simple.cue_iExcesoLimiteHora = this._cue_iExcesoLimiteHora;
Simple.cue_cInstrucciones = this._cue_cInstrucciones;
Simple.cue_iInstrMostrar = this._cue_iInstrMostrar;
Simple.cue_iVigiladoresVC = this._cue_iVigiladoresVC;

			return (SimpleBaseObject) Simple;
		}
 ///<summary>
     ///Sets a simpleobject   
     ///</summary>	
		public void SetSimpleObject(Simplem_CuentasXtraInfo Simple)
		{
			base.Id = Simple.Id;
			base.Name = Simple.Name;
			this._cue_iidcuenta = Simple.cue_iidcuenta;
this._cue_ccustom = Simple.cue_ccustom;
this._cue_cconfig = Simple.cue_cconfig;
this._cue_ilicenciassp = Simple.cue_ilicenciassp;
this._cue_iImportancia = Simple.cue_iImportancia;
this._cue_iteclado = Simple.cue_iteclado;
this._cue_cHoraAperturaAutomonitoreo = Simple.cue_cHoraAperturaAutomonitoreo;
this._cue_cHoraCierreAutomonitoreo  = Simple.cue_cHoraCierreAutomonitoreo ;
this._cue_ilicenciapar = Simple.cue_ilicenciapar;
this._cue_iTipoServicio = Simple.cue_iTipoServicio;
this._cue_iExcesoLimiteDia = Simple.cue_iExcesoLimiteDia;
this._cue_iExcesoLimiteHora = Simple.cue_iExcesoLimiteHora;
this._cue_cInstrucciones = Simple.cue_cInstrucciones;
this._cue_iInstrMostrar = Simple.cue_iInstrMostrar;
this._cue_iVigiladoresVC = Simple.cue_iVigiladoresVC;

		}
 ///<summary>
     ///Gets a baseobject   
     ///</summary>
		public override BaseObject GetBaseObject(SqlHelper SqlConfig, int UserId)
		{
			return new Dalm_CuentasXtraInfo(SqlConfig, UserId, (Simplem_CuentasXtraInfo) GetSimpleObject());
		}
 ///<summary>
     ///Get object's data   
     ///</summary>
		public override DataTable GetDataObject()
    {												                
               //create Table
               DataTable dt = new DataTable("Data");                              
               DataRow dr;
							 
							 dt.Columns.Add(new DataColumn("Id", typeof(int)));
							 dt.Columns.Add(new DataColumn("Name", typeof(string)));							 
               dt.Columns.Add(new DataColumn("cue_iidcuenta", typeof (int)));               
							 dt.Columns.Add(new DataColumn("cue_ccustom", typeof (string)));               
							 dt.Columns.Add(new DataColumn("cue_cconfig", typeof (string)));               
							 dt.Columns.Add(new DataColumn("cue_ilicenciassp", typeof (int)));               
							 dt.Columns.Add(new DataColumn("cue_iImportancia", typeof (int)));               
							 dt.Columns.Add(new DataColumn("cue_iteclado", typeof (int)));               
							 dt.Columns.Add(new DataColumn("cue_cHoraAperturaAutomonitoreo", typeof (string)));               
							 dt.Columns.Add(new DataColumn("cue_cHoraCierreAutomonitoreo ", typeof (string)));               
							 dt.Columns.Add(new DataColumn("cue_ilicenciapar", typeof (int)));               
							 dt.Columns.Add(new DataColumn("cue_iTipoServicio", typeof (int)));               
							 dt.Columns.Add(new DataColumn("cue_iExcesoLimiteDia", typeof (int)));               
							 dt.Columns.Add(new DataColumn("cue_iExcesoLimiteHora", typeof (int)));               
							 dt.Columns.Add(new DataColumn("cue_cInstrucciones", typeof (string)));               
							 dt.Columns.Add(new DataColumn("cue_iInstrMostrar", typeof (int)));               
							 dt.Columns.Add(new DataColumn("cue_iVigiladoresVC", typeof (int)));               
							 										
               //create Row  
               dr = dt.NewRow();
               
               //set Row
							 dr["Id"] = base.Id;

							 dr["Name"] = base.Name;
dr["cue_iidcuenta"] = this._cue_iidcuenta;
dr["cue_ccustom"] = this._cue_ccustom;
dr["cue_cconfig"] = this._cue_cconfig;
dr["cue_ilicenciassp"] = this._cue_ilicenciassp;
dr["cue_iImportancia"] = this._cue_iImportancia;
dr["cue_iteclado"] = this._cue_iteclado;
dr["cue_cHoraAperturaAutomonitoreo"] = this._cue_cHoraAperturaAutomonitoreo;
dr["cue_cHoraCierreAutomonitoreo "] = this._cue_cHoraCierreAutomonitoreo ;
dr["cue_ilicenciapar"] = this._cue_ilicenciapar;
dr["cue_iTipoServicio"] = this._cue_iTipoServicio;
dr["cue_iExcesoLimiteDia"] = this._cue_iExcesoLimiteDia;
dr["cue_iExcesoLimiteHora"] = this._cue_iExcesoLimiteHora;
dr["cue_cInstrucciones"] = this._cue_cInstrucciones;
dr["cue_iInstrMostrar"] = this._cue_iInstrMostrar;
dr["cue_iVigiladoresVC"] = this._cue_iVigiladoresVC;
							 
               //Insert Row in Table
               dt.Rows.Add(dr);
							 
							 return dt;	 
												    
        }
 ///<summary>
     ///Get object's Xml representation   
     ///</summary>
	public override XmlDataDocument GetXmlObject()
    {
			DataSet ds = new DataSet("Caller"); 
			ds.EnforceConstraints = false;														                
               							 
			ds.Tables.Add(GetDataObject());
			ds.Tables.Add(this.Type.GetDataObject());
			XmlDataDocument XmlDoc = new XmlDataDocument(ds);
			if(this.Relation != null)
				XmlDoc.SelectSingleNode("//Caller").InnerXml += this.Relation.Values.GetXmlObjects().InnerXml;
			return XmlDoc;	
    }
 }

}
