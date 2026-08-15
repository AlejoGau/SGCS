
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
    public class Callert_gatewaysmsg : CallerObject
    { 	
				     private int _tgm_idkey;
					
				     private string _tgm_cdescripcion;
					
				     private int _tgm_ntipo;
					
				     private string _tgm_csmppsystemid;
					
				     private string _tgm_csmpppassword;
					
				     private string _tgm_csmpphostname;
					
				     private Decimal _tgm_nsmppport;
					
				     private string _tgm_nsmpsourceadd;
					
				     private string _tgm_chttpurl;
					
				     private string _tgm_capimail;
					
				     private string _tgm_cuser;
					
				     private string _tgm_cpassword;
					
				     private string _tgm_cdll;
					
				     private string _tgm_cconfig;
					
				     private string _tgm_cmetadata;
				 ///<summary>
     ///tgm_idkey property   
     ///</summary>   
     public int tgm_idkey 
		 { 
		        
                    get{ return this._tgm_idkey; }
        						set{ this._tgm_idkey = value; } 										
	   }
	  ///<summary>
     ///tgm_cdescripcion property   
     ///</summary>   
     public string tgm_cdescripcion 
		 { 
		        
                    get{ return this._tgm_cdescripcion; }
        						set{ this._tgm_cdescripcion = value; } 										
	   }
	  ///<summary>
     ///tgm_ntipo property   
     ///</summary>   
     public int tgm_ntipo 
		 { 
		        
                    get{ return this._tgm_ntipo; }
        						set{ this._tgm_ntipo = value; } 										
	   }
	  ///<summary>
     ///tgm_csmppsystemid property   
     ///</summary>   
     public string tgm_csmppsystemid 
		 { 
		        
                    get{ return this._tgm_csmppsystemid; }
        						set{ this._tgm_csmppsystemid = value; } 										
	   }
	  ///<summary>
     ///tgm_csmpppassword property   
     ///</summary>   
     public string tgm_csmpppassword 
		 { 
		        
                    get{ return this._tgm_csmpppassword; }
        						set{ this._tgm_csmpppassword = value; } 										
	   }
	  ///<summary>
     ///tgm_csmpphostname property   
     ///</summary>   
     public string tgm_csmpphostname 
		 { 
		        
                    get{ return this._tgm_csmpphostname; }
        						set{ this._tgm_csmpphostname = value; } 										
	   }
	  ///<summary>
     ///tgm_nsmppport property   
     ///</summary>   
     public Decimal tgm_nsmppport 
		 { 
		        
                    get{ return this._tgm_nsmppport; }
        						set{ this._tgm_nsmppport = value; } 										
	   }
	  ///<summary>
     ///tgm_nsmpsourceadd property   
     ///</summary>   
     public string tgm_nsmpsourceadd 
		 { 
		        
                    get{ return this._tgm_nsmpsourceadd; }
        						set{ this._tgm_nsmpsourceadd = value; } 										
	   }
	  ///<summary>
     ///tgm_chttpurl property   
     ///</summary>   
     public string tgm_chttpurl 
		 { 
		        
                    get{ return this._tgm_chttpurl; }
        						set{ this._tgm_chttpurl = value; } 										
	   }
	  ///<summary>
     ///tgm_capimail property   
     ///</summary>   
     public string tgm_capimail 
		 { 
		        
                    get{ return this._tgm_capimail; }
        						set{ this._tgm_capimail = value; } 										
	   }
	  ///<summary>
     ///tgm_cuser property   
     ///</summary>   
     public string tgm_cuser 
		 { 
		        
                    get{ return this._tgm_cuser; }
        						set{ this._tgm_cuser = value; } 										
	   }
	  ///<summary>
     ///tgm_cpassword property   
     ///</summary>   
     public string tgm_cpassword 
		 { 
		        
                    get{ return this._tgm_cpassword; }
        						set{ this._tgm_cpassword = value; } 										
	   }
	  ///<summary>
     ///tgm_cdll property   
     ///</summary>   
     public string tgm_cdll 
		 { 
		        
                    get{ return this._tgm_cdll; }
        						set{ this._tgm_cdll = value; } 										
	   }
	  ///<summary>
     ///tgm_cconfig property   
     ///</summary>   
     public string tgm_cconfig 
		 { 
		        
                    get{ return this._tgm_cconfig; }
        						set{ this._tgm_cconfig = value; } 										
	   }
	  ///<summary>
     ///tgm_cmetadata property   
     ///</summary>   
     public string tgm_cmetadata 
		 { 
		        
                    get{ return this._tgm_cmetadata; }
        						set{ this._tgm_cmetadata = value; } 										
	   }
	  ///<summary>
     ///Constructor   
     ///</summary>
        public Callert_gatewaysmsg() : base()
        {
            InitClass();
        }  
 ///<summary>
     ///Constructor   
     ///</summary>		
        public Callert_gatewaysmsg(int Id, string Name, int tgm_idkey, string tgm_cdescripcion, int tgm_ntipo, string tgm_csmppsystemid, string tgm_csmpppassword, string tgm_csmpphostname, Decimal tgm_nsmppport, string tgm_nsmpsourceadd, string tgm_chttpurl, string tgm_capimail, string tgm_cuser, string tgm_cpassword, string tgm_cdll, string tgm_cconfig, string tgm_cmetadata) : base()
        {
            base.Id = Id;
						base.Name = Name;				 																																					 
				    this._tgm_idkey = tgm_idkey;
this._tgm_cdescripcion = tgm_cdescripcion;
this._tgm_ntipo = tgm_ntipo;
this._tgm_csmppsystemid = tgm_csmppsystemid;
this._tgm_csmpppassword = tgm_csmpppassword;
this._tgm_csmpphostname = tgm_csmpphostname;
this._tgm_nsmppport = tgm_nsmppport;
this._tgm_nsmpsourceadd = tgm_nsmpsourceadd;
this._tgm_chttpurl = tgm_chttpurl;
this._tgm_capimail = tgm_capimail;
this._tgm_cuser = tgm_cuser;
this._tgm_cpassword = tgm_cpassword;
this._tgm_cdll = tgm_cdll;
this._tgm_cconfig = tgm_cconfig;
this._tgm_cmetadata = tgm_cmetadata;

            InitClass();
        }  								

				private void InitClass()
        {														
  				  base.Type = new ObjectType(3126, "t_gatewaysmsg");
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
			Simplet_gatewaysmsg Simple = new Simplet_gatewaysmsg();
			Simple.Id = base.Id;
			Simple.Name = base.Name;
			Simple.tgm_idkey = this._tgm_idkey;
Simple.tgm_cdescripcion = this._tgm_cdescripcion;
Simple.tgm_ntipo = this._tgm_ntipo;
Simple.tgm_csmppsystemid = this._tgm_csmppsystemid;
Simple.tgm_csmpppassword = this._tgm_csmpppassword;
Simple.tgm_csmpphostname = this._tgm_csmpphostname;
Simple.tgm_nsmppport = this._tgm_nsmppport;
Simple.tgm_nsmpsourceadd = this._tgm_nsmpsourceadd;
Simple.tgm_chttpurl = this._tgm_chttpurl;
Simple.tgm_capimail = this._tgm_capimail;
Simple.tgm_cuser = this._tgm_cuser;
Simple.tgm_cpassword = this._tgm_cpassword;
Simple.tgm_cdll = this._tgm_cdll;
Simple.tgm_cconfig = this._tgm_cconfig;
Simple.tgm_cmetadata = this._tgm_cmetadata;

			return (SimpleBaseObject) Simple;
		}
 ///<summary>
     ///Sets a simpleobject   
     ///</summary>	
		public void SetSimpleObject(Simplet_gatewaysmsg Simple)
		{
			base.Id = Simple.Id;
			base.Name = Simple.Name;
			this._tgm_idkey = Simple.tgm_idkey;
this._tgm_cdescripcion = Simple.tgm_cdescripcion;
this._tgm_ntipo = Simple.tgm_ntipo;
this._tgm_csmppsystemid = Simple.tgm_csmppsystemid;
this._tgm_csmpppassword = Simple.tgm_csmpppassword;
this._tgm_csmpphostname = Simple.tgm_csmpphostname;
this._tgm_nsmppport = Simple.tgm_nsmppport;
this._tgm_nsmpsourceadd = Simple.tgm_nsmpsourceadd;
this._tgm_chttpurl = Simple.tgm_chttpurl;
this._tgm_capimail = Simple.tgm_capimail;
this._tgm_cuser = Simple.tgm_cuser;
this._tgm_cpassword = Simple.tgm_cpassword;
this._tgm_cdll = Simple.tgm_cdll;
this._tgm_cconfig = Simple.tgm_cconfig;
this._tgm_cmetadata = Simple.tgm_cmetadata;

		}
 ///<summary>
     ///Gets a baseobject   
     ///</summary>
		public override BaseObject GetBaseObject(SqlHelper SqlConfig, int UserId)
		{
			return new Dalt_gatewaysmsg(SqlConfig, UserId, (Simplet_gatewaysmsg) GetSimpleObject());
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
               dt.Columns.Add(new DataColumn("tgm_idkey", typeof (int)));               
							 dt.Columns.Add(new DataColumn("tgm_cdescripcion", typeof (string)));               
							 dt.Columns.Add(new DataColumn("tgm_ntipo", typeof (int)));               
							 dt.Columns.Add(new DataColumn("tgm_csmppsystemid", typeof (string)));               
							 dt.Columns.Add(new DataColumn("tgm_csmpppassword", typeof (string)));               
							 dt.Columns.Add(new DataColumn("tgm_csmpphostname", typeof (string)));               
							 dt.Columns.Add(new DataColumn("tgm_nsmppport", typeof (Decimal)));               
							 dt.Columns.Add(new DataColumn("tgm_nsmpsourceadd", typeof (string)));               
							 dt.Columns.Add(new DataColumn("tgm_chttpurl", typeof (string)));               
							 dt.Columns.Add(new DataColumn("tgm_capimail", typeof (string)));               
							 dt.Columns.Add(new DataColumn("tgm_cuser", typeof (string)));               
							 dt.Columns.Add(new DataColumn("tgm_cpassword", typeof (string)));               
							 dt.Columns.Add(new DataColumn("tgm_cdll", typeof (string)));               
							 dt.Columns.Add(new DataColumn("tgm_cconfig", typeof (string)));               
							 dt.Columns.Add(new DataColumn("tgm_cmetadata", typeof (string)));               
							 										
               //create Row  
               dr = dt.NewRow();
               
               //set Row
							 dr["Id"] = base.Id;

							 dr["Name"] = base.Name;
dr["tgm_idkey"] = this._tgm_idkey;
dr["tgm_cdescripcion"] = this._tgm_cdescripcion;
dr["tgm_ntipo"] = this._tgm_ntipo;
dr["tgm_csmppsystemid"] = this._tgm_csmppsystemid;
dr["tgm_csmpppassword"] = this._tgm_csmpppassword;
dr["tgm_csmpphostname"] = this._tgm_csmpphostname;
dr["tgm_nsmppport"] = this._tgm_nsmppport;
dr["tgm_nsmpsourceadd"] = this._tgm_nsmpsourceadd;
dr["tgm_chttpurl"] = this._tgm_chttpurl;
dr["tgm_capimail"] = this._tgm_capimail;
dr["tgm_cuser"] = this._tgm_cuser;
dr["tgm_cpassword"] = this._tgm_cpassword;
dr["tgm_cdll"] = this._tgm_cdll;
dr["tgm_cconfig"] = this._tgm_cconfig;
dr["tgm_cmetadata"] = this._tgm_cmetadata;
							 
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
