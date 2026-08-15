
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
    ///m_tgviaje Slbf Class
    ///</summary>
    [DataContract]
    public class Simplem_tgviaje : SimpleBaseObject
    { 
			 ///<summary>
     ///tgv_nombre   
     ///</summary>
	 [DataMember]
     public string tgv_nombre { get;set;} 
	  ///<summary>
     ///tgv_fechainicio   
     ///</summary>
	 [DataMember]
     public DateTime? tgv_fechainicio { get;set;} 
	  ///<summary>
     ///tgv_fechafin   
     ///</summary>
	 [DataMember]
     public DateTime? tgv_fechafin { get;set;} 
	  ///<summary>
     ///tgv_reciid_inicio   
     ///</summary>
	 [DataMember]
     public int tgv_reciid_inicio { get;set;} 
	  ///<summary>
     ///tgv_reciid_fin   
     ///</summary>
	 [DataMember]
     public int tgv_reciid_fin { get;set;} 
	  ///<summary>
     ///tgv_usuiid   
     ///</summary>
	 [DataMember]
     public int tgv_usuiid { get;set;} 
	  ///<summary>
     ///tgv_cueiid   
     ///</summary>
	 [DataMember]
     public int tgv_cueiid { get;set;} 
	  ///<summary>
     ///tgv_codigoexterno   
     ///</summary>
	 [DataMember]
     public string tgv_codigoexterno { get;set;} 
	  ///<summary>
     ///tgv_estado   
     ///</summary>
	 [DataMember]
     public int tgv_estado { get;set;} 
	  ///<summary>
     ///tgv_geofenseinicio   
     ///</summary>
	 [DataMember]
     public int tgv_geofenseinicio { get;set;} 
	  ///<summary>
     ///tgv_geofensefin   
     ///</summary>
	 [DataMember]
     public int tgv_geofensefin { get;set;} 
	  ///<summary>
     ///tgv_metadata   
     ///</summary>
	 [DataMember]
     public string tgv_metadata { get;set;} 
	  ///<summary>
     ///tgv_fecha_prg_inicio   
     ///</summary>
	 [DataMember]
     public DateTime? tgv_fecha_prg_inicio { get;set;} 
	  ///<summary>
     ///tgv_fecha_prg_fin   
     ///</summary>
	 [DataMember]
     public DateTime? tgv_fecha_prg_fin { get;set;} 
	  ///<summary>
     ///tgv_cuenta_cliente   
     ///</summary>
	 [DataMember]
     public int tgv_cuenta_cliente { get;set;} 
	  ///<summary>
     ///tgv_movil_transportista   
     ///</summary>
	 [DataMember]
     public int tgv_movil_transportista { get;set;} 
	  ///<summary>
     ///tgv_lugar_inicio   
     ///</summary>
	 [DataMember]
     public string tgv_lugar_inicio { get;set;} 
	  ///<summary>
     ///tgv_lugar_fin   
     ///</summary>
	 [DataMember]
     public string tgv_lugar_fin { get;set;} 
	 ///<summary>
        ///m_tgviaje Constructor
        ///</summary>
        public Simplem_tgviaje() : base()
  {
  InitClass();
  }
        ///<summary>
        ///m_tgviaje Constructor
        ///</summary>
        public Simplem_tgviaje(int Id, string Name, string tgv_nombre, DateTime? tgv_fechainicio, DateTime? tgv_fechafin, int tgv_reciid_inicio, int tgv_reciid_fin, int tgv_usuiid, int tgv_cueiid, string tgv_codigoexterno, int tgv_estado, int tgv_geofenseinicio, int tgv_geofensefin, string tgv_metadata, DateTime? tgv_fecha_prg_inicio, DateTime? tgv_fecha_prg_fin, int tgv_cuenta_cliente, int tgv_movil_transportista, string tgv_lugar_inicio, string tgv_lugar_fin) : base()
        {
            base.Id = Id;
						base.Name = Name;				 																																					 
				    this.tgv_nombre = tgv_nombre;
this.tgv_fechainicio = tgv_fechainicio;
this.tgv_fechafin = tgv_fechafin;
this.tgv_reciid_inicio = tgv_reciid_inicio;
this.tgv_reciid_fin = tgv_reciid_fin;
this.tgv_usuiid = tgv_usuiid;
this.tgv_cueiid = tgv_cueiid;
this.tgv_codigoexterno = tgv_codigoexterno;
this.tgv_estado = tgv_estado;
this.tgv_geofenseinicio = tgv_geofenseinicio;
this.tgv_geofensefin = tgv_geofensefin;
this.tgv_metadata = tgv_metadata;
this.tgv_fecha_prg_inicio = tgv_fecha_prg_inicio;
this.tgv_fecha_prg_fin = tgv_fecha_prg_fin;
this.tgv_cuenta_cliente = tgv_cuenta_cliente;
this.tgv_movil_transportista = tgv_movil_transportista;
this.tgv_lugar_inicio = tgv_lugar_inicio;
this.tgv_lugar_fin = tgv_lugar_fin;

            InitClass();
        }  								

				private void InitClass()
        {														
  				  base.Type = new ObjectType(3214, "m_tgviaje");
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
			BaseObject Object = new Dalm_tgviaje(SqlConfig, UserId, this);
			if(this.CallerObject != null)
			   Object.CallerObject = this.CallerObject;			
			return Object;
		}
///<summary>
    ///Get parent object
    ///</summary>
		public override CallerObject GetCallerObject()
		{
			Callerm_tgviaje Caller = new Callerm_tgviaje();
			Caller.Id = base.Id;
			Caller.Name = base.Name;
			Caller.tgv_nombre = this.tgv_nombre;
Caller.tgv_fechainicio = this.tgv_fechainicio;
Caller.tgv_fechafin = this.tgv_fechafin;
Caller.tgv_reciid_inicio = this.tgv_reciid_inicio;
Caller.tgv_reciid_fin = this.tgv_reciid_fin;
Caller.tgv_usuiid = this.tgv_usuiid;
Caller.tgv_cueiid = this.tgv_cueiid;
Caller.tgv_codigoexterno = this.tgv_codigoexterno;
Caller.tgv_estado = this.tgv_estado;
Caller.tgv_geofenseinicio = this.tgv_geofenseinicio;
Caller.tgv_geofensefin = this.tgv_geofensefin;
Caller.tgv_metadata = this.tgv_metadata;
Caller.tgv_fecha_prg_inicio = this.tgv_fecha_prg_inicio;
Caller.tgv_fecha_prg_fin = this.tgv_fecha_prg_fin;
Caller.tgv_cuenta_cliente = this.tgv_cuenta_cliente;
Caller.tgv_movil_transportista = this.tgv_movil_transportista;
Caller.tgv_lugar_inicio = this.tgv_lugar_inicio;
Caller.tgv_lugar_fin = this.tgv_lugar_fin;

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
               dt.Columns.Add(new DataColumn("tgv_nombre", typeof (string)));               
							 dt.Columns.Add(new DataColumn("tgv_fechainicio", typeof (DateTime)));               
							 dt.Columns.Add(new DataColumn("tgv_fechafin", typeof (DateTime)));               
							 dt.Columns.Add(new DataColumn("tgv_reciid_inicio", typeof (int)));               
							 dt.Columns.Add(new DataColumn("tgv_reciid_fin", typeof (int)));               
							 dt.Columns.Add(new DataColumn("tgv_usuiid", typeof (int)));               
							 dt.Columns.Add(new DataColumn("tgv_cueiid", typeof (int)));               
							 dt.Columns.Add(new DataColumn("tgv_codigoexterno", typeof (string)));               
							 dt.Columns.Add(new DataColumn("tgv_estado", typeof (int)));               
							 dt.Columns.Add(new DataColumn("tgv_geofenseinicio", typeof (int)));               
							 dt.Columns.Add(new DataColumn("tgv_geofensefin", typeof (int)));               
							 dt.Columns.Add(new DataColumn("tgv_metadata", typeof (string)));               
							 dt.Columns.Add(new DataColumn("tgv_fecha_prg_inicio", typeof (DateTime)));               
							 dt.Columns.Add(new DataColumn("tgv_fecha_prg_fin", typeof (DateTime)));               
							 dt.Columns.Add(new DataColumn("tgv_cuenta_cliente", typeof (int)));               
							 dt.Columns.Add(new DataColumn("tgv_movil_transportista", typeof (int)));               
							 dt.Columns.Add(new DataColumn("tgv_lugar_inicio", typeof (string)));               
							 dt.Columns.Add(new DataColumn("tgv_lugar_fin", typeof (string)));               
							 										
               //create Row  
               dr = dt.NewRow();
               
               //set Row
							 dr["Id"] = base.Id;

							 dr["Name"] = base.Name;
dr["tgv_nombre"] = (object)this.tgv_nombre ?? System.DBNull.Value;
dr["tgv_fechainicio"] = (object)this.tgv_fechainicio ?? System.DBNull.Value;
dr["tgv_fechafin"] = (object)this.tgv_fechafin ?? System.DBNull.Value;
dr["tgv_reciid_inicio"] = (object)this.tgv_reciid_inicio ?? System.DBNull.Value;
dr["tgv_reciid_fin"] = (object)this.tgv_reciid_fin ?? System.DBNull.Value;
dr["tgv_usuiid"] = (object)this.tgv_usuiid ?? System.DBNull.Value;
dr["tgv_cueiid"] = (object)this.tgv_cueiid ?? System.DBNull.Value;
dr["tgv_codigoexterno"] = (object)this.tgv_codigoexterno ?? System.DBNull.Value;
dr["tgv_estado"] = (object)this.tgv_estado ?? System.DBNull.Value;
dr["tgv_geofenseinicio"] = (object)this.tgv_geofenseinicio ?? System.DBNull.Value;
dr["tgv_geofensefin"] = (object)this.tgv_geofensefin ?? System.DBNull.Value;
dr["tgv_metadata"] = (object)this.tgv_metadata ?? System.DBNull.Value;
dr["tgv_fecha_prg_inicio"] = (object)this.tgv_fecha_prg_inicio ?? System.DBNull.Value;
dr["tgv_fecha_prg_fin"] = (object)this.tgv_fecha_prg_fin ?? System.DBNull.Value;
dr["tgv_cuenta_cliente"] = (object)this.tgv_cuenta_cliente ?? System.DBNull.Value;
dr["tgv_movil_transportista"] = (object)this.tgv_movil_transportista ?? System.DBNull.Value;
dr["tgv_lugar_inicio"] = (object)this.tgv_lugar_inicio ?? System.DBNull.Value;
dr["tgv_lugar_fin"] = (object)this.tgv_lugar_fin ?? System.DBNull.Value;
							 
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
