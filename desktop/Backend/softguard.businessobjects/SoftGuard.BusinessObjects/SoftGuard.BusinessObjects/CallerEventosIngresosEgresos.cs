
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
    public class CallerEventosIngresosEgresos : CallerObject
    { 	
				     private int _eie_iRecId;
					
				     private int _eie_iCuentaId;
					
				     private DateTime? _eie_tFechaHora;
					
				     private string _eie_cMatricula;
					
				     private string _eie_cUnidadFuncional;
					
				     private string _eie_cVecino;
					
				     private string _eie_cTransito;
					
				     private string _eie_cUsuario;
				 ///<summary>
     ///eie_iRecId property   
     ///</summary>   
     public int eie_iRecId 
		 { 
		        
                    get{ return this._eie_iRecId; }
        						set{ this._eie_iRecId = value; } 										
	   }
	  ///<summary>
     ///eie_iCuentaId property   
     ///</summary>   
     public int eie_iCuentaId 
		 { 
		        
                    get{ return this._eie_iCuentaId; }
        						set{ this._eie_iCuentaId = value; } 										
	   }
	  ///<summary>
     ///eie_tFechaHora property   
     ///</summary>   
     public DateTime? eie_tFechaHora 
		 { 
		        
                    get{ return this._eie_tFechaHora; }
        						set{ this._eie_tFechaHora = value; } 										
	   }
	  ///<summary>
     ///eie_cMatricula property   
     ///</summary>   
     public string eie_cMatricula 
		 { 
		        
                    get{ return this._eie_cMatricula; }
        						set{ this._eie_cMatricula = value; } 										
	   }
	  ///<summary>
     ///eie_cUnidadFuncional property   
     ///</summary>   
     public string eie_cUnidadFuncional 
		 { 
		        
                    get{ return this._eie_cUnidadFuncional; }
        						set{ this._eie_cUnidadFuncional = value; } 										
	   }
	  ///<summary>
     ///eie_cVecino property   
     ///</summary>   
     public string eie_cVecino 
		 { 
		        
                    get{ return this._eie_cVecino; }
        						set{ this._eie_cVecino = value; } 										
	   }
	  ///<summary>
     ///eie_cTransito property   
     ///</summary>   
     public string eie_cTransito 
		 { 
		        
                    get{ return this._eie_cTransito; }
        						set{ this._eie_cTransito = value; } 										
	   }
	  ///<summary>
     ///eie_cUsuario property   
     ///</summary>   
     public string eie_cUsuario 
		 { 
		        
                    get{ return this._eie_cUsuario; }
        						set{ this._eie_cUsuario = value; } 										
	   }
	  ///<summary>
     ///Constructor   
     ///</summary>
        public CallerEventosIngresosEgresos() : base()
        {
            InitClass();
        }  
 ///<summary>
     ///Constructor   
     ///</summary>		
        public CallerEventosIngresosEgresos(int Id, string Name, int eie_iRecId, int eie_iCuentaId, DateTime? eie_tFechaHora, string eie_cMatricula, string eie_cUnidadFuncional, string eie_cVecino, string eie_cTransito, string eie_cUsuario) : base()
        {
            base.Id = Id;
						base.Name = Name;				 																																					 
				    this._eie_iRecId = eie_iRecId;
this._eie_iCuentaId = eie_iCuentaId;
this._eie_tFechaHora = eie_tFechaHora;
this._eie_cMatricula = eie_cMatricula;
this._eie_cUnidadFuncional = eie_cUnidadFuncional;
this._eie_cVecino = eie_cVecino;
this._eie_cTransito = eie_cTransito;
this._eie_cUsuario = eie_cUsuario;

            InitClass();
        }  								

				private void InitClass()
        {														
  				  base.Type = new ObjectType(7035, "EventosIngresosEgresos");
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
			SimpleEventosIngresosEgresos Simple = new SimpleEventosIngresosEgresos();
			Simple.Id = base.Id;
			Simple.Name = base.Name;
			Simple.eie_iRecId = this._eie_iRecId;
Simple.eie_iCuentaId = this._eie_iCuentaId;
Simple.eie_tFechaHora = this._eie_tFechaHora;
Simple.eie_cMatricula = this._eie_cMatricula;
Simple.eie_cUnidadFuncional = this._eie_cUnidadFuncional;
Simple.eie_cVecino = this._eie_cVecino;
Simple.eie_cTransito = this._eie_cTransito;
Simple.eie_cUsuario = this._eie_cUsuario;

			return (SimpleBaseObject) Simple;
		}
 ///<summary>
     ///Sets a simpleobject   
     ///</summary>	
		public void SetSimpleObject(SimpleEventosIngresosEgresos Simple)
		{
			base.Id = Simple.Id;
			base.Name = Simple.Name;
			this._eie_iRecId = Simple.eie_iRecId;
this._eie_iCuentaId = Simple.eie_iCuentaId;
this._eie_tFechaHora = Simple.eie_tFechaHora;
this._eie_cMatricula = Simple.eie_cMatricula;
this._eie_cUnidadFuncional = Simple.eie_cUnidadFuncional;
this._eie_cVecino = Simple.eie_cVecino;
this._eie_cTransito = Simple.eie_cTransito;
this._eie_cUsuario = Simple.eie_cUsuario;

		}
 ///<summary>
     ///Gets a baseobject   
     ///</summary>
		public override BaseObject GetBaseObject(SqlHelper SqlConfig, int UserId)
		{
			return new DalEventosIngresosEgresos(SqlConfig, UserId, (SimpleEventosIngresosEgresos) GetSimpleObject());
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
               dt.Columns.Add(new DataColumn("eie_iRecId", typeof (int)));               
							 dt.Columns.Add(new DataColumn("eie_iCuentaId", typeof (int)));               
							 dt.Columns.Add(new DataColumn("eie_tFechaHora", typeof (DateTime)));               
							 dt.Columns.Add(new DataColumn("eie_cMatricula", typeof (string)));               
							 dt.Columns.Add(new DataColumn("eie_cUnidadFuncional", typeof (string)));               
							 dt.Columns.Add(new DataColumn("eie_cVecino", typeof (string)));               
							 dt.Columns.Add(new DataColumn("eie_cTransito", typeof (string)));               
							 dt.Columns.Add(new DataColumn("eie_cUsuario", typeof (string)));               
							 										
               //create Row  
               dr = dt.NewRow();
               
               //set Row
							 dr["Id"] = base.Id;

							 dr["Name"] = base.Name;
dr["eie_iRecId"] = this._eie_iRecId;
dr["eie_iCuentaId"] = this._eie_iCuentaId;
dr["eie_tFechaHora"] = this._eie_tFechaHora;
dr["eie_cMatricula"] = this._eie_cMatricula;
dr["eie_cUnidadFuncional"] = this._eie_cUnidadFuncional;
dr["eie_cVecino"] = this._eie_cVecino;
dr["eie_cTransito"] = this._eie_cTransito;
dr["eie_cUsuario"] = this._eie_cUsuario;
							 
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
