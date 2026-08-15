
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
    ///MG_comprobante_impuesto Slbf Class
    ///</summary>
    [DataContract]
    public class SimpleMG_comprobante_impuesto : SimpleBaseObject
    { 
			 ///<summary>
     ///mci_cbcicodigoid   
     ///</summary>
	 [DataMember]
     public int mci_cbcicodigoid { get;set;} 
	  ///<summary>
     ///mci_impidkey   
     ///</summary>
	 [DataMember]
     public int mci_impidkey { get;set;} 
	  ///<summary>
     ///mci_total   
     ///</summary>
	 [DataMember]
     public Decimal mci_total { get;set;} 
	 ///<summary>
        ///MG_comprobante_impuesto Constructor
        ///</summary>
        public SimpleMG_comprobante_impuesto() : base()
  {
  InitClass();
  }
        ///<summary>
        ///MG_comprobante_impuesto Constructor
        ///</summary>
        public SimpleMG_comprobante_impuesto(int Id, string Name, int mci_cbcicodigoid, int mci_impidkey, Decimal mci_total) : base()
        {
            base.Id = Id;
						base.Name = Name;				 																																					 
				    this.mci_cbcicodigoid = mci_cbcicodigoid;
this.mci_impidkey = mci_impidkey;
this.mci_total = mci_total;

            InitClass();
        }  								

				private void InitClass()
        {														
  				  base.Type = new ObjectType(3200, "MG_comprobante_impuesto");
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
			BaseObject Object = new DalMG_comprobante_impuesto(SqlConfig, UserId, this);
			if(this.CallerObject != null)
			   Object.CallerObject = this.CallerObject;			
			return Object;
		}
///<summary>
    ///Get parent object
    ///</summary>
		public override CallerObject GetCallerObject()
		{
			CallerMG_comprobante_impuesto Caller = new CallerMG_comprobante_impuesto();
			Caller.Id = base.Id;
			Caller.Name = base.Name;
			Caller.mci_cbcicodigoid = this.mci_cbcicodigoid;
Caller.mci_impidkey = this.mci_impidkey;
Caller.mci_total = this.mci_total;

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
               dt.Columns.Add(new DataColumn("mci_cbcicodigoid", typeof (int)));               
							 dt.Columns.Add(new DataColumn("mci_impidkey", typeof (int)));               
							 dt.Columns.Add(new DataColumn("mci_total", typeof (Decimal)));               
							 										
               //create Row  
               dr = dt.NewRow();
               
               //set Row
							 dr["Id"] = base.Id;

							 dr["Name"] = base.Name;
dr["mci_cbcicodigoid"] = (object)this.mci_cbcicodigoid ?? System.DBNull.Value;
dr["mci_impidkey"] = (object)this.mci_impidkey ?? System.DBNull.Value;
dr["mci_total"] = (object)this.mci_total ?? System.DBNull.Value;
							 
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
