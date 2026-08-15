
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
    ///m_st_cabecera Slbf Class
    ///</summary>
    [DataContract]
    public class Simplem_st_cabecera : SimpleBaseObject
    { 
			 ///<summary>
     ///stc_iid_cuenta   
     ///</summary>
	 [DataMember]
     public int stc_iid_cuenta { get;set;} 
	  ///<summary>
     ///stc_inumero   
     ///</summary>
	 [DataMember]
     public int stc_inumero { get;set;} 
	  ///<summary>
     ///stc_ctipo_servicio   
     ///</summary>
	 [DataMember]
     public string stc_ctipo_servicio { get;set;} 
	  ///<summary>
     ///stc_mobservaciones   
     ///</summary>
	 [DataMember]
     public string stc_mobservaciones { get;set;} 
	  ///<summary>
     ///stc_dfecha_desde_1   
     ///</summary>
	 [DataMember]
     public DateTime? stc_dfecha_desde_1 { get;set;} 
	  ///<summary>
     ///stc_dfecha_hasta_1   
     ///</summary>
	 [DataMember]
     public DateTime? stc_dfecha_hasta_1 { get;set;} 
	  ///<summary>
     ///stc_dfecha_desde_2   
     ///</summary>
	 [DataMember]
     public DateTime? stc_dfecha_desde_2 { get;set;} 
	  ///<summary>
     ///stc_dfecha_hasta_2   
     ///</summary>
	 [DataMember]
     public DateTime? stc_dfecha_hasta_2 { get;set;} 
	  ///<summary>
     ///stc_dfecha_desde_3   
     ///</summary>
	 [DataMember]
     public DateTime? stc_dfecha_desde_3 { get;set;} 
	  ///<summary>
     ///stc_dfecha_hasta_3   
     ///</summary>
	 [DataMember]
     public DateTime? stc_dfecha_hasta_3 { get;set;} 
	  ///<summary>
     ///stc_dfecha_cierre   
     ///</summary>
	 [DataMember]
     public DateTime? stc_dfecha_cierre { get;set;} 
	  ///<summary>
     ///stc_ccontacto   
     ///</summary>
	 [DataMember]
     public string stc_ccontacto { get;set;} 
	  ///<summary>
     ///stc_nestado   
     ///</summary>
	 [DataMember]
     public Decimal stc_nestado { get;set;} 
	  ///<summary>
     ///stc_ctecnico_1   
     ///</summary>
	 [DataMember]
     public string stc_ctecnico_1 { get;set;} 
	  ///<summary>
     ///stc_ctecnico_2   
     ///</summary>
	 [DataMember]
     public string stc_ctecnico_2 { get;set;} 
	  ///<summary>
     ///stc_ctecnico_3   
     ///</summary>
	 [DataMember]
     public string stc_ctecnico_3 { get;set;} 
	  ///<summary>
     ///stc_ctecnico_4   
     ///</summary>
	 [DataMember]
     public string stc_ctecnico_4 { get;set;} 
	  ///<summary>
     ///stc_ctecnico_5   
     ///</summary>
	 [DataMember]
     public string stc_ctecnico_5 { get;set;} 
	  ///<summary>
     ///stc_yValor   
     ///</summary>
	 [DataMember]
     public Decimal stc_yValor { get;set;} 
	  ///<summary>
     ///stc_nreclamo_1   
     ///</summary>
	 [DataMember]
     public Decimal stc_nreclamo_1 { get;set;} 
	  ///<summary>
     ///stc_creclamo_1   
     ///</summary>
	 [DataMember]
     public string stc_creclamo_1 { get;set;} 
	  ///<summary>
     ///stc_nreclamo_2   
     ///</summary>
	 [DataMember]
     public Decimal stc_nreclamo_2 { get;set;} 
	  ///<summary>
     ///stc_creclamo_2   
     ///</summary>
	 [DataMember]
     public string stc_creclamo_2 { get;set;} 
	  ///<summary>
     ///stc_nreclamo_3   
     ///</summary>
	 [DataMember]
     public Decimal stc_nreclamo_3 { get;set;} 
	  ///<summary>
     ///stc_creclamo_3   
     ///</summary>
	 [DataMember]
     public string stc_creclamo_3 { get;set;} 
	  ///<summary>
     ///stc_nreclamo_4   
     ///</summary>
	 [DataMember]
     public Decimal stc_nreclamo_4 { get;set;} 
	  ///<summary>
     ///stc_creclamo_4   
     ///</summary>
	 [DataMember]
     public string stc_creclamo_4 { get;set;} 
	  ///<summary>
     ///stc_nreclamo_5   
     ///</summary>
	 [DataMember]
     public Decimal stc_nreclamo_5 { get;set;} 
	  ///<summary>
     ///stc_creclamo_5   
     ///</summary>
	 [DataMember]
     public string stc_creclamo_5 { get;set;} 
	  ///<summary>
     ///stc_cmovil_1   
     ///</summary>
	 [DataMember]
     public string stc_cmovil_1 { get;set;} 
	  ///<summary>
     ///stc_cmovil_2   
     ///</summary>
	 [DataMember]
     public string stc_cmovil_2 { get;set;} 
	  ///<summary>
     ///stc_dfecha_modificacion   
     ///</summary>
	 [DataMember]
     public DateTime? stc_dfecha_modificacion { get;set;} 
	  ///<summary>
     ///stc_ioperador   
     ///</summary>
	 [DataMember]
     public int stc_ioperador { get;set;} 
	  ///<summary>
     ///stc_minsumos   
     ///</summary>
	 [DataMember]
     public string stc_minsumos { get;set;} 
	  ///<summary>
     ///stc_dintecnico_1   
     ///</summary>
	 [DataMember]
     public DateTime? stc_dintecnico_1 { get;set;} 
	  ///<summary>
     ///stc_doutecnico_1   
     ///</summary>
	 [DataMember]
     public DateTime? stc_doutecnico_1 { get;set;} 
	  ///<summary>
     ///stc_dintecnico_2   
     ///</summary>
	 [DataMember]
     public DateTime? stc_dintecnico_2 { get;set;} 
	  ///<summary>
     ///stc_doutecnico_2   
     ///</summary>
	 [DataMember]
     public DateTime? stc_doutecnico_2 { get;set;} 
	  ///<summary>
     ///stc_dintecnico_3   
     ///</summary>
	 [DataMember]
     public DateTime? stc_dintecnico_3 { get;set;} 
	  ///<summary>
     ///stc_doutecnico_3   
     ///</summary>
	 [DataMember]
     public DateTime? stc_doutecnico_3 { get;set;} 
	  ///<summary>
     ///stc_cdeposito   
     ///</summary>
	 [DataMember]
     public string stc_cdeposito { get;set;} 
	  ///<summary>
     ///stf_dfecha_vto_orden   
     ///</summary>
	 [DataMember]
     public DateTime? stf_dfecha_vto_orden { get;set;} 
	  ///<summary>
     ///stc_dsalida_al_cliente_DSS   
     ///</summary>
	 [DataMember]
     public DateTime? stc_dsalida_al_cliente_DSS { get;set;} 
	  ///<summary>
     ///stc_darribo_al_cliente_DSS   
     ///</summary>
	 [DataMember]
     public DateTime? stc_darribo_al_cliente_DSS { get;set;} 
	  ///<summary>
     ///stc_dsalida_desde_cliente_DSS   
     ///</summary>
	 [DataMember]
     public DateTime? stc_dsalida_desde_cliente_DSS { get;set;} 
	  ///<summary>
     ///stc_iforma_viaje_DSS   
     ///</summary>
	 [DataMember]
     public int stc_iforma_viaje_DSS { get;set;} 
	  ///<summary>
     ///stc_cconformidad_html    
     ///</summary>
	 [DataMember]
     public string stc_cconformidad_html  { get;set;} 
	  ///<summary>
     ///stc_idorigenorden   
     ///</summary>
	 [DataMember]
     public int stc_idorigenorden { get;set;} 
	  ///<summary>
     ///stc_dfechapago   
     ///</summary>
	 [DataMember]
     public DateTime? stc_dfechapago { get;set;} 
	  ///<summary>
     ///stc_nvalorpagotecnico   
     ///</summary>
	 [DataMember]
     public Decimal stc_nvalorpagotecnico { get;set;} 
	  ///<summary>
     ///stc_ncostomanodeobra   
     ///</summary>
	 [DataMember]
     public Decimal stc_ncostomanodeobra { get;set;} 
	  ///<summary>
     ///stc_iPrioridad   
     ///</summary>
	 [DataMember]
     public int stc_iPrioridad { get;set;} 
	  ///<summary>
     ///stc_iOrganizacion   
     ///</summary>
	 [DataMember]
     public int stc_iOrganizacion { get;set;} 
	 ///<summary>
        ///m_st_cabecera Constructor
        ///</summary>
        public Simplem_st_cabecera() : base()
  {
  InitClass();
  }
        ///<summary>
        ///m_st_cabecera Constructor
        ///</summary>
        public Simplem_st_cabecera(int Id, string Name, int stc_iid_cuenta, int stc_inumero, string stc_ctipo_servicio, string stc_mobservaciones, DateTime? stc_dfecha_desde_1, DateTime? stc_dfecha_hasta_1, DateTime? stc_dfecha_desde_2, DateTime? stc_dfecha_hasta_2, DateTime? stc_dfecha_desde_3, DateTime? stc_dfecha_hasta_3, DateTime? stc_dfecha_cierre, string stc_ccontacto, Decimal stc_nestado, string stc_ctecnico_1, string stc_ctecnico_2, string stc_ctecnico_3, string stc_ctecnico_4, string stc_ctecnico_5, Decimal stc_yValor, Decimal stc_nreclamo_1, string stc_creclamo_1, Decimal stc_nreclamo_2, string stc_creclamo_2, Decimal stc_nreclamo_3, string stc_creclamo_3, Decimal stc_nreclamo_4, string stc_creclamo_4, Decimal stc_nreclamo_5, string stc_creclamo_5, string stc_cmovil_1, string stc_cmovil_2, DateTime? stc_dfecha_modificacion, int stc_ioperador, string stc_minsumos, DateTime? stc_dintecnico_1, DateTime? stc_doutecnico_1, DateTime? stc_dintecnico_2, DateTime? stc_doutecnico_2, DateTime? stc_dintecnico_3, DateTime? stc_doutecnico_3, string stc_cdeposito, DateTime? stf_dfecha_vto_orden, DateTime? stc_dsalida_al_cliente_DSS, DateTime? stc_darribo_al_cliente_DSS, DateTime? stc_dsalida_desde_cliente_DSS, int stc_iforma_viaje_DSS, string stc_cconformidad_html , int stc_idorigenorden, DateTime? stc_dfechapago, Decimal stc_nvalorpagotecnico, Decimal stc_ncostomanodeobra, int stc_iPrioridad, int stc_iOrganizacion) : base()
        {
            base.Id = Id;
						base.Name = Name;				 																																					 
				    this.stc_iid_cuenta = stc_iid_cuenta;
this.stc_inumero = stc_inumero;
this.stc_ctipo_servicio = stc_ctipo_servicio;
this.stc_mobservaciones = stc_mobservaciones;
this.stc_dfecha_desde_1 = stc_dfecha_desde_1;
this.stc_dfecha_hasta_1 = stc_dfecha_hasta_1;
this.stc_dfecha_desde_2 = stc_dfecha_desde_2;
this.stc_dfecha_hasta_2 = stc_dfecha_hasta_2;
this.stc_dfecha_desde_3 = stc_dfecha_desde_3;
this.stc_dfecha_hasta_3 = stc_dfecha_hasta_3;
this.stc_dfecha_cierre = stc_dfecha_cierre;
this.stc_ccontacto = stc_ccontacto;
this.stc_nestado = stc_nestado;
this.stc_ctecnico_1 = stc_ctecnico_1;
this.stc_ctecnico_2 = stc_ctecnico_2;
this.stc_ctecnico_3 = stc_ctecnico_3;
this.stc_ctecnico_4 = stc_ctecnico_4;
this.stc_ctecnico_5 = stc_ctecnico_5;
this.stc_yValor = stc_yValor;
this.stc_nreclamo_1 = stc_nreclamo_1;
this.stc_creclamo_1 = stc_creclamo_1;
this.stc_nreclamo_2 = stc_nreclamo_2;
this.stc_creclamo_2 = stc_creclamo_2;
this.stc_nreclamo_3 = stc_nreclamo_3;
this.stc_creclamo_3 = stc_creclamo_3;
this.stc_nreclamo_4 = stc_nreclamo_4;
this.stc_creclamo_4 = stc_creclamo_4;
this.stc_nreclamo_5 = stc_nreclamo_5;
this.stc_creclamo_5 = stc_creclamo_5;
this.stc_cmovil_1 = stc_cmovil_1;
this.stc_cmovil_2 = stc_cmovil_2;
this.stc_dfecha_modificacion = stc_dfecha_modificacion;
this.stc_ioperador = stc_ioperador;
this.stc_minsumos = stc_minsumos;
this.stc_dintecnico_1 = stc_dintecnico_1;
this.stc_doutecnico_1 = stc_doutecnico_1;
this.stc_dintecnico_2 = stc_dintecnico_2;
this.stc_doutecnico_2 = stc_doutecnico_2;
this.stc_dintecnico_3 = stc_dintecnico_3;
this.stc_doutecnico_3 = stc_doutecnico_3;
this.stc_cdeposito = stc_cdeposito;
this.stf_dfecha_vto_orden = stf_dfecha_vto_orden;
this.stc_dsalida_al_cliente_DSS = stc_dsalida_al_cliente_DSS;
this.stc_darribo_al_cliente_DSS = stc_darribo_al_cliente_DSS;
this.stc_dsalida_desde_cliente_DSS = stc_dsalida_desde_cliente_DSS;
this.stc_iforma_viaje_DSS = stc_iforma_viaje_DSS;
this.stc_cconformidad_html  = stc_cconformidad_html ;
this.stc_idorigenorden = stc_idorigenorden;
this.stc_dfechapago = stc_dfechapago;
this.stc_nvalorpagotecnico = stc_nvalorpagotecnico;
this.stc_ncostomanodeobra = stc_ncostomanodeobra;
this.stc_iPrioridad = stc_iPrioridad;
this.stc_iOrganizacion = stc_iOrganizacion;

            InitClass();
        }  								

				private void InitClass()
        {														
  				  base.Type = new ObjectType(3102, "m_st_cabecera");
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
			BaseObject Object = new Dalm_st_cabecera(SqlConfig, UserId, this);
			if(this.CallerObject != null)
			   Object.CallerObject = this.CallerObject;			
			return Object;
		}
///<summary>
    ///Get parent object
    ///</summary>
		public override CallerObject GetCallerObject()
		{
			Callerm_st_cabecera Caller = new Callerm_st_cabecera();
			Caller.Id = base.Id;
			Caller.Name = base.Name;
			Caller.stc_iid_cuenta = this.stc_iid_cuenta;
Caller.stc_inumero = this.stc_inumero;
Caller.stc_ctipo_servicio = this.stc_ctipo_servicio;
Caller.stc_mobservaciones = this.stc_mobservaciones;
Caller.stc_dfecha_desde_1 = this.stc_dfecha_desde_1;
Caller.stc_dfecha_hasta_1 = this.stc_dfecha_hasta_1;
Caller.stc_dfecha_desde_2 = this.stc_dfecha_desde_2;
Caller.stc_dfecha_hasta_2 = this.stc_dfecha_hasta_2;
Caller.stc_dfecha_desde_3 = this.stc_dfecha_desde_3;
Caller.stc_dfecha_hasta_3 = this.stc_dfecha_hasta_3;
Caller.stc_dfecha_cierre = this.stc_dfecha_cierre;
Caller.stc_ccontacto = this.stc_ccontacto;
Caller.stc_nestado = this.stc_nestado;
Caller.stc_ctecnico_1 = this.stc_ctecnico_1;
Caller.stc_ctecnico_2 = this.stc_ctecnico_2;
Caller.stc_ctecnico_3 = this.stc_ctecnico_3;
Caller.stc_ctecnico_4 = this.stc_ctecnico_4;
Caller.stc_ctecnico_5 = this.stc_ctecnico_5;
Caller.stc_yValor = this.stc_yValor;
Caller.stc_nreclamo_1 = this.stc_nreclamo_1;
Caller.stc_creclamo_1 = this.stc_creclamo_1;
Caller.stc_nreclamo_2 = this.stc_nreclamo_2;
Caller.stc_creclamo_2 = this.stc_creclamo_2;
Caller.stc_nreclamo_3 = this.stc_nreclamo_3;
Caller.stc_creclamo_3 = this.stc_creclamo_3;
Caller.stc_nreclamo_4 = this.stc_nreclamo_4;
Caller.stc_creclamo_4 = this.stc_creclamo_4;
Caller.stc_nreclamo_5 = this.stc_nreclamo_5;
Caller.stc_creclamo_5 = this.stc_creclamo_5;
Caller.stc_cmovil_1 = this.stc_cmovil_1;
Caller.stc_cmovil_2 = this.stc_cmovil_2;
Caller.stc_dfecha_modificacion = this.stc_dfecha_modificacion;
Caller.stc_ioperador = this.stc_ioperador;
Caller.stc_minsumos = this.stc_minsumos;
Caller.stc_dintecnico_1 = this.stc_dintecnico_1;
Caller.stc_doutecnico_1 = this.stc_doutecnico_1;
Caller.stc_dintecnico_2 = this.stc_dintecnico_2;
Caller.stc_doutecnico_2 = this.stc_doutecnico_2;
Caller.stc_dintecnico_3 = this.stc_dintecnico_3;
Caller.stc_doutecnico_3 = this.stc_doutecnico_3;
Caller.stc_cdeposito = this.stc_cdeposito;
Caller.stf_dfecha_vto_orden = this.stf_dfecha_vto_orden;
Caller.stc_dsalida_al_cliente_DSS = this.stc_dsalida_al_cliente_DSS;
Caller.stc_darribo_al_cliente_DSS = this.stc_darribo_al_cliente_DSS;
Caller.stc_dsalida_desde_cliente_DSS = this.stc_dsalida_desde_cliente_DSS;
Caller.stc_iforma_viaje_DSS = this.stc_iforma_viaje_DSS;
Caller.stc_cconformidad_html  = this.stc_cconformidad_html ;
Caller.stc_idorigenorden = this.stc_idorigenorden;
Caller.stc_dfechapago = this.stc_dfechapago;
Caller.stc_nvalorpagotecnico = this.stc_nvalorpagotecnico;
Caller.stc_ncostomanodeobra = this.stc_ncostomanodeobra;
Caller.stc_iPrioridad = this.stc_iPrioridad;
Caller.stc_iOrganizacion = this.stc_iOrganizacion;

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
               dt.Columns.Add(new DataColumn("stc_iid_cuenta", typeof (int)));               
							 dt.Columns.Add(new DataColumn("stc_inumero", typeof (int)));               
							 dt.Columns.Add(new DataColumn("stc_ctipo_servicio", typeof (string)));               
							 dt.Columns.Add(new DataColumn("stc_mobservaciones", typeof (string)));               
							 dt.Columns.Add(new DataColumn("stc_dfecha_desde_1", typeof (DateTime)));               
							 dt.Columns.Add(new DataColumn("stc_dfecha_hasta_1", typeof (DateTime)));               
							 dt.Columns.Add(new DataColumn("stc_dfecha_desde_2", typeof (DateTime)));               
							 dt.Columns.Add(new DataColumn("stc_dfecha_hasta_2", typeof (DateTime)));               
							 dt.Columns.Add(new DataColumn("stc_dfecha_desde_3", typeof (DateTime)));               
							 dt.Columns.Add(new DataColumn("stc_dfecha_hasta_3", typeof (DateTime)));               
							 dt.Columns.Add(new DataColumn("stc_dfecha_cierre", typeof (DateTime)));               
							 dt.Columns.Add(new DataColumn("stc_ccontacto", typeof (string)));               
							 dt.Columns.Add(new DataColumn("stc_nestado", typeof (Decimal)));               
							 dt.Columns.Add(new DataColumn("stc_ctecnico_1", typeof (string)));               
							 dt.Columns.Add(new DataColumn("stc_ctecnico_2", typeof (string)));               
							 dt.Columns.Add(new DataColumn("stc_ctecnico_3", typeof (string)));               
							 dt.Columns.Add(new DataColumn("stc_ctecnico_4", typeof (string)));               
							 dt.Columns.Add(new DataColumn("stc_ctecnico_5", typeof (string)));               
							 dt.Columns.Add(new DataColumn("stc_yValor", typeof (Decimal)));               
							 dt.Columns.Add(new DataColumn("stc_nreclamo_1", typeof (Decimal)));               
							 dt.Columns.Add(new DataColumn("stc_creclamo_1", typeof (string)));               
							 dt.Columns.Add(new DataColumn("stc_nreclamo_2", typeof (Decimal)));               
							 dt.Columns.Add(new DataColumn("stc_creclamo_2", typeof (string)));               
							 dt.Columns.Add(new DataColumn("stc_nreclamo_3", typeof (Decimal)));               
							 dt.Columns.Add(new DataColumn("stc_creclamo_3", typeof (string)));               
							 dt.Columns.Add(new DataColumn("stc_nreclamo_4", typeof (Decimal)));               
							 dt.Columns.Add(new DataColumn("stc_creclamo_4", typeof (string)));               
							 dt.Columns.Add(new DataColumn("stc_nreclamo_5", typeof (Decimal)));               
							 dt.Columns.Add(new DataColumn("stc_creclamo_5", typeof (string)));               
							 dt.Columns.Add(new DataColumn("stc_cmovil_1", typeof (string)));               
							 dt.Columns.Add(new DataColumn("stc_cmovil_2", typeof (string)));               
							 dt.Columns.Add(new DataColumn("stc_dfecha_modificacion", typeof (DateTime)));               
							 dt.Columns.Add(new DataColumn("stc_ioperador", typeof (int)));               
							 dt.Columns.Add(new DataColumn("stc_minsumos", typeof (string)));               
							 dt.Columns.Add(new DataColumn("stc_dintecnico_1", typeof (DateTime)));               
							 dt.Columns.Add(new DataColumn("stc_doutecnico_1", typeof (DateTime)));               
							 dt.Columns.Add(new DataColumn("stc_dintecnico_2", typeof (DateTime)));               
							 dt.Columns.Add(new DataColumn("stc_doutecnico_2", typeof (DateTime)));               
							 dt.Columns.Add(new DataColumn("stc_dintecnico_3", typeof (DateTime)));               
							 dt.Columns.Add(new DataColumn("stc_doutecnico_3", typeof (DateTime)));               
							 dt.Columns.Add(new DataColumn("stc_cdeposito", typeof (string)));               
							 dt.Columns.Add(new DataColumn("stf_dfecha_vto_orden", typeof (DateTime)));               
							 dt.Columns.Add(new DataColumn("stc_dsalida_al_cliente_DSS", typeof (DateTime)));               
							 dt.Columns.Add(new DataColumn("stc_darribo_al_cliente_DSS", typeof (DateTime)));               
							 dt.Columns.Add(new DataColumn("stc_dsalida_desde_cliente_DSS", typeof (DateTime)));               
							 dt.Columns.Add(new DataColumn("stc_iforma_viaje_DSS", typeof (int)));               
							 dt.Columns.Add(new DataColumn("stc_cconformidad_html ", typeof (string)));               
							 dt.Columns.Add(new DataColumn("stc_idorigenorden", typeof (int)));               
							 dt.Columns.Add(new DataColumn("stc_dfechapago", typeof (DateTime)));               
							 dt.Columns.Add(new DataColumn("stc_nvalorpagotecnico", typeof (Decimal)));               
							 dt.Columns.Add(new DataColumn("stc_ncostomanodeobra", typeof (Decimal)));               
							 dt.Columns.Add(new DataColumn("stc_iPrioridad", typeof (int)));               
							 dt.Columns.Add(new DataColumn("stc_iOrganizacion", typeof (int)));               
							 										
               //create Row  
               dr = dt.NewRow();
               
               //set Row
							 dr["Id"] = base.Id;

							 dr["Name"] = base.Name;
dr["stc_iid_cuenta"] = (object)this.stc_iid_cuenta ?? System.DBNull.Value;
dr["stc_inumero"] = (object)this.stc_inumero ?? System.DBNull.Value;
dr["stc_ctipo_servicio"] = (object)this.stc_ctipo_servicio ?? System.DBNull.Value;
dr["stc_mobservaciones"] = (object)this.stc_mobservaciones ?? System.DBNull.Value;
dr["stc_dfecha_desde_1"] = (object)this.stc_dfecha_desde_1 ?? System.DBNull.Value;
dr["stc_dfecha_hasta_1"] = (object)this.stc_dfecha_hasta_1 ?? System.DBNull.Value;
dr["stc_dfecha_desde_2"] = (object)this.stc_dfecha_desde_2 ?? System.DBNull.Value;
dr["stc_dfecha_hasta_2"] = (object)this.stc_dfecha_hasta_2 ?? System.DBNull.Value;
dr["stc_dfecha_desde_3"] = (object)this.stc_dfecha_desde_3 ?? System.DBNull.Value;
dr["stc_dfecha_hasta_3"] = (object)this.stc_dfecha_hasta_3 ?? System.DBNull.Value;
dr["stc_dfecha_cierre"] = (object)this.stc_dfecha_cierre ?? System.DBNull.Value;
dr["stc_ccontacto"] = (object)this.stc_ccontacto ?? System.DBNull.Value;
dr["stc_nestado"] = (object)this.stc_nestado ?? System.DBNull.Value;
dr["stc_ctecnico_1"] = (object)this.stc_ctecnico_1 ?? System.DBNull.Value;
dr["stc_ctecnico_2"] = (object)this.stc_ctecnico_2 ?? System.DBNull.Value;
dr["stc_ctecnico_3"] = (object)this.stc_ctecnico_3 ?? System.DBNull.Value;
dr["stc_ctecnico_4"] = (object)this.stc_ctecnico_4 ?? System.DBNull.Value;
dr["stc_ctecnico_5"] = (object)this.stc_ctecnico_5 ?? System.DBNull.Value;
dr["stc_yValor"] = (object)this.stc_yValor ?? System.DBNull.Value;
dr["stc_nreclamo_1"] = (object)this.stc_nreclamo_1 ?? System.DBNull.Value;
dr["stc_creclamo_1"] = (object)this.stc_creclamo_1 ?? System.DBNull.Value;
dr["stc_nreclamo_2"] = (object)this.stc_nreclamo_2 ?? System.DBNull.Value;
dr["stc_creclamo_2"] = (object)this.stc_creclamo_2 ?? System.DBNull.Value;
dr["stc_nreclamo_3"] = (object)this.stc_nreclamo_3 ?? System.DBNull.Value;
dr["stc_creclamo_3"] = (object)this.stc_creclamo_3 ?? System.DBNull.Value;
dr["stc_nreclamo_4"] = (object)this.stc_nreclamo_4 ?? System.DBNull.Value;
dr["stc_creclamo_4"] = (object)this.stc_creclamo_4 ?? System.DBNull.Value;
dr["stc_nreclamo_5"] = (object)this.stc_nreclamo_5 ?? System.DBNull.Value;
dr["stc_creclamo_5"] = (object)this.stc_creclamo_5 ?? System.DBNull.Value;
dr["stc_cmovil_1"] = (object)this.stc_cmovil_1 ?? System.DBNull.Value;
dr["stc_cmovil_2"] = (object)this.stc_cmovil_2 ?? System.DBNull.Value;
dr["stc_dfecha_modificacion"] = (object)this.stc_dfecha_modificacion ?? System.DBNull.Value;
dr["stc_ioperador"] = (object)this.stc_ioperador ?? System.DBNull.Value;
dr["stc_minsumos"] = (object)this.stc_minsumos ?? System.DBNull.Value;
dr["stc_dintecnico_1"] = (object)this.stc_dintecnico_1 ?? System.DBNull.Value;
dr["stc_doutecnico_1"] = (object)this.stc_doutecnico_1 ?? System.DBNull.Value;
dr["stc_dintecnico_2"] = (object)this.stc_dintecnico_2 ?? System.DBNull.Value;
dr["stc_doutecnico_2"] = (object)this.stc_doutecnico_2 ?? System.DBNull.Value;
dr["stc_dintecnico_3"] = (object)this.stc_dintecnico_3 ?? System.DBNull.Value;
dr["stc_doutecnico_3"] = (object)this.stc_doutecnico_3 ?? System.DBNull.Value;
dr["stc_cdeposito"] = (object)this.stc_cdeposito ?? System.DBNull.Value;
dr["stf_dfecha_vto_orden"] = (object)this.stf_dfecha_vto_orden ?? System.DBNull.Value;
dr["stc_dsalida_al_cliente_DSS"] = (object)this.stc_dsalida_al_cliente_DSS ?? System.DBNull.Value;
dr["stc_darribo_al_cliente_DSS"] = (object)this.stc_darribo_al_cliente_DSS ?? System.DBNull.Value;
dr["stc_dsalida_desde_cliente_DSS"] = (object)this.stc_dsalida_desde_cliente_DSS ?? System.DBNull.Value;
dr["stc_iforma_viaje_DSS"] = (object)this.stc_iforma_viaje_DSS ?? System.DBNull.Value;
dr["stc_cconformidad_html "] = (object)this.stc_cconformidad_html  ?? System.DBNull.Value;
dr["stc_idorigenorden"] = (object)this.stc_idorigenorden ?? System.DBNull.Value;
dr["stc_dfechapago"] = (object)this.stc_dfechapago ?? System.DBNull.Value;
dr["stc_nvalorpagotecnico"] = (object)this.stc_nvalorpagotecnico ?? System.DBNull.Value;
dr["stc_ncostomanodeobra"] = (object)this.stc_ncostomanodeobra ?? System.DBNull.Value;
dr["stc_iPrioridad"] = (object)this.stc_iPrioridad ?? System.DBNull.Value;
dr["stc_iOrganizacion"] = (object)this.stc_iOrganizacion ?? System.DBNull.Value;
							 
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
