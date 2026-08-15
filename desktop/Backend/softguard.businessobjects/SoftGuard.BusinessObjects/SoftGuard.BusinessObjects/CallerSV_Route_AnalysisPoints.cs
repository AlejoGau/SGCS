
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
    public class CallerSV_Route_AnalysisPoints : CallerObject
    { 	
				     private int _sra_iid;
					
				     private int _sra_iRouteId;
					
				     private int _sra_iAnalysisPointId;
					
				     private int _sra_iOrder;
					
				     private string _sra_cReference;
					
				     private string _sra_cCameraType;
					
				     private int _sra_iCameraRefId;
					
				     private string _sra_cConfig;
				 ///<summary>
     ///sra_iid property   
     ///</summary>   
     public int sra_iid 
		 { 
		        
                    get{ return this._sra_iid; }
        						set{ this._sra_iid = value; } 										
	   }
	  ///<summary>
     ///sra_iRouteId property   
     ///</summary>   
     public int sra_iRouteId 
		 { 
		        
                    get{ return this._sra_iRouteId; }
        						set{ this._sra_iRouteId = value; } 										
	   }
	  ///<summary>
     ///sra_iAnalysisPointId property   
     ///</summary>   
     public int sra_iAnalysisPointId 
		 { 
		        
                    get{ return this._sra_iAnalysisPointId; }
        						set{ this._sra_iAnalysisPointId = value; } 										
	   }
	  ///<summary>
     ///sra_iOrder property   
     ///</summary>   
     public int sra_iOrder 
		 { 
		        
                    get{ return this._sra_iOrder; }
        						set{ this._sra_iOrder = value; } 										
	   }
	  ///<summary>
     ///sra_cReference property   
     ///</summary>   
     public string sra_cReference 
		 { 
		        
                    get{ return this._sra_cReference; }
        						set{ this._sra_cReference = value; } 										
	   }
	  ///<summary>
     ///sra_cCameraType property   
     ///</summary>   
     public string sra_cCameraType 
		 { 
		        
                    get{ return this._sra_cCameraType; }
        						set{ this._sra_cCameraType = value; } 										
	   }
	  ///<summary>
     ///sra_iCameraRefId property   
     ///</summary>   
     public int sra_iCameraRefId 
		 { 
		        
                    get{ return this._sra_iCameraRefId; }
        						set{ this._sra_iCameraRefId = value; } 										
	   }
	  ///<summary>
     ///sra_cConfig property   
     ///</summary>   
     public string sra_cConfig 
		 { 
		        
                    get{ return this._sra_cConfig; }
        						set{ this._sra_cConfig = value; } 										
	   }
	  ///<summary>
     ///Constructor   
     ///</summary>
        public CallerSV_Route_AnalysisPoints() : base()
        {
            InitClass();
        }  
 ///<summary>
     ///Constructor   
     ///</summary>		
        public CallerSV_Route_AnalysisPoints(int Id, string Name, int sra_iid, int sra_iRouteId, int sra_iAnalysisPointId, int sra_iOrder, string sra_cReference, string sra_cCameraType, int sra_iCameraRefId, string sra_cConfig) : base()
        {
            base.Id = Id;
						base.Name = Name;				 																																					 
				    this._sra_iid = sra_iid;
this._sra_iRouteId = sra_iRouteId;
this._sra_iAnalysisPointId = sra_iAnalysisPointId;
this._sra_iOrder = sra_iOrder;
this._sra_cReference = sra_cReference;
this._sra_cCameraType = sra_cCameraType;
this._sra_iCameraRefId = sra_iCameraRefId;
this._sra_cConfig = sra_cConfig;

            InitClass();
        }  								

				private void InitClass()
        {														
  				  base.Type = new ObjectType(3302, "SV_Route_AnalysisPoints");
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
			SimpleSV_Route_AnalysisPoints Simple = new SimpleSV_Route_AnalysisPoints();
			Simple.Id = base.Id;
			Simple.Name = base.Name;
			Simple.sra_iid = this._sra_iid;
Simple.sra_iRouteId = this._sra_iRouteId;
Simple.sra_iAnalysisPointId = this._sra_iAnalysisPointId;
Simple.sra_iOrder = this._sra_iOrder;
Simple.sra_cReference = this._sra_cReference;
Simple.sra_cCameraType = this._sra_cCameraType;
Simple.sra_iCameraRefId = this._sra_iCameraRefId;
Simple.sra_cConfig = this._sra_cConfig;

			return (SimpleBaseObject) Simple;
		}
 ///<summary>
     ///Sets a simpleobject   
     ///</summary>	
		public void SetSimpleObject(SimpleSV_Route_AnalysisPoints Simple)
		{
			base.Id = Simple.Id;
			base.Name = Simple.Name;
			this._sra_iid = Simple.sra_iid;
this._sra_iRouteId = Simple.sra_iRouteId;
this._sra_iAnalysisPointId = Simple.sra_iAnalysisPointId;
this._sra_iOrder = Simple.sra_iOrder;
this._sra_cReference = Simple.sra_cReference;
this._sra_cCameraType = Simple.sra_cCameraType;
this._sra_iCameraRefId = Simple.sra_iCameraRefId;
this._sra_cConfig = Simple.sra_cConfig;

		}
 ///<summary>
     ///Gets a baseobject   
     ///</summary>
		public override BaseObject GetBaseObject(SqlHelper SqlConfig, int UserId)
		{
			return new DalSV_Route_AnalysisPoints(SqlConfig, UserId, (SimpleSV_Route_AnalysisPoints) GetSimpleObject());
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
               dt.Columns.Add(new DataColumn("sra_iid", typeof (int)));               
							 dt.Columns.Add(new DataColumn("sra_iRouteId", typeof (int)));               
							 dt.Columns.Add(new DataColumn("sra_iAnalysisPointId", typeof (int)));               
							 dt.Columns.Add(new DataColumn("sra_iOrder", typeof (int)));               
							 dt.Columns.Add(new DataColumn("sra_cReference", typeof (string)));               
							 dt.Columns.Add(new DataColumn("sra_cCameraType", typeof (string)));               
							 dt.Columns.Add(new DataColumn("sra_iCameraRefId", typeof (int)));               
							 dt.Columns.Add(new DataColumn("sra_cConfig", typeof (string)));               
							 										
               //create Row  
               dr = dt.NewRow();
               
               //set Row
							 dr["Id"] = base.Id;

							 dr["Name"] = base.Name;
dr["sra_iid"] = this._sra_iid;
dr["sra_iRouteId"] = this._sra_iRouteId;
dr["sra_iAnalysisPointId"] = this._sra_iAnalysisPointId;
dr["sra_iOrder"] = this._sra_iOrder;
dr["sra_cReference"] = this._sra_cReference;
dr["sra_cCameraType"] = this._sra_cCameraType;
dr["sra_iCameraRefId"] = this._sra_iCameraRefId;
dr["sra_cConfig"] = this._sra_cConfig;
							 
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
