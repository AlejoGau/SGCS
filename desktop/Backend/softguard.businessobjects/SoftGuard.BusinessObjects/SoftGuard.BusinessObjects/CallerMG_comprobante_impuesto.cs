
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
    public class CallerMG_comprobante_impuesto : CallerObject
    { 	
				     private int _mci_cbcicodigoid;
					
				     private int _mci_impidkey;
					
				     private Decimal _mci_total;
				 ///<summary>
     ///mci_cbcicodigoid property   
     ///</summary>   
     public int mci_cbcicodigoid 
		 { 
		        
                    get{ return this._mci_cbcicodigoid; }
        						set{ this._mci_cbcicodigoid = value; } 										
	   }
	  ///<summary>
     ///mci_impidkey property   
     ///</summary>   
     public int mci_impidkey 
		 { 
		        
                    get{ return this._mci_impidkey; }
        						set{ this._mci_impidkey = value; } 										
	   }
	  ///<summary>
     ///mci_total property   
     ///</summary>   
     public Decimal mci_total 
		 { 
		        
                    get{ return this._mci_total; }
        						set{ this._mci_total = value; } 										
	   }
	  ///<summary>
     ///Constructor   
     ///</summary>
        public CallerMG_comprobante_impuesto() : base()
        {
            InitClass();
        }  
 ///<summary>
     ///Constructor   
     ///</summary>		
        public CallerMG_comprobante_impuesto(int Id, string Name, int mci_cbcicodigoid, int mci_impidkey, Decimal mci_total) : base()
        {
            base.Id = Id;
						base.Name = Name;				 																																					 
				    this._mci_cbcicodigoid = mci_cbcicodigoid;
this._mci_impidkey = mci_impidkey;
this._mci_total = mci_total;

            InitClass();
        }  								

				private void InitClass()
        {														
  				  base.Type = new ObjectType(3200, "MG_comprobante_impuesto");
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
			SimpleMG_comprobante_impuesto Simple = new SimpleMG_comprobante_impuesto();
			Simple.Id = base.Id;
			Simple.Name = base.Name;
			Simple.mci_cbcicodigoid = this._mci_cbcicodigoid;
Simple.mci_impidkey = this._mci_impidkey;
Simple.mci_total = this._mci_total;

			return (SimpleBaseObject) Simple;
		}
 ///<summary>
     ///Sets a simpleobject   
     ///</summary>	
		public void SetSimpleObject(SimpleMG_comprobante_impuesto Simple)
		{
			base.Id = Simple.Id;
			base.Name = Simple.Name;
			this._mci_cbcicodigoid = Simple.mci_cbcicodigoid;
this._mci_impidkey = Simple.mci_impidkey;
this._mci_total = Simple.mci_total;

		}
 ///<summary>
     ///Gets a baseobject   
     ///</summary>
		public override BaseObject GetBaseObject(SqlHelper SqlConfig, int UserId)
		{
			return new DalMG_comprobante_impuesto(SqlConfig, UserId, (SimpleMG_comprobante_impuesto) GetSimpleObject());
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
               dt.Columns.Add(new DataColumn("mci_cbcicodigoid", typeof (int)));               
							 dt.Columns.Add(new DataColumn("mci_impidkey", typeof (int)));               
							 dt.Columns.Add(new DataColumn("mci_total", typeof (Decimal)));               
							 										
               //create Row  
               dr = dt.NewRow();
               
               //set Row
							 dr["Id"] = base.Id;

							 dr["Name"] = base.Name;
dr["mci_cbcicodigoid"] = this._mci_cbcicodigoid;
dr["mci_impidkey"] = this._mci_impidkey;
dr["mci_total"] = this._mci_total;
							 
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
