
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
    ///t_codigos_alarma Slbf Class
    ///</summary>
    [DataContract]
    public class Simplet_codigos_alarma : SimpleBaseObject
    { 
			 ///<summary>
     ///cod_ccodigo   
     ///</summary>
	 [DataMember]
     public string cod_ccodigo { get;set;} 
	  ///<summary>
     ///cod_cdescripcion   
     ///</summary>
	 [DataMember]
     public string cod_cdescripcion { get;set;} 
	  ///<summary>
     ///cod_nalerta   
     ///</summary>
	 [DataMember]
     public Decimal cod_nalerta { get;set;} 
	  ///<summary>
     ///cod_nprioridad   
     ///</summary>
	 [DataMember]
     public Decimal cod_nprioridad { get;set;} 
	  ///<summary>
     ///cod_ntipo   
     ///</summary>
	 [DataMember]
     public int cod_ntipo { get;set;} 
	  ///<summary>
     ///cod_nsistema   
     ///</summary>
	 [DataMember]
     public Decimal cod_nsistema { get;set;} 
	  ///<summary>
     ///cod_ncolor   
     ///</summary>
	 [DataMember]
     public int cod_ncolor { get;set;} 
	  ///<summary>
     ///cod_cSonido   
     ///</summary>
	 [DataMember]
     public string cod_cSonido { get;set;} 
	  ///<summary>
     ///cod_nColorLetra   
     ///</summary>
	 [DataMember]
     public int cod_nColorLetra { get;set;} 
	  ///<summary>
     ///cod_nResuelve   
     ///</summary>
	 [DataMember]
     public Decimal cod_nResuelve { get;set;} 
	  ///<summary>
     ///cod_cGrupo   
     ///</summary>
	 [DataMember]
     public string cod_cGrupo { get;set;} 
	  ///<summary>
     ///cod_nSms   
     ///</summary>
	 [DataMember]
     public Decimal cod_nSms { get;set;} 
	  ///<summary>
     ///cod_nMail   
     ///</summary>
	 [DataMember]
     public Decimal cod_nMail { get;set;} 
	  ///<summary>
     ///cod_nVideo   
     ///</summary>
	 [DataMember]
     public Decimal cod_nVideo { get;set;} 
	  ///<summary>
     ///cod_nManual   
     ///</summary>
	 [DataMember]
     public Decimal cod_nManual { get;set;} 
	  ///<summary>
     ///cod_nMovil   
     ///</summary>
	 [DataMember]
     public Decimal cod_nMovil { get;set;} 
	  ///<summary>
     ///cod_nAutoridad   
     ///</summary>
	 [DataMember]
     public Decimal cod_nAutoridad { get;set;} 
	  ///<summary>
     ///cod_nLeeSonido   
     ///</summary>
	 [DataMember]
     public Decimal cod_nLeeSonido { get;set;} 
	  ///<summary>
     ///cod_nMultiMonitor   
     ///</summary>
	 [DataMember]
     public Decimal cod_nMultiMonitor { get;set;} 
	  ///<summary>
     ///cod_cinstrucciones_DSS   
     ///</summary>
	 [DataMember]
     public string cod_cinstrucciones_DSS { get;set;} 
	  ///<summary>
     ///cod_cconfiguracion_DSS   
     ///</summary>
	 [DataMember]
     public string cod_cconfiguracion_DSS { get;set;} 
	  ///<summary>
     ///cod_nWebCliente   
     ///</summary>
	 [DataMember]
     public Decimal cod_nWebCliente { get;set;} 
	  ///<summary>
     ///cod_cAlarmaAutoprocesa   
     ///</summary>
	 [DataMember]
     public string cod_cAlarmaAutoprocesa { get;set;} 
	  ///<summary>
     ///cod_iTemplate   
     ///</summary>
	 [DataMember]
     public int cod_iTemplate { get;set;} 
	 ///<summary>
        ///t_codigos_alarma Constructor
        ///</summary>
        public Simplet_codigos_alarma() : base()
  {
  InitClass();
  }
        ///<summary>
        ///t_codigos_alarma Constructor
        ///</summary>
        public Simplet_codigos_alarma(int Id, string Name, string cod_ccodigo, string cod_cdescripcion, Decimal cod_nalerta, Decimal cod_nprioridad, int cod_ntipo, Decimal cod_nsistema, int cod_ncolor, string cod_cSonido, int cod_nColorLetra, Decimal cod_nResuelve, string cod_cGrupo, Decimal cod_nSms, Decimal cod_nMail, Decimal cod_nVideo, Decimal cod_nManual, Decimal cod_nMovil, Decimal cod_nAutoridad, Decimal cod_nLeeSonido, Decimal cod_nMultiMonitor, string cod_cinstrucciones_DSS, string cod_cconfiguracion_DSS, Decimal cod_nWebCliente, string cod_cAlarmaAutoprocesa, int cod_iTemplate) : base()
        {
            base.Id = Id;
						base.Name = Name;				 																																					 
				    this.cod_ccodigo = cod_ccodigo;
this.cod_cdescripcion = cod_cdescripcion;
this.cod_nalerta = cod_nalerta;
this.cod_nprioridad = cod_nprioridad;
this.cod_ntipo = cod_ntipo;
this.cod_nsistema = cod_nsistema;
this.cod_ncolor = cod_ncolor;
this.cod_cSonido = cod_cSonido;
this.cod_nColorLetra = cod_nColorLetra;
this.cod_nResuelve = cod_nResuelve;
this.cod_cGrupo = cod_cGrupo;
this.cod_nSms = cod_nSms;
this.cod_nMail = cod_nMail;
this.cod_nVideo = cod_nVideo;
this.cod_nManual = cod_nManual;
this.cod_nMovil = cod_nMovil;
this.cod_nAutoridad = cod_nAutoridad;
this.cod_nLeeSonido = cod_nLeeSonido;
this.cod_nMultiMonitor = cod_nMultiMonitor;
this.cod_cinstrucciones_DSS = cod_cinstrucciones_DSS;
this.cod_cconfiguracion_DSS = cod_cconfiguracion_DSS;
this.cod_nWebCliente = cod_nWebCliente;
this.cod_cAlarmaAutoprocesa = cod_cAlarmaAutoprocesa;
this.cod_iTemplate = cod_iTemplate;

            InitClass();
        }  								

				private void InitClass()
        {														
  				  base.Type = new ObjectType(3089, "t_codigos_alarma");
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
			BaseObject Object = new Dalt_codigos_alarma(SqlConfig, UserId, this);
			if(this.CallerObject != null)
			   Object.CallerObject = this.CallerObject;			
			return Object;
		}
///<summary>
    ///Get parent object
    ///</summary>
		public override CallerObject GetCallerObject()
		{
			Callert_codigos_alarma Caller = new Callert_codigos_alarma();
			Caller.Id = base.Id;
			Caller.Name = base.Name;
			Caller.cod_ccodigo = this.cod_ccodigo;
Caller.cod_cdescripcion = this.cod_cdescripcion;
Caller.cod_nalerta = this.cod_nalerta;
Caller.cod_nprioridad = this.cod_nprioridad;
Caller.cod_ntipo = this.cod_ntipo;
Caller.cod_nsistema = this.cod_nsistema;
Caller.cod_ncolor = this.cod_ncolor;
Caller.cod_cSonido = this.cod_cSonido;
Caller.cod_nColorLetra = this.cod_nColorLetra;
Caller.cod_nResuelve = this.cod_nResuelve;
Caller.cod_cGrupo = this.cod_cGrupo;
Caller.cod_nSms = this.cod_nSms;
Caller.cod_nMail = this.cod_nMail;
Caller.cod_nVideo = this.cod_nVideo;
Caller.cod_nManual = this.cod_nManual;
Caller.cod_nMovil = this.cod_nMovil;
Caller.cod_nAutoridad = this.cod_nAutoridad;
Caller.cod_nLeeSonido = this.cod_nLeeSonido;
Caller.cod_nMultiMonitor = this.cod_nMultiMonitor;
Caller.cod_cinstrucciones_DSS = this.cod_cinstrucciones_DSS;
Caller.cod_cconfiguracion_DSS = this.cod_cconfiguracion_DSS;
Caller.cod_nWebCliente = this.cod_nWebCliente;
Caller.cod_cAlarmaAutoprocesa = this.cod_cAlarmaAutoprocesa;
Caller.cod_iTemplate = this.cod_iTemplate;

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
               dt.Columns.Add(new DataColumn("cod_ccodigo", typeof (string)));               
							 dt.Columns.Add(new DataColumn("cod_cdescripcion", typeof (string)));               
							 dt.Columns.Add(new DataColumn("cod_nalerta", typeof (Decimal)));               
							 dt.Columns.Add(new DataColumn("cod_nprioridad", typeof (Decimal)));               
							 dt.Columns.Add(new DataColumn("cod_ntipo", typeof (int)));               
							 dt.Columns.Add(new DataColumn("cod_nsistema", typeof (Decimal)));               
							 dt.Columns.Add(new DataColumn("cod_ncolor", typeof (int)));               
							 dt.Columns.Add(new DataColumn("cod_cSonido", typeof (string)));               
							 dt.Columns.Add(new DataColumn("cod_nColorLetra", typeof (int)));               
							 dt.Columns.Add(new DataColumn("cod_nResuelve", typeof (Decimal)));               
							 dt.Columns.Add(new DataColumn("cod_cGrupo", typeof (string)));               
							 dt.Columns.Add(new DataColumn("cod_nSms", typeof (Decimal)));               
							 dt.Columns.Add(new DataColumn("cod_nMail", typeof (Decimal)));               
							 dt.Columns.Add(new DataColumn("cod_nVideo", typeof (Decimal)));               
							 dt.Columns.Add(new DataColumn("cod_nManual", typeof (Decimal)));               
							 dt.Columns.Add(new DataColumn("cod_nMovil", typeof (Decimal)));               
							 dt.Columns.Add(new DataColumn("cod_nAutoridad", typeof (Decimal)));               
							 dt.Columns.Add(new DataColumn("cod_nLeeSonido", typeof (Decimal)));               
							 dt.Columns.Add(new DataColumn("cod_nMultiMonitor", typeof (Decimal)));               
							 dt.Columns.Add(new DataColumn("cod_cinstrucciones_DSS", typeof (string)));               
							 dt.Columns.Add(new DataColumn("cod_cconfiguracion_DSS", typeof (string)));               
							 dt.Columns.Add(new DataColumn("cod_nWebCliente", typeof (Decimal)));               
							 dt.Columns.Add(new DataColumn("cod_cAlarmaAutoprocesa", typeof (string)));               
							 dt.Columns.Add(new DataColumn("cod_iTemplate", typeof (int)));               
							 										
               //create Row  
               dr = dt.NewRow();
               
               //set Row
							 dr["Id"] = base.Id;

							 dr["Name"] = base.Name;
dr["cod_ccodigo"] = (object)this.cod_ccodigo ?? System.DBNull.Value;
dr["cod_cdescripcion"] = (object)this.cod_cdescripcion ?? System.DBNull.Value;
dr["cod_nalerta"] = (object)this.cod_nalerta ?? System.DBNull.Value;
dr["cod_nprioridad"] = (object)this.cod_nprioridad ?? System.DBNull.Value;
dr["cod_ntipo"] = (object)this.cod_ntipo ?? System.DBNull.Value;
dr["cod_nsistema"] = (object)this.cod_nsistema ?? System.DBNull.Value;
dr["cod_ncolor"] = (object)this.cod_ncolor ?? System.DBNull.Value;
dr["cod_cSonido"] = (object)this.cod_cSonido ?? System.DBNull.Value;
dr["cod_nColorLetra"] = (object)this.cod_nColorLetra ?? System.DBNull.Value;
dr["cod_nResuelve"] = (object)this.cod_nResuelve ?? System.DBNull.Value;
dr["cod_cGrupo"] = (object)this.cod_cGrupo ?? System.DBNull.Value;
dr["cod_nSms"] = (object)this.cod_nSms ?? System.DBNull.Value;
dr["cod_nMail"] = (object)this.cod_nMail ?? System.DBNull.Value;
dr["cod_nVideo"] = (object)this.cod_nVideo ?? System.DBNull.Value;
dr["cod_nManual"] = (object)this.cod_nManual ?? System.DBNull.Value;
dr["cod_nMovil"] = (object)this.cod_nMovil ?? System.DBNull.Value;
dr["cod_nAutoridad"] = (object)this.cod_nAutoridad ?? System.DBNull.Value;
dr["cod_nLeeSonido"] = (object)this.cod_nLeeSonido ?? System.DBNull.Value;
dr["cod_nMultiMonitor"] = (object)this.cod_nMultiMonitor ?? System.DBNull.Value;
dr["cod_cinstrucciones_DSS"] = (object)this.cod_cinstrucciones_DSS ?? System.DBNull.Value;
dr["cod_cconfiguracion_DSS"] = (object)this.cod_cconfiguracion_DSS ?? System.DBNull.Value;
dr["cod_nWebCliente"] = (object)this.cod_nWebCliente ?? System.DBNull.Value;
dr["cod_cAlarmaAutoprocesa"] = (object)this.cod_cAlarmaAutoprocesa ?? System.DBNull.Value;
dr["cod_iTemplate"] = (object)this.cod_iTemplate ?? System.DBNull.Value;
							 
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
