
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
    ///t_modems_sms Slbf Class
    ///</summary>
    [DataContract]
    public class Simplet_modems_sms : SimpleBaseObject
    { 
			 ///<summary>
     ///sms_icodigo   
     ///</summary>
	 [DataMember]
     public int sms_icodigo { get;set;} 
	  ///<summary>
     ///sms_cdescripcion   
     ///</summary>
	 [DataMember]
     public string sms_cdescripcion { get;set;} 
	  ///<summary>
     ///sms_nport   
     ///</summary>
	 [DataMember]
     public Decimal sms_nport { get;set;} 
	  ///<summary>
     ///sms_cseteo   
     ///</summary>
	 [DataMember]
     public string sms_cseteo { get;set;} 
	  ///<summary>
     ///sms_cinbox   
     ///</summary>
	 [DataMember]
     public string sms_cinbox { get;set;} 
	  ///<summary>
     ///sms_ndefault   
     ///</summary>
	 [DataMember]
     public Decimal sms_ndefault { get;set;} 
	  ///<summary>
     ///sms_cterminal   
     ///</summary>
	 [DataMember]
     public string sms_cterminal { get;set;} 
	  ///<summary>
     ///sms_csource   
     ///</summary>
	 [DataMember]
     public string sms_csource { get;set;} 
	  ///<summary>
     ///sms_nEstado   
     ///</summary>
	 [DataMember]
     public Decimal sms_nEstado { get;set;} 
	  ///<summary>
     ///sms_iGateway   
     ///</summary>
	 [DataMember]
     public int sms_iGateway { get;set;} 
	  ///<summary>
     ///sms_cDealer   
     ///</summary>
	 [DataMember]
     public string sms_cDealer { get;set;} 
	 ///<summary>
        ///t_modems_sms Constructor
        ///</summary>
        public Simplet_modems_sms() : base()
  {
  InitClass();
  }
        ///<summary>
        ///t_modems_sms Constructor
        ///</summary>
        public Simplet_modems_sms(int Id, string Name, int sms_icodigo, string sms_cdescripcion, Decimal sms_nport, string sms_cseteo, string sms_cinbox, Decimal sms_ndefault, string sms_cterminal, string sms_csource, Decimal sms_nEstado, int sms_iGateway, string sms_cDealer) : base()
        {
            base.Id = Id;
						base.Name = Name;				 																																					 
				    this.sms_icodigo = sms_icodigo;
this.sms_cdescripcion = sms_cdescripcion;
this.sms_nport = sms_nport;
this.sms_cseteo = sms_cseteo;
this.sms_cinbox = sms_cinbox;
this.sms_ndefault = sms_ndefault;
this.sms_cterminal = sms_cterminal;
this.sms_csource = sms_csource;
this.sms_nEstado = sms_nEstado;
this.sms_iGateway = sms_iGateway;
this.sms_cDealer = sms_cDealer;

            InitClass();
        }  								

				private void InitClass()
        {														
  				  base.Type = new ObjectType(3082, "t_modems_sms");
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
			BaseObject Object = new Dalt_modems_sms(SqlConfig, UserId, this);
			if(this.CallerObject != null)
			   Object.CallerObject = this.CallerObject;			
			return Object;
		}
///<summary>
    ///Get parent object
    ///</summary>
		public override CallerObject GetCallerObject()
		{
			Callert_modems_sms Caller = new Callert_modems_sms();
			Caller.Id = base.Id;
			Caller.Name = base.Name;
			Caller.sms_icodigo = this.sms_icodigo;
Caller.sms_cdescripcion = this.sms_cdescripcion;
Caller.sms_nport = this.sms_nport;
Caller.sms_cseteo = this.sms_cseteo;
Caller.sms_cinbox = this.sms_cinbox;
Caller.sms_ndefault = this.sms_ndefault;
Caller.sms_cterminal = this.sms_cterminal;
Caller.sms_csource = this.sms_csource;
Caller.sms_nEstado = this.sms_nEstado;
Caller.sms_iGateway = this.sms_iGateway;
Caller.sms_cDealer = this.sms_cDealer;

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
               dt.Columns.Add(new DataColumn("sms_icodigo", typeof (int)));               
							 dt.Columns.Add(new DataColumn("sms_cdescripcion", typeof (string)));               
							 dt.Columns.Add(new DataColumn("sms_nport", typeof (Decimal)));               
							 dt.Columns.Add(new DataColumn("sms_cseteo", typeof (string)));               
							 dt.Columns.Add(new DataColumn("sms_cinbox", typeof (string)));               
							 dt.Columns.Add(new DataColumn("sms_ndefault", typeof (Decimal)));               
							 dt.Columns.Add(new DataColumn("sms_cterminal", typeof (string)));               
							 dt.Columns.Add(new DataColumn("sms_csource", typeof (string)));               
							 dt.Columns.Add(new DataColumn("sms_nEstado", typeof (Decimal)));               
							 dt.Columns.Add(new DataColumn("sms_iGateway", typeof (int)));               
							 dt.Columns.Add(new DataColumn("sms_cDealer", typeof (string)));               
							 										
               //create Row  
               dr = dt.NewRow();
               
               //set Row
							 dr["Id"] = base.Id;

							 dr["Name"] = base.Name;
dr["sms_icodigo"] = (object)this.sms_icodigo ?? System.DBNull.Value;
dr["sms_cdescripcion"] = (object)this.sms_cdescripcion ?? System.DBNull.Value;
dr["sms_nport"] = (object)this.sms_nport ?? System.DBNull.Value;
dr["sms_cseteo"] = (object)this.sms_cseteo ?? System.DBNull.Value;
dr["sms_cinbox"] = (object)this.sms_cinbox ?? System.DBNull.Value;
dr["sms_ndefault"] = (object)this.sms_ndefault ?? System.DBNull.Value;
dr["sms_cterminal"] = (object)this.sms_cterminal ?? System.DBNull.Value;
dr["sms_csource"] = (object)this.sms_csource ?? System.DBNull.Value;
dr["sms_nEstado"] = (object)this.sms_nEstado ?? System.DBNull.Value;
dr["sms_iGateway"] = (object)this.sms_iGateway ?? System.DBNull.Value;
dr["sms_cDealer"] = (object)this.sms_cDealer ?? System.DBNull.Value;
							 
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
