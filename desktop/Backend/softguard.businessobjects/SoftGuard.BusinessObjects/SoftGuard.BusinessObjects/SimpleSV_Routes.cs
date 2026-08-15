
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
    ///SV_Routes Slbf Class
    ///</summary>
    [DataContract]
    public class SimpleSV_Routes : SimpleBaseObject
    { 
			 ///<summary>
     ///svr_iid   
     ///</summary>
	 [DataMember]
     public int svr_iid { get;set;} 
	  ///<summary>
     ///svr_iCuentaId   
     ///</summary>
	 [DataMember]
     public int svr_iCuentaId { get;set;} 
	  ///<summary>
     ///svr_cName   
     ///</summary>
	 [DataMember]
     public string svr_cName { get;set;} 
	  ///<summary>
     ///svr_cDescripcion   
     ///</summary>
	 [DataMember]
     public string svr_cDescripcion { get;set;} 
	  ///<summary>
     ///svr_cRouteType   
     ///</summary>
	 [DataMember]
     public string svr_cRouteType { get;set;} 
	  ///<summary>
     ///svr_dDateStart   
     ///</summary>
	 [DataMember]
     public DateTime? svr_dDateStart { get;set;} 
	  ///<summary>
     ///svr_iParallel   
     ///</summary>
	 [DataMember]
     public int svr_iParallel { get;set;} 
	 ///<summary>
        ///SV_Routes Constructor
        ///</summary>
        public SimpleSV_Routes() : base()
  {
  InitClass();
  }
        ///<summary>
        ///SV_Routes Constructor
        ///</summary>
        public SimpleSV_Routes(int Id, string Name, int svr_iid, int svr_iCuentaId, string svr_cName, string svr_cDescripcion, string svr_cRouteType, DateTime? svr_dDateStart, int svr_iParallel) : base()
        {
            base.Id = Id;
						base.Name = Name;				 																																					 
				    this.svr_iid = svr_iid;
this.svr_iCuentaId = svr_iCuentaId;
this.svr_cName = svr_cName;
this.svr_cDescripcion = svr_cDescripcion;
this.svr_cRouteType = svr_cRouteType;
this.svr_dDateStart = svr_dDateStart;
this.svr_iParallel = svr_iParallel;

            InitClass();
        }  								

				private void InitClass()
        {														
  				  base.Type = new ObjectType(3301, "SV_Routes");
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
			BaseObject Object = new DalSV_Routes(SqlConfig, UserId, this);
			if(this.CallerObject != null)
			   Object.CallerObject = this.CallerObject;			
			return Object;
		}
///<summary>
    ///Get parent object
    ///</summary>
		public override CallerObject GetCallerObject()
		{
			CallerSV_Routes Caller = new CallerSV_Routes();
			Caller.Id = base.Id;
			Caller.Name = base.Name;
			Caller.svr_iid = this.svr_iid;
Caller.svr_iCuentaId = this.svr_iCuentaId;
Caller.svr_cName = this.svr_cName;
Caller.svr_cDescripcion = this.svr_cDescripcion;
Caller.svr_cRouteType = this.svr_cRouteType;
Caller.svr_dDateStart = this.svr_dDateStart;
Caller.svr_iParallel = this.svr_iParallel;

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
               dt.Columns.Add(new DataColumn("svr_iid", typeof (int)));               
							 dt.Columns.Add(new DataColumn("svr_iCuentaId", typeof (int)));               
							 dt.Columns.Add(new DataColumn("svr_cName", typeof (string)));               
							 dt.Columns.Add(new DataColumn("svr_cDescripcion", typeof (string)));               
							 dt.Columns.Add(new DataColumn("svr_cRouteType", typeof (string)));               
							 dt.Columns.Add(new DataColumn("svr_dDateStart", typeof (DateTime)));               
							 dt.Columns.Add(new DataColumn("svr_iParallel", typeof (int)));               
							 										
               //create Row  
               dr = dt.NewRow();
               
               //set Row
							 dr["Id"] = base.Id;

							 dr["Name"] = base.Name;
dr["svr_iid"] = (object)this.svr_iid ?? System.DBNull.Value;
dr["svr_iCuentaId"] = (object)this.svr_iCuentaId ?? System.DBNull.Value;
dr["svr_cName"] = (object)this.svr_cName ?? System.DBNull.Value;
dr["svr_cDescripcion"] = (object)this.svr_cDescripcion ?? System.DBNull.Value;
dr["svr_cRouteType"] = (object)this.svr_cRouteType ?? System.DBNull.Value;
dr["svr_dDateStart"] = (object)this.svr_dDateStart ?? System.DBNull.Value;
dr["svr_iParallel"] = (object)this.svr_iParallel ?? System.DBNull.Value;
							 
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
