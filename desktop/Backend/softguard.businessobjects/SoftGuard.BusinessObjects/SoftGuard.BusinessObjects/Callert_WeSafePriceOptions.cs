
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
    public class Callert_WeSafePriceOptions : CallerObject
    { 	
				     private Decimal _wpr_nPrice;
				 ///<summary>
     ///wpr_nPrice property   
     ///</summary>   
     public Decimal wpr_nPrice 
		 { 
		        
                    get{ return this._wpr_nPrice; }
        						set{ this._wpr_nPrice = value; } 										
	   }
	  ///<summary>
     ///Constructor   
     ///</summary>
        public Callert_WeSafePriceOptions() : base()
        {
            InitClass();
        }  
 ///<summary>
     ///Constructor   
     ///</summary>		
        public Callert_WeSafePriceOptions(int Id, string Name, Decimal wpr_nPrice) : base()
        {
            base.Id = Id;
						base.Name = Name;				 																																					 
				    this._wpr_nPrice = wpr_nPrice;

            InitClass();
        }  								

				private void InitClass()
        {														
  				  base.Type = new ObjectType(7040, "t_WeSafePriceOptions");
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
			Simplet_WeSafePriceOptions Simple = new Simplet_WeSafePriceOptions();
			Simple.Id = base.Id;
			Simple.Name = base.Name;
			Simple.wpr_nPrice = this._wpr_nPrice;

			return (SimpleBaseObject) Simple;
		}
 ///<summary>
     ///Sets a simpleobject   
     ///</summary>	
		public void SetSimpleObject(Simplet_WeSafePriceOptions Simple)
		{
			base.Id = Simple.Id;
			base.Name = Simple.Name;
			this._wpr_nPrice = Simple.wpr_nPrice;

		}
 ///<summary>
     ///Gets a baseobject   
     ///</summary>
		public override BaseObject GetBaseObject(SqlHelper SqlConfig, int UserId)
		{
			return new Dalt_WeSafePriceOptions(SqlConfig, UserId, (Simplet_WeSafePriceOptions) GetSimpleObject());
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
               dt.Columns.Add(new DataColumn("wpr_nPrice", typeof (Decimal)));               
							 										
               //create Row  
               dr = dt.NewRow();
               
               //set Row
							 dr["Id"] = base.Id;

							 dr["Name"] = base.Name;
dr["wpr_nPrice"] = this._wpr_nPrice;
							 
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
