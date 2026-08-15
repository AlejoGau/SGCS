
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
    public class CallerTG_Route_Geofences : CallerObject
    { 	
				     private int _routeId;
					
				     private int _geofenceid;
					
				     private int _time;
					
				     private int _beforetolerance;
					
				     private int _aftertolerance;
					
				     private int _order;
				 ///<summary>
     ///routeId property   
     ///</summary>   
     public int routeId 
		 { 
		        
                    get{ return this._routeId; }
        						set{ this._routeId = value; } 										
	   }
	  ///<summary>
     ///geofenceid property   
     ///</summary>   
     public int geofenceid 
		 { 
		        
                    get{ return this._geofenceid; }
        						set{ this._geofenceid = value; } 										
	   }
	  ///<summary>
     ///time property   
     ///</summary>   
     public int time 
		 { 
		        
                    get{ return this._time; }
        						set{ this._time = value; } 										
	   }
	  ///<summary>
     ///beforetolerance property   
     ///</summary>   
     public int beforetolerance 
		 { 
		        
                    get{ return this._beforetolerance; }
        						set{ this._beforetolerance = value; } 										
	   }
	  ///<summary>
     ///aftertolerance property   
     ///</summary>   
     public int aftertolerance 
		 { 
		        
                    get{ return this._aftertolerance; }
        						set{ this._aftertolerance = value; } 										
	   }
	  ///<summary>
     ///order property   
     ///</summary>   
     public int order 
		 { 
		        
                    get{ return this._order; }
        						set{ this._order = value; } 										
	   }
	  ///<summary>
     ///Constructor   
     ///</summary>
        public CallerTG_Route_Geofences() : base()
        {
            InitClass();
        }  
 ///<summary>
     ///Constructor   
     ///</summary>		
        public CallerTG_Route_Geofences(int Id, string Name, int routeId, int geofenceid, int time, int beforetolerance, int aftertolerance, int order) : base()
        {
            base.Id = Id;
						base.Name = Name;				 																																					 
				    this._routeId = routeId;
this._geofenceid = geofenceid;
this._time = time;
this._beforetolerance = beforetolerance;
this._aftertolerance = aftertolerance;
this._order = order;

            InitClass();
        }  								

				private void InitClass()
        {														
  				  base.Type = new ObjectType(3172, "TG_Route_Geofences");
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
			SimpleTG_Route_Geofences Simple = new SimpleTG_Route_Geofences();
			Simple.Id = base.Id;
			Simple.Name = base.Name;
			Simple.routeId = this._routeId;
Simple.geofenceid = this._geofenceid;
Simple.time = this._time;
Simple.beforetolerance = this._beforetolerance;
Simple.aftertolerance = this._aftertolerance;
Simple.order = this._order;

			return (SimpleBaseObject) Simple;
		}
 ///<summary>
     ///Sets a simpleobject   
     ///</summary>	
		public void SetSimpleObject(SimpleTG_Route_Geofences Simple)
		{
			base.Id = Simple.Id;
			base.Name = Simple.Name;
			this._routeId = Simple.routeId;
this._geofenceid = Simple.geofenceid;
this._time = Simple.time;
this._beforetolerance = Simple.beforetolerance;
this._aftertolerance = Simple.aftertolerance;
this._order = Simple.order;

		}
 ///<summary>
     ///Gets a baseobject   
     ///</summary>
		public override BaseObject GetBaseObject(SqlHelper SqlConfig, int UserId)
		{
			return new DalTG_Route_Geofences(SqlConfig, UserId, (SimpleTG_Route_Geofences) GetSimpleObject());
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
							 dt.Columns.Add(new DataColumn("geofenceid", typeof (int)));               
							 dt.Columns.Add(new DataColumn("time", typeof (int)));               
							 dt.Columns.Add(new DataColumn("beforetolerance", typeof (int)));               
							 dt.Columns.Add(new DataColumn("aftertolerance", typeof (int)));               
							 dt.Columns.Add(new DataColumn("order", typeof (int)));               
							 										
               //create Row  
               dr = dt.NewRow();
               
               //set Row
							 dr["Id"] = base.Id;

							 dr["Name"] = base.Name;
dr["routeId"] = this._routeId;
dr["geofenceid"] = this._geofenceid;
dr["time"] = this._time;
dr["beforetolerance"] = this._beforetolerance;
dr["aftertolerance"] = this._aftertolerance;
dr["order"] = this._order;
							 
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
