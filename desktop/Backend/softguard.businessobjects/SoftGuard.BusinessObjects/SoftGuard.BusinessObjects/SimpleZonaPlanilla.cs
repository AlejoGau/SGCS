
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
    ///ZonaPlanilla Slbf Class
    ///</summary>
    [DataContract]
    public class SimpleZonaPlanilla : SimpleBaseObject
    { 
			 ///<summary>
     ///zon_iid   
     ///</summary>
	 [DataMember]
     public int zon_iid { get;set;} 
	  ///<summary>
     ///zon_ccodigo   
     ///</summary>
	 [DataMember]
     public string zon_ccodigo { get;set;} 
	  ///<summary>
     ///zon_cdescripcion   
     ///</summary>
	 [DataMember]
     public string zon_cdescripcion { get;set;} 
	  ///<summary>
     ///zon_codigoalarma   
     ///</summary>
	 [DataMember]
     public string zon_codigoalarma { get;set;} 
	  ///<summary>
     ///zon_clistaemergencia   
     ///</summary>
	 [DataMember]
     public string zon_clistaemergencia { get;set;} 
	  ///<summary>
     ///zon_cimagen   
     ///</summary>
	 [DataMember]
     public string zon_cimagen { get;set;} 
	  ///<summary>
     ///zon_mobservacion   
     ///</summary>
	 [DataMember]
     public string zon_mobservacion { get;set;} 
	  ///<summary>
     ///zon_ccodigorestauracion   
     ///</summary>
	 [DataMember]
     public string zon_ccodigorestauracion { get;set;} 
	  ///<summary>
     ///zon_nminutosrestauracion   
     ///</summary>
	 [DataMember]
     public Decimal zon_nminutosrestauracion { get;set;} 
	  ///<summary>
     ///zon_nmostrar   
     ///</summary>
	 [DataMember]
     public Decimal zon_nmostrar { get;set;} 
	  ///<summary>
     ///zon_cdealer   
     ///</summary>
	 [DataMember]
     public string zon_cdealer { get;set;} 
	  ///<summary>
     ///zon_ccuenta   
     ///</summary>
	 [DataMember]
     public string zon_ccuenta { get;set;} 
	  ///<summary>
     ///zon_nautoprocesa   
     ///</summary>
	 [DataMember]
     public Decimal zon_nautoprocesa { get;set;} 
	  ///<summary>
     ///zon_calarmaagenerar   
     ///</summary>
	 [DataMember]
     public string zon_calarmaagenerar { get;set;} 
	 ///<summary>
        ///ZonaPlanilla Constructor
        ///</summary>
        public SimpleZonaPlanilla() : base()
  {
  InitClass();
  }
        ///<summary>
        ///ZonaPlanilla Constructor
        ///</summary>
        public SimpleZonaPlanilla(int Id, string Name, int zon_iid, string zon_ccodigo, string zon_cdescripcion, string zon_codigoalarma, string zon_clistaemergencia, string zon_cimagen, string zon_mobservacion, string zon_ccodigorestauracion, Decimal zon_nminutosrestauracion, Decimal zon_nmostrar, string zon_cdealer, string zon_ccuenta, Decimal zon_nautoprocesa, string zon_calarmaagenerar) : base()
        {
            base.Id = Id;
						base.Name = Name;				 																																					 
				    this.zon_iid = zon_iid;
this.zon_ccodigo = zon_ccodigo;
this.zon_cdescripcion = zon_cdescripcion;
this.zon_codigoalarma = zon_codigoalarma;
this.zon_clistaemergencia = zon_clistaemergencia;
this.zon_cimagen = zon_cimagen;
this.zon_mobservacion = zon_mobservacion;
this.zon_ccodigorestauracion = zon_ccodigorestauracion;
this.zon_nminutosrestauracion = zon_nminutosrestauracion;
this.zon_nmostrar = zon_nmostrar;
this.zon_cdealer = zon_cdealer;
this.zon_ccuenta = zon_ccuenta;
this.zon_nautoprocesa = zon_nautoprocesa;
this.zon_calarmaagenerar = zon_calarmaagenerar;

            InitClass();
        }  								

				private void InitClass()
        {														
  				  base.Type = new ObjectType(3015, "ZonaPlanilla");
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
			BaseObject Object = new DalZonaPlanilla(SqlConfig, UserId, this);
			if(this.CallerObject != null)
			   Object.CallerObject = this.CallerObject;			
			return Object;
		}
///<summary>
    ///Get parent object
    ///</summary>
		public override CallerObject GetCallerObject()
		{
			CallerZonaPlanilla Caller = new CallerZonaPlanilla();
			Caller.Id = base.Id;
			Caller.Name = base.Name;
			Caller.zon_iid = this.zon_iid;
Caller.zon_ccodigo = this.zon_ccodigo;
Caller.zon_cdescripcion = this.zon_cdescripcion;
Caller.zon_codigoalarma = this.zon_codigoalarma;
Caller.zon_clistaemergencia = this.zon_clistaemergencia;
Caller.zon_cimagen = this.zon_cimagen;
Caller.zon_mobservacion = this.zon_mobservacion;
Caller.zon_ccodigorestauracion = this.zon_ccodigorestauracion;
Caller.zon_nminutosrestauracion = this.zon_nminutosrestauracion;
Caller.zon_nmostrar = this.zon_nmostrar;
Caller.zon_cdealer = this.zon_cdealer;
Caller.zon_ccuenta = this.zon_ccuenta;
Caller.zon_nautoprocesa = this.zon_nautoprocesa;
Caller.zon_calarmaagenerar = this.zon_calarmaagenerar;

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
               dt.Columns.Add(new DataColumn("zon_iid", typeof (int)));               
							 dt.Columns.Add(new DataColumn("zon_ccodigo", typeof (string)));               
							 dt.Columns.Add(new DataColumn("zon_cdescripcion", typeof (string)));               
							 dt.Columns.Add(new DataColumn("zon_codigoalarma", typeof (string)));               
							 dt.Columns.Add(new DataColumn("zon_clistaemergencia", typeof (string)));               
							 dt.Columns.Add(new DataColumn("zon_cimagen", typeof (string)));               
							 dt.Columns.Add(new DataColumn("zon_mobservacion", typeof (string)));               
							 dt.Columns.Add(new DataColumn("zon_ccodigorestauracion", typeof (string)));               
							 dt.Columns.Add(new DataColumn("zon_nminutosrestauracion", typeof (Decimal)));               
							 dt.Columns.Add(new DataColumn("zon_nmostrar", typeof (Decimal)));               
							 dt.Columns.Add(new DataColumn("zon_cdealer", typeof (string)));               
							 dt.Columns.Add(new DataColumn("zon_ccuenta", typeof (string)));               
							 dt.Columns.Add(new DataColumn("zon_nautoprocesa", typeof (Decimal)));               
							 dt.Columns.Add(new DataColumn("zon_calarmaagenerar", typeof (string)));               
							 										
               //create Row  
               dr = dt.NewRow();
               
               //set Row
							 dr["Id"] = base.Id;

							 dr["Name"] = base.Name;
dr["zon_iid"] = (object)this.zon_iid ?? System.DBNull.Value;
dr["zon_ccodigo"] = (object)this.zon_ccodigo ?? System.DBNull.Value;
dr["zon_cdescripcion"] = (object)this.zon_cdescripcion ?? System.DBNull.Value;
dr["zon_codigoalarma"] = (object)this.zon_codigoalarma ?? System.DBNull.Value;
dr["zon_clistaemergencia"] = (object)this.zon_clistaemergencia ?? System.DBNull.Value;
dr["zon_cimagen"] = (object)this.zon_cimagen ?? System.DBNull.Value;
dr["zon_mobservacion"] = (object)this.zon_mobservacion ?? System.DBNull.Value;
dr["zon_ccodigorestauracion"] = (object)this.zon_ccodigorestauracion ?? System.DBNull.Value;
dr["zon_nminutosrestauracion"] = (object)this.zon_nminutosrestauracion ?? System.DBNull.Value;
dr["zon_nmostrar"] = (object)this.zon_nmostrar ?? System.DBNull.Value;
dr["zon_cdealer"] = (object)this.zon_cdealer ?? System.DBNull.Value;
dr["zon_ccuenta"] = (object)this.zon_ccuenta ?? System.DBNull.Value;
dr["zon_nautoprocesa"] = (object)this.zon_nautoprocesa ?? System.DBNull.Value;
dr["zon_calarmaagenerar"] = (object)this.zon_calarmaagenerar ?? System.DBNull.Value;
							 
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
