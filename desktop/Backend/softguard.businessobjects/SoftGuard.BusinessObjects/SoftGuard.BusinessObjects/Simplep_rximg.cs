
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
    ///p_rximg Slbf Class
    ///</summary>
    [DataContract]
    public class Simplep_rximg : SimpleBaseObject
    { 
			 ///<summary>
     ///rxi_irecid   
     ///</summary>
	 [DataMember]
     public int rxi_irecid { get;set;} 
	  ///<summary>
     ///rxi_cimg   
     ///</summary>
	 [DataMember]
     public string rxi_cimg { get;set;} 
	  ///<summary>
     ///rxi_ccarpeta   
     ///</summary>
	 [DataMember]
     public string rxi_ccarpeta { get;set;} 
	  ///<summary>
     ///rxi_nestado   
     ///</summary>
	 [DataMember]
     public Decimal rxi_nestado { get;set;} 
	  ///<summary>
     ///rxi_ctipo   
     ///</summary>
	 [DataMember]
     public string rxi_ctipo { get;set;} 
	  ///<summary>
     ///rxi_cconfig   
     ///</summary>
	 [DataMember]
     public string rxi_cconfig { get;set;} 
	 ///<summary>
        ///p_rximg Constructor
        ///</summary>
        public Simplep_rximg() : base()
  {
  InitClass();
  }
        ///<summary>
        ///p_rximg Constructor
        ///</summary>
        public Simplep_rximg(int Id, string Name, int rxi_irecid, string rxi_cimg, string rxi_ccarpeta, Decimal rxi_nestado, string rxi_ctipo, string rxi_cconfig) : base()
        {
            base.Id = Id;
						base.Name = Name;				 																																					 
				    this.rxi_irecid = rxi_irecid;
this.rxi_cimg = rxi_cimg;
this.rxi_ccarpeta = rxi_ccarpeta;
this.rxi_nestado = rxi_nestado;
this.rxi_ctipo = rxi_ctipo;
this.rxi_cconfig = rxi_cconfig;

            InitClass();
        }  								

				private void InitClass()
        {														
  				  base.Type = new ObjectType(3169, "p_rximg");
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
			BaseObject Object = new Dalp_rximg(SqlConfig, UserId, this);
			if(this.CallerObject != null)
			   Object.CallerObject = this.CallerObject;			
			return Object;
		}
///<summary>
    ///Get parent object
    ///</summary>
		public override CallerObject GetCallerObject()
		{
			Callerp_rximg Caller = new Callerp_rximg();
			Caller.Id = base.Id;
			Caller.Name = base.Name;
			Caller.rxi_irecid = this.rxi_irecid;
Caller.rxi_cimg = this.rxi_cimg;
Caller.rxi_ccarpeta = this.rxi_ccarpeta;
Caller.rxi_nestado = this.rxi_nestado;
Caller.rxi_ctipo = this.rxi_ctipo;
Caller.rxi_cconfig = this.rxi_cconfig;

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
               dt.Columns.Add(new DataColumn("rxi_irecid", typeof (int)));               
							 dt.Columns.Add(new DataColumn("rxi_cimg", typeof (string)));               
							 dt.Columns.Add(new DataColumn("rxi_ccarpeta", typeof (string)));               
							 dt.Columns.Add(new DataColumn("rxi_nestado", typeof (Decimal)));               
							 dt.Columns.Add(new DataColumn("rxi_ctipo", typeof (string)));               
							 dt.Columns.Add(new DataColumn("rxi_cconfig", typeof (string)));               
							 										
               //create Row  
               dr = dt.NewRow();
               
               //set Row
							 dr["Id"] = base.Id;

							 dr["Name"] = base.Name;
dr["rxi_irecid"] = (object)this.rxi_irecid ?? System.DBNull.Value;
dr["rxi_cimg"] = (object)this.rxi_cimg ?? System.DBNull.Value;
dr["rxi_ccarpeta"] = (object)this.rxi_ccarpeta ?? System.DBNull.Value;
dr["rxi_nestado"] = (object)this.rxi_nestado ?? System.DBNull.Value;
dr["rxi_ctipo"] = (object)this.rxi_ctipo ?? System.DBNull.Value;
dr["rxi_cconfig"] = (object)this.rxi_cconfig ?? System.DBNull.Value;
							 
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
