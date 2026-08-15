
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
    public class Callerp_encuesta_pregunta_respuesta : CallerObject
    { 	
				     private int _epr_epgidkey;
					
				     private string _epr_cvalue;
					
				     private int _epr_ivalue;
					
				     private string _epr_cuser;
					
				     private string _epr_itipousuario;
					
				     private string _epr_cnombreusuario;
					
				     private string _epr_cnombrecuenta;
					
				     private int _epr_icuenta;
					
				     private string _epr_ctelefono;
				 ///<summary>
     ///epr_epgidkey property   
     ///</summary>   
     public int epr_epgidkey 
		 { 
		        
                    get{ return this._epr_epgidkey; }
        						set{ this._epr_epgidkey = value; } 										
	   }
	  ///<summary>
     ///epr_cvalue property   
     ///</summary>   
     public string epr_cvalue 
		 { 
		        
                    get{ return this._epr_cvalue; }
        						set{ this._epr_cvalue = value; } 										
	   }
	  ///<summary>
     ///epr_ivalue property   
     ///</summary>   
     public int epr_ivalue 
		 { 
		        
                    get{ return this._epr_ivalue; }
        						set{ this._epr_ivalue = value; } 										
	   }
	  ///<summary>
     ///epr_cuser property   
     ///</summary>   
     public string epr_cuser 
		 { 
		        
                    get{ return this._epr_cuser; }
        						set{ this._epr_cuser = value; } 										
	   }
	  ///<summary>
     ///epr_itipousuario property   
     ///</summary>   
     public string epr_itipousuario 
		 { 
		        
                    get{ return this._epr_itipousuario; }
        						set{ this._epr_itipousuario = value; } 										
	   }
	  ///<summary>
     ///epr_cnombreusuario property   
     ///</summary>   
     public string epr_cnombreusuario 
		 { 
		        
                    get{ return this._epr_cnombreusuario; }
        						set{ this._epr_cnombreusuario = value; } 										
	   }
	  ///<summary>
     ///epr_cnombrecuenta property   
     ///</summary>   
     public string epr_cnombrecuenta 
		 { 
		        
                    get{ return this._epr_cnombrecuenta; }
        						set{ this._epr_cnombrecuenta = value; } 										
	   }
	  ///<summary>
     ///epr_icuenta property   
     ///</summary>   
     public int epr_icuenta 
		 { 
		        
                    get{ return this._epr_icuenta; }
        						set{ this._epr_icuenta = value; } 										
	   }
	  ///<summary>
     ///epr_ctelefono property   
     ///</summary>   
     public string epr_ctelefono 
		 { 
		        
                    get{ return this._epr_ctelefono; }
        						set{ this._epr_ctelefono = value; } 										
	   }
	  ///<summary>
     ///Constructor   
     ///</summary>
        public Callerp_encuesta_pregunta_respuesta() : base()
        {
            InitClass();
        }  
 ///<summary>
     ///Constructor   
     ///</summary>		
        public Callerp_encuesta_pregunta_respuesta(int Id, string Name, int epr_epgidkey, string epr_cvalue, int epr_ivalue, string epr_cuser, string epr_itipousuario, string epr_cnombreusuario, string epr_cnombrecuenta, int epr_icuenta, string epr_ctelefono) : base()
        {
            base.Id = Id;
						base.Name = Name;				 																																					 
				    this._epr_epgidkey = epr_epgidkey;
this._epr_cvalue = epr_cvalue;
this._epr_ivalue = epr_ivalue;
this._epr_cuser = epr_cuser;
this._epr_itipousuario = epr_itipousuario;
this._epr_cnombreusuario = epr_cnombreusuario;
this._epr_cnombrecuenta = epr_cnombrecuenta;
this._epr_icuenta = epr_icuenta;
this._epr_ctelefono = epr_ctelefono;

            InitClass();
        }  								

				private void InitClass()
        {														
  				  base.Type = new ObjectType(3205, "p_encuesta_pregunta_respuesta");
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
			Simplep_encuesta_pregunta_respuesta Simple = new Simplep_encuesta_pregunta_respuesta();
			Simple.Id = base.Id;
			Simple.Name = base.Name;
			Simple.epr_epgidkey = this._epr_epgidkey;
Simple.epr_cvalue = this._epr_cvalue;
Simple.epr_ivalue = this._epr_ivalue;
Simple.epr_cuser = this._epr_cuser;
Simple.epr_itipousuario = this._epr_itipousuario;
Simple.epr_cnombreusuario = this._epr_cnombreusuario;
Simple.epr_cnombrecuenta = this._epr_cnombrecuenta;
Simple.epr_icuenta = this._epr_icuenta;
Simple.epr_ctelefono = this._epr_ctelefono;

			return (SimpleBaseObject) Simple;
		}
 ///<summary>
     ///Sets a simpleobject   
     ///</summary>	
		public void SetSimpleObject(Simplep_encuesta_pregunta_respuesta Simple)
		{
			base.Id = Simple.Id;
			base.Name = Simple.Name;
			this._epr_epgidkey = Simple.epr_epgidkey;
this._epr_cvalue = Simple.epr_cvalue;
this._epr_ivalue = Simple.epr_ivalue;
this._epr_cuser = Simple.epr_cuser;
this._epr_itipousuario = Simple.epr_itipousuario;
this._epr_cnombreusuario = Simple.epr_cnombreusuario;
this._epr_cnombrecuenta = Simple.epr_cnombrecuenta;
this._epr_icuenta = Simple.epr_icuenta;
this._epr_ctelefono = Simple.epr_ctelefono;

		}
 ///<summary>
     ///Gets a baseobject   
     ///</summary>
		public override BaseObject GetBaseObject(SqlHelper SqlConfig, int UserId)
		{
			return new Dalp_encuesta_pregunta_respuesta(SqlConfig, UserId, (Simplep_encuesta_pregunta_respuesta) GetSimpleObject());
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
               dt.Columns.Add(new DataColumn("epr_epgidkey", typeof (int)));               
							 dt.Columns.Add(new DataColumn("epr_cvalue", typeof (string)));               
							 dt.Columns.Add(new DataColumn("epr_ivalue", typeof (int)));               
							 dt.Columns.Add(new DataColumn("epr_cuser", typeof (string)));               
							 dt.Columns.Add(new DataColumn("epr_itipousuario", typeof (string)));               
							 dt.Columns.Add(new DataColumn("epr_cnombreusuario", typeof (string)));               
							 dt.Columns.Add(new DataColumn("epr_cnombrecuenta", typeof (string)));               
							 dt.Columns.Add(new DataColumn("epr_icuenta", typeof (int)));               
							 dt.Columns.Add(new DataColumn("epr_ctelefono", typeof (string)));               
							 										
               //create Row  
               dr = dt.NewRow();
               
               //set Row
							 dr["Id"] = base.Id;

							 dr["Name"] = base.Name;
dr["epr_epgidkey"] = this._epr_epgidkey;
dr["epr_cvalue"] = this._epr_cvalue;
dr["epr_ivalue"] = this._epr_ivalue;
dr["epr_cuser"] = this._epr_cuser;
dr["epr_itipousuario"] = this._epr_itipousuario;
dr["epr_cnombreusuario"] = this._epr_cnombreusuario;
dr["epr_cnombrecuenta"] = this._epr_cnombrecuenta;
dr["epr_icuenta"] = this._epr_icuenta;
dr["epr_ctelefono"] = this._epr_ctelefono;
							 
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
