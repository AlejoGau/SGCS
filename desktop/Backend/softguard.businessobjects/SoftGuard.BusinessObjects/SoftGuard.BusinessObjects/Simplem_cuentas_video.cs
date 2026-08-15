
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
    ///m_cuentas_video Slbf Class
    ///</summary>
    [DataContract]
    public class Simplem_cuentas_video : SimpleBaseObject
    { 
			 ///<summary>
     ///cuv_iidcuenta   
     ///</summary>
	 [DataMember]
     public int cuv_iidcuenta { get;set;} 
	  ///<summary>
     ///cuv_clink   
     ///</summary>
	 [DataMember]
     public string cuv_clink { get;set;} 
	  ///<summary>
     ///cuv_meventos   
     ///</summary>
	 [DataMember]
     public string cuv_meventos { get;set;} 
	  ///<summary>
     ///cuv_clinkdss   
     ///</summary>
	 [DataMember]
     public string cuv_clinkdss { get;set;} 
	  ///<summary>
     ///cuv_ivideoid   
     ///</summary>
	 [DataMember]
     public int cuv_ivideoid { get;set;} 
	  ///<summary>
     ///cuv_rlatitud   
     ///</summary>
	 [DataMember]
     public Single cuv_rlatitud { get;set;} 
	  ///<summary>
     ///cuv_rlongitud   
     ///</summary>
	 [DataMember]
     public Single cuv_rlongitud { get;set;} 
	  ///<summary>
     ///cuv_iTodosLosEventos   
     ///</summary>
	 [DataMember]
     public int cuv_iTodosLosEventos { get;set;} 
	 ///<summary>
        ///m_cuentas_video Constructor
        ///</summary>
        public Simplem_cuentas_video() : base()
  {
  InitClass();
  }
        ///<summary>
        ///m_cuentas_video Constructor
        ///</summary>
        public Simplem_cuentas_video(int Id, string Name, int cuv_iidcuenta, string cuv_clink, string cuv_meventos, string cuv_clinkdss, int cuv_ivideoid, Single cuv_rlatitud, Single cuv_rlongitud, int cuv_iTodosLosEventos) : base()
        {
            base.Id = Id;
						base.Name = Name;				 																																					 
				    this.cuv_iidcuenta = cuv_iidcuenta;
this.cuv_clink = cuv_clink;
this.cuv_meventos = cuv_meventos;
this.cuv_clinkdss = cuv_clinkdss;
this.cuv_ivideoid = cuv_ivideoid;
this.cuv_rlatitud = cuv_rlatitud;
this.cuv_rlongitud = cuv_rlongitud;
this.cuv_iTodosLosEventos = cuv_iTodosLosEventos;

            InitClass();
        }  								

				private void InitClass()
        {														
  				  base.Type = new ObjectType(3109, "m_cuentas_video");
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
			BaseObject Object = new Dalm_cuentas_video(SqlConfig, UserId, this);
			if(this.CallerObject != null)
			   Object.CallerObject = this.CallerObject;			
			return Object;
		}
///<summary>
    ///Get parent object
    ///</summary>
		public override CallerObject GetCallerObject()
		{
			Callerm_cuentas_video Caller = new Callerm_cuentas_video();
			Caller.Id = base.Id;
			Caller.Name = base.Name;
			Caller.cuv_iidcuenta = this.cuv_iidcuenta;
Caller.cuv_clink = this.cuv_clink;
Caller.cuv_meventos = this.cuv_meventos;
Caller.cuv_clinkdss = this.cuv_clinkdss;
Caller.cuv_ivideoid = this.cuv_ivideoid;
Caller.cuv_rlatitud = this.cuv_rlatitud;
Caller.cuv_rlongitud = this.cuv_rlongitud;
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
               dt.Columns.Add(new DataColumn("cuv_iidcuenta", typeof (int)));               
							 dt.Columns.Add(new DataColumn("cuv_clink", typeof (string)));               
							 dt.Columns.Add(new DataColumn("cuv_meventos", typeof (string)));               
							 dt.Columns.Add(new DataColumn("cuv_clinkdss", typeof (string)));               
							 dt.Columns.Add(new DataColumn("cuv_ivideoid", typeof (int)));               
							 dt.Columns.Add(new DataColumn("cuv_rlatitud", typeof (Single)));               
							 dt.Columns.Add(new DataColumn("cuv_rlongitud", typeof (Single)));               
							 dt.Columns.Add(new DataColumn("cuv_iTodosLosEventos", typeof (int)));               
							 										
               //create Row  
               dr = dt.NewRow();
               
               //set Row
							 dr["Id"] = base.Id;

							 dr["Name"] = base.Name;
dr["cuv_iidcuenta"] = (object)this.cuv_iidcuenta ?? System.DBNull.Value;
dr["cuv_clink"] = (object)this.cuv_clink ?? System.DBNull.Value;
dr["cuv_meventos"] = (object)this.cuv_meventos ?? System.DBNull.Value;
dr["cuv_clinkdss"] = (object)this.cuv_clinkdss ?? System.DBNull.Value;
dr["cuv_ivideoid"] = (object)this.cuv_ivideoid ?? System.DBNull.Value;
dr["cuv_rlatitud"] = (object)this.cuv_rlatitud ?? System.DBNull.Value;
dr["cuv_rlongitud"] = (object)this.cuv_rlongitud ?? System.DBNull.Value;
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
