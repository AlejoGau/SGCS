
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
    public class CallerT_AccesosCategoriaProveedor : CallerObject
    { 	
				     private string _acp_cDescripcion;
				 ///<summary>
     ///acp_cDescripcion property   
     ///</summary>   
     public string acp_cDescripcion 
		 { 
		        
                    get{ return this._acp_cDescripcion; }
        						set{ this._acp_cDescripcion = value; } 										
	   }
	  ///<summary>
     ///Constructor   
     ///</summary>
        public CallerT_AccesosCategoriaProveedor() : base()
        {
            InitClass();
        }  
 ///<summary>
     ///Constructor   
     ///</summary>		
        public CallerT_AccesosCategoriaProveedor(int Id, string Name, string acp_cDescripcion) : base()
        {
            base.Id = Id;
						base.Name = Name;				 																																					 
				    this._acp_cDescripcion = acp_cDescripcion;

            InitClass();
        }  								

				private void InitClass()
        {														
  				  base.Type = new ObjectType(3231, "T_AccesosCategoriaProveedor");
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
			SimpleT_AccesosCategoriaProveedor Simple = new SimpleT_AccesosCategoriaProveedor();
			Simple.Id = base.Id;
			Simple.Name = base.Name;
			Simple.acp_cDescripcion = this._acp_cDescripcion;

			return (SimpleBaseObject) Simple;
		}
 ///<summary>
     ///Sets a simpleobject   
     ///</summary>	
		public void SetSimpleObject(SimpleT_AccesosCategoriaProveedor Simple)
		{
			base.Id = Simple.Id;
			base.Name = Simple.Name;
			this._acp_cDescripcion = Simple.acp_cDescripcion;

		}
 ///<summary>
     ///Gets a baseobject   
     ///</summary>
		public override BaseObject GetBaseObject(SqlHelper SqlConfig, int UserId)
		{
			return new DalT_AccesosCategoriaProveedor(SqlConfig, UserId, (SimpleT_AccesosCategoriaProveedor) GetSimpleObject());
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
               dt.Columns.Add(new DataColumn("acp_cDescripcion", typeof (string)));               
							 										
               //create Row  
               dr = dt.NewRow();
               
               //set Row
							 dr["Id"] = base.Id;

							 dr["Name"] = base.Name;
dr["acp_cDescripcion"] = this._acp_cDescripcion;
							 
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
