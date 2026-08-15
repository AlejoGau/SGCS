
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
    public class CallerWeSafeSubscription : CallerObject
    { 	
				     private string _wsu_cDealer;
					
				     private string _wsu_cID;
					
				     private string _wsu_cName;
					
				     private string _wsu_cDesc;
					
				     private int _wsu_iPriceID;
					
				     private int _wsu_iPeriodicityID;
					
				     private DateTime? _wsu_tDateCreation;
					
				     private DateTime? _wsu_tDateUpdateAndroid;
					
				     private int _wsu_iStatusAndroid;
					
				     private DateTime? _wsu_tDateUpdateIOS;
					
				     private int _wsu_iStatusIOS;
					
				     private string _wsu_cSubscriptionGroupIdIOS;
					
				     private string _wsu_cSubscriptionIdIOS;
				 ///<summary>
     ///wsu_cDealer property   
     ///</summary>   
     public string wsu_cDealer 
		 { 
		        
                    get{ return this._wsu_cDealer; }
        						set{ this._wsu_cDealer = value; } 										
	   }
	  ///<summary>
     ///wsu_cID property   
     ///</summary>   
     public string wsu_cID 
		 { 
		        
                    get{ return this._wsu_cID; }
        						set{ this._wsu_cID = value; } 										
	   }
	  ///<summary>
     ///wsu_cName property   
     ///</summary>   
     public string wsu_cName 
		 { 
		        
                    get{ return this._wsu_cName; }
        						set{ this._wsu_cName = value; } 										
	   }
	  ///<summary>
     ///wsu_cDesc property   
     ///</summary>   
     public string wsu_cDesc 
		 { 
		        
                    get{ return this._wsu_cDesc; }
        						set{ this._wsu_cDesc = value; } 										
	   }
	  ///<summary>
     ///wsu_iPriceID property   
     ///</summary>   
     public int wsu_iPriceID 
		 { 
		        
                    get{ return this._wsu_iPriceID; }
        						set{ this._wsu_iPriceID = value; } 										
	   }
	  ///<summary>
     ///wsu_iPeriodicityID property   
     ///</summary>   
     public int wsu_iPeriodicityID 
		 { 
		        
                    get{ return this._wsu_iPeriodicityID; }
        						set{ this._wsu_iPeriodicityID = value; } 										
	   }
	  ///<summary>
     ///wsu_tDateCreation property   
     ///</summary>   
     public DateTime? wsu_tDateCreation 
		 { 
		        
                    get{ return this._wsu_tDateCreation; }
        						set{ this._wsu_tDateCreation = value; } 										
	   }
	  ///<summary>
     ///wsu_tDateUpdateAndroid property   
     ///</summary>   
     public DateTime? wsu_tDateUpdateAndroid 
		 { 
		        
                    get{ return this._wsu_tDateUpdateAndroid; }
        						set{ this._wsu_tDateUpdateAndroid = value; } 										
	   }
	  ///<summary>
     ///wsu_iStatusAndroid property   
     ///</summary>   
     public int wsu_iStatusAndroid 
		 { 
		        
                    get{ return this._wsu_iStatusAndroid; }
        						set{ this._wsu_iStatusAndroid = value; } 										
	   }
	  ///<summary>
     ///wsu_tDateUpdateIOS property   
     ///</summary>   
     public DateTime? wsu_tDateUpdateIOS 
		 { 
		        
                    get{ return this._wsu_tDateUpdateIOS; }
        						set{ this._wsu_tDateUpdateIOS = value; } 										
	   }
	  ///<summary>
     ///wsu_iStatusIOS property   
     ///</summary>   
     public int wsu_iStatusIOS 
		 { 
		        
                    get{ return this._wsu_iStatusIOS; }
        						set{ this._wsu_iStatusIOS = value; } 										
	   }
	  ///<summary>
     ///wsu_cSubscriptionGroupIdIOS property   
     ///</summary>   
     public string wsu_cSubscriptionGroupIdIOS 
		 { 
		        
                    get{ return this._wsu_cSubscriptionGroupIdIOS; }
        						set{ this._wsu_cSubscriptionGroupIdIOS = value; } 										
	   }
	  ///<summary>
     ///wsu_cSubscriptionIdIOS property   
     ///</summary>   
     public string wsu_cSubscriptionIdIOS 
		 { 
		        
                    get{ return this._wsu_cSubscriptionIdIOS; }
        						set{ this._wsu_cSubscriptionIdIOS = value; } 										
	   }
	  ///<summary>
     ///Constructor   
     ///</summary>
        public CallerWeSafeSubscription() : base()
        {
            InitClass();
        }  
 ///<summary>
     ///Constructor   
     ///</summary>		
        public CallerWeSafeSubscription(int Id, string Name, string wsu_cDealer, string wsu_cID, string wsu_cName, string wsu_cDesc, int wsu_iPriceID, int wsu_iPeriodicityID, DateTime? wsu_tDateCreation, DateTime? wsu_tDateUpdateAndroid, int wsu_iStatusAndroid, DateTime? wsu_tDateUpdateIOS, int wsu_iStatusIOS, string wsu_cSubscriptionGroupIdIOS, string wsu_cSubscriptionIdIOS) : base()
        {
            base.Id = Id;
						base.Name = Name;				 																																					 
				    this._wsu_cDealer = wsu_cDealer;
this._wsu_cID = wsu_cID;
this._wsu_cName = wsu_cName;
this._wsu_cDesc = wsu_cDesc;
this._wsu_iPriceID = wsu_iPriceID;
this._wsu_iPeriodicityID = wsu_iPeriodicityID;
this._wsu_tDateCreation = wsu_tDateCreation;
this._wsu_tDateUpdateAndroid = wsu_tDateUpdateAndroid;
this._wsu_iStatusAndroid = wsu_iStatusAndroid;
this._wsu_tDateUpdateIOS = wsu_tDateUpdateIOS;
this._wsu_iStatusIOS = wsu_iStatusIOS;
this._wsu_cSubscriptionGroupIdIOS = wsu_cSubscriptionGroupIdIOS;
this._wsu_cSubscriptionIdIOS = wsu_cSubscriptionIdIOS;

            InitClass();
        }  								

				private void InitClass()
        {														
  				  base.Type = new ObjectType(7038, "WeSafeSubscription");
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
			SimpleWeSafeSubscription Simple = new SimpleWeSafeSubscription();
			Simple.Id = base.Id;
			Simple.Name = base.Name;
			Simple.wsu_cDealer = this._wsu_cDealer;
Simple.wsu_cID = this._wsu_cID;
Simple.wsu_cName = this._wsu_cName;
Simple.wsu_cDesc = this._wsu_cDesc;
Simple.wsu_iPriceID = this._wsu_iPriceID;
Simple.wsu_iPeriodicityID = this._wsu_iPeriodicityID;
Simple.wsu_tDateCreation = this._wsu_tDateCreation;
Simple.wsu_tDateUpdateAndroid = this._wsu_tDateUpdateAndroid;
Simple.wsu_iStatusAndroid = this._wsu_iStatusAndroid;
Simple.wsu_tDateUpdateIOS = this._wsu_tDateUpdateIOS;
Simple.wsu_iStatusIOS = this._wsu_iStatusIOS;
Simple.wsu_cSubscriptionGroupIdIOS = this._wsu_cSubscriptionGroupIdIOS;
Simple.wsu_cSubscriptionIdIOS = this._wsu_cSubscriptionIdIOS;

			return (SimpleBaseObject) Simple;
		}
 ///<summary>
     ///Sets a simpleobject   
     ///</summary>	
		public void SetSimpleObject(SimpleWeSafeSubscription Simple)
		{
			base.Id = Simple.Id;
			base.Name = Simple.Name;
			this._wsu_cDealer = Simple.wsu_cDealer;
this._wsu_cID = Simple.wsu_cID;
this._wsu_cName = Simple.wsu_cName;
this._wsu_cDesc = Simple.wsu_cDesc;
this._wsu_iPriceID = Simple.wsu_iPriceID;
this._wsu_iPeriodicityID = Simple.wsu_iPeriodicityID;
this._wsu_tDateCreation = Simple.wsu_tDateCreation;
this._wsu_tDateUpdateAndroid = Simple.wsu_tDateUpdateAndroid;
this._wsu_iStatusAndroid = Simple.wsu_iStatusAndroid;
this._wsu_tDateUpdateIOS = Simple.wsu_tDateUpdateIOS;
this._wsu_iStatusIOS = Simple.wsu_iStatusIOS;
this._wsu_cSubscriptionGroupIdIOS = Simple.wsu_cSubscriptionGroupIdIOS;
this._wsu_cSubscriptionIdIOS = Simple.wsu_cSubscriptionIdIOS;

		}
 ///<summary>
     ///Gets a baseobject   
     ///</summary>
		public override BaseObject GetBaseObject(SqlHelper SqlConfig, int UserId)
		{
			return new DalWeSafeSubscription(SqlConfig, UserId, (SimpleWeSafeSubscription) GetSimpleObject());
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
               dt.Columns.Add(new DataColumn("wsu_cDealer", typeof (string)));               
							 dt.Columns.Add(new DataColumn("wsu_cID", typeof (string)));               
							 dt.Columns.Add(new DataColumn("wsu_cName", typeof (string)));               
							 dt.Columns.Add(new DataColumn("wsu_cDesc", typeof (string)));               
							 dt.Columns.Add(new DataColumn("wsu_iPriceID", typeof (int)));               
							 dt.Columns.Add(new DataColumn("wsu_iPeriodicityID", typeof (int)));               
							 dt.Columns.Add(new DataColumn("wsu_tDateCreation", typeof (DateTime)));               
							 dt.Columns.Add(new DataColumn("wsu_tDateUpdateAndroid", typeof (DateTime)));               
							 dt.Columns.Add(new DataColumn("wsu_iStatusAndroid", typeof (int)));               
							 dt.Columns.Add(new DataColumn("wsu_tDateUpdateIOS", typeof (DateTime)));               
							 dt.Columns.Add(new DataColumn("wsu_iStatusIOS", typeof (int)));               
							 dt.Columns.Add(new DataColumn("wsu_cSubscriptionGroupIdIOS", typeof (string)));               
							 dt.Columns.Add(new DataColumn("wsu_cSubscriptionIdIOS", typeof (string)));               
							 										
               //create Row  
               dr = dt.NewRow();
               
               //set Row
							 dr["Id"] = base.Id;

							 dr["Name"] = base.Name;
dr["wsu_cDealer"] = this._wsu_cDealer;
dr["wsu_cID"] = this._wsu_cID;
dr["wsu_cName"] = this._wsu_cName;
dr["wsu_cDesc"] = this._wsu_cDesc;
dr["wsu_iPriceID"] = this._wsu_iPriceID;
dr["wsu_iPeriodicityID"] = this._wsu_iPeriodicityID;
dr["wsu_tDateCreation"] = this._wsu_tDateCreation;
dr["wsu_tDateUpdateAndroid"] = this._wsu_tDateUpdateAndroid;
dr["wsu_iStatusAndroid"] = this._wsu_iStatusAndroid;
dr["wsu_tDateUpdateIOS"] = this._wsu_tDateUpdateIOS;
dr["wsu_iStatusIOS"] = this._wsu_iStatusIOS;
dr["wsu_cSubscriptionGroupIdIOS"] = this._wsu_cSubscriptionGroupIdIOS;
dr["wsu_cSubscriptionIdIOS"] = this._wsu_cSubscriptionIdIOS;
							 
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
