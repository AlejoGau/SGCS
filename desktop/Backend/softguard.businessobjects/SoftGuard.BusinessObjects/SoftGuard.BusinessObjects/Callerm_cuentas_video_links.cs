
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
    public class Callerm_cuentas_video_links : CallerObject
    { 	
				     private int _cvl_iidcuenta;
					
				     private string _cvl_calarma;
					
				     private string _cvl_czona;
					
				     private string _cvl_clink;
					
				     private string _cvl_clinkdss;
					
				     private int _cvl_ivideoid;
					
				     private Single _cvl_rlatitud;
					
				     private Single _cvl_rlongitud;
					
				     private int _cuv_iTodosLosEventos;
				 ///<summary>
     ///cvl_iidcuenta property   
     ///</summary>   
     public int cvl_iidcuenta 
		 { 
		        
                    get{ return this._cvl_iidcuenta; }
        						set{ this._cvl_iidcuenta = value; } 										
	   }
	  ///<summary>
     ///cvl_calarma property   
     ///</summary>   
     public string cvl_calarma 
		 { 
		        
                    get{ return this._cvl_calarma; }
        						set{ this._cvl_calarma = value; } 										
	   }
	  ///<summary>
     ///cvl_czona property   
     ///</summary>   
     public string cvl_czona 
		 { 
		        
                    get{ return this._cvl_czona; }
        						set{ this._cvl_czona = value; } 										
	   }
	  ///<summary>
     ///cvl_clink property   
     ///</summary>   
     public string cvl_clink 
		 { 
		        
                    get{ return this._cvl_clink; }
        						set{ this._cvl_clink = value; } 										
	   }
	  ///<summary>
     ///cvl_clinkdss property   
     ///</summary>   
     public string cvl_clinkdss 
		 { 
		        
                    get{ return this._cvl_clinkdss; }
        						set{ this._cvl_clinkdss = value; } 										
	   }
	  ///<summary>
     ///cvl_ivideoid property   
     ///</summary>   
     public int cvl_ivideoid 
		 { 
		        
                    get{ return this._cvl_ivideoid; }
        						set{ this._cvl_ivideoid = value; } 										
	   }
	  ///<summary>
     ///cvl_rlatitud property   
     ///</summary>   
     public Single cvl_rlatitud 
		 { 
		        
                    get{ return this._cvl_rlatitud; }
        						set{ this._cvl_rlatitud = value; } 										
	   }
	  ///<summary>
     ///cvl_rlongitud property   
     ///</summary>   
     public Single cvl_rlongitud 
		 { 
		        
                    get{ return this._cvl_rlongitud; }
        						set{ this._cvl_rlongitud = value; } 										
	   }
	  ///<summary>
     ///cuv_iTodosLosEventos property   
     ///</summary>   
     public int cuv_iTodosLosEventos 
		 { 
		        
                    get{ return this._cuv_iTodosLosEventos; }
        						set{ this._cuv_iTodosLosEventos = value; } 										
	   }
	  ///<summary>
     ///Constructor   
     ///</summary>
        public Callerm_cuentas_video_links() : base()
        {
            InitClass();
        }  
 ///<summary>
     ///Constructor   
     ///</summary>		
        public Callerm_cuentas_video_links(int Id, string Name, int cvl_iidcuenta, string cvl_calarma, string cvl_czona, string cvl_clink, string cvl_clinkdss, int cvl_ivideoid, Single cvl_rlatitud, Single cvl_rlongitud, int cuv_iTodosLosEventos) : base()
        {
            base.Id = Id;
						base.Name = Name;				 																																					 
				    this._cvl_iidcuenta = cvl_iidcuenta;
this._cvl_calarma = cvl_calarma;
this._cvl_czona = cvl_czona;
this._cvl_clink = cvl_clink;
this._cvl_clinkdss = cvl_clinkdss;
this._cvl_ivideoid = cvl_ivideoid;
this._cvl_rlatitud = cvl_rlatitud;
this._cvl_rlongitud = cvl_rlongitud;
this._cuv_iTodosLosEventos = cuv_iTodosLosEventos;

            InitClass();
        }  								

				private void InitClass()
        {														
  				  base.Type = new ObjectType(3110, "m_cuentas_video_links");
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
			Simplem_cuentas_video_links Simple = new Simplem_cuentas_video_links();
			Simple.Id = base.Id;
			Simple.Name = base.Name;
			Simple.cvl_iidcuenta = this._cvl_iidcuenta;
Simple.cvl_calarma = this._cvl_calarma;
Simple.cvl_czona = this._cvl_czona;
Simple.cvl_clink = this._cvl_clink;
Simple.cvl_clinkdss = this._cvl_clinkdss;
Simple.cvl_ivideoid = this._cvl_ivideoid;
Simple.cvl_rlatitud = this._cvl_rlatitud;
Simple.cvl_rlongitud = this._cvl_rlongitud;
Simple.cuv_iTodosLosEventos = this._cuv_iTodosLosEventos;

			return (SimpleBaseObject) Simple;
		}
 ///<summary>
     ///Sets a simpleobject   
     ///</summary>	
		public void SetSimpleObject(Simplem_cuentas_video_links Simple)
		{
			base.Id = Simple.Id;
			base.Name = Simple.Name;
			this._cvl_iidcuenta = Simple.cvl_iidcuenta;
this._cvl_calarma = Simple.cvl_calarma;
this._cvl_czona = Simple.cvl_czona;
this._cvl_clink = Simple.cvl_clink;
this._cvl_clinkdss = Simple.cvl_clinkdss;
this._cvl_ivideoid = Simple.cvl_ivideoid;
this._cvl_rlatitud = Simple.cvl_rlatitud;
this._cvl_rlongitud = Simple.cvl_rlongitud;
this._cuv_iTodosLosEventos = Simple.cuv_iTodosLosEventos;

		}
 ///<summary>
     ///Gets a baseobject   
     ///</summary>
		public override BaseObject GetBaseObject(SqlHelper SqlConfig, int UserId)
		{
			return new Dalm_cuentas_video_links(SqlConfig, UserId, (Simplem_cuentas_video_links) GetSimpleObject());
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
               dt.Columns.Add(new DataColumn("cvl_iidcuenta", typeof (int)));               
							 dt.Columns.Add(new DataColumn("cvl_calarma", typeof (string)));               
							 dt.Columns.Add(new DataColumn("cvl_czona", typeof (string)));               
							 dt.Columns.Add(new DataColumn("cvl_clink", typeof (string)));               
							 dt.Columns.Add(new DataColumn("cvl_clinkdss", typeof (string)));               
							 dt.Columns.Add(new DataColumn("cvl_ivideoid", typeof (int)));               
							 dt.Columns.Add(new DataColumn("cvl_rlatitud", typeof (Single)));               
							 dt.Columns.Add(new DataColumn("cvl_rlongitud", typeof (Single)));               
							 dt.Columns.Add(new DataColumn("cuv_iTodosLosEventos", typeof (int)));               
							 										
               //create Row  
               dr = dt.NewRow();
               
               //set Row
							 dr["Id"] = base.Id;

							 dr["Name"] = base.Name;
dr["cvl_iidcuenta"] = this._cvl_iidcuenta;
dr["cvl_calarma"] = this._cvl_calarma;
dr["cvl_czona"] = this._cvl_czona;
dr["cvl_clink"] = this._cvl_clink;
dr["cvl_clinkdss"] = this._cvl_clinkdss;
dr["cvl_ivideoid"] = this._cvl_ivideoid;
dr["cvl_rlatitud"] = this._cvl_rlatitud;
dr["cvl_rlongitud"] = this._cvl_rlongitud;
dr["cuv_iTodosLosEventos"] = this._cuv_iTodosLosEventos;
							 
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
