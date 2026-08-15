
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
    ///t_stock_depositos Slbf Class
    ///</summary>
    [DataContract]
    public class Simplet_stock_depositos : SimpleBaseObject
    { 
			 ///<summary>
     ///tsd_idorganizacion   
     ///</summary>
	 [DataMember]
     public int tsd_idorganizacion { get;set;} 
	  ///<summary>
     ///tsd_idtecnico   
     ///</summary>
	 [DataMember]
     public int tsd_idtecnico { get;set;} 
	  ///<summary>
     ///tsd_estado   
     ///</summary>
	 [DataMember]
     public int tsd_estado { get;set;} 
	 ///<summary>
        ///t_stock_depositos Constructor
        ///</summary>
        public Simplet_stock_depositos() : base()
  {
  InitClass();
  }
        ///<summary>
        ///t_stock_depositos Constructor
        ///</summary>
        public Simplet_stock_depositos(int Id, string Name, int tsd_idorganizacion, int tsd_idtecnico, int tsd_estado) : base()
        {
            base.Id = Id;
						base.Name = Name;				 																																					 
				    this.tsd_idorganizacion = tsd_idorganizacion;
this.tsd_idtecnico = tsd_idtecnico;
this.tsd_estado = tsd_estado;

            InitClass();
        }  								

				private void InitClass()
        {														
  				  base.Type = new ObjectType(3140, "t_stock_depositos");
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
			BaseObject Object = new Dalt_stock_depositos(SqlConfig, UserId, this);
			if(this.CallerObject != null)
			   Object.CallerObject = this.CallerObject;			
			return Object;
		}
///<summary>
    ///Get parent object
    ///</summary>
		public override CallerObject GetCallerObject()
		{
			Callert_stock_depositos Caller = new Callert_stock_depositos();
			Caller.Id = base.Id;
			Caller.Name = base.Name;
			Caller.tsd_idorganizacion = this.tsd_idorganizacion;
Caller.tsd_idtecnico = this.tsd_idtecnico;
Caller.tsd_estado = this.tsd_estado;

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
               dt.Columns.Add(new DataColumn("tsd_idorganizacion", typeof (int)));               
							 dt.Columns.Add(new DataColumn("tsd_idtecnico", typeof (int)));               
							 dt.Columns.Add(new DataColumn("tsd_estado", typeof (int)));               
							 										
               //create Row  
               dr = dt.NewRow();
               
               //set Row
							 dr["Id"] = base.Id;

							 dr["Name"] = base.Name;
dr["tsd_idorganizacion"] = (object)this.tsd_idorganizacion ?? System.DBNull.Value;
dr["tsd_idtecnico"] = (object)this.tsd_idtecnico ?? System.DBNull.Value;
dr["tsd_estado"] = (object)this.tsd_estado ?? System.DBNull.Value;
							 
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
