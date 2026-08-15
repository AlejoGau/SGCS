
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
    ///crm_contrato_item Slbf Class
    ///</summary>
    [DataContract]
    public class Simplecrm_contrato_item : SimpleBaseObject
    { 
			 ///<summary>
     ///idcontrato   
     ///</summary>
	 [DataMember]
     public int idcontrato { get;set;} 
	  ///<summary>
     ///Price   
     ///</summary>
	 [DataMember]
     public Decimal Price { get;set;} 
	  ///<summary>
     ///Currency   
     ///</summary>
	 [DataMember]
     public string Currency { get;set;} 
	  ///<summary>
     ///Status   
     ///</summary>
	 [DataMember]
     public string Status { get;set;} 
	  ///<summary>
     ///Description   
     ///</summary>
	 [DataMember]
     public string Description { get;set;} 
	  ///<summary>
     ///Quantity   
     ///</summary>
	 [DataMember]
     public int Quantity { get;set;} 
	  ///<summary>
     ///QuantityDelivered   
     ///</summary>
	 [DataMember]
     public int QuantityDelivered { get;set;} 
	  ///<summary>
     ///Code   
     ///</summary>
	 [DataMember]
     public string Code { get;set;} 
	  ///<summary>
     ///VAT   
     ///</summary>
	 [DataMember]
     public Decimal VAT { get;set;} 
	  ///<summary>
     ///ProductId   
     ///</summary>
	 [DataMember]
     public int ProductId { get;set;} 
	  ///<summary>
     ///idlista   
     ///</summary>
	 [DataMember]
     public int idlista { get;set;} 
	 ///<summary>
        ///crm_contrato_item Constructor
        ///</summary>
        public Simplecrm_contrato_item() : base()
  {
  InitClass();
  }
        ///<summary>
        ///crm_contrato_item Constructor
        ///</summary>
        public Simplecrm_contrato_item(int Id, string Name, int idcontrato, Decimal Price, string Currency, string Status, string Description, int Quantity, int QuantityDelivered, string Code, Decimal VAT, int ProductId, int idlista) : base()
        {
            base.Id = Id;
						base.Name = Name;				 																																					 
				    this.idcontrato = idcontrato;
this.Price = Price;
this.Currency = Currency;
this.Status = Status;
this.Description = Description;
this.Quantity = Quantity;
this.QuantityDelivered = QuantityDelivered;
this.Code = Code;
this.VAT = VAT;
this.ProductId = ProductId;
this.idlista = idlista;

            InitClass();
        }  								

				private void InitClass()
        {														
  				  base.Type = new ObjectType(3150, "crm_contrato_item");
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
			BaseObject Object = new Dalcrm_contrato_item(SqlConfig, UserId, this);
			if(this.CallerObject != null)
			   Object.CallerObject = this.CallerObject;			
			return Object;
		}
///<summary>
    ///Get parent object
    ///</summary>
		public override CallerObject GetCallerObject()
		{
			Callercrm_contrato_item Caller = new Callercrm_contrato_item();
			Caller.Id = base.Id;
			Caller.Name = base.Name;
			Caller.idcontrato = this.idcontrato;
Caller.Price = this.Price;
Caller.Currency = this.Currency;
Caller.Status = this.Status;
Caller.Description = this.Description;
Caller.Quantity = this.Quantity;
Caller.QuantityDelivered = this.QuantityDelivered;
Caller.Code = this.Code;
Caller.VAT = this.VAT;
Caller.ProductId = this.ProductId;
Caller.idlista = this.idlista;

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
               dt.Columns.Add(new DataColumn("idcontrato", typeof (int)));               
							 dt.Columns.Add(new DataColumn("Price", typeof (Decimal)));               
							 dt.Columns.Add(new DataColumn("Currency", typeof (string)));               
							 dt.Columns.Add(new DataColumn("Status", typeof (string)));               
							 dt.Columns.Add(new DataColumn("Description", typeof (string)));               
							 dt.Columns.Add(new DataColumn("Quantity", typeof (int)));               
							 dt.Columns.Add(new DataColumn("QuantityDelivered", typeof (int)));               
							 dt.Columns.Add(new DataColumn("Code", typeof (string)));               
							 dt.Columns.Add(new DataColumn("VAT", typeof (Decimal)));               
							 dt.Columns.Add(new DataColumn("ProductId", typeof (int)));               
							 dt.Columns.Add(new DataColumn("idlista", typeof (int)));               
							 										
               //create Row  
               dr = dt.NewRow();
               
               //set Row
							 dr["Id"] = base.Id;

							 dr["Name"] = base.Name;
dr["idcontrato"] = (object)this.idcontrato ?? System.DBNull.Value;
dr["Price"] = (object)this.Price ?? System.DBNull.Value;
dr["Currency"] = (object)this.Currency ?? System.DBNull.Value;
dr["Status"] = (object)this.Status ?? System.DBNull.Value;
dr["Description"] = (object)this.Description ?? System.DBNull.Value;
dr["Quantity"] = (object)this.Quantity ?? System.DBNull.Value;
dr["QuantityDelivered"] = (object)this.QuantityDelivered ?? System.DBNull.Value;
dr["Code"] = (object)this.Code ?? System.DBNull.Value;
dr["VAT"] = (object)this.VAT ?? System.DBNull.Value;
dr["ProductId"] = (object)this.ProductId ?? System.DBNull.Value;
dr["idlista"] = (object)this.idlista ?? System.DBNull.Value;
							 
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
