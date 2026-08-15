
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
    public class CallerTG_Route_Programs : CallerObject
    { 	
				     private int _routeId;
					
				     private string _programtype;
					
				     private int _starthour;
					
				     private int _startminutes;
					
				     private int _dayofweek;
					
				     private int _dayofmonth;
				 ///<summary>
     ///routeId property   
     ///</summary>   
     public int routeId 
		 { 
		        
                    get{ return this._routeId; }
        						set{ this._routeId = value; } 										
	   }
	  ///<summary>
     ///programtype property   
     ///</summary>   
     public string programtype 
		 { 
		        
                    get{ return this._programtype; }
        						set{ this._programtype = value; } 										
	   }
	  ///<summary>
     ///starthour property   
     ///</summary>   
     public int starthour 
		 { 
		        
                    get{ return this._starthour; }
        						set{ this._starthour = value; } 										
	   }
	  ///<summary>
     ///startminutes property   
     ///</summary>   
     public int startminutes 
		 { 
		        
                    get{ return this._startminutes; }
        						set{ this._startminutes = value; } 										
	   }
	  ///<summary>
     ///dayofweek property   
     ///</summary>   
     public int dayofweek 
		 { 
		        
                    get{ return this._dayofweek; }
        						set{ this._dayofweek = value; } 										
	   }
	  ///<summary>
     ///dayofmonth property   
     ///</summary>   
     public int dayofmonth 
		 { 
		        
                    get{ return this._dayofmonth; }
        						set{ this._dayofmonth = value; } 										
	   }
	  ///<summary>
     ///Constructor   
     ///</summary>
        public CallerTG_Route_Programs() : base()
        {
            InitClass();
        }  
 ///<summary>
     ///Constructor   
     ///</summary>		
        public CallerTG_Route_Programs(int Id, string Name, int routeId, string programtype, int starthour, int startminutes, int dayofweek, int dayofmonth) : base()
        {
            base.Id = Id;
						base.Name = Name;				 																																					 
				    this._routeId = routeId;
this._programtype = programtype;
this._starthour = starthour;
this._startminutes = startminutes;
this._dayofweek = dayofweek;
this._dayofmonth = dayofmonth;

            InitClass();
        }  								

				private void InitClass()
        {														
  				  base.Type = new ObjectType(3171, "TG_Route_Programs");
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
			SimpleTG_Route_Programs Simple = new SimpleTG_Route_Programs();
			Simple.Id = base.Id;
			Simple.Name = base.Name;
			Simple.routeId = this._routeId;
Simple.programtype = this._programtype;
Simple.starthour = this._starthour;
Simple.startminutes = this._startminutes;
Simple.dayofweek = this._dayofweek;
Simple.dayofmonth = this._dayofmonth;

			return (SimpleBaseObject) Simple;
		}
 ///<summary>
     ///Sets a simpleobject   
     ///</summary>	
		public void SetSimpleObject(SimpleTG_Route_Programs Simple)
		{
			base.Id = Simple.Id;
			base.Name = Simple.Name;
			this._routeId = Simple.routeId;
this._programtype = Simple.programtype;
this._starthour = Simple.starthour;
this._startminutes = Simple.startminutes;
this._dayofweek = Simple.dayofweek;
this._dayofmonth = Simple.dayofmonth;

		}
 ///<summary>
     ///Gets a baseobject   
     ///</summary>
		public override BaseObject GetBaseObject(SqlHelper SqlConfig, int UserId)
		{
			return new DalTG_Route_Programs(SqlConfig, UserId, (SimpleTG_Route_Programs) GetSimpleObject());
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
               dt.Columns.Add(new DataColumn("routeId", typeof (int)));               
							 dt.Columns.Add(new DataColumn("programtype", typeof (string)));               
							 dt.Columns.Add(new DataColumn("starthour", typeof (int)));               
							 dt.Columns.Add(new DataColumn("startminutes", typeof (int)));               
							 dt.Columns.Add(new DataColumn("dayofweek", typeof (int)));               
							 dt.Columns.Add(new DataColumn("dayofmonth", typeof (int)));               
							 										
               //create Row  
               dr = dt.NewRow();
               
               //set Row
							 dr["Id"] = base.Id;

							 dr["Name"] = base.Name;
dr["routeId"] = this._routeId;
dr["programtype"] = this._programtype;
dr["starthour"] = this._starthour;
dr["startminutes"] = this._startminutes;
dr["dayofweek"] = this._dayofweek;
dr["dayofmonth"] = this._dayofmonth;
							 
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
