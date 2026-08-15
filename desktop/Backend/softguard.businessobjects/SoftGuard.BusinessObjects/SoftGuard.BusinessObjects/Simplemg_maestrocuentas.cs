
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
    ///mg_maestrocuentas Slbf Class
    ///</summary>
    [DataContract]
    public class Simplemg_maestrocuentas : SimpleBaseObject
    { 
			 ///<summary>
     ///mgmc_idorganizacion   
     ///</summary>
	 [DataMember]
     public int mgmc_idorganizacion { get;set;} 
	  ///<summary>
     ///mgmc_ccodigo   
     ///</summary>
	 [DataMember]
     public string mgmc_ccodigo { get;set;} 
	  ///<summary>
     ///mgmc_descripcion   
     ///</summary>
	 [DataMember]
     public string mgmc_descripcion { get;set;} 
	  ///<summary>
     ///mgmc_ctipo   
     ///</summary>
	 [DataMember]
     public string mgmc_ctipo { get;set;} 
	  ///<summary>
     ///mgmc_lastupdate   
     ///</summary>
	 [DataMember]
     public DateTime? mgmc_lastupdate { get;set;} 
	  ///<summary>
     ///mgmc_saldo   
     ///</summary>
	 [DataMember]
     public Decimal mgmc_saldo { get;set;} 
	  ///<summary>
     ///mgmc_moncodigo   
     ///</summary>
	 [DataMember]
     public string mgmc_moncodigo { get;set;} 
	  ///<summary>
     ///mgmc_metadata   
     ///</summary>
	 [DataMember]
     public string mgmc_metadata { get;set;} 
	  ///<summary>
     ///mgmc_capitulo   
     ///</summary>
	 [DataMember]
     public int mgmc_capitulo { get;set;} 
	  ///<summary>
     ///mgmc_rubro   
     ///</summary>
	 [DataMember]
     public int mgmc_rubro { get;set;} 
	  ///<summary>
     ///mgmc_subrubro   
     ///</summary>
	 [DataMember]
     public int mgmc_subrubro { get;set;} 
	  ///<summary>
     ///mgmc_imputacion   
     ///</summary>
	 [DataMember]
     public int mgmc_imputacion { get;set;} 
	 ///<summary>
        ///mg_maestrocuentas Constructor
        ///</summary>
        public Simplemg_maestrocuentas() : base()
  {
  InitClass();
  }
        ///<summary>
        ///mg_maestrocuentas Constructor
        ///</summary>
        public Simplemg_maestrocuentas(int Id, string Name, int mgmc_idorganizacion, string mgmc_ccodigo, string mgmc_descripcion, string mgmc_ctipo, DateTime? mgmc_lastupdate, Decimal mgmc_saldo, string mgmc_moncodigo, string mgmc_metadata, int mgmc_capitulo, int mgmc_rubro, int mgmc_subrubro, int mgmc_imputacion) : base()
        {
            base.Id = Id;
						base.Name = Name;				 																																					 
				    this.mgmc_idorganizacion = mgmc_idorganizacion;
this.mgmc_ccodigo = mgmc_ccodigo;
this.mgmc_descripcion = mgmc_descripcion;
this.mgmc_ctipo = mgmc_ctipo;
this.mgmc_lastupdate = mgmc_lastupdate;
this.mgmc_saldo = mgmc_saldo;
this.mgmc_moncodigo = mgmc_moncodigo;
this.mgmc_metadata = mgmc_metadata;
this.mgmc_capitulo = mgmc_capitulo;
this.mgmc_rubro = mgmc_rubro;
this.mgmc_subrubro = mgmc_subrubro;
this.mgmc_imputacion = mgmc_imputacion;

            InitClass();
        }  								

				private void InitClass()
        {														
  				  base.Type = new ObjectType(3211, "mg_maestrocuentas");
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
			BaseObject Object = new Dalmg_maestrocuentas(SqlConfig, UserId, this);
			if(this.CallerObject != null)
			   Object.CallerObject = this.CallerObject;			
			return Object;
		}
///<summary>
    ///Get parent object
    ///</summary>
		public override CallerObject GetCallerObject()
		{
			Callermg_maestrocuentas Caller = new Callermg_maestrocuentas();
			Caller.Id = base.Id;
			Caller.Name = base.Name;
			Caller.mgmc_idorganizacion = this.mgmc_idorganizacion;
Caller.mgmc_ccodigo = this.mgmc_ccodigo;
Caller.mgmc_descripcion = this.mgmc_descripcion;
Caller.mgmc_ctipo = this.mgmc_ctipo;
Caller.mgmc_lastupdate = this.mgmc_lastupdate;
Caller.mgmc_saldo = this.mgmc_saldo;
Caller.mgmc_moncodigo = this.mgmc_moncodigo;
Caller.mgmc_metadata = this.mgmc_metadata;
Caller.mgmc_capitulo = this.mgmc_capitulo;
Caller.mgmc_rubro = this.mgmc_rubro;
Caller.mgmc_subrubro = this.mgmc_subrubro;
Caller.mgmc_imputacion = this.mgmc_imputacion;

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
               dt.Columns.Add(new DataColumn("mgmc_idorganizacion", typeof (int)));               
							 dt.Columns.Add(new DataColumn("mgmc_ccodigo", typeof (string)));               
							 dt.Columns.Add(new DataColumn("mgmc_descripcion", typeof (string)));               
							 dt.Columns.Add(new DataColumn("mgmc_ctipo", typeof (string)));               
							 dt.Columns.Add(new DataColumn("mgmc_lastupdate", typeof (DateTime)));               
							 dt.Columns.Add(new DataColumn("mgmc_saldo", typeof (Decimal)));               
							 dt.Columns.Add(new DataColumn("mgmc_moncodigo", typeof (string)));               
							 dt.Columns.Add(new DataColumn("mgmc_metadata", typeof (string)));               
							 dt.Columns.Add(new DataColumn("mgmc_capitulo", typeof (int)));               
							 dt.Columns.Add(new DataColumn("mgmc_rubro", typeof (int)));               
							 dt.Columns.Add(new DataColumn("mgmc_subrubro", typeof (int)));               
							 dt.Columns.Add(new DataColumn("mgmc_imputacion", typeof (int)));               
							 										
               //create Row  
               dr = dt.NewRow();
               
               //set Row
							 dr["Id"] = base.Id;

							 dr["Name"] = base.Name;
dr["mgmc_idorganizacion"] = (object)this.mgmc_idorganizacion ?? System.DBNull.Value;
dr["mgmc_ccodigo"] = (object)this.mgmc_ccodigo ?? System.DBNull.Value;
dr["mgmc_descripcion"] = (object)this.mgmc_descripcion ?? System.DBNull.Value;
dr["mgmc_ctipo"] = (object)this.mgmc_ctipo ?? System.DBNull.Value;
dr["mgmc_lastupdate"] = (object)this.mgmc_lastupdate ?? System.DBNull.Value;
dr["mgmc_saldo"] = (object)this.mgmc_saldo ?? System.DBNull.Value;
dr["mgmc_moncodigo"] = (object)this.mgmc_moncodigo ?? System.DBNull.Value;
dr["mgmc_metadata"] = (object)this.mgmc_metadata ?? System.DBNull.Value;
dr["mgmc_capitulo"] = (object)this.mgmc_capitulo ?? System.DBNull.Value;
dr["mgmc_rubro"] = (object)this.mgmc_rubro ?? System.DBNull.Value;
dr["mgmc_subrubro"] = (object)this.mgmc_subrubro ?? System.DBNull.Value;
dr["mgmc_imputacion"] = (object)this.mgmc_imputacion ?? System.DBNull.Value;
							 
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
