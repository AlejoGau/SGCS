
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
    ///TG_Routes Slbf Class
    ///</summary>
    [DataContract]
    public class SimpleTG_Routes : SimpleBaseObject
    { 
			 ///<summary>
     ///cuentaId   
     ///</summary>
	 [DataMember]
     public int cuentaId { get;set;} 
	  ///<summary>
     ///userId   
     ///</summary>
	 [DataMember]
     public int userId { get;set;} 
	  ///<summary>
     ///routetype   
     ///</summary>
	 [DataMember]
     public string routetype { get;set;} 
	  ///<summary>
     ///datestart   
     ///</summary>
	 [DataMember]
     public DateTime? datestart { get;set;} 
	  ///<summary>
     ///time   
     ///</summary>
	 [DataMember]
     public int time { get;set;} 
	  ///<summary>
     ///startbeforetolerance   
     ///</summary>
	 [DataMember]
     public int startbeforetolerance { get;set;} 
	  ///<summary>
     ///startaftertolerance   
     ///</summary>
	 [DataMember]
     public int startaftertolerance { get;set;} 
	  ///<summary>
     ///endbeforetolerance   
     ///</summary>
	 [DataMember]
     public int endbeforetolerance { get;set;} 
	  ///<summary>
     ///endaftertolerance   
     ///</summary>
	 [DataMember]
     public int endaftertolerance { get;set;} 
	 ///<summary>
        ///TG_Routes Constructor
        ///</summary>
        public SimpleTG_Routes() : base()
  {
  InitClass();
  }
        ///<summary>
        ///TG_Routes Constructor
        ///</summary>
        public SimpleTG_Routes(int Id, string Name, int cuentaId, int userId, string routetype, DateTime? datestart, int time, int startbeforetolerance, int startaftertolerance, int endbeforetolerance, int endaftertolerance) : base()
        {
            base.Id = Id;
						base.Name = Name;				 																																					 
				    this.cuentaId = cuentaId;
this.userId = userId;
this.routetype = routetype;
this.datestart = datestart;
this.time = time;
this.startbeforetolerance = startbeforetolerance;
this.startaftertolerance = startaftertolerance;
this.endbeforetolerance = endbeforetolerance;
this.endaftertolerance = endaftertolerance;

            InitClass();
        }  								

				private void InitClass()
        {														
  				  base.Type = new ObjectType(3170, "TG_Routes");
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
			BaseObject Object = new DalTG_Routes(SqlConfig, UserId, this);
			if(this.CallerObject != null)
			   Object.CallerObject = this.CallerObject;			
			return Object;
		}
///<summary>
    ///Get parent object
    ///</summary>
		public override CallerObject GetCallerObject()
		{
			CallerTG_Routes Caller = new CallerTG_Routes();
			Caller.Id = base.Id;
			Caller.Name = base.Name;
			Caller.cuentaId = this.cuentaId;
Caller.userId = this.userId;
Caller.routetype = this.routetype;
Caller.datestart = this.datestart;
Caller.time = this.time;
Caller.startbeforetolerance = this.startbeforetolerance;
Caller.startaftertolerance = this.startaftertolerance;
Caller.endbeforetolerance = this.endbeforetolerance;
Caller.endaftertolerance = this.endaftertolerance;

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
               dt.Columns.Add(new DataColumn("cuentaId", typeof (int)));               
							 dt.Columns.Add(new DataColumn("userId", typeof (int)));               
							 dt.Columns.Add(new DataColumn("routetype", typeof (string)));               
							 dt.Columns.Add(new DataColumn("datestart", typeof (DateTime)));               
							 dt.Columns.Add(new DataColumn("time", typeof (int)));               
							 dt.Columns.Add(new DataColumn("startbeforetolerance", typeof (int)));               
							 dt.Columns.Add(new DataColumn("startaftertolerance", typeof (int)));               
							 dt.Columns.Add(new DataColumn("endbeforetolerance", typeof (int)));               
							 dt.Columns.Add(new DataColumn("endaftertolerance", typeof (int)));               
							 										
               //create Row  
               dr = dt.NewRow();
               
               //set Row
							 dr["Id"] = base.Id;

							 dr["Name"] = base.Name;
dr["cuentaId"] = (object)this.cuentaId ?? System.DBNull.Value;
dr["userId"] = (object)this.userId ?? System.DBNull.Value;
dr["routetype"] = (object)this.routetype ?? System.DBNull.Value;
dr["datestart"] = (object)this.datestart ?? System.DBNull.Value;
dr["time"] = (object)this.time ?? System.DBNull.Value;
dr["startbeforetolerance"] = (object)this.startbeforetolerance ?? System.DBNull.Value;
dr["startaftertolerance"] = (object)this.startaftertolerance ?? System.DBNull.Value;
dr["endbeforetolerance"] = (object)this.endbeforetolerance ?? System.DBNull.Value;
dr["endaftertolerance"] = (object)this.endaftertolerance ?? System.DBNull.Value;
							 
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
