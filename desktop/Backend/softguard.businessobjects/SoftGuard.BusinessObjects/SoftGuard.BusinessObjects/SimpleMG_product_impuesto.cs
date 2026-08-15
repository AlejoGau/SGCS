
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
    ///MG_product_impuesto Slbf Class
    ///</summary>
    [DataContract]
    public class SimpleMG_product_impuesto : SimpleBaseObject
    { 
			 ///<summary>
     ///mpi_idproduct   
     ///</summary>
	 [DataMember]
     public int mpi_idproduct { get;set;} 
	  ///<summary>
     ///mpi_impidkey   
     ///</summary>
	 [DataMember]
     public int mpi_impidkey { get;set;} 
	 ///<summary>
        ///MG_product_impuesto Constructor
        ///</summary>
        public SimpleMG_product_impuesto() : base()
  {
  InitClass();
  }
        ///<summary>
        ///MG_product_impuesto Constructor
        ///</summary>
        public SimpleMG_product_impuesto(int Id, string Name, int mpi_idproduct, int mpi_impidkey) : base()
        {
            base.Id = Id;
						base.Name = Name;				 																																					 
				    this.mpi_idproduct = mpi_idproduct;
this.mpi_impidkey = mpi_impidkey;

            InitClass();
        }  								

				private void InitClass()
        {														
  				  base.Type = new ObjectType(3199, "MG_product_impuesto");
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
			BaseObject Object = new DalMG_product_impuesto(SqlConfig, UserId, this);
			if(this.CallerObject != null)
			   Object.CallerObject = this.CallerObject;			
			return Object;
		}
///<summary>
    ///Get parent object
    ///</summary>
		public override CallerObject GetCallerObject()
		{
			CallerMG_product_impuesto Caller = new CallerMG_product_impuesto();
			Caller.Id = base.Id;
			Caller.Name = base.Name;
			Caller.mpi_idproduct = this.mpi_idproduct;
Caller.mpi_impidkey = this.mpi_impidkey;

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
               dt.Columns.Add(new DataColumn("mpi_idproduct", typeof (int)));               
							 dt.Columns.Add(new DataColumn("mpi_impidkey", typeof (int)));               
							 										
               //create Row  
               dr = dt.NewRow();
               
               //set Row
							 dr["Id"] = base.Id;

							 dr["Name"] = base.Name;
dr["mpi_idproduct"] = (object)this.mpi_idproduct ?? System.DBNull.Value;
dr["mpi_impidkey"] = (object)this.mpi_impidkey ?? System.DBNull.Value;
							 
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
