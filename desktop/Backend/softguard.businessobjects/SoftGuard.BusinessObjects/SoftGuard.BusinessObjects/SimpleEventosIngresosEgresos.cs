
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
    ///EventosIngresosEgresos Slbf Class
    ///</summary>
    [DataContract]
    public class SimpleEventosIngresosEgresos : SimpleBaseObject
    { 
			 ///<summary>
     ///eie_iRecId   
     ///</summary>
	 [DataMember]
     public int eie_iRecId { get;set;} 
	  ///<summary>
     ///eie_iCuentaId   
     ///</summary>
	 [DataMember]
     public int eie_iCuentaId { get;set;} 
	  ///<summary>
     ///eie_tFechaHora   
     ///</summary>
	 [DataMember]
     public DateTime? eie_tFechaHora { get;set;} 
	  ///<summary>
     ///eie_cMatricula   
     ///</summary>
	 [DataMember]
     public string eie_cMatricula { get;set;} 
	  ///<summary>
     ///eie_cUnidadFuncional   
     ///</summary>
	 [DataMember]
     public string eie_cUnidadFuncional { get;set;} 
	  ///<summary>
     ///eie_cVecino   
     ///</summary>
	 [DataMember]
     public string eie_cVecino { get;set;} 
	  ///<summary>
     ///eie_cTransito   
     ///</summary>
	 [DataMember]
     public string eie_cTransito { get;set;} 
	  ///<summary>
     ///eie_cUsuario   
     ///</summary>
	 [DataMember]
     public string eie_cUsuario { get;set;} 
	 ///<summary>
        ///EventosIngresosEgresos Constructor
        ///</summary>
        public SimpleEventosIngresosEgresos() : base()
  {
  InitClass();
  }
        ///<summary>
        ///EventosIngresosEgresos Constructor
        ///</summary>
        public SimpleEventosIngresosEgresos(int Id, string Name, int eie_iRecId, int eie_iCuentaId, DateTime? eie_tFechaHora, string eie_cMatricula, string eie_cUnidadFuncional, string eie_cVecino, string eie_cTransito, string eie_cUsuario) : base()
        {
            base.Id = Id;
						base.Name = Name;				 																																					 
				    this.eie_iRecId = eie_iRecId;
this.eie_iCuentaId = eie_iCuentaId;
this.eie_tFechaHora = eie_tFechaHora;
this.eie_cMatricula = eie_cMatricula;
this.eie_cUnidadFuncional = eie_cUnidadFuncional;
this.eie_cVecino = eie_cVecino;
this.eie_cTransito = eie_cTransito;
this.eie_cUsuario = eie_cUsuario;

            InitClass();
        }  								

				private void InitClass()
        {														
  				  base.Type = new ObjectType(7035, "EventosIngresosEgresos");
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
			BaseObject Object = new DalEventosIngresosEgresos(SqlConfig, UserId, this);
			if(this.CallerObject != null)
			   Object.CallerObject = this.CallerObject;			
			return Object;
		}
///<summary>
    ///Get parent object
    ///</summary>
		public override CallerObject GetCallerObject()
		{
			CallerEventosIngresosEgresos Caller = new CallerEventosIngresosEgresos();
			Caller.Id = base.Id;
			Caller.Name = base.Name;
			Caller.eie_iRecId = this.eie_iRecId;
Caller.eie_iCuentaId = this.eie_iCuentaId;
Caller.eie_tFechaHora = this.eie_tFechaHora;
Caller.eie_cMatricula = this.eie_cMatricula;
Caller.eie_cUnidadFuncional = this.eie_cUnidadFuncional;
Caller.eie_cVecino = this.eie_cVecino;
Caller.eie_cTransito = this.eie_cTransito;
Caller.eie_cUsuario = this.eie_cUsuario;

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
               dt.Columns.Add(new DataColumn("eie_iRecId", typeof (int)));               
							 dt.Columns.Add(new DataColumn("eie_iCuentaId", typeof (int)));               
							 dt.Columns.Add(new DataColumn("eie_tFechaHora", typeof (DateTime)));               
							 dt.Columns.Add(new DataColumn("eie_cMatricula", typeof (string)));               
							 dt.Columns.Add(new DataColumn("eie_cUnidadFuncional", typeof (string)));               
							 dt.Columns.Add(new DataColumn("eie_cVecino", typeof (string)));               
							 dt.Columns.Add(new DataColumn("eie_cTransito", typeof (string)));               
							 dt.Columns.Add(new DataColumn("eie_cUsuario", typeof (string)));               
							 										
               //create Row  
               dr = dt.NewRow();
               
               //set Row
							 dr["Id"] = base.Id;

							 dr["Name"] = base.Name;
dr["eie_iRecId"] = (object)this.eie_iRecId ?? System.DBNull.Value;
dr["eie_iCuentaId"] = (object)this.eie_iCuentaId ?? System.DBNull.Value;
dr["eie_tFechaHora"] = (object)this.eie_tFechaHora ?? System.DBNull.Value;
dr["eie_cMatricula"] = (object)this.eie_cMatricula ?? System.DBNull.Value;
dr["eie_cUnidadFuncional"] = (object)this.eie_cUnidadFuncional ?? System.DBNull.Value;
dr["eie_cVecino"] = (object)this.eie_cVecino ?? System.DBNull.Value;
dr["eie_cTransito"] = (object)this.eie_cTransito ?? System.DBNull.Value;
dr["eie_cUsuario"] = (object)this.eie_cUsuario ?? System.DBNull.Value;
							 
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
