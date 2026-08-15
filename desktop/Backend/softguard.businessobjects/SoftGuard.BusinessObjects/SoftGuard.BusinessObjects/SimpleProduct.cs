
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
    ///Product Slbf Class
    ///</summary>
    [DataContract]
    public class SimpleProduct : SimpleBaseObject
    { 
			 ///<summary>
     ///SmallComment   
     ///</summary>
	 [DataMember]
     public string SmallComment { get;set;} 
	  ///<summary>
     ///LargeComment   
     ///</summary>
	 [DataMember]
     public string LargeComment { get;set;} 
	  ///<summary>
     ///Body   
     ///</summary>
	 [DataMember]
     public string Body { get;set;} 
	  ///<summary>
     ///Available   
     ///</summary>
	 [DataMember]
     public string Available { get;set;} 
	  ///<summary>
     ///Price   
     ///</summary>
	 [DataMember]
     public Decimal Price { get;set;} 
	  ///<summary>
     ///Structure   
     ///</summary>
	 [DataMember]
     public string Structure { get;set;} 
	  ///<summary>
     ///Weight   
     ///</summary>
	 [DataMember]
     public int Weight { get;set;} 
	  ///<summary>
     ///MetaDescription   
     ///</summary>
	 [DataMember]
     public string MetaDescription { get;set;} 
	  ///<summary>
     ///MetaKeywords   
     ///</summary>
	 [DataMember]
     public string MetaKeywords { get;set;} 
	  ///<summary>
     ///Status   
     ///</summary>
	 [DataMember]
     public string Status { get;set;} 
	  ///<summary>
     ///AttachId   
     ///</summary>
	 [DataMember]
     public int AttachId { get;set;} 
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
     ///Cost   
     ///</summary>
	 [DataMember]
     public Decimal Cost { get;set;} 
	  ///<summary>
     ///MeasureUnit   
     ///</summary>
	 [DataMember]
     public string MeasureUnit { get;set;} 
	  ///<summary>
     ///pro_iidorganizacion   
     ///</summary>
	 [DataMember]
     public int pro_iidorganizacion { get;set;} 
	  ///<summary>
     ///pro_itipo   
     ///</summary>
	 [DataMember]
     public int pro_itipo { get;set;} 
	  ///<summary>
     ///pro_currency   
     ///</summary>
	 [DataMember]
     public string pro_currency { get;set;} 
	  ///<summary>
     ///pro_cantidad_auto   
     ///</summary>
	 [DataMember]
     public int pro_cantidad_auto { get;set;} 
	 ///<summary>
        ///Product Constructor
        ///</summary>
        public SimpleProduct() : base()
  {
  InitClass();
  }
        ///<summary>
        ///Product Constructor
        ///</summary>
        public SimpleProduct(int Id, string Name, string SmallComment, string LargeComment, string Body, string Available, Decimal Price, string Structure, int Weight, string MetaDescription, string MetaKeywords, string Status, int AttachId, string Code, Decimal VAT, Decimal Cost, string MeasureUnit, int pro_iidorganizacion, int pro_itipo, string pro_currency, int pro_cantidad_auto) : base()
        {
            base.Id = Id;
						base.Name = Name;				 																																					 
				    this.SmallComment = SmallComment;
this.LargeComment = LargeComment;
this.Body = Body;
this.Available = Available;
this.Price = Price;
this.Structure = Structure;
this.Weight = Weight;
this.MetaDescription = MetaDescription;
this.MetaKeywords = MetaKeywords;
this.Status = Status;
this.AttachId = AttachId;
this.Code = Code;
this.VAT = VAT;
this.Cost = Cost;
this.MeasureUnit = MeasureUnit;
this.pro_iidorganizacion = pro_iidorganizacion;
this.pro_itipo = pro_itipo;
this.pro_currency = pro_currency;
this.pro_cantidad_auto = pro_cantidad_auto;

            InitClass();
        }  								

				private void InitClass()
        {														
  				  base.Type = new ObjectType(403, "Product");
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
			BaseObject Object = new DalProduct(SqlConfig, UserId, this);
			if(this.CallerObject != null)
			   Object.CallerObject = this.CallerObject;			
			return Object;
		}
///<summary>
    ///Get parent object
    ///</summary>
		public override CallerObject GetCallerObject()
		{
			CallerProduct Caller = new CallerProduct();
			Caller.Id = base.Id;
			Caller.Name = base.Name;
			Caller.SmallComment = this.SmallComment;
Caller.LargeComment = this.LargeComment;
Caller.Body = this.Body;
Caller.Available = this.Available;
Caller.Price = this.Price;
Caller.Structure = this.Structure;
Caller.Weight = this.Weight;
Caller.MetaDescription = this.MetaDescription;
Caller.MetaKeywords = this.MetaKeywords;
Caller.Status = this.Status;
Caller.AttachId = this.AttachId;
Caller.Code = this.Code;
Caller.VAT = this.VAT;
Caller.Cost = this.Cost;
Caller.MeasureUnit = this.MeasureUnit;
Caller.pro_iidorganizacion = this.pro_iidorganizacion;
Caller.pro_itipo = this.pro_itipo;
Caller.pro_currency = this.pro_currency;
Caller.pro_cantidad_auto = this.pro_cantidad_auto;

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
dr["SmallComment"] = (object)this.SmallComment ?? System.DBNull.Value;
dr["LargeComment"] = (object)this.LargeComment ?? System.DBNull.Value;
dr["Body"] = (object)this.Body ?? System.DBNull.Value;
dr["Available"] = (object)this.Available ?? System.DBNull.Value;
dr["Price"] = (object)this.Price ?? System.DBNull.Value;
dr["Structure"] = (object)this.Structure ?? System.DBNull.Value;
dr["Weight"] = (object)this.Weight ?? System.DBNull.Value;
dr["MetaDescription"] = (object)this.MetaDescription ?? System.DBNull.Value;
dr["MetaKeywords"] = (object)this.MetaKeywords ?? System.DBNull.Value;
dr["Status"] = (object)this.Status ?? System.DBNull.Value;
dr["AttachId"] = (object)this.AttachId ?? System.DBNull.Value;
dr["Code"] = (object)this.Code ?? System.DBNull.Value;
dr["VAT"] = (object)this.VAT ?? System.DBNull.Value;
dr["Cost"] = (object)this.Cost ?? System.DBNull.Value;
dr["MeasureUnit"] = (object)this.MeasureUnit ?? System.DBNull.Value;
dr["pro_iidorganizacion"] = (object)this.pro_iidorganizacion ?? System.DBNull.Value;
dr["pro_itipo"] = (object)this.pro_itipo ?? System.DBNull.Value;
dr["pro_currency"] = (object)this.pro_currency ?? System.DBNull.Value;
dr["pro_cantidad_auto"] = (object)this.pro_cantidad_auto ?? System.DBNull.Value;
							 
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

		public IEnumerable<dynamic> Attachs(){
			var v = Slbf.ObjectFactoryService.CreateByName("Attach");
            var t = v.GetType();
            var objectOut = t.InvokeMember("GetByParent", 
                System.Reflection.BindingFlags.InvokeMethod, 
                null, v, new[] { (object)"Product", this.Id });

            return (IEnumerable<dynamic>)objectOut;
		}
		
		public bool HasAttachs()
        {
            foreach (var h in Attachs())
                return true;
            return false;
        }
	 
			}

}
