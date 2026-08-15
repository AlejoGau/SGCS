
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
    public class CallerEventosEnFalloTesteo : CallerObject
    { 	
				     private int _eft_irecid;
					
				     private int _eft_iidcuenta;
					
				     private DateTime? _eft_teventofechahora;
					
				     private string _eft_clinea;
					
				     private string _eft_ccuenta;
					
				     private string _eft_cnombre;
					
				     private string _eft_calarma;
					
				     private string _eft_calarmadescripcion;
					
				     private int _eft_nalarmacolor;
					
				     private int _eft_nalarmacolorletra;
					
				     private string _eft_calarmaautoprocesa;
				 ///<summary>
     ///eft_irecid property   
     ///</summary>   
     public int eft_irecid 
		 { 
		        
                    get{ return this._eft_irecid; }
        						set{ this._eft_irecid = value; } 										
	   }
	  ///<summary>
     ///eft_iidcuenta property   
     ///</summary>   
     public int eft_iidcuenta 
		 { 
		        
                    get{ return this._eft_iidcuenta; }
        						set{ this._eft_iidcuenta = value; } 										
	   }
	  ///<summary>
     ///eft_teventofechahora property   
     ///</summary>   
     public DateTime? eft_teventofechahora 
		 { 
		        
                    get{ return this._eft_teventofechahora; }
        						set{ this._eft_teventofechahora = value; } 										
	   }
	  ///<summary>
     ///eft_clinea property   
     ///</summary>   
     public string eft_clinea 
		 { 
		        
                    get{ return this._eft_clinea; }
        						set{ this._eft_clinea = value; } 										
	   }
	  ///<summary>
     ///eft_ccuenta property   
     ///</summary>   
     public string eft_ccuenta 
		 { 
		        
                    get{ return this._eft_ccuenta; }
        						set{ this._eft_ccuenta = value; } 										
	   }
	  ///<summary>
     ///eft_cnombre property   
     ///</summary>   
     public string eft_cnombre 
		 { 
		        
                    get{ return this._eft_cnombre; }
        						set{ this._eft_cnombre = value; } 										
	   }
	  ///<summary>
     ///eft_calarma property   
     ///</summary>   
     public string eft_calarma 
		 { 
		        
                    get{ return this._eft_calarma; }
        						set{ this._eft_calarma = value; } 										
	   }
	  ///<summary>
     ///eft_calarmadescripcion property   
     ///</summary>   
     public string eft_calarmadescripcion 
		 { 
		        
                    get{ return this._eft_calarmadescripcion; }
        						set{ this._eft_calarmadescripcion = value; } 										
	   }
	  ///<summary>
     ///eft_nalarmacolor property   
     ///</summary>   
     public int eft_nalarmacolor 
		 { 
		        
                    get{ return this._eft_nalarmacolor; }
        						set{ this._eft_nalarmacolor = value; } 										
	   }
	  ///<summary>
     ///eft_nalarmacolorletra property   
     ///</summary>   
     public int eft_nalarmacolorletra 
		 { 
		        
                    get{ return this._eft_nalarmacolorletra; }
        						set{ this._eft_nalarmacolorletra = value; } 										
	   }
	  ///<summary>
     ///eft_calarmaautoprocesa property   
     ///</summary>   
     public string eft_calarmaautoprocesa 
		 { 
		        
                    get{ return this._eft_calarmaautoprocesa; }
        						set{ this._eft_calarmaautoprocesa = value; } 										
	   }
	  ///<summary>
     ///Constructor   
     ///</summary>
        public CallerEventosEnFalloTesteo() : base()
        {
            InitClass();
        }  
 ///<summary>
     ///Constructor   
     ///</summary>		
        public CallerEventosEnFalloTesteo(int Id, string Name, int eft_irecid, int eft_iidcuenta, DateTime? eft_teventofechahora, string eft_clinea, string eft_ccuenta, string eft_cnombre, string eft_calarma, string eft_calarmadescripcion, int eft_nalarmacolor, int eft_nalarmacolorletra, string eft_calarmaautoprocesa) : base()
        {
            base.Id = Id;
						base.Name = Name;				 																																					 
				    this._eft_irecid = eft_irecid;
this._eft_iidcuenta = eft_iidcuenta;
this._eft_teventofechahora = eft_teventofechahora;
this._eft_clinea = eft_clinea;
this._eft_ccuenta = eft_ccuenta;
this._eft_cnombre = eft_cnombre;
this._eft_calarma = eft_calarma;
this._eft_calarmadescripcion = eft_calarmadescripcion;
this._eft_nalarmacolor = eft_nalarmacolor;
this._eft_nalarmacolorletra = eft_nalarmacolorletra;
this._eft_calarmaautoprocesa = eft_calarmaautoprocesa;

            InitClass();
        }  								

				private void InitClass()
        {														
  				  base.Type = new ObjectType(3165, "EventosEnFalloTesteo");
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
			SimpleEventosEnFalloTesteo Simple = new SimpleEventosEnFalloTesteo();
			Simple.Id = base.Id;
			Simple.Name = base.Name;
			Simple.eft_irecid = this._eft_irecid;
Simple.eft_iidcuenta = this._eft_iidcuenta;
Simple.eft_teventofechahora = this._eft_teventofechahora;
Simple.eft_clinea = this._eft_clinea;
Simple.eft_ccuenta = this._eft_ccuenta;
Simple.eft_cnombre = this._eft_cnombre;
Simple.eft_calarma = this._eft_calarma;
Simple.eft_calarmadescripcion = this._eft_calarmadescripcion;
Simple.eft_nalarmacolor = this._eft_nalarmacolor;
Simple.eft_nalarmacolorletra = this._eft_nalarmacolorletra;
Simple.eft_calarmaautoprocesa = this._eft_calarmaautoprocesa;

			return (SimpleBaseObject) Simple;
		}
 ///<summary>
     ///Sets a simpleobject   
     ///</summary>	
		public void SetSimpleObject(SimpleEventosEnFalloTesteo Simple)
		{
			base.Id = Simple.Id;
			base.Name = Simple.Name;
			this._eft_irecid = Simple.eft_irecid;
this._eft_iidcuenta = Simple.eft_iidcuenta;
this._eft_teventofechahora = Simple.eft_teventofechahora;
this._eft_clinea = Simple.eft_clinea;
this._eft_ccuenta = Simple.eft_ccuenta;
this._eft_cnombre = Simple.eft_cnombre;
this._eft_calarma = Simple.eft_calarma;
this._eft_calarmadescripcion = Simple.eft_calarmadescripcion;
this._eft_nalarmacolor = Simple.eft_nalarmacolor;
this._eft_nalarmacolorletra = Simple.eft_nalarmacolorletra;
this._eft_calarmaautoprocesa = Simple.eft_calarmaautoprocesa;

		}
 ///<summary>
     ///Gets a baseobject   
     ///</summary>
		public override BaseObject GetBaseObject(SqlHelper SqlConfig, int UserId)
		{
			return new DalEventosEnFalloTesteo(SqlConfig, UserId, (SimpleEventosEnFalloTesteo) GetSimpleObject());
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
               dt.Columns.Add(new DataColumn("eft_irecid", typeof (int)));               
							 dt.Columns.Add(new DataColumn("eft_iidcuenta", typeof (int)));               
							 dt.Columns.Add(new DataColumn("eft_teventofechahora", typeof (DateTime)));               
							 dt.Columns.Add(new DataColumn("eft_clinea", typeof (string)));               
							 dt.Columns.Add(new DataColumn("eft_ccuenta", typeof (string)));               
							 dt.Columns.Add(new DataColumn("eft_cnombre", typeof (string)));               
							 dt.Columns.Add(new DataColumn("eft_calarma", typeof (string)));               
							 dt.Columns.Add(new DataColumn("eft_calarmadescripcion", typeof (string)));               
							 dt.Columns.Add(new DataColumn("eft_nalarmacolor", typeof (int)));               
							 dt.Columns.Add(new DataColumn("eft_nalarmacolorletra", typeof (int)));               
							 dt.Columns.Add(new DataColumn("eft_calarmaautoprocesa", typeof (string)));               
							 										
               //create Row  
               dr = dt.NewRow();
               
               //set Row
							 dr["Id"] = base.Id;

							 dr["Name"] = base.Name;
dr["eft_irecid"] = this._eft_irecid;
dr["eft_iidcuenta"] = this._eft_iidcuenta;
dr["eft_teventofechahora"] = this._eft_teventofechahora;
dr["eft_clinea"] = this._eft_clinea;
dr["eft_ccuenta"] = this._eft_ccuenta;
dr["eft_cnombre"] = this._eft_cnombre;
dr["eft_calarma"] = this._eft_calarma;
dr["eft_calarmadescripcion"] = this._eft_calarmadescripcion;
dr["eft_nalarmacolor"] = this._eft_nalarmacolor;
dr["eft_nalarmacolorletra"] = this._eft_nalarmacolorletra;
dr["eft_calarmaautoprocesa"] = this._eft_calarmaautoprocesa;
							 
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
