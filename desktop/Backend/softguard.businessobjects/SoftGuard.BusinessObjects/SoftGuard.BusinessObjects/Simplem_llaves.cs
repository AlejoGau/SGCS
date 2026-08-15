
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
    ///m_llaves Slbf Class
    ///</summary>
    [DataContract]
    public class Simplem_llaves : SimpleBaseObject
    { 
			 ///<summary>
     ///lla_cdescripcion   
     ///</summary>
	 [DataMember]
     public string lla_cdescripcion { get;set;} 
	  ///<summary>
     ///lla_cnumero   
     ///</summary>
	 [DataMember]
     public string lla_cnumero { get;set;} 
	  ///<summary>
     ///lla_cubicacion   
     ///</summary>
	 [DataMember]
     public string lla_cubicacion { get;set;} 
	  ///<summary>
     ///lla_responsable   
     ///</summary>
	 [DataMember]
     public string lla_responsable { get;set;} 
	  ///<summary>
     ///lla_iidcuenta   
     ///</summary>
	 [DataMember]
     public int lla_iidcuenta { get;set;} 
	 ///<summary>
        ///m_llaves Constructor
        ///</summary>
        public Simplem_llaves() : base()
  {
  InitClass();
  }
        ///<summary>
        ///m_llaves Constructor
        ///</summary>
        public Simplem_llaves(int Id, string Name, string lla_cdescripcion, string lla_cnumero, string lla_cubicacion, string lla_responsable, int lla_iidcuenta) : base()
        {
            base.Id = Id;
						base.Name = Name;				 																																					 
				    this.lla_cdescripcion = lla_cdescripcion;
this.lla_cnumero = lla_cnumero;
this.lla_cubicacion = lla_cubicacion;
this.lla_responsable = lla_responsable;
this.lla_iidcuenta = lla_iidcuenta;

            InitClass();
        }  								

				private void InitClass()
        {														
  				  base.Type = new ObjectType(3217, "m_llaves");
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
			BaseObject Object = new Dalm_llaves(SqlConfig, UserId, this);
			if(this.CallerObject != null)
			   Object.CallerObject = this.CallerObject;			
			return Object;
		}
///<summary>
    ///Get parent object
    ///</summary>
		public override CallerObject GetCallerObject()
		{
			Callerm_llaves Caller = new Callerm_llaves();
			Caller.Id = base.Id;
			Caller.Name = base.Name;
			Caller.lla_cdescripcion = this.lla_cdescripcion;
Caller.lla_cnumero = this.lla_cnumero;
Caller.lla_cubicacion = this.lla_cubicacion;
Caller.lla_responsable = this.lla_responsable;
Caller.lla_iidcuenta = this.lla_iidcuenta;

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
               dt.Columns.Add(new DataColumn("lla_cdescripcion", typeof (string)));               
							 dt.Columns.Add(new DataColumn("lla_cnumero", typeof (string)));               
							 dt.Columns.Add(new DataColumn("lla_cubicacion", typeof (string)));               
							 dt.Columns.Add(new DataColumn("lla_responsable", typeof (string)));               
							 dt.Columns.Add(new DataColumn("lla_iidcuenta", typeof (int)));               
							 										
               //create Row  
               dr = dt.NewRow();
               
               //set Row
							 dr["Id"] = base.Id;

							 dr["Name"] = base.Name;
dr["lla_cdescripcion"] = (object)this.lla_cdescripcion ?? System.DBNull.Value;
dr["lla_cnumero"] = (object)this.lla_cnumero ?? System.DBNull.Value;
dr["lla_cubicacion"] = (object)this.lla_cubicacion ?? System.DBNull.Value;
dr["lla_responsable"] = (object)this.lla_responsable ?? System.DBNull.Value;
dr["lla_iidcuenta"] = (object)this.lla_iidcuenta ?? System.DBNull.Value;
							 
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
