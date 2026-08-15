
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
    public class CallerPanel : CallerObject
    { 	
				     private int _pan_iidcuenta;
					
				     private string _pan_ccodigo;
					
				     private string _pan_mubicacion;
					
				     private string _pan_ccallerid1;
					
				     private string _pan_ccallerid2;
					
				     private string _pan_ccallerid3;
					
				     private string _pan_ccallerid4;
					
				     private string _pan_ccallerid5;
					
				     private Decimal _pan_nmostrar;
					
				     private string _pan_csender;
					
				     private string _pan_cnrosim1;
					
				     private string _pan_ccompania1;
					
				     private string _pan_cnrosim2;
					
				     private string _pan_ccompania2;
					
				     private string _pan_cgprs;
					
				     private int _pan_ireceptor;
					
				     private string _pan_cconfig;
					
				     private int _pan_rpmidkey;
					
				     private int _pan_cModemSMS;
					
				     private string _pan_cClavePanel;
				 ///<summary>
     ///pan_iidcuenta property   
     ///</summary>   
     public int pan_iidcuenta 
		 { 
		        
                    get{ return this._pan_iidcuenta; }
        						set{ this._pan_iidcuenta = value; } 										
	   }
	  ///<summary>
     ///pan_ccodigo property   
     ///</summary>   
     public string pan_ccodigo 
		 { 
		        
                    get{ return this._pan_ccodigo; }
        						set{ this._pan_ccodigo = value; } 										
	   }
	  ///<summary>
     ///pan_mubicacion property   
     ///</summary>   
     public string pan_mubicacion 
		 { 
		        
                    get{ return this._pan_mubicacion; }
        						set{ this._pan_mubicacion = value; } 										
	   }
	  ///<summary>
     ///pan_ccallerid1 property   
     ///</summary>   
     public string pan_ccallerid1 
		 { 
		        
                    get{ return this._pan_ccallerid1; }
        						set{ this._pan_ccallerid1 = value; } 										
	   }
	  ///<summary>
     ///pan_ccallerid2 property   
     ///</summary>   
     public string pan_ccallerid2 
		 { 
		        
                    get{ return this._pan_ccallerid2; }
        						set{ this._pan_ccallerid2 = value; } 										
	   }
	  ///<summary>
     ///pan_ccallerid3 property   
     ///</summary>   
     public string pan_ccallerid3 
		 { 
		        
                    get{ return this._pan_ccallerid3; }
        						set{ this._pan_ccallerid3 = value; } 										
	   }
	  ///<summary>
     ///pan_ccallerid4 property   
     ///</summary>   
     public string pan_ccallerid4 
		 { 
		        
                    get{ return this._pan_ccallerid4; }
        						set{ this._pan_ccallerid4 = value; } 										
	   }
	  ///<summary>
     ///pan_ccallerid5 property   
     ///</summary>   
     public string pan_ccallerid5 
		 { 
		        
                    get{ return this._pan_ccallerid5; }
        						set{ this._pan_ccallerid5 = value; } 										
	   }
	  ///<summary>
     ///pan_nmostrar property   
     ///</summary>   
     public Decimal pan_nmostrar 
		 { 
		        
                    get{ return this._pan_nmostrar; }
        						set{ this._pan_nmostrar = value; } 										
	   }
	  ///<summary>
     ///pan_csender property   
     ///</summary>   
     public string pan_csender 
		 { 
		        
                    get{ return this._pan_csender; }
        						set{ this._pan_csender = value; } 										
	   }
	  ///<summary>
     ///pan_cnrosim1 property   
     ///</summary>   
     public string pan_cnrosim1 
		 { 
		        
                    get{ return this._pan_cnrosim1; }
        						set{ this._pan_cnrosim1 = value; } 										
	   }
	  ///<summary>
     ///pan_ccompania1 property   
     ///</summary>   
     public string pan_ccompania1 
		 { 
		        
                    get{ return this._pan_ccompania1; }
        						set{ this._pan_ccompania1 = value; } 										
	   }
	  ///<summary>
     ///pan_cnrosim2 property   
     ///</summary>   
     public string pan_cnrosim2 
		 { 
		        
                    get{ return this._pan_cnrosim2; }
        						set{ this._pan_cnrosim2 = value; } 										
	   }
	  ///<summary>
     ///pan_ccompania2 property   
     ///</summary>   
     public string pan_ccompania2 
		 { 
		        
                    get{ return this._pan_ccompania2; }
        						set{ this._pan_ccompania2 = value; } 										
	   }
	  ///<summary>
     ///pan_cgprs property   
     ///</summary>   
     public string pan_cgprs 
		 { 
		        
                    get{ return this._pan_cgprs; }
        						set{ this._pan_cgprs = value; } 										
	   }
	  ///<summary>
     ///pan_ireceptor property   
     ///</summary>   
     public int pan_ireceptor 
		 { 
		        
                    get{ return this._pan_ireceptor; }
        						set{ this._pan_ireceptor = value; } 										
	   }
	  ///<summary>
     ///pan_cconfig property   
     ///</summary>   
     public string pan_cconfig 
		 { 
		        
                    get{ return this._pan_cconfig; }
        						set{ this._pan_cconfig = value; } 										
	   }
	  ///<summary>
     ///pan_rpmidkey property   
     ///</summary>   
     public int pan_rpmidkey 
		 { 
		        
                    get{ return this._pan_rpmidkey; }
        						set{ this._pan_rpmidkey = value; } 										
	   }
	  ///<summary>
     ///pan_cModemSMS property   
     ///</summary>   
     public int pan_cModemSMS 
		 { 
		        
                    get{ return this._pan_cModemSMS; }
        						set{ this._pan_cModemSMS = value; } 										
	   }
	  ///<summary>
     ///pan_cClavePanel property   
     ///</summary>   
     public string pan_cClavePanel 
		 { 
		        
                    get{ return this._pan_cClavePanel; }
        						set{ this._pan_cClavePanel = value; } 										
	   }
	  ///<summary>
     ///Constructor   
     ///</summary>
        public CallerPanel() : base()
        {
            InitClass();
        }  
 ///<summary>
     ///Constructor   
     ///</summary>		
        public CallerPanel(int Id, string Name, int pan_iidcuenta, string pan_ccodigo, string pan_mubicacion, string pan_ccallerid1, string pan_ccallerid2, string pan_ccallerid3, string pan_ccallerid4, string pan_ccallerid5, Decimal pan_nmostrar, string pan_csender, string pan_cnrosim1, string pan_ccompania1, string pan_cnrosim2, string pan_ccompania2, string pan_cgprs, int pan_ireceptor, string pan_cconfig, int pan_rpmidkey, int pan_cModemSMS, string pan_cClavePanel) : base()
        {
            base.Id = Id;
						base.Name = Name;				 																																					 
				    this._pan_iidcuenta = pan_iidcuenta;
this._pan_ccodigo = pan_ccodigo;
this._pan_mubicacion = pan_mubicacion;
this._pan_ccallerid1 = pan_ccallerid1;
this._pan_ccallerid2 = pan_ccallerid2;
this._pan_ccallerid3 = pan_ccallerid3;
this._pan_ccallerid4 = pan_ccallerid4;
this._pan_ccallerid5 = pan_ccallerid5;
this._pan_nmostrar = pan_nmostrar;
this._pan_csender = pan_csender;
this._pan_cnrosim1 = pan_cnrosim1;
this._pan_ccompania1 = pan_ccompania1;
this._pan_cnrosim2 = pan_cnrosim2;
this._pan_ccompania2 = pan_ccompania2;
this._pan_cgprs = pan_cgprs;
this._pan_ireceptor = pan_ireceptor;
this._pan_cconfig = pan_cconfig;
this._pan_rpmidkey = pan_rpmidkey;
this._pan_cModemSMS = pan_cModemSMS;
this._pan_cClavePanel = pan_cClavePanel;

            InitClass();
        }  								

				private void InitClass()
        {														
  				  base.Type = new ObjectType(3017, "Panel");
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
			SimplePanel Simple = new SimplePanel();
			Simple.Id = base.Id;
			Simple.Name = base.Name;
			Simple.pan_iidcuenta = this._pan_iidcuenta;
Simple.pan_ccodigo = this._pan_ccodigo;
Simple.pan_mubicacion = this._pan_mubicacion;
Simple.pan_ccallerid1 = this._pan_ccallerid1;
Simple.pan_ccallerid2 = this._pan_ccallerid2;
Simple.pan_ccallerid3 = this._pan_ccallerid3;
Simple.pan_ccallerid4 = this._pan_ccallerid4;
Simple.pan_ccallerid5 = this._pan_ccallerid5;
Simple.pan_nmostrar = this._pan_nmostrar;
Simple.pan_csender = this._pan_csender;
Simple.pan_cnrosim1 = this._pan_cnrosim1;
Simple.pan_ccompania1 = this._pan_ccompania1;
Simple.pan_cnrosim2 = this._pan_cnrosim2;
Simple.pan_ccompania2 = this._pan_ccompania2;
Simple.pan_cgprs = this._pan_cgprs;
Simple.pan_ireceptor = this._pan_ireceptor;
Simple.pan_cconfig = this._pan_cconfig;
Simple.pan_rpmidkey = this._pan_rpmidkey;
Simple.pan_cModemSMS = this._pan_cModemSMS;
Simple.pan_cClavePanel = this._pan_cClavePanel;

			return (SimpleBaseObject) Simple;
		}
 ///<summary>
     ///Sets a simpleobject   
     ///</summary>	
		public void SetSimpleObject(SimplePanel Simple)
		{
			base.Id = Simple.Id;
			base.Name = Simple.Name;
			this._pan_iidcuenta = Simple.pan_iidcuenta;
this._pan_ccodigo = Simple.pan_ccodigo;
this._pan_mubicacion = Simple.pan_mubicacion;
this._pan_ccallerid1 = Simple.pan_ccallerid1;
this._pan_ccallerid2 = Simple.pan_ccallerid2;
this._pan_ccallerid3 = Simple.pan_ccallerid3;
this._pan_ccallerid4 = Simple.pan_ccallerid4;
this._pan_ccallerid5 = Simple.pan_ccallerid5;
this._pan_nmostrar = Simple.pan_nmostrar;
this._pan_csender = Simple.pan_csender;
this._pan_cnrosim1 = Simple.pan_cnrosim1;
this._pan_ccompania1 = Simple.pan_ccompania1;
this._pan_cnrosim2 = Simple.pan_cnrosim2;
this._pan_ccompania2 = Simple.pan_ccompania2;
this._pan_cgprs = Simple.pan_cgprs;
this._pan_ireceptor = Simple.pan_ireceptor;
this._pan_cconfig = Simple.pan_cconfig;
this._pan_rpmidkey = Simple.pan_rpmidkey;
this._pan_cModemSMS = Simple.pan_cModemSMS;
this._pan_cClavePanel = Simple.pan_cClavePanel;

		}
 ///<summary>
     ///Gets a baseobject   
     ///</summary>
		public override BaseObject GetBaseObject(SqlHelper SqlConfig, int UserId)
		{
			return new DalPanel(SqlConfig, UserId, (SimplePanel) GetSimpleObject());
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
               dt.Columns.Add(new DataColumn("pan_iidcuenta", typeof (int)));               
							 dt.Columns.Add(new DataColumn("pan_ccodigo", typeof (string)));               
							 dt.Columns.Add(new DataColumn("pan_mubicacion", typeof (string)));               
							 dt.Columns.Add(new DataColumn("pan_ccallerid1", typeof (string)));               
							 dt.Columns.Add(new DataColumn("pan_ccallerid2", typeof (string)));               
							 dt.Columns.Add(new DataColumn("pan_ccallerid3", typeof (string)));               
							 dt.Columns.Add(new DataColumn("pan_ccallerid4", typeof (string)));               
							 dt.Columns.Add(new DataColumn("pan_ccallerid5", typeof (string)));               
							 dt.Columns.Add(new DataColumn("pan_nmostrar", typeof (Decimal)));               
							 dt.Columns.Add(new DataColumn("pan_csender", typeof (string)));               
							 dt.Columns.Add(new DataColumn("pan_cnrosim1", typeof (string)));               
							 dt.Columns.Add(new DataColumn("pan_ccompania1", typeof (string)));               
							 dt.Columns.Add(new DataColumn("pan_cnrosim2", typeof (string)));               
							 dt.Columns.Add(new DataColumn("pan_ccompania2", typeof (string)));               
							 dt.Columns.Add(new DataColumn("pan_cgprs", typeof (string)));               
							 dt.Columns.Add(new DataColumn("pan_ireceptor", typeof (int)));               
							 dt.Columns.Add(new DataColumn("pan_cconfig", typeof (string)));               
							 dt.Columns.Add(new DataColumn("pan_rpmidkey", typeof (int)));               
							 dt.Columns.Add(new DataColumn("pan_cModemSMS", typeof (int)));               
							 dt.Columns.Add(new DataColumn("pan_cClavePanel", typeof (string)));               
							 										
               //create Row  
               dr = dt.NewRow();
               
               //set Row
							 dr["Id"] = base.Id;

							 dr["Name"] = base.Name;
dr["pan_iidcuenta"] = this._pan_iidcuenta;
dr["pan_ccodigo"] = this._pan_ccodigo;
dr["pan_mubicacion"] = this._pan_mubicacion;
dr["pan_ccallerid1"] = this._pan_ccallerid1;
dr["pan_ccallerid2"] = this._pan_ccallerid2;
dr["pan_ccallerid3"] = this._pan_ccallerid3;
dr["pan_ccallerid4"] = this._pan_ccallerid4;
dr["pan_ccallerid5"] = this._pan_ccallerid5;
dr["pan_nmostrar"] = this._pan_nmostrar;
dr["pan_csender"] = this._pan_csender;
dr["pan_cnrosim1"] = this._pan_cnrosim1;
dr["pan_ccompania1"] = this._pan_ccompania1;
dr["pan_cnrosim2"] = this._pan_cnrosim2;
dr["pan_ccompania2"] = this._pan_ccompania2;
dr["pan_cgprs"] = this._pan_cgprs;
dr["pan_ireceptor"] = this._pan_ireceptor;
dr["pan_cconfig"] = this._pan_cconfig;
dr["pan_rpmidkey"] = this._pan_rpmidkey;
dr["pan_cModemSMS"] = this._pan_cModemSMS;
dr["pan_cClavePanel"] = this._pan_cClavePanel;
							 
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
