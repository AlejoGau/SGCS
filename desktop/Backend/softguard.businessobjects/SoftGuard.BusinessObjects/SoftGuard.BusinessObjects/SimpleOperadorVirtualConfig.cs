
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
    ///OperadorVirtualConfig Slbf Class
    ///</summary>
    [DataContract]
    public class SimpleOperadorVirtualConfig : SimpleBaseObject
    { 
			 ///<summary>
     ///ovc_cDescripcion   
     ///</summary>
	 [DataMember]
     public string ovc_cDescripcion { get;set;} 
	  ///<summary>
     ///ovc_iStatus   
     ///</summary>
	 [DataMember]
     public int ovc_iStatus { get;set;} 
	  ///<summary>
     ///ovc_cDealers   
     ///</summary>
	 [DataMember]
     public string ovc_cDealers { get;set;} 
	  ///<summary>
     ///ovc_cEventos   
     ///</summary>
	 [DataMember]
     public string ovc_cEventos { get;set;} 
	  ///<summary>
     ///ovc_tLastUpdated   
     ///</summary>
	 [DataMember]
     public DateTime? ovc_tLastUpdated { get;set;} 
	  ///<summary>
     ///ovc_tCreatedDate   
     ///</summary>
	 [DataMember]
     public DateTime? ovc_tCreatedDate { get;set;} 
	  ///<summary>
     ///ovc_cEventType   
     ///</summary>
	 [DataMember]
     public string ovc_cEventType { get;set;} 
	 ///<summary>
        ///OperadorVirtualConfig Constructor
        ///</summary>
        public SimpleOperadorVirtualConfig() : base()
  {
  InitClass();
  }
        ///<summary>
        ///OperadorVirtualConfig Constructor
        ///</summary>
        public SimpleOperadorVirtualConfig(int Id, string Name, string ovc_cDescripcion, int ovc_iStatus, string ovc_cDealers, string ovc_cEventos, DateTime? ovc_tLastUpdated, DateTime? ovc_tCreatedDate, string ovc_cEventType) : base()
        {
            base.Id = Id;
						base.Name = Name;				 																																					 
				    this.ovc_cDescripcion = ovc_cDescripcion;
this.ovc_iStatus = ovc_iStatus;
this.ovc_cDealers = ovc_cDealers;
this.ovc_cEventos = ovc_cEventos;
this.ovc_tLastUpdated = ovc_tLastUpdated;
this.ovc_tCreatedDate = ovc_tCreatedDate;
this.ovc_cEventType = ovc_cEventType;

            InitClass();
        }  								

				private void InitClass()
        {														
  				  base.Type = new ObjectType(7047, "OperadorVirtualConfig");
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
			BaseObject Object = new DalOperadorVirtualConfig(SqlConfig, UserId, this);
			if(this.CallerObject != null)
			   Object.CallerObject = this.CallerObject;			
			return Object;
		}
///<summary>
    ///Get parent object
    ///</summary>
		public override CallerObject GetCallerObject()
		{
			CallerOperadorVirtualConfig Caller = new CallerOperadorVirtualConfig();
			Caller.Id = base.Id;
			Caller.Name = base.Name;
			Caller.ovc_cDescripcion = this.ovc_cDescripcion;
Caller.ovc_iStatus = this.ovc_iStatus;
Caller.ovc_cDealers = this.ovc_cDealers;
Caller.ovc_cEventos = this.ovc_cEventos;
Caller.ovc_tLastUpdated = this.ovc_tLastUpdated;
Caller.ovc_tCreatedDate = this.ovc_tCreatedDate;
Caller.ovc_cEventType = this.ovc_cEventType;

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
               dt.Columns.Add(new DataColumn("ovc_cDescripcion", typeof (string)));               
							 dt.Columns.Add(new DataColumn("ovc_iStatus", typeof (int)));               
							 dt.Columns.Add(new DataColumn("ovc_cDealers", typeof (string)));               
							 dt.Columns.Add(new DataColumn("ovc_cEventos", typeof (string)));               
							 dt.Columns.Add(new DataColumn("ovc_tLastUpdated", typeof (DateTime)));               
							 dt.Columns.Add(new DataColumn("ovc_tCreatedDate", typeof (DateTime)));               
							 dt.Columns.Add(new DataColumn("ovc_cEventType", typeof (string)));               
							 										
               //create Row  
               dr = dt.NewRow();
               
               //set Row
							 dr["Id"] = base.Id;

							 dr["Name"] = base.Name;
dr["ovc_cDescripcion"] = (object)this.ovc_cDescripcion ?? System.DBNull.Value;
dr["ovc_iStatus"] = (object)this.ovc_iStatus ?? System.DBNull.Value;
dr["ovc_cDealers"] = (object)this.ovc_cDealers ?? System.DBNull.Value;
dr["ovc_cEventos"] = (object)this.ovc_cEventos ?? System.DBNull.Value;
dr["ovc_tLastUpdated"] = (object)this.ovc_tLastUpdated ?? System.DBNull.Value;
dr["ovc_tCreatedDate"] = (object)this.ovc_tCreatedDate ?? System.DBNull.Value;
dr["ovc_cEventType"] = (object)this.ovc_cEventType ?? System.DBNull.Value;
							 
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
