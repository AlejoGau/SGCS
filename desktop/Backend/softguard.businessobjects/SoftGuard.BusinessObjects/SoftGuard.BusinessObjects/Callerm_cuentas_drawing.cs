
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
    public class Callerm_cuentas_drawing : CallerObject
    { 	
				     private string _drw_type;
					
				     private int _drw_cueiid;
					
				     private string _drw_metadata;
					
				     private string _drw_descripcion;
				 ///<summary>
     ///drw_type property   
     ///</summary>   
     public string drw_type 
		 { 
		        
                    get{ return this._drw_type; }
        						set{ this._drw_type = value; } 										
	   }
	  ///<summary>
     ///drw_cueiid property   
     ///</summary>   
     public int drw_cueiid 
		 { 
		        
                    get{ return this._drw_cueiid; }
        						set{ this._drw_cueiid = value; } 										
	   }
	  ///<summary>
     ///drw_metadata property   
     ///</summary>   
     public string drw_metadata 
		 { 
		        
                    get{ return this._drw_metadata; }
        						set{ this._drw_metadata = value; } 										
	   }
	  ///<summary>
     ///drw_descripcion property   
     ///</summary>   
     public string drw_descripcion 
		 { 
		        
                    get{ return this._drw_descripcion; }
        						set{ this._drw_descripcion = value; } 										
	   }
	  ///<summary>
     ///Constructor   
     ///</summary>
        public Callerm_cuentas_drawing() : base()
        {
            InitClass();
        }  
 ///<summary>
     ///Constructor   
     ///</summary>		
        public Callerm_cuentas_drawing(int Id, string Name, string drw_type, int drw_cueiid, string drw_metadata, string drw_descripcion) : base()
        {
            base.Id = Id;
						base.Name = Name;				 																																					 
				    this._drw_type = drw_type;
this._drw_cueiid = drw_cueiid;
this._drw_metadata = drw_metadata;
this._drw_descripcion = drw_descripcion;

            InitClass();
        }  								

				private void InitClass()
        {														
  				  base.Type = new ObjectType(3177, "m_cuentas_drawing");
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
			Simplem_cuentas_drawing Simple = new Simplem_cuentas_drawing();
			Simple.Id = base.Id;
			Simple.Name = base.Name;
			Simple.drw_type = this._drw_type;
Simple.drw_cueiid = this._drw_cueiid;
Simple.drw_metadata = this._drw_metadata;
Simple.drw_descripcion = this._drw_descripcion;

			return (SimpleBaseObject) Simple;
		}
 ///<summary>
     ///Sets a simpleobject   
     ///</summary>	
		public void SetSimpleObject(Simplem_cuentas_drawing Simple)
		{
			base.Id = Simple.Id;
			base.Name = Simple.Name;
			this._drw_type = Simple.drw_type;
this._drw_cueiid = Simple.drw_cueiid;
this._drw_metadata = Simple.drw_metadata;
this._drw_descripcion = Simple.drw_descripcion;

		}
 ///<summary>
     ///Gets a baseobject   
     ///</summary>
		public override BaseObject GetBaseObject(SqlHelper SqlConfig, int UserId)
		{
			return new Dalm_cuentas_drawing(SqlConfig, UserId, (Simplem_cuentas_drawing) GetSimpleObject());
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
               dt.Columns.Add(new DataColumn("drw_type", typeof (string)));               
							 dt.Columns.Add(new DataColumn("drw_cueiid", typeof (int)));               
							 dt.Columns.Add(new DataColumn("drw_metadata", typeof (string)));               
							 dt.Columns.Add(new DataColumn("drw_descripcion", typeof (string)));               
							 										
               //create Row  
               dr = dt.NewRow();
               
               //set Row
							 dr["Id"] = base.Id;

							 dr["Name"] = base.Name;
dr["drw_type"] = this._drw_type;
dr["drw_cueiid"] = this._drw_cueiid;
dr["drw_metadata"] = this._drw_metadata;
dr["drw_descripcion"] = this._drw_descripcion;
							 
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
