
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
    ///s_terminales Slbf Class
    ///</summary>
    [DataContract]
    public class Simples_terminales : SimpleBaseObject
    { 
			 ///<summary>
     ///iprs_ccnombre   
     ///</summary>
	 [DataMember]
     public string iprs_ccnombre { get;set;} 
	  ///<summary>
     ///iprs_localip   
     ///</summary>
	 [DataMember]
     public string iprs_localip { get;set;} 
	  ///<summary>
     ///iprs_commandport   
     ///</summary>
	 [DataMember]
     public int iprs_commandport { get;set;} 
	  ///<summary>
     ///iprs_websocketport   
     ///</summary>
	 [DataMember]
     public int iprs_websocketport { get;set;} 
	  ///<summary>
     ///iprs_status   
     ///</summary>
	 [DataMember]
     public string iprs_status { get;set;} 
	  ///<summary>
     ///iprs_config   
     ///</summary>
	 [DataMember]
     public string iprs_config { get;set;} 
	  ///<summary>
     ///iprs_lastserviceupdate   
     ///</summary>
	 [DataMember]
     public DateTime? iprs_lastserviceupdate { get;set;} 
	 ///<summary>
        ///s_terminales Constructor
        ///</summary>
        public Simples_terminales() : base()
  {
  InitClass();
  }
        ///<summary>
        ///s_terminales Constructor
        ///</summary>
        public Simples_terminales(int Id, string Name, string iprs_ccnombre, string iprs_localip, int iprs_commandport, int iprs_websocketport, string iprs_status, string iprs_config, DateTime? iprs_lastserviceupdate) : base()
        {
            base.Id = Id;
						base.Name = Name;				 																																					 
				    this.iprs_ccnombre = iprs_ccnombre;
this.iprs_localip = iprs_localip;
this.iprs_commandport = iprs_commandport;
this.iprs_websocketport = iprs_websocketport;
this.iprs_status = iprs_status;
this.iprs_config = iprs_config;
this.iprs_lastserviceupdate = iprs_lastserviceupdate;

            InitClass();
        }  								

				private void InitClass()
        {														
  				  base.Type = new ObjectType(3178, "s_terminales");
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
			BaseObject Object = new Dals_terminales(SqlConfig, UserId, this);
			if(this.CallerObject != null)
			   Object.CallerObject = this.CallerObject;			
			return Object;
		}
///<summary>
    ///Get parent object
    ///</summary>
		public override CallerObject GetCallerObject()
		{
			Callers_terminales Caller = new Callers_terminales();
			Caller.Id = base.Id;
			Caller.Name = base.Name;
			Caller.iprs_ccnombre = this.iprs_ccnombre;
Caller.iprs_localip = this.iprs_localip;
Caller.iprs_commandport = this.iprs_commandport;
Caller.iprs_websocketport = this.iprs_websocketport;
Caller.iprs_status = this.iprs_status;
Caller.iprs_config = this.iprs_config;
Caller.iprs_lastserviceupdate = this.iprs_lastserviceupdate;

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
               dt.Columns.Add(new DataColumn("iprs_ccnombre", typeof (string)));               
							 dt.Columns.Add(new DataColumn("iprs_localip", typeof (string)));               
							 dt.Columns.Add(new DataColumn("iprs_commandport", typeof (int)));               
							 dt.Columns.Add(new DataColumn("iprs_websocketport", typeof (int)));               
							 dt.Columns.Add(new DataColumn("iprs_status", typeof (string)));               
							 dt.Columns.Add(new DataColumn("iprs_config", typeof (string)));               
							 dt.Columns.Add(new DataColumn("iprs_lastserviceupdate", typeof (DateTime)));               
							 										
               //create Row  
               dr = dt.NewRow();
               
               //set Row
							 dr["Id"] = base.Id;

							 dr["Name"] = base.Name;
dr["iprs_ccnombre"] = (object)this.iprs_ccnombre ?? System.DBNull.Value;
dr["iprs_localip"] = (object)this.iprs_localip ?? System.DBNull.Value;
dr["iprs_commandport"] = (object)this.iprs_commandport ?? System.DBNull.Value;
dr["iprs_websocketport"] = (object)this.iprs_websocketport ?? System.DBNull.Value;
dr["iprs_status"] = (object)this.iprs_status ?? System.DBNull.Value;
dr["iprs_config"] = (object)this.iprs_config ?? System.DBNull.Value;
dr["iprs_lastserviceupdate"] = (object)this.iprs_lastserviceupdate ?? System.DBNull.Value;
							 
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
