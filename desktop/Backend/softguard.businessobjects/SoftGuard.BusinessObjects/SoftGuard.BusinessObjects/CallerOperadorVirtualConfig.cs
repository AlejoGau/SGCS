
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
    public class CallerOperadorVirtualConfig : CallerObject
    { 	
				     private string _ovc_cDescripcion;
					
				     private int _ovc_iStatus;
					
				     private string _ovc_cDealers;
					
				     private string _ovc_cEventos;
					
				     private DateTime? _ovc_tLastUpdated;
					
				     private DateTime? _ovc_tCreatedDate;
					
				     private string _ovc_cEventType;
				 ///<summary>
     ///ovc_cDescripcion property   
     ///</summary>   
     public string ovc_cDescripcion 
		 { 
		        
                    get{ return this._ovc_cDescripcion; }
        						set{ this._ovc_cDescripcion = value; } 										
	   }
	  ///<summary>
     ///ovc_iStatus property   
     ///</summary>   
     public int ovc_iStatus 
		 { 
		        
                    get{ return this._ovc_iStatus; }
        						set{ this._ovc_iStatus = value; } 										
	   }
	  ///<summary>
     ///ovc_cDealers property   
     ///</summary>   
     public string ovc_cDealers 
		 { 
		        
                    get{ return this._ovc_cDealers; }
        						set{ this._ovc_cDealers = value; } 										
	   }
	  ///<summary>
     ///ovc_cEventos property   
     ///</summary>   
     public string ovc_cEventos 
		 { 
		        
                    get{ return this._ovc_cEventos; }
        						set{ this._ovc_cEventos = value; } 										
	   }
	  ///<summary>
     ///ovc_tLastUpdated property   
     ///</summary>   
     public DateTime? ovc_tLastUpdated 
		 { 
		        
                    get{ return this._ovc_tLastUpdated; }
        						set{ this._ovc_tLastUpdated = value; } 										
	   }
	  ///<summary>
     ///ovc_tCreatedDate property   
     ///</summary>   
     public DateTime? ovc_tCreatedDate 
		 { 
		        
                    get{ return this._ovc_tCreatedDate; }
        						set{ this._ovc_tCreatedDate = value; } 										
	   }
	  ///<summary>
     ///ovc_cEventType property   
     ///</summary>   
     public string ovc_cEventType 
		 { 
		        
                    get{ return this._ovc_cEventType; }
        						set{ this._ovc_cEventType = value; } 										
	   }
	  ///<summary>
     ///Constructor   
     ///</summary>
        public CallerOperadorVirtualConfig() : base()
        {
            InitClass();
        }  
 ///<summary>
     ///Constructor   
     ///</summary>		
        public CallerOperadorVirtualConfig(int Id, string Name, string ovc_cDescripcion, int ovc_iStatus, string ovc_cDealers, string ovc_cEventos, DateTime? ovc_tLastUpdated, DateTime? ovc_tCreatedDate, string ovc_cEventType) : base()
        {
            base.Id = Id;
						base.Name = Name;				 																																					 
				    this._ovc_cDescripcion = ovc_cDescripcion;
this._ovc_iStatus = ovc_iStatus;
this._ovc_cDealers = ovc_cDealers;
this._ovc_cEventos = ovc_cEventos;
this._ovc_tLastUpdated = ovc_tLastUpdated;
this._ovc_tCreatedDate = ovc_tCreatedDate;
this._ovc_cEventType = ovc_cEventType;

            InitClass();
        }  								

				private void InitClass()
        {														
  				  base.Type = new ObjectType(7047, "OperadorVirtualConfig");
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
			SimpleOperadorVirtualConfig Simple = new SimpleOperadorVirtualConfig();
			Simple.Id = base.Id;
			Simple.Name = base.Name;
			Simple.ovc_cDescripcion = this._ovc_cDescripcion;
Simple.ovc_iStatus = this._ovc_iStatus;
Simple.ovc_cDealers = this._ovc_cDealers;
Simple.ovc_cEventos = this._ovc_cEventos;
Simple.ovc_tLastUpdated = this._ovc_tLastUpdated;
Simple.ovc_tCreatedDate = this._ovc_tCreatedDate;
Simple.ovc_cEventType = this._ovc_cEventType;

			return (SimpleBaseObject) Simple;
		}
 ///<summary>
     ///Sets a simpleobject   
     ///</summary>	
		public void SetSimpleObject(SimpleOperadorVirtualConfig Simple)
		{
			base.Id = Simple.Id;
			base.Name = Simple.Name;
			this._ovc_cDescripcion = Simple.ovc_cDescripcion;
this._ovc_iStatus = Simple.ovc_iStatus;
this._ovc_cDealers = Simple.ovc_cDealers;
this._ovc_cEventos = Simple.ovc_cEventos;
this._ovc_tLastUpdated = Simple.ovc_tLastUpdated;
this._ovc_tCreatedDate = Simple.ovc_tCreatedDate;
this._ovc_cEventType = Simple.ovc_cEventType;

		}
 ///<summary>
     ///Gets a baseobject   
     ///</summary>
		public override BaseObject GetBaseObject(SqlHelper SqlConfig, int UserId)
		{
			return new DalOperadorVirtualConfig(SqlConfig, UserId, (SimpleOperadorVirtualConfig) GetSimpleObject());
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
               dt.Columns.Add(new DataColumn("ovc_cDescripcion", typeof (string)));               
							 dt.Columns.Add(new DataColumn("ovc_iStatus", typeof (int)));               
							 dt.Columns.Add(new DataColumn("ovc_cDealers", typeof (string)));               
							 dt.Columns.Add(new DataColumn("ovc_cEventos", typeof (string)));               
							 dt.Columns.Add(new DataColumn("ovc_tLastUpdated", typeof (DateTime)));               
							 dt.Columns.Add(new DataColumn("ovc_tCreatedDate", typeof (DateTime)));               
							 dt.Columns.Add(new DataColumn("ovc_cEventType", typeof (string)));               
							 										
               //create Row  
               dr = dt.NewRow();
               
               //set Row
							 dr["Id"] = base.Id;

							 dr["Name"] = base.Name;
dr["ovc_cDescripcion"] = this._ovc_cDescripcion;
dr["ovc_iStatus"] = this._ovc_iStatus;
dr["ovc_cDealers"] = this._ovc_cDealers;
dr["ovc_cEventos"] = this._ovc_cEventos;
dr["ovc_tLastUpdated"] = this._ovc_tLastUpdated;
dr["ovc_tCreatedDate"] = this._ovc_tCreatedDate;
dr["ovc_cEventType"] = this._ovc_cEventType;
							 
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
