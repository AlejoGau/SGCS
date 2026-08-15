
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
    ///m_CuentasConn Slbf Class
    ///</summary>
    [DataContract]
    public class Simplem_CuentasConn : SimpleBaseObject
    { 
			 ///<summary>
     ///cco_iidCuenta   
     ///</summary>
	 [DataMember]
     public int cco_iidCuenta { get;set;} 
	  ///<summary>
     ///cco_iConexion   
     ///</summary>
	 [DataMember]
     public int cco_iConexion { get;set;} 
	 ///<summary>
        ///m_CuentasConn Constructor
        ///</summary>
        public Simplem_CuentasConn() : base()
  {
  InitClass();
  }
        ///<summary>
        ///m_CuentasConn Constructor
        ///</summary>
        public Simplem_CuentasConn(int Id, string Name, int cco_iidCuenta, int cco_iConexion) : base()
        {
            base.Id = Id;
						base.Name = Name;				 																																					 
				    this.cco_iidCuenta = cco_iidCuenta;
this.cco_iConexion = cco_iConexion;

            InitClass();
        }  								

				private void InitClass()
        {														
  				  base.Type = new ObjectType(7030, "m_CuentasConn");
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
			BaseObject Object = new Dalm_CuentasConn(SqlConfig, UserId, this);
			if(this.CallerObject != null)
			   Object.CallerObject = this.CallerObject;			
			return Object;
		}
///<summary>
    ///Get parent object
    ///</summary>
		public override CallerObject GetCallerObject()
		{
			Callerm_CuentasConn Caller = new Callerm_CuentasConn();
			Caller.Id = base.Id;
			Caller.Name = base.Name;
			Caller.cco_iidCuenta = this.cco_iidCuenta;
Caller.cco_iConexion = this.cco_iConexion;

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
               dt.Columns.Add(new DataColumn("cco_iidCuenta", typeof (int)));               
							 dt.Columns.Add(new DataColumn("cco_iConexion", typeof (int)));               
							 										
               //create Row  
               dr = dt.NewRow();
               
               //set Row
							 dr["Id"] = base.Id;

							 dr["Name"] = base.Name;
dr["cco_iidCuenta"] = (object)this.cco_iidCuenta ?? System.DBNull.Value;
dr["cco_iConexion"] = (object)this.cco_iConexion ?? System.DBNull.Value;
							 
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
