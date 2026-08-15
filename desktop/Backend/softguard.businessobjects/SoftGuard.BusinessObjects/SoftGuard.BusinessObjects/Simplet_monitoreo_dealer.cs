
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
    ///t_monitoreo_dealer Slbf Class
    ///</summary>
    [DataContract]
    public class Simplet_monitoreo_dealer : SimpleBaseObject
    { 
			 ///<summary>
     ///tmd_clinea   
     ///</summary>
	 [DataMember]
     public string tmd_clinea { get;set;} 
	  ///<summary>
     ///tmd_diasemana   
     ///</summary>
	 [DataMember]
     public int tmd_diasemana { get;set;} 
	  ///<summary>
     ///tmd_horadesde   
     ///</summary>
	 [DataMember]
     public string tmd_horadesde { get;set;} 
	  ///<summary>
     ///tmd_horahasta   
     ///</summary>
	 [DataMember]
     public string tmd_horahasta { get;set;} 
	  ///<summary>
     ///tmd_estado   
     ///</summary>
	 [DataMember]
     public int tmd_estado { get;set;} 
	  ///<summary>
     ///tmd_iorganizacion   
     ///</summary>
	 [DataMember]
     public int tmd_iorganizacion { get;set;} 
	 ///<summary>
        ///t_monitoreo_dealer Constructor
        ///</summary>
        public Simplet_monitoreo_dealer() : base()
  {
  InitClass();
  }
        ///<summary>
        ///t_monitoreo_dealer Constructor
        ///</summary>
        public Simplet_monitoreo_dealer(int Id, string Name, string tmd_clinea, int tmd_diasemana, string tmd_horadesde, string tmd_horahasta, int tmd_estado, int tmd_iorganizacion) : base()
        {
            base.Id = Id;
						base.Name = Name;				 																																					 
				    this.tmd_clinea = tmd_clinea;
this.tmd_diasemana = tmd_diasemana;
this.tmd_horadesde = tmd_horadesde;
this.tmd_horahasta = tmd_horahasta;
this.tmd_estado = tmd_estado;
this.tmd_iorganizacion = tmd_iorganizacion;

            InitClass();
        }  								

				private void InitClass()
        {														
  				  base.Type = new ObjectType(3189, "t_monitoreo_dealer");
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
			BaseObject Object = new Dalt_monitoreo_dealer(SqlConfig, UserId, this);
			if(this.CallerObject != null)
			   Object.CallerObject = this.CallerObject;			
			return Object;
		}
///<summary>
    ///Get parent object
    ///</summary>
		public override CallerObject GetCallerObject()
		{
			Callert_monitoreo_dealer Caller = new Callert_monitoreo_dealer();
			Caller.Id = base.Id;
			Caller.Name = base.Name;
			Caller.tmd_clinea = this.tmd_clinea;
Caller.tmd_diasemana = this.tmd_diasemana;
Caller.tmd_horadesde = this.tmd_horadesde;
Caller.tmd_horahasta = this.tmd_horahasta;
Caller.tmd_estado = this.tmd_estado;
Caller.tmd_iorganizacion = this.tmd_iorganizacion;

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
               dt.Columns.Add(new DataColumn("tmd_clinea", typeof (string)));               
							 dt.Columns.Add(new DataColumn("tmd_diasemana", typeof (int)));               
							 dt.Columns.Add(new DataColumn("tmd_horadesde", typeof (string)));               
							 dt.Columns.Add(new DataColumn("tmd_horahasta", typeof (string)));               
							 dt.Columns.Add(new DataColumn("tmd_estado", typeof (int)));               
							 dt.Columns.Add(new DataColumn("tmd_iorganizacion", typeof (int)));               
							 										
               //create Row  
               dr = dt.NewRow();
               
               //set Row
							 dr["Id"] = base.Id;

							 dr["Name"] = base.Name;
dr["tmd_clinea"] = (object)this.tmd_clinea ?? System.DBNull.Value;
dr["tmd_diasemana"] = (object)this.tmd_diasemana ?? System.DBNull.Value;
dr["tmd_horadesde"] = (object)this.tmd_horadesde ?? System.DBNull.Value;
dr["tmd_horahasta"] = (object)this.tmd_horahasta ?? System.DBNull.Value;
dr["tmd_estado"] = (object)this.tmd_estado ?? System.DBNull.Value;
dr["tmd_iorganizacion"] = (object)this.tmd_iorganizacion ?? System.DBNull.Value;
							 
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
