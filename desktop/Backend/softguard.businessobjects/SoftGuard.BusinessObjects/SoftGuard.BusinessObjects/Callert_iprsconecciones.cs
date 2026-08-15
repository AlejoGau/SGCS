
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
    public class Callert_iprsconecciones : CallerObject
    { 	
				     private int _iprsc_iprsiid;
					
				     private int _iprsc_ipcidkey;
					
				     private string _iprsc_status;
					
				     private string _iprsc_config;
					
				     private DateTime? _iprsc_lastserviceupdate;
					
				     private int _iprsc_iduplicado;
				 ///<summary>
     ///iprsc_iprsiid property   
     ///</summary>   
     public int iprsc_iprsiid 
		 { 
		        
                    get{ return this._iprsc_iprsiid; }
        						set{ this._iprsc_iprsiid = value; } 										
	   }
	  ///<summary>
     ///iprsc_ipcidkey property   
     ///</summary>   
     public int iprsc_ipcidkey 
		 { 
		        
                    get{ return this._iprsc_ipcidkey; }
        						set{ this._iprsc_ipcidkey = value; } 										
	   }
	  ///<summary>
     ///iprsc_status property   
     ///</summary>   
     public string iprsc_status 
		 { 
		        
                    get{ return this._iprsc_status; }
        						set{ this._iprsc_status = value; } 										
	   }
	  ///<summary>
     ///iprsc_config property   
     ///</summary>   
     public string iprsc_config 
		 { 
		        
                    get{ return this._iprsc_config; }
        						set{ this._iprsc_config = value; } 										
	   }
	  ///<summary>
     ///iprsc_lastserviceupdate property   
     ///</summary>   
     public DateTime? iprsc_lastserviceupdate 
		 { 
		        
                    get{ return this._iprsc_lastserviceupdate; }
        						set{ this._iprsc_lastserviceupdate = value; } 										
	   }
	  ///<summary>
     ///iprsc_iduplicado property   
     ///</summary>   
     public int iprsc_iduplicado 
		 { 
		        
                    get{ return this._iprsc_iduplicado; }
        						set{ this._iprsc_iduplicado = value; } 										
	   }
	  ///<summary>
     ///Constructor   
     ///</summary>
        public Callert_iprsconecciones() : base()
        {
            InitClass();
        }  
 ///<summary>
     ///Constructor   
     ///</summary>		
        public Callert_iprsconecciones(int Id, string Name, int iprsc_iprsiid, int iprsc_ipcidkey, string iprsc_status, string iprsc_config, DateTime? iprsc_lastserviceupdate, int iprsc_iduplicado) : base()
        {
            base.Id = Id;
						base.Name = Name;				 																																					 
				    this._iprsc_iprsiid = iprsc_iprsiid;
this._iprsc_ipcidkey = iprsc_ipcidkey;
this._iprsc_status = iprsc_status;
this._iprsc_config = iprsc_config;
this._iprsc_lastserviceupdate = iprsc_lastserviceupdate;
this._iprsc_iduplicado = iprsc_iduplicado;

            InitClass();
        }  								

				private void InitClass()
        {														
  				  base.Type = new ObjectType(3179, "t_iprsconecciones");
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
			Simplet_iprsconecciones Simple = new Simplet_iprsconecciones();
			Simple.Id = base.Id;
			Simple.Name = base.Name;
			Simple.iprsc_iprsiid = this._iprsc_iprsiid;
Simple.iprsc_ipcidkey = this._iprsc_ipcidkey;
Simple.iprsc_status = this._iprsc_status;
Simple.iprsc_config = this._iprsc_config;
Simple.iprsc_lastserviceupdate = this._iprsc_lastserviceupdate;
Simple.iprsc_iduplicado = this._iprsc_iduplicado;

			return (SimpleBaseObject) Simple;
		}
 ///<summary>
     ///Sets a simpleobject   
     ///</summary>	
		public void SetSimpleObject(Simplet_iprsconecciones Simple)
		{
			base.Id = Simple.Id;
			base.Name = Simple.Name;
			this._iprsc_iprsiid = Simple.iprsc_iprsiid;
this._iprsc_ipcidkey = Simple.iprsc_ipcidkey;
this._iprsc_status = Simple.iprsc_status;
this._iprsc_config = Simple.iprsc_config;
this._iprsc_lastserviceupdate = Simple.iprsc_lastserviceupdate;
this._iprsc_iduplicado = Simple.iprsc_iduplicado;

		}
 ///<summary>
     ///Gets a baseobject   
     ///</summary>
		public override BaseObject GetBaseObject(SqlHelper SqlConfig, int UserId)
		{
			return new Dalt_iprsconecciones(SqlConfig, UserId, (Simplet_iprsconecciones) GetSimpleObject());
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
               dt.Columns.Add(new DataColumn("iprsc_iprsiid", typeof (int)));               
							 dt.Columns.Add(new DataColumn("iprsc_ipcidkey", typeof (int)));               
							 dt.Columns.Add(new DataColumn("iprsc_status", typeof (string)));               
							 dt.Columns.Add(new DataColumn("iprsc_config", typeof (string)));               
							 dt.Columns.Add(new DataColumn("iprsc_lastserviceupdate", typeof (DateTime)));               
							 dt.Columns.Add(new DataColumn("iprsc_iduplicado", typeof (int)));               
							 										
               //create Row  
               dr = dt.NewRow();
               
               //set Row
							 dr["Id"] = base.Id;

							 dr["Name"] = base.Name;
dr["iprsc_iprsiid"] = this._iprsc_iprsiid;
dr["iprsc_ipcidkey"] = this._iprsc_ipcidkey;
dr["iprsc_status"] = this._iprsc_status;
dr["iprsc_config"] = this._iprsc_config;
dr["iprsc_lastserviceupdate"] = this._iprsc_lastserviceupdate;
dr["iprsc_iduplicado"] = this._iprsc_iduplicado;
							 
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
