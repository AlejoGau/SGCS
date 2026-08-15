
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
    ///s_ip_range Slbf Class
    ///</summary>
    [DataContract]
    public class Simples_ip_range : SimpleBaseObject
    { 
			 ///<summary>
     ///ipr_name   
     ///</summary>
	 [DataMember]
     public string ipr_name { get;set;} 
	  ///<summary>
     ///ipr_desde   
     ///</summary>
	 [DataMember]
     public string ipr_desde { get;set;} 
	  ///<summary>
     ///ipr_hasta   
     ///</summary>
	 [DataMember]
     public string ipr_hasta { get;set;} 
	  ///<summary>
     ///ipr_estado   
     ///</summary>
	 [DataMember]
     public int ipr_estado { get;set;} 
	 ///<summary>
        ///s_ip_range Constructor
        ///</summary>
        public Simples_ip_range() : base()
  {
  InitClass();
  }
        ///<summary>
        ///s_ip_range Constructor
        ///</summary>
        public Simples_ip_range(int Id, string Name, string ipr_name, string ipr_desde, string ipr_hasta, int ipr_estado) : base()
        {
            base.Id = Id;
						base.Name = Name;				 																																					 
				    this.ipr_name = ipr_name;
this.ipr_desde = ipr_desde;
this.ipr_hasta = ipr_hasta;
this.ipr_estado = ipr_estado;

            InitClass();
        }  								

				private void InitClass()
        {														
  				  base.Type = new ObjectType(3182, "s_ip_range");
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
			BaseObject Object = new Dals_ip_range(SqlConfig, UserId, this);
			if(this.CallerObject != null)
			   Object.CallerObject = this.CallerObject;			
			return Object;
		}
///<summary>
    ///Get parent object
    ///</summary>
		public override CallerObject GetCallerObject()
		{
			Callers_ip_range Caller = new Callers_ip_range();
			Caller.Id = base.Id;
			Caller.Name = base.Name;
			Caller.ipr_name = this.ipr_name;
Caller.ipr_desde = this.ipr_desde;
Caller.ipr_hasta = this.ipr_hasta;
Caller.ipr_estado = this.ipr_estado;

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
               dt.Columns.Add(new DataColumn("ipr_name", typeof (string)));               
							 dt.Columns.Add(new DataColumn("ipr_desde", typeof (string)));               
							 dt.Columns.Add(new DataColumn("ipr_hasta", typeof (string)));               
							 dt.Columns.Add(new DataColumn("ipr_estado", typeof (int)));               
							 										
               //create Row  
               dr = dt.NewRow();
               
               //set Row
							 dr["Id"] = base.Id;

							 dr["Name"] = base.Name;
dr["ipr_name"] = (object)this.ipr_name ?? System.DBNull.Value;
dr["ipr_desde"] = (object)this.ipr_desde ?? System.DBNull.Value;
dr["ipr_hasta"] = (object)this.ipr_hasta ?? System.DBNull.Value;
dr["ipr_estado"] = (object)this.ipr_estado ?? System.DBNull.Value;
							 
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
