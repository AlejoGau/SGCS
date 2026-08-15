
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
    ///m_AccesosProveedoresDocumentos Slbf Class
    ///</summary>
    [DataContract]
    public class Simplem_AccesosProveedoresDocumentos : SimpleBaseObject
    { 
			 ///<summary>
     ///apd_idKeyProveedor   
     ///</summary>
	 [DataMember]
     public int apd_idKeyProveedor { get;set;} 
	  ///<summary>
     ///apd_idKeyTipoDoc   
     ///</summary>
	 [DataMember]
     public int apd_idKeyTipoDoc { get;set;} 
	  ///<summary>
     ///apd_cDescripcion    
     ///</summary>
	 [DataMember]
     public string apd_cDescripcion  { get;set;} 
	  ///<summary>
     ///apd_tFechaVto   
     ///</summary>
	 [DataMember]
     public DateTime? apd_tFechaVto { get;set;} 
	  ///<summary>
     ///apd_cPathFile   
     ///</summary>
	 [DataMember]
     public string apd_cPathFile { get;set;} 
	 ///<summary>
        ///m_AccesosProveedoresDocumentos Constructor
        ///</summary>
        public Simplem_AccesosProveedoresDocumentos() : base()
  {
  InitClass();
  }
        ///<summary>
        ///m_AccesosProveedoresDocumentos Constructor
        ///</summary>
        public Simplem_AccesosProveedoresDocumentos(int Id, string Name, int apd_idKeyProveedor, int apd_idKeyTipoDoc, string apd_cDescripcion , DateTime? apd_tFechaVto, string apd_cPathFile) : base()
        {
            base.Id = Id;
						base.Name = Name;				 																																					 
				    this.apd_idKeyProveedor = apd_idKeyProveedor;
this.apd_idKeyTipoDoc = apd_idKeyTipoDoc;
this.apd_cDescripcion  = apd_cDescripcion ;
this.apd_tFechaVto = apd_tFechaVto;
this.apd_cPathFile = apd_cPathFile;

            InitClass();
        }  								

				private void InitClass()
        {														
  				  base.Type = new ObjectType(3228, "m_AccesosProveedoresDocumentos");
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
			BaseObject Object = new Dalm_AccesosProveedoresDocumentos(SqlConfig, UserId, this);
			if(this.CallerObject != null)
			   Object.CallerObject = this.CallerObject;			
			return Object;
		}
///<summary>
    ///Get parent object
    ///</summary>
		public override CallerObject GetCallerObject()
		{
			Callerm_AccesosProveedoresDocumentos Caller = new Callerm_AccesosProveedoresDocumentos();
			Caller.Id = base.Id;
			Caller.Name = base.Name;
			Caller.apd_idKeyProveedor = this.apd_idKeyProveedor;
Caller.apd_idKeyTipoDoc = this.apd_idKeyTipoDoc;
Caller.apd_cDescripcion  = this.apd_cDescripcion ;
Caller.apd_tFechaVto = this.apd_tFechaVto;
Caller.apd_cPathFile = this.apd_cPathFile;

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
               dt.Columns.Add(new DataColumn("apd_idKeyProveedor", typeof (int)));               
							 dt.Columns.Add(new DataColumn("apd_idKeyTipoDoc", typeof (int)));               
							 dt.Columns.Add(new DataColumn("apd_cDescripcion ", typeof (string)));               
							 dt.Columns.Add(new DataColumn("apd_tFechaVto", typeof (DateTime)));               
							 dt.Columns.Add(new DataColumn("apd_cPathFile", typeof (string)));               
							 										
               //create Row  
               dr = dt.NewRow();
               
               //set Row
							 dr["Id"] = base.Id;

							 dr["Name"] = base.Name;
dr["apd_idKeyProveedor"] = (object)this.apd_idKeyProveedor ?? System.DBNull.Value;
dr["apd_idKeyTipoDoc"] = (object)this.apd_idKeyTipoDoc ?? System.DBNull.Value;
dr["apd_cDescripcion "] = (object)this.apd_cDescripcion  ?? System.DBNull.Value;
dr["apd_tFechaVto"] = (object)this.apd_tFechaVto ?? System.DBNull.Value;
dr["apd_cPathFile"] = (object)this.apd_cPathFile ?? System.DBNull.Value;
							 
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
