
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
    public class CallerSV_Route_Programs : CallerObject
    { 	
				     private int _srp_iid;
					
				     private int _srp_iRouteId;
					
				     private string _srp_cProgramType;
					
				     private int _srp_iStartHour;
					
				     private int _srp_iStartMinutes;
					
				     private int _srp_iDayOfWeek;
					
				     private int _srp_iDayOfMonth;
				 ///<summary>
     ///srp_iid property   
     ///</summary>   
     public int srp_iid 
		 { 
		        
                    get{ return this._srp_iid; }
        						set{ this._srp_iid = value; } 										
	   }
	  ///<summary>
     ///srp_iRouteId property   
     ///</summary>   
     public int srp_iRouteId 
		 { 
		        
                    get{ return this._srp_iRouteId; }
        						set{ this._srp_iRouteId = value; } 										
	   }
	  ///<summary>
     ///srp_cProgramType property   
     ///</summary>   
     public string srp_cProgramType 
		 { 
		        
                    get{ return this._srp_cProgramType; }
        						set{ this._srp_cProgramType = value; } 										
	   }
	  ///<summary>
     ///srp_iStartHour property   
     ///</summary>   
     public int srp_iStartHour 
		 { 
		        
                    get{ return this._srp_iStartHour; }
        						set{ this._srp_iStartHour = value; } 										
	   }
	  ///<summary>
     ///srp_iStartMinutes property   
     ///</summary>   
     public int srp_iStartMinutes 
		 { 
		        
                    get{ return this._srp_iStartMinutes; }
        						set{ this._srp_iStartMinutes = value; } 										
	   }
	  ///<summary>
     ///srp_iDayOfWeek property   
     ///</summary>   
     public int srp_iDayOfWeek 
		 { 
		        
                    get{ return this._srp_iDayOfWeek; }
        						set{ this._srp_iDayOfWeek = value; } 										
	   }
	  ///<summary>
     ///srp_iDayOfMonth property   
     ///</summary>   
     public int srp_iDayOfMonth 
		 { 
		        
                    get{ return this._srp_iDayOfMonth; }
        						set{ this._srp_iDayOfMonth = value; } 										
	   }
	  ///<summary>
     ///Constructor   
     ///</summary>
        public CallerSV_Route_Programs() : base()
        {
            InitClass();
        }  
 ///<summary>
     ///Constructor   
     ///</summary>		
        public CallerSV_Route_Programs(int Id, string Name, int srp_iid, int srp_iRouteId, string srp_cProgramType, int srp_iStartHour, int srp_iStartMinutes, int srp_iDayOfWeek, int srp_iDayOfMonth) : base()
        {
            base.Id = Id;
						base.Name = Name;				 																																					 
				    this._srp_iid = srp_iid;
this._srp_iRouteId = srp_iRouteId;
this._srp_cProgramType = srp_cProgramType;
this._srp_iStartHour = srp_iStartHour;
this._srp_iStartMinutes = srp_iStartMinutes;
this._srp_iDayOfWeek = srp_iDayOfWeek;
this._srp_iDayOfMonth = srp_iDayOfMonth;

            InitClass();
        }  								

				private void InitClass()
        {														
  				  base.Type = new ObjectType(3303, "SV_Route_Programs");
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
			SimpleSV_Route_Programs Simple = new SimpleSV_Route_Programs();
			Simple.Id = base.Id;
			Simple.Name = base.Name;
			Simple.srp_iid = this._srp_iid;
Simple.srp_iRouteId = this._srp_iRouteId;
Simple.srp_cProgramType = this._srp_cProgramType;
Simple.srp_iStartHour = this._srp_iStartHour;
Simple.srp_iStartMinutes = this._srp_iStartMinutes;
Simple.srp_iDayOfWeek = this._srp_iDayOfWeek;
Simple.srp_iDayOfMonth = this._srp_iDayOfMonth;

			return (SimpleBaseObject) Simple;
		}
 ///<summary>
     ///Sets a simpleobject   
     ///</summary>	
		public void SetSimpleObject(SimpleSV_Route_Programs Simple)
		{
			base.Id = Simple.Id;
			base.Name = Simple.Name;
			this._srp_iid = Simple.srp_iid;
this._srp_iRouteId = Simple.srp_iRouteId;
this._srp_cProgramType = Simple.srp_cProgramType;
this._srp_iStartHour = Simple.srp_iStartHour;
this._srp_iStartMinutes = Simple.srp_iStartMinutes;
this._srp_iDayOfWeek = Simple.srp_iDayOfWeek;
this._srp_iDayOfMonth = Simple.srp_iDayOfMonth;

		}
 ///<summary>
     ///Gets a baseobject   
     ///</summary>
		public override BaseObject GetBaseObject(SqlHelper SqlConfig, int UserId)
		{
			return new DalSV_Route_Programs(SqlConfig, UserId, (SimpleSV_Route_Programs) GetSimpleObject());
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
               dt.Columns.Add(new DataColumn("srp_iid", typeof (int)));               
							 dt.Columns.Add(new DataColumn("srp_iRouteId", typeof (int)));               
							 dt.Columns.Add(new DataColumn("srp_cProgramType", typeof (string)));               
							 dt.Columns.Add(new DataColumn("srp_iStartHour", typeof (int)));               
							 dt.Columns.Add(new DataColumn("srp_iStartMinutes", typeof (int)));               
							 dt.Columns.Add(new DataColumn("srp_iDayOfWeek", typeof (int)));               
							 dt.Columns.Add(new DataColumn("srp_iDayOfMonth", typeof (int)));               
							 										
               //create Row  
               dr = dt.NewRow();
               
               //set Row
							 dr["Id"] = base.Id;

							 dr["Name"] = base.Name;
dr["srp_iid"] = this._srp_iid;
dr["srp_iRouteId"] = this._srp_iRouteId;
dr["srp_cProgramType"] = this._srp_cProgramType;
dr["srp_iStartHour"] = this._srp_iStartHour;
dr["srp_iStartMinutes"] = this._srp_iStartMinutes;
dr["srp_iDayOfWeek"] = this._srp_iDayOfWeek;
dr["srp_iDayOfMonth"] = this._srp_iDayOfMonth;
							 
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
