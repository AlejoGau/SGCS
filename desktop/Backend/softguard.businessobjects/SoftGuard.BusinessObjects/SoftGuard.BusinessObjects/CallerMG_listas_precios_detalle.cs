
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
    public class CallerMG_listas_precios_detalle : CallerObject
    { 	
				     private int _mglpd_idproducto;
					
				     private int _mglpd_idlista;
					
				     private Decimal _mglpd_valor;
				 ///<summary>
     ///mglpd_idproducto property   
     ///</summary>   
     public int mglpd_idproducto 
		 { 
		        
                    get{ return this._mglpd_idproducto; }
        						set{ this._mglpd_idproducto = value; } 										
	   }
	  ///<summary>
     ///mglpd_idlista property   
     ///</summary>   
     public int mglpd_idlista 
		 { 
		        
                    get{ return this._mglpd_idlista; }
        						set{ this._mglpd_idlista = value; } 										
	   }
	  ///<summary>
     ///mglpd_valor property   
     ///</summary>   
     public Decimal mglpd_valor 
		 { 
		        
                    get{ return this._mglpd_valor; }
        						set{ this._mglpd_valor = value; } 										
	   }
	  ///<summary>
     ///Constructor   
     ///</summary>
        public CallerMG_listas_precios_detalle() : base()
        {
            InitClass();
        }  
 ///<summary>
     ///Constructor   
     ///</summary>		
        public CallerMG_listas_precios_detalle(int Id, string Name, int mglpd_idproducto, int mglpd_idlista, Decimal mglpd_valor) : base()
        {
            base.Id = Id;
						base.Name = Name;				 																																					 
				    this._mglpd_idproducto = mglpd_idproducto;
this._mglpd_idlista = mglpd_idlista;
this._mglpd_valor = mglpd_valor;

            InitClass();
        }  								

				private void InitClass()
        {														
  				  base.Type = new ObjectType(3185, "MG_listas_precios_detalle");
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
			SimpleMG_listas_precios_detalle Simple = new SimpleMG_listas_precios_detalle();
			Simple.Id = base.Id;
			Simple.Name = base.Name;
			Simple.mglpd_idproducto = this._mglpd_idproducto;
Simple.mglpd_idlista = this._mglpd_idlista;
Simple.mglpd_valor = this._mglpd_valor;

			return (SimpleBaseObject) Simple;
		}
 ///<summary>
     ///Sets a simpleobject   
     ///</summary>	
		public void SetSimpleObject(SimpleMG_listas_precios_detalle Simple)
		{
			base.Id = Simple.Id;
			base.Name = Simple.Name;
			this._mglpd_idproducto = Simple.mglpd_idproducto;
this._mglpd_idlista = Simple.mglpd_idlista;
this._mglpd_valor = Simple.mglpd_valor;

		}
 ///<summary>
     ///Gets a baseobject   
     ///</summary>
		public override BaseObject GetBaseObject(SqlHelper SqlConfig, int UserId)
		{
			return new DalMG_listas_precios_detalle(SqlConfig, UserId, (SimpleMG_listas_precios_detalle) GetSimpleObject());
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
               dt.Columns.Add(new DataColumn("mglpd_idproducto", typeof (int)));               
							 dt.Columns.Add(new DataColumn("mglpd_idlista", typeof (int)));               
							 dt.Columns.Add(new DataColumn("mglpd_valor", typeof (Decimal)));               
							 										
               //create Row  
               dr = dt.NewRow();
               
               //set Row
							 dr["Id"] = base.Id;

							 dr["Name"] = base.Name;
dr["mglpd_idproducto"] = this._mglpd_idproducto;
dr["mglpd_idlista"] = this._mglpd_idlista;
dr["mglpd_valor"] = this._mglpd_valor;
							 
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
