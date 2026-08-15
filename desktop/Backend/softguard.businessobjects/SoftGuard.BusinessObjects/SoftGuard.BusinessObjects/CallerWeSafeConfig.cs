
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
    public class CallerWeSafeConfig : CallerObject
    { 	
				     private string _wcf_cDealer;
					
				     private string _wcf_cEndPointAppStore;
					
				     private string _wcf_cMailGoogleStore;
					
				     private string _wcf_cAppNameAppStore;
					
				     private string _wcf_cIssuerID;
					
				     private string _wcf_cKeyIdAppStore;
					
				     private string _wcf_cAppNameGoogleStore;
					
				     private string _wcf_cEndPointGooglePlay;
					
				     private string _wcf_cPrivateKeyAppStore;
					
				     private string _wcf_cPrivateKeyGoogleStore;
					
				     private string _idsPublicidad;
				 ///<summary>
     ///wcf_cDealer property   
     ///</summary>   
     public string wcf_cDealer 
		 { 
		        
                    get{ return this._wcf_cDealer; }
        						set{ this._wcf_cDealer = value; } 										
	   }
	  ///<summary>
     ///wcf_cEndPointAppStore property   
     ///</summary>   
     public string wcf_cEndPointAppStore 
		 { 
		        
                    get{ return this._wcf_cEndPointAppStore; }
        						set{ this._wcf_cEndPointAppStore = value; } 										
	   }
	  ///<summary>
     ///wcf_cMailGoogleStore property   
     ///</summary>   
     public string wcf_cMailGoogleStore 
		 { 
		        
                    get{ return this._wcf_cMailGoogleStore; }
        						set{ this._wcf_cMailGoogleStore = value; } 										
	   }
	  ///<summary>
     ///wcf_cAppNameAppStore property   
     ///</summary>   
     public string wcf_cAppNameAppStore 
		 { 
		        
                    get{ return this._wcf_cAppNameAppStore; }
        						set{ this._wcf_cAppNameAppStore = value; } 										
	   }
	  ///<summary>
     ///wcf_cIssuerID property   
     ///</summary>   
     public string wcf_cIssuerID 
		 { 
		        
                    get{ return this._wcf_cIssuerID; }
        						set{ this._wcf_cIssuerID = value; } 										
	   }
	  ///<summary>
     ///wcf_cKeyIdAppStore property   
     ///</summary>   
     public string wcf_cKeyIdAppStore 
		 { 
		        
                    get{ return this._wcf_cKeyIdAppStore; }
        						set{ this._wcf_cKeyIdAppStore = value; } 										
	   }
	  ///<summary>
     ///wcf_cAppNameGoogleStore property   
     ///</summary>   
     public string wcf_cAppNameGoogleStore 
		 { 
		        
                    get{ return this._wcf_cAppNameGoogleStore; }
        						set{ this._wcf_cAppNameGoogleStore = value; } 										
	   }
	  ///<summary>
     ///wcf_cEndPointGooglePlay property   
     ///</summary>   
     public string wcf_cEndPointGooglePlay 
		 { 
		        
                    get{ return this._wcf_cEndPointGooglePlay; }
        						set{ this._wcf_cEndPointGooglePlay = value; } 										
	   }
	  ///<summary>
     ///wcf_cPrivateKeyAppStore property   
     ///</summary>   
     public string wcf_cPrivateKeyAppStore 
		 { 
		        
                    get{ return this._wcf_cPrivateKeyAppStore; }
        						set{ this._wcf_cPrivateKeyAppStore = value; } 										
	   }
	  ///<summary>
     ///wcf_cPrivateKeyGoogleStore property   
     ///</summary>   
     public string wcf_cPrivateKeyGoogleStore 
		 { 
		        
                    get{ return this._wcf_cPrivateKeyGoogleStore; }
        						set{ this._wcf_cPrivateKeyGoogleStore = value; } 										
	   }
	  ///<summary>
     ///idsPublicidad property   
     ///</summary>   
     public string idsPublicidad 
		 { 
		        
                    get{ return this._idsPublicidad; }
        						set{ this._idsPublicidad = value; } 										
	   }
	  ///<summary>
     ///Constructor   
     ///</summary>
        public CallerWeSafeConfig() : base()
        {
            InitClass();
        }  
 ///<summary>
     ///Constructor   
     ///</summary>		
        public CallerWeSafeConfig(int Id, string Name, string wcf_cDealer, string wcf_cEndPointAppStore, string wcf_cMailGoogleStore, string wcf_cAppNameAppStore, string wcf_cIssuerID, string wcf_cKeyIdAppStore, string wcf_cAppNameGoogleStore, string wcf_cEndPointGooglePlay, string wcf_cPrivateKeyAppStore, string wcf_cPrivateKeyGoogleStore, string idsPublicidad) : base()
        {
            base.Id = Id;
						base.Name = Name;				 																																					 
				    this._wcf_cDealer = wcf_cDealer;
this._wcf_cEndPointAppStore = wcf_cEndPointAppStore;
this._wcf_cMailGoogleStore = wcf_cMailGoogleStore;
this._wcf_cAppNameAppStore = wcf_cAppNameAppStore;
this._wcf_cIssuerID = wcf_cIssuerID;
this._wcf_cKeyIdAppStore = wcf_cKeyIdAppStore;
this._wcf_cAppNameGoogleStore = wcf_cAppNameGoogleStore;
this._wcf_cEndPointGooglePlay = wcf_cEndPointGooglePlay;
this._wcf_cPrivateKeyAppStore = wcf_cPrivateKeyAppStore;
this._wcf_cPrivateKeyGoogleStore = wcf_cPrivateKeyGoogleStore;
this._idsPublicidad = idsPublicidad;

            InitClass();
        }  								

				private void InitClass()
        {														
  				  base.Type = new ObjectType(7037, "WeSafeConfig");
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
			SimpleWeSafeConfig Simple = new SimpleWeSafeConfig();
			Simple.Id = base.Id;
			Simple.Name = base.Name;
			Simple.wcf_cDealer = this._wcf_cDealer;
Simple.wcf_cEndPointAppStore = this._wcf_cEndPointAppStore;
Simple.wcf_cMailGoogleStore = this._wcf_cMailGoogleStore;
Simple.wcf_cAppNameAppStore = this._wcf_cAppNameAppStore;
Simple.wcf_cIssuerID = this._wcf_cIssuerID;
Simple.wcf_cKeyIdAppStore = this._wcf_cKeyIdAppStore;
Simple.wcf_cAppNameGoogleStore = this._wcf_cAppNameGoogleStore;
Simple.wcf_cEndPointGooglePlay = this._wcf_cEndPointGooglePlay;
Simple.wcf_cPrivateKeyAppStore = this._wcf_cPrivateKeyAppStore;
Simple.wcf_cPrivateKeyGoogleStore = this._wcf_cPrivateKeyGoogleStore;
Simple.idsPublicidad = this._idsPublicidad;

			return (SimpleBaseObject) Simple;
		}
 ///<summary>
     ///Sets a simpleobject   
     ///</summary>	
		public void SetSimpleObject(SimpleWeSafeConfig Simple)
		{
			base.Id = Simple.Id;
			base.Name = Simple.Name;
			this._wcf_cDealer = Simple.wcf_cDealer;
this._wcf_cEndPointAppStore = Simple.wcf_cEndPointAppStore;
this._wcf_cMailGoogleStore = Simple.wcf_cMailGoogleStore;
this._wcf_cAppNameAppStore = Simple.wcf_cAppNameAppStore;
this._wcf_cIssuerID = Simple.wcf_cIssuerID;
this._wcf_cKeyIdAppStore = Simple.wcf_cKeyIdAppStore;
this._wcf_cAppNameGoogleStore = Simple.wcf_cAppNameGoogleStore;
this._wcf_cEndPointGooglePlay = Simple.wcf_cEndPointGooglePlay;
this._wcf_cPrivateKeyAppStore = Simple.wcf_cPrivateKeyAppStore;
this._wcf_cPrivateKeyGoogleStore = Simple.wcf_cPrivateKeyGoogleStore;
this._idsPublicidad = Simple.idsPublicidad;

		}
 ///<summary>
     ///Gets a baseobject   
     ///</summary>
		public override BaseObject GetBaseObject(SqlHelper SqlConfig, int UserId)
		{
			return new DalWeSafeConfig(SqlConfig, UserId, (SimpleWeSafeConfig) GetSimpleObject());
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
               dt.Columns.Add(new DataColumn("wcf_cDealer", typeof (string)));               
							 dt.Columns.Add(new DataColumn("wcf_cEndPointAppStore", typeof (string)));               
							 dt.Columns.Add(new DataColumn("wcf_cMailGoogleStore", typeof (string)));               
							 dt.Columns.Add(new DataColumn("wcf_cAppNameAppStore", typeof (string)));               
							 dt.Columns.Add(new DataColumn("wcf_cIssuerID", typeof (string)));               
							 dt.Columns.Add(new DataColumn("wcf_cKeyIdAppStore", typeof (string)));               
							 dt.Columns.Add(new DataColumn("wcf_cAppNameGoogleStore", typeof (string)));               
							 dt.Columns.Add(new DataColumn("wcf_cEndPointGooglePlay", typeof (string)));               
							 dt.Columns.Add(new DataColumn("wcf_cPrivateKeyAppStore", typeof (string)));               
							 dt.Columns.Add(new DataColumn("wcf_cPrivateKeyGoogleStore", typeof (string)));               
							 dt.Columns.Add(new DataColumn("idsPublicidad", typeof (string)));               
							 										
               //create Row  
               dr = dt.NewRow();
               
               //set Row
							 dr["Id"] = base.Id;

							 dr["Name"] = base.Name;
dr["wcf_cDealer"] = this._wcf_cDealer;
dr["wcf_cEndPointAppStore"] = this._wcf_cEndPointAppStore;
dr["wcf_cMailGoogleStore"] = this._wcf_cMailGoogleStore;
dr["wcf_cAppNameAppStore"] = this._wcf_cAppNameAppStore;
dr["wcf_cIssuerID"] = this._wcf_cIssuerID;
dr["wcf_cKeyIdAppStore"] = this._wcf_cKeyIdAppStore;
dr["wcf_cAppNameGoogleStore"] = this._wcf_cAppNameGoogleStore;
dr["wcf_cEndPointGooglePlay"] = this._wcf_cEndPointGooglePlay;
dr["wcf_cPrivateKeyAppStore"] = this._wcf_cPrivateKeyAppStore;
dr["wcf_cPrivateKeyGoogleStore"] = this._wcf_cPrivateKeyGoogleStore;
dr["idsPublicidad"] = this._idsPublicidad;
							 
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
