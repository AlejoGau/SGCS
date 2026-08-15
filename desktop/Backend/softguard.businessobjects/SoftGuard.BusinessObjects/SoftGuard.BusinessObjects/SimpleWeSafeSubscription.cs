
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
    ///WeSafeSubscription Slbf Class
    ///</summary>
    [DataContract]
    public class SimpleWeSafeSubscription : SimpleBaseObject
    { 
			 ///<summary>
     ///wsu_cDealer   
     ///</summary>
	 [DataMember]
     public string wsu_cDealer { get;set;} 
	  ///<summary>
     ///wsu_cID   
     ///</summary>
	 [DataMember]
     public string wsu_cID { get;set;} 
	  ///<summary>
     ///wsu_cName   
     ///</summary>
	 [DataMember]
     public string wsu_cName { get;set;} 
	  ///<summary>
     ///wsu_cDesc   
     ///</summary>
	 [DataMember]
     public string wsu_cDesc { get;set;} 
	  ///<summary>
     ///wsu_iPriceID   
     ///</summary>
	 [DataMember]
     public int wsu_iPriceID { get;set;} 
	  ///<summary>
     ///wsu_iPeriodicityID   
     ///</summary>
	 [DataMember]
     public int wsu_iPeriodicityID { get;set;} 
	  ///<summary>
     ///wsu_tDateCreation   
     ///</summary>
	 [DataMember]
     public DateTime? wsu_tDateCreation { get;set;} 
	  ///<summary>
     ///wsu_tDateUpdateAndroid   
     ///</summary>
	 [DataMember]
     public DateTime? wsu_tDateUpdateAndroid { get;set;} 
	  ///<summary>
     ///wsu_iStatusAndroid   
     ///</summary>
	 [DataMember]
     public int wsu_iStatusAndroid { get;set;} 
	  ///<summary>
     ///wsu_tDateUpdateIOS   
     ///</summary>
	 [DataMember]
     public DateTime? wsu_tDateUpdateIOS { get;set;} 
	  ///<summary>
     ///wsu_iStatusIOS   
     ///</summary>
	 [DataMember]
     public int wsu_iStatusIOS { get;set;} 
	  ///<summary>
     ///wsu_cSubscriptionGroupIdIOS   
     ///</summary>
	 [DataMember]
     public string wsu_cSubscriptionGroupIdIOS { get;set;} 
	  ///<summary>
     ///wsu_cSubscriptionIdIOS   
     ///</summary>
	 [DataMember]
     public string wsu_cSubscriptionIdIOS { get;set;} 
	 ///<summary>
        ///WeSafeSubscription Constructor
        ///</summary>
        public SimpleWeSafeSubscription() : base()
  {
  InitClass();
  }
        ///<summary>
        ///WeSafeSubscription Constructor
        ///</summary>
        public SimpleWeSafeSubscription(int Id, string Name, string wsu_cDealer, string wsu_cID, string wsu_cName, string wsu_cDesc, int wsu_iPriceID, int wsu_iPeriodicityID, DateTime? wsu_tDateCreation, DateTime? wsu_tDateUpdateAndroid, int wsu_iStatusAndroid, DateTime? wsu_tDateUpdateIOS, int wsu_iStatusIOS, string wsu_cSubscriptionGroupIdIOS, string wsu_cSubscriptionIdIOS) : base()
        {
            base.Id = Id;
						base.Name = Name;				 																																					 
				    this.wsu_cDealer = wsu_cDealer;
this.wsu_cID = wsu_cID;
this.wsu_cName = wsu_cName;
this.wsu_cDesc = wsu_cDesc;
this.wsu_iPriceID = wsu_iPriceID;
this.wsu_iPeriodicityID = wsu_iPeriodicityID;
this.wsu_tDateCreation = wsu_tDateCreation;
this.wsu_tDateUpdateAndroid = wsu_tDateUpdateAndroid;
this.wsu_iStatusAndroid = wsu_iStatusAndroid;
this.wsu_tDateUpdateIOS = wsu_tDateUpdateIOS;
this.wsu_iStatusIOS = wsu_iStatusIOS;
this.wsu_cSubscriptionGroupIdIOS = wsu_cSubscriptionGroupIdIOS;
this.wsu_cSubscriptionIdIOS = wsu_cSubscriptionIdIOS;

            InitClass();
        }  								

				private void InitClass()
        {														
  				  base.Type = new ObjectType(7038, "WeSafeSubscription");
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
			BaseObject Object = new DalWeSafeSubscription(SqlConfig, UserId, this);
			if(this.CallerObject != null)
			   Object.CallerObject = this.CallerObject;			
			return Object;
		}
///<summary>
    ///Get parent object
    ///</summary>
		public override CallerObject GetCallerObject()
		{
			CallerWeSafeSubscription Caller = new CallerWeSafeSubscription();
			Caller.Id = base.Id;
			Caller.Name = base.Name;
			Caller.wsu_cDealer = this.wsu_cDealer;
Caller.wsu_cID = this.wsu_cID;
Caller.wsu_cName = this.wsu_cName;
Caller.wsu_cDesc = this.wsu_cDesc;
Caller.wsu_iPriceID = this.wsu_iPriceID;
Caller.wsu_iPeriodicityID = this.wsu_iPeriodicityID;
Caller.wsu_tDateCreation = this.wsu_tDateCreation;
Caller.wsu_tDateUpdateAndroid = this.wsu_tDateUpdateAndroid;
Caller.wsu_iStatusAndroid = this.wsu_iStatusAndroid;
Caller.wsu_tDateUpdateIOS = this.wsu_tDateUpdateIOS;
Caller.wsu_iStatusIOS = this.wsu_iStatusIOS;
Caller.wsu_cSubscriptionGroupIdIOS = this.wsu_cSubscriptionGroupIdIOS;
Caller.wsu_cSubscriptionIdIOS = this.wsu_cSubscriptionIdIOS;

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
               dt.Columns.Add(new DataColumn("wsu_cDealer", typeof (string)));               
							 dt.Columns.Add(new DataColumn("wsu_cID", typeof (string)));               
							 dt.Columns.Add(new DataColumn("wsu_cName", typeof (string)));               
							 dt.Columns.Add(new DataColumn("wsu_cDesc", typeof (string)));               
							 dt.Columns.Add(new DataColumn("wsu_iPriceID", typeof (int)));               
							 dt.Columns.Add(new DataColumn("wsu_iPeriodicityID", typeof (int)));               
							 dt.Columns.Add(new DataColumn("wsu_tDateCreation", typeof (DateTime)));               
							 dt.Columns.Add(new DataColumn("wsu_tDateUpdateAndroid", typeof (DateTime)));               
							 dt.Columns.Add(new DataColumn("wsu_iStatusAndroid", typeof (int)));               
							 dt.Columns.Add(new DataColumn("wsu_tDateUpdateIOS", typeof (DateTime)));               
							 dt.Columns.Add(new DataColumn("wsu_iStatusIOS", typeof (int)));               
							 dt.Columns.Add(new DataColumn("wsu_cSubscriptionGroupIdIOS", typeof (string)));               
							 dt.Columns.Add(new DataColumn("wsu_cSubscriptionIdIOS", typeof (string)));               
							 										
               //create Row  
               dr = dt.NewRow();
               
               //set Row
							 dr["Id"] = base.Id;

							 dr["Name"] = base.Name;
dr["wsu_cDealer"] = (object)this.wsu_cDealer ?? System.DBNull.Value;
dr["wsu_cID"] = (object)this.wsu_cID ?? System.DBNull.Value;
dr["wsu_cName"] = (object)this.wsu_cName ?? System.DBNull.Value;
dr["wsu_cDesc"] = (object)this.wsu_cDesc ?? System.DBNull.Value;
dr["wsu_iPriceID"] = (object)this.wsu_iPriceID ?? System.DBNull.Value;
dr["wsu_iPeriodicityID"] = (object)this.wsu_iPeriodicityID ?? System.DBNull.Value;
dr["wsu_tDateCreation"] = (object)this.wsu_tDateCreation ?? System.DBNull.Value;
dr["wsu_tDateUpdateAndroid"] = (object)this.wsu_tDateUpdateAndroid ?? System.DBNull.Value;
dr["wsu_iStatusAndroid"] = (object)this.wsu_iStatusAndroid ?? System.DBNull.Value;
dr["wsu_tDateUpdateIOS"] = (object)this.wsu_tDateUpdateIOS ?? System.DBNull.Value;
dr["wsu_iStatusIOS"] = (object)this.wsu_iStatusIOS ?? System.DBNull.Value;
dr["wsu_cSubscriptionGroupIdIOS"] = (object)this.wsu_cSubscriptionGroupIdIOS ?? System.DBNull.Value;
dr["wsu_cSubscriptionIdIOS"] = (object)this.wsu_cSubscriptionIdIOS ?? System.DBNull.Value;
							 
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
