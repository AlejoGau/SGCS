
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
    ///t_TG_mantenimiento_servicios Slbf Class
    ///</summary>
    [DataContract]
    public class Simplet_TG_mantenimiento_servicios : SimpleBaseObject
    { 
			 ///<summary>
     ///tgms_cnombre   
     ///</summary>
	 [DataMember]
     public string tgms_cnombre { get;set;} 
	  ///<summary>
     ///tgms_cdescripcion   
     ///</summary>
	 [DataMember]
     public string tgms_cdescripcion { get;set;} 
	  ///<summary>
     ///tgms_kilometros   
     ///</summary>
	 [DataMember]
     public int tgms_kilometros { get;set;} 
	  ///<summary>
     ///tgms_meses   
     ///</summary>
	 [DataMember]
     public int tgms_meses { get;set;} 
	  ///<summary>
     ///tgms_iorganizacion   
     ///</summary>
	 [DataMember]
     public int tgms_iorganizacion { get;set;} 
	  ///<summary>
     ///tgms_iestado   
     ///</summary>
	 [DataMember]
     public int tgms_iestado { get;set;} 
	  ///<summary>
     ///tgms_icuentatipo   
     ///</summary>
	 [DataMember]
     public int tgms_icuentatipo { get;set;} 
	 ///<summary>
        ///t_TG_mantenimiento_servicios Constructor
        ///</summary>
        public Simplet_TG_mantenimiento_servicios() : base()
  {
  InitClass();
  }
        ///<summary>
        ///t_TG_mantenimiento_servicios Constructor
        ///</summary>
        public Simplet_TG_mantenimiento_servicios(int Id, string Name, string tgms_cnombre, string tgms_cdescripcion, int tgms_kilometros, int tgms_meses, int tgms_iorganizacion, int tgms_iestado, int tgms_icuentatipo) : base()
        {
            base.Id = Id;
						base.Name = Name;				 																																					 
				    this.tgms_cnombre = tgms_cnombre;
this.tgms_cdescripcion = tgms_cdescripcion;
this.tgms_kilometros = tgms_kilometros;
this.tgms_meses = tgms_meses;
this.tgms_iorganizacion = tgms_iorganizacion;
this.tgms_iestado = tgms_iestado;
this.tgms_icuentatipo = tgms_icuentatipo;

            InitClass();
        }  								

				private void InitClass()
        {														
  				  base.Type = new ObjectType(3187, "t_TG_mantenimiento_servicios");
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
			BaseObject Object = new Dalt_TG_mantenimiento_servicios(SqlConfig, UserId, this);
			if(this.CallerObject != null)
			   Object.CallerObject = this.CallerObject;			
			return Object;
		}
///<summary>
    ///Get parent object
    ///</summary>
		public override CallerObject GetCallerObject()
		{
			Callert_TG_mantenimiento_servicios Caller = new Callert_TG_mantenimiento_servicios();
			Caller.Id = base.Id;
			Caller.Name = base.Name;
			Caller.tgms_cnombre = this.tgms_cnombre;
Caller.tgms_cdescripcion = this.tgms_cdescripcion;
Caller.tgms_kilometros = this.tgms_kilometros;
Caller.tgms_meses = this.tgms_meses;
Caller.tgms_iorganizacion = this.tgms_iorganizacion;
Caller.tgms_iestado = this.tgms_iestado;
Caller.tgms_icuentatipo = this.tgms_icuentatipo;

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
               dt.Columns.Add(new DataColumn("tgms_cnombre", typeof (string)));               
							 dt.Columns.Add(new DataColumn("tgms_cdescripcion", typeof (string)));               
							 dt.Columns.Add(new DataColumn("tgms_kilometros", typeof (int)));               
							 dt.Columns.Add(new DataColumn("tgms_meses", typeof (int)));               
							 dt.Columns.Add(new DataColumn("tgms_iorganizacion", typeof (int)));               
							 dt.Columns.Add(new DataColumn("tgms_iestado", typeof (int)));               
							 dt.Columns.Add(new DataColumn("tgms_icuentatipo", typeof (int)));               
							 										
               //create Row  
               dr = dt.NewRow();
               
               //set Row
							 dr["Id"] = base.Id;

							 dr["Name"] = base.Name;
dr["tgms_cnombre"] = (object)this.tgms_cnombre ?? System.DBNull.Value;
dr["tgms_cdescripcion"] = (object)this.tgms_cdescripcion ?? System.DBNull.Value;
dr["tgms_kilometros"] = (object)this.tgms_kilometros ?? System.DBNull.Value;
dr["tgms_meses"] = (object)this.tgms_meses ?? System.DBNull.Value;
dr["tgms_iorganizacion"] = (object)this.tgms_iorganizacion ?? System.DBNull.Value;
dr["tgms_iestado"] = (object)this.tgms_iestado ?? System.DBNull.Value;
dr["tgms_icuentatipo"] = (object)this.tgms_icuentatipo ?? System.DBNull.Value;
							 
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
