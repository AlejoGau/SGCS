
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
    ///t_ControlEventosDealer Slbf Class
    ///</summary>
    [DataContract]
    public class Simplet_ControlEventosDealer : SimpleBaseObject
    { 
			 ///<summary>
     ///ced_cDealer   
     ///</summary>
	 [DataMember]
     public string ced_cDealer { get;set;} 
	  ///<summary>
     ///ced_cDescripcion   
     ///</summary>
	 [DataMember]
     public string ced_cDescripcion { get;set;} 
	  ///<summary>
     ///ced_cAlarmaControl   
     ///</summary>
	 [DataMember]
     public string ced_cAlarmaControl { get;set;} 
	  ///<summary>
     ///ced_cAlarmaEsperada   
     ///</summary>
	 [DataMember]
     public string ced_cAlarmaEsperada { get;set;} 
	  ///<summary>
     ///ced_iMinutos   
     ///</summary>
	 [DataMember]
     public int ced_iMinutos { get;set;} 
	  ///<summary>
     ///ced_cAlarmaGenerar   
     ///</summary>
	 [DataMember]
     public string ced_cAlarmaGenerar { get;set;} 
	 ///<summary>
        ///t_ControlEventosDealer Constructor
        ///</summary>
        public Simplet_ControlEventosDealer() : base()
  {
  InitClass();
  }
        ///<summary>
        ///t_ControlEventosDealer Constructor
        ///</summary>
        public Simplet_ControlEventosDealer(int Id, string Name, string ced_cDealer, string ced_cDescripcion, string ced_cAlarmaControl, string ced_cAlarmaEsperada, int ced_iMinutos, string ced_cAlarmaGenerar) : base()
        {
            base.Id = Id;
						base.Name = Name;				 																																					 
				    this.ced_cDealer = ced_cDealer;
this.ced_cDescripcion = ced_cDescripcion;
this.ced_cAlarmaControl = ced_cAlarmaControl;
this.ced_cAlarmaEsperada = ced_cAlarmaEsperada;
this.ced_iMinutos = ced_iMinutos;
this.ced_cAlarmaGenerar = ced_cAlarmaGenerar;

            InitClass();
        }  								

				private void InitClass()
        {														
  				  base.Type = new ObjectType(7052, "t_ControlEventosDealer");
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
			BaseObject Object = new Dalt_ControlEventosDealer(SqlConfig, UserId, this);
			if(this.CallerObject != null)
			   Object.CallerObject = this.CallerObject;			
			return Object;
		}
///<summary>
    ///Get parent object
    ///</summary>
		public override CallerObject GetCallerObject()
		{
			Callert_ControlEventosDealer Caller = new Callert_ControlEventosDealer();
			Caller.Id = base.Id;
			Caller.Name = base.Name;
			Caller.ced_cDealer = this.ced_cDealer;
Caller.ced_cDescripcion = this.ced_cDescripcion;
Caller.ced_cAlarmaControl = this.ced_cAlarmaControl;
Caller.ced_cAlarmaEsperada = this.ced_cAlarmaEsperada;
Caller.ced_iMinutos = this.ced_iMinutos;
Caller.ced_cAlarmaGenerar = this.ced_cAlarmaGenerar;

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
               dt.Columns.Add(new DataColumn("ced_cDealer", typeof (string)));               
							 dt.Columns.Add(new DataColumn("ced_cDescripcion", typeof (string)));               
							 dt.Columns.Add(new DataColumn("ced_cAlarmaControl", typeof (string)));               
							 dt.Columns.Add(new DataColumn("ced_cAlarmaEsperada", typeof (string)));               
							 dt.Columns.Add(new DataColumn("ced_iMinutos", typeof (int)));               
							 dt.Columns.Add(new DataColumn("ced_cAlarmaGenerar", typeof (string)));               
							 										
               //create Row  
               dr = dt.NewRow();
               
               //set Row
							 dr["Id"] = base.Id;

							 dr["Name"] = base.Name;
dr["ced_cDealer"] = (object)this.ced_cDealer ?? System.DBNull.Value;
dr["ced_cDescripcion"] = (object)this.ced_cDescripcion ?? System.DBNull.Value;
dr["ced_cAlarmaControl"] = (object)this.ced_cAlarmaControl ?? System.DBNull.Value;
dr["ced_cAlarmaEsperada"] = (object)this.ced_cAlarmaEsperada ?? System.DBNull.Value;
dr["ced_iMinutos"] = (object)this.ced_iMinutos ?? System.DBNull.Value;
dr["ced_cAlarmaGenerar"] = (object)this.ced_cAlarmaGenerar ?? System.DBNull.Value;
							 
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
