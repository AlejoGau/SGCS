
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
    public class CallerOperadorVirtualConfigDealers : CallerObject
    { 	
				     private int _ovd_iOperadorVirtualConfigId;
					
				     private string _ovd_cDealer;
				 ///<summary>
     ///ovd_iOperadorVirtualConfigId property   
     ///</summary>   
     public int ovd_iOperadorVirtualConfigId 
		 { 
		        
                    get{ return this._ovd_iOperadorVirtualConfigId; }
        						set{ this._ovd_iOperadorVirtualConfigId = value; } 										
	   }
	  ///<summary>
     ///ovd_cDealer property   
     ///</summary>   
     public string ovd_cDealer 
		 { 
		        
                    get{ return this._ovd_cDealer; }
        						set{ this._ovd_cDealer = value; } 										
	   }
	  ///<summary>
     ///Constructor   
     ///</summary>
        public CallerOperadorVirtualConfigDealers() : base()
        {
            InitClass();
        }  
 ///<summary>
     ///Constructor   
     ///</summary>		
        public CallerOperadorVirtualConfigDealers(int Id, string Name, int ovd_iOperadorVirtualConfigId, string ovd_cDealer) : base()
        {
            base.Id = Id;
						base.Name = Name;				 																																					 
				    this._ovd_iOperadorVirtualConfigId = ovd_iOperadorVirtualConfigId;
this._ovd_cDealer = ovd_cDealer;

            InitClass();
        }  								

				private void InitClass()
        {														
  				  base.Type = new ObjectType(7048, "OperadorVirtualConfigDealers");
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
			SimpleOperadorVirtualConfigDealers Simple = new SimpleOperadorVirtualConfigDealers();
			Simple.Id = base.Id;
			Simple.Name = base.Name;
			Simple.ovd_iOperadorVirtualConfigId = this._ovd_iOperadorVirtualConfigId;
Simple.ovd_cDealer = this._ovd_cDealer;

			return (SimpleBaseObject) Simple;
		}
 ///<summary>
     ///Sets a simpleobject   
     ///</summary>	
		public void SetSimpleObject(SimpleOperadorVirtualConfigDealers Simple)
		{
			base.Id = Simple.Id;
			base.Name = Simple.Name;
			this._ovd_iOperadorVirtualConfigId = Simple.ovd_iOperadorVirtualConfigId;
this._ovd_cDealer = Simple.ovd_cDealer;

		}
 ///<summary>
     ///Gets a baseobject   
     ///</summary>
		public override BaseObject GetBaseObject(SqlHelper SqlConfig, int UserId)
		{
			return new DalOperadorVirtualConfigDealers(SqlConfig, UserId, (SimpleOperadorVirtualConfigDealers) GetSimpleObject());
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
               dt.Columns.Add(new DataColumn("ovd_iOperadorVirtualConfigId", typeof (int)));               
							 dt.Columns.Add(new DataColumn("ovd_cDealer", typeof (string)));               
							 										
               //create Row  
               dr = dt.NewRow();
               
               //set Row
							 dr["Id"] = base.Id;

							 dr["Name"] = base.Name;
dr["ovd_iOperadorVirtualConfigId"] = this._ovd_iOperadorVirtualConfigId;
dr["ovd_cDealer"] = this._ovd_cDealer;
							 
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
