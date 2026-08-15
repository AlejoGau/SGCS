
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
    ///p_recepcion Slbf Class
    ///</summary>
    [DataContract]
    public class Simplep_recepcion : SimpleBaseObject
    { 
			 ///<summary>
     ///rec_iidcuenta   
     ///</summary>
	 [DataMember]
     public int rec_iidcuenta { get;set;} 
	  ///<summary>
     ///rec_calarma   
     ///</summary>
	 [DataMember]
     public string rec_calarma { get;set;} 
	  ///<summary>
     ///rec_czona   
     ///</summary>
	 [DataMember]
     public string rec_czona { get;set;} 
	  ///<summary>
     ///rec_iusuario   
     ///</summary>
	 [DataMember]
     public int rec_iusuario { get;set;} 
	  ///<summary>
     ///rec_tfechahora   
     ///</summary>
	 [DataMember]
     public DateTime? rec_tfechahora { get;set;} 
	  ///<summary>
     ///rec_nestado   
     ///</summary>
	 [DataMember]
     public Decimal rec_nestado { get;set;} 
	  ///<summary>
     ///rec_cContenido   
     ///</summary>
	 [DataMember]
     public string rec_cContenido { get;set;} 
	  ///<summary>
     ///rec_tFechaProceso   
     ///</summary>
	 [DataMember]
     public DateTime? rec_tFechaProceso { get;set;} 
	  ///<summary>
     ///rec_ioperador   
     ///</summary>
	 [DataMember]
     public int rec_ioperador { get;set;} 
	  ///<summary>
     ///rec_cObservaciones   
     ///</summary>
	 [DataMember]
     public string rec_cObservaciones { get;set;} 
	  ///<summary>
     ///rec_cTerminal   
     ///</summary>
	 [DataMember]
     public string rec_cTerminal { get;set;} 
	  ///<summary>
     ///rec_idResolucion   
     ///</summary>
	 [DataMember]
     public string rec_idResolucion { get;set;} 
	  ///<summary>
     ///rec_idReceptor   
     ///</summary>
	 [DataMember]
     public int rec_idReceptor { get;set;} 
	  ///<summary>
     ///rec_cCategorizacion   
     ///</summary>
	 [DataMember]
     public string rec_cCategorizacion { get;set;} 
	  ///<summary>
     ///rec_iNYR   
     ///</summary>
	 [DataMember]
     public int rec_iNYR { get;set;} 
	  ///<summary>
     ///rec_iTE   
     ///</summary>
	 [DataMember]
     public int rec_iTE { get;set;} 
	  ///<summary>
     ///rec_tFechaRecepcion   
     ///</summary>
	 [DataMember]
     public DateTime? rec_tFechaRecepcion { get;set;} 
	  ///<summary>
     ///rec_nOrigen   
     ///</summary>
	 [DataMember]
     public Decimal rec_nOrigen { get;set;} 
	  ///<summary>
     ///rec_idMap   
     ///</summary>
	 [DataMember]
     public int rec_idMap { get;set;} 
	  ///<summary>
     ///rec_idFwd   
     ///</summary>
	 [DataMember]
     public int rec_idFwd { get;set;} 
	  ///<summary>
     ///rec_iMinutosEspera   
     ///</summary>
	 [DataMember]
     public int rec_iMinutosEspera { get;set;} 
	  ///<summary>
     ///rec_iPuerto   
     ///</summary>
	 [DataMember]
     public int rec_iPuerto { get;set;} 
	  ///<summary>
     ///rec_idLoc   
     ///</summary>
	 [DataMember]
     public int rec_idLoc { get;set;} 
	 ///<summary>
        ///p_recepcion Constructor
        ///</summary>
        public Simplep_recepcion() : base()
  {
  InitClass();
  }
        ///<summary>
        ///p_recepcion Constructor
        ///</summary>
        public Simplep_recepcion(int Id, string Name, int rec_iidcuenta, string rec_calarma, string rec_czona, int rec_iusuario, DateTime? rec_tfechahora, Decimal rec_nestado, string rec_cContenido, DateTime? rec_tFechaProceso, int rec_ioperador, string rec_cObservaciones, string rec_cTerminal, string rec_idResolucion, int rec_idReceptor, string rec_cCategorizacion, int rec_iNYR, int rec_iTE, DateTime? rec_tFechaRecepcion, Decimal rec_nOrigen, int rec_idMap, int rec_idFwd, int rec_iMinutosEspera, int rec_iPuerto, int rec_idLoc) : base()
        {
            base.Id = Id;
						base.Name = Name;				 																																					 
				    this.rec_iidcuenta = rec_iidcuenta;
this.rec_calarma = rec_calarma;
this.rec_czona = rec_czona;
this.rec_iusuario = rec_iusuario;
this.rec_tfechahora = rec_tfechahora;
this.rec_nestado = rec_nestado;
this.rec_cContenido = rec_cContenido;
this.rec_tFechaProceso = rec_tFechaProceso;
this.rec_ioperador = rec_ioperador;
this.rec_cObservaciones = rec_cObservaciones;
this.rec_cTerminal = rec_cTerminal;
this.rec_idResolucion = rec_idResolucion;
this.rec_idReceptor = rec_idReceptor;
this.rec_cCategorizacion = rec_cCategorizacion;
this.rec_iNYR = rec_iNYR;
this.rec_iTE = rec_iTE;
this.rec_tFechaRecepcion = rec_tFechaRecepcion;
this.rec_nOrigen = rec_nOrigen;
this.rec_idMap = rec_idMap;
this.rec_idFwd = rec_idFwd;
this.rec_iMinutosEspera = rec_iMinutosEspera;
this.rec_iPuerto = rec_iPuerto;
this.rec_idLoc = rec_idLoc;

            InitClass();
        }  								

				private void InitClass()
        {														
  				  base.Type = new ObjectType(3100, "p_recepcion");
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
			BaseObject Object = new Dalp_recepcion(SqlConfig, UserId, this);
			if(this.CallerObject != null)
			   Object.CallerObject = this.CallerObject;			
			return Object;
		}
///<summary>
    ///Get parent object
    ///</summary>
		public override CallerObject GetCallerObject()
		{
			Callerp_recepcion Caller = new Callerp_recepcion();
			Caller.Id = base.Id;
			Caller.Name = base.Name;
			Caller.rec_iidcuenta = this.rec_iidcuenta;
Caller.rec_calarma = this.rec_calarma;
Caller.rec_czona = this.rec_czona;
Caller.rec_iusuario = this.rec_iusuario;
Caller.rec_tfechahora = this.rec_tfechahora;
Caller.rec_nestado = this.rec_nestado;
Caller.rec_cContenido = this.rec_cContenido;
Caller.rec_tFechaProceso = this.rec_tFechaProceso;
Caller.rec_ioperador = this.rec_ioperador;
Caller.rec_cObservaciones = this.rec_cObservaciones;
Caller.rec_cTerminal = this.rec_cTerminal;
Caller.rec_idResolucion = this.rec_idResolucion;
Caller.rec_idReceptor = this.rec_idReceptor;
Caller.rec_cCategorizacion = this.rec_cCategorizacion;
Caller.rec_iNYR = this.rec_iNYR;
Caller.rec_iTE = this.rec_iTE;
Caller.rec_tFechaRecepcion = this.rec_tFechaRecepcion;
Caller.rec_nOrigen = this.rec_nOrigen;
Caller.rec_idMap = this.rec_idMap;
Caller.rec_idFwd = this.rec_idFwd;
Caller.rec_iMinutosEspera = this.rec_iMinutosEspera;
Caller.rec_iPuerto = this.rec_iPuerto;
Caller.rec_idLoc = this.rec_idLoc;

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
               dt.Columns.Add(new DataColumn("rec_iidcuenta", typeof (int)));               
							 dt.Columns.Add(new DataColumn("rec_calarma", typeof (string)));               
							 dt.Columns.Add(new DataColumn("rec_czona", typeof (string)));               
							 dt.Columns.Add(new DataColumn("rec_iusuario", typeof (int)));               
							 dt.Columns.Add(new DataColumn("rec_tfechahora", typeof (DateTime)));               
							 dt.Columns.Add(new DataColumn("rec_nestado", typeof (Decimal)));               
							 dt.Columns.Add(new DataColumn("rec_cContenido", typeof (string)));               
							 dt.Columns.Add(new DataColumn("rec_tFechaProceso", typeof (DateTime)));               
							 dt.Columns.Add(new DataColumn("rec_ioperador", typeof (int)));               
							 dt.Columns.Add(new DataColumn("rec_cObservaciones", typeof (string)));               
							 dt.Columns.Add(new DataColumn("rec_cTerminal", typeof (string)));               
							 dt.Columns.Add(new DataColumn("rec_idResolucion", typeof (string)));               
							 dt.Columns.Add(new DataColumn("rec_idReceptor", typeof (int)));               
							 dt.Columns.Add(new DataColumn("rec_cCategorizacion", typeof (string)));               
							 dt.Columns.Add(new DataColumn("rec_iNYR", typeof (int)));               
							 dt.Columns.Add(new DataColumn("rec_iTE", typeof (int)));               
							 dt.Columns.Add(new DataColumn("rec_tFechaRecepcion", typeof (DateTime)));               
							 dt.Columns.Add(new DataColumn("rec_nOrigen", typeof (Decimal)));               
							 dt.Columns.Add(new DataColumn("rec_idMap", typeof (int)));               
							 dt.Columns.Add(new DataColumn("rec_idFwd", typeof (int)));               
							 dt.Columns.Add(new DataColumn("rec_iMinutosEspera", typeof (int)));               
							 dt.Columns.Add(new DataColumn("rec_iPuerto", typeof (int)));               
							 dt.Columns.Add(new DataColumn("rec_idLoc", typeof (int)));               
							 										
               //create Row  
               dr = dt.NewRow();
               
               //set Row
							 dr["Id"] = base.Id;

							 dr["Name"] = base.Name;
dr["rec_iidcuenta"] = (object)this.rec_iidcuenta ?? System.DBNull.Value;
dr["rec_calarma"] = (object)this.rec_calarma ?? System.DBNull.Value;
dr["rec_czona"] = (object)this.rec_czona ?? System.DBNull.Value;
dr["rec_iusuario"] = (object)this.rec_iusuario ?? System.DBNull.Value;
dr["rec_tfechahora"] = (object)this.rec_tfechahora ?? System.DBNull.Value;
dr["rec_nestado"] = (object)this.rec_nestado ?? System.DBNull.Value;
dr["rec_cContenido"] = (object)this.rec_cContenido ?? System.DBNull.Value;
dr["rec_tFechaProceso"] = (object)this.rec_tFechaProceso ?? System.DBNull.Value;
dr["rec_ioperador"] = (object)this.rec_ioperador ?? System.DBNull.Value;
dr["rec_cObservaciones"] = (object)this.rec_cObservaciones ?? System.DBNull.Value;
dr["rec_cTerminal"] = (object)this.rec_cTerminal ?? System.DBNull.Value;
dr["rec_idResolucion"] = (object)this.rec_idResolucion ?? System.DBNull.Value;
dr["rec_idReceptor"] = (object)this.rec_idReceptor ?? System.DBNull.Value;
dr["rec_cCategorizacion"] = (object)this.rec_cCategorizacion ?? System.DBNull.Value;
dr["rec_iNYR"] = (object)this.rec_iNYR ?? System.DBNull.Value;
dr["rec_iTE"] = (object)this.rec_iTE ?? System.DBNull.Value;
dr["rec_tFechaRecepcion"] = (object)this.rec_tFechaRecepcion ?? System.DBNull.Value;
dr["rec_nOrigen"] = (object)this.rec_nOrigen ?? System.DBNull.Value;
dr["rec_idMap"] = (object)this.rec_idMap ?? System.DBNull.Value;
dr["rec_idFwd"] = (object)this.rec_idFwd ?? System.DBNull.Value;
dr["rec_iMinutosEspera"] = (object)this.rec_iMinutosEspera ?? System.DBNull.Value;
dr["rec_iPuerto"] = (object)this.rec_iPuerto ?? System.DBNull.Value;
dr["rec_idLoc"] = (object)this.rec_idLoc ?? System.DBNull.Value;
							 
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
