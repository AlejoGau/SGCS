
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
    ///WeSafeConfig Slbf Class
    ///</summary>
    [DataContract]
    public class SimpleWeSafeConfig : SimpleBaseObject
    { 
			 ///<summary>
     ///wcf_cDealer   
     ///</summary>
	 [DataMember]
     public string wcf_cDealer { get;set;} 
	  ///<summary>
     ///wcf_cEndPointAppStore   
     ///</summary>
	 [DataMember]
     public string wcf_cEndPointAppStore { get;set;} 
	  ///<summary>
     ///wcf_cMailGoogleStore   
     ///</summary>
	 [DataMember]
     public string wcf_cMailGoogleStore { get;set;} 
	  ///<summary>
     ///wcf_cAppNameAppStore   
     ///</summary>
	 [DataMember]
     public string wcf_cAppNameAppStore { get;set;} 
	  ///<summary>
     ///wcf_cIssuerID   
     ///</summary>
	 [DataMember]
     public string wcf_cIssuerID { get;set;} 
	  ///<summary>
     ///wcf_cKeyIdAppStore   
     ///</summary>
	 [DataMember]
     public string wcf_cKeyIdAppStore { get;set;} 
	  ///<summary>
     ///wcf_cAppNameGoogleStore   
     ///</summary>
	 [DataMember]
     public string wcf_cAppNameGoogleStore { get;set;} 
	  ///<summary>
     ///wcf_cEndPointGooglePlay   
     ///</summary>
	 [DataMember]
     public string wcf_cEndPointGooglePlay { get;set;} 
	  ///<summary>
     ///wcf_cPrivateKeyAppStore   
     ///</summary>
	 [DataMember]
     public string wcf_cPrivateKeyAppStore { get;set;} 
	  ///<summary>
     ///wcf_cPrivateKeyGoogleStore   
     ///</summary>
	 [DataMember]
     public string wcf_cPrivateKeyGoogleStore { get;set;} 
	  ///<summary>
     ///idsPublicidad   
     ///</summary>
	 [DataMember]
     public string idsPublicidad { get;set;} 
	 ///<summary>
        ///WeSafeConfig Constructor
        ///</summary>
        public SimpleWeSafeConfig() : base()
  {
  InitClass();
  }
        ///<summary>
        ///WeSafeConfig Constructor
        ///</summary>
        public SimpleWeSafeConfig(int Id, string Name, string wcf_cDealer, string wcf_cEndPointAppStore, string wcf_cMailGoogleStore, string wcf_cAppNameAppStore, string wcf_cIssuerID, string wcf_cKeyIdAppStore, string wcf_cAppNameGoogleStore, string wcf_cEndPointGooglePlay, string wcf_cPrivateKeyAppStore, string wcf_cPrivateKeyGoogleStore, string idsPublicidad) : base()
        {
            base.Id = Id;
						base.Name = Name;				 																																					 
				    this.wcf_cDealer = wcf_cDealer;
this.wcf_cEndPointAppStore = wcf_cEndPointAppStore;
this.wcf_cMailGoogleStore = wcf_cMailGoogleStore;
this.wcf_cAppNameAppStore = wcf_cAppNameAppStore;
this.wcf_cIssuerID = wcf_cIssuerID;
this.wcf_cKeyIdAppStore = wcf_cKeyIdAppStore;
this.wcf_cAppNameGoogleStore = wcf_cAppNameGoogleStore;
this.wcf_cEndPointGooglePlay = wcf_cEndPointGooglePlay;
this.wcf_cPrivateKeyAppStore = wcf_cPrivateKeyAppStore;
this.wcf_cPrivateKeyGoogleStore = wcf_cPrivateKeyGoogleStore;
this.idsPublicidad = idsPublicidad;

            InitClass();
        }  								

				private void InitClass()
        {														
  				  base.Type = new ObjectType(7037, "WeSafeConfig");
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
			BaseObject Object = new DalWeSafeConfig(SqlConfig, UserId, this);
			if(this.CallerObject != null)
			   Object.CallerObject = this.CallerObject;			
			return Object;
		}
///<summary>
    ///Get parent object
    ///</summary>
		public override CallerObject GetCallerObject()
		{
			CallerWeSafeConfig Caller = new CallerWeSafeConfig();
			Caller.Id = base.Id;
			Caller.Name = base.Name;
			Caller.wcf_cDealer = this.wcf_cDealer;
Caller.wcf_cEndPointAppStore = this.wcf_cEndPointAppStore;
Caller.wcf_cMailGoogleStore = this.wcf_cMailGoogleStore;
Caller.wcf_cAppNameAppStore = this.wcf_cAppNameAppStore;
Caller.wcf_cIssuerID = this.wcf_cIssuerID;
Caller.wcf_cKeyIdAppStore = this.wcf_cKeyIdAppStore;
Caller.wcf_cAppNameGoogleStore = this.wcf_cAppNameGoogleStore;
Caller.wcf_cEndPointGooglePlay = this.wcf_cEndPointGooglePlay;
Caller.wcf_cPrivateKeyAppStore = this.wcf_cPrivateKeyAppStore;
Caller.wcf_cPrivateKeyGoogleStore = this.wcf_cPrivateKeyGoogleStore;
Caller.idsPublicidad = this.idsPublicidad;

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
               dt.Columns.Add(new DataColumn("wcf_cDealer", typeof (string)));               
							 dt.Columns.Add(new DataColumn("wcf_cEndPointAppStore", typeof (string)));               
							 dt.Columns.Add(new DataColumn("wcf_cMailGoogleStore", typeof (string)));               
							 dt.Columns.Add(new DataColumn("wcf_cAppNameAppStore", typeof (string)));               
							 dt.Columns.Add(new DataColumn("wcf_cIssuerID", typeof (string)));               
							 dt.Columns.Add(new DataColumn("wcf_cKeyIdAppStore", typeof (string)));               
							 dt.Columns.Add(new DataColumn("wcf_cAppNameGoogleStore", typeof (string)));               
							 dt.Columns.Add(new DataColumn("wcf_cEndPointGooglePlay", typeof (string)));               
							 dt.Columns.Add(new DataColumn("wcf_cPrivateKeyAppStore", typeof (string)));               
							 dt.Columns.Add(new DataColumn("wcf_cPrivateKeyGoogleStore", typeof (string)));               
							 dt.Columns.Add(new DataColumn("idsPublicidad", typeof (string)));               
							 										
               //create Row  
               dr = dt.NewRow();
               
               //set Row
							 dr["Id"] = base.Id;

							 dr["Name"] = base.Name;
dr["wcf_cDealer"] = (object)this.wcf_cDealer ?? System.DBNull.Value;
dr["wcf_cEndPointAppStore"] = (object)this.wcf_cEndPointAppStore ?? System.DBNull.Value;
dr["wcf_cMailGoogleStore"] = (object)this.wcf_cMailGoogleStore ?? System.DBNull.Value;
dr["wcf_cAppNameAppStore"] = (object)this.wcf_cAppNameAppStore ?? System.DBNull.Value;
dr["wcf_cIssuerID"] = (object)this.wcf_cIssuerID ?? System.DBNull.Value;
dr["wcf_cKeyIdAppStore"] = (object)this.wcf_cKeyIdAppStore ?? System.DBNull.Value;
dr["wcf_cAppNameGoogleStore"] = (object)this.wcf_cAppNameGoogleStore ?? System.DBNull.Value;
dr["wcf_cEndPointGooglePlay"] = (object)this.wcf_cEndPointGooglePlay ?? System.DBNull.Value;
dr["wcf_cPrivateKeyAppStore"] = (object)this.wcf_cPrivateKeyAppStore ?? System.DBNull.Value;
dr["wcf_cPrivateKeyGoogleStore"] = (object)this.wcf_cPrivateKeyGoogleStore ?? System.DBNull.Value;
dr["idsPublicidad"] = (object)this.idsPublicidad ?? System.DBNull.Value;
							 
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
