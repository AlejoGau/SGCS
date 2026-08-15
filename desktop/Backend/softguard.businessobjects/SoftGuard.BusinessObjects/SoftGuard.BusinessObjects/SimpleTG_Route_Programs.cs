
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
    ///TG_Route_Programs Slbf Class
    ///</summary>
    [DataContract]
    public class SimpleTG_Route_Programs : SimpleBaseObject
    { 
			 ///<summary>
     ///routeId   
     ///</summary>
	 [DataMember]
     public int routeId { get;set;} 
	  ///<summary>
     ///programtype   
     ///</summary>
	 [DataMember]
     public string programtype { get;set;} 
	  ///<summary>
     ///starthour   
     ///</summary>
	 [DataMember]
     public int starthour { get;set;} 
	  ///<summary>
     ///startminutes   
     ///</summary>
	 [DataMember]
     public int startminutes { get;set;} 
	  ///<summary>
     ///dayofweek   
     ///</summary>
	 [DataMember]
     public int dayofweek { get;set;} 
	  ///<summary>
     ///dayofmonth   
     ///</summary>
	 [DataMember]
     public int dayofmonth { get;set;} 
	 ///<summary>
        ///TG_Route_Programs Constructor
        ///</summary>
        public SimpleTG_Route_Programs() : base()
  {
  InitClass();
  }
        ///<summary>
        ///TG_Route_Programs Constructor
        ///</summary>
        public SimpleTG_Route_Programs(int Id, string Name, int routeId, string programtype, int starthour, int startminutes, int dayofweek, int dayofmonth) : base()
        {
            base.Id = Id;
						base.Name = Name;				 																																					 
				    this.routeId = routeId;
this.programtype = programtype;
this.starthour = starthour;
this.startminutes = startminutes;
this.dayofweek = dayofweek;
this.dayofmonth = dayofmonth;

            InitClass();
        }  								

				private void InitClass()
        {														
  				  base.Type = new ObjectType(3171, "TG_Route_Programs");
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
			BaseObject Object = new DalTG_Route_Programs(SqlConfig, UserId, this);
			if(this.CallerObject != null)
			   Object.CallerObject = this.CallerObject;			
			return Object;
		}
///<summary>
    ///Get parent object
    ///</summary>
		public override CallerObject GetCallerObject()
		{
			CallerTG_Route_Programs Caller = new CallerTG_Route_Programs();
			Caller.Id = base.Id;
			Caller.Name = base.Name;
			Caller.routeId = this.routeId;
Caller.programtype = this.programtype;
Caller.starthour = this.starthour;
Caller.startminutes = this.startminutes;
Caller.dayofweek = this.dayofweek;
Caller.dayofmonth = this.dayofmonth;

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
							 dt.Columns.Add(new DataColumn("programtype", typeof (string)));               
							 dt.Columns.Add(new DataColumn("starthour", typeof (int)));               
							 dt.Columns.Add(new DataColumn("startminutes", typeof (int)));               
							 dt.Columns.Add(new DataColumn("dayofweek", typeof (int)));               
							 dt.Columns.Add(new DataColumn("dayofmonth", typeof (int)));               
							 										
               //create Row  
               dr = dt.NewRow();
               
               //set Row
							 dr["Id"] = base.Id;

							 dr["Name"] = base.Name;
dr["routeId"] = (object)this.routeId ?? System.DBNull.Value;
dr["programtype"] = (object)this.programtype ?? System.DBNull.Value;
dr["starthour"] = (object)this.starthour ?? System.DBNull.Value;
dr["startminutes"] = (object)this.startminutes ?? System.DBNull.Value;
dr["dayofweek"] = (object)this.dayofweek ?? System.DBNull.Value;
dr["dayofmonth"] = (object)this.dayofmonth ?? System.DBNull.Value;
							 
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
