
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
    ///T_AccesosTipoDocumento Slbf Class
    ///</summary>
    [DataContract]
    public class SimpleT_AccesosTipoDocumento : SimpleBaseObject
    { 
			 ///<summary>
     ///atd_cDescripcion   
     ///</summary>
	 [DataMember]
     public string atd_cDescripcion { get;set;} 
	  ///<summary>
     ///atd_iPideVto   
     ///</summary>
	 [DataMember]
     public int atd_iPideVto { get;set;} 
	  ///<summary>
     ///atd_iUploadFile   
     ///</summary>
	 [DataMember]
     public int atd_iUploadFile { get;set;} 
	 ///<summary>
        ///T_AccesosTipoDocumento Constructor
        ///</summary>
        public SimpleT_AccesosTipoDocumento() : base()
  {
  InitClass();
  }
        ///<summary>
        ///T_AccesosTipoDocumento Constructor
        ///</summary>
        public SimpleT_AccesosTipoDocumento(int Id, string Name, string atd_cDescripcion, int atd_iPideVto, int atd_iUploadFile) : base()
        {
            base.Id = Id;
						base.Name = Name;				 																																					 
				    this.atd_cDescripcion = atd_cDescripcion;
this.atd_iPideVto = atd_iPideVto;
this.atd_iUploadFile = atd_iUploadFile;

            InitClass();
        }  								

				private void InitClass()
        {														
  				  base.Type = new ObjectType(3226, "T_AccesosTipoDocumento");
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
			BaseObject Object = new DalT_AccesosTipoDocumento(SqlConfig, UserId, this);
			if(this.CallerObject != null)
			   Object.CallerObject = this.CallerObject;			
			return Object;
		}
///<summary>
    ///Get parent object
    ///</summary>
		public override CallerObject GetCallerObject()
		{
			CallerT_AccesosTipoDocumento Caller = new CallerT_AccesosTipoDocumento();
			Caller.Id = base.Id;
			Caller.Name = base.Name;
			Caller.atd_cDescripcion = this.atd_cDescripcion;
Caller.atd_iPideVto = this.atd_iPideVto;
Caller.atd_iUploadFile = this.atd_iUploadFile;

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
               dt.Columns.Add(new DataColumn("atd_cDescripcion", typeof (string)));               
							 dt.Columns.Add(new DataColumn("atd_iPideVto", typeof (int)));               
							 dt.Columns.Add(new DataColumn("atd_iUploadFile", typeof (int)));               
							 										
               //create Row  
               dr = dt.NewRow();
               
               //set Row
							 dr["Id"] = base.Id;

							 dr["Name"] = base.Name;
dr["atd_cDescripcion"] = (object)this.atd_cDescripcion ?? System.DBNull.Value;
dr["atd_iPideVto"] = (object)this.atd_iPideVto ?? System.DBNull.Value;
dr["atd_iUploadFile"] = (object)this.atd_iUploadFile ?? System.DBNull.Value;
							 
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
