
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
    public class CallerWeSafeSubscriptionFunctions : CallerObject
    { 	
				     private int _wsf_idKey;
					
				     private int _wsf_iSubscriptionID;
					
				     private int _wsf_iFunctionID;
					
				     private int _wsu_iSelected;
				 ///<summary>
     ///wsf_idKey property   
     ///</summary>   
     public int wsf_idKey 
		 { 
		        
                    get{ return this._wsf_idKey; }
        						set{ this._wsf_idKey = value; } 										
	   }
	  ///<summary>
     ///wsf_iSubscriptionID property   
     ///</summary>   
     public int wsf_iSubscriptionID 
		 { 
		        
                    get{ return this._wsf_iSubscriptionID; }
        						set{ this._wsf_iSubscriptionID = value; } 										
	   }
	  ///<summary>
     ///wsf_iFunctionID property   
     ///</summary>   
     public int wsf_iFunctionID 
		 { 
		        
                    get{ return this._wsf_iFunctionID; }
        						set{ this._wsf_iFunctionID = value; } 										
	   }
	  ///<summary>
     ///wsu_iSelected property   
     ///</summary>   
     public int wsu_iSelected 
		 { 
		        
                    get{ return this._wsu_iSelected; }
        						set{ this._wsu_iSelected = value; } 										
	   }
	  ///<summary>
     ///Constructor   
     ///</summary>
        public CallerWeSafeSubscriptionFunctions() : base()
        {
            InitClass();
        }  
 ///<summary>
     ///Constructor   
     ///</summary>		
        public CallerWeSafeSubscriptionFunctions(int Id, string Name, int wsf_idKey, int wsf_iSubscriptionID, int wsf_iFunctionID, int wsu_iSelected) : base()
        {
            base.Id = Id;
						base.Name = Name;				 																																					 
				    this._wsf_idKey = wsf_idKey;
this._wsf_iSubscriptionID = wsf_iSubscriptionID;
this._wsf_iFunctionID = wsf_iFunctionID;
this._wsu_iSelected = wsu_iSelected;

            InitClass();
        }  								

				private void InitClass()
        {														
  				  base.Type = new ObjectType(7041, "WeSafeSubscriptionFunctions");
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
			SimpleWeSafeSubscriptionFunctions Simple = new SimpleWeSafeSubscriptionFunctions();
			Simple.Id = base.Id;
			Simple.Name = base.Name;
			Simple.wsf_idKey = this._wsf_idKey;
Simple.wsf_iSubscriptionID = this._wsf_iSubscriptionID;
Simple.wsf_iFunctionID = this._wsf_iFunctionID;
Simple.wsu_iSelected = this._wsu_iSelected;

			return (SimpleBaseObject) Simple;
		}
 ///<summary>
     ///Sets a simpleobject   
     ///</summary>	
		public void SetSimpleObject(SimpleWeSafeSubscriptionFunctions Simple)
		{
			base.Id = Simple.Id;
			base.Name = Simple.Name;
			this._wsf_idKey = Simple.wsf_idKey;
this._wsf_iSubscriptionID = Simple.wsf_iSubscriptionID;
this._wsf_iFunctionID = Simple.wsf_iFunctionID;
this._wsu_iSelected = Simple.wsu_iSelected;

		}
 ///<summary>
     ///Gets a baseobject   
     ///</summary>
		public override BaseObject GetBaseObject(SqlHelper SqlConfig, int UserId)
		{
			return new DalWeSafeSubscriptionFunctions(SqlConfig, UserId, (SimpleWeSafeSubscriptionFunctions) GetSimpleObject());
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
               dt.Columns.Add(new DataColumn("wsf_idKey", typeof (int)));               
							 dt.Columns.Add(new DataColumn("wsf_iSubscriptionID", typeof (int)));               
							 dt.Columns.Add(new DataColumn("wsf_iFunctionID", typeof (int)));               
							 dt.Columns.Add(new DataColumn("wsu_iSelected", typeof (int)));               
							 										
               //create Row  
               dr = dt.NewRow();
               
               //set Row
							 dr["Id"] = base.Id;

							 dr["Name"] = base.Name;
dr["wsf_idKey"] = this._wsf_idKey;
dr["wsf_iSubscriptionID"] = this._wsf_iSubscriptionID;
dr["wsf_iFunctionID"] = this._wsf_iFunctionID;
dr["wsu_iSelected"] = this._wsu_iSelected;
							 
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
