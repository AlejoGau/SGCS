
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
    ///m_AccesosProveedores Slbf Class
    ///</summary>
    [DataContract]
    public class Simplem_AccesosProveedores : SimpleBaseObject
    { 
			 ///<summary>
     ///apr_cNombre   
     ///</summary>
	 [DataMember]
     public string apr_cNombre { get;set;} 
	  ///<summary>
     ///apr_cIdentificacion   
     ///</summary>
	 [DataMember]
     public string apr_cIdentificacion { get;set;} 
	  ///<summary>
     ///apr_cDireccion   
     ///</summary>
	 [DataMember]
     public string apr_cDireccion { get;set;} 
	  ///<summary>
     ///apr_cCodigoPostal   
     ///</summary>
	 [DataMember]
     public string apr_cCodigoPostal { get;set;} 
	  ///<summary>
     ///apr_cLocalidad   
     ///</summary>
	 [DataMember]
     public string apr_cLocalidad { get;set;} 
	  ///<summary>
     ///apr_iProvincia   
     ///</summary>
	 [DataMember]
     public int apr_iProvincia { get;set;} 
	  ///<summary>
     ///apr_cTelefono   
     ///</summary>
	 [DataMember]
     public string apr_cTelefono { get;set;} 
	  ///<summary>
     ///apr_iCategoria   
     ///</summary>
	 [DataMember]
     public int apr_iCategoria { get;set;} 
	  ///<summary>
     ///apr_tFechaAlta   
     ///</summary>
	 [DataMember]
     public DateTime? apr_tFechaAlta { get;set;} 
	  ///<summary>
     ///apr_iStatus   
     ///</summary>
	 [DataMember]
     public int apr_iStatus { get;set;} 
	  ///<summary>
     ///apr_cObservaciones   
     ///</summary>
	 [DataMember]
     public string apr_cObservaciones { get;set;} 
	  ///<summary>
     ///apr_cPathPicture   
     ///</summary>
	 [DataMember]
     public string apr_cPathPicture { get;set;} 
	 ///<summary>
        ///m_AccesosProveedores Constructor
        ///</summary>
        public Simplem_AccesosProveedores() : base()
  {
  InitClass();
  }
        ///<summary>
        ///m_AccesosProveedores Constructor
        ///</summary>
        public Simplem_AccesosProveedores(int Id, string Name, string apr_cNombre, string apr_cIdentificacion, string apr_cDireccion, string apr_cCodigoPostal, string apr_cLocalidad, int apr_iProvincia, string apr_cTelefono, int apr_iCategoria, DateTime? apr_tFechaAlta, int apr_iStatus, string apr_cObservaciones, string apr_cPathPicture) : base()
        {
            base.Id = Id;
						base.Name = Name;				 																																					 
				    this.apr_cNombre = apr_cNombre;
this.apr_cIdentificacion = apr_cIdentificacion;
this.apr_cDireccion = apr_cDireccion;
this.apr_cCodigoPostal = apr_cCodigoPostal;
this.apr_cLocalidad = apr_cLocalidad;
this.apr_iProvincia = apr_iProvincia;
this.apr_cTelefono = apr_cTelefono;
this.apr_iCategoria = apr_iCategoria;
this.apr_tFechaAlta = apr_tFechaAlta;
this.apr_iStatus = apr_iStatus;
this.apr_cObservaciones = apr_cObservaciones;
this.apr_cPathPicture = apr_cPathPicture;

            InitClass();
        }  								

				private void InitClass()
        {														
  				  base.Type = new ObjectType(3227, "m_AccesosProveedores");
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
			BaseObject Object = new Dalm_AccesosProveedores(SqlConfig, UserId, this);
			if(this.CallerObject != null)
			   Object.CallerObject = this.CallerObject;			
			return Object;
		}
///<summary>
    ///Get parent object
    ///</summary>
		public override CallerObject GetCallerObject()
		{
			Callerm_AccesosProveedores Caller = new Callerm_AccesosProveedores();
			Caller.Id = base.Id;
			Caller.Name = base.Name;
			Caller.apr_cNombre = this.apr_cNombre;
Caller.apr_cIdentificacion = this.apr_cIdentificacion;
Caller.apr_cDireccion = this.apr_cDireccion;
Caller.apr_cCodigoPostal = this.apr_cCodigoPostal;
Caller.apr_cLocalidad = this.apr_cLocalidad;
Caller.apr_iProvincia = this.apr_iProvincia;
Caller.apr_cTelefono = this.apr_cTelefono;
Caller.apr_iCategoria = this.apr_iCategoria;
Caller.apr_tFechaAlta = this.apr_tFechaAlta;
Caller.apr_iStatus = this.apr_iStatus;
Caller.apr_cObservaciones = this.apr_cObservaciones;
Caller.apr_cPathPicture = this.apr_cPathPicture;

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
               dt.Columns.Add(new DataColumn("apr_cNombre", typeof (string)));               
							 dt.Columns.Add(new DataColumn("apr_cIdentificacion", typeof (string)));               
							 dt.Columns.Add(new DataColumn("apr_cDireccion", typeof (string)));               
							 dt.Columns.Add(new DataColumn("apr_cCodigoPostal", typeof (string)));               
							 dt.Columns.Add(new DataColumn("apr_cLocalidad", typeof (string)));               
							 dt.Columns.Add(new DataColumn("apr_iProvincia", typeof (int)));               
							 dt.Columns.Add(new DataColumn("apr_cTelefono", typeof (string)));               
							 dt.Columns.Add(new DataColumn("apr_iCategoria", typeof (int)));               
							 dt.Columns.Add(new DataColumn("apr_tFechaAlta", typeof (DateTime)));               
							 dt.Columns.Add(new DataColumn("apr_iStatus", typeof (int)));               
							 dt.Columns.Add(new DataColumn("apr_cObservaciones", typeof (string)));               
							 dt.Columns.Add(new DataColumn("apr_cPathPicture", typeof (string)));               
							 										
               //create Row  
               dr = dt.NewRow();
               
               //set Row
							 dr["Id"] = base.Id;

							 dr["Name"] = base.Name;
dr["apr_cNombre"] = (object)this.apr_cNombre ?? System.DBNull.Value;
dr["apr_cIdentificacion"] = (object)this.apr_cIdentificacion ?? System.DBNull.Value;
dr["apr_cDireccion"] = (object)this.apr_cDireccion ?? System.DBNull.Value;
dr["apr_cCodigoPostal"] = (object)this.apr_cCodigoPostal ?? System.DBNull.Value;
dr["apr_cLocalidad"] = (object)this.apr_cLocalidad ?? System.DBNull.Value;
dr["apr_iProvincia"] = (object)this.apr_iProvincia ?? System.DBNull.Value;
dr["apr_cTelefono"] = (object)this.apr_cTelefono ?? System.DBNull.Value;
dr["apr_iCategoria"] = (object)this.apr_iCategoria ?? System.DBNull.Value;
dr["apr_tFechaAlta"] = (object)this.apr_tFechaAlta ?? System.DBNull.Value;
dr["apr_iStatus"] = (object)this.apr_iStatus ?? System.DBNull.Value;
dr["apr_cObservaciones"] = (object)this.apr_cObservaciones ?? System.DBNull.Value;
dr["apr_cPathPicture"] = (object)this.apr_cPathPicture ?? System.DBNull.Value;
							 
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
