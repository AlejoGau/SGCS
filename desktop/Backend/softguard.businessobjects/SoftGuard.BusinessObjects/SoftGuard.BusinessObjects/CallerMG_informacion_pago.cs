
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
    public class CallerMG_informacion_pago : CallerObject
    { 	
				     private int _mip_fpgidkey;
					
				     private int _mip_idcliente;
					
				     private string _mip_codigo;
					
				     private DateTime? _mip_fechadesde;
					
				     private DateTime? _mip_fechahasta;
					
				     private int _mip_emisor;
					
				     private string _mip_clave;
					
				     private string _mip_nombreusuario;
				 ///<summary>
     ///mip_fpgidkey property   
     ///</summary>   
     public int mip_fpgidkey 
		 { 
		        
                    get{ return this._mip_fpgidkey; }
        						set{ this._mip_fpgidkey = value; } 										
	   }
	  ///<summary>
     ///mip_idcliente property   
     ///</summary>   
     public int mip_idcliente 
		 { 
		        
                    get{ return this._mip_idcliente; }
        						set{ this._mip_idcliente = value; } 										
	   }
	  ///<summary>
     ///mip_codigo property   
     ///</summary>   
     public string mip_codigo 
		 { 
		        
                    get{ return this._mip_codigo; }
        						set{ this._mip_codigo = value; } 										
	   }
	  ///<summary>
     ///mip_fechadesde property   
     ///</summary>   
     public DateTime? mip_fechadesde 
		 { 
		        
                    get{ return this._mip_fechadesde; }
        						set{ this._mip_fechadesde = value; } 										
	   }
	  ///<summary>
     ///mip_fechahasta property   
     ///</summary>   
     public DateTime? mip_fechahasta 
		 { 
		        
                    get{ return this._mip_fechahasta; }
        						set{ this._mip_fechahasta = value; } 										
	   }
	  ///<summary>
     ///mip_emisor property   
     ///</summary>   
     public int mip_emisor 
		 { 
		        
                    get{ return this._mip_emisor; }
        						set{ this._mip_emisor = value; } 										
	   }
	  ///<summary>
     ///mip_clave property   
     ///</summary>   
     public string mip_clave 
		 { 
		        
                    get{ return this._mip_clave; }
        						set{ this._mip_clave = value; } 										
	   }
	  ///<summary>
     ///mip_nombreusuario property   
     ///</summary>   
     public string mip_nombreusuario 
		 { 
		        
                    get{ return this._mip_nombreusuario; }
        						set{ this._mip_nombreusuario = value; } 										
	   }
	  ///<summary>
     ///Constructor   
     ///</summary>
        public CallerMG_informacion_pago() : base()
        {
            InitClass();
        }  
 ///<summary>
     ///Constructor   
     ///</summary>		
        public CallerMG_informacion_pago(int Id, string Name, int mip_fpgidkey, int mip_idcliente, string mip_codigo, DateTime? mip_fechadesde, DateTime? mip_fechahasta, int mip_emisor, string mip_clave, string mip_nombreusuario) : base()
        {
            base.Id = Id;
						base.Name = Name;				 																																					 

				    this._mip_fpgidkey = mip_fpgidkey;
this._mip_idcliente = mip_idcliente;
this._mip_codigo = mip_codigo;
this._mip_fechadesde = mip_fechadesde;
this._mip_fechahasta = mip_fechahasta;
this._mip_emisor = mip_emisor;
this._mip_clave = mip_clave;
this._mip_nombreusuario = mip_nombreusuario;


            InitClass();
        }  								

				private void InitClass()
        {														
  				  base.Type = new ObjectType(3221, "MG_informacion_pago");
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
			SimpleMG_informacion_pago Simple = new SimpleMG_informacion_pago();
			Simple.Id = base.Id;
			Simple.Name = base.Name;

			Simple.mip_fpgidkey = this._mip_fpgidkey;
Simple.mip_idcliente = this._mip_idcliente;
Simple.mip_codigo = this._mip_codigo;
Simple.mip_fechadesde = this._mip_fechadesde;
Simple.mip_fechahasta = this._mip_fechahasta;
Simple.mip_emisor = this._mip_emisor;
Simple.mip_clave = this._mip_clave;
Simple.mip_nombreusuario = this._mip_nombreusuario;


			return (SimpleBaseObject) Simple;
		}
 ///<summary>
     ///Sets a simpleobject   
     ///</summary>	
		public void SetSimpleObject(SimpleMG_informacion_pago Simple)
		{
			base.Id = Simple.Id;
			base.Name = Simple.Name;

			this._mip_fpgidkey = Simple.mip_fpgidkey;
this._mip_idcliente = Simple.mip_idcliente;
this._mip_codigo = Simple.mip_codigo;
this._mip_fechadesde = Simple.mip_fechadesde;
this._mip_fechahasta = Simple.mip_fechahasta;
this._mip_emisor = Simple.mip_emisor;
this._mip_clave = Simple.mip_clave;
this._mip_nombreusuario = Simple.mip_nombreusuario;


		}
 ///<summary>
     ///Gets a baseobject   
     ///</summary>
		public override BaseObject GetBaseObject(SqlHelper SqlConfig, int UserId)
		{
			return new DalMG_informacion_pago(SqlConfig, UserId, (SimpleMG_informacion_pago) GetSimpleObject());
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
               dt.Columns.Add(new DataColumn("mip_fpgidkey", typeof (int)));               
							 dt.Columns.Add(new DataColumn("mip_idcliente", typeof (int)));               
							 dt.Columns.Add(new DataColumn("mip_codigo", typeof (string)));               
							 dt.Columns.Add(new DataColumn("mip_fechadesde", typeof (DateTime)));               
							 dt.Columns.Add(new DataColumn("mip_fechahasta", typeof (DateTime)));               
							 dt.Columns.Add(new DataColumn("mip_emisor", typeof (int)));               
							 dt.Columns.Add(new DataColumn("mip_clave", typeof (string)));               
							 dt.Columns.Add(new DataColumn("mip_nombreusuario", typeof (string)));               
							 										
               //create Row  
               dr = dt.NewRow();
               
               //set Row

							 dr["Id"] = base.Id;

							 dr["Name"] = base.Name;
dr["mip_fpgidkey"] = this._mip_fpgidkey;
dr["mip_idcliente"] = this._mip_idcliente;
dr["mip_codigo"] = this._mip_codigo;
dr["mip_fechadesde"] = this._mip_fechadesde;
dr["mip_fechahasta"] = this._mip_fechahasta;
dr["mip_emisor"] = this._mip_emisor;
dr["mip_clave"] = this._mip_clave;
dr["mip_nombreusuario"] = this._mip_nombreusuario;

							 
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
