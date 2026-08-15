
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
    ///m_cuentas_video_links Slbf Class
    ///</summary>
    [DataContract]
    public class Simplem_cuentas_video_links : SimpleBaseObject
    { 
			 ///<summary>
     ///cvl_iidcuenta   
     ///</summary>
	 [DataMember]
     public int cvl_iidcuenta { get;set;} 
	  ///<summary>
     ///cvl_calarma   
     ///</summary>
	 [DataMember]
     public string cvl_calarma { get;set;} 
	  ///<summary>
     ///cvl_czona   
     ///</summary>
	 [DataMember]
     public string cvl_czona { get;set;} 
	  ///<summary>
     ///cvl_clink   
     ///</summary>
	 [DataMember]
     public string cvl_clink { get;set;} 
	  ///<summary>
     ///cvl_clinkdss   
     ///</summary>
	 [DataMember]
     public string cvl_clinkdss { get;set;} 
	  ///<summary>
     ///cvl_ivideoid   
     ///</summary>
	 [DataMember]
     public int cvl_ivideoid { get;set;} 
	  ///<summary>
     ///cvl_rlatitud   
     ///</summary>
	 [DataMember]
     public Single cvl_rlatitud { get;set;} 
	  ///<summary>
     ///cvl_rlongitud   
     ///</summary>
	 [DataMember]
     public Single cvl_rlongitud { get;set;} 
	  ///<summary>
     ///cuv_iTodosLosEventos   
     ///</summary>
	 [DataMember]
     public int cuv_iTodosLosEventos { get;set;} 
	 ///<summary>
        ///m_cuentas_video_links Constructor
        ///</summary>
        public Simplem_cuentas_video_links() : base()
  {
  InitClass();
  }
        ///<summary>
        ///m_cuentas_video_links Constructor
        ///</summary>
        public Simplem_cuentas_video_links(int Id, string Name, int cvl_iidcuenta, string cvl_calarma, string cvl_czona, string cvl_clink, string cvl_clinkdss, int cvl_ivideoid, Single cvl_rlatitud, Single cvl_rlongitud, int cuv_iTodosLosEventos) : base()
        {
            base.Id = Id;
						base.Name = Name;				 																																					 
				    this.cvl_iidcuenta = cvl_iidcuenta;
this.cvl_calarma = cvl_calarma;
this.cvl_czona = cvl_czona;
this.cvl_clink = cvl_clink;
this.cvl_clinkdss = cvl_clinkdss;
this.cvl_ivideoid = cvl_ivideoid;
this.cvl_rlatitud = cvl_rlatitud;
this.cvl_rlongitud = cvl_rlongitud;
this.cuv_iTodosLosEventos = cuv_iTodosLosEventos;

            InitClass();
        }  								

				private void InitClass()
        {														
  				  base.Type = new ObjectType(3110, "m_cuentas_video_links");
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
			BaseObject Object = new Dalm_cuentas_video_links(SqlConfig, UserId, this);
			if(this.CallerObject != null)
			   Object.CallerObject = this.CallerObject;			
			return Object;
		}
///<summary>
    ///Get parent object
    ///</summary>
		public override CallerObject GetCallerObject()
		{
			Callerm_cuentas_video_links Caller = new Callerm_cuentas_video_links();
			Caller.Id = base.Id;
			Caller.Name = base.Name;
			Caller.cvl_iidcuenta = this.cvl_iidcuenta;
Caller.cvl_calarma = this.cvl_calarma;
Caller.cvl_czona = this.cvl_czona;
Caller.cvl_clink = this.cvl_clink;
Caller.cvl_clinkdss = this.cvl_clinkdss;
Caller.cvl_ivideoid = this.cvl_ivideoid;
Caller.cvl_rlatitud = this.cvl_rlatitud;
Caller.cvl_rlongitud = this.cvl_rlongitud;
Caller.cuv_iTodosLosEventos = this.cuv_iTodosLosEventos;

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
               dt.Columns.Add(new DataColumn("cvl_iidcuenta", typeof (int)));               
							 dt.Columns.Add(new DataColumn("cvl_calarma", typeof (string)));               
							 dt.Columns.Add(new DataColumn("cvl_czona", typeof (string)));               
							 dt.Columns.Add(new DataColumn("cvl_clink", typeof (string)));               
							 dt.Columns.Add(new DataColumn("cvl_clinkdss", typeof (string)));               
							 dt.Columns.Add(new DataColumn("cvl_ivideoid", typeof (int)));               
							 dt.Columns.Add(new DataColumn("cvl_rlatitud", typeof (Single)));               
							 dt.Columns.Add(new DataColumn("cvl_rlongitud", typeof (Single)));               
							 dt.Columns.Add(new DataColumn("cuv_iTodosLosEventos", typeof (int)));               
							 										
               //create Row  
               dr = dt.NewRow();
               
               //set Row
							 dr["Id"] = base.Id;

							 dr["Name"] = base.Name;
dr["cvl_iidcuenta"] = (object)this.cvl_iidcuenta ?? System.DBNull.Value;
dr["cvl_calarma"] = (object)this.cvl_calarma ?? System.DBNull.Value;
dr["cvl_czona"] = (object)this.cvl_czona ?? System.DBNull.Value;
dr["cvl_clink"] = (object)this.cvl_clink ?? System.DBNull.Value;
dr["cvl_clinkdss"] = (object)this.cvl_clinkdss ?? System.DBNull.Value;
dr["cvl_ivideoid"] = (object)this.cvl_ivideoid ?? System.DBNull.Value;
dr["cvl_rlatitud"] = (object)this.cvl_rlatitud ?? System.DBNull.Value;
dr["cvl_rlongitud"] = (object)this.cvl_rlongitud ?? System.DBNull.Value;
dr["cuv_iTodosLosEventos"] = (object)this.cuv_iTodosLosEventos ?? System.DBNull.Value;
							 
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
