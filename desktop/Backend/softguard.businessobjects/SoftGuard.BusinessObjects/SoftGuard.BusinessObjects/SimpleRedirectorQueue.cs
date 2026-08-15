
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
    ///RedirectorQueue Slbf Class
    ///</summary>
    [DataContract]
    public class SimpleRedirectorQueue : SimpleBaseObject
    { 
			 ///<summary>
     ///rdq_iReDirector   
     ///</summary>
	 [DataMember]
     public int rdq_iReDirector { get;set;} 
	  ///<summary>
     ///rdq_idRec   
     ///</summary>
	 [DataMember]
     public int rdq_idRec { get;set;} 
	  ///<summary>
     ///rdq_tFechaHora   
     ///</summary>
	 [DataMember]
     public DateTime? rdq_tFechaHora { get;set;} 
	  ///<summary>
     ///rdq_cLlamado   
     ///</summary>
	 [DataMember]
     public string rdq_cLlamado { get;set;} 
	  ///<summary>
     ///rdq_cRespuesta   
     ///</summary>
	 [DataMember]
     public string rdq_cRespuesta { get;set;} 
	  ///<summary>
     ///rdq_iStatus   
     ///</summary>
	 [DataMember]
     public int rdq_iStatus { get;set;} 
	  ///<summary>
     ///rdq_tStatusExec   
     ///</summary>
	 [DataMember]
     public DateTime? rdq_tStatusExec { get;set;} 
	 ///<summary>
        ///RedirectorQueue Constructor
        ///</summary>
        public SimpleRedirectorQueue() : base()
  {
  InitClass();
  }
        ///<summary>
        ///RedirectorQueue Constructor
        ///</summary>
        public SimpleRedirectorQueue(int Id, string Name, int rdq_iReDirector, int rdq_idRec, DateTime? rdq_tFechaHora, string rdq_cLlamado, string rdq_cRespuesta, int rdq_iStatus, DateTime? rdq_tStatusExec) : base()
        {
            base.Id = Id;
						base.Name = Name;				 																																					 
				    this.rdq_iReDirector = rdq_iReDirector;
this.rdq_idRec = rdq_idRec;
this.rdq_tFechaHora = rdq_tFechaHora;
this.rdq_cLlamado = rdq_cLlamado;
this.rdq_cRespuesta = rdq_cRespuesta;
this.rdq_iStatus = rdq_iStatus;
this.rdq_tStatusExec = rdq_tStatusExec;

            InitClass();
        }  								

				private void InitClass()
        {														
  				  base.Type = new ObjectType(3223, "RedirectorQueue");
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
			BaseObject Object = new DalRedirectorQueue(SqlConfig, UserId, this);
			if(this.CallerObject != null)
			   Object.CallerObject = this.CallerObject;			
			return Object;
		}
///<summary>
    ///Get parent object
    ///</summary>
		public override CallerObject GetCallerObject()
		{
			CallerRedirectorQueue Caller = new CallerRedirectorQueue();
			Caller.Id = base.Id;
			Caller.Name = base.Name;
			Caller.rdq_iReDirector = this.rdq_iReDirector;
Caller.rdq_idRec = this.rdq_idRec;
Caller.rdq_tFechaHora = this.rdq_tFechaHora;
Caller.rdq_cLlamado = this.rdq_cLlamado;
Caller.rdq_cRespuesta = this.rdq_cRespuesta;
Caller.rdq_iStatus = this.rdq_iStatus;
Caller.rdq_tStatusExec = this.rdq_tStatusExec;

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
               dt.Columns.Add(new DataColumn("rdq_iReDirector", typeof (int)));               
							 dt.Columns.Add(new DataColumn("rdq_idRec", typeof (int)));               
							 dt.Columns.Add(new DataColumn("rdq_tFechaHora", typeof (DateTime)));               
							 dt.Columns.Add(new DataColumn("rdq_cLlamado", typeof (string)));               
							 dt.Columns.Add(new DataColumn("rdq_cRespuesta", typeof (string)));               
							 dt.Columns.Add(new DataColumn("rdq_iStatus", typeof (int)));               
							 dt.Columns.Add(new DataColumn("rdq_tStatusExec", typeof (DateTime)));               
							 										
               //create Row  
               dr = dt.NewRow();
               
               //set Row
							 dr["Id"] = base.Id;

							 dr["Name"] = base.Name;
dr["rdq_iReDirector"] = (object)this.rdq_iReDirector ?? System.DBNull.Value;
dr["rdq_idRec"] = (object)this.rdq_idRec ?? System.DBNull.Value;
dr["rdq_tFechaHora"] = (object)this.rdq_tFechaHora ?? System.DBNull.Value;
dr["rdq_cLlamado"] = (object)this.rdq_cLlamado ?? System.DBNull.Value;
dr["rdq_cRespuesta"] = (object)this.rdq_cRespuesta ?? System.DBNull.Value;
dr["rdq_iStatus"] = (object)this.rdq_iStatus ?? System.DBNull.Value;
dr["rdq_tStatusExec"] = (object)this.rdq_tStatusExec ?? System.DBNull.Value;
							 
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
