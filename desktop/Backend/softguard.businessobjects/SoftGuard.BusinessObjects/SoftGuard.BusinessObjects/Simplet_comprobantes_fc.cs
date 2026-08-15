
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
    ///t_comprobantes_fc Slbf Class
    ///</summary>
    [DataContract]
    public class Simplet_comprobantes_fc : SimpleBaseObject
    { 
			 ///<summary>
     ///cbt_ccodigo   
     ///</summary>
	 [DataMember]
     public string cbt_ccodigo { get;set;} 
	  ///<summary>
     ///cbt_cdescripcion   
     ///</summary>
	 [DataMember]
     public string cbt_cdescripcion { get;set;} 
	  ///<summary>
     ///cbt_cdescripcionreducida   
     ///</summary>
	 [DataMember]
     public string cbt_cdescripcionreducida { get;set;} 
	  ///<summary>
     ///cbt_ntipo   
     ///</summary>
	 [DataMember]
     public int cbt_ntipo { get;set;} 
	  ///<summary>
     ///cbt_cletra   
     ///</summary>
	 [DataMember]
     public string cbt_cletra { get;set;} 
	  ///<summary>
     ///cbt_cprefijo   
     ///</summary>
	 [DataMember]
     public string cbt_cprefijo { get;set;} 
	  ///<summary>
     ///cbt_inumero   
     ///</summary>
	 [DataMember]
     public int cbt_inumero { get;set;} 
	  ///<summary>
     ///cbt_ncopias   
     ///</summary>
	 [DataMember]
     public int cbt_ncopias { get;set;} 
	  ///<summary>
     ///cbt_casociado   
     ///</summary>
	 [DataMember]
     public string cbt_casociado { get;set;} 
	  ///<summary>
     ///cbt_nCbteCAE   
     ///</summary>
	 [DataMember]
     public int cbt_nCbteCAE { get;set;} 
	  ///<summary>
     ///cbt_idOrganizacionFacturadora   
     ///</summary>
	 [DataMember]
     public int cbt_idOrganizacionFacturadora { get;set;} 
	 ///<summary>
        ///t_comprobantes_fc Constructor
        ///</summary>
        public Simplet_comprobantes_fc() : base()
  {
  InitClass();
  }
        ///<summary>
        ///t_comprobantes_fc Constructor
        ///</summary>
        public Simplet_comprobantes_fc(int Id, string Name, string cbt_ccodigo, string cbt_cdescripcion, string cbt_cdescripcionreducida, int cbt_ntipo, string cbt_cletra, string cbt_cprefijo, int cbt_inumero, int cbt_ncopias, string cbt_casociado, int cbt_nCbteCAE, int cbt_idOrganizacionFacturadora) : base()
        {
            base.Id = Id;
						base.Name = Name;				 																																					 
				    this.cbt_ccodigo = cbt_ccodigo;
this.cbt_cdescripcion = cbt_cdescripcion;
this.cbt_cdescripcionreducida = cbt_cdescripcionreducida;
this.cbt_ntipo = cbt_ntipo;
this.cbt_cletra = cbt_cletra;
this.cbt_cprefijo = cbt_cprefijo;
this.cbt_inumero = cbt_inumero;
this.cbt_ncopias = cbt_ncopias;
this.cbt_casociado = cbt_casociado;
this.cbt_nCbteCAE = cbt_nCbteCAE;
this.cbt_idOrganizacionFacturadora = cbt_idOrganizacionFacturadora;

            InitClass();
        }  								

				private void InitClass()
        {														
  				  base.Type = new ObjectType(3183, "t_comprobantes_fc");
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
			BaseObject Object = new Dalt_comprobantes_fc(SqlConfig, UserId, this);
			if(this.CallerObject != null)
			   Object.CallerObject = this.CallerObject;			
			return Object;
		}
///<summary>
    ///Get parent object
    ///</summary>
		public override CallerObject GetCallerObject()
		{
			Callert_comprobantes_fc Caller = new Callert_comprobantes_fc();
			Caller.Id = base.Id;
			Caller.Name = base.Name;
			Caller.cbt_ccodigo = this.cbt_ccodigo;
Caller.cbt_cdescripcion = this.cbt_cdescripcion;
Caller.cbt_cdescripcionreducida = this.cbt_cdescripcionreducida;
Caller.cbt_ntipo = this.cbt_ntipo;
Caller.cbt_cletra = this.cbt_cletra;
Caller.cbt_cprefijo = this.cbt_cprefijo;
Caller.cbt_inumero = this.cbt_inumero;
Caller.cbt_ncopias = this.cbt_ncopias;
Caller.cbt_casociado = this.cbt_casociado;
Caller.cbt_nCbteCAE = this.cbt_nCbteCAE;
Caller.cbt_idOrganizacionFacturadora = this.cbt_idOrganizacionFacturadora;

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
               dt.Columns.Add(new DataColumn("cbt_ccodigo", typeof (string)));               
							 dt.Columns.Add(new DataColumn("cbt_cdescripcion", typeof (string)));               
							 dt.Columns.Add(new DataColumn("cbt_cdescripcionreducida", typeof (string)));               
							 dt.Columns.Add(new DataColumn("cbt_ntipo", typeof (int)));               
							 dt.Columns.Add(new DataColumn("cbt_cletra", typeof (string)));               
							 dt.Columns.Add(new DataColumn("cbt_cprefijo", typeof (string)));               
							 dt.Columns.Add(new DataColumn("cbt_inumero", typeof (int)));               
							 dt.Columns.Add(new DataColumn("cbt_ncopias", typeof (int)));               
							 dt.Columns.Add(new DataColumn("cbt_casociado", typeof (string)));               
							 dt.Columns.Add(new DataColumn("cbt_nCbteCAE", typeof (int)));               
							 dt.Columns.Add(new DataColumn("cbt_idOrganizacionFacturadora", typeof (int)));               
							 										
               //create Row  
               dr = dt.NewRow();
               
               //set Row
							 dr["Id"] = base.Id;

							 dr["Name"] = base.Name;
dr["cbt_ccodigo"] = (object)this.cbt_ccodigo ?? System.DBNull.Value;
dr["cbt_cdescripcion"] = (object)this.cbt_cdescripcion ?? System.DBNull.Value;
dr["cbt_cdescripcionreducida"] = (object)this.cbt_cdescripcionreducida ?? System.DBNull.Value;
dr["cbt_ntipo"] = (object)this.cbt_ntipo ?? System.DBNull.Value;
dr["cbt_cletra"] = (object)this.cbt_cletra ?? System.DBNull.Value;
dr["cbt_cprefijo"] = (object)this.cbt_cprefijo ?? System.DBNull.Value;
dr["cbt_inumero"] = (object)this.cbt_inumero ?? System.DBNull.Value;
dr["cbt_ncopias"] = (object)this.cbt_ncopias ?? System.DBNull.Value;
dr["cbt_casociado"] = (object)this.cbt_casociado ?? System.DBNull.Value;
dr["cbt_nCbteCAE"] = (object)this.cbt_nCbteCAE ?? System.DBNull.Value;
dr["cbt_idOrganizacionFacturadora"] = (object)this.cbt_idOrganizacionFacturadora ?? System.DBNull.Value;
							 
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
