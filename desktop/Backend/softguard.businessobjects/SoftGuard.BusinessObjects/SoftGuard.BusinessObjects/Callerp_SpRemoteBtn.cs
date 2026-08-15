
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
    public class Callerp_SpRemoteBtn : CallerObject
    { 	
				     private string _srb_spimei;
					
				     private string _srb_button_uuid;
					
				     private string _srb_action;
				 ///<summary>
     ///srb_spimei property   
     ///</summary>   
     public string srb_spimei 
		 { 
		        
                    get{ return this._srb_spimei; }
        						set{ this._srb_spimei = value; } 										
	   }
	  ///<summary>
     ///srb_button_uuid property   
     ///</summary>   
     public string srb_button_uuid 
		 { 
		        
                    get{ return this._srb_button_uuid; }
        						set{ this._srb_button_uuid = value; } 										
	   }
	  ///<summary>
     ///srb_action property   
     ///</summary>   
     public string srb_action 
		 { 
		        
                    get{ return this._srb_action; }
        						set{ this._srb_action = value; } 										
	   }
	  ///<summary>
     ///Constructor   
     ///</summary>
        public Callerp_SpRemoteBtn() : base()
        {
            InitClass();
        }  
 ///<summary>
     ///Constructor   
     ///</summary>		
        public Callerp_SpRemoteBtn(int Id, string Name, string srb_spimei, string srb_button_uuid, string srb_action) : base()
        {
            base.Id = Id;
						base.Name = Name;				 																																					 
				    this._srb_spimei = srb_spimei;
this._srb_button_uuid = srb_button_uuid;
this._srb_action = srb_action;

            InitClass();
        }  								

				private void InitClass()
        {														
  				  base.Type = new ObjectType(3195, "p_SpRemoteBtn");
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
			Simplep_SpRemoteBtn Simple = new Simplep_SpRemoteBtn();
			Simple.Id = base.Id;
			Simple.Name = base.Name;
			Simple.srb_spimei = this._srb_spimei;
Simple.srb_button_uuid = this._srb_button_uuid;
Simple.srb_action = this._srb_action;

			return (SimpleBaseObject) Simple;
		}
 ///<summary>
     ///Sets a simpleobject   
     ///</summary>	
		public void SetSimpleObject(Simplep_SpRemoteBtn Simple)
		{
			base.Id = Simple.Id;
			base.Name = Simple.Name;
			this._srb_spimei = Simple.srb_spimei;
this._srb_button_uuid = Simple.srb_button_uuid;
this._srb_action = Simple.srb_action;

		}
 ///<summary>
     ///Gets a baseobject   
     ///</summary>
		public override BaseObject GetBaseObject(SqlHelper SqlConfig, int UserId)
		{
			return new Dalp_SpRemoteBtn(SqlConfig, UserId, (Simplep_SpRemoteBtn) GetSimpleObject());
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
               dt.Columns.Add(new DataColumn("srb_spimei", typeof (string)));               
							 dt.Columns.Add(new DataColumn("srb_button_uuid", typeof (string)));               
							 dt.Columns.Add(new DataColumn("srb_action", typeof (string)));               
							 										
               //create Row  
               dr = dt.NewRow();
               
               //set Row
							 dr["Id"] = base.Id;

							 dr["Name"] = base.Name;
dr["srb_spimei"] = this._srb_spimei;
dr["srb_button_uuid"] = this._srb_button_uuid;
dr["srb_action"] = this._srb_action;
							 
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
