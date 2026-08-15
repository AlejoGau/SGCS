
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
    ///ResourceModule Slbf Class
    ///</summary>
    [DataContract]
    public class SimpleResourceModule : SimpleBaseObject
    { 
			 ///<summary>
     ///rmo_cNombre   
     ///</summary>
	 [DataMember]
     public string rmo_cNombre { get;set;} 
	  ///<summary>
     ///rmo_iTypeId   
     ///</summary>
	 [DataMember]
     public int rmo_iTypeId { get;set;} 
	  ///<summary>
     ///rmo_cImagen   
     ///</summary>
	 [DataMember]
     public string rmo_cImagen { get;set;} 
	  ///<summary>
     ///rmo_cObservacion   
     ///</summary>
	 [DataMember]
     public string rmo_cObservacion { get;set;} 
	  ///<summary>
     ///rmo_cMarcaModelo   
     ///</summary>
	 [DataMember]
     public string rmo_cMarcaModelo { get;set;} 
	  ///<summary>
     ///rmo_cNumeroSerie   
     ///</summary>
	 [DataMember]
     public string rmo_cNumeroSerie { get;set;} 
	  ///<summary>
     ///rmo_iCuentaId   
     ///</summary>
	 [DataMember]
     public int rmo_iCuentaId { get;set;} 
	 ///<summary>
        ///ResourceModule Constructor
        ///</summary>
        public SimpleResourceModule() : base()
  {
  InitClass();
  }
        ///<summary>
        ///ResourceModule Constructor
        ///</summary>
        public SimpleResourceModule(int Id, string Name, string rmo_cNombre, int rmo_iTypeId, string rmo_cImagen, string rmo_cObservacion, string rmo_cMarcaModelo, string rmo_cNumeroSerie, int rmo_iCuentaId) : base()
        {
            base.Id = Id;
						base.Name = Name;				 																																					 
				    this.rmo_cNombre = rmo_cNombre;
this.rmo_iTypeId = rmo_iTypeId;
this.rmo_cImagen = rmo_cImagen;
this.rmo_cObservacion = rmo_cObservacion;
this.rmo_cMarcaModelo = rmo_cMarcaModelo;
this.rmo_cNumeroSerie = rmo_cNumeroSerie;
this.rmo_iCuentaId = rmo_iCuentaId;

            InitClass();
        }  								

				private void InitClass()
        {														
  				  base.Type = new ObjectType(7057, "ResourceModule");
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
			BaseObject Object = new DalResourceModule(SqlConfig, UserId, this);
			if(this.CallerObject != null)
			   Object.CallerObject = this.CallerObject;			
			return Object;
		}
///<summary>
    ///Get parent object
    ///</summary>
		public override CallerObject GetCallerObject()
		{
			CallerResourceModule Caller = new CallerResourceModule();
			Caller.Id = base.Id;
			Caller.Name = base.Name;
			Caller.rmo_cNombre = this.rmo_cNombre;
Caller.rmo_iTypeId = this.rmo_iTypeId;
Caller.rmo_cImagen = this.rmo_cImagen;
Caller.rmo_cObservacion = this.rmo_cObservacion;
Caller.rmo_cMarcaModelo = this.rmo_cMarcaModelo;
Caller.rmo_cNumeroSerie = this.rmo_cNumeroSerie;
Caller.rmo_iCuentaId = this.rmo_iCuentaId;

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
               dt.Columns.Add(new DataColumn("rmo_cNombre", typeof (string)));               
							 dt.Columns.Add(new DataColumn("rmo_iTypeId", typeof (int)));               
							 dt.Columns.Add(new DataColumn("rmo_cImagen", typeof (string)));               
							 dt.Columns.Add(new DataColumn("rmo_cObservacion", typeof (string)));               
							 dt.Columns.Add(new DataColumn("rmo_cMarcaModelo", typeof (string)));               
							 dt.Columns.Add(new DataColumn("rmo_cNumeroSerie", typeof (string)));               
							 dt.Columns.Add(new DataColumn("rmo_iCuentaId", typeof (int)));               
							 										
               //create Row  
               dr = dt.NewRow();
               
               //set Row
							 dr["Id"] = base.Id;

							 dr["Name"] = base.Name;
dr["rmo_cNombre"] = (object)this.rmo_cNombre ?? System.DBNull.Value;
dr["rmo_iTypeId"] = (object)this.rmo_iTypeId ?? System.DBNull.Value;
dr["rmo_cImagen"] = (object)this.rmo_cImagen ?? System.DBNull.Value;
dr["rmo_cObservacion"] = (object)this.rmo_cObservacion ?? System.DBNull.Value;
dr["rmo_cMarcaModelo"] = (object)this.rmo_cMarcaModelo ?? System.DBNull.Value;
dr["rmo_cNumeroSerie"] = (object)this.rmo_cNumeroSerie ?? System.DBNull.Value;
dr["rmo_iCuentaId"] = (object)this.rmo_iCuentaId ?? System.DBNull.Value;
							 
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
