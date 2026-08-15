
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
    public class Callerp_objetos_modificaciones : CallerObject
    { 	
				     private int _pom_usuariopedido;
					
				     private DateTime? _pom_fechapedido;
					
				     private int _pom_idtipoobjeto;
					
				     private int _pom_idobjeto;
					
				     private int _pom_cueiid;
					
				     private string _pom_sinmodificar;
					
				     private string _pom_modificado;
					
				     private string _pom_metadata;
					
				     private int _pom_estado;
					
				     private string _pom_log;
					
				     private int _pom_usuarioultcambio;
					
				     private DateTime? _pom_fechaultcambio;
				 ///<summary>
     ///pom_usuariopedido property   
     ///</summary>   
     public int pom_usuariopedido 
		 { 
		        
                    get{ return this._pom_usuariopedido; }
        						set{ this._pom_usuariopedido = value; } 										
	   }
	  ///<summary>
     ///pom_fechapedido property   
     ///</summary>   
     public DateTime? pom_fechapedido 
		 { 
		        
                    get{ return this._pom_fechapedido; }
        						set{ this._pom_fechapedido = value; } 										
	   }
	  ///<summary>
     ///pom_idtipoobjeto property   
     ///</summary>   
     public int pom_idtipoobjeto 
		 { 
		        
                    get{ return this._pom_idtipoobjeto; }
        						set{ this._pom_idtipoobjeto = value; } 										
	   }
	  ///<summary>
     ///pom_idobjeto property   
     ///</summary>   
     public int pom_idobjeto 
		 { 
		        
                    get{ return this._pom_idobjeto; }
        						set{ this._pom_idobjeto = value; } 										
	   }
	  ///<summary>
     ///pom_cueiid property   
     ///</summary>   
     public int pom_cueiid 
		 { 
		        
                    get{ return this._pom_cueiid; }
        						set{ this._pom_cueiid = value; } 										
	   }
	  ///<summary>
     ///pom_sinmodificar property   
     ///</summary>   
     public string pom_sinmodificar 
		 { 
		        
                    get{ return this._pom_sinmodificar; }
        						set{ this._pom_sinmodificar = value; } 										
	   }
	  ///<summary>
     ///pom_modificado property   
     ///</summary>   
     public string pom_modificado 
		 { 
		        
                    get{ return this._pom_modificado; }
        						set{ this._pom_modificado = value; } 										
	   }
	  ///<summary>
     ///pom_metadata property   
     ///</summary>   
     public string pom_metadata 
		 { 
		        
                    get{ return this._pom_metadata; }
        						set{ this._pom_metadata = value; } 										
	   }
	  ///<summary>
     ///pom_estado property   
     ///</summary>   
     public int pom_estado 
		 { 
		        
                    get{ return this._pom_estado; }
        						set{ this._pom_estado = value; } 										
	   }
	  ///<summary>
     ///pom_log property   
     ///</summary>   
     public string pom_log 
		 { 
		        
                    get{ return this._pom_log; }
        						set{ this._pom_log = value; } 										
	   }
	  ///<summary>
     ///pom_usuarioultcambio property   
     ///</summary>   
     public int pom_usuarioultcambio 
		 { 
		        
                    get{ return this._pom_usuarioultcambio; }
        						set{ this._pom_usuarioultcambio = value; } 										
	   }
	  ///<summary>
     ///pom_fechaultcambio property   
     ///</summary>   
     public DateTime? pom_fechaultcambio 
		 { 
		        
                    get{ return this._pom_fechaultcambio; }
        						set{ this._pom_fechaultcambio = value; } 										
	   }
	  ///<summary>
     ///Constructor   
     ///</summary>
        public Callerp_objetos_modificaciones() : base()
        {
            InitClass();
        }  
 ///<summary>
     ///Constructor   
     ///</summary>		
        public Callerp_objetos_modificaciones(int Id, string Name, int pom_usuariopedido, DateTime? pom_fechapedido, int pom_idtipoobjeto, int pom_idobjeto, int pom_cueiid, string pom_sinmodificar, string pom_modificado, string pom_metadata, int pom_estado, string pom_log, int pom_usuarioultcambio, DateTime? pom_fechaultcambio) : base()
        {
            base.Id = Id;
						base.Name = Name;				 																																					 
				    this._pom_usuariopedido = pom_usuariopedido;
this._pom_fechapedido = pom_fechapedido;
this._pom_idtipoobjeto = pom_idtipoobjeto;
this._pom_idobjeto = pom_idobjeto;
this._pom_cueiid = pom_cueiid;
this._pom_sinmodificar = pom_sinmodificar;
this._pom_modificado = pom_modificado;
this._pom_metadata = pom_metadata;
this._pom_estado = pom_estado;
this._pom_log = pom_log;
this._pom_usuarioultcambio = pom_usuarioultcambio;
this._pom_fechaultcambio = pom_fechaultcambio;

            InitClass();
        }  								

				private void InitClass()
        {														
  				  base.Type = new ObjectType(3180, "p_objetos_modificaciones");
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
			Simplep_objetos_modificaciones Simple = new Simplep_objetos_modificaciones();
			Simple.Id = base.Id;
			Simple.Name = base.Name;
			Simple.pom_usuariopedido = this._pom_usuariopedido;
Simple.pom_fechapedido = this._pom_fechapedido;
Simple.pom_idtipoobjeto = this._pom_idtipoobjeto;
Simple.pom_idobjeto = this._pom_idobjeto;
Simple.pom_cueiid = this._pom_cueiid;
Simple.pom_sinmodificar = this._pom_sinmodificar;
Simple.pom_modificado = this._pom_modificado;
Simple.pom_metadata = this._pom_metadata;
Simple.pom_estado = this._pom_estado;
Simple.pom_log = this._pom_log;
Simple.pom_usuarioultcambio = this._pom_usuarioultcambio;
Simple.pom_fechaultcambio = this._pom_fechaultcambio;

			return (SimpleBaseObject) Simple;
		}
 ///<summary>
     ///Sets a simpleobject   
     ///</summary>	
		public void SetSimpleObject(Simplep_objetos_modificaciones Simple)
		{
			base.Id = Simple.Id;
			base.Name = Simple.Name;
			this._pom_usuariopedido = Simple.pom_usuariopedido;
this._pom_fechapedido = Simple.pom_fechapedido;
this._pom_idtipoobjeto = Simple.pom_idtipoobjeto;
this._pom_idobjeto = Simple.pom_idobjeto;
this._pom_cueiid = Simple.pom_cueiid;
this._pom_sinmodificar = Simple.pom_sinmodificar;
this._pom_modificado = Simple.pom_modificado;
this._pom_metadata = Simple.pom_metadata;
this._pom_estado = Simple.pom_estado;
this._pom_log = Simple.pom_log;
this._pom_usuarioultcambio = Simple.pom_usuarioultcambio;
this._pom_fechaultcambio = Simple.pom_fechaultcambio;

		}
 ///<summary>
     ///Gets a baseobject   
     ///</summary>
		public override BaseObject GetBaseObject(SqlHelper SqlConfig, int UserId)
		{
			return new Dalp_objetos_modificaciones(SqlConfig, UserId, (Simplep_objetos_modificaciones) GetSimpleObject());
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
               dt.Columns.Add(new DataColumn("pom_usuariopedido", typeof (int)));               
							 dt.Columns.Add(new DataColumn("pom_fechapedido", typeof (DateTime)));               
							 dt.Columns.Add(new DataColumn("pom_idtipoobjeto", typeof (int)));               
							 dt.Columns.Add(new DataColumn("pom_idobjeto", typeof (int)));               
							 dt.Columns.Add(new DataColumn("pom_cueiid", typeof (int)));               
							 dt.Columns.Add(new DataColumn("pom_sinmodificar", typeof (string)));               
							 dt.Columns.Add(new DataColumn("pom_modificado", typeof (string)));               
							 dt.Columns.Add(new DataColumn("pom_metadata", typeof (string)));               
							 dt.Columns.Add(new DataColumn("pom_estado", typeof (int)));               
							 dt.Columns.Add(new DataColumn("pom_log", typeof (string)));               
							 dt.Columns.Add(new DataColumn("pom_usuarioultcambio", typeof (int)));               
							 dt.Columns.Add(new DataColumn("pom_fechaultcambio", typeof (DateTime)));               
							 										
               //create Row  
               dr = dt.NewRow();
               
               //set Row
							 dr["Id"] = base.Id;

							 dr["Name"] = base.Name;
dr["pom_usuariopedido"] = this._pom_usuariopedido;
dr["pom_fechapedido"] = this._pom_fechapedido;
dr["pom_idtipoobjeto"] = this._pom_idtipoobjeto;
dr["pom_idobjeto"] = this._pom_idobjeto;
dr["pom_cueiid"] = this._pom_cueiid;
dr["pom_sinmodificar"] = this._pom_sinmodificar;
dr["pom_modificado"] = this._pom_modificado;
dr["pom_metadata"] = this._pom_metadata;
dr["pom_estado"] = this._pom_estado;
dr["pom_log"] = this._pom_log;
dr["pom_usuarioultcambio"] = this._pom_usuarioultcambio;
dr["pom_fechaultcambio"] = this._pom_fechaultcambio;
							 
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
