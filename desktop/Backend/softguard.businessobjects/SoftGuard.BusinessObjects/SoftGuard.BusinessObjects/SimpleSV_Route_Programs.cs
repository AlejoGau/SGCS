
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
    ///SV_Route_Programs Slbf Class
    ///</summary>
    [DataContract]
    public class SimpleSV_Route_Programs : SimpleBaseObject
    { 
			 ///<summary>
     ///srp_iid   
     ///</summary>
	 [DataMember]
     public int srp_iid { get;set;} 
	  ///<summary>
     ///srp_iRouteId   
     ///</summary>
	 [DataMember]
     public int srp_iRouteId { get;set;} 
	  ///<summary>
     ///srp_cProgramType   
     ///</summary>
	 [DataMember]
     public string srp_cProgramType { get;set;} 
	  ///<summary>
     ///srp_iStartHour   
     ///</summary>
	 [DataMember]
     public int srp_iStartHour { get;set;} 
	  ///<summary>
     ///srp_iStartMinutes   
     ///</summary>
	 [DataMember]
     public int srp_iStartMinutes { get;set;} 
	  ///<summary>
     ///srp_iDayOfWeek   
     ///</summary>
	 [DataMember]
     public int srp_iDayOfWeek { get;set;} 
	  ///<summary>
     ///srp_iDayOfMonth   
     ///</summary>
	 [DataMember]
     public int srp_iDayOfMonth { get;set;} 
	 ///<summary>
        ///SV_Route_Programs Constructor
        ///</summary>
        public SimpleSV_Route_Programs() : base()
  {
  InitClass();
  }
        ///<summary>
        ///SV_Route_Programs Constructor
        ///</summary>
        public SimpleSV_Route_Programs(int Id, string Name, int srp_iid, int srp_iRouteId, string srp_cProgramType, int srp_iStartHour, int srp_iStartMinutes, int srp_iDayOfWeek, int srp_iDayOfMonth) : base()
        {
            base.Id = Id;
						base.Name = Name;				 																																					 
				    this.srp_iid = srp_iid;
this.srp_iRouteId = srp_iRouteId;
this.srp_cProgramType = srp_cProgramType;
this.srp_iStartHour = srp_iStartHour;
this.srp_iStartMinutes = srp_iStartMinutes;
this.srp_iDayOfWeek = srp_iDayOfWeek;
this.srp_iDayOfMonth = srp_iDayOfMonth;

            InitClass();
        }  								

				private void InitClass()
        {														
  				  base.Type = new ObjectType(3303, "SV_Route_Programs");
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
			BaseObject Object = new DalSV_Route_Programs(SqlConfig, UserId, this);
			if(this.CallerObject != null)
			   Object.CallerObject = this.CallerObject;			
			return Object;
		}
///<summary>
    ///Get parent object
    ///</summary>
		public override CallerObject GetCallerObject()
		{
			CallerSV_Route_Programs Caller = new CallerSV_Route_Programs();
			Caller.Id = base.Id;
			Caller.Name = base.Name;
			Caller.srp_iid = this.srp_iid;
Caller.srp_iRouteId = this.srp_iRouteId;
Caller.srp_cProgramType = this.srp_cProgramType;
Caller.srp_iStartHour = this.srp_iStartHour;
Caller.srp_iStartMinutes = this.srp_iStartMinutes;
Caller.srp_iDayOfWeek = this.srp_iDayOfWeek;
Caller.srp_iDayOfMonth = this.srp_iDayOfMonth;

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
               dt.Columns.Add(new DataColumn("srp_iid", typeof (int)));               
							 dt.Columns.Add(new DataColumn("srp_iRouteId", typeof (int)));               
							 dt.Columns.Add(new DataColumn("srp_cProgramType", typeof (string)));               
							 dt.Columns.Add(new DataColumn("srp_iStartHour", typeof (int)));               
							 dt.Columns.Add(new DataColumn("srp_iStartMinutes", typeof (int)));               
							 dt.Columns.Add(new DataColumn("srp_iDayOfWeek", typeof (int)));               
							 dt.Columns.Add(new DataColumn("srp_iDayOfMonth", typeof (int)));               
							 										
               //create Row  
               dr = dt.NewRow();
               
               //set Row
							 dr["Id"] = base.Id;

							 dr["Name"] = base.Name;
dr["srp_iid"] = (object)this.srp_iid ?? System.DBNull.Value;
dr["srp_iRouteId"] = (object)this.srp_iRouteId ?? System.DBNull.Value;
dr["srp_cProgramType"] = (object)this.srp_cProgramType ?? System.DBNull.Value;
dr["srp_iStartHour"] = (object)this.srp_iStartHour ?? System.DBNull.Value;
dr["srp_iStartMinutes"] = (object)this.srp_iStartMinutes ?? System.DBNull.Value;
dr["srp_iDayOfWeek"] = (object)this.srp_iDayOfWeek ?? System.DBNull.Value;
dr["srp_iDayOfMonth"] = (object)this.srp_iDayOfMonth ?? System.DBNull.Value;
							 
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
