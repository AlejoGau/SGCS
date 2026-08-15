
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
    public class Callerp_controlAcceso_IO : CallerObject
    { 	
				     private int _cac_tipoacceso;
					
				     private int _cac_idpuerta;
					
				     private DateTime? _cac_fecha;
					
				     private int _cac_idautorizado;
					
				     private int _cac_autorizatipo;
					
				     private int _cac_autorizaid;
					
				     private string _cac_autorizacodigo;
					
				     private string _cac_cobservacion;
					
				     private int _cac_autorizadotipoid;
				 ///<summary>
     ///cac_tipoacceso property   
     ///</summary>   
     public int cac_tipoacceso 
		 { 
		        
                    get{ return this._cac_tipoacceso; }
        						set{ this._cac_tipoacceso = value; } 										
	   }
	  ///<summary>
     ///cac_idpuerta property   
     ///</summary>   
     public int cac_idpuerta 
		 { 
		        
                    get{ return this._cac_idpuerta; }
        						set{ this._cac_idpuerta = value; } 										
	   }
	  ///<summary>
     ///cac_fecha property   
     ///</summary>   
     public DateTime? cac_fecha 
		 { 
		        
                    get{ return this._cac_fecha; }
        						set{ this._cac_fecha = value; } 										
	   }
	  ///<summary>
     ///cac_idautorizado property   
     ///</summary>   
     public int cac_idautorizado 
		 { 
		        
                    get{ return this._cac_idautorizado; }
        						set{ this._cac_idautorizado = value; } 										
	   }
	  ///<summary>
     ///cac_autorizatipo property   
     ///</summary>   
     public int cac_autorizatipo 
		 { 
		        
                    get{ return this._cac_autorizatipo; }
        						set{ this._cac_autorizatipo = value; } 										
	   }
	  ///<summary>
     ///cac_autorizaid property   
     ///</summary>   
     public int cac_autorizaid 
		 { 
		        
                    get{ return this._cac_autorizaid; }
        						set{ this._cac_autorizaid = value; } 										
	   }
	  ///<summary>
     ///cac_autorizacodigo property   
     ///</summary>   
     public string cac_autorizacodigo 
		 { 
		        
                    get{ return this._cac_autorizacodigo; }
        						set{ this._cac_autorizacodigo = value; } 										
	   }
	  ///<summary>
     ///cac_cobservacion property   
     ///</summary>   
     public string cac_cobservacion 
		 { 
		        
                    get{ return this._cac_cobservacion; }
        						set{ this._cac_cobservacion = value; } 										
	   }
	  ///<summary>
     ///cac_autorizadotipoid property   
     ///</summary>   
     public int cac_autorizadotipoid 
		 { 
		        
                    get{ return this._cac_autorizadotipoid; }
        						set{ this._cac_autorizadotipoid = value; } 										
	   }
	  ///<summary>
     ///Constructor   
     ///</summary>
        public Callerp_controlAcceso_IO() : base()
        {
            InitClass();
        }  
 ///<summary>
     ///Constructor   
     ///</summary>		
        public Callerp_controlAcceso_IO(int Id, string Name, int cac_tipoacceso, int cac_idpuerta, DateTime? cac_fecha, int cac_idautorizado, int cac_autorizatipo, int cac_autorizaid, string cac_autorizacodigo, string cac_cobservacion, int cac_autorizadotipoid) : base()
        {
            base.Id = Id;
						base.Name = Name;				 																																					 
				    this._cac_tipoacceso = cac_tipoacceso;
this._cac_idpuerta = cac_idpuerta;
this._cac_fecha = cac_fecha;
this._cac_idautorizado = cac_idautorizado;
this._cac_autorizatipo = cac_autorizatipo;
this._cac_autorizaid = cac_autorizaid;
this._cac_autorizacodigo = cac_autorizacodigo;
this._cac_cobservacion = cac_cobservacion;
this._cac_autorizadotipoid = cac_autorizadotipoid;

            InitClass();
        }  								

				private void InitClass()
        {														
  				  base.Type = new ObjectType(3208, "p_controlAcceso_IO");
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
			Simplep_controlAcceso_IO Simple = new Simplep_controlAcceso_IO();
			Simple.Id = base.Id;
			Simple.Name = base.Name;
			Simple.cac_tipoacceso = this._cac_tipoacceso;
Simple.cac_idpuerta = this._cac_idpuerta;
Simple.cac_fecha = this._cac_fecha;
Simple.cac_idautorizado = this._cac_idautorizado;
Simple.cac_autorizatipo = this._cac_autorizatipo;
Simple.cac_autorizaid = this._cac_autorizaid;
Simple.cac_autorizacodigo = this._cac_autorizacodigo;
Simple.cac_cobservacion = this._cac_cobservacion;
Simple.cac_autorizadotipoid = this._cac_autorizadotipoid;

			return (SimpleBaseObject) Simple;
		}
 ///<summary>
     ///Sets a simpleobject   
     ///</summary>	
		public void SetSimpleObject(Simplep_controlAcceso_IO Simple)
		{
			base.Id = Simple.Id;
			base.Name = Simple.Name;
			this._cac_tipoacceso = Simple.cac_tipoacceso;
this._cac_idpuerta = Simple.cac_idpuerta;
this._cac_fecha = Simple.cac_fecha;
this._cac_idautorizado = Simple.cac_idautorizado;
this._cac_autorizatipo = Simple.cac_autorizatipo;
this._cac_autorizaid = Simple.cac_autorizaid;
this._cac_autorizacodigo = Simple.cac_autorizacodigo;
this._cac_cobservacion = Simple.cac_cobservacion;
this._cac_autorizadotipoid = Simple.cac_autorizadotipoid;

		}
 ///<summary>
     ///Gets a baseobject   
     ///</summary>
		public override BaseObject GetBaseObject(SqlHelper SqlConfig, int UserId)
		{
			return new Dalp_controlAcceso_IO(SqlConfig, UserId, (Simplep_controlAcceso_IO) GetSimpleObject());
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
               dt.Columns.Add(new DataColumn("cac_tipoacceso", typeof (int)));               
							 dt.Columns.Add(new DataColumn("cac_idpuerta", typeof (int)));               
							 dt.Columns.Add(new DataColumn("cac_fecha", typeof (DateTime)));               
							 dt.Columns.Add(new DataColumn("cac_idautorizado", typeof (int)));               
							 dt.Columns.Add(new DataColumn("cac_autorizatipo", typeof (int)));               
							 dt.Columns.Add(new DataColumn("cac_autorizaid", typeof (int)));               
							 dt.Columns.Add(new DataColumn("cac_autorizacodigo", typeof (string)));               
							 dt.Columns.Add(new DataColumn("cac_cobservacion", typeof (string)));               
							 dt.Columns.Add(new DataColumn("cac_autorizadotipoid", typeof (int)));               
							 										
               //create Row  
               dr = dt.NewRow();
               
               //set Row
							 dr["Id"] = base.Id;

							 dr["Name"] = base.Name;
dr["cac_tipoacceso"] = this._cac_tipoacceso;
dr["cac_idpuerta"] = this._cac_idpuerta;
dr["cac_fecha"] = this._cac_fecha;
dr["cac_idautorizado"] = this._cac_idautorizado;
dr["cac_autorizatipo"] = this._cac_autorizatipo;
dr["cac_autorizaid"] = this._cac_autorizaid;
dr["cac_autorizacodigo"] = this._cac_autorizacodigo;
dr["cac_cobservacion"] = this._cac_cobservacion;
dr["cac_autorizadotipoid"] = this._cac_autorizadotipoid;
							 
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
