
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
    public class CallerGuidedMonitoringTemplate : CallerObject
    { 	
				     private string _gmt_cTemplateName;
					
				     private string _gmt_cDesc;
				 ///<summary>
     ///gmt_cTemplateName property   
     ///</summary>   
     public string gmt_cTemplateName 
		 { 
		        
                    get{ return this._gmt_cTemplateName; }
        						set{ this._gmt_cTemplateName = value; } 										
	   }
	  ///<summary>
     ///gmt_cDesc property   
     ///</summary>   
     public string gmt_cDesc 
		 { 
		        
                    get{ return this._gmt_cDesc; }
        						set{ this._gmt_cDesc = value; } 										
	   }
	  ///<summary>
     ///Constructor   
     ///</summary>
        public CallerGuidedMonitoringTemplate() : base()
        {
            InitClass();
        }  
 ///<summary>
     ///Constructor   
     ///</summary>		
        public CallerGuidedMonitoringTemplate(int Id, string Name, string gmt_cTemplateName, string gmt_cDesc) : base()
        {
            base.Id = Id;
						base.Name = Name;				 																																					 
				    this._gmt_cTemplateName = gmt_cTemplateName;
this._gmt_cDesc = gmt_cDesc;

            InitClass();
        }  								

				private void InitClass()
        {														
  				  base.Type = new ObjectType(7043, "GuidedMonitoringTemplate");
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
			SimpleGuidedMonitoringTemplate Simple = new SimpleGuidedMonitoringTemplate();
			Simple.Id = base.Id;
			Simple.Name = base.Name;
			Simple.gmt_cTemplateName = this._gmt_cTemplateName;
Simple.gmt_cDesc = this._gmt_cDesc;

			return (SimpleBaseObject) Simple;
		}
 ///<summary>
     ///Sets a simpleobject   
     ///</summary>	
		public void SetSimpleObject(SimpleGuidedMonitoringTemplate Simple)
		{
			base.Id = Simple.Id;
			base.Name = Simple.Name;
			this._gmt_cTemplateName = Simple.gmt_cTemplateName;
this._gmt_cDesc = Simple.gmt_cDesc;

		}
 ///<summary>
     ///Gets a baseobject   
     ///</summary>
		public override BaseObject GetBaseObject(SqlHelper SqlConfig, int UserId)
		{
			return new DalGuidedMonitoringTemplate(SqlConfig, UserId, (SimpleGuidedMonitoringTemplate) GetSimpleObject());
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
               dt.Columns.Add(new DataColumn("gmt_cTemplateName", typeof (string)));               
							 dt.Columns.Add(new DataColumn("gmt_cDesc", typeof (string)));               
							 										
               //create Row  
               dr = dt.NewRow();
               
               //set Row
							 dr["Id"] = base.Id;

							 dr["Name"] = base.Name;
dr["gmt_cTemplateName"] = this._gmt_cTemplateName;
dr["gmt_cDesc"] = this._gmt_cDesc;
							 
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
