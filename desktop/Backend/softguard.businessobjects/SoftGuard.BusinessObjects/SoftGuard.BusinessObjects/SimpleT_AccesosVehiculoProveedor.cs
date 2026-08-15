
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
    ///T_AccesosVehiculoProveedor Slbf Class
    ///</summary>
    [DataContract]
    public class SimpleT_AccesosVehiculoProveedor : SimpleBaseObject
    { 
			 ///<summary>
     ///avp_iVehicleBrand   
     ///</summary>
	 [DataMember]
     public int avp_iVehicleBrand { get;set;} 
	  ///<summary>
     ///avp_iVehicleModel   
     ///</summary>
	 [DataMember]
     public int avp_iVehicleModel { get;set;} 
	  ///<summary>
     ///avp_cMatricula   
     ///</summary>
	 [DataMember]
     public string avp_cMatricula { get;set;} 
	  ///<summary>
     ///avp_cColor   
     ///</summary>
	 [DataMember]
     public string avp_cColor { get;set;} 
	  ///<summary>
     ///avp_iYear   
     ///</summary>
	 [DataMember]
     public int avp_iYear { get;set;} 
	  ///<summary>
     ///avp_cTipo   
     ///</summary>
	 [DataMember]
     public string avp_cTipo { get;set;} 
	  ///<summary>
     ///avp_cCiaSeguro   
     ///</summary>
	 [DataMember]
     public string avp_cCiaSeguro { get;set;} 
	  ///<summary>
     ///avp_tVtoSeguro   
     ///</summary>
	 [DataMember]
     public DateTime? avp_tVtoSeguro { get;set;} 
	  ///<summary>
     ///avp_tVtoVTV   
     ///</summary>
	 [DataMember]
     public DateTime? avp_tVtoVTV { get;set;} 
	  ///<summary>
     ///avp_cIdentificacion   
     ///</summary>
	 [DataMember]
     public string avp_cIdentificacion { get;set;} 
	  ///<summary>
     ///avp_tVtoIdentificacion   
     ///</summary>
	 [DataMember]
     public DateTime? avp_tVtoIdentificacion { get;set;} 
	  ///<summary>
     ///avp_cObservaciones   
     ///</summary>
	 [DataMember]
     public string avp_cObservaciones { get;set;} 
	  ///<summary>
     ///avp_cPathPicture   
     ///</summary>
	 [DataMember]
     public string avp_cPathPicture { get;set;} 
	 ///<summary>
        ///T_AccesosVehiculoProveedor Constructor
        ///</summary>
        public SimpleT_AccesosVehiculoProveedor() : base()
  {
  InitClass();
  }
        ///<summary>
        ///T_AccesosVehiculoProveedor Constructor
        ///</summary>
        public SimpleT_AccesosVehiculoProveedor(int Id, string Name, int avp_iVehicleBrand, int avp_iVehicleModel, string avp_cMatricula, string avp_cColor, int avp_iYear, string avp_cTipo, string avp_cCiaSeguro, DateTime? avp_tVtoSeguro, DateTime? avp_tVtoVTV, string avp_cIdentificacion, DateTime? avp_tVtoIdentificacion, string avp_cObservaciones, string avp_cPathPicture) : base()
        {
            base.Id = Id;
						base.Name = Name;				 																																					 
				    this.avp_iVehicleBrand = avp_iVehicleBrand;
this.avp_iVehicleModel = avp_iVehicleModel;
this.avp_cMatricula = avp_cMatricula;
this.avp_cColor = avp_cColor;
this.avp_iYear = avp_iYear;
this.avp_cTipo = avp_cTipo;
this.avp_cCiaSeguro = avp_cCiaSeguro;
this.avp_tVtoSeguro = avp_tVtoSeguro;
this.avp_tVtoVTV = avp_tVtoVTV;
this.avp_cIdentificacion = avp_cIdentificacion;
this.avp_tVtoIdentificacion = avp_tVtoIdentificacion;
this.avp_cObservaciones = avp_cObservaciones;
this.avp_cPathPicture = avp_cPathPicture;

            InitClass();
        }  								

				private void InitClass()
        {														
  				  base.Type = new ObjectType(3232, "T_AccesosVehiculoProveedor");
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
			BaseObject Object = new DalT_AccesosVehiculoProveedor(SqlConfig, UserId, this);
			if(this.CallerObject != null)
			   Object.CallerObject = this.CallerObject;			
			return Object;
		}
///<summary>
    ///Get parent object
    ///</summary>
		public override CallerObject GetCallerObject()
		{
			CallerT_AccesosVehiculoProveedor Caller = new CallerT_AccesosVehiculoProveedor();
			Caller.Id = base.Id;
			Caller.Name = base.Name;
			Caller.avp_iVehicleBrand = this.avp_iVehicleBrand;
Caller.avp_iVehicleModel = this.avp_iVehicleModel;
Caller.avp_cMatricula = this.avp_cMatricula;
Caller.avp_cColor = this.avp_cColor;
Caller.avp_iYear = this.avp_iYear;
Caller.avp_cTipo = this.avp_cTipo;
Caller.avp_cCiaSeguro = this.avp_cCiaSeguro;
Caller.avp_tVtoSeguro = this.avp_tVtoSeguro;
Caller.avp_tVtoVTV = this.avp_tVtoVTV;
Caller.avp_cIdentificacion = this.avp_cIdentificacion;
Caller.avp_tVtoIdentificacion = this.avp_tVtoIdentificacion;
Caller.avp_cObservaciones = this.avp_cObservaciones;
Caller.avp_cPathPicture = this.avp_cPathPicture;

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
               dt.Columns.Add(new DataColumn("avp_iVehicleBrand", typeof (int)));               
							 dt.Columns.Add(new DataColumn("avp_iVehicleModel", typeof (int)));               
							 dt.Columns.Add(new DataColumn("avp_cMatricula", typeof (string)));               
							 dt.Columns.Add(new DataColumn("avp_cColor", typeof (string)));               
							 dt.Columns.Add(new DataColumn("avp_iYear", typeof (int)));               
							 dt.Columns.Add(new DataColumn("avp_cTipo", typeof (string)));               
							 dt.Columns.Add(new DataColumn("avp_cCiaSeguro", typeof (string)));               
							 dt.Columns.Add(new DataColumn("avp_tVtoSeguro", typeof (DateTime)));               
							 dt.Columns.Add(new DataColumn("avp_tVtoVTV", typeof (DateTime)));               
							 dt.Columns.Add(new DataColumn("avp_cIdentificacion", typeof (string)));               
							 dt.Columns.Add(new DataColumn("avp_tVtoIdentificacion", typeof (DateTime)));               
							 dt.Columns.Add(new DataColumn("avp_cObservaciones", typeof (string)));               
							 dt.Columns.Add(new DataColumn("avp_cPathPicture", typeof (string)));               
							 										
               //create Row  
               dr = dt.NewRow();
               
               //set Row
							 dr["Id"] = base.Id;

							 dr["Name"] = base.Name;
dr["avp_iVehicleBrand"] = (object)this.avp_iVehicleBrand ?? System.DBNull.Value;
dr["avp_iVehicleModel"] = (object)this.avp_iVehicleModel ?? System.DBNull.Value;
dr["avp_cMatricula"] = (object)this.avp_cMatricula ?? System.DBNull.Value;
dr["avp_cColor"] = (object)this.avp_cColor ?? System.DBNull.Value;
dr["avp_iYear"] = (object)this.avp_iYear ?? System.DBNull.Value;
dr["avp_cTipo"] = (object)this.avp_cTipo ?? System.DBNull.Value;
dr["avp_cCiaSeguro"] = (object)this.avp_cCiaSeguro ?? System.DBNull.Value;
dr["avp_tVtoSeguro"] = (object)this.avp_tVtoSeguro ?? System.DBNull.Value;
dr["avp_tVtoVTV"] = (object)this.avp_tVtoVTV ?? System.DBNull.Value;
dr["avp_cIdentificacion"] = (object)this.avp_cIdentificacion ?? System.DBNull.Value;
dr["avp_tVtoIdentificacion"] = (object)this.avp_tVtoIdentificacion ?? System.DBNull.Value;
dr["avp_cObservaciones"] = (object)this.avp_cObservaciones ?? System.DBNull.Value;
dr["avp_cPathPicture"] = (object)this.avp_cPathPicture ?? System.DBNull.Value;
							 
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
