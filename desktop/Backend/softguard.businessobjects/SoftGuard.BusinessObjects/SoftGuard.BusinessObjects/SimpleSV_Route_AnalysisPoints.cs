
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
    ///SV_Route_AnalysisPoints Slbf Class
    ///</summary>
    [DataContract]
    public class SimpleSV_Route_AnalysisPoints : SimpleBaseObject
    { 
			 ///<summary>
     ///sra_iid   
     ///</summary>
	 [DataMember]
     public int sra_iid { get;set;} 
	  ///<summary>
     ///sra_iRouteId   
     ///</summary>
	 [DataMember]
     public int sra_iRouteId { get;set;} 
	  ///<summary>
     ///sra_iAnalysisPointId   
     ///</summary>
	 [DataMember]
     public int sra_iAnalysisPointId { get;set;} 
	  ///<summary>
     ///sra_iOrder   
     ///</summary>
	 [DataMember]
     public int sra_iOrder { get;set;} 
	  ///<summary>
     ///sra_cReference   
     ///</summary>
	 [DataMember]
     public string sra_cReference { get;set;} 
	  ///<summary>
     ///sra_cCameraType   
     ///</summary>
	 [DataMember]
     public string sra_cCameraType { get;set;} 
	  ///<summary>
     ///sra_iCameraRefId   
     ///</summary>
	 [DataMember]
     public int sra_iCameraRefId { get;set;} 
	  ///<summary>
     ///sra_cConfig   
     ///</summary>
	 [DataMember]
     public string sra_cConfig { get;set;} 
	 ///<summary>
        ///SV_Route_AnalysisPoints Constructor
        ///</summary>
        public SimpleSV_Route_AnalysisPoints() : base()
  {
  InitClass();
  }
        ///<summary>
        ///SV_Route_AnalysisPoints Constructor
        ///</summary>
        public SimpleSV_Route_AnalysisPoints(int Id, string Name, int sra_iid, int sra_iRouteId, int sra_iAnalysisPointId, int sra_iOrder, string sra_cReference, string sra_cCameraType, int sra_iCameraRefId, string sra_cConfig) : base()
        {
            base.Id = Id;
						base.Name = Name;				 																																					 
				    this.sra_iid = sra_iid;
this.sra_iRouteId = sra_iRouteId;
this.sra_iAnalysisPointId = sra_iAnalysisPointId;
this.sra_iOrder = sra_iOrder;
this.sra_cReference = sra_cReference;
this.sra_cCameraType = sra_cCameraType;
this.sra_iCameraRefId = sra_iCameraRefId;
this.sra_cConfig = sra_cConfig;

            InitClass();
        }  								

				private void InitClass()
        {														
  				  base.Type = new ObjectType(3302, "SV_Route_AnalysisPoints");
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
			BaseObject Object = new DalSV_Route_AnalysisPoints(SqlConfig, UserId, this);
			if(this.CallerObject != null)
			   Object.CallerObject = this.CallerObject;			
			return Object;
		}
///<summary>
    ///Get parent object
    ///</summary>
		public override CallerObject GetCallerObject()
		{
			CallerSV_Route_AnalysisPoints Caller = new CallerSV_Route_AnalysisPoints();
			Caller.Id = base.Id;
			Caller.Name = base.Name;
			Caller.sra_iid = this.sra_iid;
Caller.sra_iRouteId = this.sra_iRouteId;
Caller.sra_iAnalysisPointId = this.sra_iAnalysisPointId;
Caller.sra_iOrder = this.sra_iOrder;
Caller.sra_cReference = this.sra_cReference;
Caller.sra_cCameraType = this.sra_cCameraType;
Caller.sra_iCameraRefId = this.sra_iCameraRefId;
Caller.sra_cConfig = this.sra_cConfig;

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
               dt.Columns.Add(new DataColumn("sra_iid", typeof (int)));               
							 dt.Columns.Add(new DataColumn("sra_iRouteId", typeof (int)));               
							 dt.Columns.Add(new DataColumn("sra_iAnalysisPointId", typeof (int)));               
							 dt.Columns.Add(new DataColumn("sra_iOrder", typeof (int)));               
							 dt.Columns.Add(new DataColumn("sra_cReference", typeof (string)));               
							 dt.Columns.Add(new DataColumn("sra_cCameraType", typeof (string)));               
							 dt.Columns.Add(new DataColumn("sra_iCameraRefId", typeof (int)));               
							 dt.Columns.Add(new DataColumn("sra_cConfig", typeof (string)));               
							 										
               //create Row  
               dr = dt.NewRow();
               
               //set Row
							 dr["Id"] = base.Id;

							 dr["Name"] = base.Name;
dr["sra_iid"] = (object)this.sra_iid ?? System.DBNull.Value;
dr["sra_iRouteId"] = (object)this.sra_iRouteId ?? System.DBNull.Value;
dr["sra_iAnalysisPointId"] = (object)this.sra_iAnalysisPointId ?? System.DBNull.Value;
dr["sra_iOrder"] = (object)this.sra_iOrder ?? System.DBNull.Value;
dr["sra_cReference"] = (object)this.sra_cReference ?? System.DBNull.Value;
dr["sra_cCameraType"] = (object)this.sra_cCameraType ?? System.DBNull.Value;
dr["sra_iCameraRefId"] = (object)this.sra_iCameraRefId ?? System.DBNull.Value;
dr["sra_cConfig"] = (object)this.sra_cConfig ?? System.DBNull.Value;
							 
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
