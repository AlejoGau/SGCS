
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
    public class Callert_categorizacion : CallerObject
    { 	
				     private string _cat_cCodigo;
					
				     private string _cat_cDescripcion;
					
				     private int _cat_iEstado;
				 ///<summary>
     ///cat_cCodigo property   
     ///</summary>   
     public string cat_cCodigo 
		 { 
		        
                    get{ return this._cat_cCodigo; }
        						set{ this._cat_cCodigo = value; } 										
	   }
	  ///<summary>
     ///cat_cDescripcion property   
     ///</summary>   
     public string cat_cDescripcion 
		 { 
		        
                    get{ return this._cat_cDescripcion; }
        						set{ this._cat_cDescripcion = value; } 										
	   }
	  ///<summary>
     ///cat_iEstado property   
     ///</summary>   
     public int cat_iEstado 
		 { 
		        
                    get{ return this._cat_iEstado; }
        						set{ this._cat_iEstado = value; } 										
	   }
	  ///<summary>
     ///Constructor   
     ///</summary>
        public Callert_categorizacion() : base()
        {
            InitClass();
        }  
 ///<summary>
     ///Constructor   
     ///</summary>		
        public Callert_categorizacion(int Id, string Name, string cat_cCodigo, string cat_cDescripcion, int cat_iEstado) : base()
        {
            base.Id = Id;
						base.Name = Name;				 																																					 
				    this._cat_cCodigo = cat_cCodigo;
this._cat_cDescripcion = cat_cDescripcion;
this._cat_iEstado = cat_iEstado;

            InitClass();
        }  								

				private void InitClass()
        {														
  				  base.Type = new ObjectType(3079, "t_categorizacion");
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
			Simplet_categorizacion Simple = new Simplet_categorizacion();
			Simple.Id = base.Id;
			Simple.Name = base.Name;
			Simple.cat_cCodigo = this._cat_cCodigo;
Simple.cat_cDescripcion = this._cat_cDescripcion;
Simple.cat_iEstado = this._cat_iEstado;

			return (SimpleBaseObject) Simple;
		}
 ///<summary>
     ///Sets a simpleobject   
     ///</summary>	
		public void SetSimpleObject(Simplet_categorizacion Simple)
		{
			base.Id = Simple.Id;
			base.Name = Simple.Name;
			this._cat_cCodigo = Simple.cat_cCodigo;
this._cat_cDescripcion = Simple.cat_cDescripcion;
this._cat_iEstado = Simple.cat_iEstado;

		}
 ///<summary>
     ///Gets a baseobject   
     ///</summary>
		public override BaseObject GetBaseObject(SqlHelper SqlConfig, int UserId)
		{
			return new Dalt_categorizacion(SqlConfig, UserId, (Simplet_categorizacion) GetSimpleObject());
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
               dt.Columns.Add(new DataColumn("cat_cCodigo", typeof (string)));               
							 dt.Columns.Add(new DataColumn("cat_cDescripcion", typeof (string)));               
							 dt.Columns.Add(new DataColumn("cat_iEstado", typeof (int)));               
							 										
               //create Row  
               dr = dt.NewRow();
               
               //set Row
							 dr["Id"] = base.Id;

							 dr["Name"] = base.Name;
dr["cat_cCodigo"] = this._cat_cCodigo;
dr["cat_cDescripcion"] = this._cat_cDescripcion;
dr["cat_iEstado"] = this._cat_iEstado;
							 
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
