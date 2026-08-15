
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
    ///TG_Route_Geofences Slbf Class
    ///</summary>
    [DataContract]
    public class SimpleTG_Route_Geofences : SimpleBaseObject
    { 
			 ///<summary>
     ///routeId   
     ///</summary>
	 [DataMember]
     public int routeId { get;set;} 
	  ///<summary>
     ///geofenceid   
     ///</summary>
	 [DataMember]
     public int geofenceid { get;set;} 
	  ///<summary>
     ///time   
     ///</summary>
	 [DataMember]
     public int time { get;set;} 
	  ///<summary>
     ///beforetolerance   
     ///</summary>
	 [DataMember]
     public int beforetolerance { get;set;} 
	  ///<summary>
     ///aftertolerance   
     ///</summary>
	 [DataMember]
     public int aftertolerance { get;set;} 
	  ///<summary>
     ///order   
     ///</summary>
	 [DataMember]
     public int order { get;set;} 
	 ///<summary>
        ///TG_Route_Geofences Constructor
        ///</summary>
        public SimpleTG_Route_Geofences() : base()
  {
  InitClass();
  }
        ///<summary>
        ///TG_Route_Geofences Constructor
        ///</summary>
        public SimpleTG_Route_Geofences(int Id, string Name, int routeId, int geofenceid, int time, int beforetolerance, int aftertolerance, int order) : base()
        {
            base.Id = Id;
						base.Name = Name;				 																																					 
				    this.routeId = routeId;
this.geofenceid = geofenceid;
this.time = time;
this.beforetolerance = beforetolerance;
this.aftertolerance = aftertolerance;
this.order = order;

            InitClass();
        }  								

				private void InitClass()
        {														
  				  base.Type = new ObjectType(3172, "TG_Route_Geofences");
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
			BaseObject Object = new DalTG_Route_Geofences(SqlConfig, UserId, this);
			if(this.CallerObject != null)
			   Object.CallerObject = this.CallerObject;			
			return Object;
		}
///<summary>
    ///Get parent object
    ///</summary>
		public override CallerObject GetCallerObject()
		{
			CallerTG_Route_Geofences Caller = new CallerTG_Route_Geofences();
			Caller.Id = base.Id;
			Caller.Name = base.Name;
			Caller.routeId = this.routeId;
Caller.geofenceid = this.geofenceid;
Caller.time = this.time;
Caller.beforetolerance = this.beforetolerance;
Caller.aftertolerance = this.aftertolerance;
Caller.order = this.order;

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
               dt.Columns.Add(new DataColumn("routeId", typeof (int)));               
							 dt.Columns.Add(new DataColumn("geofenceid", typeof (int)));               
							 dt.Columns.Add(new DataColumn("time", typeof (int)));               
							 dt.Columns.Add(new DataColumn("beforetolerance", typeof (int)));               
							 dt.Columns.Add(new DataColumn("aftertolerance", typeof (int)));               
							 dt.Columns.Add(new DataColumn("order", typeof (int)));               
							 										
               //create Row  
               dr = dt.NewRow();
               
               //set Row
							 dr["Id"] = base.Id;

							 dr["Name"] = base.Name;
dr["routeId"] = (object)this.routeId ?? System.DBNull.Value;
dr["geofenceid"] = (object)this.geofenceid ?? System.DBNull.Value;
dr["time"] = (object)this.time ?? System.DBNull.Value;
dr["beforetolerance"] = (object)this.beforetolerance ?? System.DBNull.Value;
dr["aftertolerance"] = (object)this.aftertolerance ?? System.DBNull.Value;
dr["order"] = (object)this.order ?? System.DBNull.Value;
							 
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
