
    using System;
    using System.Xml;
    using System.Data;
    using Slbf;
    using Slbf.Helpers;	    	 

namespace SoftGuard.BusinessObjects
{ 	
   ///<summary>
     ///Caller object class   
     ///</summary>
    public class Callercrm_contrato_item : CallerObject
    { 	
				     private int _idcontrato;
					
				     private Decimal _Price;
					
				     private string _Currency;
					
				     private string _Status;
					
				     private string _Description;
					
				     private int _Quantity;
					
				     private int _QuantityDelivered;
					
				     private string _Code;
					
				     private Decimal _VAT;
					
				     private int _ProductId;
					
				     private int _idlista;
				 ///<summary>
     ///idcontrato property   
     ///</summary>   
     public int idcontrato 
		 { 
		        
                    get{ return this._idcontrato; }
        						set{ this._idcontrato = value; } 										
	   }
	  ///<summary>
     ///Price property   
     ///</summary>   
     public Decimal Price 
		 { 
		        
                    get{ return this._Price; }
        						set{ this._Price = value; } 										
	   }
	  ///<summary>
     ///Currency property   
     ///</summary>   
     public string Currency 
		 { 
		        
                    get{ return this._Currency; }
        						set{ this._Currency = value; } 										
	   }
	  ///<summary>
     ///Status property   
     ///</summary>   
     public string Status 
		 { 
		        
                    get{ return this._Status; }
        						set{ this._Status = value; } 										
	   }
	  ///<summary>
     ///Description property   
     ///</summary>   
     public string Description 
		 { 
		        
                    get{ return this._Description; }
        						set{ this._Description = value; } 										
	   }
	  ///<summary>
     ///Quantity property   
     ///</summary>   
     public int Quantity 
		 { 
		        
                    get{ return this._Quantity; }
        						set{ this._Quantity = value; } 										
	   }
	  ///<summary>
     ///QuantityDelivered property   
     ///</summary>   
     public int QuantityDelivered 
		 { 
		        
                    get{ return this._QuantityDelivered; }
        						set{ this._QuantityDelivered = value; } 										
	   }
	  ///<summary>
     ///Code property   
     ///</summary>   
     public string Code 
		 { 
		        
                    get{ return this._Code; }
        						set{ this._Code = value; } 										
	   }
	  ///<summary>
     ///VAT property   
     ///</summary>   
     public Decimal VAT 
		 { 
		        
                    get{ return this._VAT; }
        						set{ this._VAT = value; } 										
	   }
	  ///<summary>
     ///ProductId property   
     ///</summary>   
     public int ProductId 
		 { 
		        
                    get{ return this._ProductId; }
        						set{ this._ProductId = value; } 										
	   }
	  ///<summary>
     ///idlista property   
     ///</summary>   
     public int idlista 
		 { 
		        
                    get{ return this._idlista; }
        						set{ this._idlista = value; } 										
	   }
	  ///<summary>
     ///Constructor   
     ///</summary>
        public Callercrm_contrato_item() : base()
        {
            InitClass();
        }  
 ///<summary>
     ///Constructor   
     ///</summary>		
        public Callercrm_contrato_item(int Id, string Name, int idcontrato, Decimal Price, string Currency, string Status, string Description, int Quantity, int QuantityDelivered, string Code, Decimal VAT, int ProductId, int idlista) : base()
        {
            base.Id = Id;
						base.Name = Name;				 																																					 
				    this._idcontrato = idcontrato;
this._Price = Price;
this._Currency = Currency;
this._Status = Status;
this._Description = Description;
this._Quantity = Quantity;
this._QuantityDelivered = QuantityDelivered;
this._Code = Code;
this._VAT = VAT;
this._ProductId = ProductId;
this._idlista = idlista;

            InitClass();
        }  								

				private void InitClass()
        {														
  				  base.Type = new ObjectType(3150, "crm_contrato_item");
        }
 ///<summary>
     ///Gets the caller object   
     ///</summary>		
		public override CallerObject GetObject()
		{
			return (CallerObject) this;
		}
 ///<summary>
     ///Gets a simpleobject   
     ///</summary>	
		public override SimpleBaseObject GetSimpleObject()
		{
			Simplecrm_contrato_item Simple = new Simplecrm_contrato_item();
			Simple.Id = base.Id;
			Simple.Name = base.Name;
			Simple.idcontrato = this._idcontrato;
Simple.Price = this._Price;
Simple.Currency = this._Currency;
Simple.Status = this._Status;
Simple.Description = this._Description;
Simple.Quantity = this._Quantity;
Simple.QuantityDelivered = this._QuantityDelivered;
Simple.Code = this._Code;
Simple.VAT = this._VAT;
Simple.ProductId = this._ProductId;
Simple.idlista = this._idlista;

			return (SimpleBaseObject) Simple;
		}
 ///<summary>
     ///Sets a simpleobject   
     ///</summary>	
		public void SetSimpleObject(Simplecrm_contrato_item Simple)
		{
			base.Id = Simple.Id;
			base.Name = Simple.Name;
			this._idcontrato = Simple.idcontrato;
this._Price = Simple.Price;
this._Currency = Simple.Currency;
this._Status = Simple.Status;
this._Description = Simple.Description;
this._Quantity = Simple.Quantity;
this._QuantityDelivered = Simple.QuantityDelivered;
this._Code = Simple.Code;
this._VAT = Simple.VAT;
this._ProductId = Simple.ProductId;
this._idlista = Simple.idlista;

		}
 ///<summary>
     ///Gets a baseobject   
     ///</summary>
		public override BaseObject GetBaseObject(SqlHelper SqlConfig, int UserId)
		{
			return new Dalcrm_contrato_item(SqlConfig, UserId, (Simplecrm_contrato_item) GetSimpleObject());
		}
 ///<summary>
     ///Get object's data   
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
dr["idcontrato"] = this._idcontrato;
dr["Price"] = this._Price;
dr["Currency"] = this._Currency;
dr["Status"] = this._Status;
dr["Description"] = this._Description;
dr["Quantity"] = this._Quantity;
dr["QuantityDelivered"] = this._QuantityDelivered;
dr["Code"] = this._Code;
dr["VAT"] = this._VAT;
dr["ProductId"] = this._ProductId;
dr["idlista"] = this._idlista;
							 
               //Insert Row in Table
               dt.Rows.Add(dr);
							 
							 return dt;	 
												    
        }
 ///<summary>
     ///Get object's Xml representation   
     ///</summary>
	public override XmlDataDocument GetXmlObject()
    {
			DataSet ds = new DataSet("Caller"); 
			ds.EnforceConstraints = false;														                
               							 
			ds.Tables.Add(GetDataObject());
			ds.Tables.Add(this.Type.GetDataObject());
			XmlDataDocument XmlDoc = new XmlDataDocument(ds);
			if(this.Relation != null)
				XmlDoc.SelectSingleNode("//Caller").InnerXml += this.Relation.Values.GetXmlObjects().InnerXml;
			return XmlDoc;	
    }
 }

}
