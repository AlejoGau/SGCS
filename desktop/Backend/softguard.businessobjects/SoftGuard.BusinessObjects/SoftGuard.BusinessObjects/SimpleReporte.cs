
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
    ///Reporte Slbf Class
    ///</summary>
    [DataContract]
    public class SimpleReporte : SimpleBaseObject
    { 
			 ///<summary>
     ///rep_iidcuenta   
     ///</summary>
	 [DataMember]
     public int rep_iidcuenta { get;set;} 
	  ///<summary>
     ///rep_ntipo   
     ///</summary>
	 [DataMember]
     public Decimal rep_ntipo { get;set;} 
	  ///<summary>
     ///rep_tproximoenvio   
     ///</summary>
	 [DataMember]
     public DateTime? rep_tproximoenvio { get;set;} 
	  ///<summary>
     ///rep_nfrecuencia   
     ///</summary>
	 [DataMember]
     public Decimal rep_nfrecuencia { get;set;} 
	  ///<summary>
     ///rep_cmail   
     ///</summary>
	 [DataMember]
     public string rep_cmail { get;set;} 
	  ///<summary>
     ///rep_iLimiteSMS   
     ///</summary>
	 [DataMember]
     public int rep_iLimiteSMS { get;set;} 
	  ///<summary>
     ///rep_nLimiteCada   
     ///</summary>
	 [DataMember]
     public Decimal rep_nLimiteCada { get;set;} 
	  ///<summary>
     ///rep_nCadaUnidadTiempo   
     ///</summary>
	 [DataMember]
     public Decimal rep_nCadaUnidadTiempo { get;set;} 
	  ///<summary>
     ///rep_cMailRuteoSMS   
     ///</summary>
	 [DataMember]
     public string rep_cMailRuteoSMS { get;set;} 
	  ///<summary>
     ///rep_cSMSParaInforme   
     ///</summary>
	 [DataMember]
     public string rep_cSMSParaInforme { get;set;} 
	  ///<summary>
     ///rep_iModemSMS   
     ///</summary>
	 [DataMember]
     public int rep_iModemSMS { get;set;} 
	  ///<summary>
     ///rep_idGrupo   
     ///</summary>
	 [DataMember]
     public int rep_idGrupo { get;set;} 
	 ///<summary>
        ///Reporte Constructor
        ///</summary>
        public SimpleReporte() : base()
  {
  InitClass();
  }
        ///<summary>
        ///Reporte Constructor
        ///</summary>
        public SimpleReporte(int Id, string Name, int rep_iidcuenta, Decimal rep_ntipo, DateTime? rep_tproximoenvio, Decimal rep_nfrecuencia, string rep_cmail, int rep_iLimiteSMS, Decimal rep_nLimiteCada, Decimal rep_nCadaUnidadTiempo, string rep_cMailRuteoSMS, string rep_cSMSParaInforme, int rep_iModemSMS, int rep_idGrupo) : base()
        {
            base.Id = Id;
						base.Name = Name;				 																																					 
				    this.rep_iidcuenta = rep_iidcuenta;
this.rep_ntipo = rep_ntipo;
this.rep_tproximoenvio = rep_tproximoenvio;
this.rep_nfrecuencia = rep_nfrecuencia;
this.rep_cmail = rep_cmail;
this.rep_iLimiteSMS = rep_iLimiteSMS;
this.rep_nLimiteCada = rep_nLimiteCada;
this.rep_nCadaUnidadTiempo = rep_nCadaUnidadTiempo;
this.rep_cMailRuteoSMS = rep_cMailRuteoSMS;
this.rep_cSMSParaInforme = rep_cSMSParaInforme;
this.rep_iModemSMS = rep_iModemSMS;
this.rep_idGrupo = rep_idGrupo;

            InitClass();
        }  								

				private void InitClass()
        {														
  				  base.Type = new ObjectType(3032, "Reporte");
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
			BaseObject Object = new DalReporte(SqlConfig, UserId, this);
			if(this.CallerObject != null)
			   Object.CallerObject = this.CallerObject;			
			return Object;
		}
///<summary>
    ///Get parent object
    ///</summary>
		public override CallerObject GetCallerObject()
		{
			CallerReporte Caller = new CallerReporte();
			Caller.Id = base.Id;
			Caller.Name = base.Name;
			Caller.rep_iidcuenta = this.rep_iidcuenta;
Caller.rep_ntipo = this.rep_ntipo;
Caller.rep_tproximoenvio = this.rep_tproximoenvio;
Caller.rep_nfrecuencia = this.rep_nfrecuencia;
Caller.rep_cmail = this.rep_cmail;
Caller.rep_iLimiteSMS = this.rep_iLimiteSMS;
Caller.rep_nLimiteCada = this.rep_nLimiteCada;
Caller.rep_nCadaUnidadTiempo = this.rep_nCadaUnidadTiempo;
Caller.rep_cMailRuteoSMS = this.rep_cMailRuteoSMS;
Caller.rep_cSMSParaInforme = this.rep_cSMSParaInforme;
Caller.rep_iModemSMS = this.rep_iModemSMS;
Caller.rep_idGrupo = this.rep_idGrupo;

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
               dt.Columns.Add(new DataColumn("rep_iidcuenta", typeof (int)));               
							 dt.Columns.Add(new DataColumn("rep_ntipo", typeof (Decimal)));               
							 dt.Columns.Add(new DataColumn("rep_tproximoenvio", typeof (DateTime)));               
							 dt.Columns.Add(new DataColumn("rep_nfrecuencia", typeof (Decimal)));               
							 dt.Columns.Add(new DataColumn("rep_cmail", typeof (string)));               
							 dt.Columns.Add(new DataColumn("rep_iLimiteSMS", typeof (int)));               
							 dt.Columns.Add(new DataColumn("rep_nLimiteCada", typeof (Decimal)));               
							 dt.Columns.Add(new DataColumn("rep_nCadaUnidadTiempo", typeof (Decimal)));               
							 dt.Columns.Add(new DataColumn("rep_cMailRuteoSMS", typeof (string)));               
							 dt.Columns.Add(new DataColumn("rep_cSMSParaInforme", typeof (string)));               
							 dt.Columns.Add(new DataColumn("rep_iModemSMS", typeof (int)));               
							 dt.Columns.Add(new DataColumn("rep_idGrupo", typeof (int)));               
							 										
               //create Row  
               dr = dt.NewRow();
               
               //set Row
							 dr["Id"] = base.Id;

							 dr["Name"] = base.Name;
dr["rep_iidcuenta"] = (object)this.rep_iidcuenta ?? System.DBNull.Value;
dr["rep_ntipo"] = (object)this.rep_ntipo ?? System.DBNull.Value;
dr["rep_tproximoenvio"] = (object)this.rep_tproximoenvio ?? System.DBNull.Value;
dr["rep_nfrecuencia"] = (object)this.rep_nfrecuencia ?? System.DBNull.Value;
dr["rep_cmail"] = (object)this.rep_cmail ?? System.DBNull.Value;
dr["rep_iLimiteSMS"] = (object)this.rep_iLimiteSMS ?? System.DBNull.Value;
dr["rep_nLimiteCada"] = (object)this.rep_nLimiteCada ?? System.DBNull.Value;
dr["rep_nCadaUnidadTiempo"] = (object)this.rep_nCadaUnidadTiempo ?? System.DBNull.Value;
dr["rep_cMailRuteoSMS"] = (object)this.rep_cMailRuteoSMS ?? System.DBNull.Value;
dr["rep_cSMSParaInforme"] = (object)this.rep_cSMSParaInforme ?? System.DBNull.Value;
dr["rep_iModemSMS"] = (object)this.rep_iModemSMS ?? System.DBNull.Value;
dr["rep_idGrupo"] = (object)this.rep_idGrupo ?? System.DBNull.Value;
							 
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
