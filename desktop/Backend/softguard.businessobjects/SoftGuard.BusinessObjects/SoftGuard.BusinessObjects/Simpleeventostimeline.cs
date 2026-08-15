
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
    ///eventostimeline Slbf Class
    ///</summary>
    [DataContract]
    public class Simpleeventostimeline : SimpleBaseObject
    { 
			 ///<summary>
     ///etl_irecid   
     ///</summary>
	 [DataMember]
     public int etl_irecid { get;set;} 
	  ///<summary>
     ///etl_icuenta   
     ///</summary>
	 [DataMember]
     public int etl_icuenta { get;set;} 
	  ///<summary>
     ///etl_tfechahora   
     ///</summary>
	 [DataMember]
     public DateTime? etl_tfechahora { get;set;} 
	  ///<summary>
     ///etl_caccion   
     ///</summary>
	 [DataMember]
     public string etl_caccion { get;set;} 
	  ///<summary>
     ///etl_cobservacion   
     ///</summary>
	 [DataMember]
     public string etl_cobservacion { get;set;} 
	  ///<summary>
     ///etl_cowner   
     ///</summary>
	 [DataMember]
     public string etl_cowner { get;set;} 
	  ///<summary>
     ///etl_ioperador   
     ///</summary>
	 [DataMember]
     public int etl_ioperador { get;set;} 
	  ///<summary>
     ///etl_iaccioncode    
     ///</summary>
	 [DataMember]
     public int etl_iaccioncode  { get;set;} 
	 ///<summary>
        ///eventostimeline Constructor
        ///</summary>
        public Simpleeventostimeline() : base()
  {
  InitClass();
  }
        ///<summary>
        ///eventostimeline Constructor
        ///</summary>
        public Simpleeventostimeline(int Id, string Name, int etl_irecid, int etl_icuenta, DateTime? etl_tfechahora, string etl_caccion, string etl_cobservacion, string etl_cowner, int etl_ioperador, int etl_iaccioncode ) : base()
        {
            base.Id = Id;
						base.Name = Name;				 																																					 
				    this.etl_irecid = etl_irecid;
this.etl_icuenta = etl_icuenta;
this.etl_tfechahora = etl_tfechahora;
this.etl_caccion = etl_caccion;
this.etl_cobservacion = etl_cobservacion;
this.etl_cowner = etl_cowner;
this.etl_ioperador = etl_ioperador;
this.etl_iaccioncode  = etl_iaccioncode ;

            InitClass();
        }  								

				private void InitClass()
        {														
  				  base.Type = new ObjectType(3131, "eventostimeline");
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
			BaseObject Object = new Daleventostimeline(SqlConfig, UserId, this);
			if(this.CallerObject != null)
			   Object.CallerObject = this.CallerObject;			
			return Object;
		}
///<summary>
    ///Get parent object
    ///</summary>
		public override CallerObject GetCallerObject()
		{
			Callereventostimeline Caller = new Callereventostimeline();
			Caller.Id = base.Id;
			Caller.Name = base.Name;
			Caller.etl_irecid = this.etl_irecid;
Caller.etl_icuenta = this.etl_icuenta;
Caller.etl_tfechahora = this.etl_tfechahora;
Caller.etl_caccion = this.etl_caccion;
Caller.etl_cobservacion = this.etl_cobservacion;
Caller.etl_cowner = this.etl_cowner;
Caller.etl_ioperador = this.etl_ioperador;
Caller.etl_iaccioncode  = this.etl_iaccioncode ;

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
               dt.Columns.Add(new DataColumn("etl_irecid", typeof (int)));               
							 dt.Columns.Add(new DataColumn("etl_icuenta", typeof (int)));               
							 dt.Columns.Add(new DataColumn("etl_tfechahora", typeof (DateTime)));               
							 dt.Columns.Add(new DataColumn("etl_caccion", typeof (string)));               
							 dt.Columns.Add(new DataColumn("etl_cobservacion", typeof (string)));               
							 dt.Columns.Add(new DataColumn("etl_cowner", typeof (string)));               
							 dt.Columns.Add(new DataColumn("etl_ioperador", typeof (int)));               
							 dt.Columns.Add(new DataColumn("etl_iaccioncode ", typeof (int)));               
							 										
               //create Row  
               dr = dt.NewRow();
               
               //set Row
							 dr["Id"] = base.Id;

							 dr["Name"] = base.Name;
dr["etl_irecid"] = (object)this.etl_irecid ?? System.DBNull.Value;
dr["etl_icuenta"] = (object)this.etl_icuenta ?? System.DBNull.Value;
dr["etl_tfechahora"] = (object)this.etl_tfechahora ?? System.DBNull.Value;
dr["etl_caccion"] = (object)this.etl_caccion ?? System.DBNull.Value;
dr["etl_cobservacion"] = (object)this.etl_cobservacion ?? System.DBNull.Value;
dr["etl_cowner"] = (object)this.etl_cowner ?? System.DBNull.Value;
dr["etl_ioperador"] = (object)this.etl_ioperador ?? System.DBNull.Value;
dr["etl_iaccioncode "] = (object)this.etl_iaccioncode  ?? System.DBNull.Value;
							 
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
