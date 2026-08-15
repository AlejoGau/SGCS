
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
    public class Callers_terminales : CallerObject
    { 	
				     private string _iprs_ccnombre;
					
				     private string _iprs_localip;
					
				     private int _iprs_commandport;
					
				     private int _iprs_websocketport;
					
				     private string _iprs_status;
					
				     private string _iprs_config;
					
				     private DateTime? _iprs_lastserviceupdate;
				 ///<summary>
     ///iprs_ccnombre property   
     ///</summary>   
     public string iprs_ccnombre 
		 { 
		        
                    get{ return this._iprs_ccnombre; }
        						set{ this._iprs_ccnombre = value; } 										
	   }
	  ///<summary>
     ///iprs_localip property   
     ///</summary>   
     public string iprs_localip 
		 { 
		        
                    get{ return this._iprs_localip; }
        						set{ this._iprs_localip = value; } 										
	   }
	  ///<summary>
     ///iprs_commandport property   
     ///</summary>   
     public int iprs_commandport 
		 { 
		        
                    get{ return this._iprs_commandport; }
        						set{ this._iprs_commandport = value; } 										
	   }
	  ///<summary>
     ///iprs_websocketport property   
     ///</summary>   
     public int iprs_websocketport 
		 { 
		        
                    get{ return this._iprs_websocketport; }
        						set{ this._iprs_websocketport = value; } 										
	   }
	  ///<summary>
     ///iprs_status property   
     ///</summary>   
     public string iprs_status 
		 { 
		        
                    get{ return this._iprs_status; }
        						set{ this._iprs_status = value; } 										
	   }
	  ///<summary>
     ///iprs_config property   
     ///</summary>   
     public string iprs_config 
		 { 
		        
                    get{ return this._iprs_config; }
        						set{ this._iprs_config = value; } 										
	   }
	  ///<summary>
     ///iprs_lastserviceupdate property   
     ///</summary>   
     public DateTime? iprs_lastserviceupdate 
		 { 
		        
                    get{ return this._iprs_lastserviceupdate; }
        						set{ this._iprs_lastserviceupdate = value; } 										
	   }
	  ///<summary>
     ///Constructor   
     ///</summary>
        public Callers_terminales() : base()
        {
            InitClass();
        }  
 ///<summary>
     ///Constructor   
     ///</summary>		
        public Callers_terminales(int Id, string Name, string iprs_ccnombre, string iprs_localip, int iprs_commandport, int iprs_websocketport, string iprs_status, string iprs_config, DateTime? iprs_lastserviceupdate) : base()
        {
            base.Id = Id;
						base.Name = Name;				 																																					 
				    this._iprs_ccnombre = iprs_ccnombre;
this._iprs_localip = iprs_localip;
this._iprs_commandport = iprs_commandport;
this._iprs_websocketport = iprs_websocketport;
this._iprs_status = iprs_status;
this._iprs_config = iprs_config;
this._iprs_lastserviceupdate = iprs_lastserviceupdate;

            InitClass();
        }  								

				private void InitClass()
        {														
  				  base.Type = new ObjectType(3178, "s_terminales");
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
			Simples_terminales Simple = new Simples_terminales();
			Simple.Id = base.Id;
			Simple.Name = base.Name;
			Simple.iprs_ccnombre = this._iprs_ccnombre;
Simple.iprs_localip = this._iprs_localip;
Simple.iprs_commandport = this._iprs_commandport;
Simple.iprs_websocketport = this._iprs_websocketport;
Simple.iprs_status = this._iprs_status;
Simple.iprs_config = this._iprs_config;
Simple.iprs_lastserviceupdate = this._iprs_lastserviceupdate;

			return (SimpleBaseObject) Simple;
		}
 ///<summary>
     ///Sets a simpleobject   
     ///</summary>	
		public void SetSimpleObject(Simples_terminales Simple)
		{
			base.Id = Simple.Id;
			base.Name = Simple.Name;
			this._iprs_ccnombre = Simple.iprs_ccnombre;
this._iprs_localip = Simple.iprs_localip;
this._iprs_commandport = Simple.iprs_commandport;
this._iprs_websocketport = Simple.iprs_websocketport;
this._iprs_status = Simple.iprs_status;
this._iprs_config = Simple.iprs_config;
this._iprs_lastserviceupdate = Simple.iprs_lastserviceupdate;

		}
 ///<summary>
     ///Gets a baseobject   
     ///</summary>
		public override BaseObject GetBaseObject(SqlHelper SqlConfig, int UserId)
		{
			return new Dals_terminales(SqlConfig, UserId, (Simples_terminales) GetSimpleObject());
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
               dt.Columns.Add(new DataColumn("iprs_ccnombre", typeof (string)));               
							 dt.Columns.Add(new DataColumn("iprs_localip", typeof (string)));               
							 dt.Columns.Add(new DataColumn("iprs_commandport", typeof (int)));               
							 dt.Columns.Add(new DataColumn("iprs_websocketport", typeof (int)));               
							 dt.Columns.Add(new DataColumn("iprs_status", typeof (string)));               
							 dt.Columns.Add(new DataColumn("iprs_config", typeof (string)));               
							 dt.Columns.Add(new DataColumn("iprs_lastserviceupdate", typeof (DateTime)));               
							 										
               //create Row  
               dr = dt.NewRow();
               
               //set Row
							 dr["Id"] = base.Id;

							 dr["Name"] = base.Name;
dr["iprs_ccnombre"] = this._iprs_ccnombre;
dr["iprs_localip"] = this._iprs_localip;
dr["iprs_commandport"] = this._iprs_commandport;
dr["iprs_websocketport"] = this._iprs_websocketport;
dr["iprs_status"] = this._iprs_status;
dr["iprs_config"] = this._iprs_config;
dr["iprs_lastserviceupdate"] = this._iprs_lastserviceupdate;
							 
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
