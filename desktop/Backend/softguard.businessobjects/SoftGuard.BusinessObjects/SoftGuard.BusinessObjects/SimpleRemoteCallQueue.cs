
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
    ///RemoteCallQueue Slbf Class
    ///</summary>
    [DataContract]
    public class SimpleRemoteCallQueue : SimpleBaseObject
    { 
			 ///<summary>
     ///rcq_estado   
     ///</summary>
	 [DataMember]
     public int rcq_estado { get;set;} 
	  ///<summary>
     ///rcq_tipo   
     ///</summary>
	 [DataMember]
     public string rcq_tipo { get;set;} 
	  ///<summary>
     ///rcq_url   
     ///</summary>
	 [DataMember]
     public string rcq_url { get;set;} 
	  ///<summary>
     ///rcq_result   
     ///</summary>
	 [DataMember]
     public string rcq_result { get;set;} 
	  ///<summary>
     ///rcq_fechaprograma   
     ///</summary>
	 [DataMember]
     public DateTime? rcq_fechaprograma { get;set;} 
	  ///<summary>
     ///rcq_fechaalta   
     ///</summary>
	 [DataMember]
     public DateTime? rcq_fechaalta { get;set;} 
	  ///<summary>
     ///rcq_fechamodificacion   
     ///</summary>
	 [DataMember]
     public DateTime? rcq_fechamodificacion { get;set;} 
	  ///<summary>
     ///rcq_config   
     ///</summary>
	 [DataMember]
     public string rcq_config { get;set;} 
	 ///<summary>
        ///RemoteCallQueue Constructor
        ///</summary>
        public SimpleRemoteCallQueue() : base()
  {
  InitClass();
  }
        ///<summary>
        ///RemoteCallQueue Constructor
        ///</summary>
        public SimpleRemoteCallQueue(int Id, string Name, int rcq_estado, string rcq_tipo, string rcq_url, string rcq_result, DateTime? rcq_fechaprograma, DateTime? rcq_fechaalta, DateTime? rcq_fechamodificacion, string rcq_config) : base()
        {
            base.Id = Id;
						base.Name = Name;				 																																					 
				    this.rcq_estado = rcq_estado;
this.rcq_tipo = rcq_tipo;
this.rcq_url = rcq_url;
this.rcq_result = rcq_result;
this.rcq_fechaprograma = rcq_fechaprograma;
this.rcq_fechaalta = rcq_fechaalta;
this.rcq_fechamodificacion = rcq_fechamodificacion;
this.rcq_config = rcq_config;

            InitClass();
        }  								

				private void InitClass()
        {														
  				  base.Type = new ObjectType(3173, "RemoteCallQueue");
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
			BaseObject Object = new DalRemoteCallQueue(SqlConfig, UserId, this);
			if(this.CallerObject != null)
			   Object.CallerObject = this.CallerObject;			
			return Object;
		}
///<summary>
    ///Get parent object
    ///</summary>
		public override CallerObject GetCallerObject()
		{
			CallerRemoteCallQueue Caller = new CallerRemoteCallQueue();
			Caller.Id = base.Id;
			Caller.Name = base.Name;
			Caller.rcq_estado = this.rcq_estado;
Caller.rcq_tipo = this.rcq_tipo;
Caller.rcq_url = this.rcq_url;
Caller.rcq_result = this.rcq_result;
Caller.rcq_fechaprograma = this.rcq_fechaprograma;
Caller.rcq_fechaalta = this.rcq_fechaalta;
Caller.rcq_fechamodificacion = this.rcq_fechamodificacion;
Caller.rcq_config = this.rcq_config;

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
               dt.Columns.Add(new DataColumn("rcq_estado", typeof (int)));               
							 dt.Columns.Add(new DataColumn("rcq_tipo", typeof (string)));               
							 dt.Columns.Add(new DataColumn("rcq_url", typeof (string)));               
							 dt.Columns.Add(new DataColumn("rcq_result", typeof (string)));               
							 dt.Columns.Add(new DataColumn("rcq_fechaprograma", typeof (DateTime)));               
							 dt.Columns.Add(new DataColumn("rcq_fechaalta", typeof (DateTime)));               
							 dt.Columns.Add(new DataColumn("rcq_fechamodificacion", typeof (DateTime)));               
							 dt.Columns.Add(new DataColumn("rcq_config", typeof (string)));               
							 										
               //create Row  
               dr = dt.NewRow();
               
               //set Row
							 dr["Id"] = base.Id;

							 dr["Name"] = base.Name;
dr["rcq_estado"] = (object)this.rcq_estado ?? System.DBNull.Value;
dr["rcq_tipo"] = (object)this.rcq_tipo ?? System.DBNull.Value;
dr["rcq_url"] = (object)this.rcq_url ?? System.DBNull.Value;
dr["rcq_result"] = (object)this.rcq_result ?? System.DBNull.Value;
dr["rcq_fechaprograma"] = (object)this.rcq_fechaprograma ?? System.DBNull.Value;
dr["rcq_fechaalta"] = (object)this.rcq_fechaalta ?? System.DBNull.Value;
dr["rcq_fechamodificacion"] = (object)this.rcq_fechamodificacion ?? System.DBNull.Value;
dr["rcq_config"] = (object)this.rcq_config ?? System.DBNull.Value;
							 
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
