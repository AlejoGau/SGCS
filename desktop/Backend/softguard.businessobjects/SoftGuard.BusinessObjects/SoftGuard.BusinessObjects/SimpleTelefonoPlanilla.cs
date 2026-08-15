
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
    ///TelefonoPlanilla Slbf Class
    ///</summary>
    [DataContract]
    public class SimpleTelefonoPlanilla : SimpleBaseObject
    { 
			 ///<summary>
     ///tel_iidpla   
     ///</summary>
	 [DataMember]
     public int tel_iidpla { get;set;} 
	  ///<summary>
     ///tel_iid   
     ///</summary>
	 [DataMember]
     public int tel_iid { get;set;} 
	  ///<summary>
     ///tel_clista   
     ///</summary>
	 [DataMember]
     public string tel_clista { get;set;} 
	  ///<summary>
     ///tel_cnombre   
     ///</summary>
	 [DataMember]
     public string tel_cnombre { get;set;} 
	  ///<summary>
     ///tel_cobservacion   
     ///</summary>
	 [DataMember]
     public string tel_cobservacion { get;set;} 
	  ///<summary>
     ///tel_ctelefono   
     ///</summary>
	 [DataMember]
     public string tel_ctelefono { get;set;} 
	  ///<summary>
     ///tel_ndiscado   
     ///</summary>
	 [DataMember]
     public Decimal tel_ndiscado { get;set;} 
	  ///<summary>
     ///tel_cpredigito   
     ///</summary>
	 [DataMember]
     public string tel_cpredigito { get;set;} 
	  ///<summary>
     ///tel_cpostdigito   
     ///</summary>
	 [DataMember]
     public string tel_cpostdigito { get;set;} 
	  ///<summary>
     ///tel_norden   
     ///</summary>
	 [DataMember]
     public int tel_norden { get;set;} 
	  ///<summary>
     ///tel_ntr   
     ///</summary>
	 [DataMember]
     public Decimal tel_ntr { get;set;} 
	  ///<summary>
     ///tel_cclave   
     ///</summary>
	 [DataMember]
     public string tel_cclave { get;set;} 
	  ///<summary>
     ///tel_cpermiso   
     ///</summary>
	 [DataMember]
     public string tel_cpermiso { get;set;} 
	  ///<summary>
     ///tel_nsms   
     ///</summary>
	 [DataMember]
     public Decimal tel_nsms { get;set;} 
	  ///<summary>
     ///tel_cinternacional   
     ///</summary>
	 [DataMember]
     public string tel_cinternacional { get;set;} 
	  ///<summary>
     ///tel_ccountrycode   
     ///</summary>
	 [DataMember]
     public string tel_ccountrycode { get;set;} 
	  ///<summary>
     ///tel_iismobile   
     ///</summary>
	 [DataMember]
     public int tel_iismobile { get;set;} 
	 ///<summary>
        ///TelefonoPlanilla Constructor
        ///</summary>
        public SimpleTelefonoPlanilla() : base()
  {
  InitClass();
  }
        ///<summary>
        ///TelefonoPlanilla Constructor
        ///</summary>
        public SimpleTelefonoPlanilla(int Id, string Name, int tel_iidpla, int tel_iid, string tel_clista, string tel_cnombre, string tel_cobservacion, string tel_ctelefono, Decimal tel_ndiscado, string tel_cpredigito, string tel_cpostdigito, int tel_norden, Decimal tel_ntr, string tel_cclave, string tel_cpermiso, Decimal tel_nsms, string tel_cinternacional, string tel_ccountrycode, int tel_iismobile) : base()
        {
            base.Id = Id;
						base.Name = Name;				 																																					 
				    this.tel_iidpla = tel_iidpla;
this.tel_iid = tel_iid;
this.tel_clista = tel_clista;
this.tel_cnombre = tel_cnombre;
this.tel_cobservacion = tel_cobservacion;
this.tel_ctelefono = tel_ctelefono;
this.tel_ndiscado = tel_ndiscado;
this.tel_cpredigito = tel_cpredigito;
this.tel_cpostdigito = tel_cpostdigito;
this.tel_norden = tel_norden;
this.tel_ntr = tel_ntr;
this.tel_cclave = tel_cclave;
this.tel_cpermiso = tel_cpermiso;
this.tel_nsms = tel_nsms;
this.tel_cinternacional = tel_cinternacional;
this.tel_ccountrycode = tel_ccountrycode;
this.tel_iismobile = tel_iismobile;

            InitClass();
        }  								

				private void InitClass()
        {														
  				  base.Type = new ObjectType(3012, "TelefonoPlanilla");
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
			BaseObject Object = new DalTelefonoPlanilla(SqlConfig, UserId, this);
			if(this.CallerObject != null)
			   Object.CallerObject = this.CallerObject;			
			return Object;
		}
///<summary>
    ///Get parent object
    ///</summary>
		public override CallerObject GetCallerObject()
		{
			CallerTelefonoPlanilla Caller = new CallerTelefonoPlanilla();
			Caller.Id = base.Id;
			Caller.Name = base.Name;
			Caller.tel_iidpla = this.tel_iidpla;
Caller.tel_iid = this.tel_iid;
Caller.tel_clista = this.tel_clista;
Caller.tel_cnombre = this.tel_cnombre;
Caller.tel_cobservacion = this.tel_cobservacion;
Caller.tel_ctelefono = this.tel_ctelefono;
Caller.tel_ndiscado = this.tel_ndiscado;
Caller.tel_cpredigito = this.tel_cpredigito;
Caller.tel_cpostdigito = this.tel_cpostdigito;
Caller.tel_norden = this.tel_norden;
Caller.tel_ntr = this.tel_ntr;
Caller.tel_cclave = this.tel_cclave;
Caller.tel_cpermiso = this.tel_cpermiso;
Caller.tel_nsms = this.tel_nsms;
Caller.tel_cinternacional = this.tel_cinternacional;
Caller.tel_ccountrycode = this.tel_ccountrycode;
Caller.tel_iismobile = this.tel_iismobile;

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
               dt.Columns.Add(new DataColumn("tel_iidpla", typeof (int)));               
							 dt.Columns.Add(new DataColumn("tel_iid", typeof (int)));               
							 dt.Columns.Add(new DataColumn("tel_clista", typeof (string)));               
							 dt.Columns.Add(new DataColumn("tel_cnombre", typeof (string)));               
							 dt.Columns.Add(new DataColumn("tel_cobservacion", typeof (string)));               
							 dt.Columns.Add(new DataColumn("tel_ctelefono", typeof (string)));               
							 dt.Columns.Add(new DataColumn("tel_ndiscado", typeof (Decimal)));               
							 dt.Columns.Add(new DataColumn("tel_cpredigito", typeof (string)));               
							 dt.Columns.Add(new DataColumn("tel_cpostdigito", typeof (string)));               
							 dt.Columns.Add(new DataColumn("tel_norden", typeof (int)));               
							 dt.Columns.Add(new DataColumn("tel_ntr", typeof (Decimal)));               
							 dt.Columns.Add(new DataColumn("tel_cclave", typeof (string)));               
							 dt.Columns.Add(new DataColumn("tel_cpermiso", typeof (string)));               
							 dt.Columns.Add(new DataColumn("tel_nsms", typeof (Decimal)));               
							 dt.Columns.Add(new DataColumn("tel_cinternacional", typeof (string)));               
							 dt.Columns.Add(new DataColumn("tel_ccountrycode", typeof (string)));               
							 dt.Columns.Add(new DataColumn("tel_iismobile", typeof (int)));               
							 										
               //create Row  
               dr = dt.NewRow();
               
               //set Row
							 dr["Id"] = base.Id;

							 dr["Name"] = base.Name;
dr["tel_iidpla"] = (object)this.tel_iidpla ?? System.DBNull.Value;
dr["tel_iid"] = (object)this.tel_iid ?? System.DBNull.Value;
dr["tel_clista"] = (object)this.tel_clista ?? System.DBNull.Value;
dr["tel_cnombre"] = (object)this.tel_cnombre ?? System.DBNull.Value;
dr["tel_cobservacion"] = (object)this.tel_cobservacion ?? System.DBNull.Value;
dr["tel_ctelefono"] = (object)this.tel_ctelefono ?? System.DBNull.Value;
dr["tel_ndiscado"] = (object)this.tel_ndiscado ?? System.DBNull.Value;
dr["tel_cpredigito"] = (object)this.tel_cpredigito ?? System.DBNull.Value;
dr["tel_cpostdigito"] = (object)this.tel_cpostdigito ?? System.DBNull.Value;
dr["tel_norden"] = (object)this.tel_norden ?? System.DBNull.Value;
dr["tel_ntr"] = (object)this.tel_ntr ?? System.DBNull.Value;
dr["tel_cclave"] = (object)this.tel_cclave ?? System.DBNull.Value;
dr["tel_cpermiso"] = (object)this.tel_cpermiso ?? System.DBNull.Value;
dr["tel_nsms"] = (object)this.tel_nsms ?? System.DBNull.Value;
dr["tel_cinternacional"] = (object)this.tel_cinternacional ?? System.DBNull.Value;
dr["tel_ccountrycode"] = (object)this.tel_ccountrycode ?? System.DBNull.Value;
dr["tel_iismobile"] = (object)this.tel_iismobile ?? System.DBNull.Value;
							 
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
