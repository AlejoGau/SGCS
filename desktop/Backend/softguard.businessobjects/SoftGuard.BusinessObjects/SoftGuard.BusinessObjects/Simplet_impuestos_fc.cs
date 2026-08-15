
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
    ///t_impuestos_fc Slbf Class
    ///</summary>
    [DataContract]
    public class Simplet_impuestos_fc : SimpleBaseObject
    { 
			 ///<summary>
     ///imp_ccodigo   
     ///</summary>
	 [DataMember]
     public string imp_ccodigo { get;set;} 
	  ///<summary>
     ///imp_cdescripcion   
     ///</summary>
	 [DataMember]
     public string imp_cdescripcion { get;set;} 
	  ///<summary>
     ///imp_nporcentaje   
     ///</summary>
	 [DataMember]
     public Decimal imp_nporcentaje { get;set;} 
	  ///<summary>
     ///imp_extcode   
     ///</summary>
	 [DataMember]
     public string imp_extcode { get;set;} 
	  ///<summary>
     ///imp_idorganizacion   
     ///</summary>
	 [DataMember]
     public int imp_idorganizacion { get;set;} 
	  ///<summary>
     ///imp_mgmcidkey   
     ///</summary>
	 [DataMember]
     public int imp_mgmcidkey { get;set;} 
	 ///<summary>
        ///t_impuestos_fc Constructor
        ///</summary>
        public Simplet_impuestos_fc() : base()
  {
  InitClass();
  }
        ///<summary>
        ///t_impuestos_fc Constructor
        ///</summary>
        public Simplet_impuestos_fc(int Id, string Name, string imp_ccodigo, string imp_cdescripcion, Decimal imp_nporcentaje, string imp_extcode, int imp_idorganizacion, int imp_mgmcidkey) : base()
        {
            base.Id = Id;
						base.Name = Name;				 																																					 
				    this.imp_ccodigo = imp_ccodigo;
this.imp_cdescripcion = imp_cdescripcion;
this.imp_nporcentaje = imp_nporcentaje;
this.imp_extcode = imp_extcode;
this.imp_idorganizacion = imp_idorganizacion;
this.imp_mgmcidkey = imp_mgmcidkey;

            InitClass();
        }  								

				private void InitClass()
        {														
  				  base.Type = new ObjectType(3192, "t_impuestos_fc");
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
			BaseObject Object = new Dalt_impuestos_fc(SqlConfig, UserId, this);
			if(this.CallerObject != null)
			   Object.CallerObject = this.CallerObject;			
			return Object;
		}
///<summary>
    ///Get parent object
    ///</summary>
		public override CallerObject GetCallerObject()
		{
			Callert_impuestos_fc Caller = new Callert_impuestos_fc();
			Caller.Id = base.Id;
			Caller.Name = base.Name;
			Caller.imp_ccodigo = this.imp_ccodigo;
Caller.imp_cdescripcion = this.imp_cdescripcion;
Caller.imp_nporcentaje = this.imp_nporcentaje;
Caller.imp_extcode = this.imp_extcode;
Caller.imp_idorganizacion = this.imp_idorganizacion;
Caller.imp_mgmcidkey = this.imp_mgmcidkey;

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
               dt.Columns.Add(new DataColumn("imp_ccodigo", typeof (string)));               
							 dt.Columns.Add(new DataColumn("imp_cdescripcion", typeof (string)));               
							 dt.Columns.Add(new DataColumn("imp_nporcentaje", typeof (Decimal)));               
							 dt.Columns.Add(new DataColumn("imp_extcode", typeof (string)));               
							 dt.Columns.Add(new DataColumn("imp_idorganizacion", typeof (int)));               
							 dt.Columns.Add(new DataColumn("imp_mgmcidkey", typeof (int)));               
							 										
               //create Row  
               dr = dt.NewRow();
               
               //set Row
							 dr["Id"] = base.Id;

							 dr["Name"] = base.Name;
dr["imp_ccodigo"] = (object)this.imp_ccodigo ?? System.DBNull.Value;
dr["imp_cdescripcion"] = (object)this.imp_cdescripcion ?? System.DBNull.Value;
dr["imp_nporcentaje"] = (object)this.imp_nporcentaje ?? System.DBNull.Value;
dr["imp_extcode"] = (object)this.imp_extcode ?? System.DBNull.Value;
dr["imp_idorganizacion"] = (object)this.imp_idorganizacion ?? System.DBNull.Value;
dr["imp_mgmcidkey"] = (object)this.imp_mgmcidkey ?? System.DBNull.Value;
							 
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
