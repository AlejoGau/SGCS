
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
    ///t_notificaciones_dealer Slbf Class
    ///</summary>
    [DataContract]
    public class Simplet_notificaciones_dealer : SimpleBaseObject
    { 
			 ///<summary>
     ///tnd_cDealer   
     ///</summary>
	 [DataMember]
     public string tnd_cDealer { get;set;} 
	  ///<summary>
     ///tnd_cDescripcion   
     ///</summary>
	 [DataMember]
     public string tnd_cDescripcion { get;set;} 
	  ///<summary>
     ///tnd_iNotificarAlertas   
     ///</summary>
	 [DataMember]
     public int tnd_iNotificarAlertas { get;set;} 
	  ///<summary>
     ///tnd_iGrupoAlarmas   
     ///</summary>
	 [DataMember]
     public int tnd_iGrupoAlarmas { get;set;} 
	  ///<summary>
     ///tnd_cAlarmas   
     ///</summary>
	 [DataMember]
     public string tnd_cAlarmas { get;set;} 
	  ///<summary>
     ///tnd_cMail   
     ///</summary>
	 [DataMember]
     public string tnd_cMail { get;set;} 
	  ///<summary>
     ///tnd_cPlantillaMail   
     ///</summary>
	 [DataMember]
     public string tnd_cPlantillaMail { get;set;} 
	  ///<summary>
     ///tnd_iTipo   
     ///</summary>
	 [DataMember]
     public int tnd_iTipo { get;set;} 
	  ///<summary>
     ///tnd_iAdmin   
     ///</summary>
	 [DataMember]
     public int tnd_iAdmin { get;set;} 
	  ///<summary>
     ///tnd_iNotificarSP   
     ///</summary>
	 [DataMember]
     public int tnd_iNotificarSP { get;set;} 
	  ///<summary>
     ///tnd_cSMS   
     ///</summary>
	 [DataMember]
     public string tnd_cSMS { get;set;} 
	  ///<summary>
     ///tnd_iModemSMS   
     ///</summary>
	 [DataMember]
     public int tnd_iModemSMS { get;set;} 
	 ///<summary>
        ///t_notificaciones_dealer Constructor
        ///</summary>
        public Simplet_notificaciones_dealer() : base()
  {
  InitClass();
  }
        ///<summary>
        ///t_notificaciones_dealer Constructor
        ///</summary>
        public Simplet_notificaciones_dealer(int Id, string Name, string tnd_cDealer, string tnd_cDescripcion, int tnd_iNotificarAlertas, int tnd_iGrupoAlarmas, string tnd_cAlarmas, string tnd_cMail, string tnd_cPlantillaMail, int tnd_iTipo, int tnd_iAdmin, int tnd_iNotificarSP, string tnd_cSMS, int tnd_iModemSMS) : base()
        {
            base.Id = Id;
						base.Name = Name;				 																																					 
				    this.tnd_cDealer = tnd_cDealer;
this.tnd_cDescripcion = tnd_cDescripcion;
this.tnd_iNotificarAlertas = tnd_iNotificarAlertas;
this.tnd_iGrupoAlarmas = tnd_iGrupoAlarmas;
this.tnd_cAlarmas = tnd_cAlarmas;
this.tnd_cMail = tnd_cMail;
this.tnd_cPlantillaMail = tnd_cPlantillaMail;
this.tnd_iTipo = tnd_iTipo;
this.tnd_iAdmin = tnd_iAdmin;
this.tnd_iNotificarSP = tnd_iNotificarSP;
this.tnd_cSMS = tnd_cSMS;
this.tnd_iModemSMS = tnd_iModemSMS;

            InitClass();
        }  								

				private void InitClass()
        {														
  				  base.Type = new ObjectType(3212, "t_notificaciones_dealer");
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
			BaseObject Object = new Dalt_notificaciones_dealer(SqlConfig, UserId, this);
			if(this.CallerObject != null)
			   Object.CallerObject = this.CallerObject;			
			return Object;
		}
///<summary>
    ///Get parent object
    ///</summary>
		public override CallerObject GetCallerObject()
		{
			Callert_notificaciones_dealer Caller = new Callert_notificaciones_dealer();
			Caller.Id = base.Id;
			Caller.Name = base.Name;
			Caller.tnd_cDealer = this.tnd_cDealer;
Caller.tnd_cDescripcion = this.tnd_cDescripcion;
Caller.tnd_iNotificarAlertas = this.tnd_iNotificarAlertas;
Caller.tnd_iGrupoAlarmas = this.tnd_iGrupoAlarmas;
Caller.tnd_cAlarmas = this.tnd_cAlarmas;
Caller.tnd_cMail = this.tnd_cMail;
Caller.tnd_cPlantillaMail = this.tnd_cPlantillaMail;
Caller.tnd_iTipo = this.tnd_iTipo;
Caller.tnd_iAdmin = this.tnd_iAdmin;
Caller.tnd_iNotificarSP = this.tnd_iNotificarSP;
Caller.tnd_cSMS = this.tnd_cSMS;
Caller.tnd_iModemSMS = this.tnd_iModemSMS;

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
               dt.Columns.Add(new DataColumn("tnd_cDealer", typeof (string)));               
							 dt.Columns.Add(new DataColumn("tnd_cDescripcion", typeof (string)));               
							 dt.Columns.Add(new DataColumn("tnd_iNotificarAlertas", typeof (int)));               
							 dt.Columns.Add(new DataColumn("tnd_iGrupoAlarmas", typeof (int)));               
							 dt.Columns.Add(new DataColumn("tnd_cAlarmas", typeof (string)));               
							 dt.Columns.Add(new DataColumn("tnd_cMail", typeof (string)));               
							 dt.Columns.Add(new DataColumn("tnd_cPlantillaMail", typeof (string)));               
							 dt.Columns.Add(new DataColumn("tnd_iTipo", typeof (int)));               
							 dt.Columns.Add(new DataColumn("tnd_iAdmin", typeof (int)));               
							 dt.Columns.Add(new DataColumn("tnd_iNotificarSP", typeof (int)));               
							 dt.Columns.Add(new DataColumn("tnd_cSMS", typeof (string)));               
							 dt.Columns.Add(new DataColumn("tnd_iModemSMS", typeof (int)));               
							 										
               //create Row  
               dr = dt.NewRow();
               
               //set Row
							 dr["Id"] = base.Id;

							 dr["Name"] = base.Name;
dr["tnd_cDealer"] = (object)this.tnd_cDealer ?? System.DBNull.Value;
dr["tnd_cDescripcion"] = (object)this.tnd_cDescripcion ?? System.DBNull.Value;
dr["tnd_iNotificarAlertas"] = (object)this.tnd_iNotificarAlertas ?? System.DBNull.Value;
dr["tnd_iGrupoAlarmas"] = (object)this.tnd_iGrupoAlarmas ?? System.DBNull.Value;
dr["tnd_cAlarmas"] = (object)this.tnd_cAlarmas ?? System.DBNull.Value;
dr["tnd_cMail"] = (object)this.tnd_cMail ?? System.DBNull.Value;
dr["tnd_cPlantillaMail"] = (object)this.tnd_cPlantillaMail ?? System.DBNull.Value;
dr["tnd_iTipo"] = (object)this.tnd_iTipo ?? System.DBNull.Value;
dr["tnd_iAdmin"] = (object)this.tnd_iAdmin ?? System.DBNull.Value;
dr["tnd_iNotificarSP"] = (object)this.tnd_iNotificarSP ?? System.DBNull.Value;
dr["tnd_cSMS"] = (object)this.tnd_cSMS ?? System.DBNull.Value;
dr["tnd_iModemSMS"] = (object)this.tnd_iModemSMS ?? System.DBNull.Value;
							 
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
