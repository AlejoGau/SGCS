
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
    public class Callert_comprobantes_fc : CallerObject
    { 	
				     private string _cbt_ccodigo;
					
				     private string _cbt_cdescripcion;
					
				     private string _cbt_cdescripcionreducida;
					
				     private int _cbt_ntipo;
					
				     private string _cbt_cletra;
					
				     private string _cbt_cprefijo;
					
				     private int _cbt_inumero;
					
				     private int _cbt_ncopias;
					
				     private string _cbt_casociado;
					
				     private int _cbt_nCbteCAE;
					
				     private int _cbt_idOrganizacionFacturadora;
				 ///<summary>
     ///cbt_ccodigo property   
     ///</summary>   
     public string cbt_ccodigo 
		 { 
		        
                    get{ return this._cbt_ccodigo; }
        						set{ this._cbt_ccodigo = value; } 										
	   }
	  ///<summary>
     ///cbt_cdescripcion property   
     ///</summary>   
     public string cbt_cdescripcion 
		 { 
		        
                    get{ return this._cbt_cdescripcion; }
        						set{ this._cbt_cdescripcion = value; } 										
	   }
	  ///<summary>
     ///cbt_cdescripcionreducida property   
     ///</summary>   
     public string cbt_cdescripcionreducida 
		 { 
		        
                    get{ return this._cbt_cdescripcionreducida; }
        						set{ this._cbt_cdescripcionreducida = value; } 										
	   }
	  ///<summary>
     ///cbt_ntipo property   
     ///</summary>   
     public int cbt_ntipo 
		 { 
		        
                    get{ return this._cbt_ntipo; }
        						set{ this._cbt_ntipo = value; } 										
	   }
	  ///<summary>
     ///cbt_cletra property   
     ///</summary>   
     public string cbt_cletra 
		 { 
		        
                    get{ return this._cbt_cletra; }
        						set{ this._cbt_cletra = value; } 										
	   }
	  ///<summary>
     ///cbt_cprefijo property   
     ///</summary>   
     public string cbt_cprefijo 
		 { 
		        
                    get{ return this._cbt_cprefijo; }
        						set{ this._cbt_cprefijo = value; } 										
	   }
	  ///<summary>
     ///cbt_inumero property   
     ///</summary>   
     public int cbt_inumero 
		 { 
		        
                    get{ return this._cbt_inumero; }
        						set{ this._cbt_inumero = value; } 										
	   }
	  ///<summary>
     ///cbt_ncopias property   
     ///</summary>   
     public int cbt_ncopias 
		 { 
		        
                    get{ return this._cbt_ncopias; }
        						set{ this._cbt_ncopias = value; } 										
	   }
	  ///<summary>
     ///cbt_casociado property   
     ///</summary>   
     public string cbt_casociado 
		 { 
		        
                    get{ return this._cbt_casociado; }
        						set{ this._cbt_casociado = value; } 										
	   }
	  ///<summary>
     ///cbt_nCbteCAE property   
     ///</summary>   
     public int cbt_nCbteCAE 
		 { 
		        
                    get{ return this._cbt_nCbteCAE; }
        						set{ this._cbt_nCbteCAE = value; } 										
	   }
	  ///<summary>
     ///cbt_idOrganizacionFacturadora property   
     ///</summary>   
     public int cbt_idOrganizacionFacturadora 
		 { 
		        
                    get{ return this._cbt_idOrganizacionFacturadora; }
        						set{ this._cbt_idOrganizacionFacturadora = value; } 										
	   }
	  ///<summary>
     ///Constructor   
     ///</summary>
        public Callert_comprobantes_fc() : base()
        {
            InitClass();
        }  
 ///<summary>
     ///Constructor   
     ///</summary>		
        public Callert_comprobantes_fc(int Id, string Name, string cbt_ccodigo, string cbt_cdescripcion, string cbt_cdescripcionreducida, int cbt_ntipo, string cbt_cletra, string cbt_cprefijo, int cbt_inumero, int cbt_ncopias, string cbt_casociado, int cbt_nCbteCAE, int cbt_idOrganizacionFacturadora) : base()
        {
            base.Id = Id;
						base.Name = Name;				 																																					 
				    this._cbt_ccodigo = cbt_ccodigo;
this._cbt_cdescripcion = cbt_cdescripcion;
this._cbt_cdescripcionreducida = cbt_cdescripcionreducida;
this._cbt_ntipo = cbt_ntipo;
this._cbt_cletra = cbt_cletra;
this._cbt_cprefijo = cbt_cprefijo;
this._cbt_inumero = cbt_inumero;
this._cbt_ncopias = cbt_ncopias;
this._cbt_casociado = cbt_casociado;
this._cbt_nCbteCAE = cbt_nCbteCAE;
this._cbt_idOrganizacionFacturadora = cbt_idOrganizacionFacturadora;

            InitClass();
        }  								

				private void InitClass()
        {														
  				  base.Type = new ObjectType(3183, "t_comprobantes_fc");
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
			Simplet_comprobantes_fc Simple = new Simplet_comprobantes_fc();
			Simple.Id = base.Id;
			Simple.Name = base.Name;
			Simple.cbt_ccodigo = this._cbt_ccodigo;
Simple.cbt_cdescripcion = this._cbt_cdescripcion;
Simple.cbt_cdescripcionreducida = this._cbt_cdescripcionreducida;
Simple.cbt_ntipo = this._cbt_ntipo;
Simple.cbt_cletra = this._cbt_cletra;
Simple.cbt_cprefijo = this._cbt_cprefijo;
Simple.cbt_inumero = this._cbt_inumero;
Simple.cbt_ncopias = this._cbt_ncopias;
Simple.cbt_casociado = this._cbt_casociado;
Simple.cbt_nCbteCAE = this._cbt_nCbteCAE;
Simple.cbt_idOrganizacionFacturadora = this._cbt_idOrganizacionFacturadora;

			return (SimpleBaseObject) Simple;
		}
 ///<summary>
     ///Sets a simpleobject   
     ///</summary>	
		public void SetSimpleObject(Simplet_comprobantes_fc Simple)
		{
			base.Id = Simple.Id;
			base.Name = Simple.Name;
			this._cbt_ccodigo = Simple.cbt_ccodigo;
this._cbt_cdescripcion = Simple.cbt_cdescripcion;
this._cbt_cdescripcionreducida = Simple.cbt_cdescripcionreducida;
this._cbt_ntipo = Simple.cbt_ntipo;
this._cbt_cletra = Simple.cbt_cletra;
this._cbt_cprefijo = Simple.cbt_cprefijo;
this._cbt_inumero = Simple.cbt_inumero;
this._cbt_ncopias = Simple.cbt_ncopias;
this._cbt_casociado = Simple.cbt_casociado;
this._cbt_nCbteCAE = Simple.cbt_nCbteCAE;
this._cbt_idOrganizacionFacturadora = Simple.cbt_idOrganizacionFacturadora;

		}
 ///<summary>
     ///Gets a baseobject   
     ///</summary>
		public override BaseObject GetBaseObject(SqlHelper SqlConfig, int UserId)
		{
			return new Dalt_comprobantes_fc(SqlConfig, UserId, (Simplet_comprobantes_fc) GetSimpleObject());
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
               dt.Columns.Add(new DataColumn("cbt_ccodigo", typeof (string)));               
							 dt.Columns.Add(new DataColumn("cbt_cdescripcion", typeof (string)));               
							 dt.Columns.Add(new DataColumn("cbt_cdescripcionreducida", typeof (string)));               
							 dt.Columns.Add(new DataColumn("cbt_ntipo", typeof (int)));               
							 dt.Columns.Add(new DataColumn("cbt_cletra", typeof (string)));               
							 dt.Columns.Add(new DataColumn("cbt_cprefijo", typeof (string)));               
							 dt.Columns.Add(new DataColumn("cbt_inumero", typeof (int)));               
							 dt.Columns.Add(new DataColumn("cbt_ncopias", typeof (int)));               
							 dt.Columns.Add(new DataColumn("cbt_casociado", typeof (string)));               
							 dt.Columns.Add(new DataColumn("cbt_nCbteCAE", typeof (int)));               
							 dt.Columns.Add(new DataColumn("cbt_idOrganizacionFacturadora", typeof (int)));               
							 										
               //create Row  
               dr = dt.NewRow();
               
               //set Row
							 dr["Id"] = base.Id;

							 dr["Name"] = base.Name;
dr["cbt_ccodigo"] = this._cbt_ccodigo;
dr["cbt_cdescripcion"] = this._cbt_cdescripcion;
dr["cbt_cdescripcionreducida"] = this._cbt_cdescripcionreducida;
dr["cbt_ntipo"] = this._cbt_ntipo;
dr["cbt_cletra"] = this._cbt_cletra;
dr["cbt_cprefijo"] = this._cbt_cprefijo;
dr["cbt_inumero"] = this._cbt_inumero;
dr["cbt_ncopias"] = this._cbt_ncopias;
dr["cbt_casociado"] = this._cbt_casociado;
dr["cbt_nCbteCAE"] = this._cbt_nCbteCAE;
dr["cbt_idOrganizacionFacturadora"] = this._cbt_idOrganizacionFacturadora;
							 
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
