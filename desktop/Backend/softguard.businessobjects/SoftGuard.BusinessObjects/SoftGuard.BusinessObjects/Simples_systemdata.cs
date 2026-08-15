
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
    ///s_systemdata Slbf Class
    ///</summary>
    [DataContract]
    public class Simples_systemdata : SimpleBaseObject
    { 
			 ///<summary>
     ///sdt_fecha   
     ///</summary>
	 [DataMember]
     public DateTime? sdt_fecha { get;set;} 
	  ///<summary>
     ///sdt_code   
     ///</summary>
	 [DataMember]
     public string sdt_code { get;set;} 
	  ///<summary>
     ///sdt_data   
     ///</summary>
	 [DataMember]
     public string sdt_data { get;set;} 
	  ///<summary>
     ///sdt_log   
     ///</summary>
	 [DataMember]
     public string sdt_log { get;set;} 
	  ///<summary>
     ///sdt_keyid   
     ///</summary>
	 [DataMember]
     public string sdt_keyid { get;set;} 
	  ///<summary>
     ///sdt_fingerprint   
     ///</summary>
	 [DataMember]
     public string sdt_fingerprint { get;set;} 
	 ///<summary>
        ///s_systemdata Constructor
        ///</summary>
        public Simples_systemdata() : base()
  {
  InitClass();
  }
        ///<summary>
        ///s_systemdata Constructor
        ///</summary>
        public Simples_systemdata(int Id, string Name, DateTime? sdt_fecha, string sdt_code, string sdt_data, string sdt_log, string sdt_keyid, string sdt_fingerprint) : base()
        {
            base.Id = Id;
						base.Name = Name;				 																																					 
				    this.sdt_fecha = sdt_fecha;
this.sdt_code = sdt_code;
this.sdt_data = sdt_data;
this.sdt_log = sdt_log;
this.sdt_keyid = sdt_keyid;
this.sdt_fingerprint = sdt_fingerprint;

            InitClass();
        }  								

				private void InitClass()
        {														
  				  base.Type = new ObjectType(3164, "s_systemdata");
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
			BaseObject Object = new Dals_systemdata(SqlConfig, UserId, this);
			if(this.CallerObject != null)
			   Object.CallerObject = this.CallerObject;			
			return Object;
		}
///<summary>
    ///Get parent object
    ///</summary>
		public override CallerObject GetCallerObject()
		{
			Callers_systemdata Caller = new Callers_systemdata();
			Caller.Id = base.Id;
			Caller.Name = base.Name;
			Caller.sdt_fecha = this.sdt_fecha;
Caller.sdt_code = this.sdt_code;
Caller.sdt_data = this.sdt_data;
Caller.sdt_log = this.sdt_log;
Caller.sdt_keyid = this.sdt_keyid;
Caller.sdt_fingerprint = this.sdt_fingerprint;

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
               dt.Columns.Add(new DataColumn("sdt_fecha", typeof (DateTime)));               
							 dt.Columns.Add(new DataColumn("sdt_code", typeof (string)));               
							 dt.Columns.Add(new DataColumn("sdt_data", typeof (string)));               
							 dt.Columns.Add(new DataColumn("sdt_log", typeof (string)));               
							 dt.Columns.Add(new DataColumn("sdt_keyid", typeof (string)));               
							 dt.Columns.Add(new DataColumn("sdt_fingerprint", typeof (string)));               
							 										
               //create Row  
               dr = dt.NewRow();
               
               //set Row
							 dr["Id"] = base.Id;

							 dr["Name"] = base.Name;
dr["sdt_fecha"] = (object)this.sdt_fecha ?? System.DBNull.Value;
dr["sdt_code"] = (object)this.sdt_code ?? System.DBNull.Value;
dr["sdt_data"] = (object)this.sdt_data ?? System.DBNull.Value;
dr["sdt_log"] = (object)this.sdt_log ?? System.DBNull.Value;
dr["sdt_keyid"] = (object)this.sdt_keyid ?? System.DBNull.Value;
dr["sdt_fingerprint"] = (object)this.sdt_fingerprint ?? System.DBNull.Value;
							 
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
