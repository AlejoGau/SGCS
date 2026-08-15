
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
    ///Sms Slbf Class
    ///</summary>
    [DataContract]
    public class SimpleSms : SimpleBaseObject
    { 
			 ///<summary>
     ///sms_iidcuenta   
     ///</summary>
	 [DataMember]
     public int sms_iidcuenta { get;set;} 
	  ///<summary>
     ///sms_meventos   
     ///</summary>
	 [DataMember]
     public string sms_meventos { get;set;} 
	  ///<summary>
     ///sms_csmsparaeventos   
     ///</summary>
	 [DataMember]
     public string sms_csmsparaeventos { get;set;} 
	  ///<summary>
     ///sms_imodemsms   
     ///</summary>
	 [DataMember]
     public int sms_imodemsms { get;set;} 
	  ///<summary>
     ///sms_cplantillasms   
     ///</summary>
	 [DataMember]
     public string sms_cplantillasms { get;set;} 
	  ///<summary>
     ///sms_cmailparaeventos   
     ///</summary>
	 [DataMember]
     public string sms_cmailparaeventos { get;set;} 
	  ///<summary>
     ///sms_cplantillamail   
     ///</summary>
	 [DataMember]
     public string sms_cplantillamail { get;set;} 
	  ///<summary>
     ///sms_inotificaralertas   
     ///</summary>
	 [DataMember]
     public int sms_inotificaralertas { get;set;} 
	  ///<summary>
     ///sms_cplantillapush   
     ///</summary>
	 [DataMember]
     public string sms_cplantillapush { get;set;} 
	  ///<summary>
     ///sms_cidspushsmartpanic   
     ///</summary>
	 [DataMember]
     public string sms_cidspushsmartpanic { get;set;} 
	  ///<summary>
     ///sms_cDescripcion   
     ///</summary>
	 [DataMember]
     public string sms_cDescripcion { get;set;} 
	  ///<summary>
     ///sms_iGrupoAlarmas   
     ///</summary>
	 [DataMember]
     public int sms_iGrupoAlarmas { get;set;} 
	  ///<summary>
     ///sms_czona   
     ///</summary>
	 [DataMember]
     public string sms_czona { get;set;} 
	  ///<summary>
     ///sms_iEventosSP   
     ///</summary>
	 [DataMember]
     public int sms_iEventosSP { get;set;} 
	  ///<summary>
     ///sms_cSonido   
     ///</summary>
	 [DataMember]
     public string sms_cSonido { get;set;} 
	 ///<summary>
        ///Sms Constructor
        ///</summary>
        public SimpleSms() : base()
  {
  InitClass();
  }
        ///<summary>
        ///Sms Constructor
        ///</summary>
        public SimpleSms(int Id, string Name, int sms_iidcuenta, string sms_meventos, string sms_csmsparaeventos, int sms_imodemsms, string sms_cplantillasms, string sms_cmailparaeventos, string sms_cplantillamail, int sms_inotificaralertas, string sms_cplantillapush, string sms_cidspushsmartpanic, string sms_cDescripcion, int sms_iGrupoAlarmas, string sms_czona, int sms_iEventosSP, string sms_cSonido) : base()
        {
            base.Id = Id;
						base.Name = Name;				 																																					 
				    this.sms_iidcuenta = sms_iidcuenta;
this.sms_meventos = sms_meventos;
this.sms_csmsparaeventos = sms_csmsparaeventos;
this.sms_imodemsms = sms_imodemsms;
this.sms_cplantillasms = sms_cplantillasms;
this.sms_cmailparaeventos = sms_cmailparaeventos;
this.sms_cplantillamail = sms_cplantillamail;
this.sms_inotificaralertas = sms_inotificaralertas;
this.sms_cplantillapush = sms_cplantillapush;
this.sms_cidspushsmartpanic = sms_cidspushsmartpanic;
this.sms_cDescripcion = sms_cDescripcion;
this.sms_iGrupoAlarmas = sms_iGrupoAlarmas;
this.sms_czona = sms_czona;
this.sms_iEventosSP = sms_iEventosSP;
this.sms_cSonido = sms_cSonido;

            InitClass();
        }  								

				private void InitClass()
        {														
  				  base.Type = new ObjectType(3020, "Sms");
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
			BaseObject Object = new DalSms(SqlConfig, UserId, this);
			if(this.CallerObject != null)
			   Object.CallerObject = this.CallerObject;			
			return Object;
		}
///<summary>
    ///Get parent object
    ///</summary>
		public override CallerObject GetCallerObject()
		{
			CallerSms Caller = new CallerSms();
			Caller.Id = base.Id;
			Caller.Name = base.Name;
			Caller.sms_iidcuenta = this.sms_iidcuenta;
Caller.sms_meventos = this.sms_meventos;
Caller.sms_csmsparaeventos = this.sms_csmsparaeventos;
Caller.sms_imodemsms = this.sms_imodemsms;
Caller.sms_cplantillasms = this.sms_cplantillasms;
Caller.sms_cmailparaeventos = this.sms_cmailparaeventos;
Caller.sms_cplantillamail = this.sms_cplantillamail;
Caller.sms_inotificaralertas = this.sms_inotificaralertas;
Caller.sms_cplantillapush = this.sms_cplantillapush;
Caller.sms_cidspushsmartpanic = this.sms_cidspushsmartpanic;
Caller.sms_cDescripcion = this.sms_cDescripcion;
Caller.sms_iGrupoAlarmas = this.sms_iGrupoAlarmas;
Caller.sms_czona = this.sms_czona;
Caller.sms_iEventosSP = this.sms_iEventosSP;
Caller.sms_cSonido = this.sms_cSonido;

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
               dt.Columns.Add(new DataColumn("sms_iidcuenta", typeof (int)));               
							 dt.Columns.Add(new DataColumn("sms_meventos", typeof (string)));               
							 dt.Columns.Add(new DataColumn("sms_csmsparaeventos", typeof (string)));               
							 dt.Columns.Add(new DataColumn("sms_imodemsms", typeof (int)));               
							 dt.Columns.Add(new DataColumn("sms_cplantillasms", typeof (string)));               
							 dt.Columns.Add(new DataColumn("sms_cmailparaeventos", typeof (string)));               
							 dt.Columns.Add(new DataColumn("sms_cplantillamail", typeof (string)));               
							 dt.Columns.Add(new DataColumn("sms_inotificaralertas", typeof (int)));               
							 dt.Columns.Add(new DataColumn("sms_cplantillapush", typeof (string)));               
							 dt.Columns.Add(new DataColumn("sms_cidspushsmartpanic", typeof (string)));               
							 dt.Columns.Add(new DataColumn("sms_cDescripcion", typeof (string)));               
							 dt.Columns.Add(new DataColumn("sms_iGrupoAlarmas", typeof (int)));               
							 dt.Columns.Add(new DataColumn("sms_czona", typeof (string)));               
							 dt.Columns.Add(new DataColumn("sms_iEventosSP", typeof (int)));               
							 dt.Columns.Add(new DataColumn("sms_cSonido", typeof (string)));               
							 										
               //create Row  
               dr = dt.NewRow();
               
               //set Row
							 dr["Id"] = base.Id;

							 dr["Name"] = base.Name;
dr["sms_iidcuenta"] = (object)this.sms_iidcuenta ?? System.DBNull.Value;
dr["sms_meventos"] = (object)this.sms_meventos ?? System.DBNull.Value;
dr["sms_csmsparaeventos"] = (object)this.sms_csmsparaeventos ?? System.DBNull.Value;
dr["sms_imodemsms"] = (object)this.sms_imodemsms ?? System.DBNull.Value;
dr["sms_cplantillasms"] = (object)this.sms_cplantillasms ?? System.DBNull.Value;
dr["sms_cmailparaeventos"] = (object)this.sms_cmailparaeventos ?? System.DBNull.Value;
dr["sms_cplantillamail"] = (object)this.sms_cplantillamail ?? System.DBNull.Value;
dr["sms_inotificaralertas"] = (object)this.sms_inotificaralertas ?? System.DBNull.Value;
dr["sms_cplantillapush"] = (object)this.sms_cplantillapush ?? System.DBNull.Value;
dr["sms_cidspushsmartpanic"] = (object)this.sms_cidspushsmartpanic ?? System.DBNull.Value;
dr["sms_cDescripcion"] = (object)this.sms_cDescripcion ?? System.DBNull.Value;
dr["sms_iGrupoAlarmas"] = (object)this.sms_iGrupoAlarmas ?? System.DBNull.Value;
dr["sms_czona"] = (object)this.sms_czona ?? System.DBNull.Value;
dr["sms_iEventosSP"] = (object)this.sms_iEventosSP ?? System.DBNull.Value;
dr["sms_cSonido"] = (object)this.sms_cSonido ?? System.DBNull.Value;
							 
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
