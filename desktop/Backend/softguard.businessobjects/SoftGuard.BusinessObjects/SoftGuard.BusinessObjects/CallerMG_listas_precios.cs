
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
    public class CallerMG_listas_precios : CallerObject
    { 	
				     private string _mglp_nombre;
					
				     private int _mglp_tipo;
					
				     private Single _mglp_multiplicador;
					
				     private int _mglp_idorganizacion;
					
				     private string _mglp_currency;
				 ///<summary>
     ///mglp_nombre property   
     ///</summary>   
     public string mglp_nombre 
		 { 
		        
                    get{ return this._mglp_nombre; }
        						set{ this._mglp_nombre = value; } 										
	   }
	  ///<summary>
     ///mglp_tipo property   
     ///</summary>   
     public int mglp_tipo 
		 { 
		        
                    get{ return this._mglp_tipo; }
        						set{ this._mglp_tipo = value; } 										
	   }
	  ///<summary>
     ///mglp_multiplicador property   
     ///</summary>   
     public Single mglp_multiplicador 
		 { 
		        
                    get{ return this._mglp_multiplicador; }
        						set{ this._mglp_multiplicador = value; } 										
	   }
	  ///<summary>
     ///mglp_idorganizacion property   
     ///</summary>   
     public int mglp_idorganizacion 
		 { 
		        
                    get{ return this._mglp_idorganizacion; }
        						set{ this._mglp_idorganizacion = value; } 										
	   }
	  ///<summary>
     ///mglp_currency property   
     ///</summary>   
     public string mglp_currency 
		 { 
		        
                    get{ return this._mglp_currency; }
        						set{ this._mglp_currency = value; } 										
	   }
	  ///<summary>
     ///Constructor   
     ///</summary>
        public CallerMG_listas_precios() : base()
        {
            InitClass();
        }  
 ///<summary>
     ///Constructor   
     ///</summary>		
        public CallerMG_listas_precios(int Id, string Name, string mglp_nombre, int mglp_tipo, Single mglp_multiplicador, int mglp_idorganizacion, string mglp_currency) : base()
        {
            base.Id = Id;
						base.Name = Name;				 																																					 
				    this._mglp_nombre = mglp_nombre;
this._mglp_tipo = mglp_tipo;
this._mglp_multiplicador = mglp_multiplicador;
this._mglp_idorganizacion = mglp_idorganizacion;
this._mglp_currency = mglp_currency;

            InitClass();
        }  								

				private void InitClass()
        {														
  				  base.Type = new ObjectType(3184, "MG_listas_precios");
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
			SimpleMG_listas_precios Simple = new SimpleMG_listas_precios();
			Simple.Id = base.Id;
			Simple.Name = base.Name;
			Simple.mglp_nombre = this._mglp_nombre;
Simple.mglp_tipo = this._mglp_tipo;
Simple.mglp_multiplicador = this._mglp_multiplicador;
Simple.mglp_idorganizacion = this._mglp_idorganizacion;
Simple.mglp_currency = this._mglp_currency;

			return (SimpleBaseObject) Simple;
		}
 ///<summary>
     ///Sets a simpleobject   
     ///</summary>	
		public void SetSimpleObject(SimpleMG_listas_precios Simple)
		{
			base.Id = Simple.Id;
			base.Name = Simple.Name;
			this._mglp_nombre = Simple.mglp_nombre;
this._mglp_tipo = Simple.mglp_tipo;
this._mglp_multiplicador = Simple.mglp_multiplicador;
this._mglp_idorganizacion = Simple.mglp_idorganizacion;
this._mglp_currency = Simple.mglp_currency;

		}
 ///<summary>
     ///Gets a baseobject   
     ///</summary>
		public override BaseObject GetBaseObject(SqlHelper SqlConfig, int UserId)
		{
			return new DalMG_listas_precios(SqlConfig, UserId, (SimpleMG_listas_precios) GetSimpleObject());
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
               dt.Columns.Add(new DataColumn("mglp_nombre", typeof (string)));               
							 dt.Columns.Add(new DataColumn("mglp_tipo", typeof (int)));               
							 dt.Columns.Add(new DataColumn("mglp_multiplicador", typeof (Single)));               
							 dt.Columns.Add(new DataColumn("mglp_idorganizacion", typeof (int)));               
							 dt.Columns.Add(new DataColumn("mglp_currency", typeof (string)));               
							 										
               //create Row  
               dr = dt.NewRow();
               
               //set Row
							 dr["Id"] = base.Id;

							 dr["Name"] = base.Name;
dr["mglp_nombre"] = this._mglp_nombre;
dr["mglp_tipo"] = this._mglp_tipo;
dr["mglp_multiplicador"] = this._mglp_multiplicador;
dr["mglp_idorganizacion"] = this._mglp_idorganizacion;
dr["mglp_currency"] = this._mglp_currency;
							 
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
