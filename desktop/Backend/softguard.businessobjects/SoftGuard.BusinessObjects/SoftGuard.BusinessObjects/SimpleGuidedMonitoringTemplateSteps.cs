
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
    ///GuidedMonitoringTemplateSteps Slbf Class
    ///</summary>
    [DataContract]
    public class SimpleGuidedMonitoringTemplateSteps : SimpleBaseObject
    { 
			 ///<summary>
     ///gms_iTemplateID   
     ///</summary>
	 [DataMember]
     public int gms_iTemplateID { get;set;} 
	  ///<summary>
     ///gms_iStepNumber   
     ///</summary>
	 [DataMember]
     public int gms_iStepNumber { get;set;} 
	  ///<summary>
     ///gms_iStepID   
     ///</summary>
	 [DataMember]
     public int gms_iStepID { get;set;} 
	  ///<summary>
     ///gms_cToolTip   
     ///</summary>
	 [DataMember]
     public string gms_cToolTip { get;set;} 
	  ///<summary>
     ///gms_cText   
     ///</summary>
	 [DataMember]
     public string gms_cText { get;set;} 
	  ///<summary>
     ///gms_cListID   
     ///</summary>
	 [DataMember]
     public string gms_cListID { get;set;} 
	 ///<summary>
        ///GuidedMonitoringTemplateSteps Constructor
        ///</summary>
        public SimpleGuidedMonitoringTemplateSteps() : base()
  {
  InitClass();
  }
        ///<summary>
        ///GuidedMonitoringTemplateSteps Constructor
        ///</summary>
        public SimpleGuidedMonitoringTemplateSteps(int Id, string Name, int gms_iTemplateID, int gms_iStepNumber, int gms_iStepID, string gms_cToolTip, string gms_cText, string gms_cListID) : base()
        {
            base.Id = Id;
						base.Name = Name;				 																																					 
				    this.gms_iTemplateID = gms_iTemplateID;
this.gms_iStepNumber = gms_iStepNumber;
this.gms_iStepID = gms_iStepID;
this.gms_cToolTip = gms_cToolTip;
this.gms_cText = gms_cText;
this.gms_cListID = gms_cListID;

            InitClass();
        }  								

				private void InitClass()
        {														
  				  base.Type = new ObjectType(7045, "GuidedMonitoringTemplateSteps");
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
			BaseObject Object = new DalGuidedMonitoringTemplateSteps(SqlConfig, UserId, this);
			if(this.CallerObject != null)
			   Object.CallerObject = this.CallerObject;			
			return Object;
		}
///<summary>
    ///Get parent object
    ///</summary>
		public override CallerObject GetCallerObject()
		{
			CallerGuidedMonitoringTemplateSteps Caller = new CallerGuidedMonitoringTemplateSteps();
			Caller.Id = base.Id;
			Caller.Name = base.Name;
			Caller.gms_iTemplateID = this.gms_iTemplateID;
Caller.gms_iStepNumber = this.gms_iStepNumber;
Caller.gms_iStepID = this.gms_iStepID;
Caller.gms_cToolTip = this.gms_cToolTip;
Caller.gms_cText = this.gms_cText;
Caller.gms_cListID = this.gms_cListID;

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
               dt.Columns.Add(new DataColumn("gms_iTemplateID", typeof (int)));               
							 dt.Columns.Add(new DataColumn("gms_iStepNumber", typeof (int)));               
							 dt.Columns.Add(new DataColumn("gms_iStepID", typeof (int)));               
							 dt.Columns.Add(new DataColumn("gms_cToolTip", typeof (string)));               
							 dt.Columns.Add(new DataColumn("gms_cText", typeof (string)));               
							 dt.Columns.Add(new DataColumn("gms_cListID", typeof (string)));               
							 										
               //create Row  
               dr = dt.NewRow();
               
               //set Row
							 dr["Id"] = base.Id;

							 dr["Name"] = base.Name;
dr["gms_iTemplateID"] = (object)this.gms_iTemplateID ?? System.DBNull.Value;
dr["gms_iStepNumber"] = (object)this.gms_iStepNumber ?? System.DBNull.Value;
dr["gms_iStepID"] = (object)this.gms_iStepID ?? System.DBNull.Value;
dr["gms_cToolTip"] = (object)this.gms_cToolTip ?? System.DBNull.Value;
dr["gms_cText"] = (object)this.gms_cText ?? System.DBNull.Value;
dr["gms_cListID"] = (object)this.gms_cListID ?? System.DBNull.Value;
							 
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
