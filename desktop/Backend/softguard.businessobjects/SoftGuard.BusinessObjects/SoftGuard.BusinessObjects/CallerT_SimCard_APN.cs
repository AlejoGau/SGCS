
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
    public class CallerT_SimCard_APN : CallerObject
    { 	
				     private string _tsa_cDescripcion;
					
				     private string _tsa_cURL;
					
				     private string _tsa_cUser;
					
				     private string _tnd_cPassword;
				 ///<summary>
     ///tsa_cDescripcion property   
     ///</summary>   
     public string tsa_cDescripcion 
		 { 
		        
                    get{ return this._tsa_cDescripcion; }
        						set{ this._tsa_cDescripcion = value; } 										
	   }
	  ///<summary>
     ///tsa_cURL property   
     ///</summary>   
     public string tsa_cURL 
		 { 
		        
                    get{ return this._tsa_cURL; }
        						set{ this._tsa_cURL = value; } 										
	   }
	  ///<summary>
     ///tsa_cUser property   
     ///</summary>   
     public string tsa_cUser 
		 { 
		        
                    get{ return this._tsa_cUser; }
        						set{ this._tsa_cUser = value; } 										
	   }
	  ///<summary>
     ///tnd_cPassword property   
     ///</summary>   
     public string tnd_cPassword 
		 { 
		        
                    get{ return this._tnd_cPassword; }
        						set{ this._tnd_cPassword = value; } 										
	   }
	  ///<summary>
     ///Constructor   
     ///</summary>
        public CallerT_SimCard_APN() : base()
        {
            InitClass();
        }  
 ///<summary>
     ///Constructor   
     ///</summary>		
        public CallerT_SimCard_APN(int Id, string Name, string tsa_cDescripcion, string tsa_cURL, string tsa_cUser, string tnd_cPassword) : base()
        {
            base.Id = Id;
						base.Name = Name;				 																																					 
				    this._tsa_cDescripcion = tsa_cDescripcion;
this._tsa_cURL = tsa_cURL;
this._tsa_cUser = tsa_cUser;
this._tnd_cPassword = tnd_cPassword;

            InitClass();
        }  								

				private void InitClass()
        {														
  				  base.Type = new ObjectType(3234, "T_SimCard_APN");
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
			SimpleT_SimCard_APN Simple = new SimpleT_SimCard_APN();
			Simple.Id = base.Id;
			Simple.Name = base.Name;
			Simple.tsa_cDescripcion = this._tsa_cDescripcion;
Simple.tsa_cURL = this._tsa_cURL;
Simple.tsa_cUser = this._tsa_cUser;
Simple.tnd_cPassword = this._tnd_cPassword;

			return (SimpleBaseObject) Simple;
		}
 ///<summary>
     ///Sets a simpleobject   
     ///</summary>	
		public void SetSimpleObject(SimpleT_SimCard_APN Simple)
		{
			base.Id = Simple.Id;
			base.Name = Simple.Name;
			this._tsa_cDescripcion = Simple.tsa_cDescripcion;
this._tsa_cURL = Simple.tsa_cURL;
this._tsa_cUser = Simple.tsa_cUser;
this._tnd_cPassword = Simple.tnd_cPassword;

		}
 ///<summary>
     ///Gets a baseobject   
     ///</summary>
		public override BaseObject GetBaseObject(SqlHelper SqlConfig, int UserId)
		{
			return new DalT_SimCard_APN(SqlConfig, UserId, (SimpleT_SimCard_APN) GetSimpleObject());
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
               dt.Columns.Add(new DataColumn("tsa_cDescripcion", typeof (string)));               
							 dt.Columns.Add(new DataColumn("tsa_cURL", typeof (string)));               
							 dt.Columns.Add(new DataColumn("tsa_cUser", typeof (string)));               
							 dt.Columns.Add(new DataColumn("tnd_cPassword", typeof (string)));               
							 										
               //create Row  
               dr = dt.NewRow();
               
               //set Row
							 dr["Id"] = base.Id;

							 dr["Name"] = base.Name;
dr["tsa_cDescripcion"] = this._tsa_cDescripcion;
dr["tsa_cURL"] = this._tsa_cURL;
dr["tsa_cUser"] = this._tsa_cUser;
dr["tnd_cPassword"] = this._tnd_cPassword;
							 
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
