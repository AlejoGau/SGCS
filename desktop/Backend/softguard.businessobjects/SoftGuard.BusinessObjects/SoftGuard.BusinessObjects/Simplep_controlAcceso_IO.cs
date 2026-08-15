
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
    ///p_controlAcceso_IO Slbf Class
    ///</summary>
    [DataContract]
    public class Simplep_controlAcceso_IO : SimpleBaseObject
    { 
			 ///<summary>
     ///cac_tipoacceso   
     ///</summary>
	 [DataMember]
     public int cac_tipoacceso { get;set;} 
	  ///<summary>
     ///cac_idpuerta   
     ///</summary>
	 [DataMember]
     public int cac_idpuerta { get;set;} 
	  ///<summary>
     ///cac_fecha   
     ///</summary>
	 [DataMember]
     public DateTime? cac_fecha { get;set;} 
	  ///<summary>
     ///cac_idautorizado   
     ///</summary>
	 [DataMember]
     public int cac_idautorizado { get;set;} 
	  ///<summary>
     ///cac_autorizatipo   
     ///</summary>
	 [DataMember]
     public int cac_autorizatipo { get;set;} 
	  ///<summary>
     ///cac_autorizaid   
     ///</summary>
	 [DataMember]
     public int cac_autorizaid { get;set;} 
	  ///<summary>
     ///cac_autorizacodigo   
     ///</summary>
	 [DataMember]
     public string cac_autorizacodigo { get;set;} 
	  ///<summary>
     ///cac_cobservacion   
     ///</summary>
	 [DataMember]
     public string cac_cobservacion { get;set;} 
	  ///<summary>
     ///cac_autorizadotipoid   
     ///</summary>
	 [DataMember]
     public int cac_autorizadotipoid { get;set;} 
	 ///<summary>
        ///p_controlAcceso_IO Constructor
        ///</summary>
        public Simplep_controlAcceso_IO() : base()
  {
  InitClass();
  }
        ///<summary>
        ///p_controlAcceso_IO Constructor
        ///</summary>
        public Simplep_controlAcceso_IO(int Id, string Name, int cac_tipoacceso, int cac_idpuerta, DateTime? cac_fecha, int cac_idautorizado, int cac_autorizatipo, int cac_autorizaid, string cac_autorizacodigo, string cac_cobservacion, int cac_autorizadotipoid) : base()
        {
            base.Id = Id;
						base.Name = Name;				 																																					 
				    this.cac_tipoacceso = cac_tipoacceso;
this.cac_idpuerta = cac_idpuerta;
this.cac_fecha = cac_fecha;
this.cac_idautorizado = cac_idautorizado;
this.cac_autorizatipo = cac_autorizatipo;
this.cac_autorizaid = cac_autorizaid;
this.cac_autorizacodigo = cac_autorizacodigo;
this.cac_cobservacion = cac_cobservacion;
this.cac_autorizadotipoid = cac_autorizadotipoid;

            InitClass();
        }  								

				private void InitClass()
        {														
  				  base.Type = new ObjectType(3208, "p_controlAcceso_IO");
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
			BaseObject Object = new Dalp_controlAcceso_IO(SqlConfig, UserId, this);
			if(this.CallerObject != null)
			   Object.CallerObject = this.CallerObject;			
			return Object;
		}
///<summary>
    ///Get parent object
    ///</summary>
		public override CallerObject GetCallerObject()
		{
			Callerp_controlAcceso_IO Caller = new Callerp_controlAcceso_IO();
			Caller.Id = base.Id;
			Caller.Name = base.Name;
			Caller.cac_tipoacceso = this.cac_tipoacceso;
Caller.cac_idpuerta = this.cac_idpuerta;
Caller.cac_fecha = this.cac_fecha;
Caller.cac_idautorizado = this.cac_idautorizado;
Caller.cac_autorizatipo = this.cac_autorizatipo;
Caller.cac_autorizaid = this.cac_autorizaid;
Caller.cac_autorizacodigo = this.cac_autorizacodigo;
Caller.cac_cobservacion = this.cac_cobservacion;
Caller.cac_autorizadotipoid = this.cac_autorizadotipoid;

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
               dt.Columns.Add(new DataColumn("cac_tipoacceso", typeof (int)));               
							 dt.Columns.Add(new DataColumn("cac_idpuerta", typeof (int)));               
							 dt.Columns.Add(new DataColumn("cac_fecha", typeof (DateTime)));               
							 dt.Columns.Add(new DataColumn("cac_idautorizado", typeof (int)));               
							 dt.Columns.Add(new DataColumn("cac_autorizatipo", typeof (int)));               
							 dt.Columns.Add(new DataColumn("cac_autorizaid", typeof (int)));               
							 dt.Columns.Add(new DataColumn("cac_autorizacodigo", typeof (string)));               
							 dt.Columns.Add(new DataColumn("cac_cobservacion", typeof (string)));               
							 dt.Columns.Add(new DataColumn("cac_autorizadotipoid", typeof (int)));               
							 										
               //create Row  
               dr = dt.NewRow();
               
               //set Row
							 dr["Id"] = base.Id;

							 dr["Name"] = base.Name;
dr["cac_tipoacceso"] = (object)this.cac_tipoacceso ?? System.DBNull.Value;
dr["cac_idpuerta"] = (object)this.cac_idpuerta ?? System.DBNull.Value;
dr["cac_fecha"] = (object)this.cac_fecha ?? System.DBNull.Value;
dr["cac_idautorizado"] = (object)this.cac_idautorizado ?? System.DBNull.Value;
dr["cac_autorizatipo"] = (object)this.cac_autorizatipo ?? System.DBNull.Value;
dr["cac_autorizaid"] = (object)this.cac_autorizaid ?? System.DBNull.Value;
dr["cac_autorizacodigo"] = (object)this.cac_autorizacodigo ?? System.DBNull.Value;
dr["cac_cobservacion"] = (object)this.cac_cobservacion ?? System.DBNull.Value;
dr["cac_autorizadotipoid"] = (object)this.cac_autorizadotipoid ?? System.DBNull.Value;
							 
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
