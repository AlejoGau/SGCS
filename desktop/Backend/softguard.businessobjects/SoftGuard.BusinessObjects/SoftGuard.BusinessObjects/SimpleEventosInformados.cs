
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
    ///EventosInformados Slbf Class
    ///</summary>
    [DataContract]
    public class SimpleEventosInformados : SimpleBaseObject
    { 
			 ///<summary>
     ///evi_iRecId   
     ///</summary>
	 [DataMember]
     public int evi_iRecId { get;set;} 
	  ///<summary>
     ///evi_iCuentaId   
     ///</summary>
	 [DataMember]
     public int evi_iCuentaId { get;set;} 
	  ///<summary>
     ///evi_iUsuario   
     ///</summary>
	 [DataMember]
     public int evi_iUsuario { get;set;} 
	  ///<summary>
     ///evi_cUsuarioNombre   
     ///</summary>
	 [DataMember]
     public string evi_cUsuarioNombre { get;set;} 
	  ///<summary>
     ///evi_cAlarma   
     ///</summary>
	 [DataMember]
     public string evi_cAlarma { get;set;} 
	  ///<summary>
     ///evi_cAlarmaDesc   
     ///</summary>
	 [DataMember]
     public string evi_cAlarmaDesc { get;set;} 
	  ///<summary>
     ///evi_iCheck   
     ///</summary>
	 [DataMember]
     public int evi_iCheck { get;set;} 
	  ///<summary>
     ///evi_iCheckType   
     ///</summary>
	 [DataMember]
     public int evi_iCheckType { get;set;} 
	  ///<summary>
     ///evi_iDevice   
     ///</summary>
	 [DataMember]
     public int evi_iDevice { get;set;} 
	  ///<summary>
     ///evi_iStatus   
     ///</summary>
	 [DataMember]
     public int evi_iStatus { get;set;} 
	  ///<summary>
     ///evi_tStatusExec   
     ///</summary>
	 [DataMember]
     public DateTime? evi_tStatusExec { get;set;} 
	  ///<summary>
     ///evi_iGenRecId   
     ///</summary>
	 [DataMember]
     public int evi_iGenRecId { get;set;} 
	 ///<summary>
        ///EventosInformados Constructor
        ///</summary>
        public SimpleEventosInformados() : base()
  {
  InitClass();
  }
        ///<summary>
        ///EventosInformados Constructor
        ///</summary>
        public SimpleEventosInformados(int Id, string Name, int evi_iRecId, int evi_iCuentaId, int evi_iUsuario, string evi_cUsuarioNombre, string evi_cAlarma, string evi_cAlarmaDesc, int evi_iCheck, int evi_iCheckType, int evi_iDevice, int evi_iStatus, DateTime? evi_tStatusExec, int evi_iGenRecId) : base()
        {
            base.Id = Id;
						base.Name = Name;				 																																					 
				    this.evi_iRecId = evi_iRecId;
this.evi_iCuentaId = evi_iCuentaId;
this.evi_iUsuario = evi_iUsuario;
this.evi_cUsuarioNombre = evi_cUsuarioNombre;
this.evi_cAlarma = evi_cAlarma;
this.evi_cAlarmaDesc = evi_cAlarmaDesc;
this.evi_iCheck = evi_iCheck;
this.evi_iCheckType = evi_iCheckType;
this.evi_iDevice = evi_iDevice;
this.evi_iStatus = evi_iStatus;
this.evi_tStatusExec = evi_tStatusExec;
this.evi_iGenRecId = evi_iGenRecId;

            InitClass();
        }  								

				private void InitClass()
        {														
  				  base.Type = new ObjectType(7031, "EventosInformados");
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
			BaseObject Object = new DalEventosInformados(SqlConfig, UserId, this);
			if(this.CallerObject != null)
			   Object.CallerObject = this.CallerObject;			
			return Object;
		}
///<summary>
    ///Get parent object
    ///</summary>
		public override CallerObject GetCallerObject()
		{
			CallerEventosInformados Caller = new CallerEventosInformados();
			Caller.Id = base.Id;
			Caller.Name = base.Name;
			Caller.evi_iRecId = this.evi_iRecId;
Caller.evi_iCuentaId = this.evi_iCuentaId;
Caller.evi_iUsuario = this.evi_iUsuario;
Caller.evi_cUsuarioNombre = this.evi_cUsuarioNombre;
Caller.evi_cAlarma = this.evi_cAlarma;
Caller.evi_cAlarmaDesc = this.evi_cAlarmaDesc;
Caller.evi_iCheck = this.evi_iCheck;
Caller.evi_iCheckType = this.evi_iCheckType;
Caller.evi_iDevice = this.evi_iDevice;
Caller.evi_iStatus = this.evi_iStatus;
Caller.evi_tStatusExec = this.evi_tStatusExec;
Caller.evi_iGenRecId = this.evi_iGenRecId;

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
               dt.Columns.Add(new DataColumn("evi_iRecId", typeof (int)));               
							 dt.Columns.Add(new DataColumn("evi_iCuentaId", typeof (int)));               
							 dt.Columns.Add(new DataColumn("evi_iUsuario", typeof (int)));               
							 dt.Columns.Add(new DataColumn("evi_cUsuarioNombre", typeof (string)));               
							 dt.Columns.Add(new DataColumn("evi_cAlarma", typeof (string)));               
							 dt.Columns.Add(new DataColumn("evi_cAlarmaDesc", typeof (string)));               
							 dt.Columns.Add(new DataColumn("evi_iCheck", typeof (int)));               
							 dt.Columns.Add(new DataColumn("evi_iCheckType", typeof (int)));               
							 dt.Columns.Add(new DataColumn("evi_iDevice", typeof (int)));               
							 dt.Columns.Add(new DataColumn("evi_iStatus", typeof (int)));               
							 dt.Columns.Add(new DataColumn("evi_tStatusExec", typeof (DateTime)));               
							 dt.Columns.Add(new DataColumn("evi_iGenRecId", typeof (int)));               
							 										
               //create Row  
               dr = dt.NewRow();
               
               //set Row
							 dr["Id"] = base.Id;

							 dr["Name"] = base.Name;
dr["evi_iRecId"] = (object)this.evi_iRecId ?? System.DBNull.Value;
dr["evi_iCuentaId"] = (object)this.evi_iCuentaId ?? System.DBNull.Value;
dr["evi_iUsuario"] = (object)this.evi_iUsuario ?? System.DBNull.Value;
dr["evi_cUsuarioNombre"] = (object)this.evi_cUsuarioNombre ?? System.DBNull.Value;
dr["evi_cAlarma"] = (object)this.evi_cAlarma ?? System.DBNull.Value;
dr["evi_cAlarmaDesc"] = (object)this.evi_cAlarmaDesc ?? System.DBNull.Value;
dr["evi_iCheck"] = (object)this.evi_iCheck ?? System.DBNull.Value;
dr["evi_iCheckType"] = (object)this.evi_iCheckType ?? System.DBNull.Value;
dr["evi_iDevice"] = (object)this.evi_iDevice ?? System.DBNull.Value;
dr["evi_iStatus"] = (object)this.evi_iStatus ?? System.DBNull.Value;
dr["evi_tStatusExec"] = (object)this.evi_tStatusExec ?? System.DBNull.Value;
dr["evi_iGenRecId"] = (object)this.evi_iGenRecId ?? System.DBNull.Value;
							 
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
