
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
    public class CallerGeoFense : CallerObject
    { 	
				     private string _GeoType;
					
				     private string _Dealer;
					
				     private string _MetaData;
					
				     private string _Style;
					
				     private int _MaxSpeed;
					
				     private int _GeoGroup;
				 ///<summary>
     ///GeoType property   
     ///</summary>   
     public string GeoType 
		 { 
		        
                    get{ return this._GeoType; }
        						set{ this._GeoType = value; } 										
	   }
	  ///<summary>
     ///Dealer property   
     ///</summary>   
     public string Dealer 
		 { 
		        
                    get{ return this._Dealer; }
        						set{ this._Dealer = value; } 										
	   }
	  ///<summary>
     ///MetaData property   
     ///</summary>   
     public string MetaData 
		 { 
		        
                    get{ return this._MetaData; }
        						set{ this._MetaData = value; } 										
	   }
	  ///<summary>
     ///Style property   
     ///</summary>   
     public string Style 
		 { 
		        
                    get{ return this._Style; }
        						set{ this._Style = value; } 										
	   }
	  ///<summary>
     ///MaxSpeed property   
     ///</summary>   
     public int MaxSpeed 
		 { 
		        
                    get{ return this._MaxSpeed; }
        						set{ this._MaxSpeed = value; } 										
	   }
	  ///<summary>
     ///GeoGroup property   
     ///</summary>   
     public int GeoGroup 
		 { 
		        
                    get{ return this._GeoGroup; }
        						set{ this._GeoGroup = value; } 										
	   }
	  ///<summary>
     ///Constructor   
     ///</summary>
        public CallerGeoFense() : base()
        {
            InitClass();
        }  
 ///<summary>
     ///Constructor   
     ///</summary>		
        public CallerGeoFense(int Id, string Name, string GeoType, string Dealer, string MetaData, string Style, int MaxSpeed, int GeoGroup) : base()
        {
            base.Id = Id;
						base.Name = Name;				 																																					 
				    this._GeoType = GeoType;
this._Dealer = Dealer;
this._MetaData = MetaData;
this._Style = Style;
this._MaxSpeed = MaxSpeed;
this._GeoGroup = GeoGroup;

            InitClass();
        }  								

				private void InitClass()
        {														
  				  base.Type = new ObjectType(3060, "GeoFense");
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
			SimpleGeoFense Simple = new SimpleGeoFense();
			Simple.Id = base.Id;
			Simple.Name = base.Name;
			Simple.GeoType = this._GeoType;
Simple.Dealer = this._Dealer;
Simple.MetaData = this._MetaData;
Simple.Style = this._Style;
Simple.MaxSpeed = this._MaxSpeed;
Simple.GeoGroup = this._GeoGroup;

			return (SimpleBaseObject) Simple;
		}
 ///<summary>
     ///Sets a simpleobject   
     ///</summary>	
		public void SetSimpleObject(SimpleGeoFense Simple)
		{
			base.Id = Simple.Id;
			base.Name = Simple.Name;
			this._GeoType = Simple.GeoType;
this._Dealer = Simple.Dealer;
this._MetaData = Simple.MetaData;
this._Style = Simple.Style;
this._MaxSpeed = Simple.MaxSpeed;
this._GeoGroup = Simple.GeoGroup;

		}
 ///<summary>
     ///Gets a baseobject   
     ///</summary>
		public override BaseObject GetBaseObject(SqlHelper SqlConfig, int UserId)
		{
			return new DalGeoFense(SqlConfig, UserId, (SimpleGeoFense) GetSimpleObject());
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
               dt.Columns.Add(new DataColumn("GeoType", typeof (string)));               
							 dt.Columns.Add(new DataColumn("Dealer", typeof (string)));               
							 dt.Columns.Add(new DataColumn("MetaData", typeof (string)));               
							 dt.Columns.Add(new DataColumn("Style", typeof (string)));               
							 dt.Columns.Add(new DataColumn("MaxSpeed", typeof (int)));               
							 dt.Columns.Add(new DataColumn("GeoGroup", typeof (int)));               
							 										
               //create Row  
               dr = dt.NewRow();
               
               //set Row
							 dr["Id"] = base.Id;

							 dr["Name"] = base.Name;
dr["GeoType"] = this._GeoType;
dr["Dealer"] = this._Dealer;
dr["MetaData"] = this._MetaData;
dr["Style"] = this._Style;
dr["MaxSpeed"] = this._MaxSpeed;
dr["GeoGroup"] = this._GeoGroup;
							 
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
