
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
    public class CallerReporte : CallerObject
    { 	
				     private int _rep_iidcuenta;
					
				     private Decimal _rep_ntipo;
					
				     private DateTime? _rep_tproximoenvio;
					
				     private Decimal _rep_nfrecuencia;
					
				     private string _rep_cmail;
					
				     private int _rep_iLimiteSMS;
					
				     private Decimal _rep_nLimiteCada;
					
				     private Decimal _rep_nCadaUnidadTiempo;
					
				     private string _rep_cMailRuteoSMS;
					
				     private string _rep_cSMSParaInforme;
					
				     private int _rep_iModemSMS;
					
				     private int _rep_idGrupo;
				 ///<summary>
     ///rep_iidcuenta property   
     ///</summary>   
     public int rep_iidcuenta 
		 { 
		        
                    get{ return this._rep_iidcuenta; }
        						set{ this._rep_iidcuenta = value; } 										
	   }
	  ///<summary>
     ///rep_ntipo property   
     ///</summary>   
     public Decimal rep_ntipo 
		 { 
		        
                    get{ return this._rep_ntipo; }
        						set{ this._rep_ntipo = value; } 										
	   }
	  ///<summary>
     ///rep_tproximoenvio property   
     ///</summary>   
     public DateTime? rep_tproximoenvio 
		 { 
		        
                    get{ return this._rep_tproximoenvio; }
        						set{ this._rep_tproximoenvio = value; } 										
	   }
	  ///<summary>
     ///rep_nfrecuencia property   
     ///</summary>   
     public Decimal rep_nfrecuencia 
		 { 
		        
                    get{ return this._rep_nfrecuencia; }
        						set{ this._rep_nfrecuencia = value; } 										
	   }
	  ///<summary>
     ///rep_cmail property   
     ///</summary>   
     public string rep_cmail 
		 { 
		        
                    get{ return this._rep_cmail; }
        						set{ this._rep_cmail = value; } 										
	   }
	  ///<summary>
     ///rep_iLimiteSMS property   
     ///</summary>   
     public int rep_iLimiteSMS 
		 { 
		        
                    get{ return this._rep_iLimiteSMS; }
        						set{ this._rep_iLimiteSMS = value; } 										
	   }
	  ///<summary>
     ///rep_nLimiteCada property   
     ///</summary>   
     public Decimal rep_nLimiteCada 
		 { 
		        
                    get{ return this._rep_nLimiteCada; }
        						set{ this._rep_nLimiteCada = value; } 										
	   }
	  ///<summary>
     ///rep_nCadaUnidadTiempo property   
     ///</summary>   
     public Decimal rep_nCadaUnidadTiempo 
		 { 
		        
                    get{ return this._rep_nCadaUnidadTiempo; }
        						set{ this._rep_nCadaUnidadTiempo = value; } 										
	   }
	  ///<summary>
     ///rep_cMailRuteoSMS property   
     ///</summary>   
     public string rep_cMailRuteoSMS 
		 { 
		        
                    get{ return this._rep_cMailRuteoSMS; }
        						set{ this._rep_cMailRuteoSMS = value; } 										
	   }
	  ///<summary>
     ///rep_cSMSParaInforme property   
     ///</summary>   
     public string rep_cSMSParaInforme 
		 { 
		        
                    get{ return this._rep_cSMSParaInforme; }
        						set{ this._rep_cSMSParaInforme = value; } 										
	   }
	  ///<summary>
     ///rep_iModemSMS property   
     ///</summary>   
     public int rep_iModemSMS 
		 { 
		        
                    get{ return this._rep_iModemSMS; }
        						set{ this._rep_iModemSMS = value; } 										
	   }
	  ///<summary>
     ///rep_idGrupo property   
     ///</summary>   
     public int rep_idGrupo 
		 { 
		        
                    get{ return this._rep_idGrupo; }
        						set{ this._rep_idGrupo = value; } 										
	   }
	  ///<summary>
     ///Constructor   
     ///</summary>
        public CallerReporte() : base()
        {
            InitClass();
        }  
 ///<summary>
     ///Constructor   
     ///</summary>		
        public CallerReporte(int Id, string Name, int rep_iidcuenta, Decimal rep_ntipo, DateTime? rep_tproximoenvio, Decimal rep_nfrecuencia, string rep_cmail, int rep_iLimiteSMS, Decimal rep_nLimiteCada, Decimal rep_nCadaUnidadTiempo, string rep_cMailRuteoSMS, string rep_cSMSParaInforme, int rep_iModemSMS, int rep_idGrupo) : base()
        {
            base.Id = Id;
						base.Name = Name;				 																																					 
				    this._rep_iidcuenta = rep_iidcuenta;
this._rep_ntipo = rep_ntipo;
this._rep_tproximoenvio = rep_tproximoenvio;
this._rep_nfrecuencia = rep_nfrecuencia;
this._rep_cmail = rep_cmail;
this._rep_iLimiteSMS = rep_iLimiteSMS;
this._rep_nLimiteCada = rep_nLimiteCada;
this._rep_nCadaUnidadTiempo = rep_nCadaUnidadTiempo;
this._rep_cMailRuteoSMS = rep_cMailRuteoSMS;
this._rep_cSMSParaInforme = rep_cSMSParaInforme;
this._rep_iModemSMS = rep_iModemSMS;
this._rep_idGrupo = rep_idGrupo;

            InitClass();
        }  								

				private void InitClass()
        {														
  				  base.Type = new ObjectType(3032, "Reporte");
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
			SimpleReporte Simple = new SimpleReporte();
			Simple.Id = base.Id;
			Simple.Name = base.Name;
			Simple.rep_iidcuenta = this._rep_iidcuenta;
Simple.rep_ntipo = this._rep_ntipo;
Simple.rep_tproximoenvio = this._rep_tproximoenvio;
Simple.rep_nfrecuencia = this._rep_nfrecuencia;
Simple.rep_cmail = this._rep_cmail;
Simple.rep_iLimiteSMS = this._rep_iLimiteSMS;
Simple.rep_nLimiteCada = this._rep_nLimiteCada;
Simple.rep_nCadaUnidadTiempo = this._rep_nCadaUnidadTiempo;
Simple.rep_cMailRuteoSMS = this._rep_cMailRuteoSMS;
Simple.rep_cSMSParaInforme = this._rep_cSMSParaInforme;
Simple.rep_iModemSMS = this._rep_iModemSMS;
Simple.rep_idGrupo = this._rep_idGrupo;

			return (SimpleBaseObject) Simple;
		}
 ///<summary>
     ///Sets a simpleobject   
     ///</summary>	
		public void SetSimpleObject(SimpleReporte Simple)
		{
			base.Id = Simple.Id;
			base.Name = Simple.Name;
			this._rep_iidcuenta = Simple.rep_iidcuenta;
this._rep_ntipo = Simple.rep_ntipo;
this._rep_tproximoenvio = Simple.rep_tproximoenvio;
this._rep_nfrecuencia = Simple.rep_nfrecuencia;
this._rep_cmail = Simple.rep_cmail;
this._rep_iLimiteSMS = Simple.rep_iLimiteSMS;
this._rep_nLimiteCada = Simple.rep_nLimiteCada;
this._rep_nCadaUnidadTiempo = Simple.rep_nCadaUnidadTiempo;
this._rep_cMailRuteoSMS = Simple.rep_cMailRuteoSMS;
this._rep_cSMSParaInforme = Simple.rep_cSMSParaInforme;
this._rep_iModemSMS = Simple.rep_iModemSMS;
this._rep_idGrupo = Simple.rep_idGrupo;

		}
 ///<summary>
     ///Gets a baseobject   
     ///</summary>
		public override BaseObject GetBaseObject(SqlHelper SqlConfig, int UserId)
		{
			return new DalReporte(SqlConfig, UserId, (SimpleReporte) GetSimpleObject());
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
               dt.Columns.Add(new DataColumn("rep_iidcuenta", typeof (int)));               
							 dt.Columns.Add(new DataColumn("rep_ntipo", typeof (Decimal)));               
							 dt.Columns.Add(new DataColumn("rep_tproximoenvio", typeof (DateTime)));               
							 dt.Columns.Add(new DataColumn("rep_nfrecuencia", typeof (Decimal)));               
							 dt.Columns.Add(new DataColumn("rep_cmail", typeof (string)));               
							 dt.Columns.Add(new DataColumn("rep_iLimiteSMS", typeof (int)));               
							 dt.Columns.Add(new DataColumn("rep_nLimiteCada", typeof (Decimal)));               
							 dt.Columns.Add(new DataColumn("rep_nCadaUnidadTiempo", typeof (Decimal)));               
							 dt.Columns.Add(new DataColumn("rep_cMailRuteoSMS", typeof (string)));               
							 dt.Columns.Add(new DataColumn("rep_cSMSParaInforme", typeof (string)));               
							 dt.Columns.Add(new DataColumn("rep_iModemSMS", typeof (int)));               
							 dt.Columns.Add(new DataColumn("rep_idGrupo", typeof (int)));               
							 										
               //create Row  
               dr = dt.NewRow();
               
               //set Row
							 dr["Id"] = base.Id;

							 dr["Name"] = base.Name;
dr["rep_iidcuenta"] = this._rep_iidcuenta;
dr["rep_ntipo"] = this._rep_ntipo;
dr["rep_tproximoenvio"] = this._rep_tproximoenvio;
dr["rep_nfrecuencia"] = this._rep_nfrecuencia;
dr["rep_cmail"] = this._rep_cmail;
dr["rep_iLimiteSMS"] = this._rep_iLimiteSMS;
dr["rep_nLimiteCada"] = this._rep_nLimiteCada;
dr["rep_nCadaUnidadTiempo"] = this._rep_nCadaUnidadTiempo;
dr["rep_cMailRuteoSMS"] = this._rep_cMailRuteoSMS;
dr["rep_cSMSParaInforme"] = this._rep_cSMSParaInforme;
dr["rep_iModemSMS"] = this._rep_iModemSMS;
dr["rep_idGrupo"] = this._rep_idGrupo;
							 
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
