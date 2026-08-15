
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
    public class Callert_linkurl : CallerObject
    { 	
				     private string _url_cname;
					
				     private string _url_cdescripcion;
					
				     private string _url_curl;
					
				     private string _url_cDealer;
				 ///<summary>
     ///url_cname property   
     ///</summary>   
     public string url_cname 
		 { 
		        
                    get{ return this._url_cname; }
        						set{ this._url_cname = value; } 										
	   }
	  ///<summary>
     ///url_cdescripcion property   
     ///</summary>   
     public string url_cdescripcion 
		 { 
		        
                    get{ return this._url_cdescripcion; }
        						set{ this._url_cdescripcion = value; } 										
	   }
	  ///<summary>
     ///url_curl property   
     ///</summary>   
     public string url_curl 
		 { 
		        
                    get{ return this._url_curl; }
        						set{ this._url_curl = value; } 										
	   }
	  ///<summary>
     ///url_cDealer property   
     ///</summary>   
     public string url_cDealer 
		 { 
		        
                    get{ return this._url_cDealer; }
        						set{ this._url_cDealer = value; } 										
	   }
	  ///<summary>
     ///Constructor   
     ///</summary>
        public Callert_linkurl() : base()
        {
            InitClass();
        }  
 ///<summary>
     ///Constructor   
     ///</summary>		
        public Callert_linkurl(int Id, string Name, string url_cname, string url_cdescripcion, string url_curl, string url_cDealer) : base()
        {
            base.Id = Id;
						base.Name = Name;				 																																					 
				    this._url_cname = url_cname;
this._url_cdescripcion = url_cdescripcion;
this._url_curl = url_curl;
this._url_cDealer = url_cDealer;

            InitClass();
        }  								

				private void InitClass()
        {														
  				  base.Type = new ObjectType(3136, "t_linkurl");
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
			Simplet_linkurl Simple = new Simplet_linkurl();
			Simple.Id = base.Id;
			Simple.Name = base.Name;
			Simple.url_cname = this._url_cname;
Simple.url_cdescripcion = this._url_cdescripcion;
Simple.url_curl = this._url_curl;
Simple.url_cDealer = this._url_cDealer;

			return (SimpleBaseObject) Simple;
		}
 ///<summary>
     ///Sets a simpleobject   
     ///</summary>	
		public void SetSimpleObject(Simplet_linkurl Simple)
		{
			base.Id = Simple.Id;
			base.Name = Simple.Name;
			this._url_cname = Simple.url_cname;
this._url_cdescripcion = Simple.url_cdescripcion;
this._url_curl = Simple.url_curl;
this._url_cDealer = Simple.url_cDealer;

		}
 ///<summary>
     ///Gets a baseobject   
     ///</summary>
		public override BaseObject GetBaseObject(SqlHelper SqlConfig, int UserId)
		{
			return new Dalt_linkurl(SqlConfig, UserId, (Simplet_linkurl) GetSimpleObject());
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
               dt.Columns.Add(new DataColumn("url_cname", typeof (string)));               
							 dt.Columns.Add(new DataColumn("url_cdescripcion", typeof (string)));               
							 dt.Columns.Add(new DataColumn("url_curl", typeof (string)));               
							 dt.Columns.Add(new DataColumn("url_cDealer", typeof (string)));               
							 										
               //create Row  
               dr = dt.NewRow();
               
               //set Row
							 dr["Id"] = base.Id;

							 dr["Name"] = base.Name;
dr["url_cname"] = this._url_cname;
dr["url_cdescripcion"] = this._url_cdescripcion;
dr["url_curl"] = this._url_curl;
dr["url_cDealer"] = this._url_cDealer;
							 
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
