
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
    public class Callert_estadosdinamicos : CallerObject
    { 	
				     private string _ted_ccodigo;
					
				     private string _ted_cdescripcion;
					
				     private string _ted_ceventos;
					
				     private int _ted_ivalor;
					
				     private int _ted_iporusuario;
					
				     private int _ted_iactivo;
					
				     private int _ted_ieditable;
					
				     private int _ted_idcta;
				 ///<summary>
     ///ted_ccodigo property   
     ///</summary>   
     public string ted_ccodigo 
		 { 
		        
                    get{ return this._ted_ccodigo; }
        						set{ this._ted_ccodigo = value; } 										
	   }
	  ///<summary>
     ///ted_cdescripcion property   
     ///</summary>   
     public string ted_cdescripcion 
		 { 
		        
                    get{ return this._ted_cdescripcion; }
        						set{ this._ted_cdescripcion = value; } 										
	   }
	  ///<summary>
     ///ted_ceventos property   
     ///</summary>   
     public string ted_ceventos 
		 { 
		        
                    get{ return this._ted_ceventos; }
        						set{ this._ted_ceventos = value; } 										
	   }
	  ///<summary>
     ///ted_ivalor property   
     ///</summary>   
     public int ted_ivalor 
		 { 
		        
                    get{ return this._ted_ivalor; }
        						set{ this._ted_ivalor = value; } 										
	   }
	  ///<summary>
     ///ted_iporusuario property   
     ///</summary>   
     public int ted_iporusuario 
		 { 
		        
                    get{ return this._ted_iporusuario; }
        						set{ this._ted_iporusuario = value; } 										
	   }
	  ///<summary>
     ///ted_iactivo property   
     ///</summary>   
     public int ted_iactivo 
		 { 
		        
                    get{ return this._ted_iactivo; }
        						set{ this._ted_iactivo = value; } 										
	   }
	  ///<summary>
     ///ted_ieditable property   
     ///</summary>   
     public int ted_ieditable 
		 { 
		        
                    get{ return this._ted_ieditable; }
        						set{ this._ted_ieditable = value; } 										
	   }
	  ///<summary>
     ///ted_idcta property   
     ///</summary>   
     public int ted_idcta 
		 { 
		        
                    get{ return this._ted_idcta; }
        						set{ this._ted_idcta = value; } 										
	   }
	  ///<summary>
     ///Constructor   
     ///</summary>
        public Callert_estadosdinamicos() : base()
        {
            InitClass();
        }  
 ///<summary>
     ///Constructor   
     ///</summary>		
        public Callert_estadosdinamicos(int Id, string Name, string ted_ccodigo, string ted_cdescripcion, string ted_ceventos, int ted_ivalor, int ted_iporusuario, int ted_iactivo, int ted_ieditable, int ted_idcta) : base()
        {
            base.Id = Id;
						base.Name = Name;				 																																					 
				    this._ted_ccodigo = ted_ccodigo;
this._ted_cdescripcion = ted_cdescripcion;
this._ted_ceventos = ted_ceventos;
this._ted_ivalor = ted_ivalor;
this._ted_iporusuario = ted_iporusuario;
this._ted_iactivo = ted_iactivo;
this._ted_ieditable = ted_ieditable;
this._ted_idcta = ted_idcta;

            InitClass();
        }  								

				private void InitClass()
        {														
  				  base.Type = new ObjectType(3175, "t_estadosdinamicos");
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
			Simplet_estadosdinamicos Simple = new Simplet_estadosdinamicos();
			Simple.Id = base.Id;
			Simple.Name = base.Name;
			Simple.ted_ccodigo = this._ted_ccodigo;
Simple.ted_cdescripcion = this._ted_cdescripcion;
Simple.ted_ceventos = this._ted_ceventos;
Simple.ted_ivalor = this._ted_ivalor;
Simple.ted_iporusuario = this._ted_iporusuario;
Simple.ted_iactivo = this._ted_iactivo;
Simple.ted_ieditable = this._ted_ieditable;
Simple.ted_idcta = this._ted_idcta;

			return (SimpleBaseObject) Simple;
		}
 ///<summary>
     ///Sets a simpleobject   
     ///</summary>	
		public void SetSimpleObject(Simplet_estadosdinamicos Simple)
		{
			base.Id = Simple.Id;
			base.Name = Simple.Name;
			this._ted_ccodigo = Simple.ted_ccodigo;
this._ted_cdescripcion = Simple.ted_cdescripcion;
this._ted_ceventos = Simple.ted_ceventos;
this._ted_ivalor = Simple.ted_ivalor;
this._ted_iporusuario = Simple.ted_iporusuario;
this._ted_iactivo = Simple.ted_iactivo;
this._ted_ieditable = Simple.ted_ieditable;
this._ted_idcta = Simple.ted_idcta;

		}
 ///<summary>
     ///Gets a baseobject   
     ///</summary>
		public override BaseObject GetBaseObject(SqlHelper SqlConfig, int UserId)
		{
			return new Dalt_estadosdinamicos(SqlConfig, UserId, (Simplet_estadosdinamicos) GetSimpleObject());
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
               dt.Columns.Add(new DataColumn("ted_ccodigo", typeof (string)));               
							 dt.Columns.Add(new DataColumn("ted_cdescripcion", typeof (string)));               
							 dt.Columns.Add(new DataColumn("ted_ceventos", typeof (string)));               
							 dt.Columns.Add(new DataColumn("ted_ivalor", typeof (int)));               
							 dt.Columns.Add(new DataColumn("ted_iporusuario", typeof (int)));               
							 dt.Columns.Add(new DataColumn("ted_iactivo", typeof (int)));               
							 dt.Columns.Add(new DataColumn("ted_ieditable", typeof (int)));               
							 dt.Columns.Add(new DataColumn("ted_idcta", typeof (int)));               
							 										
               //create Row  
               dr = dt.NewRow();
               
               //set Row
							 dr["Id"] = base.Id;

							 dr["Name"] = base.Name;
dr["ted_ccodigo"] = this._ted_ccodigo;
dr["ted_cdescripcion"] = this._ted_cdescripcion;
dr["ted_ceventos"] = this._ted_ceventos;
dr["ted_ivalor"] = this._ted_ivalor;
dr["ted_iporusuario"] = this._ted_iporusuario;
dr["ted_iactivo"] = this._ted_iactivo;
dr["ted_ieditable"] = this._ted_ieditable;
dr["ted_idcta"] = this._ted_idcta;
							 
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
