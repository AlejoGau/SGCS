
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
    ///SerTecVisitas Slbf Class
    ///</summary>
    [DataContract]
    public class SimpleSerTecVisitas : SimpleBaseObject
    { 
			 ///<summary>
     ///svi_tFechaHora   
     ///</summary>
	 [DataMember]
     public DateTime? svi_tFechaHora { get;set;} 
	  ///<summary>
     ///svi_iEstado   
     ///</summary>
	 [DataMember]
     public int svi_iEstado { get;set;} 
	  ///<summary>
     ///svi_iServicio   
     ///</summary>
	 [DataMember]
     public int svi_iServicio { get;set;} 
	  ///<summary>
     ///svi_iFormaDeViaje   
     ///</summary>
	 [DataMember]
     public int svi_iFormaDeViaje { get;set;} 
	  ///<summary>
     ///svi_cObservacion   
     ///</summary>
	 [DataMember]
     public string svi_cObservacion { get;set;} 
	  ///<summary>
     ///svi_tSalidaHaciaCliente   
     ///</summary>
	 [DataMember]
     public DateTime? svi_tSalidaHaciaCliente { get;set;} 
	  ///<summary>
     ///svi_tArriboAlCliente   
     ///</summary>
	 [DataMember]
     public DateTime? svi_tArriboAlCliente { get;set;} 
	  ///<summary>
     ///svi_tSalidaDelCliente   
     ///</summary>
	 [DataMember]
     public DateTime? svi_tSalidaDelCliente { get;set;} 
	  ///<summary>
     ///svi_iusuarioDss   
     ///</summary>
	 [DataMember]
     public int svi_iusuarioDss { get;set;} 
	  ///<summary>
     ///svi_cHorasPlanificadas   
     ///</summary>
	 [DataMember]
     public string svi_cHorasPlanificadas { get;set;} 
	 ///<summary>
        ///SerTecVisitas Constructor
        ///</summary>
        public SimpleSerTecVisitas() : base()
  {
  InitClass();
  }
        ///<summary>
        ///SerTecVisitas Constructor
        ///</summary>
        public SimpleSerTecVisitas(int Id, string Name, DateTime? svi_tFechaHora, int svi_iEstado, int svi_iServicio, int svi_iFormaDeViaje, string svi_cObservacion, DateTime? svi_tSalidaHaciaCliente, DateTime? svi_tArriboAlCliente, DateTime? svi_tSalidaDelCliente, int svi_iusuarioDss, string svi_cHorasPlanificadas) : base()
        {
            base.Id = Id;
						base.Name = Name;				 																																					 
				    this.svi_tFechaHora = svi_tFechaHora;
this.svi_iEstado = svi_iEstado;
this.svi_iServicio = svi_iServicio;
this.svi_iFormaDeViaje = svi_iFormaDeViaje;
this.svi_cObservacion = svi_cObservacion;
this.svi_tSalidaHaciaCliente = svi_tSalidaHaciaCliente;
this.svi_tArriboAlCliente = svi_tArriboAlCliente;
this.svi_tSalidaDelCliente = svi_tSalidaDelCliente;
this.svi_iusuarioDss = svi_iusuarioDss;
this.svi_cHorasPlanificadas = svi_cHorasPlanificadas;

            InitClass();
        }  								

				private void InitClass()
        {														
  				  base.Type = new ObjectType(3121, "SerTecVisitas");
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
			BaseObject Object = new DalSerTecVisitas(SqlConfig, UserId, this);
			if(this.CallerObject != null)
			   Object.CallerObject = this.CallerObject;			
			return Object;
		}
///<summary>
    ///Get parent object
    ///</summary>
		public override CallerObject GetCallerObject()
		{
			CallerSerTecVisitas Caller = new CallerSerTecVisitas();
			Caller.Id = base.Id;
			Caller.Name = base.Name;
			Caller.svi_tFechaHora = this.svi_tFechaHora;
Caller.svi_iEstado = this.svi_iEstado;
Caller.svi_iServicio = this.svi_iServicio;
Caller.svi_iFormaDeViaje = this.svi_iFormaDeViaje;
Caller.svi_cObservacion = this.svi_cObservacion;
Caller.svi_tSalidaHaciaCliente = this.svi_tSalidaHaciaCliente;
Caller.svi_tArriboAlCliente = this.svi_tArriboAlCliente;
Caller.svi_tSalidaDelCliente = this.svi_tSalidaDelCliente;
Caller.svi_iusuarioDss = this.svi_iusuarioDss;
Caller.svi_cHorasPlanificadas = this.svi_cHorasPlanificadas;

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
               dt.Columns.Add(new DataColumn("svi_tFechaHora", typeof (DateTime)));               
							 dt.Columns.Add(new DataColumn("svi_iEstado", typeof (int)));               
							 dt.Columns.Add(new DataColumn("svi_iServicio", typeof (int)));               
							 dt.Columns.Add(new DataColumn("svi_iFormaDeViaje", typeof (int)));               
							 dt.Columns.Add(new DataColumn("svi_cObservacion", typeof (string)));               
							 dt.Columns.Add(new DataColumn("svi_tSalidaHaciaCliente", typeof (DateTime)));               
							 dt.Columns.Add(new DataColumn("svi_tArriboAlCliente", typeof (DateTime)));               
							 dt.Columns.Add(new DataColumn("svi_tSalidaDelCliente", typeof (DateTime)));               
							 dt.Columns.Add(new DataColumn("svi_iusuarioDss", typeof (int)));               
							 dt.Columns.Add(new DataColumn("svi_cHorasPlanificadas", typeof (string)));               
							 										
               //create Row  
               dr = dt.NewRow();
               
               //set Row
							 dr["Id"] = base.Id;

							 dr["Name"] = base.Name;
dr["svi_tFechaHora"] = (object)this.svi_tFechaHora ?? System.DBNull.Value;
dr["svi_iEstado"] = (object)this.svi_iEstado ?? System.DBNull.Value;
dr["svi_iServicio"] = (object)this.svi_iServicio ?? System.DBNull.Value;
dr["svi_iFormaDeViaje"] = (object)this.svi_iFormaDeViaje ?? System.DBNull.Value;
dr["svi_cObservacion"] = (object)this.svi_cObservacion ?? System.DBNull.Value;
dr["svi_tSalidaHaciaCliente"] = (object)this.svi_tSalidaHaciaCliente ?? System.DBNull.Value;
dr["svi_tArriboAlCliente"] = (object)this.svi_tArriboAlCliente ?? System.DBNull.Value;
dr["svi_tSalidaDelCliente"] = (object)this.svi_tSalidaDelCliente ?? System.DBNull.Value;
dr["svi_iusuarioDss"] = (object)this.svi_iusuarioDss ?? System.DBNull.Value;
dr["svi_cHorasPlanificadas"] = (object)this.svi_cHorasPlanificadas ?? System.DBNull.Value;
							 
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
