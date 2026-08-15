
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
    public class Callert_impuestos_fc : CallerObject
    { 	
				     private string _imp_ccodigo;
					
				     private string _imp_cdescripcion;
					
				     private Decimal _imp_nporcentaje;
					
				     private string _imp_extcode;
					
				     private int _imp_idorganizacion;
					
				     private int _imp_mgmcidkey;
				 ///<summary>
     ///imp_ccodigo property   
     ///</summary>   
     public string imp_ccodigo 
		 { 
		        
                    get{ return this._imp_ccodigo; }
        						set{ this._imp_ccodigo = value; } 										
	   }
	  ///<summary>
     ///imp_cdescripcion property   
     ///</summary>   
     public string imp_cdescripcion 
		 { 
		        
                    get{ return this._imp_cdescripcion; }
        						set{ this._imp_cdescripcion = value; } 										
	   }
	  ///<summary>
     ///imp_nporcentaje property   
     ///</summary>   
     public Decimal imp_nporcentaje 
		 { 
		        
                    get{ return this._imp_nporcentaje; }
        						set{ this._imp_nporcentaje = value; } 										
	   }
	  ///<summary>
     ///imp_extcode property   
     ///</summary>   
     public string imp_extcode 
		 { 
		        
                    get{ return this._imp_extcode; }
        						set{ this._imp_extcode = value; } 										
	   }
	  ///<summary>
     ///imp_idorganizacion property   
     ///</summary>   
     public int imp_idorganizacion 
		 { 
		        
                    get{ return this._imp_idorganizacion; }
        						set{ this._imp_idorganizacion = value; } 										
	   }
	  ///<summary>
     ///imp_mgmcidkey property   
     ///</summary>   
     public int imp_mgmcidkey 
		 { 
		        
                    get{ return this._imp_mgmcidkey; }
        						set{ this._imp_mgmcidkey = value; } 										
	   }
	  ///<summary>
     ///Constructor   
     ///</summary>
        public Callert_impuestos_fc() : base()
        {
            InitClass();
        }  
 ///<summary>
     ///Constructor   
     ///</summary>		
        public Callert_impuestos_fc(int Id, string Name, string imp_ccodigo, string imp_cdescripcion, Decimal imp_nporcentaje, string imp_extcode, int imp_idorganizacion, int imp_mgmcidkey) : base()
        {
            base.Id = Id;
						base.Name = Name;				 																																					 
				    this._imp_ccodigo = imp_ccodigo;
this._imp_cdescripcion = imp_cdescripcion;
this._imp_nporcentaje = imp_nporcentaje;
this._imp_extcode = imp_extcode;
this._imp_idorganizacion = imp_idorganizacion;
this._imp_mgmcidkey = imp_mgmcidkey;

            InitClass();
        }  								

				private void InitClass()
        {														
  				  base.Type = new ObjectType(3192, "t_impuestos_fc");
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
			Simplet_impuestos_fc Simple = new Simplet_impuestos_fc();
			Simple.Id = base.Id;
			Simple.Name = base.Name;
			Simple.imp_ccodigo = this._imp_ccodigo;
Simple.imp_cdescripcion = this._imp_cdescripcion;
Simple.imp_nporcentaje = this._imp_nporcentaje;
Simple.imp_extcode = this._imp_extcode;
Simple.imp_idorganizacion = this._imp_idorganizacion;
Simple.imp_mgmcidkey = this._imp_mgmcidkey;

			return (SimpleBaseObject) Simple;
		}
 ///<summary>
     ///Sets a simpleobject   
     ///</summary>	
		public void SetSimpleObject(Simplet_impuestos_fc Simple)
		{
			base.Id = Simple.Id;
			base.Name = Simple.Name;
			this._imp_ccodigo = Simple.imp_ccodigo;
this._imp_cdescripcion = Simple.imp_cdescripcion;
this._imp_nporcentaje = Simple.imp_nporcentaje;
this._imp_extcode = Simple.imp_extcode;
this._imp_idorganizacion = Simple.imp_idorganizacion;
this._imp_mgmcidkey = Simple.imp_mgmcidkey;

		}
 ///<summary>
     ///Gets a baseobject   
     ///</summary>
		public override BaseObject GetBaseObject(SqlHelper SqlConfig, int UserId)
		{
			return new Dalt_impuestos_fc(SqlConfig, UserId, (Simplet_impuestos_fc) GetSimpleObject());
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
               dt.Columns.Add(new DataColumn("imp_ccodigo", typeof (string)));               
							 dt.Columns.Add(new DataColumn("imp_cdescripcion", typeof (string)));               
							 dt.Columns.Add(new DataColumn("imp_nporcentaje", typeof (Decimal)));               
							 dt.Columns.Add(new DataColumn("imp_extcode", typeof (string)));               
							 dt.Columns.Add(new DataColumn("imp_idorganizacion", typeof (int)));               
							 dt.Columns.Add(new DataColumn("imp_mgmcidkey", typeof (int)));               
							 										
               //create Row  
               dr = dt.NewRow();
               
               //set Row
							 dr["Id"] = base.Id;

							 dr["Name"] = base.Name;
dr["imp_ccodigo"] = this._imp_ccodigo;
dr["imp_cdescripcion"] = this._imp_cdescripcion;
dr["imp_nporcentaje"] = this._imp_nporcentaje;
dr["imp_extcode"] = this._imp_extcode;
dr["imp_idorganizacion"] = this._imp_idorganizacion;
dr["imp_mgmcidkey"] = this._imp_mgmcidkey;
							 
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
