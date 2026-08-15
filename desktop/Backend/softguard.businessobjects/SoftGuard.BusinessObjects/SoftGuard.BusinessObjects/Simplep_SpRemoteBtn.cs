
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
    ///p_SpRemoteBtn Slbf Class
    ///</summary>
    [DataContract]
    public class Simplep_SpRemoteBtn : SimpleBaseObject
    { 
			 ///<summary>
     ///srb_spimei   
     ///</summary>
	 [DataMember]
     public string srb_spimei { get;set;} 
	  ///<summary>
     ///srb_button_uuid   
     ///</summary>
	 [DataMember]
     public string srb_button_uuid { get;set;} 
	  ///<summary>
     ///srb_action   
     ///</summary>
	 [DataMember]
     public string srb_action { get;set;} 
	 ///<summary>
        ///p_SpRemoteBtn Constructor
        ///</summary>
        public Simplep_SpRemoteBtn() : base()
  {
  InitClass();
  }
        ///<summary>
        ///p_SpRemoteBtn Constructor
        ///</summary>
        public Simplep_SpRemoteBtn(int Id, string Name, string srb_spimei, string srb_button_uuid, string srb_action) : base()
        {
            base.Id = Id;
						base.Name = Name;				 																																					 
				    this.srb_spimei = srb_spimei;
this.srb_button_uuid = srb_button_uuid;
this.srb_action = srb_action;

            InitClass();
        }  								

				private void InitClass()
        {														
  				  base.Type = new ObjectType(3195, "p_SpRemoteBtn");
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
			BaseObject Object = new Dalp_SpRemoteBtn(SqlConfig, UserId, this);
			if(this.CallerObject != null)
			   Object.CallerObject = this.CallerObject;			
			return Object;
		}
///<summary>
    ///Get parent object
    ///</summary>
		public override CallerObject GetCallerObject()
		{
			Callerp_SpRemoteBtn Caller = new Callerp_SpRemoteBtn();
			Caller.Id = base.Id;
			Caller.Name = base.Name;
			Caller.srb_spimei = this.srb_spimei;
Caller.srb_button_uuid = this.srb_button_uuid;
Caller.srb_action = this.srb_action;

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
               dt.Columns.Add(new DataColumn("srb_spimei", typeof (string)));               
							 dt.Columns.Add(new DataColumn("srb_button_uuid", typeof (string)));               
							 dt.Columns.Add(new DataColumn("srb_action", typeof (string)));               
							 										
               //create Row  
               dr = dt.NewRow();
               
               //set Row
							 dr["Id"] = base.Id;

							 dr["Name"] = base.Name;
dr["srb_spimei"] = (object)this.srb_spimei ?? System.DBNull.Value;
dr["srb_button_uuid"] = (object)this.srb_button_uuid ?? System.DBNull.Value;
dr["srb_action"] = (object)this.srb_action ?? System.DBNull.Value;
							 
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
