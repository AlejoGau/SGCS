
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
    public class CallerUsuario : CallerObject
    { 	
				     private int _usu_iidcuenta;
					
				     private int _usu_icodigo;
					
				     private string _usu_cnombre;
					
				     private int _usu_iid;
					
				     private string _usu_cclave;
					
				     private Decimal _usu_ntipo;
					
				     private string _usu_cimagen;
					
				     private string _usu_mobservacion;
					
				     private string _usu_cidextendido;
					
				     private string _usu_cmetadata;
					
				     private int _usu_teliid;
					
				     private string _usu_cidentificacion;
					
				     private int _usu_itipoidentificacion;
					
				     private string _usu_email;
				 ///<summary>
     ///usu_iidcuenta property   
     ///</summary>   
     public int usu_iidcuenta 
		 { 
		        
                    get{ return this._usu_iidcuenta; }
        						set{ this._usu_iidcuenta = value; } 										
	   }
	  ///<summary>
     ///usu_icodigo property   
     ///</summary>   
     public int usu_icodigo 
		 { 
		        
                    get{ return this._usu_icodigo; }
        						set{ this._usu_icodigo = value; } 										
	   }
	  ///<summary>
     ///usu_cnombre property   
     ///</summary>   
     public string usu_cnombre 
		 { 
		        
                    get{ return this._usu_cnombre; }
        						set{ this._usu_cnombre = value; } 										
	   }
	  ///<summary>
     ///usu_iid property   
     ///</summary>   
     public int usu_iid 
		 { 
		        
                    get{ return this._usu_iid; }
        						set{ this._usu_iid = value; } 										
	   }
	  ///<summary>
     ///usu_cclave property   
     ///</summary>   
     public string usu_cclave 
		 { 
		        
                    get{ return this._usu_cclave; }
        						set{ this._usu_cclave = value; } 										
	   }
	  ///<summary>
     ///usu_ntipo property   
     ///</summary>   
     public Decimal usu_ntipo 
		 { 
		        
                    get{ return this._usu_ntipo; }
        						set{ this._usu_ntipo = value; } 										
	   }
	  ///<summary>
     ///usu_cimagen property   
     ///</summary>   
     public string usu_cimagen 
		 { 
		        
                    get{ return this._usu_cimagen; }
        						set{ this._usu_cimagen = value; } 										
	   }
	  ///<summary>
     ///usu_mobservacion property   
     ///</summary>   
     public string usu_mobservacion 
		 { 
		        
                    get{ return this._usu_mobservacion; }
        						set{ this._usu_mobservacion = value; } 										
	   }
	  ///<summary>
     ///usu_cidextendido property   
     ///</summary>   
     public string usu_cidextendido 
		 { 
		        
                    get{ return this._usu_cidextendido; }
        						set{ this._usu_cidextendido = value; } 										
	   }
	  ///<summary>
     ///usu_cmetadata property   
     ///</summary>   
     public string usu_cmetadata 
		 { 
		        
                    get{ return this._usu_cmetadata; }
        						set{ this._usu_cmetadata = value; } 										
	   }
	  ///<summary>
     ///usu_teliid property   
     ///</summary>   
     public int usu_teliid 
		 { 
		        
                    get{ return this._usu_teliid; }
        						set{ this._usu_teliid = value; } 										
	   }
	  ///<summary>
     ///usu_cidentificacion property   
     ///</summary>   
     public string usu_cidentificacion 
		 { 
		        
                    get{ return this._usu_cidentificacion; }
        						set{ this._usu_cidentificacion = value; } 										
	   }
	  ///<summary>
     ///usu_itipoidentificacion property   
     ///</summary>   
     public int usu_itipoidentificacion 
		 { 
		        
                    get{ return this._usu_itipoidentificacion; }
        						set{ this._usu_itipoidentificacion = value; } 										
	   }
	  ///<summary>
     ///usu_email property   
     ///</summary>   
     public string usu_email 
		 { 
		        
                    get{ return this._usu_email; }
        						set{ this._usu_email = value; } 										
	   }
	  ///<summary>
     ///Constructor   
     ///</summary>
        public CallerUsuario() : base()
        {
            InitClass();
        }  
 ///<summary>
     ///Constructor   
     ///</summary>		
        public CallerUsuario(int Id, string Name, int usu_iidcuenta, int usu_icodigo, string usu_cnombre, int usu_iid, string usu_cclave, Decimal usu_ntipo, string usu_cimagen, string usu_mobservacion, string usu_cidextendido, string usu_cmetadata, int usu_teliid, string usu_cidentificacion, int usu_itipoidentificacion, string usu_email) : base()
        {
            base.Id = Id;
						base.Name = Name;				 																																					 
				    this._usu_iidcuenta = usu_iidcuenta;
this._usu_icodigo = usu_icodigo;
this._usu_cnombre = usu_cnombre;
this._usu_iid = usu_iid;
this._usu_cclave = usu_cclave;
this._usu_ntipo = usu_ntipo;
this._usu_cimagen = usu_cimagen;
this._usu_mobservacion = usu_mobservacion;
this._usu_cidextendido = usu_cidextendido;
this._usu_cmetadata = usu_cmetadata;
this._usu_teliid = usu_teliid;
this._usu_cidentificacion = usu_cidentificacion;
this._usu_itipoidentificacion = usu_itipoidentificacion;
this._usu_email = usu_email;

            InitClass();
        }  								

				private void InitClass()
        {														
  				  base.Type = new ObjectType(3013, "Usuario");
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
			SimpleUsuario Simple = new SimpleUsuario();
			Simple.Id = base.Id;
			Simple.Name = base.Name;
			Simple.usu_iidcuenta = this._usu_iidcuenta;
Simple.usu_icodigo = this._usu_icodigo;
Simple.usu_cnombre = this._usu_cnombre;
Simple.usu_iid = this._usu_iid;
Simple.usu_cclave = this._usu_cclave;
Simple.usu_ntipo = this._usu_ntipo;
Simple.usu_cimagen = this._usu_cimagen;
Simple.usu_mobservacion = this._usu_mobservacion;
Simple.usu_cidextendido = this._usu_cidextendido;
Simple.usu_cmetadata = this._usu_cmetadata;
Simple.usu_teliid = this._usu_teliid;
Simple.usu_cidentificacion = this._usu_cidentificacion;
Simple.usu_itipoidentificacion = this._usu_itipoidentificacion;
Simple.usu_email = this._usu_email;

			return (SimpleBaseObject) Simple;
		}
 ///<summary>
     ///Sets a simpleobject   
     ///</summary>	
		public void SetSimpleObject(SimpleUsuario Simple)
		{
			base.Id = Simple.Id;
			base.Name = Simple.Name;
			this._usu_iidcuenta = Simple.usu_iidcuenta;
this._usu_icodigo = Simple.usu_icodigo;
this._usu_cnombre = Simple.usu_cnombre;
this._usu_iid = Simple.usu_iid;
this._usu_cclave = Simple.usu_cclave;
this._usu_ntipo = Simple.usu_ntipo;
this._usu_cimagen = Simple.usu_cimagen;
this._usu_mobservacion = Simple.usu_mobservacion;
this._usu_cidextendido = Simple.usu_cidextendido;
this._usu_cmetadata = Simple.usu_cmetadata;
this._usu_teliid = Simple.usu_teliid;
this._usu_cidentificacion = Simple.usu_cidentificacion;
this._usu_itipoidentificacion = Simple.usu_itipoidentificacion;
this._usu_email = Simple.usu_email;

		}
 ///<summary>
     ///Gets a baseobject   
     ///</summary>
		public override BaseObject GetBaseObject(SqlHelper SqlConfig, int UserId)
		{
			return new DalUsuario(SqlConfig, UserId, (SimpleUsuario) GetSimpleObject());
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
               dt.Columns.Add(new DataColumn("usu_iidcuenta", typeof (int)));               
							 dt.Columns.Add(new DataColumn("usu_icodigo", typeof (int)));               
							 dt.Columns.Add(new DataColumn("usu_cnombre", typeof (string)));               
							 dt.Columns.Add(new DataColumn("usu_iid", typeof (int)));               
							 dt.Columns.Add(new DataColumn("usu_cclave", typeof (string)));               
							 dt.Columns.Add(new DataColumn("usu_ntipo", typeof (Decimal)));               
							 dt.Columns.Add(new DataColumn("usu_cimagen", typeof (string)));               
							 dt.Columns.Add(new DataColumn("usu_mobservacion", typeof (string)));               
							 dt.Columns.Add(new DataColumn("usu_cidextendido", typeof (string)));               
							 dt.Columns.Add(new DataColumn("usu_cmetadata", typeof (string)));               
							 dt.Columns.Add(new DataColumn("usu_teliid", typeof (int)));               
							 dt.Columns.Add(new DataColumn("usu_cidentificacion", typeof (string)));               
							 dt.Columns.Add(new DataColumn("usu_itipoidentificacion", typeof (int)));               
							 dt.Columns.Add(new DataColumn("usu_email", typeof (string)));               
							 										
               //create Row  
               dr = dt.NewRow();
               
               //set Row
							 dr["Id"] = base.Id;

							 dr["Name"] = base.Name;
dr["usu_iidcuenta"] = this._usu_iidcuenta;
dr["usu_icodigo"] = this._usu_icodigo;
dr["usu_cnombre"] = this._usu_cnombre;
dr["usu_iid"] = this._usu_iid;
dr["usu_cclave"] = this._usu_cclave;
dr["usu_ntipo"] = this._usu_ntipo;
dr["usu_cimagen"] = this._usu_cimagen;
dr["usu_mobservacion"] = this._usu_mobservacion;
dr["usu_cidextendido"] = this._usu_cidextendido;
dr["usu_cmetadata"] = this._usu_cmetadata;
dr["usu_teliid"] = this._usu_teliid;
dr["usu_cidentificacion"] = this._usu_cidentificacion;
dr["usu_itipoidentificacion"] = this._usu_itipoidentificacion;
dr["usu_email"] = this._usu_email;
							 
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
