
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
    public class Callerm_sgnotes : CallerObject
    { 	
				     private string _sgn_title;
					
				     private string _sgn_body;
					
				     private int _sgn_userid;
					
				     private int _sgn_status;
					
				     private DateTime? _sgn_datecreated;
					
				     private int _sgn_fileduserid;
				 ///<summary>
     ///sgn_title property   
     ///</summary>   
     public string sgn_title 
		 { 
		        
                    get{ return this._sgn_title; }
        						set{ this._sgn_title = value; } 										
	   }
	  ///<summary>
     ///sgn_body property   
     ///</summary>   
     public string sgn_body 
		 { 
		        
                    get{ return this._sgn_body; }
        						set{ this._sgn_body = value; } 										
	   }
	  ///<summary>
     ///sgn_userid property   
     ///</summary>   
     public int sgn_userid 
		 { 
		        
                    get{ return this._sgn_userid; }
        						set{ this._sgn_userid = value; } 										
	   }
	  ///<summary>
     ///sgn_status property   
     ///</summary>   
     public int sgn_status 
		 { 
		        
                    get{ return this._sgn_status; }
        						set{ this._sgn_status = value; } 										
	   }
	  ///<summary>
     ///sgn_datecreated property   
     ///</summary>   
     public DateTime? sgn_datecreated 
		 { 
		        
                    get{ return this._sgn_datecreated; }
        						set{ this._sgn_datecreated = value; } 										
	   }
	  ///<summary>
     ///sgn_fileduserid property   
     ///</summary>   
     public int sgn_fileduserid 
		 { 
		        
                    get{ return this._sgn_fileduserid; }
        						set{ this._sgn_fileduserid = value; } 										
	   }
	  ///<summary>
     ///Constructor   
     ///</summary>
        public Callerm_sgnotes() : base()
        {
            InitClass();
        }  
 ///<summary>
     ///Constructor   
     ///</summary>		
        public Callerm_sgnotes(int Id, string Name, string sgn_title, string sgn_body, int sgn_userid, int sgn_status, DateTime? sgn_datecreated, int sgn_fileduserid) : base()
        {
            base.Id = Id;
						base.Name = Name;				 																																					 
				    this._sgn_title = sgn_title;
this._sgn_body = sgn_body;
this._sgn_userid = sgn_userid;
this._sgn_status = sgn_status;
this._sgn_datecreated = sgn_datecreated;
this._sgn_fileduserid = sgn_fileduserid;

            InitClass();
        }  								

				private void InitClass()
        {														
  				  base.Type = new ObjectType(3222, "m_sgnotes");
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
			Simplem_sgnotes Simple = new Simplem_sgnotes();
			Simple.Id = base.Id;
			Simple.Name = base.Name;
			Simple.sgn_title = this._sgn_title;
Simple.sgn_body = this._sgn_body;
Simple.sgn_userid = this._sgn_userid;
Simple.sgn_status = this._sgn_status;
Simple.sgn_datecreated = this._sgn_datecreated;
Simple.sgn_fileduserid = this._sgn_fileduserid;

			return (SimpleBaseObject) Simple;
		}
 ///<summary>
     ///Sets a simpleobject   
     ///</summary>	
		public void SetSimpleObject(Simplem_sgnotes Simple)
		{
			base.Id = Simple.Id;
			base.Name = Simple.Name;
			this._sgn_title = Simple.sgn_title;
this._sgn_body = Simple.sgn_body;
this._sgn_userid = Simple.sgn_userid;
this._sgn_status = Simple.sgn_status;
this._sgn_datecreated = Simple.sgn_datecreated;
this._sgn_fileduserid = Simple.sgn_fileduserid;

		}
 ///<summary>
     ///Gets a baseobject   
     ///</summary>
		public override BaseObject GetBaseObject(SqlHelper SqlConfig, int UserId)
		{
			return new Dalm_sgnotes(SqlConfig, UserId, (Simplem_sgnotes) GetSimpleObject());
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
               dt.Columns.Add(new DataColumn("sgn_title", typeof (string)));               
							 dt.Columns.Add(new DataColumn("sgn_body", typeof (string)));               
							 dt.Columns.Add(new DataColumn("sgn_userid", typeof (int)));               
							 dt.Columns.Add(new DataColumn("sgn_status", typeof (int)));               
							 dt.Columns.Add(new DataColumn("sgn_datecreated", typeof (DateTime)));               
							 dt.Columns.Add(new DataColumn("sgn_fileduserid", typeof (int)));               
							 										
               //create Row  
               dr = dt.NewRow();
               
               //set Row
							 dr["Id"] = base.Id;

							 dr["Name"] = base.Name;
dr["sgn_title"] = this._sgn_title;
dr["sgn_body"] = this._sgn_body;
dr["sgn_userid"] = this._sgn_userid;
dr["sgn_status"] = this._sgn_status;
dr["sgn_datecreated"] = this._sgn_datecreated;
dr["sgn_fileduserid"] = this._sgn_fileduserid;
							 
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
