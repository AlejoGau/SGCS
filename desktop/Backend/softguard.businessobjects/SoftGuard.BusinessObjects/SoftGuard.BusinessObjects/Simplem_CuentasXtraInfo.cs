
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
    ///m_CuentasXtraInfo Slbf Class
    ///</summary>
    [DataContract]
    public class Simplem_CuentasXtraInfo : SimpleBaseObject
    { 
			 ///<summary>
     ///cue_iidcuenta   
     ///</summary>
	 [DataMember]
     public int cue_iidcuenta { get;set;} 
	  ///<summary>
     ///cue_ccustom   
     ///</summary>
	 [DataMember]
     public string cue_ccustom { get;set;} 
	  ///<summary>
     ///cue_cconfig   
     ///</summary>
	 [DataMember]
     public string cue_cconfig { get;set;} 
	  ///<summary>
     ///cue_ilicenciassp   
     ///</summary>
	 [DataMember]
     public int cue_ilicenciassp { get;set;} 
	  ///<summary>
     ///cue_iImportancia   
     ///</summary>
	 [DataMember]
     public int cue_iImportancia { get;set;} 
	  ///<summary>
     ///cue_iteclado   
     ///</summary>
	 [DataMember]
     public int cue_iteclado { get;set;} 
	  ///<summary>
     ///cue_cHoraAperturaAutomonitoreo   
     ///</summary>
	 [DataMember]
     public string cue_cHoraAperturaAutomonitoreo { get;set;} 
	  ///<summary>
     ///cue_cHoraCierreAutomonitoreo    
     ///</summary>
	 [DataMember]
     public string cue_cHoraCierreAutomonitoreo  { get;set;} 
	  ///<summary>
     ///cue_ilicenciapar   
     ///</summary>
	 [DataMember]
     public int cue_ilicenciapar { get;set;} 
	  ///<summary>
     ///cue_iTipoServicio   
     ///</summary>
	 [DataMember]
     public int cue_iTipoServicio { get;set;} 
	  ///<summary>
     ///cue_iExcesoLimiteDia   
     ///</summary>
	 [DataMember]
     public int cue_iExcesoLimiteDia { get;set;} 
	  ///<summary>
     ///cue_iExcesoLimiteHora   
     ///</summary>
	 [DataMember]
     public int cue_iExcesoLimiteHora { get;set;} 
	  ///<summary>
     ///cue_cInstrucciones   
     ///</summary>
	 [DataMember]
     public string cue_cInstrucciones { get;set;} 
	  ///<summary>
     ///cue_iInstrMostrar   
     ///</summary>
	 [DataMember]
     public int cue_iInstrMostrar { get;set;} 
	  ///<summary>
     ///cue_iVigiladoresVC   
     ///</summary>
	 [DataMember]
     public int cue_iVigiladoresVC { get;set;} 
	 ///<summary>
        ///m_CuentasXtraInfo Constructor
        ///</summary>
        public Simplem_CuentasXtraInfo() : base()
  {
  InitClass();
  }
        ///<summary>
        ///m_CuentasXtraInfo Constructor
        ///</summary>
        public Simplem_CuentasXtraInfo(int Id, string Name, int cue_iidcuenta, string cue_ccustom, string cue_cconfig, int cue_ilicenciassp, int cue_iImportancia, int cue_iteclado, string cue_cHoraAperturaAutomonitoreo, string cue_cHoraCierreAutomonitoreo , int cue_ilicenciapar, int cue_iTipoServicio, int cue_iExcesoLimiteDia, int cue_iExcesoLimiteHora, string cue_cInstrucciones, int cue_iInstrMostrar, int cue_iVigiladoresVC) : base()
        {
            base.Id = Id;
						base.Name = Name;				 																																					 
				    this.cue_iidcuenta = cue_iidcuenta;
this.cue_ccustom = cue_ccustom;
this.cue_cconfig = cue_cconfig;
this.cue_ilicenciassp = cue_ilicenciassp;
this.cue_iImportancia = cue_iImportancia;
this.cue_iteclado = cue_iteclado;
this.cue_cHoraAperturaAutomonitoreo = cue_cHoraAperturaAutomonitoreo;
this.cue_cHoraCierreAutomonitoreo  = cue_cHoraCierreAutomonitoreo ;
this.cue_ilicenciapar = cue_ilicenciapar;
this.cue_iTipoServicio = cue_iTipoServicio;
this.cue_iExcesoLimiteDia = cue_iExcesoLimiteDia;
this.cue_iExcesoLimiteHora = cue_iExcesoLimiteHora;
this.cue_cInstrucciones = cue_cInstrucciones;
this.cue_iInstrMostrar = cue_iInstrMostrar;
this.cue_iVigiladoresVC = cue_iVigiladoresVC;

            InitClass();
        }  								

				private void InitClass()
        {														
  				  base.Type = new ObjectType(3127, "m_CuentasXtraInfo");
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
			BaseObject Object = new Dalm_CuentasXtraInfo(SqlConfig, UserId, this);
			if(this.CallerObject != null)
			   Object.CallerObject = this.CallerObject;			
			return Object;
		}
///<summary>
    ///Get parent object
    ///</summary>
		public override CallerObject GetCallerObject()
		{
			Callerm_CuentasXtraInfo Caller = new Callerm_CuentasXtraInfo();
			Caller.Id = base.Id;
			Caller.Name = base.Name;
			Caller.cue_iidcuenta = this.cue_iidcuenta;
Caller.cue_ccustom = this.cue_ccustom;
Caller.cue_cconfig = this.cue_cconfig;
Caller.cue_ilicenciassp = this.cue_ilicenciassp;
Caller.cue_iImportancia = this.cue_iImportancia;
Caller.cue_iteclado = this.cue_iteclado;
Caller.cue_cHoraAperturaAutomonitoreo = this.cue_cHoraAperturaAutomonitoreo;
Caller.cue_cHoraCierreAutomonitoreo  = this.cue_cHoraCierreAutomonitoreo ;
Caller.cue_ilicenciapar = this.cue_ilicenciapar;
Caller.cue_iTipoServicio = this.cue_iTipoServicio;
Caller.cue_iExcesoLimiteDia = this.cue_iExcesoLimiteDia;
Caller.cue_iExcesoLimiteHora = this.cue_iExcesoLimiteHora;
Caller.cue_cInstrucciones = this.cue_cInstrucciones;
Caller.cue_iInstrMostrar = this.cue_iInstrMostrar;
Caller.cue_iVigiladoresVC = this.cue_iVigiladoresVC;

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
               dt.Columns.Add(new DataColumn("cue_iidcuenta", typeof (int)));               
							 dt.Columns.Add(new DataColumn("cue_ccustom", typeof (string)));               
							 dt.Columns.Add(new DataColumn("cue_cconfig", typeof (string)));               
							 dt.Columns.Add(new DataColumn("cue_ilicenciassp", typeof (int)));               
							 dt.Columns.Add(new DataColumn("cue_iImportancia", typeof (int)));               
							 dt.Columns.Add(new DataColumn("cue_iteclado", typeof (int)));               
							 dt.Columns.Add(new DataColumn("cue_cHoraAperturaAutomonitoreo", typeof (string)));               
							 dt.Columns.Add(new DataColumn("cue_cHoraCierreAutomonitoreo ", typeof (string)));               
							 dt.Columns.Add(new DataColumn("cue_ilicenciapar", typeof (int)));               
							 dt.Columns.Add(new DataColumn("cue_iTipoServicio", typeof (int)));               
							 dt.Columns.Add(new DataColumn("cue_iExcesoLimiteDia", typeof (int)));               
							 dt.Columns.Add(new DataColumn("cue_iExcesoLimiteHora", typeof (int)));               
							 dt.Columns.Add(new DataColumn("cue_cInstrucciones", typeof (string)));               
							 dt.Columns.Add(new DataColumn("cue_iInstrMostrar", typeof (int)));               
							 dt.Columns.Add(new DataColumn("cue_iVigiladoresVC", typeof (int)));               
							 										
               //create Row  
               dr = dt.NewRow();
               
               //set Row
							 dr["Id"] = base.Id;

							 dr["Name"] = base.Name;
dr["cue_iidcuenta"] = (object)this.cue_iidcuenta ?? System.DBNull.Value;
dr["cue_ccustom"] = (object)this.cue_ccustom ?? System.DBNull.Value;
dr["cue_cconfig"] = (object)this.cue_cconfig ?? System.DBNull.Value;
dr["cue_ilicenciassp"] = (object)this.cue_ilicenciassp ?? System.DBNull.Value;
dr["cue_iImportancia"] = (object)this.cue_iImportancia ?? System.DBNull.Value;
dr["cue_iteclado"] = (object)this.cue_iteclado ?? System.DBNull.Value;
dr["cue_cHoraAperturaAutomonitoreo"] = (object)this.cue_cHoraAperturaAutomonitoreo ?? System.DBNull.Value;
dr["cue_cHoraCierreAutomonitoreo "] = (object)this.cue_cHoraCierreAutomonitoreo  ?? System.DBNull.Value;
dr["cue_ilicenciapar"] = (object)this.cue_ilicenciapar ?? System.DBNull.Value;
dr["cue_iTipoServicio"] = (object)this.cue_iTipoServicio ?? System.DBNull.Value;
dr["cue_iExcesoLimiteDia"] = (object)this.cue_iExcesoLimiteDia ?? System.DBNull.Value;
dr["cue_iExcesoLimiteHora"] = (object)this.cue_iExcesoLimiteHora ?? System.DBNull.Value;
dr["cue_cInstrucciones"] = (object)this.cue_cInstrucciones ?? System.DBNull.Value;
dr["cue_iInstrMostrar"] = (object)this.cue_iInstrMostrar ?? System.DBNull.Value;
dr["cue_iVigiladoresVC"] = (object)this.cue_iVigiladoresVC ?? System.DBNull.Value;
							 
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
