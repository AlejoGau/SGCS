
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
    ///p_encuesta_pregunta_respuesta Slbf Class
    ///</summary>
    [DataContract]
    public class Simplep_encuesta_pregunta_respuesta : SimpleBaseObject
    { 
			 ///<summary>
     ///epr_epgidkey   
     ///</summary>
	 [DataMember]
     public int epr_epgidkey { get;set;} 
	  ///<summary>
     ///epr_cvalue   
     ///</summary>
	 [DataMember]
     public string epr_cvalue { get;set;} 
	  ///<summary>
     ///epr_ivalue   
     ///</summary>
	 [DataMember]
     public int epr_ivalue { get;set;} 
	  ///<summary>
     ///epr_cuser   
     ///</summary>
	 [DataMember]
     public string epr_cuser { get;set;} 
	  ///<summary>
     ///epr_itipousuario   
     ///</summary>
	 [DataMember]
     public string epr_itipousuario { get;set;} 
	  ///<summary>
     ///epr_cnombreusuario   
     ///</summary>
	 [DataMember]
     public string epr_cnombreusuario { get;set;} 
	  ///<summary>
     ///epr_cnombrecuenta   
     ///</summary>
	 [DataMember]
     public string epr_cnombrecuenta { get;set;} 
	  ///<summary>
     ///epr_icuenta   
     ///</summary>
	 [DataMember]
     public int epr_icuenta { get;set;} 
	  ///<summary>
     ///epr_ctelefono   
     ///</summary>
	 [DataMember]
     public string epr_ctelefono { get;set;} 
	 ///<summary>
        ///p_encuesta_pregunta_respuesta Constructor
        ///</summary>
        public Simplep_encuesta_pregunta_respuesta() : base()
  {
  InitClass();
  }
        ///<summary>
        ///p_encuesta_pregunta_respuesta Constructor
        ///</summary>
        public Simplep_encuesta_pregunta_respuesta(int Id, string Name, int epr_epgidkey, string epr_cvalue, int epr_ivalue, string epr_cuser, string epr_itipousuario, string epr_cnombreusuario, string epr_cnombrecuenta, int epr_icuenta, string epr_ctelefono) : base()
        {
            base.Id = Id;
						base.Name = Name;				 																																					 
				    this.epr_epgidkey = epr_epgidkey;
this.epr_cvalue = epr_cvalue;
this.epr_ivalue = epr_ivalue;
this.epr_cuser = epr_cuser;
this.epr_itipousuario = epr_itipousuario;
this.epr_cnombreusuario = epr_cnombreusuario;
this.epr_cnombrecuenta = epr_cnombrecuenta;
this.epr_icuenta = epr_icuenta;
this.epr_ctelefono = epr_ctelefono;

            InitClass();
        }  								

				private void InitClass()
        {														
  				  base.Type = new ObjectType(3205, "p_encuesta_pregunta_respuesta");
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
			BaseObject Object = new Dalp_encuesta_pregunta_respuesta(SqlConfig, UserId, this);
			if(this.CallerObject != null)
			   Object.CallerObject = this.CallerObject;			
			return Object;
		}
///<summary>
    ///Get parent object
    ///</summary>
		public override CallerObject GetCallerObject()
		{
			Callerp_encuesta_pregunta_respuesta Caller = new Callerp_encuesta_pregunta_respuesta();
			Caller.Id = base.Id;
			Caller.Name = base.Name;
			Caller.epr_epgidkey = this.epr_epgidkey;
Caller.epr_cvalue = this.epr_cvalue;
Caller.epr_ivalue = this.epr_ivalue;
Caller.epr_cuser = this.epr_cuser;
Caller.epr_itipousuario = this.epr_itipousuario;
Caller.epr_cnombreusuario = this.epr_cnombreusuario;
Caller.epr_cnombrecuenta = this.epr_cnombrecuenta;
Caller.epr_icuenta = this.epr_icuenta;
Caller.epr_ctelefono = this.epr_ctelefono;

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
               dt.Columns.Add(new DataColumn("epr_epgidkey", typeof (int)));               
							 dt.Columns.Add(new DataColumn("epr_cvalue", typeof (string)));               
							 dt.Columns.Add(new DataColumn("epr_ivalue", typeof (int)));               
							 dt.Columns.Add(new DataColumn("epr_cuser", typeof (string)));               
							 dt.Columns.Add(new DataColumn("epr_itipousuario", typeof (string)));               
							 dt.Columns.Add(new DataColumn("epr_cnombreusuario", typeof (string)));               
							 dt.Columns.Add(new DataColumn("epr_cnombrecuenta", typeof (string)));               
							 dt.Columns.Add(new DataColumn("epr_icuenta", typeof (int)));               
							 dt.Columns.Add(new DataColumn("epr_ctelefono", typeof (string)));               
							 										
               //create Row  
               dr = dt.NewRow();
               
               //set Row
							 dr["Id"] = base.Id;

							 dr["Name"] = base.Name;
dr["epr_epgidkey"] = (object)this.epr_epgidkey ?? System.DBNull.Value;
dr["epr_cvalue"] = (object)this.epr_cvalue ?? System.DBNull.Value;
dr["epr_ivalue"] = (object)this.epr_ivalue ?? System.DBNull.Value;
dr["epr_cuser"] = (object)this.epr_cuser ?? System.DBNull.Value;
dr["epr_itipousuario"] = (object)this.epr_itipousuario ?? System.DBNull.Value;
dr["epr_cnombreusuario"] = (object)this.epr_cnombreusuario ?? System.DBNull.Value;
dr["epr_cnombrecuenta"] = (object)this.epr_cnombrecuenta ?? System.DBNull.Value;
dr["epr_icuenta"] = (object)this.epr_icuenta ?? System.DBNull.Value;
dr["epr_ctelefono"] = (object)this.epr_ctelefono ?? System.DBNull.Value;
							 
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
