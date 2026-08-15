
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
    ///Estado Slbf Class
    ///</summary>
    [DataContract]
    public class SimpleEstado : SimpleBaseObject
    { 
			 ///<summary>
     ///est_nestado   
     ///</summary>
	 [DataMember]
     public Decimal est_nestado { get;set;} 
	  ///<summary>
     ///est_ntipo   
     ///</summary>
	 [DataMember]
     public Decimal est_ntipo { get;set;} 
	  ///<summary>
     ///est_dfechadesde   
     ///</summary>
	 [DataMember]
     public DateTime? est_dfechadesde { get;set;} 
	  ///<summary>
     ///est_nduracion   
     ///</summary>
	 [DataMember]
     public Decimal est_nduracion { get;set;} 
	  ///<summary>
     ///est_dfechahasta   
     ///</summary>
	 [DataMember]
     public DateTime? est_dfechahasta { get;set;} 
	  ///<summary>
     ///est_mnota   
     ///</summary>
	 [DataMember]
     public string est_mnota { get;set;} 
	  ///<summary>
     ///token   
     ///</summary>
	 [DataMember]
     public string token { get;set;} 
	 ///<summary>
        ///Estado Constructor
        ///</summary>
        public SimpleEstado() : base()
  {
  InitClass();
  }
        ///<summary>
        ///Estado Constructor
        ///</summary>
        public SimpleEstado(int Id, string Name, Decimal est_nestado, Decimal est_ntipo, DateTime? est_dfechadesde, Decimal est_nduracion, DateTime? est_dfechahasta, string est_mnota, string token) : base()
        {
            base.Id = Id;
						base.Name = Name;				 																																					 
				    this.est_nestado = est_nestado;
this.est_ntipo = est_ntipo;
this.est_dfechadesde = est_dfechadesde;
this.est_nduracion = est_nduracion;
this.est_dfechahasta = est_dfechahasta;
this.est_mnota = est_mnota;
this.token = token;

            InitClass();
        }  								

				private void InitClass()
        {														
  				  base.Type = new ObjectType(3033, "Estado");
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
			BaseObject Object = new DalEstado(SqlConfig, UserId, this);
			if(this.CallerObject != null)
			   Object.CallerObject = this.CallerObject;			
			return Object;
		}
///<summary>
    ///Get parent object
    ///</summary>
		public override CallerObject GetCallerObject()
		{
			CallerEstado Caller = new CallerEstado();
			Caller.Id = base.Id;
			Caller.Name = base.Name;
			Caller.est_nestado = this.est_nestado;
Caller.est_ntipo = this.est_ntipo;
Caller.est_dfechadesde = this.est_dfechadesde;
Caller.est_nduracion = this.est_nduracion;
Caller.est_dfechahasta = this.est_dfechahasta;
Caller.est_mnota = this.est_mnota;
Caller.token = this.token;

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
               dt.Columns.Add(new DataColumn("est_nestado", typeof (Decimal)));               
							 dt.Columns.Add(new DataColumn("est_ntipo", typeof (Decimal)));               
							 dt.Columns.Add(new DataColumn("est_dfechadesde", typeof (DateTime)));               
							 dt.Columns.Add(new DataColumn("est_nduracion", typeof (Decimal)));               
							 dt.Columns.Add(new DataColumn("est_dfechahasta", typeof (DateTime)));               
							 dt.Columns.Add(new DataColumn("est_mnota", typeof (string)));               
							 dt.Columns.Add(new DataColumn("token", typeof (string)));               
							 										
               //create Row  
               dr = dt.NewRow();
               
               //set Row
							 dr["Id"] = base.Id;

							 dr["Name"] = base.Name;
dr["est_nestado"] = (object)this.est_nestado ?? System.DBNull.Value;
dr["est_ntipo"] = (object)this.est_ntipo ?? System.DBNull.Value;
dr["est_dfechadesde"] = (object)this.est_dfechadesde ?? System.DBNull.Value;
dr["est_nduracion"] = (object)this.est_nduracion ?? System.DBNull.Value;
dr["est_dfechahasta"] = (object)this.est_dfechahasta ?? System.DBNull.Value;
dr["est_mnota"] = (object)this.est_mnota ?? System.DBNull.Value;
dr["token"] = (object)this.token ?? System.DBNull.Value;
							 
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
