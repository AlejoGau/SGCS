
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
    ///UsersDesktopWeb Slbf Class
    ///</summary>
    [DataContract]
    public class SimpleUsersDesktopWeb : SimpleBaseObject
    { 
			 ///<summary>
     ///udw_idKey   
     ///</summary>
	 [DataMember]
     public int udw_idKey { get;set;} 
	  ///<summary>
     ///udw_usuario   
     ///</summary>
	 [DataMember]
     public string udw_usuario { get;set;} 
	  ///<summary>
     ///udw_clave   
     ///</summary>
	 [DataMember]
     public string udw_clave { get;set;} 
	  ///<summary>
     ///udw_nombre   
     ///</summary>
	 [DataMember]
     public string udw_nombre { get;set;} 
	  ///<summary>
     ///udw_apellido   
     ///</summary>
	 [DataMember]
     public string udw_apellido { get;set;} 
	  ///<summary>
     ///udw_empresa   
     ///</summary>
	 [DataMember]
     public string udw_empresa { get;set;} 
	  ///<summary>
     ///udw_tipo   
     ///</summary>
	 [DataMember]
     public int udw_tipo { get;set;} 
	  ///<summary>
     ///udw_iperfil   
     ///</summary>
	 [DataMember]
     public int udw_iperfil { get;set;} 
	  ///<summary>
     ///udw_estado   
     ///</summary>
	 [DataMember]
     public Decimal udw_estado { get;set;} 
	  ///<summary>
     ///udw_metadata   
     ///</summary>
	 [DataMember]
     public string udw_metadata { get;set;} 
	  ///<summary>
     ///udw_iloginfallido   
     ///</summary>
	 [DataMember]
     public int udw_iloginfallido { get;set;} 
	 ///<summary>
        ///UsersDesktopWeb Constructor
        ///</summary>
        public SimpleUsersDesktopWeb() : base()
  {
  InitClass();
  }
        ///<summary>
        ///UsersDesktopWeb Constructor
        ///</summary>
        public SimpleUsersDesktopWeb(int Id, string Name, int udw_idKey, string udw_usuario, string udw_clave, string udw_nombre, string udw_apellido, string udw_empresa, int udw_tipo, int udw_iperfil, Decimal udw_estado, string udw_metadata, int udw_iloginfallido) : base()
        {
            base.Id = Id;
						base.Name = Name;				 																																					 
				    this.udw_idKey = udw_idKey;
this.udw_usuario = udw_usuario;
this.udw_clave = udw_clave;
this.udw_nombre = udw_nombre;
this.udw_apellido = udw_apellido;
this.udw_empresa = udw_empresa;
this.udw_tipo = udw_tipo;
this.udw_iperfil = udw_iperfil;
this.udw_estado = udw_estado;
this.udw_metadata = udw_metadata;
this.udw_iloginfallido = udw_iloginfallido;

            InitClass();
        }  								

				private void InitClass()
        {														
  				  base.Type = new ObjectType(3050, "UsersDesktopWeb");
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
			BaseObject Object = new DalUsersDesktopWeb(SqlConfig, UserId, this);
			if(this.CallerObject != null)
			   Object.CallerObject = this.CallerObject;			
			return Object;
		}
///<summary>
    ///Get parent object
    ///</summary>
		public override CallerObject GetCallerObject()
		{
			CallerUsersDesktopWeb Caller = new CallerUsersDesktopWeb();
			Caller.Id = base.Id;
			Caller.Name = base.Name;
			Caller.udw_idKey = this.udw_idKey;
Caller.udw_usuario = this.udw_usuario;
Caller.udw_clave = this.udw_clave;
Caller.udw_nombre = this.udw_nombre;
Caller.udw_apellido = this.udw_apellido;
Caller.udw_empresa = this.udw_empresa;
Caller.udw_tipo = this.udw_tipo;
Caller.udw_iperfil = this.udw_iperfil;
Caller.udw_estado = this.udw_estado;
Caller.udw_metadata = this.udw_metadata;
Caller.udw_iloginfallido = this.udw_iloginfallido;

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
               dt.Columns.Add(new DataColumn("udw_idKey", typeof (int)));               
							 dt.Columns.Add(new DataColumn("udw_usuario", typeof (string)));               
							 dt.Columns.Add(new DataColumn("udw_clave", typeof (string)));               
							 dt.Columns.Add(new DataColumn("udw_nombre", typeof (string)));               
							 dt.Columns.Add(new DataColumn("udw_apellido", typeof (string)));               
							 dt.Columns.Add(new DataColumn("udw_empresa", typeof (string)));               
							 dt.Columns.Add(new DataColumn("udw_tipo", typeof (int)));               
							 dt.Columns.Add(new DataColumn("udw_iperfil", typeof (int)));               
							 dt.Columns.Add(new DataColumn("udw_estado", typeof (Decimal)));               
							 dt.Columns.Add(new DataColumn("udw_metadata", typeof (string)));               
							 dt.Columns.Add(new DataColumn("udw_iloginfallido", typeof (int)));               
							 										
               //create Row  
               dr = dt.NewRow();
               
               //set Row
							 dr["Id"] = base.Id;

							 dr["Name"] = base.Name;
dr["udw_idKey"] = (object)this.udw_idKey ?? System.DBNull.Value;
dr["udw_usuario"] = (object)this.udw_usuario ?? System.DBNull.Value;
dr["udw_clave"] = (object)this.udw_clave ?? System.DBNull.Value;
dr["udw_nombre"] = (object)this.udw_nombre ?? System.DBNull.Value;
dr["udw_apellido"] = (object)this.udw_apellido ?? System.DBNull.Value;
dr["udw_empresa"] = (object)this.udw_empresa ?? System.DBNull.Value;
dr["udw_tipo"] = (object)this.udw_tipo ?? System.DBNull.Value;
dr["udw_iperfil"] = (object)this.udw_iperfil ?? System.DBNull.Value;
dr["udw_estado"] = (object)this.udw_estado ?? System.DBNull.Value;
dr["udw_metadata"] = (object)this.udw_metadata ?? System.DBNull.Value;
dr["udw_iloginfallido"] = (object)this.udw_iloginfallido ?? System.DBNull.Value;
							 
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
