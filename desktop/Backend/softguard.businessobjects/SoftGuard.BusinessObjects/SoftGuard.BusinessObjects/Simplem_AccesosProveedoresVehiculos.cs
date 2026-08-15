
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
    ///m_AccesosProveedoresVehiculos Slbf Class
    ///</summary>
    [DataContract]
    public class Simplem_AccesosProveedoresVehiculos : SimpleBaseObject
    { 
			 ///<summary>
     ///apv_idKeyProveedor   
     ///</summary>
	 [DataMember]
     public int apv_idKeyProveedor { get;set;} 
	  ///<summary>
     ///apv_idKeyVehiculo   
     ///</summary>
	 [DataMember]
     public int apv_idKeyVehiculo { get;set;} 
	 ///<summary>
        ///m_AccesosProveedoresVehiculos Constructor
        ///</summary>
        public Simplem_AccesosProveedoresVehiculos() : base()
  {
  InitClass();
  }
        ///<summary>
        ///m_AccesosProveedoresVehiculos Constructor
        ///</summary>
        public Simplem_AccesosProveedoresVehiculos(int Id, string Name, int apv_idKeyProveedor, int apv_idKeyVehiculo) : base()
        {
            base.Id = Id;
						base.Name = Name;				 																																					 
				    this.apv_idKeyProveedor = apv_idKeyProveedor;
this.apv_idKeyVehiculo = apv_idKeyVehiculo;

            InitClass();
        }  								

				private void InitClass()
        {														
  				  base.Type = new ObjectType(3230, "m_AccesosProveedoresVehiculos");
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
			BaseObject Object = new Dalm_AccesosProveedoresVehiculos(SqlConfig, UserId, this);
			if(this.CallerObject != null)
			   Object.CallerObject = this.CallerObject;			
			return Object;
		}
///<summary>
    ///Get parent object
    ///</summary>
		public override CallerObject GetCallerObject()
		{
			Callerm_AccesosProveedoresVehiculos Caller = new Callerm_AccesosProveedoresVehiculos();
			Caller.Id = base.Id;
			Caller.Name = base.Name;
			Caller.apv_idKeyProveedor = this.apv_idKeyProveedor;
Caller.apv_idKeyVehiculo = this.apv_idKeyVehiculo;

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
               dt.Columns.Add(new DataColumn("apv_idKeyProveedor", typeof (int)));               
							 dt.Columns.Add(new DataColumn("apv_idKeyVehiculo", typeof (int)));               
							 										
               //create Row  
               dr = dt.NewRow();
               
               //set Row
							 dr["Id"] = base.Id;

							 dr["Name"] = base.Name;
dr["apv_idKeyProveedor"] = (object)this.apv_idKeyProveedor ?? System.DBNull.Value;
dr["apv_idKeyVehiculo"] = (object)this.apv_idKeyVehiculo ?? System.DBNull.Value;
							 
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
