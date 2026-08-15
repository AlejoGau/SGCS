
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
    public class Callert_categorias_impositivas_fc : CallerObject
    { 	
				     private string _cat_ccodigo;
					
				     private string _cat_cdescripcion;
					
				     private string _cat_cimpuesto1;
					
				     private string _cat_cimpuesto2;
					
				     private string _cat_cimpuesto3;
					
				     private Decimal _cat_nTipoResp;
					
				     private int _cat_orgicodigoid;
					
				     private int _cat_cbtidkey;
				 ///<summary>
     ///cat_ccodigo property   
     ///</summary>   
     public string cat_ccodigo 
		 { 
		        
                    get{ return this._cat_ccodigo; }
        						set{ this._cat_ccodigo = value; } 										
	   }
	  ///<summary>
     ///cat_cdescripcion property   
     ///</summary>   
     public string cat_cdescripcion 
		 { 
		        
                    get{ return this._cat_cdescripcion; }
        						set{ this._cat_cdescripcion = value; } 										
	   }
	  ///<summary>
     ///cat_cimpuesto1 property   
     ///</summary>   
     public string cat_cimpuesto1 
		 { 
		        
                    get{ return this._cat_cimpuesto1; }
        						set{ this._cat_cimpuesto1 = value; } 										
	   }
	  ///<summary>
     ///cat_cimpuesto2 property   
     ///</summary>   
     public string cat_cimpuesto2 
		 { 
		        
                    get{ return this._cat_cimpuesto2; }
        						set{ this._cat_cimpuesto2 = value; } 										
	   }
	  ///<summary>
     ///cat_cimpuesto3 property   
     ///</summary>   
     public string cat_cimpuesto3 
		 { 
		        
                    get{ return this._cat_cimpuesto3; }
        						set{ this._cat_cimpuesto3 = value; } 										
	   }
	  ///<summary>
     ///cat_nTipoResp property   
     ///</summary>   
     public Decimal cat_nTipoResp 
		 { 
		        
                    get{ return this._cat_nTipoResp; }
        						set{ this._cat_nTipoResp = value; } 										
	   }
	  ///<summary>
     ///cat_orgicodigoid property   
     ///</summary>   
     public int cat_orgicodigoid 
		 { 
		        
                    get{ return this._cat_orgicodigoid; }
        						set{ this._cat_orgicodigoid = value; } 										
	   }
	  ///<summary>
     ///cat_cbtidkey property   
     ///</summary>   
     public int cat_cbtidkey 
		 { 
		        
                    get{ return this._cat_cbtidkey; }
        						set{ this._cat_cbtidkey = value; } 										
	   }
	  ///<summary>
     ///Constructor   
     ///</summary>
        public Callert_categorias_impositivas_fc() : base()
        {
            InitClass();
        }  
 ///<summary>
     ///Constructor   
     ///</summary>		
        public Callert_categorias_impositivas_fc(int Id, string Name, string cat_ccodigo, string cat_cdescripcion, string cat_cimpuesto1, string cat_cimpuesto2, string cat_cimpuesto3, Decimal cat_nTipoResp, int cat_orgicodigoid, int cat_cbtidkey) : base()
        {
            base.Id = Id;
						base.Name = Name;				 																																					 
				    this._cat_ccodigo = cat_ccodigo;
this._cat_cdescripcion = cat_cdescripcion;
this._cat_cimpuesto1 = cat_cimpuesto1;
this._cat_cimpuesto2 = cat_cimpuesto2;
this._cat_cimpuesto3 = cat_cimpuesto3;
this._cat_nTipoResp = cat_nTipoResp;
this._cat_orgicodigoid = cat_orgicodigoid;
this._cat_cbtidkey = cat_cbtidkey;

            InitClass();
        }  								

				private void InitClass()
        {														
  				  base.Type = new ObjectType(3149, "t_categorias_impositivas_fc");
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
			Simplet_categorias_impositivas_fc Simple = new Simplet_categorias_impositivas_fc();
			Simple.Id = base.Id;
			Simple.Name = base.Name;
			Simple.cat_ccodigo = this._cat_ccodigo;
Simple.cat_cdescripcion = this._cat_cdescripcion;
Simple.cat_cimpuesto1 = this._cat_cimpuesto1;
Simple.cat_cimpuesto2 = this._cat_cimpuesto2;
Simple.cat_cimpuesto3 = this._cat_cimpuesto3;
Simple.cat_nTipoResp = this._cat_nTipoResp;
Simple.cat_orgicodigoid = this._cat_orgicodigoid;
Simple.cat_cbtidkey = this._cat_cbtidkey;

			return (SimpleBaseObject) Simple;
		}
 ///<summary>
     ///Sets a simpleobject   
     ///</summary>	
		public void SetSimpleObject(Simplet_categorias_impositivas_fc Simple)
		{
			base.Id = Simple.Id;
			base.Name = Simple.Name;
			this._cat_ccodigo = Simple.cat_ccodigo;
this._cat_cdescripcion = Simple.cat_cdescripcion;
this._cat_cimpuesto1 = Simple.cat_cimpuesto1;
this._cat_cimpuesto2 = Simple.cat_cimpuesto2;
this._cat_cimpuesto3 = Simple.cat_cimpuesto3;
this._cat_nTipoResp = Simple.cat_nTipoResp;
this._cat_orgicodigoid = Simple.cat_orgicodigoid;
this._cat_cbtidkey = Simple.cat_cbtidkey;

		}
 ///<summary>
     ///Gets a baseobject   
     ///</summary>
		public override BaseObject GetBaseObject(SqlHelper SqlConfig, int UserId)
		{
			return new Dalt_categorias_impositivas_fc(SqlConfig, UserId, (Simplet_categorias_impositivas_fc) GetSimpleObject());
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
               dt.Columns.Add(new DataColumn("cat_ccodigo", typeof (string)));               
							 dt.Columns.Add(new DataColumn("cat_cdescripcion", typeof (string)));               
							 dt.Columns.Add(new DataColumn("cat_cimpuesto1", typeof (string)));               
							 dt.Columns.Add(new DataColumn("cat_cimpuesto2", typeof (string)));               
							 dt.Columns.Add(new DataColumn("cat_cimpuesto3", typeof (string)));               
							 dt.Columns.Add(new DataColumn("cat_nTipoResp", typeof (Decimal)));               
							 dt.Columns.Add(new DataColumn("cat_orgicodigoid", typeof (int)));               
							 dt.Columns.Add(new DataColumn("cat_cbtidkey", typeof (int)));               
							 										
               //create Row  
               dr = dt.NewRow();
               
               //set Row
							 dr["Id"] = base.Id;

							 dr["Name"] = base.Name;
dr["cat_ccodigo"] = this._cat_ccodigo;
dr["cat_cdescripcion"] = this._cat_cdescripcion;
dr["cat_cimpuesto1"] = this._cat_cimpuesto1;
dr["cat_cimpuesto2"] = this._cat_cimpuesto2;
dr["cat_cimpuesto3"] = this._cat_cimpuesto3;
dr["cat_nTipoResp"] = this._cat_nTipoResp;
dr["cat_orgicodigoid"] = this._cat_orgicodigoid;
dr["cat_cbtidkey"] = this._cat_cbtidkey;
							 
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
