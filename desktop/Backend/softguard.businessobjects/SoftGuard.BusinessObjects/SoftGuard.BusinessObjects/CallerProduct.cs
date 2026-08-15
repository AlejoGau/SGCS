
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
    public class CallerProduct : CallerObject
    { 	
				     private string _SmallComment;
					
				     private string _LargeComment;
					
				     private string _Body;
					
				     private string _Available;
					
				     private Decimal _Price;
					
				     private string _Structure;
					
				     private int _Weight;
					
				     private string _MetaDescription;
					
				     private string _MetaKeywords;
					
				     private string _Status;
					
				     private int _AttachId;
					
				     private string _Code;
					
				     private Decimal _VAT;
					
				     private Decimal _Cost;
					
				     private string _MeasureUnit;
					
				     private int _pro_iidorganizacion;
					
				     private int _pro_itipo;
					
				     private string _pro_currency;
					
				     private int _pro_cantidad_auto;
				 ///<summary>
     ///SmallComment property   
     ///</summary>   
     public string SmallComment 
		 { 
		        
                    get{ return this._SmallComment; }
        						set{ this._SmallComment = value; } 										
	   }
	  ///<summary>
     ///LargeComment property   
     ///</summary>   
     public string LargeComment 
		 { 
		        
                    get{ return this._LargeComment; }
        						set{ this._LargeComment = value; } 										
	   }
	  ///<summary>
     ///Body property   
     ///</summary>   
     public string Body 
		 { 
		        
                    get{ return this._Body; }
        						set{ this._Body = value; } 										
	   }
	  ///<summary>
     ///Available property   
     ///</summary>   
     public string Available 
		 { 
		        
                    get{ return this._Available; }
        						set{ this._Available = value; } 										
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
     ///Structure property   
     ///</summary>   
     public string Structure 
		 { 
		        
                    get{ return this._Structure; }
        						set{ this._Structure = value; } 										
	   }
	  ///<summary>
     ///Weight property   
     ///</summary>   
     public int Weight 
		 { 
		        
                    get{ return this._Weight; }
        						set{ this._Weight = value; } 										
	   }
	  ///<summary>
     ///MetaDescription property   
     ///</summary>   
     public string MetaDescription 
		 { 
		        
                    get{ return this._MetaDescription; }
        						set{ this._MetaDescription = value; } 										
	   }
	  ///<summary>
     ///MetaKeywords property   
     ///</summary>   
     public string MetaKeywords 
		 { 
		        
                    get{ return this._MetaKeywords; }
        						set{ this._MetaKeywords = value; } 										
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
     ///AttachId property   
     ///</summary>   
     public int AttachId 
		 { 
		        
                    get{ return this._AttachId; }
        						set{ this._AttachId = value; } 										
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
     ///Cost property   
     ///</summary>   
     public Decimal Cost 
		 { 
		        
                    get{ return this._Cost; }
        						set{ this._Cost = value; } 										
	   }
	  ///<summary>
     ///MeasureUnit property   
     ///</summary>   
     public string MeasureUnit 
		 { 
		        
                    get{ return this._MeasureUnit; }
        						set{ this._MeasureUnit = value; } 										
	   }
	  ///<summary>
     ///pro_iidorganizacion property   
     ///</summary>   
     public int pro_iidorganizacion 
		 { 
		        
                    get{ return this._pro_iidorganizacion; }
        						set{ this._pro_iidorganizacion = value; } 										
	   }
	  ///<summary>
     ///pro_itipo property   
     ///</summary>   
     public int pro_itipo 
		 { 
		        
                    get{ return this._pro_itipo; }
        						set{ this._pro_itipo = value; } 										
	   }
	  ///<summary>
     ///pro_currency property   
     ///</summary>   
     public string pro_currency 
		 { 
		        
                    get{ return this._pro_currency; }
        						set{ this._pro_currency = value; } 										
	   }
	  ///<summary>
     ///pro_cantidad_auto property   
     ///</summary>   
     public int pro_cantidad_auto 
		 { 
		        
                    get{ return this._pro_cantidad_auto; }
        						set{ this._pro_cantidad_auto = value; } 										
	   }
	  ///<summary>
     ///Constructor   
     ///</summary>
        public CallerProduct() : base()
        {
            InitClass();
        }  
 ///<summary>
     ///Constructor   
     ///</summary>		
        public CallerProduct(int Id, string Name, string SmallComment, string LargeComment, string Body, string Available, Decimal Price, string Structure, int Weight, string MetaDescription, string MetaKeywords, string Status, int AttachId, string Code, Decimal VAT, Decimal Cost, string MeasureUnit, int pro_iidorganizacion, int pro_itipo, string pro_currency, int pro_cantidad_auto) : base()
        {
            base.Id = Id;
						base.Name = Name;				 																																					 
				    this._SmallComment = SmallComment;
this._LargeComment = LargeComment;
this._Body = Body;
this._Available = Available;
this._Price = Price;
this._Structure = Structure;
this._Weight = Weight;
this._MetaDescription = MetaDescription;
this._MetaKeywords = MetaKeywords;
this._Status = Status;
this._AttachId = AttachId;
this._Code = Code;
this._VAT = VAT;
this._Cost = Cost;
this._MeasureUnit = MeasureUnit;
this._pro_iidorganizacion = pro_iidorganizacion;
this._pro_itipo = pro_itipo;
this._pro_currency = pro_currency;
this._pro_cantidad_auto = pro_cantidad_auto;

            InitClass();
        }  								

				private void InitClass()
        {														
  				  base.Type = new ObjectType(403, "Product");
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
			SimpleProduct Simple = new SimpleProduct();
			Simple.Id = base.Id;
			Simple.Name = base.Name;
			Simple.SmallComment = this._SmallComment;
Simple.LargeComment = this._LargeComment;
Simple.Body = this._Body;
Simple.Available = this._Available;
Simple.Price = this._Price;
Simple.Structure = this._Structure;
Simple.Weight = this._Weight;
Simple.MetaDescription = this._MetaDescription;
Simple.MetaKeywords = this._MetaKeywords;
Simple.Status = this._Status;
Simple.AttachId = this._AttachId;
Simple.Code = this._Code;
Simple.VAT = this._VAT;
Simple.Cost = this._Cost;
Simple.MeasureUnit = this._MeasureUnit;
Simple.pro_iidorganizacion = this._pro_iidorganizacion;
Simple.pro_itipo = this._pro_itipo;
Simple.pro_currency = this._pro_currency;
Simple.pro_cantidad_auto = this._pro_cantidad_auto;

			return (SimpleBaseObject) Simple;
		}
 ///<summary>
     ///Sets a simpleobject   
     ///</summary>	
		public void SetSimpleObject(SimpleProduct Simple)
		{
			base.Id = Simple.Id;
			base.Name = Simple.Name;
			this._SmallComment = Simple.SmallComment;
this._LargeComment = Simple.LargeComment;
this._Body = Simple.Body;
this._Available = Simple.Available;
this._Price = Simple.Price;
this._Structure = Simple.Structure;
this._Weight = Simple.Weight;
this._MetaDescription = Simple.MetaDescription;
this._MetaKeywords = Simple.MetaKeywords;
this._Status = Simple.Status;
this._AttachId = Simple.AttachId;
this._Code = Simple.Code;
this._VAT = Simple.VAT;
this._Cost = Simple.Cost;
this._MeasureUnit = Simple.MeasureUnit;
this._pro_iidorganizacion = Simple.pro_iidorganizacion;
this._pro_itipo = Simple.pro_itipo;
this._pro_currency = Simple.pro_currency;
this._pro_cantidad_auto = Simple.pro_cantidad_auto;

		}
 ///<summary>
     ///Gets a baseobject   
     ///</summary>
		public override BaseObject GetBaseObject(SqlHelper SqlConfig, int UserId)
		{
			return new DalProduct(SqlConfig, UserId, (SimpleProduct) GetSimpleObject());
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
               dt.Columns.Add(new DataColumn("SmallComment", typeof (string)));               
							 dt.Columns.Add(new DataColumn("LargeComment", typeof (string)));               
							 dt.Columns.Add(new DataColumn("Body", typeof (string)));               
							 dt.Columns.Add(new DataColumn("Available", typeof (string)));               
							 dt.Columns.Add(new DataColumn("Price", typeof (Decimal)));               
							 dt.Columns.Add(new DataColumn("Structure", typeof (string)));               
							 dt.Columns.Add(new DataColumn("Weight", typeof (int)));               
							 dt.Columns.Add(new DataColumn("MetaDescription", typeof (string)));               
							 dt.Columns.Add(new DataColumn("MetaKeywords", typeof (string)));               
							 dt.Columns.Add(new DataColumn("Status", typeof (string)));               
							 dt.Columns.Add(new DataColumn("AttachId", typeof (int)));               
							 dt.Columns.Add(new DataColumn("Code", typeof (string)));               
							 dt.Columns.Add(new DataColumn("VAT", typeof (Decimal)));               
							 dt.Columns.Add(new DataColumn("Cost", typeof (Decimal)));               
							 dt.Columns.Add(new DataColumn("MeasureUnit", typeof (string)));               
							 dt.Columns.Add(new DataColumn("pro_iidorganizacion", typeof (int)));               
							 dt.Columns.Add(new DataColumn("pro_itipo", typeof (int)));               
							 dt.Columns.Add(new DataColumn("pro_currency", typeof (string)));               
							 dt.Columns.Add(new DataColumn("pro_cantidad_auto", typeof (int)));               
							 										
               //create Row  
               dr = dt.NewRow();
               
               //set Row
							 dr["Id"] = base.Id;

							 dr["Name"] = base.Name;
dr["SmallComment"] = this._SmallComment;
dr["LargeComment"] = this._LargeComment;
dr["Body"] = this._Body;
dr["Available"] = this._Available;
dr["Price"] = this._Price;
dr["Structure"] = this._Structure;
dr["Weight"] = this._Weight;
dr["MetaDescription"] = this._MetaDescription;
dr["MetaKeywords"] = this._MetaKeywords;
dr["Status"] = this._Status;
dr["AttachId"] = this._AttachId;
dr["Code"] = this._Code;
dr["VAT"] = this._VAT;
dr["Cost"] = this._Cost;
dr["MeasureUnit"] = this._MeasureUnit;
dr["pro_iidorganizacion"] = this._pro_iidorganizacion;
dr["pro_itipo"] = this._pro_itipo;
dr["pro_currency"] = this._pro_currency;
dr["pro_cantidad_auto"] = this._pro_cantidad_auto;
							 
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
