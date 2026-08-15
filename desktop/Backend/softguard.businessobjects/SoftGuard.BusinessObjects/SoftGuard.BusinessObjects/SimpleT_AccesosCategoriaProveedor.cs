
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
    ///T_AccesosCategoriaProveedor Slbf Class
    ///</summary>
    [DataContract]
    public class SimpleT_AccesosCategoriaProveedor : SimpleBaseObject
    { 
			 ///<summary>
     ///acp_cDescripcion   
     ///</summary>
	 [DataMember]
     public string acp_cDescripcion { get;set;} 
	 ///<summary>
        ///T_AccesosCategoriaProveedor Constructor
        ///</summary>
        public SimpleT_AccesosCategoriaProveedor() : base()
  {
  InitClass();
  }
        ///<summary>
        ///T_AccesosCategoriaProveedor Constructor
        ///</summary>
        public SimpleT_AccesosCategoriaProveedor(int Id, string Name, string acp_cDescripcion) : base()
        {
            base.Id = Id;
						base.Name = Name;				 																																					 
				    this.acp_cDescripcion = acp_cDescripcion;

            InitClass();
        }  								

				private void InitClass()
        {														
  				  base.Type = new ObjectType(3231, "T_AccesosCategoriaProveedor");
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
			BaseObject Object = new DalT_AccesosCategoriaProveedor(SqlConfig, UserId, this);
			if(this.CallerObject != null)
			   Object.CallerObject = this.CallerObject;			
			return Object;
		}
///<summary>
    ///Get parent object
    ///</summary>
		public override CallerObject GetCallerObject()
		{
			CallerT_AccesosCategoriaProveedor Caller = new CallerT_AccesosCategoriaProveedor();
			Caller.Id = base.Id;
			Caller.Name = base.Name;
			Caller.acp_cDescripcion = this.acp_cDescripcion;

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
               dt.Columns.Add(new DataColumn("acp_cDescripcion", typeof (string)));               
							 										
               //create Row  
               dr = dt.NewRow();
               
               //set Row
							 dr["Id"] = base.Id;

							 dr["Name"] = base.Name;
dr["acp_cDescripcion"] = (object)this.acp_cDescripcion ?? System.DBNull.Value;
							 
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
