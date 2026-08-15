
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
    public class Callert_modems_sms : CallerObject
    { 	
				     private int _sms_icodigo;
					
				     private string _sms_cdescripcion;
					
				     private Decimal _sms_nport;
					
				     private string _sms_cseteo;
					
				     private string _sms_cinbox;
					
				     private Decimal _sms_ndefault;
					
				     private string _sms_cterminal;
					
				     private string _sms_csource;
					
				     private Decimal _sms_nEstado;
					
				     private int _sms_iGateway;
					
				     private string _sms_cDealer;
				 ///<summary>
     ///sms_icodigo property   
     ///</summary>   
     public int sms_icodigo 
		 { 
		        
                    get{ return this._sms_icodigo; }
        						set{ this._sms_icodigo = value; } 										
	   }
	  ///<summary>
     ///sms_cdescripcion property   
     ///</summary>   
     public string sms_cdescripcion 
		 { 
		        
                    get{ return this._sms_cdescripcion; }
        						set{ this._sms_cdescripcion = value; } 										
	   }
	  ///<summary>
     ///sms_nport property   
     ///</summary>   
     public Decimal sms_nport 
		 { 
		        
                    get{ return this._sms_nport; }
        						set{ this._sms_nport = value; } 										
	   }
	  ///<summary>
     ///sms_cseteo property   
     ///</summary>   
     public string sms_cseteo 
		 { 
		        
                    get{ return this._sms_cseteo; }
        						set{ this._sms_cseteo = value; } 										
	   }
	  ///<summary>
     ///sms_cinbox property   
     ///</summary>   
     public string sms_cinbox 
		 { 
		        
                    get{ return this._sms_cinbox; }
        						set{ this._sms_cinbox = value; } 										
	   }
	  ///<summary>
     ///sms_ndefault property   
     ///</summary>   
     public Decimal sms_ndefault 
		 { 
		        
                    get{ return this._sms_ndefault; }
        						set{ this._sms_ndefault = value; } 										
	   }
	  ///<summary>
     ///sms_cterminal property   
     ///</summary>   
     public string sms_cterminal 
		 { 
		        
                    get{ return this._sms_cterminal; }
        						set{ this._sms_cterminal = value; } 										
	   }
	  ///<summary>
     ///sms_csource property   
     ///</summary>   
     public string sms_csource 
		 { 
		        
                    get{ return this._sms_csource; }
        						set{ this._sms_csource = value; } 										
	   }
	  ///<summary>
     ///sms_nEstado property   
     ///</summary>   
     public Decimal sms_nEstado 
		 { 
		        
                    get{ return this._sms_nEstado; }
        						set{ this._sms_nEstado = value; } 										
	   }
	  ///<summary>
     ///sms_iGateway property   
     ///</summary>   
     public int sms_iGateway 
		 { 
		        
                    get{ return this._sms_iGateway; }
        						set{ this._sms_iGateway = value; } 										
	   }
	  ///<summary>
     ///sms_cDealer property   
     ///</summary>   
     public string sms_cDealer 
		 { 
		        
                    get{ return this._sms_cDealer; }
        						set{ this._sms_cDealer = value; } 										
	   }
	  ///<summary>
     ///Constructor   
     ///</summary>
        public Callert_modems_sms() : base()
        {
            InitClass();
        }  
 ///<summary>
     ///Constructor   
     ///</summary>		
        public Callert_modems_sms(int Id, string Name, int sms_icodigo, string sms_cdescripcion, Decimal sms_nport, string sms_cseteo, string sms_cinbox, Decimal sms_ndefault, string sms_cterminal, string sms_csource, Decimal sms_nEstado, int sms_iGateway, string sms_cDealer) : base()
        {
            base.Id = Id;
						base.Name = Name;				 																																					 
				    this._sms_icodigo = sms_icodigo;
this._sms_cdescripcion = sms_cdescripcion;
this._sms_nport = sms_nport;
this._sms_cseteo = sms_cseteo;
this._sms_cinbox = sms_cinbox;
this._sms_ndefault = sms_ndefault;
this._sms_cterminal = sms_cterminal;
this._sms_csource = sms_csource;
this._sms_nEstado = sms_nEstado;
this._sms_iGateway = sms_iGateway;
this._sms_cDealer = sms_cDealer;

            InitClass();
        }  								

				private void InitClass()
        {														
  				  base.Type = new ObjectType(3082, "t_modems_sms");
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
			Simplet_modems_sms Simple = new Simplet_modems_sms();
			Simple.Id = base.Id;
			Simple.Name = base.Name;
			Simple.sms_icodigo = this._sms_icodigo;
Simple.sms_cdescripcion = this._sms_cdescripcion;
Simple.sms_nport = this._sms_nport;
Simple.sms_cseteo = this._sms_cseteo;
Simple.sms_cinbox = this._sms_cinbox;
Simple.sms_ndefault = this._sms_ndefault;
Simple.sms_cterminal = this._sms_cterminal;
Simple.sms_csource = this._sms_csource;
Simple.sms_nEstado = this._sms_nEstado;
Simple.sms_iGateway = this._sms_iGateway;
Simple.sms_cDealer = this._sms_cDealer;

			return (SimpleBaseObject) Simple;
		}
 ///<summary>
     ///Sets a simpleobject   
     ///</summary>	
		public void SetSimpleObject(Simplet_modems_sms Simple)
		{
			base.Id = Simple.Id;
			base.Name = Simple.Name;
			this._sms_icodigo = Simple.sms_icodigo;
this._sms_cdescripcion = Simple.sms_cdescripcion;
this._sms_nport = Simple.sms_nport;
this._sms_cseteo = Simple.sms_cseteo;
this._sms_cinbox = Simple.sms_cinbox;
this._sms_ndefault = Simple.sms_ndefault;
this._sms_cterminal = Simple.sms_cterminal;
this._sms_csource = Simple.sms_csource;
this._sms_nEstado = Simple.sms_nEstado;
this._sms_iGateway = Simple.sms_iGateway;
this._sms_cDealer = Simple.sms_cDealer;

		}
 ///<summary>
     ///Gets a baseobject   
     ///</summary>
		public override BaseObject GetBaseObject(SqlHelper SqlConfig, int UserId)
		{
			return new Dalt_modems_sms(SqlConfig, UserId, (Simplet_modems_sms) GetSimpleObject());
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
               dt.Columns.Add(new DataColumn("sms_icodigo", typeof (int)));               
							 dt.Columns.Add(new DataColumn("sms_cdescripcion", typeof (string)));               
							 dt.Columns.Add(new DataColumn("sms_nport", typeof (Decimal)));               
							 dt.Columns.Add(new DataColumn("sms_cseteo", typeof (string)));               
							 dt.Columns.Add(new DataColumn("sms_cinbox", typeof (string)));               
							 dt.Columns.Add(new DataColumn("sms_ndefault", typeof (Decimal)));               
							 dt.Columns.Add(new DataColumn("sms_cterminal", typeof (string)));               
							 dt.Columns.Add(new DataColumn("sms_csource", typeof (string)));               
							 dt.Columns.Add(new DataColumn("sms_nEstado", typeof (Decimal)));               
							 dt.Columns.Add(new DataColumn("sms_iGateway", typeof (int)));               
							 dt.Columns.Add(new DataColumn("sms_cDealer", typeof (string)));               
							 										
               //create Row  
               dr = dt.NewRow();
               
               //set Row
							 dr["Id"] = base.Id;

							 dr["Name"] = base.Name;
dr["sms_icodigo"] = this._sms_icodigo;
dr["sms_cdescripcion"] = this._sms_cdescripcion;
dr["sms_nport"] = this._sms_nport;
dr["sms_cseteo"] = this._sms_cseteo;
dr["sms_cinbox"] = this._sms_cinbox;
dr["sms_ndefault"] = this._sms_ndefault;
dr["sms_cterminal"] = this._sms_cterminal;
dr["sms_csource"] = this._sms_csource;
dr["sms_nEstado"] = this._sms_nEstado;
dr["sms_iGateway"] = this._sms_iGateway;
dr["sms_cDealer"] = this._sms_cDealer;
							 
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
