
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
    public class CallerZonaPlanilla : CallerObject
    { 	
				     private int _zon_iid;
					
				     private string _zon_ccodigo;
					
				     private string _zon_cdescripcion;
					
				     private string _zon_codigoalarma;
					
				     private string _zon_clistaemergencia;
					
				     private string _zon_cimagen;
					
				     private string _zon_mobservacion;
					
				     private string _zon_ccodigorestauracion;
					
				     private Decimal _zon_nminutosrestauracion;
					
				     private Decimal _zon_nmostrar;
					
				     private string _zon_cdealer;
					
				     private string _zon_ccuenta;
					
				     private Decimal _zon_nautoprocesa;
					
				     private string _zon_calarmaagenerar;
				 ///<summary>
     ///zon_iid property   
     ///</summary>   
     public int zon_iid 
		 { 
		        
                    get{ return this._zon_iid; }
        						set{ this._zon_iid = value; } 										
	   }
	  ///<summary>
     ///zon_ccodigo property   
     ///</summary>   
     public string zon_ccodigo 
		 { 
		        
                    get{ return this._zon_ccodigo; }
        						set{ this._zon_ccodigo = value; } 										
	   }
	  ///<summary>
     ///zon_cdescripcion property   
     ///</summary>   
     public string zon_cdescripcion 
		 { 
		        
                    get{ return this._zon_cdescripcion; }
        						set{ this._zon_cdescripcion = value; } 										
	   }
	  ///<summary>
     ///zon_codigoalarma property   
     ///</summary>   
     public string zon_codigoalarma 
		 { 
		        
                    get{ return this._zon_codigoalarma; }
        						set{ this._zon_codigoalarma = value; } 										
	   }
	  ///<summary>
     ///zon_clistaemergencia property   
     ///</summary>   
     public string zon_clistaemergencia 
		 { 
		        
                    get{ return this._zon_clistaemergencia; }
        						set{ this._zon_clistaemergencia = value; } 										
	   }
	  ///<summary>
     ///zon_cimagen property   
     ///</summary>   
     public string zon_cimagen 
		 { 
		        
                    get{ return this._zon_cimagen; }
        						set{ this._zon_cimagen = value; } 										
	   }
	  ///<summary>
     ///zon_mobservacion property   
     ///</summary>   
     public string zon_mobservacion 
		 { 
		        
                    get{ return this._zon_mobservacion; }
        						set{ this._zon_mobservacion = value; } 										
	   }
	  ///<summary>
     ///zon_ccodigorestauracion property   
     ///</summary>   
     public string zon_ccodigorestauracion 
		 { 
		        
                    get{ return this._zon_ccodigorestauracion; }
        						set{ this._zon_ccodigorestauracion = value; } 										
	   }
	  ///<summary>
     ///zon_nminutosrestauracion property   
     ///</summary>   
     public Decimal zon_nminutosrestauracion 
		 { 
		        
                    get{ return this._zon_nminutosrestauracion; }
        						set{ this._zon_nminutosrestauracion = value; } 										
	   }
	  ///<summary>
     ///zon_nmostrar property   
     ///</summary>   
     public Decimal zon_nmostrar 
		 { 
		        
                    get{ return this._zon_nmostrar; }
        						set{ this._zon_nmostrar = value; } 										
	   }
	  ///<summary>
     ///zon_cdealer property   
     ///</summary>   
     public string zon_cdealer 
		 { 
		        
                    get{ return this._zon_cdealer; }
        						set{ this._zon_cdealer = value; } 										
	   }
	  ///<summary>
     ///zon_ccuenta property   
     ///</summary>   
     public string zon_ccuenta 
		 { 
		        
                    get{ return this._zon_ccuenta; }
        						set{ this._zon_ccuenta = value; } 										
	   }
	  ///<summary>
     ///zon_nautoprocesa property   
     ///</summary>   
     public Decimal zon_nautoprocesa 
		 { 
		        
                    get{ return this._zon_nautoprocesa; }
        						set{ this._zon_nautoprocesa = value; } 										
	   }
	  ///<summary>
     ///zon_calarmaagenerar property   
     ///</summary>   
     public string zon_calarmaagenerar 
		 { 
		        
                    get{ return this._zon_calarmaagenerar; }
        						set{ this._zon_calarmaagenerar = value; } 										
	   }
	  ///<summary>
     ///Constructor   
     ///</summary>
        public CallerZonaPlanilla() : base()
        {
            InitClass();
        }  
 ///<summary>
     ///Constructor   
     ///</summary>		
        public CallerZonaPlanilla(int Id, string Name, int zon_iid, string zon_ccodigo, string zon_cdescripcion, string zon_codigoalarma, string zon_clistaemergencia, string zon_cimagen, string zon_mobservacion, string zon_ccodigorestauracion, Decimal zon_nminutosrestauracion, Decimal zon_nmostrar, string zon_cdealer, string zon_ccuenta, Decimal zon_nautoprocesa, string zon_calarmaagenerar) : base()
        {
            base.Id = Id;
						base.Name = Name;				 																																					 
				    this._zon_iid = zon_iid;
this._zon_ccodigo = zon_ccodigo;
this._zon_cdescripcion = zon_cdescripcion;
this._zon_codigoalarma = zon_codigoalarma;
this._zon_clistaemergencia = zon_clistaemergencia;
this._zon_cimagen = zon_cimagen;
this._zon_mobservacion = zon_mobservacion;
this._zon_ccodigorestauracion = zon_ccodigorestauracion;
this._zon_nminutosrestauracion = zon_nminutosrestauracion;
this._zon_nmostrar = zon_nmostrar;
this._zon_cdealer = zon_cdealer;
this._zon_ccuenta = zon_ccuenta;
this._zon_nautoprocesa = zon_nautoprocesa;
this._zon_calarmaagenerar = zon_calarmaagenerar;

            InitClass();
        }  								

				private void InitClass()
        {														
  				  base.Type = new ObjectType(3015, "ZonaPlanilla");
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
			SimpleZonaPlanilla Simple = new SimpleZonaPlanilla();
			Simple.Id = base.Id;
			Simple.Name = base.Name;
			Simple.zon_iid = this._zon_iid;
Simple.zon_ccodigo = this._zon_ccodigo;
Simple.zon_cdescripcion = this._zon_cdescripcion;
Simple.zon_codigoalarma = this._zon_codigoalarma;
Simple.zon_clistaemergencia = this._zon_clistaemergencia;
Simple.zon_cimagen = this._zon_cimagen;
Simple.zon_mobservacion = this._zon_mobservacion;
Simple.zon_ccodigorestauracion = this._zon_ccodigorestauracion;
Simple.zon_nminutosrestauracion = this._zon_nminutosrestauracion;
Simple.zon_nmostrar = this._zon_nmostrar;
Simple.zon_cdealer = this._zon_cdealer;
Simple.zon_ccuenta = this._zon_ccuenta;
Simple.zon_nautoprocesa = this._zon_nautoprocesa;
Simple.zon_calarmaagenerar = this._zon_calarmaagenerar;

			return (SimpleBaseObject) Simple;
		}
 ///<summary>
     ///Sets a simpleobject   
     ///</summary>	
		public void SetSimpleObject(SimpleZonaPlanilla Simple)
		{
			base.Id = Simple.Id;
			base.Name = Simple.Name;
			this._zon_iid = Simple.zon_iid;
this._zon_ccodigo = Simple.zon_ccodigo;
this._zon_cdescripcion = Simple.zon_cdescripcion;
this._zon_codigoalarma = Simple.zon_codigoalarma;
this._zon_clistaemergencia = Simple.zon_clistaemergencia;
this._zon_cimagen = Simple.zon_cimagen;
this._zon_mobservacion = Simple.zon_mobservacion;
this._zon_ccodigorestauracion = Simple.zon_ccodigorestauracion;
this._zon_nminutosrestauracion = Simple.zon_nminutosrestauracion;
this._zon_nmostrar = Simple.zon_nmostrar;
this._zon_cdealer = Simple.zon_cdealer;
this._zon_ccuenta = Simple.zon_ccuenta;
this._zon_nautoprocesa = Simple.zon_nautoprocesa;
this._zon_calarmaagenerar = Simple.zon_calarmaagenerar;

		}
 ///<summary>
     ///Gets a baseobject   
     ///</summary>
		public override BaseObject GetBaseObject(SqlHelper SqlConfig, int UserId)
		{
			return new DalZonaPlanilla(SqlConfig, UserId, (SimpleZonaPlanilla) GetSimpleObject());
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
               dt.Columns.Add(new DataColumn("zon_iid", typeof (int)));               
							 dt.Columns.Add(new DataColumn("zon_ccodigo", typeof (string)));               
							 dt.Columns.Add(new DataColumn("zon_cdescripcion", typeof (string)));               
							 dt.Columns.Add(new DataColumn("zon_codigoalarma", typeof (string)));               
							 dt.Columns.Add(new DataColumn("zon_clistaemergencia", typeof (string)));               
							 dt.Columns.Add(new DataColumn("zon_cimagen", typeof (string)));               
							 dt.Columns.Add(new DataColumn("zon_mobservacion", typeof (string)));               
							 dt.Columns.Add(new DataColumn("zon_ccodigorestauracion", typeof (string)));               
							 dt.Columns.Add(new DataColumn("zon_nminutosrestauracion", typeof (Decimal)));               
							 dt.Columns.Add(new DataColumn("zon_nmostrar", typeof (Decimal)));               
							 dt.Columns.Add(new DataColumn("zon_cdealer", typeof (string)));               
							 dt.Columns.Add(new DataColumn("zon_ccuenta", typeof (string)));               
							 dt.Columns.Add(new DataColumn("zon_nautoprocesa", typeof (Decimal)));               
							 dt.Columns.Add(new DataColumn("zon_calarmaagenerar", typeof (string)));               
							 										
               //create Row  
               dr = dt.NewRow();
               
               //set Row
							 dr["Id"] = base.Id;

							 dr["Name"] = base.Name;
dr["zon_iid"] = this._zon_iid;
dr["zon_ccodigo"] = this._zon_ccodigo;
dr["zon_cdescripcion"] = this._zon_cdescripcion;
dr["zon_codigoalarma"] = this._zon_codigoalarma;
dr["zon_clistaemergencia"] = this._zon_clistaemergencia;
dr["zon_cimagen"] = this._zon_cimagen;
dr["zon_mobservacion"] = this._zon_mobservacion;
dr["zon_ccodigorestauracion"] = this._zon_ccodigorestauracion;
dr["zon_nminutosrestauracion"] = this._zon_nminutosrestauracion;
dr["zon_nmostrar"] = this._zon_nmostrar;
dr["zon_cdealer"] = this._zon_cdealer;
dr["zon_ccuenta"] = this._zon_ccuenta;
dr["zon_nautoprocesa"] = this._zon_nautoprocesa;
dr["zon_calarmaagenerar"] = this._zon_calarmaagenerar;
							 
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
