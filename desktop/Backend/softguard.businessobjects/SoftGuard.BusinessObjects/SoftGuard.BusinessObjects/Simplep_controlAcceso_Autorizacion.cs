
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
    ///p_controlAcceso_Autorizacion Slbf Class
    ///</summary>
    [DataContract]
    public class Simplep_controlAcceso_Autorizacion : SimpleBaseObject
    { 
			 ///<summary>
     ///caa_idautorizado   
     ///</summary>
	 [DataMember]
     public int caa_idautorizado { get;set;} 
	  ///<summary>
     ///caa_tipo   
     ///</summary>
	 [DataMember]
     public int caa_tipo { get;set;} 
	  ///<summary>
     ///caa_fechadesde   
     ///</summary>
	 [DataMember]
     public DateTime? caa_fechadesde { get;set;} 
	  ///<summary>
     ///caa_fechahasta   
     ///</summary>
	 [DataMember]
     public DateTime? caa_fechahasta { get;set;} 
	  ///<summary>
     ///caa_diasemana   
     ///</summary>
	 [DataMember]
     public int caa_diasemana { get;set;} 
	  ///<summary>
     ///caa_horadesde   
     ///</summary>
	 [DataMember]
     public string caa_horadesde { get;set;} 
	  ///<summary>
     ///caa_horahasta   
     ///</summary>
	 [DataMember]
     public string caa_horahasta { get;set;} 
	  ///<summary>
     ///caa_estado   
     ///</summary>
	 [DataMember]
     public int caa_estado { get;set;} 
	  ///<summary>
     ///caa_codigo   
     ///</summary>
	 [DataMember]
     public string caa_codigo { get;set;} 
	  ///<summary>
     ///caa_usuautoriza   
     ///</summary>
	 [DataMember]
     public int caa_usuautoriza { get;set;} 
	  ///<summary>
     ///caa_marcavehiculo   
     ///</summary>
	 [DataMember]
     public string caa_marcavehiculo { get;set;} 
	  ///<summary>
     ///caa_patenteVehiculo   
     ///</summary>
	 [DataMember]
     public string caa_patenteVehiculo { get;set;} 
	  ///<summary>
     ///caa_tipoVisita   
     ///</summary>
	 [DataMember]
     public int caa_tipoVisita { get;set;} 
	  ///<summary>
     ///caa_comentarios   
     ///</summary>
	 [DataMember]
     public string caa_comentarios { get;set;} 
	 ///<summary>
        ///p_controlAcceso_Autorizacion Constructor
        ///</summary>
        public Simplep_controlAcceso_Autorizacion() : base()
  {
  InitClass();
  }
        ///<summary>
        ///p_controlAcceso_Autorizacion Constructor
        ///</summary>
        public Simplep_controlAcceso_Autorizacion(int Id, string Name, int caa_idautorizado, int caa_tipo, DateTime? caa_fechadesde, DateTime? caa_fechahasta, int caa_diasemana, string caa_horadesde, string caa_horahasta, int caa_estado, string caa_codigo, int caa_usuautoriza, string caa_marcavehiculo, string caa_patenteVehiculo, int caa_tipoVisita, string caa_comentarios) : base()
        {
            base.Id = Id;
						base.Name = Name;				 																																					 
				    this.caa_idautorizado = caa_idautorizado;
this.caa_tipo = caa_tipo;
this.caa_fechadesde = caa_fechadesde;
this.caa_fechahasta = caa_fechahasta;
this.caa_diasemana = caa_diasemana;
this.caa_horadesde = caa_horadesde;
this.caa_horahasta = caa_horahasta;
this.caa_estado = caa_estado;
this.caa_codigo = caa_codigo;
this.caa_usuautoriza = caa_usuautoriza;
this.caa_marcavehiculo = caa_marcavehiculo;
this.caa_patenteVehiculo = caa_patenteVehiculo;
this.caa_tipoVisita = caa_tipoVisita;
this.caa_comentarios = caa_comentarios;

            InitClass();
        }  								

				private void InitClass()
        {														
  				  base.Type = new ObjectType(3207, "p_controlAcceso_Autorizacion");
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
			BaseObject Object = new Dalp_controlAcceso_Autorizacion(SqlConfig, UserId, this);
			if(this.CallerObject != null)
			   Object.CallerObject = this.CallerObject;			
			return Object;
		}
///<summary>
    ///Get parent object
    ///</summary>
		public override CallerObject GetCallerObject()
		{
			Callerp_controlAcceso_Autorizacion Caller = new Callerp_controlAcceso_Autorizacion();
			Caller.Id = base.Id;
			Caller.Name = base.Name;
			Caller.caa_idautorizado = this.caa_idautorizado;
Caller.caa_tipo = this.caa_tipo;
Caller.caa_fechadesde = this.caa_fechadesde;
Caller.caa_fechahasta = this.caa_fechahasta;
Caller.caa_diasemana = this.caa_diasemana;
Caller.caa_horadesde = this.caa_horadesde;
Caller.caa_horahasta = this.caa_horahasta;
Caller.caa_estado = this.caa_estado;
Caller.caa_codigo = this.caa_codigo;
Caller.caa_usuautoriza = this.caa_usuautoriza;
Caller.caa_marcavehiculo = this.caa_marcavehiculo;
Caller.caa_patenteVehiculo = this.caa_patenteVehiculo;
Caller.caa_tipoVisita = this.caa_tipoVisita;
Caller.caa_comentarios = this.caa_comentarios;

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
               dt.Columns.Add(new DataColumn("caa_idautorizado", typeof (int)));               
							 dt.Columns.Add(new DataColumn("caa_tipo", typeof (int)));               
							 dt.Columns.Add(new DataColumn("caa_fechadesde", typeof (DateTime)));               
							 dt.Columns.Add(new DataColumn("caa_fechahasta", typeof (DateTime)));               
							 dt.Columns.Add(new DataColumn("caa_diasemana", typeof (int)));               
							 dt.Columns.Add(new DataColumn("caa_horadesde", typeof (string)));               
							 dt.Columns.Add(new DataColumn("caa_horahasta", typeof (string)));               
							 dt.Columns.Add(new DataColumn("caa_estado", typeof (int)));               
							 dt.Columns.Add(new DataColumn("caa_codigo", typeof (string)));               
							 dt.Columns.Add(new DataColumn("caa_usuautoriza", typeof (int)));               
							 dt.Columns.Add(new DataColumn("caa_marcavehiculo", typeof (string)));               
							 dt.Columns.Add(new DataColumn("caa_patenteVehiculo", typeof (string)));               
							 dt.Columns.Add(new DataColumn("caa_tipoVisita", typeof (int)));               
							 dt.Columns.Add(new DataColumn("caa_comentarios", typeof (string)));               
							 										
               //create Row  
               dr = dt.NewRow();
               
               //set Row
							 dr["Id"] = base.Id;

							 dr["Name"] = base.Name;
dr["caa_idautorizado"] = (object)this.caa_idautorizado ?? System.DBNull.Value;
dr["caa_tipo"] = (object)this.caa_tipo ?? System.DBNull.Value;
dr["caa_fechadesde"] = (object)this.caa_fechadesde ?? System.DBNull.Value;
dr["caa_fechahasta"] = (object)this.caa_fechahasta ?? System.DBNull.Value;
dr["caa_diasemana"] = (object)this.caa_diasemana ?? System.DBNull.Value;
dr["caa_horadesde"] = (object)this.caa_horadesde ?? System.DBNull.Value;
dr["caa_horahasta"] = (object)this.caa_horahasta ?? System.DBNull.Value;
dr["caa_estado"] = (object)this.caa_estado ?? System.DBNull.Value;
dr["caa_codigo"] = (object)this.caa_codigo ?? System.DBNull.Value;
dr["caa_usuautoriza"] = (object)this.caa_usuautoriza ?? System.DBNull.Value;
dr["caa_marcavehiculo"] = (object)this.caa_marcavehiculo ?? System.DBNull.Value;
dr["caa_patenteVehiculo"] = (object)this.caa_patenteVehiculo ?? System.DBNull.Value;
dr["caa_tipoVisita"] = (object)this.caa_tipoVisita ?? System.DBNull.Value;
dr["caa_comentarios"] = (object)this.caa_comentarios ?? System.DBNull.Value;
							 
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
