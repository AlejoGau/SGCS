
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
    ///GuidedMonitoringTemplate Slbf Class
    ///</summary>
    [DataContract]
    public class SimpleGuidedMonitoringTemplate : SimpleBaseObject
    { 
			 ///<summary>
     ///gmt_cTemplateName   
     ///</summary>
	 [DataMember]
     public string gmt_cTemplateName { get;set;} 
	  ///<summary>
     ///gmt_cDesc   
     ///</summary>
	 [DataMember]
     public string gmt_cDesc { get;set;} 
	 ///<summary>
        ///GuidedMonitoringTemplate Constructor
        ///</summary>
        public SimpleGuidedMonitoringTemplate() : base()
  {
  InitClass();
  }
        ///<summary>
        ///GuidedMonitoringTemplate Constructor
        ///</summary>
        public SimpleGuidedMonitoringTemplate(int Id, string Name, string gmt_cTemplateName, string gmt_cDesc) : base()
        {
            base.Id = Id;
						base.Name = Name;				 																																					 
				    this.gmt_cTemplateName = gmt_cTemplateName;
this.gmt_cDesc = gmt_cDesc;

            InitClass();
        }  								

				private void InitClass()
        {														
  				  base.Type = new ObjectType(7043, "GuidedMonitoringTemplate");
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
			BaseObject Object = new DalGuidedMonitoringTemplate(SqlConfig, UserId, this);
			if(this.CallerObject != null)
			   Object.CallerObject = this.CallerObject;			
			return Object;
		}
///<summary>
    ///Get parent object
    ///</summary>
		public override CallerObject GetCallerObject()
		{
			CallerGuidedMonitoringTemplate Caller = new CallerGuidedMonitoringTemplate();
			Caller.Id = base.Id;
			Caller.Name = base.Name;
			Caller.gmt_cTemplateName = this.gmt_cTemplateName;
Caller.gmt_cDesc = this.gmt_cDesc;

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
               dt.Columns.Add(new DataColumn("gmt_cTemplateName", typeof (string)));               
							 dt.Columns.Add(new DataColumn("gmt_cDesc", typeof (string)));               
							 										
               //create Row  
               dr = dt.NewRow();
               
               //set Row
							 dr["Id"] = base.Id;

							 dr["Name"] = base.Name;
dr["gmt_cTemplateName"] = (object)this.gmt_cTemplateName ?? System.DBNull.Value;
dr["gmt_cDesc"] = (object)this.gmt_cDesc ?? System.DBNull.Value;
							 
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
