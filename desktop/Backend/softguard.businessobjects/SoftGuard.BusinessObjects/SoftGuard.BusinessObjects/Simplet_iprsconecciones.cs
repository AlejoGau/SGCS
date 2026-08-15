
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
    ///t_iprsconecciones Slbf Class
    ///</summary>
    [DataContract]
    public class Simplet_iprsconecciones : SimpleBaseObject
    { 
			 ///<summary>
     ///iprsc_iprsiid   
     ///</summary>
	 [DataMember]
     public int iprsc_iprsiid { get;set;} 
	  ///<summary>
     ///iprsc_ipcidkey   
     ///</summary>
	 [DataMember]
     public int iprsc_ipcidkey { get;set;} 
	  ///<summary>
     ///iprsc_status   
     ///</summary>
	 [DataMember]
     public string iprsc_status { get;set;} 
	  ///<summary>
     ///iprsc_config   
     ///</summary>
	 [DataMember]
     public string iprsc_config { get;set;} 
	  ///<summary>
     ///iprsc_lastserviceupdate   
     ///</summary>
	 [DataMember]
     public DateTime? iprsc_lastserviceupdate { get;set;} 
	  ///<summary>
     ///iprsc_iduplicado   
     ///</summary>
	 [DataMember]
     public int iprsc_iduplicado { get;set;} 
	 ///<summary>
        ///t_iprsconecciones Constructor
        ///</summary>
        public Simplet_iprsconecciones() : base()
  {
  InitClass();
  }
        ///<summary>
        ///t_iprsconecciones Constructor
        ///</summary>
        public Simplet_iprsconecciones(int Id, string Name, int iprsc_iprsiid, int iprsc_ipcidkey, string iprsc_status, string iprsc_config, DateTime? iprsc_lastserviceupdate, int iprsc_iduplicado) : base()
        {
            base.Id = Id;
						base.Name = Name;				 																																					 
				    this.iprsc_iprsiid = iprsc_iprsiid;
this.iprsc_ipcidkey = iprsc_ipcidkey;
this.iprsc_status = iprsc_status;
this.iprsc_config = iprsc_config;
this.iprsc_lastserviceupdate = iprsc_lastserviceupdate;
this.iprsc_iduplicado = iprsc_iduplicado;

            InitClass();
        }  								

				private void InitClass()
        {														
  				  base.Type = new ObjectType(3179, "t_iprsconecciones");
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
			BaseObject Object = new Dalt_iprsconecciones(SqlConfig, UserId, this);
			if(this.CallerObject != null)
			   Object.CallerObject = this.CallerObject;			
			return Object;
		}
///<summary>
    ///Get parent object
    ///</summary>
		public override CallerObject GetCallerObject()
		{
			Callert_iprsconecciones Caller = new Callert_iprsconecciones();
			Caller.Id = base.Id;
			Caller.Name = base.Name;
			Caller.iprsc_iprsiid = this.iprsc_iprsiid;
Caller.iprsc_ipcidkey = this.iprsc_ipcidkey;
Caller.iprsc_status = this.iprsc_status;
Caller.iprsc_config = this.iprsc_config;
Caller.iprsc_lastserviceupdate = this.iprsc_lastserviceupdate;
Caller.iprsc_iduplicado = this.iprsc_iduplicado;

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
               dt.Columns.Add(new DataColumn("iprsc_iprsiid", typeof (int)));               
							 dt.Columns.Add(new DataColumn("iprsc_ipcidkey", typeof (int)));               
							 dt.Columns.Add(new DataColumn("iprsc_status", typeof (string)));               
							 dt.Columns.Add(new DataColumn("iprsc_config", typeof (string)));               
							 dt.Columns.Add(new DataColumn("iprsc_lastserviceupdate", typeof (DateTime)));               
							 dt.Columns.Add(new DataColumn("iprsc_iduplicado", typeof (int)));               
							 										
               //create Row  
               dr = dt.NewRow();
               
               //set Row
							 dr["Id"] = base.Id;

							 dr["Name"] = base.Name;
dr["iprsc_iprsiid"] = (object)this.iprsc_iprsiid ?? System.DBNull.Value;
dr["iprsc_ipcidkey"] = (object)this.iprsc_ipcidkey ?? System.DBNull.Value;
dr["iprsc_status"] = (object)this.iprsc_status ?? System.DBNull.Value;
dr["iprsc_config"] = (object)this.iprsc_config ?? System.DBNull.Value;
dr["iprsc_lastserviceupdate"] = (object)this.iprsc_lastserviceupdate ?? System.DBNull.Value;
dr["iprsc_iduplicado"] = (object)this.iprsc_iduplicado ?? System.DBNull.Value;
							 
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
