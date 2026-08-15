
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
    ///t_listas_emergencia Slbf Class
    ///</summary>
    [DataContract]
    public class Simplet_listas_emergencia : SimpleBaseObject
    { 
			 ///<summary>
     ///lis_ccodigo   
     ///</summary>
	 [DataMember]
     public string lis_ccodigo { get;set;} 
	  ///<summary>
     ///lis_cdescripcion   
     ///</summary>
	 [DataMember]
     public string lis_cdescripcion { get;set;} 
	 ///<summary>
        ///t_listas_emergencia Constructor
        ///</summary>
        public Simplet_listas_emergencia() : base()
  {
  InitClass();
  }
        ///<summary>
        ///t_listas_emergencia Constructor
        ///</summary>
        public Simplet_listas_emergencia(int Id, string Name, string lis_ccodigo, string lis_cdescripcion) : base()
        {
            base.Id = Id;
						base.Name = Name;				 																																					 
				    this.lis_ccodigo = lis_ccodigo;
this.lis_cdescripcion = lis_cdescripcion;

            InitClass();
        }  								

				private void InitClass()
        {														
  				  base.Type = new ObjectType(3071, "t_listas_emergencia");
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
			BaseObject Object = new Dalt_listas_emergencia(SqlConfig, UserId, this);
			if(this.CallerObject != null)
			   Object.CallerObject = this.CallerObject;			
			return Object;
		}
///<summary>
    ///Get parent object
    ///</summary>
		public override CallerObject GetCallerObject()
		{
			Callert_listas_emergencia Caller = new Callert_listas_emergencia();
			Caller.Id = base.Id;
			Caller.Name = base.Name;
			Caller.lis_ccodigo = this.lis_ccodigo;
Caller.lis_cdescripcion = this.lis_cdescripcion;

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
               dt.Columns.Add(new DataColumn("lis_ccodigo", typeof (string)));               
							 dt.Columns.Add(new DataColumn("lis_cdescripcion", typeof (string)));               
							 										
               //create Row  
               dr = dt.NewRow();
               
               //set Row
							 dr["Id"] = base.Id;

							 dr["Name"] = base.Name;
dr["lis_ccodigo"] = (object)this.lis_ccodigo ?? System.DBNull.Value;
dr["lis_cdescripcion"] = (object)this.lis_cdescripcion ?? System.DBNull.Value;
							 
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
