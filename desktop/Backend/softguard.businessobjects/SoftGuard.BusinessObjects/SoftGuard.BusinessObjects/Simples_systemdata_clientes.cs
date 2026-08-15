
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
    ///s_systemdata_clientes Slbf Class
    ///</summary>
    [DataContract]
    public class Simples_systemdata_clientes : SimpleBaseObject
    { 
			 ///<summary>
     ///sdc_fecha   
     ///</summary>
	 [DataMember]
     public DateTime? sdc_fecha { get;set;} 
	  ///<summary>
     ///sdc_code   
     ///</summary>
	 [DataMember]
     public string sdc_code { get;set;} 
	  ///<summary>
     ///sdc_serial   
     ///</summary>
	 [DataMember]
     public string sdc_serial { get;set;} 
	  ///<summary>
     ///sdc_key_id   
     ///</summary>
	 [DataMember]
     public string sdc_key_id { get;set;} 
	  ///<summary>
     ///sdc_secret   
     ///</summary>
	 [DataMember]
     public string sdc_secret { get;set;} 
	  ///<summary>
     ///sdc_client_id   
     ///</summary>
	 [DataMember]
     public int sdc_client_id { get;set;} 
	  ///<summary>
     ///sdc_public   
     ///</summary>
	 [DataMember]
     public string sdc_public { get;set;} 
	  ///<summary>
     ///sdc_data   
     ///</summary>
	 [DataMember]
     public string sdc_data { get;set;} 
	  ///<summary>
     ///sdc_type   
     ///</summary>
	 [DataMember]
     public int sdc_type { get;set;} 
	  ///<summary>
     ///sdc_log   
     ///</summary>
	 [DataMember]
     public string sdc_log { get;set;} 
	  ///<summary>
     ///sdc_lastupdate   
     ///</summary>
	 [DataMember]
     public DateTime? sdc_lastupdate { get;set;} 
	  ///<summary>
     ///sdc_status   
     ///</summary>
	 [DataMember]
     public int sdc_status { get;set;} 
	 ///<summary>
        ///s_systemdata_clientes Constructor
        ///</summary>
        public Simples_systemdata_clientes() : base()
  {
  InitClass();
  }
        ///<summary>
        ///s_systemdata_clientes Constructor
        ///</summary>
        public Simples_systemdata_clientes(int Id, string Name, DateTime? sdc_fecha, string sdc_code, string sdc_serial, string sdc_key_id, string sdc_secret, int sdc_client_id, string sdc_public, string sdc_data, int sdc_type, string sdc_log, DateTime? sdc_lastupdate, int sdc_status) : base()
        {
            base.Id = Id;
						base.Name = Name;				 																																					 
				    this.sdc_fecha = sdc_fecha;
this.sdc_code = sdc_code;
this.sdc_serial = sdc_serial;
this.sdc_key_id = sdc_key_id;
this.sdc_secret = sdc_secret;
this.sdc_client_id = sdc_client_id;
this.sdc_public = sdc_public;
this.sdc_data = sdc_data;
this.sdc_type = sdc_type;
this.sdc_log = sdc_log;
this.sdc_lastupdate = sdc_lastupdate;
this.sdc_status = sdc_status;

            InitClass();
        }  								

				private void InitClass()
        {														
  				  base.Type = new ObjectType(3166, "s_systemdata_clientes");
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
			BaseObject Object = new Dals_systemdata_clientes(SqlConfig, UserId, this);
			if(this.CallerObject != null)
			   Object.CallerObject = this.CallerObject;			
			return Object;
		}
///<summary>
    ///Get parent object
    ///</summary>
		public override CallerObject GetCallerObject()
		{
			Callers_systemdata_clientes Caller = new Callers_systemdata_clientes();
			Caller.Id = base.Id;
			Caller.Name = base.Name;
			Caller.sdc_fecha = this.sdc_fecha;
Caller.sdc_code = this.sdc_code;
Caller.sdc_serial = this.sdc_serial;
Caller.sdc_key_id = this.sdc_key_id;
Caller.sdc_secret = this.sdc_secret;
Caller.sdc_client_id = this.sdc_client_id;
Caller.sdc_public = this.sdc_public;
Caller.sdc_data = this.sdc_data;
Caller.sdc_type = this.sdc_type;
Caller.sdc_log = this.sdc_log;
Caller.sdc_lastupdate = this.sdc_lastupdate;
Caller.sdc_status = this.sdc_status;

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
               dt.Columns.Add(new DataColumn("sdc_fecha", typeof (DateTime)));               
							 dt.Columns.Add(new DataColumn("sdc_code", typeof (string)));               
							 dt.Columns.Add(new DataColumn("sdc_serial", typeof (string)));               
							 dt.Columns.Add(new DataColumn("sdc_key_id", typeof (string)));               
							 dt.Columns.Add(new DataColumn("sdc_secret", typeof (string)));               
							 dt.Columns.Add(new DataColumn("sdc_client_id", typeof (int)));               
							 dt.Columns.Add(new DataColumn("sdc_public", typeof (string)));               
							 dt.Columns.Add(new DataColumn("sdc_data", typeof (string)));               
							 dt.Columns.Add(new DataColumn("sdc_type", typeof (int)));               
							 dt.Columns.Add(new DataColumn("sdc_log", typeof (string)));               
							 dt.Columns.Add(new DataColumn("sdc_lastupdate", typeof (DateTime)));               
							 dt.Columns.Add(new DataColumn("sdc_status", typeof (int)));               
							 										
               //create Row  
               dr = dt.NewRow();
               
               //set Row
							 dr["Id"] = base.Id;

							 dr["Name"] = base.Name;
dr["sdc_fecha"] = (object)this.sdc_fecha ?? System.DBNull.Value;
dr["sdc_code"] = (object)this.sdc_code ?? System.DBNull.Value;
dr["sdc_serial"] = (object)this.sdc_serial ?? System.DBNull.Value;
dr["sdc_key_id"] = (object)this.sdc_key_id ?? System.DBNull.Value;
dr["sdc_secret"] = (object)this.sdc_secret ?? System.DBNull.Value;
dr["sdc_client_id"] = (object)this.sdc_client_id ?? System.DBNull.Value;
dr["sdc_public"] = (object)this.sdc_public ?? System.DBNull.Value;
dr["sdc_data"] = (object)this.sdc_data ?? System.DBNull.Value;
dr["sdc_type"] = (object)this.sdc_type ?? System.DBNull.Value;
dr["sdc_log"] = (object)this.sdc_log ?? System.DBNull.Value;
dr["sdc_lastupdate"] = (object)this.sdc_lastupdate ?? System.DBNull.Value;
dr["sdc_status"] = (object)this.sdc_status ?? System.DBNull.Value;
							 
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
