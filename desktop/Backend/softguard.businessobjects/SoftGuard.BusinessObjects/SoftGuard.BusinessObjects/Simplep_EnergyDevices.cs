
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
    ///p_EnergyDevices Slbf Class
    ///</summary>
    [DataContract]
    public class Simplep_EnergyDevices : SimpleBaseObject
    { 
			 ///<summary>
     ///ped_idCta   
     ///</summary>
	 [DataMember]
     public int ped_idCta { get;set;} 
	  ///<summary>
     ///ped_cUri   
     ///</summary>
	 [DataMember]
     public string ped_cUri { get;set;} 
	  ///<summary>
     ///ped_cDeviceID   
     ///</summary>
	 [DataMember]
     public string ped_cDeviceID { get;set;} 
	  ///<summary>
     ///ped_cLabel   
     ///</summary>
	 [DataMember]
     public string ped_cLabel { get;set;} 
	  ///<summary>
     ///ped_cName   
     ///</summary>
	 [DataMember]
     public string ped_cName { get;set;} 
	  ///<summary>
     ///ped_tCreatedAt   
     ///</summary>
	 [DataMember]
     public DateTime? ped_tCreatedAt { get;set;} 
	  ///<summary>
     ///ped_iVarCount   
     ///</summary>
	 [DataMember]
     public int ped_iVarCount { get;set;} 
	  ///<summary>
     ///ped_cLastActivity   
     ///</summary>
	 [DataMember]
     public string ped_cLastActivity { get;set;} 
	 ///<summary>
        ///p_EnergyDevices Constructor
        ///</summary>
        public Simplep_EnergyDevices() : base()
  {
  InitClass();
  }
        ///<summary>
        ///p_EnergyDevices Constructor
        ///</summary>
        public Simplep_EnergyDevices(int Id, string Name, int ped_idCta, string ped_cUri, string ped_cDeviceID, string ped_cLabel, string ped_cName, DateTime? ped_tCreatedAt, int ped_iVarCount, string ped_cLastActivity) : base()
        {
            base.Id = Id;
						base.Name = Name;				 																																					 
				    this.ped_idCta = ped_idCta;
this.ped_cUri = ped_cUri;
this.ped_cDeviceID = ped_cDeviceID;
this.ped_cLabel = ped_cLabel;
this.ped_cName = ped_cName;
this.ped_tCreatedAt = ped_tCreatedAt;
this.ped_iVarCount = ped_iVarCount;
this.ped_cLastActivity = ped_cLastActivity;

            InitClass();
        }  								

				private void InitClass()
        {														
  				  base.Type = new ObjectType(7029, "p_EnergyDevices");
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
			BaseObject Object = new Dalp_EnergyDevices(SqlConfig, UserId, this);
			if(this.CallerObject != null)
			   Object.CallerObject = this.CallerObject;			
			return Object;
		}
///<summary>
    ///Get parent object
    ///</summary>
		public override CallerObject GetCallerObject()
		{
			Callerp_EnergyDevices Caller = new Callerp_EnergyDevices();
			Caller.Id = base.Id;
			Caller.Name = base.Name;
			Caller.ped_idCta = this.ped_idCta;
Caller.ped_cUri = this.ped_cUri;
Caller.ped_cDeviceID = this.ped_cDeviceID;
Caller.ped_cLabel = this.ped_cLabel;
Caller.ped_cName = this.ped_cName;
Caller.ped_tCreatedAt = this.ped_tCreatedAt;
Caller.ped_iVarCount = this.ped_iVarCount;
Caller.ped_cLastActivity = this.ped_cLastActivity;

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
               dt.Columns.Add(new DataColumn("ped_idCta", typeof (int)));               
							 dt.Columns.Add(new DataColumn("ped_cUri", typeof (string)));               
							 dt.Columns.Add(new DataColumn("ped_cDeviceID", typeof (string)));               
							 dt.Columns.Add(new DataColumn("ped_cLabel", typeof (string)));               
							 dt.Columns.Add(new DataColumn("ped_cName", typeof (string)));               
							 dt.Columns.Add(new DataColumn("ped_tCreatedAt", typeof (DateTime)));               
							 dt.Columns.Add(new DataColumn("ped_iVarCount", typeof (int)));               
							 dt.Columns.Add(new DataColumn("ped_cLastActivity", typeof (string)));               
							 										
               //create Row  
               dr = dt.NewRow();
               
               //set Row
							 dr["Id"] = base.Id;

							 dr["Name"] = base.Name;
dr["ped_idCta"] = (object)this.ped_idCta ?? System.DBNull.Value;
dr["ped_cUri"] = (object)this.ped_cUri ?? System.DBNull.Value;
dr["ped_cDeviceID"] = (object)this.ped_cDeviceID ?? System.DBNull.Value;
dr["ped_cLabel"] = (object)this.ped_cLabel ?? System.DBNull.Value;
dr["ped_cName"] = (object)this.ped_cName ?? System.DBNull.Value;
dr["ped_tCreatedAt"] = (object)this.ped_tCreatedAt ?? System.DBNull.Value;
dr["ped_iVarCount"] = (object)this.ped_iVarCount ?? System.DBNull.Value;
dr["ped_cLastActivity"] = (object)this.ped_cLastActivity ?? System.DBNull.Value;
							 
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
