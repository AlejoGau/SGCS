
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
    ///m_cuentas_drawing Slbf Class
    ///</summary>
    [DataContract]
    public class Simplem_cuentas_drawing : SimpleBaseObject
    { 
			 ///<summary>
     ///drw_type   
     ///</summary>
	 [DataMember]
     public string drw_type { get;set;} 
	  ///<summary>
     ///drw_cueiid   
     ///</summary>
	 [DataMember]
     public int drw_cueiid { get;set;} 
	  ///<summary>
     ///drw_metadata   
     ///</summary>
	 [DataMember]
     public string drw_metadata { get;set;} 
	  ///<summary>
     ///drw_descripcion   
     ///</summary>
	 [DataMember]
     public string drw_descripcion { get;set;} 
	 ///<summary>
        ///m_cuentas_drawing Constructor
        ///</summary>
        public Simplem_cuentas_drawing() : base()
  {
  InitClass();
  }
        ///<summary>
        ///m_cuentas_drawing Constructor
        ///</summary>
        public Simplem_cuentas_drawing(int Id, string Name, string drw_type, int drw_cueiid, string drw_metadata, string drw_descripcion) : base()
        {
            base.Id = Id;
						base.Name = Name;				 																																					 
				    this.drw_type = drw_type;
this.drw_cueiid = drw_cueiid;
this.drw_metadata = drw_metadata;
this.drw_descripcion = drw_descripcion;

            InitClass();
        }  								

				private void InitClass()
        {														
  				  base.Type = new ObjectType(3177, "m_cuentas_drawing");
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
			BaseObject Object = new Dalm_cuentas_drawing(SqlConfig, UserId, this);
			if(this.CallerObject != null)
			   Object.CallerObject = this.CallerObject;			
			return Object;
		}
///<summary>
    ///Get parent object
    ///</summary>
		public override CallerObject GetCallerObject()
		{
			Callerm_cuentas_drawing Caller = new Callerm_cuentas_drawing();
			Caller.Id = base.Id;
			Caller.Name = base.Name;
			Caller.drw_type = this.drw_type;
Caller.drw_cueiid = this.drw_cueiid;
Caller.drw_metadata = this.drw_metadata;
Caller.drw_descripcion = this.drw_descripcion;

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
               dt.Columns.Add(new DataColumn("drw_type", typeof (string)));               
							 dt.Columns.Add(new DataColumn("drw_cueiid", typeof (int)));               
							 dt.Columns.Add(new DataColumn("drw_metadata", typeof (string)));               
							 dt.Columns.Add(new DataColumn("drw_descripcion", typeof (string)));               
							 										
               //create Row  
               dr = dt.NewRow();
               
               //set Row
							 dr["Id"] = base.Id;

							 dr["Name"] = base.Name;
dr["drw_type"] = (object)this.drw_type ?? System.DBNull.Value;
dr["drw_cueiid"] = (object)this.drw_cueiid ?? System.DBNull.Value;
dr["drw_metadata"] = (object)this.drw_metadata ?? System.DBNull.Value;
dr["drw_descripcion"] = (object)this.drw_descripcion ?? System.DBNull.Value;
							 
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
