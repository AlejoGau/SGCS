
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
    ///TG_mantenimiento_historico Slbf Class
    ///</summary>
    [DataContract]
    public class SimpleTG_mantenimiento_historico : SimpleBaseObject
    { 
			 ///<summary>
     ///tgmh_idservicio   
     ///</summary>
	 [DataMember]
     public int tgmh_idservicio { get;set;} 
	  ///<summary>
     ///tgmh_cdescripcion   
     ///</summary>
	 [DataMember]
     public string tgmh_cdescripcion { get;set;} 
	  ///<summary>
     ///tgmh_iodometro   
     ///</summary>
	 [DataMember]
     public int tgmh_iodometro { get;set;} 
	  ///<summary>
     ///tgmh_idispositivomovil   
     ///</summary>
	 [DataMember]
     public int tgmh_idispositivomovil { get;set;} 
	  ///<summary>
     ///tgmh_dfecha   
     ///</summary>
	 [DataMember]
     public DateTime? tgmh_dfecha { get;set;} 
	 ///<summary>
        ///TG_mantenimiento_historico Constructor
        ///</summary>
        public SimpleTG_mantenimiento_historico() : base()
  {
  InitClass();
  }
        ///<summary>
        ///TG_mantenimiento_historico Constructor
        ///</summary>
        public SimpleTG_mantenimiento_historico(int Id, string Name, int tgmh_idservicio, string tgmh_cdescripcion, int tgmh_iodometro, int tgmh_idispositivomovil, DateTime? tgmh_dfecha) : base()
        {
            base.Id = Id;
						base.Name = Name;				 																																					 
				    this.tgmh_idservicio = tgmh_idservicio;
this.tgmh_cdescripcion = tgmh_cdescripcion;
this.tgmh_iodometro = tgmh_iodometro;
this.tgmh_idispositivomovil = tgmh_idispositivomovil;
this.tgmh_dfecha = tgmh_dfecha;

            InitClass();
        }  								

				private void InitClass()
        {														
  				  base.Type = new ObjectType(3188, "TG_mantenimiento_historico");
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
			BaseObject Object = new DalTG_mantenimiento_historico(SqlConfig, UserId, this);
			if(this.CallerObject != null)
			   Object.CallerObject = this.CallerObject;			
			return Object;
		}
///<summary>
    ///Get parent object
    ///</summary>
		public override CallerObject GetCallerObject()
		{
			CallerTG_mantenimiento_historico Caller = new CallerTG_mantenimiento_historico();
			Caller.Id = base.Id;
			Caller.Name = base.Name;
			Caller.tgmh_idservicio = this.tgmh_idservicio;
Caller.tgmh_cdescripcion = this.tgmh_cdescripcion;
Caller.tgmh_iodometro = this.tgmh_iodometro;
Caller.tgmh_idispositivomovil = this.tgmh_idispositivomovil;
Caller.tgmh_dfecha = this.tgmh_dfecha;

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
               dt.Columns.Add(new DataColumn("tgmh_idservicio", typeof (int)));               
							 dt.Columns.Add(new DataColumn("tgmh_cdescripcion", typeof (string)));               
							 dt.Columns.Add(new DataColumn("tgmh_iodometro", typeof (int)));               
							 dt.Columns.Add(new DataColumn("tgmh_idispositivomovil", typeof (int)));               
							 dt.Columns.Add(new DataColumn("tgmh_dfecha", typeof (DateTime)));               
							 										
               //create Row  
               dr = dt.NewRow();
               
               //set Row
							 dr["Id"] = base.Id;

							 dr["Name"] = base.Name;
dr["tgmh_idservicio"] = (object)this.tgmh_idservicio ?? System.DBNull.Value;
dr["tgmh_cdescripcion"] = (object)this.tgmh_cdescripcion ?? System.DBNull.Value;
dr["tgmh_iodometro"] = (object)this.tgmh_iodometro ?? System.DBNull.Value;
dr["tgmh_idispositivomovil"] = (object)this.tgmh_idispositivomovil ?? System.DBNull.Value;
dr["tgmh_dfecha"] = (object)this.tgmh_dfecha ?? System.DBNull.Value;
							 
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
