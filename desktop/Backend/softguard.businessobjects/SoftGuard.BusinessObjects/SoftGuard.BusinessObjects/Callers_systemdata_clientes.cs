
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
    public class Callers_systemdata_clientes : CallerObject
    { 	
				     private DateTime? _sdc_fecha;
					
				     private string _sdc_code;
					
				     private string _sdc_serial;
					
				     private string _sdc_key_id;
					
				     private string _sdc_secret;
					
				     private int _sdc_client_id;
					
				     private string _sdc_public;
					
				     private string _sdc_data;
					
				     private int _sdc_type;
					
				     private string _sdc_log;
					
				     private DateTime? _sdc_lastupdate;
					
				     private int _sdc_status;
				 ///<summary>
     ///sdc_fecha property   
     ///</summary>   
     public DateTime? sdc_fecha 
		 { 
		        
                    get{ return this._sdc_fecha; }
        						set{ this._sdc_fecha = value; } 										
	   }
	  ///<summary>
     ///sdc_code property   
     ///</summary>   
     public string sdc_code 
		 { 
		        
                    get{ return this._sdc_code; }
        						set{ this._sdc_code = value; } 										
	   }
	  ///<summary>
     ///sdc_serial property   
     ///</summary>   
     public string sdc_serial 
		 { 
		        
                    get{ return this._sdc_serial; }
        						set{ this._sdc_serial = value; } 										
	   }
	  ///<summary>
     ///sdc_key_id property   
     ///</summary>   
     public string sdc_key_id 
		 { 
		        
                    get{ return this._sdc_key_id; }
        						set{ this._sdc_key_id = value; } 										
	   }
	  ///<summary>
     ///sdc_secret property   
     ///</summary>   
     public string sdc_secret 
		 { 
		        
                    get{ return this._sdc_secret; }
        						set{ this._sdc_secret = value; } 										
	   }
	  ///<summary>
     ///sdc_client_id property   
     ///</summary>   
     public int sdc_client_id 
		 { 
		        
                    get{ return this._sdc_client_id; }
        						set{ this._sdc_client_id = value; } 										
	   }
	  ///<summary>
     ///sdc_public property   
     ///</summary>   
     public string sdc_public 
		 { 
		        
                    get{ return this._sdc_public; }
        						set{ this._sdc_public = value; } 										
	   }
	  ///<summary>
     ///sdc_data property   
     ///</summary>   
     public string sdc_data 
		 { 
		        
                    get{ return this._sdc_data; }
        						set{ this._sdc_data = value; } 										
	   }
	  ///<summary>
     ///sdc_type property   
     ///</summary>   
     public int sdc_type 
		 { 
		        
                    get{ return this._sdc_type; }
        						set{ this._sdc_type = value; } 										
	   }
	  ///<summary>
     ///sdc_log property   
     ///</summary>   
     public string sdc_log 
		 { 
		        
                    get{ return this._sdc_log; }
        						set{ this._sdc_log = value; } 										
	   }
	  ///<summary>
     ///sdc_lastupdate property   
     ///</summary>   
     public DateTime? sdc_lastupdate 
		 { 
		        
                    get{ return this._sdc_lastupdate; }
        						set{ this._sdc_lastupdate = value; } 										
	   }
	  ///<summary>
     ///sdc_status property   
     ///</summary>   
     public int sdc_status 
		 { 
		        
                    get{ return this._sdc_status; }
        						set{ this._sdc_status = value; } 										
	   }
	  ///<summary>
     ///Constructor   
     ///</summary>
        public Callers_systemdata_clientes() : base()
        {
            InitClass();
        }  
 ///<summary>
     ///Constructor   
     ///</summary>		
        public Callers_systemdata_clientes(int Id, string Name, DateTime? sdc_fecha, string sdc_code, string sdc_serial, string sdc_key_id, string sdc_secret, int sdc_client_id, string sdc_public, string sdc_data, int sdc_type, string sdc_log, DateTime? sdc_lastupdate, int sdc_status) : base()
        {
            base.Id = Id;
						base.Name = Name;				 																																					 
				    this._sdc_fecha = sdc_fecha;
this._sdc_code = sdc_code;
this._sdc_serial = sdc_serial;
this._sdc_key_id = sdc_key_id;
this._sdc_secret = sdc_secret;
this._sdc_client_id = sdc_client_id;
this._sdc_public = sdc_public;
this._sdc_data = sdc_data;
this._sdc_type = sdc_type;
this._sdc_log = sdc_log;
this._sdc_lastupdate = sdc_lastupdate;
this._sdc_status = sdc_status;

            InitClass();
        }  								

				private void InitClass()
        {														
  				  base.Type = new ObjectType(3166, "s_systemdata_clientes");
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
			Simples_systemdata_clientes Simple = new Simples_systemdata_clientes();
			Simple.Id = base.Id;
			Simple.Name = base.Name;
			Simple.sdc_fecha = this._sdc_fecha;
Simple.sdc_code = this._sdc_code;
Simple.sdc_serial = this._sdc_serial;
Simple.sdc_key_id = this._sdc_key_id;
Simple.sdc_secret = this._sdc_secret;
Simple.sdc_client_id = this._sdc_client_id;
Simple.sdc_public = this._sdc_public;
Simple.sdc_data = this._sdc_data;
Simple.sdc_type = this._sdc_type;
Simple.sdc_log = this._sdc_log;
Simple.sdc_lastupdate = this._sdc_lastupdate;
Simple.sdc_status = this._sdc_status;

			return (SimpleBaseObject) Simple;
		}
 ///<summary>
     ///Sets a simpleobject   
     ///</summary>	
		public void SetSimpleObject(Simples_systemdata_clientes Simple)
		{
			base.Id = Simple.Id;
			base.Name = Simple.Name;
			this._sdc_fecha = Simple.sdc_fecha;
this._sdc_code = Simple.sdc_code;
this._sdc_serial = Simple.sdc_serial;
this._sdc_key_id = Simple.sdc_key_id;
this._sdc_secret = Simple.sdc_secret;
this._sdc_client_id = Simple.sdc_client_id;
this._sdc_public = Simple.sdc_public;
this._sdc_data = Simple.sdc_data;
this._sdc_type = Simple.sdc_type;
this._sdc_log = Simple.sdc_log;
this._sdc_lastupdate = Simple.sdc_lastupdate;
this._sdc_status = Simple.sdc_status;

		}
 ///<summary>
     ///Gets a baseobject   
     ///</summary>
		public override BaseObject GetBaseObject(SqlHelper SqlConfig, int UserId)
		{
			return new Dals_systemdata_clientes(SqlConfig, UserId, (Simples_systemdata_clientes) GetSimpleObject());
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
               dt.Columns.Add(new DataColumn("sdc_fecha", typeof (DateTime)));               
							 dt.Columns.Add(new DataColumn("sdc_code", typeof (string)));               
							 dt.Columns.Add(new DataColumn("sdc_serial", typeof (string)));               
							 dt.Columns.Add(new DataColumn("sdc_key_id", typeof (string)));               
							 dt.Columns.Add(new DataColumn("sdc_secret", typeof (string)));               
							 dt.Columns.Add(new DataColumn("sdc_client_id", typeof (int)));               
							 dt.Columns.Add(new DataColumn("sdc_public", typeof (string)));               
							 dt.Columns.Add(new DataColumn("sdc_data", typeof (string)));               
							 dt.Columns.Add(new DataColumn("sdc_type", typeof (int)));               
							 dt.Columns.Add(new DataColumn("sdc_log", typeof (string)));               
							 dt.Columns.Add(new DataColumn("sdc_lastupdate", typeof (DateTime)));               
							 dt.Columns.Add(new DataColumn("sdc_status", typeof (int)));               
							 										
               //create Row  
               dr = dt.NewRow();
               
               //set Row
							 dr["Id"] = base.Id;

							 dr["Name"] = base.Name;
dr["sdc_fecha"] = this._sdc_fecha;
dr["sdc_code"] = this._sdc_code;
dr["sdc_serial"] = this._sdc_serial;
dr["sdc_key_id"] = this._sdc_key_id;
dr["sdc_secret"] = this._sdc_secret;
dr["sdc_client_id"] = this._sdc_client_id;
dr["sdc_public"] = this._sdc_public;
dr["sdc_data"] = this._sdc_data;
dr["sdc_type"] = this._sdc_type;
dr["sdc_log"] = this._sdc_log;
dr["sdc_lastupdate"] = this._sdc_lastupdate;
dr["sdc_status"] = this._sdc_status;
							 
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
