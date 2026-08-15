
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
    public class Callerm_AccesosProveedoresDocumentos : CallerObject
    { 	
				     private int _apd_idKeyProveedor;
					
				     private int _apd_idKeyTipoDoc;
					
				     private string _apd_cDescripcion ;
					
				     private DateTime? _apd_tFechaVto;
					
				     private string _apd_cPathFile;
				 ///<summary>
     ///apd_idKeyProveedor property   
     ///</summary>   
     public int apd_idKeyProveedor 
		 { 
		        
                    get{ return this._apd_idKeyProveedor; }
        						set{ this._apd_idKeyProveedor = value; } 										
	   }
	  ///<summary>
     ///apd_idKeyTipoDoc property   
     ///</summary>   
     public int apd_idKeyTipoDoc 
		 { 
		        
                    get{ return this._apd_idKeyTipoDoc; }
        						set{ this._apd_idKeyTipoDoc = value; } 										
	   }
	  ///<summary>
     ///apd_cDescripcion  property   
     ///</summary>   
     public string apd_cDescripcion  
		 { 
		        
                    get{ return this._apd_cDescripcion ; }
        						set{ this._apd_cDescripcion  = value; } 										
	   }
	  ///<summary>
     ///apd_tFechaVto property   
     ///</summary>   
     public DateTime? apd_tFechaVto 
		 { 
		        
                    get{ return this._apd_tFechaVto; }
        						set{ this._apd_tFechaVto = value; } 										
	   }
	  ///<summary>
     ///apd_cPathFile property   
     ///</summary>   
     public string apd_cPathFile 
		 { 
		        
                    get{ return this._apd_cPathFile; }
        						set{ this._apd_cPathFile = value; } 										
	   }
	  ///<summary>
     ///Constructor   
     ///</summary>
        public Callerm_AccesosProveedoresDocumentos() : base()
        {
            InitClass();
        }  
 ///<summary>
     ///Constructor   
     ///</summary>		
        public Callerm_AccesosProveedoresDocumentos(int Id, string Name, int apd_idKeyProveedor, int apd_idKeyTipoDoc, string apd_cDescripcion , DateTime? apd_tFechaVto, string apd_cPathFile) : base()
        {
            base.Id = Id;
						base.Name = Name;				 																																					 
				    this._apd_idKeyProveedor = apd_idKeyProveedor;
this._apd_idKeyTipoDoc = apd_idKeyTipoDoc;
this._apd_cDescripcion  = apd_cDescripcion ;
this._apd_tFechaVto = apd_tFechaVto;
this._apd_cPathFile = apd_cPathFile;

            InitClass();
        }  								

				private void InitClass()
        {														
  				  base.Type = new ObjectType(3228, "m_AccesosProveedoresDocumentos");
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
			Simplem_AccesosProveedoresDocumentos Simple = new Simplem_AccesosProveedoresDocumentos();
			Simple.Id = base.Id;
			Simple.Name = base.Name;
			Simple.apd_idKeyProveedor = this._apd_idKeyProveedor;
Simple.apd_idKeyTipoDoc = this._apd_idKeyTipoDoc;
Simple.apd_cDescripcion  = this._apd_cDescripcion ;
Simple.apd_tFechaVto = this._apd_tFechaVto;
Simple.apd_cPathFile = this._apd_cPathFile;

			return (SimpleBaseObject) Simple;
		}
 ///<summary>
     ///Sets a simpleobject   
     ///</summary>	
		public void SetSimpleObject(Simplem_AccesosProveedoresDocumentos Simple)
		{
			base.Id = Simple.Id;
			base.Name = Simple.Name;
			this._apd_idKeyProveedor = Simple.apd_idKeyProveedor;
this._apd_idKeyTipoDoc = Simple.apd_idKeyTipoDoc;
this._apd_cDescripcion  = Simple.apd_cDescripcion ;
this._apd_tFechaVto = Simple.apd_tFechaVto;
this._apd_cPathFile = Simple.apd_cPathFile;

		}
 ///<summary>
     ///Gets a baseobject   
     ///</summary>
		public override BaseObject GetBaseObject(SqlHelper SqlConfig, int UserId)
		{
			return new Dalm_AccesosProveedoresDocumentos(SqlConfig, UserId, (Simplem_AccesosProveedoresDocumentos) GetSimpleObject());
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
               dt.Columns.Add(new DataColumn("apd_idKeyProveedor", typeof (int)));               
							 dt.Columns.Add(new DataColumn("apd_idKeyTipoDoc", typeof (int)));               
							 dt.Columns.Add(new DataColumn("apd_cDescripcion ", typeof (string)));               
							 dt.Columns.Add(new DataColumn("apd_tFechaVto", typeof (DateTime)));               
							 dt.Columns.Add(new DataColumn("apd_cPathFile", typeof (string)));               
							 										
               //create Row  
               dr = dt.NewRow();
               
               //set Row
							 dr["Id"] = base.Id;

							 dr["Name"] = base.Name;
dr["apd_idKeyProveedor"] = this._apd_idKeyProveedor;
dr["apd_idKeyTipoDoc"] = this._apd_idKeyTipoDoc;
dr["apd_cDescripcion "] = this._apd_cDescripcion ;
dr["apd_tFechaVto"] = this._apd_tFechaVto;
dr["apd_cPathFile"] = this._apd_cPathFile;
							 
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
