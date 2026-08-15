
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
    ///VisitasIngresosEgresos Slbf Class
    ///</summary>
    [DataContract]
    public class SimpleVisitasIngresosEgresos : SimpleBaseObject
    { 
			 ///<summary>
     ///vie_tFechaHora   
     ///</summary>
	 [DataMember]
     public DateTime? vie_tFechaHora { get;set;} 
	  ///<summary>
     ///vie_cMatricula   
     ///</summary>
	 [DataMember]
     public string vie_cMatricula { get;set;} 
	  ///<summary>
     ///vie_cUnidadFuncional   
     ///</summary>
	 [DataMember]
     public string vie_cUnidadFuncional { get;set;} 
	 ///<summary>
        ///VisitasIngresosEgresos Constructor
        ///</summary>
        public SimpleVisitasIngresosEgresos() : base()
  {
  InitClass();
  }
        ///<summary>
        ///VisitasIngresosEgresos Constructor
        ///</summary>
        public SimpleVisitasIngresosEgresos(int Id, string Name, DateTime? vie_tFechaHora, string vie_cMatricula, string vie_cUnidadFuncional) : base()
        {
            base.Id = Id;
						base.Name = Name;				 																																					 
				    this.vie_tFechaHora = vie_tFechaHora;
this.vie_cMatricula = vie_cMatricula;
this.vie_cUnidadFuncional = vie_cUnidadFuncional;

            InitClass();
        }  								

				private void InitClass()
        {														
  				  base.Type = new ObjectType(7036, "VisitasIngresosEgresos");
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
			BaseObject Object = new DalVisitasIngresosEgresos(SqlConfig, UserId, this);
			if(this.CallerObject != null)
			   Object.CallerObject = this.CallerObject;			
			return Object;
		}
///<summary>
    ///Get parent object
    ///</summary>
		public override CallerObject GetCallerObject()
		{
			CallerVisitasIngresosEgresos Caller = new CallerVisitasIngresosEgresos();
			Caller.Id = base.Id;
			Caller.Name = base.Name;
			Caller.vie_tFechaHora = this.vie_tFechaHora;
Caller.vie_cMatricula = this.vie_cMatricula;
Caller.vie_cUnidadFuncional = this.vie_cUnidadFuncional;

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
               dt.Columns.Add(new DataColumn("vie_tFechaHora", typeof (DateTime)));               
							 dt.Columns.Add(new DataColumn("vie_cMatricula", typeof (string)));               
							 dt.Columns.Add(new DataColumn("vie_cUnidadFuncional", typeof (string)));               
							 										
               //create Row  
               dr = dt.NewRow();
               
               //set Row
							 dr["Id"] = base.Id;

							 dr["Name"] = base.Name;
dr["vie_tFechaHora"] = (object)this.vie_tFechaHora ?? System.DBNull.Value;
dr["vie_cMatricula"] = (object)this.vie_cMatricula ?? System.DBNull.Value;
dr["vie_cUnidadFuncional"] = (object)this.vie_cUnidadFuncional ?? System.DBNull.Value;
							 
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
