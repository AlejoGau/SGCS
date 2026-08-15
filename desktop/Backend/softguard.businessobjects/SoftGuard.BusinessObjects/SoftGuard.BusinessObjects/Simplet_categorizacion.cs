
using System;
using System.Xml;
using System.Data;
using Slbf;
using Slbf.Helpers;    	    	 
using System.Runtime.Serialization;
using System.Collections.Generic;

namespace SoftGuard.BusinessObjects
{ 	
  ///<summary>
    ///t_categorizacion Slbf Class
    ///</summary>
    [DataContract]
    public class Simplet_categorizacion : SimpleBaseObject
    { 
			 ///<summary>
     ///cat_cCodigo   
     ///</summary>
	 [DataMember]
     public string cat_cCodigo { get;set;} 
	  ///<summary>
     ///cat_cDescripcion   
     ///</summary>
	 [DataMember]
     public string cat_cDescripcion { get;set;} 
	  ///<summary>
     ///cat_iEstado   
     ///</summary>
	 [DataMember]
     public int cat_iEstado { get;set;} 
	 ///<summary>
        ///t_categorizacion Constructor
        ///</summary>
        public Simplet_categorizacion() : base()
  {
  InitClass();
  }
        ///<summary>
        ///t_categorizacion Constructor
        ///</summary>
        public Simplet_categorizacion(int Id, string Name, string cat_cCodigo, string cat_cDescripcion, int cat_iEstado) : base()
        {
            base.Id = Id;
						base.Name = Name;				 																																					 
				    this.cat_cCodigo = cat_cCodigo;
this.cat_cDescripcion = cat_cDescripcion;
this.cat_iEstado = cat_iEstado;

            InitClass();
        }  								

				private void InitClass()
        {														
  				  base.Type = new ObjectType(3079, "t_categorizacion");
        }
///<summary>
    ///Returns SimpleBaseObject
    ///</summary>
		public override SimpleBaseObject GetObject()
		{
			return (SimpleBaseObject) this;
		}
///<summary>
    ///Returns BaseObject
    ///</summary>  
		public override BaseObject GetBaseObject(SqlHelper SqlConfig, int UserId)
		{
			BaseObject Object = new Dalt_categorizacion(SqlConfig, UserId, this);
			if(this.CallerObject != null)
			   Object.CallerObject = this.CallerObject;			
			return Object;
		}
///<summary>
    ///Get parent object
    ///</summary>
		public override CallerObject GetCallerObject()
		{
			Callert_categorizacion Caller = new Callert_categorizacion();
			Caller.Id = base.Id;
			Caller.Name = base.Name;
			Caller.cat_cCodigo = this.cat_cCodigo;
Caller.cat_cDescripcion = this.cat_cDescripcion;
Caller.cat_iEstado = this.cat_iEstado;

			return (CallerObject) Caller;
		}
///<summary>
    ///Get DataTable of objetdata
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
dr["cat_cCodigo"] = (object)this.cat_cCodigo ?? System.DBNull.Value;
dr["cat_cDescripcion"] = (object)this.cat_cDescripcion ?? System.DBNull.Value;
dr["cat_iEstado"] = (object)this.cat_iEstado ?? System.DBNull.Value;
							 
               //Insert Row in Table
               dt.Rows.Add(dr);
							 
							 return dt;	 
												    
        }
///<summary>
  ///Get XmlDataDocument
  ///</summary>
	public override XmlDataDocument GetXmlObject()
    {
		  DataSet ds = new DataSet("Object"); 
		  ds.EnforceConstraints = false;														                
               							 
 		  ds.Tables.Add(GetDataObject());
	  	  ds.Tables.Add(this.Type.GetDataObject());  	  

          XmlDataDocument XmlDoc = new XmlDataDocument(ds);
		  if(this.CallerObject != null)			 	 
		     XmlDoc.SelectSingleNode("//Object").InnerXml += this.CallerObject.GetXmlObject().InnerXml;                    
		  if(this.Dependencies.Count != 0)
			 XmlDoc.SelectSingleNode("//Object").InnerXml += this.Dependencies.GetXmlObjects().InnerXml;          
			 
          return XmlDoc;							    
    }
 
			}

}
