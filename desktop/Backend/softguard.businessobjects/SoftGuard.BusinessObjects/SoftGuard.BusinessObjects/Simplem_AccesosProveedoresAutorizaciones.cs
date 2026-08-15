
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
    ///m_AccesosProveedoresAutorizaciones Slbf Class
    ///</summary>
    [DataContract]
    public class Simplem_AccesosProveedoresAutorizaciones : SimpleBaseObject
    { 
			 ///<summary>
     ///apa_idKeyProveedor   
     ///</summary>
	 [DataMember]
     public int apa_idKeyProveedor { get;set;} 
	  ///<summary>
     ///apa_idKeyUF   
     ///</summary>
	 [DataMember]
     public int apa_idKeyUF { get;set;} 
	 ///<summary>
        ///m_AccesosProveedoresAutorizaciones Constructor
        ///</summary>
        public Simplem_AccesosProveedoresAutorizaciones() : base()
  {
  InitClass();
  }
        ///<summary>
        ///m_AccesosProveedoresAutorizaciones Constructor
        ///</summary>
        public Simplem_AccesosProveedoresAutorizaciones(int Id, string Name, int apa_idKeyProveedor, int apa_idKeyUF) : base()
        {
            base.Id = Id;
						base.Name = Name;				 																																					 
				    this.apa_idKeyProveedor = apa_idKeyProveedor;
this.apa_idKeyUF = apa_idKeyUF;

            InitClass();
        }  								

				private void InitClass()
        {														
  				  base.Type = new ObjectType(3229, "m_AccesosProveedoresAutorizaciones");
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
			BaseObject Object = new Dalm_AccesosProveedoresAutorizaciones(SqlConfig, UserId, this);
			if(this.CallerObject != null)
			   Object.CallerObject = this.CallerObject;			
			return Object;
		}
///<summary>
    ///Get parent object
    ///</summary>
		public override CallerObject GetCallerObject()
		{
			Callerm_AccesosProveedoresAutorizaciones Caller = new Callerm_AccesosProveedoresAutorizaciones();
			Caller.Id = base.Id;
			Caller.Name = base.Name;
			Caller.apa_idKeyProveedor = this.apa_idKeyProveedor;
Caller.apa_idKeyUF = this.apa_idKeyUF;

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
               dt.Columns.Add(new DataColumn("apa_idKeyProveedor", typeof (int)));               
							 dt.Columns.Add(new DataColumn("apa_idKeyUF", typeof (int)));               
							 										
               //create Row  
               dr = dt.NewRow();
               
               //set Row
							 dr["Id"] = base.Id;

							 dr["Name"] = base.Name;
dr["apa_idKeyProveedor"] = (object)this.apa_idKeyProveedor ?? System.DBNull.Value;
dr["apa_idKeyUF"] = (object)this.apa_idKeyUF ?? System.DBNull.Value;
							 
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
