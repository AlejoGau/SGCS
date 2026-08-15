
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
    ///Panel Slbf Class
    ///</summary>
    [DataContract]
    public class SimplePanel : SimpleBaseObject
    { 
			 ///<summary>
     ///pan_iidcuenta   
     ///</summary>
	 [DataMember]
     public int pan_iidcuenta { get;set;} 
	  ///<summary>
     ///pan_ccodigo   
     ///</summary>
	 [DataMember]
     public string pan_ccodigo { get;set;} 
	  ///<summary>
     ///pan_mubicacion   
     ///</summary>
	 [DataMember]
     public string pan_mubicacion { get;set;} 
	  ///<summary>
     ///pan_ccallerid1   
     ///</summary>
	 [DataMember]
     public string pan_ccallerid1 { get;set;} 
	  ///<summary>
     ///pan_ccallerid2   
     ///</summary>
	 [DataMember]
     public string pan_ccallerid2 { get;set;} 
	  ///<summary>
     ///pan_ccallerid3   
     ///</summary>
	 [DataMember]
     public string pan_ccallerid3 { get;set;} 
	  ///<summary>
     ///pan_ccallerid4   
     ///</summary>
	 [DataMember]
     public string pan_ccallerid4 { get;set;} 
	  ///<summary>
     ///pan_ccallerid5   
     ///</summary>
	 [DataMember]
     public string pan_ccallerid5 { get;set;} 
	  ///<summary>
     ///pan_nmostrar   
     ///</summary>
	 [DataMember]
     public Decimal pan_nmostrar { get;set;} 
	  ///<summary>
     ///pan_csender   
     ///</summary>
	 [DataMember]
     public string pan_csender { get;set;} 
	  ///<summary>
     ///pan_cnrosim1   
     ///</summary>
	 [DataMember]
     public string pan_cnrosim1 { get;set;} 
	  ///<summary>
     ///pan_ccompania1   
     ///</summary>
	 [DataMember]
     public string pan_ccompania1 { get;set;} 
	  ///<summary>
     ///pan_cnrosim2   
     ///</summary>
	 [DataMember]
     public string pan_cnrosim2 { get;set;} 
	  ///<summary>
     ///pan_ccompania2   
     ///</summary>
	 [DataMember]
     public string pan_ccompania2 { get;set;} 
	  ///<summary>
     ///pan_cgprs   
     ///</summary>
	 [DataMember]
     public string pan_cgprs { get;set;} 
	  ///<summary>
     ///pan_ireceptor   
     ///</summary>
	 [DataMember]
     public int pan_ireceptor { get;set;} 
	  ///<summary>
     ///pan_cconfig   
     ///</summary>
	 [DataMember]
     public string pan_cconfig { get;set;} 
	  ///<summary>
     ///pan_rpmidkey   
     ///</summary>
	 [DataMember]
     public int pan_rpmidkey { get;set;} 
	  ///<summary>
     ///pan_cModemSMS   
     ///</summary>
	 [DataMember]
     public int pan_cModemSMS { get;set;} 
	  ///<summary>
     ///pan_cClavePanel   
     ///</summary>
	 [DataMember]
     public string pan_cClavePanel { get;set;} 
	 ///<summary>
        ///Panel Constructor
        ///</summary>
        public SimplePanel() : base()
  {
  InitClass();
  }
        ///<summary>
        ///Panel Constructor
        ///</summary>
        public SimplePanel(int Id, string Name, int pan_iidcuenta, string pan_ccodigo, string pan_mubicacion, string pan_ccallerid1, string pan_ccallerid2, string pan_ccallerid3, string pan_ccallerid4, string pan_ccallerid5, Decimal pan_nmostrar, string pan_csender, string pan_cnrosim1, string pan_ccompania1, string pan_cnrosim2, string pan_ccompania2, string pan_cgprs, int pan_ireceptor, string pan_cconfig, int pan_rpmidkey, int pan_cModemSMS, string pan_cClavePanel) : base()
        {
            base.Id = Id;
						base.Name = Name;				 																																					 
				    this.pan_iidcuenta = pan_iidcuenta;
this.pan_ccodigo = pan_ccodigo;
this.pan_mubicacion = pan_mubicacion;
this.pan_ccallerid1 = pan_ccallerid1;
this.pan_ccallerid2 = pan_ccallerid2;
this.pan_ccallerid3 = pan_ccallerid3;
this.pan_ccallerid4 = pan_ccallerid4;
this.pan_ccallerid5 = pan_ccallerid5;
this.pan_nmostrar = pan_nmostrar;
this.pan_csender = pan_csender;
this.pan_cnrosim1 = pan_cnrosim1;
this.pan_ccompania1 = pan_ccompania1;
this.pan_cnrosim2 = pan_cnrosim2;
this.pan_ccompania2 = pan_ccompania2;
this.pan_cgprs = pan_cgprs;
this.pan_ireceptor = pan_ireceptor;
this.pan_cconfig = pan_cconfig;
this.pan_rpmidkey = pan_rpmidkey;
this.pan_cModemSMS = pan_cModemSMS;
this.pan_cClavePanel = pan_cClavePanel;

            InitClass();
        }  								

				private void InitClass()
        {														
  				  base.Type = new ObjectType(3017, "Panel");
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
			BaseObject Object = new DalPanel(SqlConfig, UserId, this);
			if(this.CallerObject != null)
			   Object.CallerObject = this.CallerObject;			
			return Object;
		}
///<summary>
    ///Get parent object
    ///</summary>
		public override CallerObject GetCallerObject()
		{
			CallerPanel Caller = new CallerPanel();
			Caller.Id = base.Id;
			Caller.Name = base.Name;
			Caller.pan_iidcuenta = this.pan_iidcuenta;
Caller.pan_ccodigo = this.pan_ccodigo;
Caller.pan_mubicacion = this.pan_mubicacion;
Caller.pan_ccallerid1 = this.pan_ccallerid1;
Caller.pan_ccallerid2 = this.pan_ccallerid2;
Caller.pan_ccallerid3 = this.pan_ccallerid3;
Caller.pan_ccallerid4 = this.pan_ccallerid4;
Caller.pan_ccallerid5 = this.pan_ccallerid5;
Caller.pan_nmostrar = this.pan_nmostrar;
Caller.pan_csender = this.pan_csender;
Caller.pan_cnrosim1 = this.pan_cnrosim1;
Caller.pan_ccompania1 = this.pan_ccompania1;
Caller.pan_cnrosim2 = this.pan_cnrosim2;
Caller.pan_ccompania2 = this.pan_ccompania2;
Caller.pan_cgprs = this.pan_cgprs;
Caller.pan_ireceptor = this.pan_ireceptor;
Caller.pan_cconfig = this.pan_cconfig;
Caller.pan_rpmidkey = this.pan_rpmidkey;
Caller.pan_cModemSMS = this.pan_cModemSMS;
Caller.pan_cClavePanel = this.pan_cClavePanel;

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
               dt.Columns.Add(new DataColumn("pan_iidcuenta", typeof (int)));               
							 dt.Columns.Add(new DataColumn("pan_ccodigo", typeof (string)));               
							 dt.Columns.Add(new DataColumn("pan_mubicacion", typeof (string)));               
							 dt.Columns.Add(new DataColumn("pan_ccallerid1", typeof (string)));               
							 dt.Columns.Add(new DataColumn("pan_ccallerid2", typeof (string)));               
							 dt.Columns.Add(new DataColumn("pan_ccallerid3", typeof (string)));               
							 dt.Columns.Add(new DataColumn("pan_ccallerid4", typeof (string)));               
							 dt.Columns.Add(new DataColumn("pan_ccallerid5", typeof (string)));               
							 dt.Columns.Add(new DataColumn("pan_nmostrar", typeof (Decimal)));               
							 dt.Columns.Add(new DataColumn("pan_csender", typeof (string)));               
							 dt.Columns.Add(new DataColumn("pan_cnrosim1", typeof (string)));               
							 dt.Columns.Add(new DataColumn("pan_ccompania1", typeof (string)));               
							 dt.Columns.Add(new DataColumn("pan_cnrosim2", typeof (string)));               
							 dt.Columns.Add(new DataColumn("pan_ccompania2", typeof (string)));               
							 dt.Columns.Add(new DataColumn("pan_cgprs", typeof (string)));               
							 dt.Columns.Add(new DataColumn("pan_ireceptor", typeof (int)));               
							 dt.Columns.Add(new DataColumn("pan_cconfig", typeof (string)));               
							 dt.Columns.Add(new DataColumn("pan_rpmidkey", typeof (int)));               
							 dt.Columns.Add(new DataColumn("pan_cModemSMS", typeof (int)));               
							 dt.Columns.Add(new DataColumn("pan_cClavePanel", typeof (string)));               
							 										
               //create Row  
               dr = dt.NewRow();
               
               //set Row
							 dr["Id"] = base.Id;

							 dr["Name"] = base.Name;
dr["pan_iidcuenta"] = (object)this.pan_iidcuenta ?? System.DBNull.Value;
dr["pan_ccodigo"] = (object)this.pan_ccodigo ?? System.DBNull.Value;
dr["pan_mubicacion"] = (object)this.pan_mubicacion ?? System.DBNull.Value;
dr["pan_ccallerid1"] = (object)this.pan_ccallerid1 ?? System.DBNull.Value;
dr["pan_ccallerid2"] = (object)this.pan_ccallerid2 ?? System.DBNull.Value;
dr["pan_ccallerid3"] = (object)this.pan_ccallerid3 ?? System.DBNull.Value;
dr["pan_ccallerid4"] = (object)this.pan_ccallerid4 ?? System.DBNull.Value;
dr["pan_ccallerid5"] = (object)this.pan_ccallerid5 ?? System.DBNull.Value;
dr["pan_nmostrar"] = (object)this.pan_nmostrar ?? System.DBNull.Value;
dr["pan_csender"] = (object)this.pan_csender ?? System.DBNull.Value;
dr["pan_cnrosim1"] = (object)this.pan_cnrosim1 ?? System.DBNull.Value;
dr["pan_ccompania1"] = (object)this.pan_ccompania1 ?? System.DBNull.Value;
dr["pan_cnrosim2"] = (object)this.pan_cnrosim2 ?? System.DBNull.Value;
dr["pan_ccompania2"] = (object)this.pan_ccompania2 ?? System.DBNull.Value;
dr["pan_cgprs"] = (object)this.pan_cgprs ?? System.DBNull.Value;
dr["pan_ireceptor"] = (object)this.pan_ireceptor ?? System.DBNull.Value;
dr["pan_cconfig"] = (object)this.pan_cconfig ?? System.DBNull.Value;
dr["pan_rpmidkey"] = (object)this.pan_rpmidkey ?? System.DBNull.Value;
dr["pan_cModemSMS"] = (object)this.pan_cModemSMS ?? System.DBNull.Value;
dr["pan_cClavePanel"] = (object)this.pan_cClavePanel ?? System.DBNull.Value;
							 
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
