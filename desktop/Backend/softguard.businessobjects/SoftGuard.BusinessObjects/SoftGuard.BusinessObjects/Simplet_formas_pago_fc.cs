
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
    ///t_formas_pago_fc Slbf Class
    ///</summary>
    [DataContract]
    public class Simplet_formas_pago_fc : SimpleBaseObject
    { 
			 ///<summary>
     ///fpg_ccodigo   
     ///</summary>
	 [DataMember]
     public string fpg_ccodigo { get;set;} 
	  ///<summary>
     ///fpg_cdescripcion   
     ///</summary>
	 [DataMember]
     public string fpg_cdescripcion { get;set;} 
	  ///<summary>
     ///fpg_cdescripcionreducida   
     ///</summary>
	 [DataMember]
     public string fpg_cdescripcionreducida { get;set;} 
	  ///<summary>
     ///fpg_npidenumero   
     ///</summary>
	 [DataMember]
     public Decimal fpg_npidenumero { get;set;} 
	  ///<summary>
     ///fpg_npidevencimiento   
     ///</summary>
	 [DataMember]
     public Decimal fpg_npidevencimiento { get;set;} 
	  ///<summary>
     ///fpg_npidebanco   
     ///</summary>
	 [DataMember]
     public Decimal fpg_npidebanco { get;set;} 
	  ///<summary>
     ///fpg_ctipo   
     ///</summary>
	 [DataMember]
     public string fpg_ctipo { get;set;} 
	  ///<summary>
     ///fpg_mgmcidkey   
     ///</summary>
	 [DataMember]
     public int fpg_mgmcidkey { get;set;} 
	  ///<summary>
     ///fpg_orgidcodigoid   
     ///</summary>
	 [DataMember]
     public int fpg_orgidcodigoid { get;set;} 
	 ///<summary>
        ///t_formas_pago_fc Constructor
        ///</summary>
        public Simplet_formas_pago_fc() : base()
  {
  InitClass();
  }
        ///<summary>
        ///t_formas_pago_fc Constructor
        ///</summary>
        public Simplet_formas_pago_fc(int Id, string Name, string fpg_ccodigo, string fpg_cdescripcion, string fpg_cdescripcionreducida, Decimal fpg_npidenumero, Decimal fpg_npidevencimiento, Decimal fpg_npidebanco, string fpg_ctipo, int fpg_mgmcidkey, int fpg_orgidcodigoid) : base()
        {
            base.Id = Id;
						base.Name = Name;				 																																					 
				    this.fpg_ccodigo = fpg_ccodigo;
this.fpg_cdescripcion = fpg_cdescripcion;
this.fpg_cdescripcionreducida = fpg_cdescripcionreducida;
this.fpg_npidenumero = fpg_npidenumero;
this.fpg_npidevencimiento = fpg_npidevencimiento;
this.fpg_npidebanco = fpg_npidebanco;
this.fpg_ctipo = fpg_ctipo;
this.fpg_mgmcidkey = fpg_mgmcidkey;
this.fpg_orgidcodigoid = fpg_orgidcodigoid;

            InitClass();
        }  								

				private void InitClass()
        {														
  				  base.Type = new ObjectType(3144, "t_formas_pago_fc");
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
			BaseObject Object = new Dalt_formas_pago_fc(SqlConfig, UserId, this);
			if(this.CallerObject != null)
			   Object.CallerObject = this.CallerObject;			
			return Object;
		}
///<summary>
    ///Get parent object
    ///</summary>
		public override CallerObject GetCallerObject()
		{
			Callert_formas_pago_fc Caller = new Callert_formas_pago_fc();
			Caller.Id = base.Id;
			Caller.Name = base.Name;
			Caller.fpg_ccodigo = this.fpg_ccodigo;
Caller.fpg_cdescripcion = this.fpg_cdescripcion;
Caller.fpg_cdescripcionreducida = this.fpg_cdescripcionreducida;
Caller.fpg_npidenumero = this.fpg_npidenumero;
Caller.fpg_npidevencimiento = this.fpg_npidevencimiento;
Caller.fpg_npidebanco = this.fpg_npidebanco;
Caller.fpg_ctipo = this.fpg_ctipo;
Caller.fpg_mgmcidkey = this.fpg_mgmcidkey;
Caller.fpg_orgidcodigoid = this.fpg_orgidcodigoid;

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
               dt.Columns.Add(new DataColumn("fpg_ccodigo", typeof (string)));               
							 dt.Columns.Add(new DataColumn("fpg_cdescripcion", typeof (string)));               
							 dt.Columns.Add(new DataColumn("fpg_cdescripcionreducida", typeof (string)));               
							 dt.Columns.Add(new DataColumn("fpg_npidenumero", typeof (Decimal)));               
							 dt.Columns.Add(new DataColumn("fpg_npidevencimiento", typeof (Decimal)));               
							 dt.Columns.Add(new DataColumn("fpg_npidebanco", typeof (Decimal)));               
							 dt.Columns.Add(new DataColumn("fpg_ctipo", typeof (string)));               
							 dt.Columns.Add(new DataColumn("fpg_mgmcidkey", typeof (int)));               
							 dt.Columns.Add(new DataColumn("fpg_orgidcodigoid", typeof (int)));               
							 										
               //create Row  
               dr = dt.NewRow();
               
               //set Row
							 dr["Id"] = base.Id;

							 dr["Name"] = base.Name;
dr["fpg_ccodigo"] = (object)this.fpg_ccodigo ?? System.DBNull.Value;
dr["fpg_cdescripcion"] = (object)this.fpg_cdescripcion ?? System.DBNull.Value;
dr["fpg_cdescripcionreducida"] = (object)this.fpg_cdescripcionreducida ?? System.DBNull.Value;
dr["fpg_npidenumero"] = (object)this.fpg_npidenumero ?? System.DBNull.Value;
dr["fpg_npidevencimiento"] = (object)this.fpg_npidevencimiento ?? System.DBNull.Value;
dr["fpg_npidebanco"] = (object)this.fpg_npidebanco ?? System.DBNull.Value;
dr["fpg_ctipo"] = (object)this.fpg_ctipo ?? System.DBNull.Value;
dr["fpg_mgmcidkey"] = (object)this.fpg_mgmcidkey ?? System.DBNull.Value;
dr["fpg_orgidcodigoid"] = (object)this.fpg_orgidcodigoid ?? System.DBNull.Value;
							 
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
