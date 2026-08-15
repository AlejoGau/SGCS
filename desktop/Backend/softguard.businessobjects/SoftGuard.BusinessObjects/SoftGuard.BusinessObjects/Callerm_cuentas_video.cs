
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
    public class Callerm_cuentas_video : CallerObject
    { 	
				     private int _cuv_iidcuenta;
					
				     private string _cuv_clink;
					
				     private string _cuv_meventos;
					
				     private string _cuv_clinkdss;
					
				     private int _cuv_ivideoid;
					
				     private Single _cuv_rlatitud;
					
				     private Single _cuv_rlongitud;
					
				     private int _cuv_iTodosLosEventos;
				 ///<summary>
     ///cuv_iidcuenta property   
     ///</summary>   
     public int cuv_iidcuenta 
		 { 
		        
                    get{ return this._cuv_iidcuenta; }
        						set{ this._cuv_iidcuenta = value; } 										
	   }
	  ///<summary>
     ///cuv_clink property   
     ///</summary>   
     public string cuv_clink 
		 { 
		        
                    get{ return this._cuv_clink; }
        						set{ this._cuv_clink = value; } 										
	   }
	  ///<summary>
     ///cuv_meventos property   
     ///</summary>   
     public string cuv_meventos 
		 { 
		        
                    get{ return this._cuv_meventos; }
        						set{ this._cuv_meventos = value; } 										
	   }
	  ///<summary>
     ///cuv_clinkdss property   
     ///</summary>   
     public string cuv_clinkdss 
		 { 
		        
                    get{ return this._cuv_clinkdss; }
        						set{ this._cuv_clinkdss = value; } 										
	   }
	  ///<summary>
     ///cuv_ivideoid property   
     ///</summary>   
     public int cuv_ivideoid 
		 { 
		        
                    get{ return this._cuv_ivideoid; }
        						set{ this._cuv_ivideoid = value; } 										
	   }
	  ///<summary>
     ///cuv_rlatitud property   
     ///</summary>   
     public Single cuv_rlatitud 
		 { 
		        
                    get{ return this._cuv_rlatitud; }
        						set{ this._cuv_rlatitud = value; } 										
	   }
	  ///<summary>
     ///cuv_rlongitud property   
     ///</summary>   
     public Single cuv_rlongitud 
		 { 
		        
                    get{ return this._cuv_rlongitud; }
        						set{ this._cuv_rlongitud = value; } 										
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
        public Callerm_cuentas_video() : base()
        {
            InitClass();
        }  
 ///<summary>
     ///Constructor   
     ///</summary>		
        public Callerm_cuentas_video(int Id, string Name, int cuv_iidcuenta, string cuv_clink, string cuv_meventos, string cuv_clinkdss, int cuv_ivideoid, Single cuv_rlatitud, Single cuv_rlongitud, int cuv_iTodosLosEventos) : base()
        {
            base.Id = Id;
						base.Name = Name;				 																																					 
				    this._cuv_iidcuenta = cuv_iidcuenta;
this._cuv_clink = cuv_clink;
this._cuv_meventos = cuv_meventos;
this._cuv_clinkdss = cuv_clinkdss;
this._cuv_ivideoid = cuv_ivideoid;
this._cuv_rlatitud = cuv_rlatitud;
this._cuv_rlongitud = cuv_rlongitud;
this._cuv_iTodosLosEventos = cuv_iTodosLosEventos;

            InitClass();
        }  								

				private void InitClass()
        {														
  				  base.Type = new ObjectType(3109, "m_cuentas_video");
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
			Simplem_cuentas_video Simple = new Simplem_cuentas_video();
			Simple.Id = base.Id;
			Simple.Name = base.Name;
			Simple.cuv_iidcuenta = this._cuv_iidcuenta;
Simple.cuv_clink = this._cuv_clink;
Simple.cuv_meventos = this._cuv_meventos;
Simple.cuv_clinkdss = this._cuv_clinkdss;
Simple.cuv_ivideoid = this._cuv_ivideoid;
Simple.cuv_rlatitud = this._cuv_rlatitud;
Simple.cuv_rlongitud = this._cuv_rlongitud;
Simple.cuv_iTodosLosEventos = this._cuv_iTodosLosEventos;

			return (SimpleBaseObject) Simple;
		}
 ///<summary>
     ///Sets a simpleobject   
     ///</summary>	
		public void SetSimpleObject(Simplem_cuentas_video Simple)
		{
			base.Id = Simple.Id;
			base.Name = Simple.Name;
			this._cuv_iidcuenta = Simple.cuv_iidcuenta;
this._cuv_clink = Simple.cuv_clink;
this._cuv_meventos = Simple.cuv_meventos;
this._cuv_clinkdss = Simple.cuv_clinkdss;
this._cuv_ivideoid = Simple.cuv_ivideoid;
this._cuv_rlatitud = Simple.cuv_rlatitud;
this._cuv_rlongitud = Simple.cuv_rlongitud;
this._cuv_iTodosLosEventos = Simple.cuv_iTodosLosEventos;

		}
 ///<summary>
     ///Gets a baseobject   
     ///</summary>
		public override BaseObject GetBaseObject(SqlHelper SqlConfig, int UserId)
		{
			return new Dalm_cuentas_video(SqlConfig, UserId, (Simplem_cuentas_video) GetSimpleObject());
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
               dt.Columns.Add(new DataColumn("cuv_iidcuenta", typeof (int)));               
							 dt.Columns.Add(new DataColumn("cuv_clink", typeof (string)));               
							 dt.Columns.Add(new DataColumn("cuv_meventos", typeof (string)));               
							 dt.Columns.Add(new DataColumn("cuv_clinkdss", typeof (string)));               
							 dt.Columns.Add(new DataColumn("cuv_ivideoid", typeof (int)));               
							 dt.Columns.Add(new DataColumn("cuv_rlatitud", typeof (Single)));               
							 dt.Columns.Add(new DataColumn("cuv_rlongitud", typeof (Single)));               
							 dt.Columns.Add(new DataColumn("cuv_iTodosLosEventos", typeof (int)));               
							 										
               //create Row  
               dr = dt.NewRow();
               
               //set Row
							 dr["Id"] = base.Id;

							 dr["Name"] = base.Name;
dr["cuv_iidcuenta"] = this._cuv_iidcuenta;
dr["cuv_clink"] = this._cuv_clink;
dr["cuv_meventos"] = this._cuv_meventos;
dr["cuv_clinkdss"] = this._cuv_clinkdss;
dr["cuv_ivideoid"] = this._cuv_ivideoid;
dr["cuv_rlatitud"] = this._cuv_rlatitud;
dr["cuv_rlongitud"] = this._cuv_rlongitud;
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
