
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
    ///SmartTrack Slbf Class
    ///</summary>
    [DataContract]
    public class SimpleSmartTrack : SimpleBaseObject
    { 
			 ///<summary>
     ///Telefono   
     ///</summary>
	 [DataMember]
     public string Telefono { get;set;} 
	  ///<summary>
     ///Imei   
     ///</summary>
	 [DataMember]
     public string Imei { get;set;} 
	  ///<summary>
     ///Modelo   
     ///</summary>
	 [DataMember]
     public string Modelo { get;set;} 
	  ///<summary>
     ///Marca   
     ///</summary>
	 [DataMember]
     public string Marca { get;set;} 
	  ///<summary>
     ///Version   
     ///</summary>
	 [DataMember]
     public string Version { get;set;} 
	  ///<summary>
     ///Tipo   
     ///</summary>
	 [DataMember]
     public string Tipo { get;set;} 
	  ///<summary>
     ///CuentaId   
     ///</summary>
	 [DataMember]
     public int CuentaId { get;set;} 
	  ///<summary>
     ///Nombre   
     ///</summary>
	 [DataMember]
     public string Nombre { get;set;} 
	  ///<summary>
     ///Config   
     ///</summary>
	 [DataMember]
     public string Config { get;set;} 
	  ///<summary>
     ///pushToken   
     ///</summary>
	 [DataMember]
     public string pushToken { get;set;} 
	  ///<summary>
     ///AppType   
     ///</summary>
	 [DataMember]
     public string AppType { get;set;} 
	 ///<summary>
        ///SmartTrack Constructor
        ///</summary>
        public SimpleSmartTrack() : base()
  {
  InitClass();
  }
        ///<summary>
        ///SmartTrack Constructor
        ///</summary>
        public SimpleSmartTrack(int Id, string Name, string Telefono, string Imei, string Modelo, string Marca, string Version, string Tipo, int CuentaId, string Nombre, string Config, string pushToken, string AppType) : base()
        {
            base.Id = Id;
						base.Name = Name;				 																																					 
				    this.Telefono = Telefono;
this.Imei = Imei;
this.Modelo = Modelo;
this.Marca = Marca;
this.Version = Version;
this.Tipo = Tipo;
this.CuentaId = CuentaId;
this.Nombre = Nombre;
this.Config = Config;
this.pushToken = pushToken;
this.AppType = AppType;

            InitClass();
        }  								

				private void InitClass()
        {														
  				  base.Type = new ObjectType(3113, "SmartTrack");
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
			BaseObject Object = new DalSmartTrack(SqlConfig, UserId, this);
			if(this.CallerObject != null)
			   Object.CallerObject = this.CallerObject;			
			return Object;
		}
///<summary>
    ///Get parent object
    ///</summary>
		public override CallerObject GetCallerObject()
		{
			CallerSmartTrack Caller = new CallerSmartTrack();
			Caller.Id = base.Id;
			Caller.Name = base.Name;
			Caller.Telefono = this.Telefono;
Caller.Imei = this.Imei;
Caller.Modelo = this.Modelo;
Caller.Marca = this.Marca;
Caller.Version = this.Version;
Caller.Tipo = this.Tipo;
Caller.CuentaId = this.CuentaId;
Caller.Nombre = this.Nombre;
Caller.Config = this.Config;
Caller.pushToken = this.pushToken;
Caller.AppType = this.AppType;

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
               dt.Columns.Add(new DataColumn("Telefono", typeof (string)));               
							 dt.Columns.Add(new DataColumn("Imei", typeof (string)));               
							 dt.Columns.Add(new DataColumn("Modelo", typeof (string)));               
							 dt.Columns.Add(new DataColumn("Marca", typeof (string)));               
							 dt.Columns.Add(new DataColumn("Version", typeof (string)));               
							 dt.Columns.Add(new DataColumn("Tipo", typeof (string)));               
							 dt.Columns.Add(new DataColumn("CuentaId", typeof (int)));               
							 dt.Columns.Add(new DataColumn("Nombre", typeof (string)));               
							 dt.Columns.Add(new DataColumn("Config", typeof (string)));               
							 dt.Columns.Add(new DataColumn("pushToken", typeof (string)));               
							 dt.Columns.Add(new DataColumn("AppType", typeof (string)));               
							 										
               //create Row  
               dr = dt.NewRow();
               
               //set Row
							 dr["Id"] = base.Id;

							 dr["Name"] = base.Name;
dr["Telefono"] = (object)this.Telefono ?? System.DBNull.Value;
dr["Imei"] = (object)this.Imei ?? System.DBNull.Value;
dr["Modelo"] = (object)this.Modelo ?? System.DBNull.Value;
dr["Marca"] = (object)this.Marca ?? System.DBNull.Value;
dr["Version"] = (object)this.Version ?? System.DBNull.Value;
dr["Tipo"] = (object)this.Tipo ?? System.DBNull.Value;
dr["CuentaId"] = (object)this.CuentaId ?? System.DBNull.Value;
dr["Nombre"] = (object)this.Nombre ?? System.DBNull.Value;
dr["Config"] = (object)this.Config ?? System.DBNull.Value;
dr["pushToken"] = (object)this.pushToken ?? System.DBNull.Value;
dr["AppType"] = (object)this.AppType ?? System.DBNull.Value;
							 
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
