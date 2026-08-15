
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
    public class Callers_systemdata : CallerObject
    { 	
				     private DateTime? _sdt_fecha;
					
				     private string _sdt_code;
					
				     private string _sdt_data;
					
				     private string _sdt_log;
					
				     private string _sdt_keyid;
					
				     private string _sdt_fingerprint;
				 ///<summary>
     ///sdt_fecha property   
     ///</summary>   
     public DateTime? sdt_fecha 
		 { 
		        
                    get{ return this._sdt_fecha; }
        						set{ this._sdt_fecha = value; } 										
	   }
	  ///<summary>
     ///sdt_code property   
     ///</summary>   
     public string sdt_code 
		 { 
		        
                    get{ return this._sdt_code; }
        						set{ this._sdt_code = value; } 										
	   }
	  ///<summary>
     ///sdt_data property   
     ///</summary>   
     public string sdt_data 
		 { 
		        
                    get{ return this._sdt_data; }
        						set{ this._sdt_data = value; } 										
	   }
	  ///<summary>
     ///sdt_log property   
     ///</summary>   
     public string sdt_log 
		 { 
		        
                    get{ return this._sdt_log; }
        						set{ this._sdt_log = value; } 										
	   }
	  ///<summary>
     ///sdt_keyid property   
     ///</summary>   
     public string sdt_keyid 
		 { 
		        
                    get{ return this._sdt_keyid; }
        						set{ this._sdt_keyid = value; } 										
	   }
	  ///<summary>
     ///sdt_fingerprint property   
     ///</summary>   
     public string sdt_fingerprint 
		 { 
		        
                    get{ return this._sdt_fingerprint; }
        						set{ this._sdt_fingerprint = value; } 										
	   }
	  ///<summary>
     ///Constructor   
     ///</summary>
        public Callers_systemdata() : base()
        {
            InitClass();
        }  
 ///<summary>
     ///Constructor   
     ///</summary>		
        public Callers_systemdata(int Id, string Name, DateTime? sdt_fecha, string sdt_code, string sdt_data, string sdt_log, string sdt_keyid, string sdt_fingerprint) : base()
        {
            base.Id = Id;
						base.Name = Name;				 																																					 
				    this._sdt_fecha = sdt_fecha;
this._sdt_code = sdt_code;
this._sdt_data = sdt_data;
this._sdt_log = sdt_log;
this._sdt_keyid = sdt_keyid;
this._sdt_fingerprint = sdt_fingerprint;

            InitClass();
        }  								

				private void InitClass()
        {														
  				  base.Type = new ObjectType(3164, "s_systemdata");
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
			Simples_systemdata Simple = new Simples_systemdata();
			Simple.Id = base.Id;
			Simple.Name = base.Name;
			Simple.sdt_fecha = this._sdt_fecha;
Simple.sdt_code = this._sdt_code;
Simple.sdt_data = this._sdt_data;
Simple.sdt_log = this._sdt_log;
Simple.sdt_keyid = this._sdt_keyid;
Simple.sdt_fingerprint = this._sdt_fingerprint;

			return (SimpleBaseObject) Simple;
		}
 ///<summary>
     ///Sets a simpleobject   
     ///</summary>	
		public void SetSimpleObject(Simples_systemdata Simple)
		{
			base.Id = Simple.Id;
			base.Name = Simple.Name;
			this._sdt_fecha = Simple.sdt_fecha;
this._sdt_code = Simple.sdt_code;
this._sdt_data = Simple.sdt_data;
this._sdt_log = Simple.sdt_log;
this._sdt_keyid = Simple.sdt_keyid;
this._sdt_fingerprint = Simple.sdt_fingerprint;

		}
 ///<summary>
     ///Gets a baseobject   
     ///</summary>
		public override BaseObject GetBaseObject(SqlHelper SqlConfig, int UserId)
		{
			return new Dals_systemdata(SqlConfig, UserId, (Simples_systemdata) GetSimpleObject());
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
               dt.Columns.Add(new DataColumn("sdt_fecha", typeof (DateTime)));               
							 dt.Columns.Add(new DataColumn("sdt_code", typeof (string)));               
							 dt.Columns.Add(new DataColumn("sdt_data", typeof (string)));               
							 dt.Columns.Add(new DataColumn("sdt_log", typeof (string)));               
							 dt.Columns.Add(new DataColumn("sdt_keyid", typeof (string)));               
							 dt.Columns.Add(new DataColumn("sdt_fingerprint", typeof (string)));               
							 										
               //create Row  
               dr = dt.NewRow();
               
               //set Row
							 dr["Id"] = base.Id;

							 dr["Name"] = base.Name;
dr["sdt_fecha"] = this._sdt_fecha;
dr["sdt_code"] = this._sdt_code;
dr["sdt_data"] = this._sdt_data;
dr["sdt_log"] = this._sdt_log;
dr["sdt_keyid"] = this._sdt_keyid;
dr["sdt_fingerprint"] = this._sdt_fingerprint;
							 
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
