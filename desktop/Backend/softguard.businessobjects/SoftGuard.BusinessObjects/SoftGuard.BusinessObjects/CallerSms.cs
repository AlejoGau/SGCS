
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
    public class CallerSms : CallerObject
    { 	
				     private int _sms_iidcuenta;
					
				     private string _sms_meventos;
					
				     private string _sms_csmsparaeventos;
					
				     private int _sms_imodemsms;
					
				     private string _sms_cplantillasms;
					
				     private string _sms_cmailparaeventos;
					
				     private string _sms_cplantillamail;
					
				     private int _sms_inotificaralertas;
					
				     private string _sms_cplantillapush;
					
				     private string _sms_cidspushsmartpanic;
					
				     private string _sms_cDescripcion;
					
				     private int _sms_iGrupoAlarmas;
					
				     private string _sms_czona;
					
				     private int _sms_iEventosSP;
					
				     private string _sms_cSonido;
				 ///<summary>
     ///sms_iidcuenta property   
     ///</summary>   
     public int sms_iidcuenta 
		 { 
		        
                    get{ return this._sms_iidcuenta; }
        						set{ this._sms_iidcuenta = value; } 										
	   }
	  ///<summary>
     ///sms_meventos property   
     ///</summary>   
     public string sms_meventos 
		 { 
		        
                    get{ return this._sms_meventos; }
        						set{ this._sms_meventos = value; } 										
	   }
	  ///<summary>
     ///sms_csmsparaeventos property   
     ///</summary>   
     public string sms_csmsparaeventos 
		 { 
		        
                    get{ return this._sms_csmsparaeventos; }
        						set{ this._sms_csmsparaeventos = value; } 										
	   }
	  ///<summary>
     ///sms_imodemsms property   
     ///</summary>   
     public int sms_imodemsms 
		 { 
		        
                    get{ return this._sms_imodemsms; }
        						set{ this._sms_imodemsms = value; } 										
	   }
	  ///<summary>
     ///sms_cplantillasms property   
     ///</summary>   
     public string sms_cplantillasms 
		 { 
		        
                    get{ return this._sms_cplantillasms; }
        						set{ this._sms_cplantillasms = value; } 										
	   }
	  ///<summary>
     ///sms_cmailparaeventos property   
     ///</summary>   
     public string sms_cmailparaeventos 
		 { 
		        
                    get{ return this._sms_cmailparaeventos; }
        						set{ this._sms_cmailparaeventos = value; } 										
	   }
	  ///<summary>
     ///sms_cplantillamail property   
     ///</summary>   
     public string sms_cplantillamail 
		 { 
		        
                    get{ return this._sms_cplantillamail; }
        						set{ this._sms_cplantillamail = value; } 										
	   }
	  ///<summary>
     ///sms_inotificaralertas property   
     ///</summary>   
     public int sms_inotificaralertas 
		 { 
		        
                    get{ return this._sms_inotificaralertas; }
        						set{ this._sms_inotificaralertas = value; } 										
	   }
	  ///<summary>
     ///sms_cplantillapush property   
     ///</summary>   
     public string sms_cplantillapush 
		 { 
		        
                    get{ return this._sms_cplantillapush; }
        						set{ this._sms_cplantillapush = value; } 										
	   }
	  ///<summary>
     ///sms_cidspushsmartpanic property   
     ///</summary>   
     public string sms_cidspushsmartpanic 
		 { 
		        
                    get{ return this._sms_cidspushsmartpanic; }
        						set{ this._sms_cidspushsmartpanic = value; } 										
	   }
	  ///<summary>
     ///sms_cDescripcion property   
     ///</summary>   
     public string sms_cDescripcion 
		 { 
		        
                    get{ return this._sms_cDescripcion; }
        						set{ this._sms_cDescripcion = value; } 										
	   }
	  ///<summary>
     ///sms_iGrupoAlarmas property   
     ///</summary>   
     public int sms_iGrupoAlarmas 
		 { 
		        
                    get{ return this._sms_iGrupoAlarmas; }
        						set{ this._sms_iGrupoAlarmas = value; } 										
	   }
	  ///<summary>
     ///sms_czona property   
     ///</summary>   
     public string sms_czona 
		 { 
		        
                    get{ return this._sms_czona; }
        						set{ this._sms_czona = value; } 										
	   }
	  ///<summary>
     ///sms_iEventosSP property   
     ///</summary>   
     public int sms_iEventosSP 
		 { 
		        
                    get{ return this._sms_iEventosSP; }
        						set{ this._sms_iEventosSP = value; } 										
	   }
	  ///<summary>
     ///sms_cSonido property   
     ///</summary>   
     public string sms_cSonido 
		 { 
		        
                    get{ return this._sms_cSonido; }
        						set{ this._sms_cSonido = value; } 										
	   }
	  ///<summary>
     ///Constructor   
     ///</summary>
        public CallerSms() : base()
        {
            InitClass();
        }  
 ///<summary>
     ///Constructor   
     ///</summary>		
        public CallerSms(int Id, string Name, int sms_iidcuenta, string sms_meventos, string sms_csmsparaeventos, int sms_imodemsms, string sms_cplantillasms, string sms_cmailparaeventos, string sms_cplantillamail, int sms_inotificaralertas, string sms_cplantillapush, string sms_cidspushsmartpanic, string sms_cDescripcion, int sms_iGrupoAlarmas, string sms_czona, int sms_iEventosSP, string sms_cSonido) : base()
        {
            base.Id = Id;
						base.Name = Name;				 																																					 
				    this._sms_iidcuenta = sms_iidcuenta;
this._sms_meventos = sms_meventos;
this._sms_csmsparaeventos = sms_csmsparaeventos;
this._sms_imodemsms = sms_imodemsms;
this._sms_cplantillasms = sms_cplantillasms;
this._sms_cmailparaeventos = sms_cmailparaeventos;
this._sms_cplantillamail = sms_cplantillamail;
this._sms_inotificaralertas = sms_inotificaralertas;
this._sms_cplantillapush = sms_cplantillapush;
this._sms_cidspushsmartpanic = sms_cidspushsmartpanic;
this._sms_cDescripcion = sms_cDescripcion;
this._sms_iGrupoAlarmas = sms_iGrupoAlarmas;
this._sms_czona = sms_czona;
this._sms_iEventosSP = sms_iEventosSP;
this._sms_cSonido = sms_cSonido;

            InitClass();
        }  								

				private void InitClass()
        {														
  				  base.Type = new ObjectType(3020, "Sms");
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
			SimpleSms Simple = new SimpleSms();
			Simple.Id = base.Id;
			Simple.Name = base.Name;
			Simple.sms_iidcuenta = this._sms_iidcuenta;
Simple.sms_meventos = this._sms_meventos;
Simple.sms_csmsparaeventos = this._sms_csmsparaeventos;
Simple.sms_imodemsms = this._sms_imodemsms;
Simple.sms_cplantillasms = this._sms_cplantillasms;
Simple.sms_cmailparaeventos = this._sms_cmailparaeventos;
Simple.sms_cplantillamail = this._sms_cplantillamail;
Simple.sms_inotificaralertas = this._sms_inotificaralertas;
Simple.sms_cplantillapush = this._sms_cplantillapush;
Simple.sms_cidspushsmartpanic = this._sms_cidspushsmartpanic;
Simple.sms_cDescripcion = this._sms_cDescripcion;
Simple.sms_iGrupoAlarmas = this._sms_iGrupoAlarmas;
Simple.sms_czona = this._sms_czona;
Simple.sms_iEventosSP = this._sms_iEventosSP;
Simple.sms_cSonido = this._sms_cSonido;

			return (SimpleBaseObject) Simple;
		}
 ///<summary>
     ///Sets a simpleobject   
     ///</summary>	
		public void SetSimpleObject(SimpleSms Simple)
		{
			base.Id = Simple.Id;
			base.Name = Simple.Name;
			this._sms_iidcuenta = Simple.sms_iidcuenta;
this._sms_meventos = Simple.sms_meventos;
this._sms_csmsparaeventos = Simple.sms_csmsparaeventos;
this._sms_imodemsms = Simple.sms_imodemsms;
this._sms_cplantillasms = Simple.sms_cplantillasms;
this._sms_cmailparaeventos = Simple.sms_cmailparaeventos;
this._sms_cplantillamail = Simple.sms_cplantillamail;
this._sms_inotificaralertas = Simple.sms_inotificaralertas;
this._sms_cplantillapush = Simple.sms_cplantillapush;
this._sms_cidspushsmartpanic = Simple.sms_cidspushsmartpanic;
this._sms_cDescripcion = Simple.sms_cDescripcion;
this._sms_iGrupoAlarmas = Simple.sms_iGrupoAlarmas;
this._sms_czona = Simple.sms_czona;
this._sms_iEventosSP = Simple.sms_iEventosSP;
this._sms_cSonido = Simple.sms_cSonido;

		}
 ///<summary>
     ///Gets a baseobject   
     ///</summary>
		public override BaseObject GetBaseObject(SqlHelper SqlConfig, int UserId)
		{
			return new DalSms(SqlConfig, UserId, (SimpleSms) GetSimpleObject());
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
               dt.Columns.Add(new DataColumn("sms_iidcuenta", typeof (int)));               
							 dt.Columns.Add(new DataColumn("sms_meventos", typeof (string)));               
							 dt.Columns.Add(new DataColumn("sms_csmsparaeventos", typeof (string)));               
							 dt.Columns.Add(new DataColumn("sms_imodemsms", typeof (int)));               
							 dt.Columns.Add(new DataColumn("sms_cplantillasms", typeof (string)));               
							 dt.Columns.Add(new DataColumn("sms_cmailparaeventos", typeof (string)));               
							 dt.Columns.Add(new DataColumn("sms_cplantillamail", typeof (string)));               
							 dt.Columns.Add(new DataColumn("sms_inotificaralertas", typeof (int)));               
							 dt.Columns.Add(new DataColumn("sms_cplantillapush", typeof (string)));               
							 dt.Columns.Add(new DataColumn("sms_cidspushsmartpanic", typeof (string)));               
							 dt.Columns.Add(new DataColumn("sms_cDescripcion", typeof (string)));               
							 dt.Columns.Add(new DataColumn("sms_iGrupoAlarmas", typeof (int)));               
							 dt.Columns.Add(new DataColumn("sms_czona", typeof (string)));               
							 dt.Columns.Add(new DataColumn("sms_iEventosSP", typeof (int)));               
							 dt.Columns.Add(new DataColumn("sms_cSonido", typeof (string)));               
							 										
               //create Row  
               dr = dt.NewRow();
               
               //set Row
							 dr["Id"] = base.Id;

							 dr["Name"] = base.Name;
dr["sms_iidcuenta"] = this._sms_iidcuenta;
dr["sms_meventos"] = this._sms_meventos;
dr["sms_csmsparaeventos"] = this._sms_csmsparaeventos;
dr["sms_imodemsms"] = this._sms_imodemsms;
dr["sms_cplantillasms"] = this._sms_cplantillasms;
dr["sms_cmailparaeventos"] = this._sms_cmailparaeventos;
dr["sms_cplantillamail"] = this._sms_cplantillamail;
dr["sms_inotificaralertas"] = this._sms_inotificaralertas;
dr["sms_cplantillapush"] = this._sms_cplantillapush;
dr["sms_cidspushsmartpanic"] = this._sms_cidspushsmartpanic;
dr["sms_cDescripcion"] = this._sms_cDescripcion;
dr["sms_iGrupoAlarmas"] = this._sms_iGrupoAlarmas;
dr["sms_czona"] = this._sms_czona;
dr["sms_iEventosSP"] = this._sms_iEventosSP;
dr["sms_cSonido"] = this._sms_cSonido;
							 
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
