
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
    ///m_comprobantes_cab_fc Slbf Class
    ///</summary>
    [DataContract]
    public class Simplem_comprobantes_cab_fc : SimpleBaseObject
    { 
			 ///<summary>
     ///cbc_icliente   
     ///</summary>
	 [DataMember]
     public int cbc_icliente { get;set;} 
	  ///<summary>
     ///cbc_dfecha   
     ///</summary>
	 [DataMember]
     public DateTime? cbc_dfecha { get;set;} 
	  ///<summary>
     ///cbc_ctipocbte   
     ///</summary>
	 [DataMember]
     public string cbc_ctipocbte { get;set;} 
	  ///<summary>
     ///cbc_cprefijocbte   
     ///</summary>
	 [DataMember]
     public string cbc_cprefijocbte { get;set;} 
	  ///<summary>
     ///cbc_inumerocbte   
     ///</summary>
	 [DataMember]
     public int cbc_inumerocbte { get;set;} 
	  ///<summary>
     ///cbc_ysubtotal   
     ///</summary>
	 [DataMember]
     public Decimal cbc_ysubtotal { get;set;} 
	  ///<summary>
     ///cbc_yimpuesto1   
     ///</summary>
	 [DataMember]
     public Decimal cbc_yimpuesto1 { get;set;} 
	  ///<summary>
     ///cbc_yimpuesto2   
     ///</summary>
	 [DataMember]
     public Decimal cbc_yimpuesto2 { get;set;} 
	  ///<summary>
     ///cbc_yimpuesto3   
     ///</summary>
	 [DataMember]
     public Decimal cbc_yimpuesto3 { get;set;} 
	  ///<summary>
     ///cbc_ytotal   
     ///</summary>
	 [DataMember]
     public Decimal cbc_ytotal { get;set;} 
	  ///<summary>
     ///cbc_cestado   
     ///</summary>
	 [DataMember]
     public string cbc_cestado { get;set;} 
	  ///<summary>
     ///cbc_ccae   
     ///</summary>
	 [DataMember]
     public string cbc_ccae { get;set;} 
	  ///<summary>
     ///cbc_cvtocae   
     ///</summary>
	 [DataMember]
     public string cbc_cvtocae { get;set;} 
	  ///<summary>
     ///cbc_iversion   
     ///</summary>
	 [DataMember]
     public int cbc_iversion { get;set;} 
	 ///<summary>
        ///m_comprobantes_cab_fc Constructor
        ///</summary>
        public Simplem_comprobantes_cab_fc() : base()
  {
  InitClass();
  }
        ///<summary>
        ///m_comprobantes_cab_fc Constructor
        ///</summary>
        public Simplem_comprobantes_cab_fc(int Id, string Name, int cbc_icliente, DateTime? cbc_dfecha, string cbc_ctipocbte, string cbc_cprefijocbte, int cbc_inumerocbte, Decimal cbc_ysubtotal, Decimal cbc_yimpuesto1, Decimal cbc_yimpuesto2, Decimal cbc_yimpuesto3, Decimal cbc_ytotal, string cbc_cestado, string cbc_ccae, string cbc_cvtocae, int cbc_iversion) : base()
        {
            base.Id = Id;
						base.Name = Name;				 																																					 
				    this.cbc_icliente = cbc_icliente;
this.cbc_dfecha = cbc_dfecha;
this.cbc_ctipocbte = cbc_ctipocbte;
this.cbc_cprefijocbte = cbc_cprefijocbte;
this.cbc_inumerocbte = cbc_inumerocbte;
this.cbc_ysubtotal = cbc_ysubtotal;
this.cbc_yimpuesto1 = cbc_yimpuesto1;
this.cbc_yimpuesto2 = cbc_yimpuesto2;
this.cbc_yimpuesto3 = cbc_yimpuesto3;
this.cbc_ytotal = cbc_ytotal;
this.cbc_cestado = cbc_cestado;
this.cbc_ccae = cbc_ccae;
this.cbc_cvtocae = cbc_cvtocae;
this.cbc_iversion = cbc_iversion;

            InitClass();
        }  								

				private void InitClass()
        {														
  				  base.Type = new ObjectType(3151, "m_comprobantes_cab_fc");
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
			BaseObject Object = new Dalm_comprobantes_cab_fc(SqlConfig, UserId, this);
			if(this.CallerObject != null)
			   Object.CallerObject = this.CallerObject;			
			return Object;
		}
///<summary>
    ///Get parent object
    ///</summary>
		public override CallerObject GetCallerObject()
		{
			Callerm_comprobantes_cab_fc Caller = new Callerm_comprobantes_cab_fc();
			Caller.Id = base.Id;
			Caller.Name = base.Name;
			Caller.cbc_icliente = this.cbc_icliente;
Caller.cbc_dfecha = this.cbc_dfecha;
Caller.cbc_ctipocbte = this.cbc_ctipocbte;
Caller.cbc_cprefijocbte = this.cbc_cprefijocbte;
Caller.cbc_inumerocbte = this.cbc_inumerocbte;
Caller.cbc_ysubtotal = this.cbc_ysubtotal;
Caller.cbc_yimpuesto1 = this.cbc_yimpuesto1;
Caller.cbc_yimpuesto2 = this.cbc_yimpuesto2;
Caller.cbc_yimpuesto3 = this.cbc_yimpuesto3;
Caller.cbc_ytotal = this.cbc_ytotal;
Caller.cbc_cestado = this.cbc_cestado;
Caller.cbc_ccae = this.cbc_ccae;
Caller.cbc_cvtocae = this.cbc_cvtocae;
Caller.cbc_iversion = this.cbc_iversion;

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
               dt.Columns.Add(new DataColumn("cbc_icliente", typeof (int)));               
							 dt.Columns.Add(new DataColumn("cbc_dfecha", typeof (DateTime)));               
							 dt.Columns.Add(new DataColumn("cbc_ctipocbte", typeof (string)));               
							 dt.Columns.Add(new DataColumn("cbc_cprefijocbte", typeof (string)));               
							 dt.Columns.Add(new DataColumn("cbc_inumerocbte", typeof (int)));               
							 dt.Columns.Add(new DataColumn("cbc_ysubtotal", typeof (Decimal)));               
							 dt.Columns.Add(new DataColumn("cbc_yimpuesto1", typeof (Decimal)));               
							 dt.Columns.Add(new DataColumn("cbc_yimpuesto2", typeof (Decimal)));               
							 dt.Columns.Add(new DataColumn("cbc_yimpuesto3", typeof (Decimal)));               
							 dt.Columns.Add(new DataColumn("cbc_ytotal", typeof (Decimal)));               
							 dt.Columns.Add(new DataColumn("cbc_cestado", typeof (string)));               
							 dt.Columns.Add(new DataColumn("cbc_ccae", typeof (string)));               
							 dt.Columns.Add(new DataColumn("cbc_cvtocae", typeof (string)));               
							 dt.Columns.Add(new DataColumn("cbc_iversion", typeof (int)));               
							 										
               //create Row  
               dr = dt.NewRow();
               
               //set Row
							 dr["Id"] = base.Id;

							 dr["Name"] = base.Name;
dr["cbc_icliente"] = (object)this.cbc_icliente ?? System.DBNull.Value;
dr["cbc_dfecha"] = (object)this.cbc_dfecha ?? System.DBNull.Value;
dr["cbc_ctipocbte"] = (object)this.cbc_ctipocbte ?? System.DBNull.Value;
dr["cbc_cprefijocbte"] = (object)this.cbc_cprefijocbte ?? System.DBNull.Value;
dr["cbc_inumerocbte"] = (object)this.cbc_inumerocbte ?? System.DBNull.Value;
dr["cbc_ysubtotal"] = (object)this.cbc_ysubtotal ?? System.DBNull.Value;
dr["cbc_yimpuesto1"] = (object)this.cbc_yimpuesto1 ?? System.DBNull.Value;
dr["cbc_yimpuesto2"] = (object)this.cbc_yimpuesto2 ?? System.DBNull.Value;
dr["cbc_yimpuesto3"] = (object)this.cbc_yimpuesto3 ?? System.DBNull.Value;
dr["cbc_ytotal"] = (object)this.cbc_ytotal ?? System.DBNull.Value;
dr["cbc_cestado"] = (object)this.cbc_cestado ?? System.DBNull.Value;
dr["cbc_ccae"] = (object)this.cbc_ccae ?? System.DBNull.Value;
dr["cbc_cvtocae"] = (object)this.cbc_cvtocae ?? System.DBNull.Value;
dr["cbc_iversion"] = (object)this.cbc_iversion ?? System.DBNull.Value;
							 
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
