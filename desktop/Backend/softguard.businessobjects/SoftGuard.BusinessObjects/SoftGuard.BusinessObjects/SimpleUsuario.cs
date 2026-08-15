
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
    ///Usuario Slbf Class
    ///</summary>
    [DataContract]
    public class SimpleUsuario : SimpleBaseObject
    { 
			 ///<summary>
     ///usu_iidcuenta   
     ///</summary>
	 [DataMember]
     public int usu_iidcuenta { get;set;} 
	  ///<summary>
     ///usu_icodigo   
     ///</summary>
	 [DataMember]
     public int usu_icodigo { get;set;} 
	  ///<summary>
     ///usu_cnombre   
     ///</summary>
	 [DataMember]
     public string usu_cnombre { get;set;} 
	  ///<summary>
     ///usu_iid   
     ///</summary>
	 [DataMember]
     public int usu_iid { get;set;} 
	  ///<summary>
     ///usu_cclave   
     ///</summary>
	 [DataMember]
     public string usu_cclave { get;set;} 
	  ///<summary>
     ///usu_ntipo   
     ///</summary>
	 [DataMember]
     public Decimal usu_ntipo { get;set;} 
	  ///<summary>
     ///usu_cimagen   
     ///</summary>
	 [DataMember]
     public string usu_cimagen { get;set;} 
	  ///<summary>
     ///usu_mobservacion   
     ///</summary>
	 [DataMember]
     public string usu_mobservacion { get;set;} 
	  ///<summary>
     ///usu_cidextendido   
     ///</summary>
	 [DataMember]
     public string usu_cidextendido { get;set;} 
	  ///<summary>
     ///usu_cmetadata   
     ///</summary>
	 [DataMember]
     public string usu_cmetadata { get;set;} 
	  ///<summary>
     ///usu_teliid   
     ///</summary>
	 [DataMember]
     public int usu_teliid { get;set;} 
	  ///<summary>
     ///usu_cidentificacion   
     ///</summary>
	 [DataMember]
     public string usu_cidentificacion { get;set;} 
	  ///<summary>
     ///usu_itipoidentificacion   
     ///</summary>
	 [DataMember]
     public int usu_itipoidentificacion { get;set;} 
	  ///<summary>
     ///usu_email   
     ///</summary>
	 [DataMember]
     public string usu_email { get;set;} 
	 ///<summary>
        ///Usuario Constructor
        ///</summary>
        public SimpleUsuario() : base()
  {
  InitClass();
  }
        ///<summary>
        ///Usuario Constructor
        ///</summary>
        public SimpleUsuario(int Id, string Name, int usu_iidcuenta, int usu_icodigo, string usu_cnombre, int usu_iid, string usu_cclave, Decimal usu_ntipo, string usu_cimagen, string usu_mobservacion, string usu_cidextendido, string usu_cmetadata, int usu_teliid, string usu_cidentificacion, int usu_itipoidentificacion, string usu_email) : base()
        {
            base.Id = Id;
						base.Name = Name;				 																																					 
				    this.usu_iidcuenta = usu_iidcuenta;
this.usu_icodigo = usu_icodigo;
this.usu_cnombre = usu_cnombre;
this.usu_iid = usu_iid;
this.usu_cclave = usu_cclave;
this.usu_ntipo = usu_ntipo;
this.usu_cimagen = usu_cimagen;
this.usu_mobservacion = usu_mobservacion;
this.usu_cidextendido = usu_cidextendido;
this.usu_cmetadata = usu_cmetadata;
this.usu_teliid = usu_teliid;
this.usu_cidentificacion = usu_cidentificacion;
this.usu_itipoidentificacion = usu_itipoidentificacion;
this.usu_email = usu_email;

            InitClass();
        }  								

				private void InitClass()
        {														
  				  base.Type = new ObjectType(3013, "Usuario");
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
			BaseObject Object = new DalUsuario(SqlConfig, UserId, this);
			if(this.CallerObject != null)
			   Object.CallerObject = this.CallerObject;			
			return Object;
		}
///<summary>
    ///Get parent object
    ///</summary>
		public override CallerObject GetCallerObject()
		{
			CallerUsuario Caller = new CallerUsuario();
			Caller.Id = base.Id;
			Caller.Name = base.Name;
			Caller.usu_iidcuenta = this.usu_iidcuenta;
Caller.usu_icodigo = this.usu_icodigo;
Caller.usu_cnombre = this.usu_cnombre;
Caller.usu_iid = this.usu_iid;
Caller.usu_cclave = this.usu_cclave;
Caller.usu_ntipo = this.usu_ntipo;
Caller.usu_cimagen = this.usu_cimagen;
Caller.usu_mobservacion = this.usu_mobservacion;
Caller.usu_cidextendido = this.usu_cidextendido;
Caller.usu_cmetadata = this.usu_cmetadata;
Caller.usu_teliid = this.usu_teliid;
Caller.usu_cidentificacion = this.usu_cidentificacion;
Caller.usu_itipoidentificacion = this.usu_itipoidentificacion;
Caller.usu_email = this.usu_email;

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
               dt.Columns.Add(new DataColumn("usu_iidcuenta", typeof (int)));               
							 dt.Columns.Add(new DataColumn("usu_icodigo", typeof (int)));               
							 dt.Columns.Add(new DataColumn("usu_cnombre", typeof (string)));               
							 dt.Columns.Add(new DataColumn("usu_iid", typeof (int)));               
							 dt.Columns.Add(new DataColumn("usu_cclave", typeof (string)));               
							 dt.Columns.Add(new DataColumn("usu_ntipo", typeof (Decimal)));               
							 dt.Columns.Add(new DataColumn("usu_cimagen", typeof (string)));               
							 dt.Columns.Add(new DataColumn("usu_mobservacion", typeof (string)));               
							 dt.Columns.Add(new DataColumn("usu_cidextendido", typeof (string)));               
							 dt.Columns.Add(new DataColumn("usu_cmetadata", typeof (string)));               
							 dt.Columns.Add(new DataColumn("usu_teliid", typeof (int)));               
							 dt.Columns.Add(new DataColumn("usu_cidentificacion", typeof (string)));               
							 dt.Columns.Add(new DataColumn("usu_itipoidentificacion", typeof (int)));               
							 dt.Columns.Add(new DataColumn("usu_email", typeof (string)));               
							 										
               //create Row  
               dr = dt.NewRow();
               
               //set Row
							 dr["Id"] = base.Id;

							 dr["Name"] = base.Name;
dr["usu_iidcuenta"] = (object)this.usu_iidcuenta ?? System.DBNull.Value;
dr["usu_icodigo"] = (object)this.usu_icodigo ?? System.DBNull.Value;
dr["usu_cnombre"] = (object)this.usu_cnombre ?? System.DBNull.Value;
dr["usu_iid"] = (object)this.usu_iid ?? System.DBNull.Value;
dr["usu_cclave"] = (object)this.usu_cclave ?? System.DBNull.Value;
dr["usu_ntipo"] = (object)this.usu_ntipo ?? System.DBNull.Value;
dr["usu_cimagen"] = (object)this.usu_cimagen ?? System.DBNull.Value;
dr["usu_mobservacion"] = (object)this.usu_mobservacion ?? System.DBNull.Value;
dr["usu_cidextendido"] = (object)this.usu_cidextendido ?? System.DBNull.Value;
dr["usu_cmetadata"] = (object)this.usu_cmetadata ?? System.DBNull.Value;
dr["usu_teliid"] = (object)this.usu_teliid ?? System.DBNull.Value;
dr["usu_cidentificacion"] = (object)this.usu_cidentificacion ?? System.DBNull.Value;
dr["usu_itipoidentificacion"] = (object)this.usu_itipoidentificacion ?? System.DBNull.Value;
dr["usu_email"] = (object)this.usu_email ?? System.DBNull.Value;
							 
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
