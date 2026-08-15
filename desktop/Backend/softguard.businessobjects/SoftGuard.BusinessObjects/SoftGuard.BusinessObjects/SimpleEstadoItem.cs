
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
    ///EstadoItem Slbf Class
    ///</summary>
    [DataContract]
    public class SimpleEstadoItem : SimpleBaseObject
    { 
			 ///<summary>
     ///est_iidcuenta   
     ///</summary>
	 [DataMember]
     public int est_iidcuenta { get;set;} 
	  ///<summary>
     ///est_czona   
     ///</summary>
	 [DataMember]
     public string est_czona { get;set;} 
	  ///<summary>
     ///est_cData   
     ///</summary>
	 [DataMember]
     public string est_cData { get;set;} 
	 ///<summary>
        ///EstadoItem Constructor
        ///</summary>
        public SimpleEstadoItem() : base()
  {
  InitClass();
  }
        ///<summary>
        ///EstadoItem Constructor
        ///</summary>
        public SimpleEstadoItem(int Id, string Name, int est_iidcuenta, string est_czona, string est_cData) : base()
        {
            base.Id = Id;
						base.Name = Name;				 																																					 
				    this.est_iidcuenta = est_iidcuenta;
this.est_czona = est_czona;
this.est_cData = est_cData;

            InitClass();
        }  								

				private void InitClass()
        {														
  				  base.Type = new ObjectType(3034, "EstadoItem");
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
			BaseObject Object = new DalEstadoItem(SqlConfig, UserId, this);
			if(this.CallerObject != null)
			   Object.CallerObject = this.CallerObject;			
			return Object;
		}
///<summary>
    ///Get parent object
    ///</summary>
		public override CallerObject GetCallerObject()
		{
			CallerEstadoItem Caller = new CallerEstadoItem();
			Caller.Id = base.Id;
			Caller.Name = base.Name;
			Caller.est_iidcuenta = this.est_iidcuenta;
Caller.est_czona = this.est_czona;
Caller.est_cData = this.est_cData;

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
               dt.Columns.Add(new DataColumn("est_iidcuenta", typeof (int)));               
							 dt.Columns.Add(new DataColumn("est_czona", typeof (string)));               
							 dt.Columns.Add(new DataColumn("est_cData", typeof (string)));               
							 										
               //create Row  
               dr = dt.NewRow();
               
               //set Row
							 dr["Id"] = base.Id;

							 dr["Name"] = base.Name;
dr["est_iidcuenta"] = (object)this.est_iidcuenta ?? System.DBNull.Value;
dr["est_czona"] = (object)this.est_czona ?? System.DBNull.Value;
dr["est_cData"] = (object)this.est_cData ?? System.DBNull.Value;
							 
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
