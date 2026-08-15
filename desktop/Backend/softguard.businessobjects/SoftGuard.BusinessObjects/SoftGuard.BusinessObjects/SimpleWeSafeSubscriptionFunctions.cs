
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
    ///WeSafeSubscriptionFunctions Slbf Class
    ///</summary>
    [DataContract]
    public class SimpleWeSafeSubscriptionFunctions : SimpleBaseObject
    { 
			 ///<summary>
     ///wsf_idKey   
     ///</summary>
	 [DataMember]
     public int wsf_idKey { get;set;} 
	  ///<summary>
     ///wsf_iSubscriptionID   
     ///</summary>
	 [DataMember]
     public int wsf_iSubscriptionID { get;set;} 
	  ///<summary>
     ///wsf_iFunctionID   
     ///</summary>
	 [DataMember]
     public int wsf_iFunctionID { get;set;} 
	  ///<summary>
     ///wsu_iSelected   
     ///</summary>
	 [DataMember]
     public int wsu_iSelected { get;set;} 
	 ///<summary>
        ///WeSafeSubscriptionFunctions Constructor
        ///</summary>
        public SimpleWeSafeSubscriptionFunctions() : base()
  {
  InitClass();
  }
        ///<summary>
        ///WeSafeSubscriptionFunctions Constructor
        ///</summary>
        public SimpleWeSafeSubscriptionFunctions(int Id, string Name, int wsf_idKey, int wsf_iSubscriptionID, int wsf_iFunctionID, int wsu_iSelected) : base()
        {
            base.Id = Id;
						base.Name = Name;				 																																					 
				    this.wsf_idKey = wsf_idKey;
this.wsf_iSubscriptionID = wsf_iSubscriptionID;
this.wsf_iFunctionID = wsf_iFunctionID;
this.wsu_iSelected = wsu_iSelected;

            InitClass();
        }  								

				private void InitClass()
        {														
  				  base.Type = new ObjectType(7041, "WeSafeSubscriptionFunctions");
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
			BaseObject Object = new DalWeSafeSubscriptionFunctions(SqlConfig, UserId, this);
			if(this.CallerObject != null)
			   Object.CallerObject = this.CallerObject;			
			return Object;
		}
///<summary>
    ///Get parent object
    ///</summary>
		public override CallerObject GetCallerObject()
		{
			CallerWeSafeSubscriptionFunctions Caller = new CallerWeSafeSubscriptionFunctions();
			Caller.Id = base.Id;
			Caller.Name = base.Name;
			Caller.wsf_idKey = this.wsf_idKey;
Caller.wsf_iSubscriptionID = this.wsf_iSubscriptionID;
Caller.wsf_iFunctionID = this.wsf_iFunctionID;
Caller.wsu_iSelected = this.wsu_iSelected;

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
               dt.Columns.Add(new DataColumn("wsf_idKey", typeof (int)));               
							 dt.Columns.Add(new DataColumn("wsf_iSubscriptionID", typeof (int)));               
							 dt.Columns.Add(new DataColumn("wsf_iFunctionID", typeof (int)));               
							 dt.Columns.Add(new DataColumn("wsu_iSelected", typeof (int)));               
							 										
               //create Row  
               dr = dt.NewRow();
               
               //set Row
							 dr["Id"] = base.Id;

							 dr["Name"] = base.Name;
dr["wsf_idKey"] = (object)this.wsf_idKey ?? System.DBNull.Value;
dr["wsf_iSubscriptionID"] = (object)this.wsf_iSubscriptionID ?? System.DBNull.Value;
dr["wsf_iFunctionID"] = (object)this.wsf_iFunctionID ?? System.DBNull.Value;
dr["wsu_iSelected"] = (object)this.wsu_iSelected ?? System.DBNull.Value;
							 
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
