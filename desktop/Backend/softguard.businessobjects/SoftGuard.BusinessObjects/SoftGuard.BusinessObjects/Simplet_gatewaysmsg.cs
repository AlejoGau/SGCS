
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
    ///t_gatewaysmsg Slbf Class
    ///</summary>
    [DataContract]
    public class Simplet_gatewaysmsg : SimpleBaseObject
    { 
			 ///<summary>
     ///tgm_idkey   
     ///</summary>
	 [DataMember]
     public int tgm_idkey { get;set;} 
	  ///<summary>
     ///tgm_cdescripcion   
     ///</summary>
	 [DataMember]
     public string tgm_cdescripcion { get;set;} 
	  ///<summary>
     ///tgm_ntipo   
     ///</summary>
	 [DataMember]
     public int tgm_ntipo { get;set;} 
	  ///<summary>
     ///tgm_csmppsystemid   
     ///</summary>
	 [DataMember]
     public string tgm_csmppsystemid { get;set;} 
	  ///<summary>
     ///tgm_csmpppassword   
     ///</summary>
	 [DataMember]
     public string tgm_csmpppassword { get;set;} 
	  ///<summary>
     ///tgm_csmpphostname   
     ///</summary>
	 [DataMember]
     public string tgm_csmpphostname { get;set;} 
	  ///<summary>
     ///tgm_nsmppport   
     ///</summary>
	 [DataMember]
     public Decimal tgm_nsmppport { get;set;} 
	  ///<summary>
     ///tgm_nsmpsourceadd   
     ///</summary>
	 [DataMember]
     public string tgm_nsmpsourceadd { get;set;} 
	  ///<summary>
     ///tgm_chttpurl   
     ///</summary>
	 [DataMember]
     public string tgm_chttpurl { get;set;} 
	  ///<summary>
     ///tgm_capimail   
     ///</summary>
	 [DataMember]
     public string tgm_capimail { get;set;} 
	  ///<summary>
     ///tgm_cuser   
     ///</summary>
	 [DataMember]
     public string tgm_cuser { get;set;} 
	  ///<summary>
     ///tgm_cpassword   
     ///</summary>
	 [DataMember]
     public string tgm_cpassword { get;set;} 
	  ///<summary>
     ///tgm_cdll   
     ///</summary>
	 [DataMember]
     public string tgm_cdll { get;set;} 
	  ///<summary>
     ///tgm_cconfig   
     ///</summary>
	 [DataMember]
     public string tgm_cconfig { get;set;} 
	  ///<summary>
     ///tgm_cmetadata   
     ///</summary>
	 [DataMember]
     public string tgm_cmetadata { get;set;} 
	 ///<summary>
        ///t_gatewaysmsg Constructor
        ///</summary>
        public Simplet_gatewaysmsg() : base()
  {
  InitClass();
  }
        ///<summary>
        ///t_gatewaysmsg Constructor
        ///</summary>
        public Simplet_gatewaysmsg(int Id, string Name, int tgm_idkey, string tgm_cdescripcion, int tgm_ntipo, string tgm_csmppsystemid, string tgm_csmpppassword, string tgm_csmpphostname, Decimal tgm_nsmppport, string tgm_nsmpsourceadd, string tgm_chttpurl, string tgm_capimail, string tgm_cuser, string tgm_cpassword, string tgm_cdll, string tgm_cconfig, string tgm_cmetadata) : base()
        {
            base.Id = Id;
						base.Name = Name;				 																																					 
				    this.tgm_idkey = tgm_idkey;
this.tgm_cdescripcion = tgm_cdescripcion;
this.tgm_ntipo = tgm_ntipo;
this.tgm_csmppsystemid = tgm_csmppsystemid;
this.tgm_csmpppassword = tgm_csmpppassword;
this.tgm_csmpphostname = tgm_csmpphostname;
this.tgm_nsmppport = tgm_nsmppport;
this.tgm_nsmpsourceadd = tgm_nsmpsourceadd;
this.tgm_chttpurl = tgm_chttpurl;
this.tgm_capimail = tgm_capimail;
this.tgm_cuser = tgm_cuser;
this.tgm_cpassword = tgm_cpassword;
this.tgm_cdll = tgm_cdll;
this.tgm_cconfig = tgm_cconfig;
this.tgm_cmetadata = tgm_cmetadata;

            InitClass();
        }  								

				private void InitClass()
        {														
  				  base.Type = new ObjectType(3126, "t_gatewaysmsg");
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
			BaseObject Object = new Dalt_gatewaysmsg(SqlConfig, UserId, this);
			if(this.CallerObject != null)
			   Object.CallerObject = this.CallerObject;			
			return Object;
		}
///<summary>
    ///Get parent object
    ///</summary>
		public override CallerObject GetCallerObject()
		{
			Callert_gatewaysmsg Caller = new Callert_gatewaysmsg();
			Caller.Id = base.Id;
			Caller.Name = base.Name;
			Caller.tgm_idkey = this.tgm_idkey;
Caller.tgm_cdescripcion = this.tgm_cdescripcion;
Caller.tgm_ntipo = this.tgm_ntipo;
Caller.tgm_csmppsystemid = this.tgm_csmppsystemid;
Caller.tgm_csmpppassword = this.tgm_csmpppassword;
Caller.tgm_csmpphostname = this.tgm_csmpphostname;
Caller.tgm_nsmppport = this.tgm_nsmppport;
Caller.tgm_nsmpsourceadd = this.tgm_nsmpsourceadd;
Caller.tgm_chttpurl = this.tgm_chttpurl;
Caller.tgm_capimail = this.tgm_capimail;
Caller.tgm_cuser = this.tgm_cuser;
Caller.tgm_cpassword = this.tgm_cpassword;
Caller.tgm_cdll = this.tgm_cdll;
Caller.tgm_cconfig = this.tgm_cconfig;
Caller.tgm_cmetadata = this.tgm_cmetadata;

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
               dt.Columns.Add(new DataColumn("tgm_idkey", typeof (int)));               
							 dt.Columns.Add(new DataColumn("tgm_cdescripcion", typeof (string)));               
							 dt.Columns.Add(new DataColumn("tgm_ntipo", typeof (int)));               
							 dt.Columns.Add(new DataColumn("tgm_csmppsystemid", typeof (string)));               
							 dt.Columns.Add(new DataColumn("tgm_csmpppassword", typeof (string)));               
							 dt.Columns.Add(new DataColumn("tgm_csmpphostname", typeof (string)));               
							 dt.Columns.Add(new DataColumn("tgm_nsmppport", typeof (Decimal)));               
							 dt.Columns.Add(new DataColumn("tgm_nsmpsourceadd", typeof (string)));               
							 dt.Columns.Add(new DataColumn("tgm_chttpurl", typeof (string)));               
							 dt.Columns.Add(new DataColumn("tgm_capimail", typeof (string)));               
							 dt.Columns.Add(new DataColumn("tgm_cuser", typeof (string)));               
							 dt.Columns.Add(new DataColumn("tgm_cpassword", typeof (string)));               
							 dt.Columns.Add(new DataColumn("tgm_cdll", typeof (string)));               
							 dt.Columns.Add(new DataColumn("tgm_cconfig", typeof (string)));               
							 dt.Columns.Add(new DataColumn("tgm_cmetadata", typeof (string)));               
							 										
               //create Row  
               dr = dt.NewRow();
               
               //set Row
							 dr["Id"] = base.Id;

							 dr["Name"] = base.Name;
dr["tgm_idkey"] = (object)this.tgm_idkey ?? System.DBNull.Value;
dr["tgm_cdescripcion"] = (object)this.tgm_cdescripcion ?? System.DBNull.Value;
dr["tgm_ntipo"] = (object)this.tgm_ntipo ?? System.DBNull.Value;
dr["tgm_csmppsystemid"] = (object)this.tgm_csmppsystemid ?? System.DBNull.Value;
dr["tgm_csmpppassword"] = (object)this.tgm_csmpppassword ?? System.DBNull.Value;
dr["tgm_csmpphostname"] = (object)this.tgm_csmpphostname ?? System.DBNull.Value;
dr["tgm_nsmppport"] = (object)this.tgm_nsmppport ?? System.DBNull.Value;
dr["tgm_nsmpsourceadd"] = (object)this.tgm_nsmpsourceadd ?? System.DBNull.Value;
dr["tgm_chttpurl"] = (object)this.tgm_chttpurl ?? System.DBNull.Value;
dr["tgm_capimail"] = (object)this.tgm_capimail ?? System.DBNull.Value;
dr["tgm_cuser"] = (object)this.tgm_cuser ?? System.DBNull.Value;
dr["tgm_cpassword"] = (object)this.tgm_cpassword ?? System.DBNull.Value;
dr["tgm_cdll"] = (object)this.tgm_cdll ?? System.DBNull.Value;
dr["tgm_cconfig"] = (object)this.tgm_cconfig ?? System.DBNull.Value;
dr["tgm_cmetadata"] = (object)this.tgm_cmetadata ?? System.DBNull.Value;
							 
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
