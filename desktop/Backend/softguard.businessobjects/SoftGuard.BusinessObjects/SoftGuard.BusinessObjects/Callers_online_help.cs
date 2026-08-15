
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
    public class Callers_online_help : CallerObject
    { 	
				     private string _UiApplication;
					
				     private string _Language;
					
				     private string _Translation;
					
				     private string _Status;
					
				     private DateTime? _Created;
					
				     private DateTime? _Modified;
					
				     private int _UserId;
					
				     private string _UserName;
				 ///<summary>
     ///UiApplication property   
     ///</summary>   
     public string UiApplication 
		 { 
		        
                    get{ return this._UiApplication; }
        						set{ this._UiApplication = value; } 										
	   }
	  ///<summary>
     ///Language property   
     ///</summary>   
     public string Language 
		 { 
		        
                    get{ return this._Language; }
        						set{ this._Language = value; } 										
	   }
	  ///<summary>
     ///Translation property   
     ///</summary>   
     public string Translation 
		 { 
		        
                    get{ return this._Translation; }
        						set{ this._Translation = value; } 										
	   }
	  ///<summary>
     ///Status property   
     ///</summary>   
     public string Status 
		 { 
		        
                    get{ return this._Status; }
        						set{ this._Status = value; } 										
	   }
	  ///<summary>
     ///Created property   
     ///</summary>   
     public DateTime? Created 
		 { 
		        
                    get{ return this._Created; }
        						set{ this._Created = value; } 										
	   }
	  ///<summary>
     ///Modified property   
     ///</summary>   
     public DateTime? Modified 
		 { 
		        
                    get{ return this._Modified; }
        						set{ this._Modified = value; } 										
	   }
	  ///<summary>
     ///UserId property   
     ///</summary>   
     public int UserId 
		 { 
		        
                    get{ return this._UserId; }
        						set{ this._UserId = value; } 										
	   }
	  ///<summary>
     ///UserName property   
     ///</summary>   
     public string UserName 
		 { 
		        
                    get{ return this._UserName; }
        						set{ this._UserName = value; } 										
	   }
	  ///<summary>
     ///Constructor   
     ///</summary>
        public Callers_online_help() : base()
        {
            InitClass();
        }  
 ///<summary>
     ///Constructor   
     ///</summary>		
        public Callers_online_help(int Id, string Name, string UiApplication, string Language, string Translation, string Status, DateTime? Created, DateTime? Modified, int UserId, string UserName) : base()
        {
            base.Id = Id;
						base.Name = Name;				 																																					 
				    this._UiApplication = UiApplication;
this._Language = Language;
this._Translation = Translation;
this._Status = Status;
this._Created = Created;
this._Modified = Modified;
this._UserId = UserId;
this._UserName = UserName;

            InitClass();
        }  								

				private void InitClass()
        {														
  				  base.Type = new ObjectType(3167, "s_online_help");
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
			Simples_online_help Simple = new Simples_online_help();
			Simple.Id = base.Id;
			Simple.Name = base.Name;
			Simple.UiApplication = this._UiApplication;
Simple.Language = this._Language;
Simple.Translation = this._Translation;
Simple.Status = this._Status;
Simple.Created = this._Created;
Simple.Modified = this._Modified;
Simple.UserId = this._UserId;
Simple.UserName = this._UserName;

			return (SimpleBaseObject) Simple;
		}
 ///<summary>
     ///Sets a simpleobject   
     ///</summary>	
		public void SetSimpleObject(Simples_online_help Simple)
		{
			base.Id = Simple.Id;
			base.Name = Simple.Name;
			this._UiApplication = Simple.UiApplication;
this._Language = Simple.Language;
this._Translation = Simple.Translation;
this._Status = Simple.Status;
this._Created = Simple.Created;
this._Modified = Simple.Modified;
this._UserId = Simple.UserId;
this._UserName = Simple.UserName;

		}
 ///<summary>
     ///Gets a baseobject   
     ///</summary>
		public override BaseObject GetBaseObject(SqlHelper SqlConfig, int UserId)
		{
			return new Dals_online_help(SqlConfig, UserId, (Simples_online_help) GetSimpleObject());
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
               dt.Columns.Add(new DataColumn("UiApplication", typeof (string)));               
							 dt.Columns.Add(new DataColumn("Language", typeof (string)));               
							 dt.Columns.Add(new DataColumn("Translation", typeof (string)));               
							 dt.Columns.Add(new DataColumn("Status", typeof (string)));               
							 dt.Columns.Add(new DataColumn("Created", typeof (DateTime)));               
							 dt.Columns.Add(new DataColumn("Modified", typeof (DateTime)));               
							 dt.Columns.Add(new DataColumn("UserId", typeof (int)));               
							 dt.Columns.Add(new DataColumn("UserName", typeof (string)));               
							 										
               //create Row  
               dr = dt.NewRow();
               
               //set Row
							 dr["Id"] = base.Id;

							 dr["Name"] = base.Name;
dr["UiApplication"] = this._UiApplication;
dr["Language"] = this._Language;
dr["Translation"] = this._Translation;
dr["Status"] = this._Status;
dr["Created"] = this._Created;
dr["Modified"] = this._Modified;
dr["UserId"] = this._UserId;
dr["UserName"] = this._UserName;
							 
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
