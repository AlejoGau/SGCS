
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
    ///m_cuenta_corriente_fc Slbf Class
    ///</summary>
    [DataContract]
    public class Simplem_cuenta_corriente_fc : SimpleBaseObject
    { 
			 ///<summary>
     ///cta_iCodigoCbte   
     ///</summary>
	 [DataMember]
     public int cta_iCodigoCbte { get;set;} 
	  ///<summary>
     ///cta_nCuota   
     ///</summary>
	 [DataMember]
     public Decimal cta_nCuota { get;set;} 
	  ///<summary>
     ///cta_yTotal   
     ///</summary>
	 [DataMember]
     public Decimal cta_yTotal { get;set;} 
	  ///<summary>
     ///cta_ySaldo   
     ///</summary>
	 [DataMember]
     public Decimal cta_ySaldo { get;set;} 
	  ///<summary>
     ///cta_dVencimiento   
     ///</summary>
	 [DataMember]
     public DateTime? cta_dVencimiento { get;set;} 
	  ///<summary>
     ///cta_dCobro   
     ///</summary>
	 [DataMember]
     public DateTime? cta_dCobro { get;set;} 
	 ///<summary>
        ///m_cuenta_corriente_fc Constructor
        ///</summary>
        public Simplem_cuenta_corriente_fc() : base()
  {
  InitClass();
  }
        ///<summary>
        ///m_cuenta_corriente_fc Constructor
        ///</summary>
        public Simplem_cuenta_corriente_fc(int Id, string Name, int cta_iCodigoCbte, Decimal cta_nCuota, Decimal cta_yTotal, Decimal cta_ySaldo, DateTime? cta_dVencimiento, DateTime? cta_dCobro) : base()
        {
            base.Id = Id;
						base.Name = Name;				 																																					 
				    this.cta_iCodigoCbte = cta_iCodigoCbte;
this.cta_nCuota = cta_nCuota;
this.cta_yTotal = cta_yTotal;
this.cta_ySaldo = cta_ySaldo;
this.cta_dVencimiento = cta_dVencimiento;
this.cta_dCobro = cta_dCobro;

            InitClass();
        }  								

				private void InitClass()
        {														
  				  base.Type = new ObjectType(3168, "m_cuenta_corriente_fc");
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
			BaseObject Object = new Dalm_cuenta_corriente_fc(SqlConfig, UserId, this);
			if(this.CallerObject != null)
			   Object.CallerObject = this.CallerObject;			
			return Object;
		}
///<summary>
    ///Get parent object
    ///</summary>
		public override CallerObject GetCallerObject()
		{
			Callerm_cuenta_corriente_fc Caller = new Callerm_cuenta_corriente_fc();
			Caller.Id = base.Id;
			Caller.Name = base.Name;
			Caller.cta_iCodigoCbte = this.cta_iCodigoCbte;
Caller.cta_nCuota = this.cta_nCuota;
Caller.cta_yTotal = this.cta_yTotal;
Caller.cta_ySaldo = this.cta_ySaldo;
Caller.cta_dVencimiento = this.cta_dVencimiento;
Caller.cta_dCobro = this.cta_dCobro;

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
               dt.Columns.Add(new DataColumn("cta_iCodigoCbte", typeof (int)));               
							 dt.Columns.Add(new DataColumn("cta_nCuota", typeof (Decimal)));               
							 dt.Columns.Add(new DataColumn("cta_yTotal", typeof (Decimal)));               
							 dt.Columns.Add(new DataColumn("cta_ySaldo", typeof (Decimal)));               
							 dt.Columns.Add(new DataColumn("cta_dVencimiento", typeof (DateTime)));               
							 dt.Columns.Add(new DataColumn("cta_dCobro", typeof (DateTime)));               
							 										
               //create Row  
               dr = dt.NewRow();
               
               //set Row
							 dr["Id"] = base.Id;

							 dr["Name"] = base.Name;
dr["cta_iCodigoCbte"] = (object)this.cta_iCodigoCbte ?? System.DBNull.Value;
dr["cta_nCuota"] = (object)this.cta_nCuota ?? System.DBNull.Value;
dr["cta_yTotal"] = (object)this.cta_yTotal ?? System.DBNull.Value;
dr["cta_ySaldo"] = (object)this.cta_ySaldo ?? System.DBNull.Value;
dr["cta_dVencimiento"] = (object)this.cta_dVencimiento ?? System.DBNull.Value;
dr["cta_dCobro"] = (object)this.cta_dCobro ?? System.DBNull.Value;
							 
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
