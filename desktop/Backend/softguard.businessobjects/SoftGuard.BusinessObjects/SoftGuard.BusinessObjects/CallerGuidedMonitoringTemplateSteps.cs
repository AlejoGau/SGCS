
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
    public class CallerGuidedMonitoringTemplateSteps : CallerObject
    { 	
				     private int _gms_iTemplateID;
					
				     private int _gms_iStepNumber;
					
				     private int _gms_iStepID;
					
				     private string _gms_cToolTip;
					
				     private string _gms_cText;
					
				     private string _gms_cListID;
				 ///<summary>
     ///gms_iTemplateID property   
     ///</summary>   
     public int gms_iTemplateID 
		 { 
		        
                    get{ return this._gms_iTemplateID; }
        						set{ this._gms_iTemplateID = value; } 										
	   }
	  ///<summary>
     ///gms_iStepNumber property   
     ///</summary>   
     public int gms_iStepNumber 
		 { 
		        
                    get{ return this._gms_iStepNumber; }
        						set{ this._gms_iStepNumber = value; } 										
	   }
	  ///<summary>
     ///gms_iStepID property   
     ///</summary>   
     public int gms_iStepID 
		 { 
		        
                    get{ return this._gms_iStepID; }
        						set{ this._gms_iStepID = value; } 										
	   }
	  ///<summary>
     ///gms_cToolTip property   
     ///</summary>   
     public string gms_cToolTip 
		 { 
		        
                    get{ return this._gms_cToolTip; }
        						set{ this._gms_cToolTip = value; } 										
	   }
	  ///<summary>
     ///gms_cText property   
     ///</summary>   
     public string gms_cText 
		 { 
		        
                    get{ return this._gms_cText; }
        						set{ this._gms_cText = value; } 										
	   }
	  ///<summary>
     ///gms_cListID property   
     ///</summary>   
     public string gms_cListID 
		 { 
		        
                    get{ return this._gms_cListID; }
        						set{ this._gms_cListID = value; } 										
	   }
	  ///<summary>
     ///Constructor   
     ///</summary>
        public CallerGuidedMonitoringTemplateSteps() : base()
        {
            InitClass();
        }  
 ///<summary>
     ///Constructor   
     ///</summary>		
        public CallerGuidedMonitoringTemplateSteps(int Id, string Name, int gms_iTemplateID, int gms_iStepNumber, int gms_iStepID, string gms_cToolTip, string gms_cText, string gms_cListID) : base()
        {
            base.Id = Id;
						base.Name = Name;				 																																					 
				    this._gms_iTemplateID = gms_iTemplateID;
this._gms_iStepNumber = gms_iStepNumber;
this._gms_iStepID = gms_iStepID;
this._gms_cToolTip = gms_cToolTip;
this._gms_cText = gms_cText;
this._gms_cListID = gms_cListID;

            InitClass();
        }  								

				private void InitClass()
        {														
  				  base.Type = new ObjectType(7045, "GuidedMonitoringTemplateSteps");
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
			SimpleGuidedMonitoringTemplateSteps Simple = new SimpleGuidedMonitoringTemplateSteps();
			Simple.Id = base.Id;
			Simple.Name = base.Name;
			Simple.gms_iTemplateID = this._gms_iTemplateID;
Simple.gms_iStepNumber = this._gms_iStepNumber;
Simple.gms_iStepID = this._gms_iStepID;
Simple.gms_cToolTip = this._gms_cToolTip;
Simple.gms_cText = this._gms_cText;
Simple.gms_cListID = this._gms_cListID;

			return (SimpleBaseObject) Simple;
		}
 ///<summary>
     ///Sets a simpleobject   
     ///</summary>	
		public void SetSimpleObject(SimpleGuidedMonitoringTemplateSteps Simple)
		{
			base.Id = Simple.Id;
			base.Name = Simple.Name;
			this._gms_iTemplateID = Simple.gms_iTemplateID;
this._gms_iStepNumber = Simple.gms_iStepNumber;
this._gms_iStepID = Simple.gms_iStepID;
this._gms_cToolTip = Simple.gms_cToolTip;
this._gms_cText = Simple.gms_cText;
this._gms_cListID = Simple.gms_cListID;

		}
 ///<summary>
     ///Gets a baseobject   
     ///</summary>
		public override BaseObject GetBaseObject(SqlHelper SqlConfig, int UserId)
		{
			return new DalGuidedMonitoringTemplateSteps(SqlConfig, UserId, (SimpleGuidedMonitoringTemplateSteps) GetSimpleObject());
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
               dt.Columns.Add(new DataColumn("gms_iTemplateID", typeof (int)));               
							 dt.Columns.Add(new DataColumn("gms_iStepNumber", typeof (int)));               
							 dt.Columns.Add(new DataColumn("gms_iStepID", typeof (int)));               
							 dt.Columns.Add(new DataColumn("gms_cToolTip", typeof (string)));               
							 dt.Columns.Add(new DataColumn("gms_cText", typeof (string)));               
							 dt.Columns.Add(new DataColumn("gms_cListID", typeof (string)));               
							 										
               //create Row  
               dr = dt.NewRow();
               
               //set Row
							 dr["Id"] = base.Id;

							 dr["Name"] = base.Name;
dr["gms_iTemplateID"] = this._gms_iTemplateID;
dr["gms_iStepNumber"] = this._gms_iStepNumber;
dr["gms_iStepID"] = this._gms_iStepID;
dr["gms_cToolTip"] = this._gms_cToolTip;
dr["gms_cText"] = this._gms_cText;
dr["gms_cListID"] = this._gms_cListID;
							 
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
