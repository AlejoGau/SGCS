
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
    public class Callert_videoid : CallerObject
    { 	
				     private string _tvi_cdescripcion;
					
				     private string _tvi_cnombre;
					
				     private string _tvi_cconfig;
					
				     private Decimal _tvi_nLaunch;
					
				     private string _tvi_cTemplate;
					
				     private int _tvi_iNativeMWR;
				 ///<summary>
     ///tvi_cdescripcion property   
     ///</summary>   
     public string tvi_cdescripcion 
		 { 
		        
                    get{ return this._tvi_cdescripcion; }
        						set{ this._tvi_cdescripcion = value; } 										
	   }
	  ///<summary>
     ///tvi_cnombre property   
     ///</summary>   
     public string tvi_cnombre 
		 { 
		        
                    get{ return this._tvi_cnombre; }
        						set{ this._tvi_cnombre = value; } 										
	   }
	  ///<summary>
     ///tvi_cconfig property   
     ///</summary>   
     public string tvi_cconfig 
		 { 
		        
                    get{ return this._tvi_cconfig; }
        						set{ this._tvi_cconfig = value; } 										
	   }
	  ///<summary>
     ///tvi_nLaunch property   
     ///</summary>   
     public Decimal tvi_nLaunch 
		 { 
		        
                    get{ return this._tvi_nLaunch; }
        						set{ this._tvi_nLaunch = value; } 										
	   }
	  ///<summary>
     ///tvi_cTemplate property   
     ///</summary>   
     public string tvi_cTemplate 
		 { 
		        
                    get{ return this._tvi_cTemplate; }
        						set{ this._tvi_cTemplate = value; } 										
	   }
	  ///<summary>
     ///tvi_iNativeMWR property   
     ///</summary>   
     public int tvi_iNativeMWR 
		 { 
		        
                    get{ return this._tvi_iNativeMWR; }
        						set{ this._tvi_iNativeMWR = value; } 										
	   }
	  ///<summary>
     ///Constructor   
     ///</summary>
        public Callert_videoid() : base()
        {
            InitClass();
        }  
 ///<summary>
     ///Constructor   
     ///</summary>		
        public Callert_videoid(int Id, string Name, string tvi_cdescripcion, string tvi_cnombre, string tvi_cconfig, Decimal tvi_nLaunch, string tvi_cTemplate, int tvi_iNativeMWR) : base()
        {
            base.Id = Id;
						base.Name = Name;				 																																					 
				    this._tvi_cdescripcion = tvi_cdescripcion;
this._tvi_cnombre = tvi_cnombre;
this._tvi_cconfig = tvi_cconfig;
this._tvi_nLaunch = tvi_nLaunch;
this._tvi_cTemplate = tvi_cTemplate;
this._tvi_iNativeMWR = tvi_iNativeMWR;

            InitClass();
        }  								

				private void InitClass()
        {														
  				  base.Type = new ObjectType(3111, "t_videoid");
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
			Simplet_videoid Simple = new Simplet_videoid();
			Simple.Id = base.Id;
			Simple.Name = base.Name;
			Simple.tvi_cdescripcion = this._tvi_cdescripcion;
Simple.tvi_cnombre = this._tvi_cnombre;
Simple.tvi_cconfig = this._tvi_cconfig;
Simple.tvi_nLaunch = this._tvi_nLaunch;
Simple.tvi_cTemplate = this._tvi_cTemplate;
Simple.tvi_iNativeMWR = this._tvi_iNativeMWR;

			return (SimpleBaseObject) Simple;
		}
 ///<summary>
     ///Sets a simpleobject   
     ///</summary>	
		public void SetSimpleObject(Simplet_videoid Simple)
		{
			base.Id = Simple.Id;
			base.Name = Simple.Name;
			this._tvi_cdescripcion = Simple.tvi_cdescripcion;
this._tvi_cnombre = Simple.tvi_cnombre;
this._tvi_cconfig = Simple.tvi_cconfig;
this._tvi_nLaunch = Simple.tvi_nLaunch;
this._tvi_cTemplate = Simple.tvi_cTemplate;
this._tvi_iNativeMWR = Simple.tvi_iNativeMWR;

		}
 ///<summary>
     ///Gets a baseobject   
     ///</summary>
		public override BaseObject GetBaseObject(SqlHelper SqlConfig, int UserId)
		{
			return new Dalt_videoid(SqlConfig, UserId, (Simplet_videoid) GetSimpleObject());
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
               dt.Columns.Add(new DataColumn("tvi_cdescripcion", typeof (string)));               
							 dt.Columns.Add(new DataColumn("tvi_cnombre", typeof (string)));               
							 dt.Columns.Add(new DataColumn("tvi_cconfig", typeof (string)));               
							 dt.Columns.Add(new DataColumn("tvi_nLaunch", typeof (Decimal)));               
							 dt.Columns.Add(new DataColumn("tvi_cTemplate", typeof (string)));               
							 dt.Columns.Add(new DataColumn("tvi_iNativeMWR", typeof (int)));               
							 										
               //create Row  
               dr = dt.NewRow();
               
               //set Row
							 dr["Id"] = base.Id;

							 dr["Name"] = base.Name;
dr["tvi_cdescripcion"] = this._tvi_cdescripcion;
dr["tvi_cnombre"] = this._tvi_cnombre;
dr["tvi_cconfig"] = this._tvi_cconfig;
dr["tvi_nLaunch"] = this._tvi_nLaunch;
dr["tvi_cTemplate"] = this._tvi_cTemplate;
dr["tvi_iNativeMWR"] = this._tvi_iNativeMWR;
							 
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
