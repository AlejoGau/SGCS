
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
    public class Callert_codigos_alarma : CallerObject
    { 	
				     private string _cod_ccodigo;
					
				     private string _cod_cdescripcion;
					
				     private Decimal _cod_nalerta;
					
				     private Decimal _cod_nprioridad;
					
				     private int _cod_ntipo;
					
				     private Decimal _cod_nsistema;
					
				     private int _cod_ncolor;
					
				     private string _cod_cSonido;
					
				     private int _cod_nColorLetra;
					
				     private Decimal _cod_nResuelve;
					
				     private string _cod_cGrupo;
					
				     private Decimal _cod_nSms;
					
				     private Decimal _cod_nMail;
					
				     private Decimal _cod_nVideo;
					
				     private Decimal _cod_nManual;
					
				     private Decimal _cod_nMovil;
					
				     private Decimal _cod_nAutoridad;
					
				     private Decimal _cod_nLeeSonido;
					
				     private Decimal _cod_nMultiMonitor;
					
				     private string _cod_cinstrucciones_DSS;
					
				     private string _cod_cconfiguracion_DSS;
					
				     private Decimal _cod_nWebCliente;
					
				     private string _cod_cAlarmaAutoprocesa;
					
				     private int _cod_iTemplate;
				 ///<summary>
     ///cod_ccodigo property   
     ///</summary>   
     public string cod_ccodigo 
		 { 
		        
                    get{ return this._cod_ccodigo; }
        						set{ this._cod_ccodigo = value; } 										
	   }
	  ///<summary>
     ///cod_cdescripcion property   
     ///</summary>   
     public string cod_cdescripcion 
		 { 
		        
                    get{ return this._cod_cdescripcion; }
        						set{ this._cod_cdescripcion = value; } 										
	   }
	  ///<summary>
     ///cod_nalerta property   
     ///</summary>   
     public Decimal cod_nalerta 
		 { 
		        
                    get{ return this._cod_nalerta; }
        						set{ this._cod_nalerta = value; } 										
	   }
	  ///<summary>
     ///cod_nprioridad property   
     ///</summary>   
     public Decimal cod_nprioridad 
		 { 
		        
                    get{ return this._cod_nprioridad; }
        						set{ this._cod_nprioridad = value; } 										
	   }
	  ///<summary>
     ///cod_ntipo property   
     ///</summary>   
     public int cod_ntipo 
		 { 
		        
                    get{ return this._cod_ntipo; }
        						set{ this._cod_ntipo = value; } 										
	   }
	  ///<summary>
     ///cod_nsistema property   
     ///</summary>   
     public Decimal cod_nsistema 
		 { 
		        
                    get{ return this._cod_nsistema; }
        						set{ this._cod_nsistema = value; } 										
	   }
	  ///<summary>
     ///cod_ncolor property   
     ///</summary>   
     public int cod_ncolor 
		 { 
		        
                    get{ return this._cod_ncolor; }
        						set{ this._cod_ncolor = value; } 										
	   }
	  ///<summary>
     ///cod_cSonido property   
     ///</summary>   
     public string cod_cSonido 
		 { 
		        
                    get{ return this._cod_cSonido; }
        						set{ this._cod_cSonido = value; } 										
	   }
	  ///<summary>
     ///cod_nColorLetra property   
     ///</summary>   
     public int cod_nColorLetra 
		 { 
		        
                    get{ return this._cod_nColorLetra; }
        						set{ this._cod_nColorLetra = value; } 										
	   }
	  ///<summary>
     ///cod_nResuelve property   
     ///</summary>   
     public Decimal cod_nResuelve 
		 { 
		        
                    get{ return this._cod_nResuelve; }
        						set{ this._cod_nResuelve = value; } 										
	   }
	  ///<summary>
     ///cod_cGrupo property   
     ///</summary>   
     public string cod_cGrupo 
		 { 
		        
                    get{ return this._cod_cGrupo; }
        						set{ this._cod_cGrupo = value; } 										
	   }
	  ///<summary>
     ///cod_nSms property   
     ///</summary>   
     public Decimal cod_nSms 
		 { 
		        
                    get{ return this._cod_nSms; }
        						set{ this._cod_nSms = value; } 										
	   }
	  ///<summary>
     ///cod_nMail property   
     ///</summary>   
     public Decimal cod_nMail 
		 { 
		        
                    get{ return this._cod_nMail; }
        						set{ this._cod_nMail = value; } 										
	   }
	  ///<summary>
     ///cod_nVideo property   
     ///</summary>   
     public Decimal cod_nVideo 
		 { 
		        
                    get{ return this._cod_nVideo; }
        						set{ this._cod_nVideo = value; } 										
	   }
	  ///<summary>
     ///cod_nManual property   
     ///</summary>   
     public Decimal cod_nManual 
		 { 
		        
                    get{ return this._cod_nManual; }
        						set{ this._cod_nManual = value; } 										
	   }
	  ///<summary>
     ///cod_nMovil property   
     ///</summary>   
     public Decimal cod_nMovil 
		 { 
		        
                    get{ return this._cod_nMovil; }
        						set{ this._cod_nMovil = value; } 										
	   }
	  ///<summary>
     ///cod_nAutoridad property   
     ///</summary>   
     public Decimal cod_nAutoridad 
		 { 
		        
                    get{ return this._cod_nAutoridad; }
        						set{ this._cod_nAutoridad = value; } 										
	   }
	  ///<summary>
     ///cod_nLeeSonido property   
     ///</summary>   
     public Decimal cod_nLeeSonido 
		 { 
		        
                    get{ return this._cod_nLeeSonido; }
        						set{ this._cod_nLeeSonido = value; } 										
	   }
	  ///<summary>
     ///cod_nMultiMonitor property   
     ///</summary>   
     public Decimal cod_nMultiMonitor 
		 { 
		        
                    get{ return this._cod_nMultiMonitor; }
        						set{ this._cod_nMultiMonitor = value; } 										
	   }
	  ///<summary>
     ///cod_cinstrucciones_DSS property   
     ///</summary>   
     public string cod_cinstrucciones_DSS 
		 { 
		        
                    get{ return this._cod_cinstrucciones_DSS; }
        						set{ this._cod_cinstrucciones_DSS = value; } 										
	   }
	  ///<summary>
     ///cod_cconfiguracion_DSS property   
     ///</summary>   
     public string cod_cconfiguracion_DSS 
		 { 
		        
                    get{ return this._cod_cconfiguracion_DSS; }
        						set{ this._cod_cconfiguracion_DSS = value; } 										
	   }
	  ///<summary>
     ///cod_nWebCliente property   
     ///</summary>   
     public Decimal cod_nWebCliente 
		 { 
		        
                    get{ return this._cod_nWebCliente; }
        						set{ this._cod_nWebCliente = value; } 										
	   }
	  ///<summary>
     ///cod_cAlarmaAutoprocesa property   
     ///</summary>   
     public string cod_cAlarmaAutoprocesa 
		 { 
		        
                    get{ return this._cod_cAlarmaAutoprocesa; }
        						set{ this._cod_cAlarmaAutoprocesa = value; } 										
	   }
	  ///<summary>
     ///cod_iTemplate property   
     ///</summary>   
     public int cod_iTemplate 
		 { 
		        
                    get{ return this._cod_iTemplate; }
        						set{ this._cod_iTemplate = value; } 										
	   }
	  ///<summary>
     ///Constructor   
     ///</summary>
        public Callert_codigos_alarma() : base()
        {
            InitClass();
        }  
 ///<summary>
     ///Constructor   
     ///</summary>		
        public Callert_codigos_alarma(int Id, string Name, string cod_ccodigo, string cod_cdescripcion, Decimal cod_nalerta, Decimal cod_nprioridad, int cod_ntipo, Decimal cod_nsistema, int cod_ncolor, string cod_cSonido, int cod_nColorLetra, Decimal cod_nResuelve, string cod_cGrupo, Decimal cod_nSms, Decimal cod_nMail, Decimal cod_nVideo, Decimal cod_nManual, Decimal cod_nMovil, Decimal cod_nAutoridad, Decimal cod_nLeeSonido, Decimal cod_nMultiMonitor, string cod_cinstrucciones_DSS, string cod_cconfiguracion_DSS, Decimal cod_nWebCliente, string cod_cAlarmaAutoprocesa, int cod_iTemplate) : base()
        {
            base.Id = Id;
						base.Name = Name;				 																																					 
				    this._cod_ccodigo = cod_ccodigo;
this._cod_cdescripcion = cod_cdescripcion;
this._cod_nalerta = cod_nalerta;
this._cod_nprioridad = cod_nprioridad;
this._cod_ntipo = cod_ntipo;
this._cod_nsistema = cod_nsistema;
this._cod_ncolor = cod_ncolor;
this._cod_cSonido = cod_cSonido;
this._cod_nColorLetra = cod_nColorLetra;
this._cod_nResuelve = cod_nResuelve;
this._cod_cGrupo = cod_cGrupo;
this._cod_nSms = cod_nSms;
this._cod_nMail = cod_nMail;
this._cod_nVideo = cod_nVideo;
this._cod_nManual = cod_nManual;
this._cod_nMovil = cod_nMovil;
this._cod_nAutoridad = cod_nAutoridad;
this._cod_nLeeSonido = cod_nLeeSonido;
this._cod_nMultiMonitor = cod_nMultiMonitor;
this._cod_cinstrucciones_DSS = cod_cinstrucciones_DSS;
this._cod_cconfiguracion_DSS = cod_cconfiguracion_DSS;
this._cod_nWebCliente = cod_nWebCliente;
this._cod_cAlarmaAutoprocesa = cod_cAlarmaAutoprocesa;
this._cod_iTemplate = cod_iTemplate;

            InitClass();
        }  								

				private void InitClass()
        {														
  				  base.Type = new ObjectType(3089, "t_codigos_alarma");
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
			Simplet_codigos_alarma Simple = new Simplet_codigos_alarma();
			Simple.Id = base.Id;
			Simple.Name = base.Name;
			Simple.cod_ccodigo = this._cod_ccodigo;
Simple.cod_cdescripcion = this._cod_cdescripcion;
Simple.cod_nalerta = this._cod_nalerta;
Simple.cod_nprioridad = this._cod_nprioridad;
Simple.cod_ntipo = this._cod_ntipo;
Simple.cod_nsistema = this._cod_nsistema;
Simple.cod_ncolor = this._cod_ncolor;
Simple.cod_cSonido = this._cod_cSonido;
Simple.cod_nColorLetra = this._cod_nColorLetra;
Simple.cod_nResuelve = this._cod_nResuelve;
Simple.cod_cGrupo = this._cod_cGrupo;
Simple.cod_nSms = this._cod_nSms;
Simple.cod_nMail = this._cod_nMail;
Simple.cod_nVideo = this._cod_nVideo;
Simple.cod_nManual = this._cod_nManual;
Simple.cod_nMovil = this._cod_nMovil;
Simple.cod_nAutoridad = this._cod_nAutoridad;
Simple.cod_nLeeSonido = this._cod_nLeeSonido;
Simple.cod_nMultiMonitor = this._cod_nMultiMonitor;
Simple.cod_cinstrucciones_DSS = this._cod_cinstrucciones_DSS;
Simple.cod_cconfiguracion_DSS = this._cod_cconfiguracion_DSS;
Simple.cod_nWebCliente = this._cod_nWebCliente;
Simple.cod_cAlarmaAutoprocesa = this._cod_cAlarmaAutoprocesa;
Simple.cod_iTemplate = this._cod_iTemplate;

			return (SimpleBaseObject) Simple;
		}
 ///<summary>
     ///Sets a simpleobject   
     ///</summary>	
		public void SetSimpleObject(Simplet_codigos_alarma Simple)
		{
			base.Id = Simple.Id;
			base.Name = Simple.Name;
			this._cod_ccodigo = Simple.cod_ccodigo;
this._cod_cdescripcion = Simple.cod_cdescripcion;
this._cod_nalerta = Simple.cod_nalerta;
this._cod_nprioridad = Simple.cod_nprioridad;
this._cod_ntipo = Simple.cod_ntipo;
this._cod_nsistema = Simple.cod_nsistema;
this._cod_ncolor = Simple.cod_ncolor;
this._cod_cSonido = Simple.cod_cSonido;
this._cod_nColorLetra = Simple.cod_nColorLetra;
this._cod_nResuelve = Simple.cod_nResuelve;
this._cod_cGrupo = Simple.cod_cGrupo;
this._cod_nSms = Simple.cod_nSms;
this._cod_nMail = Simple.cod_nMail;
this._cod_nVideo = Simple.cod_nVideo;
this._cod_nManual = Simple.cod_nManual;
this._cod_nMovil = Simple.cod_nMovil;
this._cod_nAutoridad = Simple.cod_nAutoridad;
this._cod_nLeeSonido = Simple.cod_nLeeSonido;
this._cod_nMultiMonitor = Simple.cod_nMultiMonitor;
this._cod_cinstrucciones_DSS = Simple.cod_cinstrucciones_DSS;
this._cod_cconfiguracion_DSS = Simple.cod_cconfiguracion_DSS;
this._cod_nWebCliente = Simple.cod_nWebCliente;
this._cod_cAlarmaAutoprocesa = Simple.cod_cAlarmaAutoprocesa;
this._cod_iTemplate = Simple.cod_iTemplate;

		}
 ///<summary>
     ///Gets a baseobject   
     ///</summary>
		public override BaseObject GetBaseObject(SqlHelper SqlConfig, int UserId)
		{
			return new Dalt_codigos_alarma(SqlConfig, UserId, (Simplet_codigos_alarma) GetSimpleObject());
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
               dt.Columns.Add(new DataColumn("cod_ccodigo", typeof (string)));               
							 dt.Columns.Add(new DataColumn("cod_cdescripcion", typeof (string)));               
							 dt.Columns.Add(new DataColumn("cod_nalerta", typeof (Decimal)));               
							 dt.Columns.Add(new DataColumn("cod_nprioridad", typeof (Decimal)));               
							 dt.Columns.Add(new DataColumn("cod_ntipo", typeof (int)));               
							 dt.Columns.Add(new DataColumn("cod_nsistema", typeof (Decimal)));               
							 dt.Columns.Add(new DataColumn("cod_ncolor", typeof (int)));               
							 dt.Columns.Add(new DataColumn("cod_cSonido", typeof (string)));               
							 dt.Columns.Add(new DataColumn("cod_nColorLetra", typeof (int)));               
							 dt.Columns.Add(new DataColumn("cod_nResuelve", typeof (Decimal)));               
							 dt.Columns.Add(new DataColumn("cod_cGrupo", typeof (string)));               
							 dt.Columns.Add(new DataColumn("cod_nSms", typeof (Decimal)));               
							 dt.Columns.Add(new DataColumn("cod_nMail", typeof (Decimal)));               
							 dt.Columns.Add(new DataColumn("cod_nVideo", typeof (Decimal)));               
							 dt.Columns.Add(new DataColumn("cod_nManual", typeof (Decimal)));               
							 dt.Columns.Add(new DataColumn("cod_nMovil", typeof (Decimal)));               
							 dt.Columns.Add(new DataColumn("cod_nAutoridad", typeof (Decimal)));               
							 dt.Columns.Add(new DataColumn("cod_nLeeSonido", typeof (Decimal)));               
							 dt.Columns.Add(new DataColumn("cod_nMultiMonitor", typeof (Decimal)));               
							 dt.Columns.Add(new DataColumn("cod_cinstrucciones_DSS", typeof (string)));               
							 dt.Columns.Add(new DataColumn("cod_cconfiguracion_DSS", typeof (string)));               
							 dt.Columns.Add(new DataColumn("cod_nWebCliente", typeof (Decimal)));               
							 dt.Columns.Add(new DataColumn("cod_cAlarmaAutoprocesa", typeof (string)));               
							 dt.Columns.Add(new DataColumn("cod_iTemplate", typeof (int)));               
							 										
               //create Row  
               dr = dt.NewRow();
               
               //set Row
							 dr["Id"] = base.Id;

							 dr["Name"] = base.Name;
dr["cod_ccodigo"] = this._cod_ccodigo;
dr["cod_cdescripcion"] = this._cod_cdescripcion;
dr["cod_nalerta"] = this._cod_nalerta;
dr["cod_nprioridad"] = this._cod_nprioridad;
dr["cod_ntipo"] = this._cod_ntipo;
dr["cod_nsistema"] = this._cod_nsistema;
dr["cod_ncolor"] = this._cod_ncolor;
dr["cod_cSonido"] = this._cod_cSonido;
dr["cod_nColorLetra"] = this._cod_nColorLetra;
dr["cod_nResuelve"] = this._cod_nResuelve;
dr["cod_cGrupo"] = this._cod_cGrupo;
dr["cod_nSms"] = this._cod_nSms;
dr["cod_nMail"] = this._cod_nMail;
dr["cod_nVideo"] = this._cod_nVideo;
dr["cod_nManual"] = this._cod_nManual;
dr["cod_nMovil"] = this._cod_nMovil;
dr["cod_nAutoridad"] = this._cod_nAutoridad;
dr["cod_nLeeSonido"] = this._cod_nLeeSonido;
dr["cod_nMultiMonitor"] = this._cod_nMultiMonitor;
dr["cod_cinstrucciones_DSS"] = this._cod_cinstrucciones_DSS;
dr["cod_cconfiguracion_DSS"] = this._cod_cconfiguracion_DSS;
dr["cod_nWebCliente"] = this._cod_nWebCliente;
dr["cod_cAlarmaAutoprocesa"] = this._cod_cAlarmaAutoprocesa;
dr["cod_iTemplate"] = this._cod_iTemplate;
							 
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
