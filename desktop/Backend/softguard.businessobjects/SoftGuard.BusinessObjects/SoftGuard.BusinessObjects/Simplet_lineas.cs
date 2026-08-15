
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
    ///t_lineas Slbf Class
    ///</summary>
    [DataContract]
    public class Simplet_lineas : SimpleBaseObject
    { 
			 ///<summary>
     ///lin_ccodigo   
     ///</summary>
	 [DataMember]
     public string lin_ccodigo { get;set;} 
	  ///<summary>
     ///lin_crazonsocial   
     ///</summary>
	 [DataMember]
     public string lin_crazonsocial { get;set;} 
	  ///<summary>
     ///lin_ccalle   
     ///</summary>
	 [DataMember]
     public string lin_ccalle { get;set;} 
	  ///<summary>
     ///lin_inumero   
     ///</summary>
	 [DataMember]
     public int lin_inumero { get;set;} 
	  ///<summary>
     ///lin_npiso   
     ///</summary>
	 [DataMember]
     public Decimal lin_npiso { get;set;} 
	  ///<summary>
     ///lin_cdepartamento   
     ///</summary>
	 [DataMember]
     public string lin_cdepartamento { get;set;} 
	  ///<summary>
     ///lin_clocalidad   
     ///</summary>
	 [DataMember]
     public string lin_clocalidad { get;set;} 
	  ///<summary>
     ///lin_cprovincia   
     ///</summary>
	 [DataMember]
     public string lin_cprovincia { get;set;} 
	  ///<summary>
     ///lin_cestado   
     ///</summary>
	 [DataMember]
     public string lin_cestado { get;set;} 
	  ///<summary>
     ///lin_ccodigopostal   
     ///</summary>
	 [DataMember]
     public string lin_ccodigopostal { get;set;} 
	  ///<summary>
     ///lin_ctelfono   
     ///</summary>
	 [DataMember]
     public string lin_ctelfono { get;set;} 
	  ///<summary>
     ///lin_cfax   
     ///</summary>
	 [DataMember]
     public string lin_cfax { get;set;} 
	  ///<summary>
     ///lin_cimagen   
     ///</summary>
	 [DataMember]
     public string lin_cimagen { get;set;} 
	  ///<summary>
     ///lin_cusuario   
     ///</summary>
	 [DataMember]
     public string lin_cusuario { get;set;} 
	  ///<summary>
     ///lin_cclave   
     ///</summary>
	 [DataMember]
     public string lin_cclave { get;set;} 
	  ///<summary>
     ///lin_nacceso   
     ///</summary>
	 [DataMember]
     public Decimal lin_nacceso { get;set;} 
	  ///<summary>
     ///lin_cmail   
     ///</summary>
	 [DataMember]
     public string lin_cmail { get;set;} 
	  ///<summary>
     ///lin_iEnviaMailPorFalloTest   
     ///</summary>
	 [DataMember]
     public int lin_iEnviaMailPorFalloTest { get;set;} 
	  ///<summary>
     ///lin_iAutoProcesa   
     ///</summary>
	 [DataMember]
     public int lin_iAutoProcesa { get;set;} 
	  ///<summary>
     ///lin_cMetaData   
     ///</summary>
	 [DataMember]
     public string lin_cMetaData { get;set;} 
	  ///<summary>
     ///lin_iEscala   
     ///</summary>
	 [DataMember]
     public int lin_iEscala { get;set;} 
	  ///<summary>
     ///lin_iOpnDespuesAlerta   
     ///</summary>
	 [DataMember]
     public int lin_iOpnDespuesAlerta { get;set;} 
	  ///<summary>
     ///lin_iGeneraAlarmaPorDesactivacion   
     ///</summary>
	 [DataMember]
     public int lin_iGeneraAlarmaPorDesactivacion { get;set;} 
	  ///<summary>
     ///lin_iOrganizacion   
     ///</summary>
	 [DataMember]
     public int lin_iOrganizacion { get;set;} 
	  ///<summary>
     ///lin_iControlaCierreDespuesDeApertura   
     ///</summary>
	 [DataMember]
     public int lin_iControlaCierreDespuesDeApertura { get;set;} 
	  ///<summary>
     ///lin_iMinutosControlCDDA   
     ///</summary>
	 [DataMember]
     public int lin_iMinutosControlCDDA { get;set;} 
	 ///<summary>
        ///t_lineas Constructor
        ///</summary>
        public Simplet_lineas() : base()
  {
  InitClass();
  }
        ///<summary>
        ///t_lineas Constructor
        ///</summary>
        public Simplet_lineas(int Id, string Name, string lin_ccodigo, string lin_crazonsocial, string lin_ccalle, int lin_inumero, Decimal lin_npiso, string lin_cdepartamento, string lin_clocalidad, string lin_cprovincia, string lin_cestado, string lin_ccodigopostal, string lin_ctelfono, string lin_cfax, string lin_cimagen, string lin_cusuario, string lin_cclave, Decimal lin_nacceso, string lin_cmail, int lin_iEnviaMailPorFalloTest, int lin_iAutoProcesa, string lin_cMetaData, int lin_iEscala, int lin_iOpnDespuesAlerta, int lin_iGeneraAlarmaPorDesactivacion, int lin_iOrganizacion, int lin_iControlaCierreDespuesDeApertura, int lin_iMinutosControlCDDA) : base()
        {
            base.Id = Id;
						base.Name = Name;				 																																					 
				    this.lin_ccodigo = lin_ccodigo;
this.lin_crazonsocial = lin_crazonsocial;
this.lin_ccalle = lin_ccalle;
this.lin_inumero = lin_inumero;
this.lin_npiso = lin_npiso;
this.lin_cdepartamento = lin_cdepartamento;
this.lin_clocalidad = lin_clocalidad;
this.lin_cprovincia = lin_cprovincia;
this.lin_cestado = lin_cestado;
this.lin_ccodigopostal = lin_ccodigopostal;
this.lin_ctelfono = lin_ctelfono;
this.lin_cfax = lin_cfax;
this.lin_cimagen = lin_cimagen;
this.lin_cusuario = lin_cusuario;
this.lin_cclave = lin_cclave;
this.lin_nacceso = lin_nacceso;
this.lin_cmail = lin_cmail;
this.lin_iEnviaMailPorFalloTest = lin_iEnviaMailPorFalloTest;
this.lin_iAutoProcesa = lin_iAutoProcesa;
this.lin_cMetaData = lin_cMetaData;
this.lin_iEscala = lin_iEscala;
this.lin_iOpnDespuesAlerta = lin_iOpnDespuesAlerta;
this.lin_iGeneraAlarmaPorDesactivacion = lin_iGeneraAlarmaPorDesactivacion;
this.lin_iOrganizacion = lin_iOrganizacion;
this.lin_iControlaCierreDespuesDeApertura = lin_iControlaCierreDespuesDeApertura;
this.lin_iMinutosControlCDDA = lin_iMinutosControlCDDA;

            InitClass();
        }  								

				private void InitClass()
        {														
  				  base.Type = new ObjectType(3090, "t_lineas");
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
			BaseObject Object = new Dalt_lineas(SqlConfig, UserId, this);
			if(this.CallerObject != null)
			   Object.CallerObject = this.CallerObject;			
			return Object;
		}
///<summary>
    ///Get parent object
    ///</summary>
		public override CallerObject GetCallerObject()
		{
			Callert_lineas Caller = new Callert_lineas();
			Caller.Id = base.Id;
			Caller.Name = base.Name;
			Caller.lin_ccodigo = this.lin_ccodigo;
Caller.lin_crazonsocial = this.lin_crazonsocial;
Caller.lin_ccalle = this.lin_ccalle;
Caller.lin_inumero = this.lin_inumero;
Caller.lin_npiso = this.lin_npiso;
Caller.lin_cdepartamento = this.lin_cdepartamento;
Caller.lin_clocalidad = this.lin_clocalidad;
Caller.lin_cprovincia = this.lin_cprovincia;
Caller.lin_cestado = this.lin_cestado;
Caller.lin_ccodigopostal = this.lin_ccodigopostal;
Caller.lin_ctelfono = this.lin_ctelfono;
Caller.lin_cfax = this.lin_cfax;
Caller.lin_cimagen = this.lin_cimagen;
Caller.lin_cusuario = this.lin_cusuario;
Caller.lin_cclave = this.lin_cclave;
Caller.lin_nacceso = this.lin_nacceso;
Caller.lin_cmail = this.lin_cmail;
Caller.lin_iEnviaMailPorFalloTest = this.lin_iEnviaMailPorFalloTest;
Caller.lin_iAutoProcesa = this.lin_iAutoProcesa;
Caller.lin_cMetaData = this.lin_cMetaData;
Caller.lin_iEscala = this.lin_iEscala;
Caller.lin_iOpnDespuesAlerta = this.lin_iOpnDespuesAlerta;
Caller.lin_iGeneraAlarmaPorDesactivacion = this.lin_iGeneraAlarmaPorDesactivacion;
Caller.lin_iOrganizacion = this.lin_iOrganizacion;
Caller.lin_iControlaCierreDespuesDeApertura = this.lin_iControlaCierreDespuesDeApertura;
Caller.lin_iMinutosControlCDDA = this.lin_iMinutosControlCDDA;

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
               dt.Columns.Add(new DataColumn("lin_ccodigo", typeof (string)));               
							 dt.Columns.Add(new DataColumn("lin_crazonsocial", typeof (string)));               
							 dt.Columns.Add(new DataColumn("lin_ccalle", typeof (string)));               
							 dt.Columns.Add(new DataColumn("lin_inumero", typeof (int)));               
							 dt.Columns.Add(new DataColumn("lin_npiso", typeof (Decimal)));               
							 dt.Columns.Add(new DataColumn("lin_cdepartamento", typeof (string)));               
							 dt.Columns.Add(new DataColumn("lin_clocalidad", typeof (string)));               
							 dt.Columns.Add(new DataColumn("lin_cprovincia", typeof (string)));               
							 dt.Columns.Add(new DataColumn("lin_cestado", typeof (string)));               
							 dt.Columns.Add(new DataColumn("lin_ccodigopostal", typeof (string)));               
							 dt.Columns.Add(new DataColumn("lin_ctelfono", typeof (string)));               
							 dt.Columns.Add(new DataColumn("lin_cfax", typeof (string)));               
							 dt.Columns.Add(new DataColumn("lin_cimagen", typeof (string)));               
							 dt.Columns.Add(new DataColumn("lin_cusuario", typeof (string)));               
							 dt.Columns.Add(new DataColumn("lin_cclave", typeof (string)));               
							 dt.Columns.Add(new DataColumn("lin_nacceso", typeof (Decimal)));               
							 dt.Columns.Add(new DataColumn("lin_cmail", typeof (string)));               
							 dt.Columns.Add(new DataColumn("lin_iEnviaMailPorFalloTest", typeof (int)));               
							 dt.Columns.Add(new DataColumn("lin_iAutoProcesa", typeof (int)));               
							 dt.Columns.Add(new DataColumn("lin_cMetaData", typeof (string)));               
							 dt.Columns.Add(new DataColumn("lin_iEscala", typeof (int)));               
							 dt.Columns.Add(new DataColumn("lin_iOpnDespuesAlerta", typeof (int)));               
							 dt.Columns.Add(new DataColumn("lin_iGeneraAlarmaPorDesactivacion", typeof (int)));               
							 dt.Columns.Add(new DataColumn("lin_iOrganizacion", typeof (int)));               
							 dt.Columns.Add(new DataColumn("lin_iControlaCierreDespuesDeApertura", typeof (int)));               
							 dt.Columns.Add(new DataColumn("lin_iMinutosControlCDDA", typeof (int)));               
							 										
               //create Row  
               dr = dt.NewRow();
               
               //set Row
							 dr["Id"] = base.Id;

							 dr["Name"] = base.Name;
dr["lin_ccodigo"] = (object)this.lin_ccodigo ?? System.DBNull.Value;
dr["lin_crazonsocial"] = (object)this.lin_crazonsocial ?? System.DBNull.Value;
dr["lin_ccalle"] = (object)this.lin_ccalle ?? System.DBNull.Value;
dr["lin_inumero"] = (object)this.lin_inumero ?? System.DBNull.Value;
dr["lin_npiso"] = (object)this.lin_npiso ?? System.DBNull.Value;
dr["lin_cdepartamento"] = (object)this.lin_cdepartamento ?? System.DBNull.Value;
dr["lin_clocalidad"] = (object)this.lin_clocalidad ?? System.DBNull.Value;
dr["lin_cprovincia"] = (object)this.lin_cprovincia ?? System.DBNull.Value;
dr["lin_cestado"] = (object)this.lin_cestado ?? System.DBNull.Value;
dr["lin_ccodigopostal"] = (object)this.lin_ccodigopostal ?? System.DBNull.Value;
dr["lin_ctelfono"] = (object)this.lin_ctelfono ?? System.DBNull.Value;
dr["lin_cfax"] = (object)this.lin_cfax ?? System.DBNull.Value;
dr["lin_cimagen"] = (object)this.lin_cimagen ?? System.DBNull.Value;
dr["lin_cusuario"] = (object)this.lin_cusuario ?? System.DBNull.Value;
dr["lin_cclave"] = (object)this.lin_cclave ?? System.DBNull.Value;
dr["lin_nacceso"] = (object)this.lin_nacceso ?? System.DBNull.Value;
dr["lin_cmail"] = (object)this.lin_cmail ?? System.DBNull.Value;
dr["lin_iEnviaMailPorFalloTest"] = (object)this.lin_iEnviaMailPorFalloTest ?? System.DBNull.Value;
dr["lin_iAutoProcesa"] = (object)this.lin_iAutoProcesa ?? System.DBNull.Value;
dr["lin_cMetaData"] = (object)this.lin_cMetaData ?? System.DBNull.Value;
dr["lin_iEscala"] = (object)this.lin_iEscala ?? System.DBNull.Value;
dr["lin_iOpnDespuesAlerta"] = (object)this.lin_iOpnDespuesAlerta ?? System.DBNull.Value;
dr["lin_iGeneraAlarmaPorDesactivacion"] = (object)this.lin_iGeneraAlarmaPorDesactivacion ?? System.DBNull.Value;
dr["lin_iOrganizacion"] = (object)this.lin_iOrganizacion ?? System.DBNull.Value;
dr["lin_iControlaCierreDespuesDeApertura"] = (object)this.lin_iControlaCierreDespuesDeApertura ?? System.DBNull.Value;
dr["lin_iMinutosControlCDDA"] = (object)this.lin_iMinutosControlCDDA ?? System.DBNull.Value;
							 
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
