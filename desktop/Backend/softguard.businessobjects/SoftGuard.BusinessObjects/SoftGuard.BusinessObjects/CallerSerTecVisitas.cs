
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
    public class CallerSerTecVisitas : CallerObject
    { 	
				     private DateTime? _svi_tFechaHora;
					
				     private int _svi_iEstado;
					
				     private int _svi_iServicio;
					
				     private int _svi_iFormaDeViaje;
					
				     private string _svi_cObservacion;
					
				     private DateTime? _svi_tSalidaHaciaCliente;
					
				     private DateTime? _svi_tArriboAlCliente;
					
				     private DateTime? _svi_tSalidaDelCliente;
					
				     private int _svi_iusuarioDss;
					
				     private string _svi_cHorasPlanificadas;
				 ///<summary>
     ///svi_tFechaHora property   
     ///</summary>   
     public DateTime? svi_tFechaHora 
		 { 
		        
                    get{ return this._svi_tFechaHora; }
        						set{ this._svi_tFechaHora = value; } 										
	   }
	  ///<summary>
     ///svi_iEstado property   
     ///</summary>   
     public int svi_iEstado 
		 { 
		        
                    get{ return this._svi_iEstado; }
        						set{ this._svi_iEstado = value; } 										
	   }
	  ///<summary>
     ///svi_iServicio property   
     ///</summary>   
     public int svi_iServicio 
		 { 
		        
                    get{ return this._svi_iServicio; }
        						set{ this._svi_iServicio = value; } 										
	   }
	  ///<summary>
     ///svi_iFormaDeViaje property   
     ///</summary>   
     public int svi_iFormaDeViaje 
		 { 
		        
                    get{ return this._svi_iFormaDeViaje; }
        						set{ this._svi_iFormaDeViaje = value; } 										
	   }
	  ///<summary>
     ///svi_cObservacion property   
     ///</summary>   
     public string svi_cObservacion 
		 { 
		        
                    get{ return this._svi_cObservacion; }
        						set{ this._svi_cObservacion = value; } 										
	   }
	  ///<summary>
     ///svi_tSalidaHaciaCliente property   
     ///</summary>   
     public DateTime? svi_tSalidaHaciaCliente 
		 { 
		        
                    get{ return this._svi_tSalidaHaciaCliente; }
        						set{ this._svi_tSalidaHaciaCliente = value; } 										
	   }
	  ///<summary>
     ///svi_tArriboAlCliente property   
     ///</summary>   
     public DateTime? svi_tArriboAlCliente 
		 { 
		        
                    get{ return this._svi_tArriboAlCliente; }
        						set{ this._svi_tArriboAlCliente = value; } 										
	   }
	  ///<summary>
     ///svi_tSalidaDelCliente property   
     ///</summary>   
     public DateTime? svi_tSalidaDelCliente 
		 { 
		        
                    get{ return this._svi_tSalidaDelCliente; }
        						set{ this._svi_tSalidaDelCliente = value; } 										
	   }
	  ///<summary>
     ///svi_iusuarioDss property   
     ///</summary>   
     public int svi_iusuarioDss 
		 { 
		        
                    get{ return this._svi_iusuarioDss; }
        						set{ this._svi_iusuarioDss = value; } 										
	   }
	  ///<summary>
     ///svi_cHorasPlanificadas property   
     ///</summary>   
     public string svi_cHorasPlanificadas 
		 { 
		        
                    get{ return this._svi_cHorasPlanificadas; }
        						set{ this._svi_cHorasPlanificadas = value; } 										
	   }
	  ///<summary>
     ///Constructor   
     ///</summary>
        public CallerSerTecVisitas() : base()
        {
            InitClass();
        }  
 ///<summary>
     ///Constructor   
     ///</summary>		
        public CallerSerTecVisitas(int Id, string Name, DateTime? svi_tFechaHora, int svi_iEstado, int svi_iServicio, int svi_iFormaDeViaje, string svi_cObservacion, DateTime? svi_tSalidaHaciaCliente, DateTime? svi_tArriboAlCliente, DateTime? svi_tSalidaDelCliente, int svi_iusuarioDss, string svi_cHorasPlanificadas) : base()
        {
            base.Id = Id;
						base.Name = Name;				 																																					 
				    this._svi_tFechaHora = svi_tFechaHora;
this._svi_iEstado = svi_iEstado;
this._svi_iServicio = svi_iServicio;
this._svi_iFormaDeViaje = svi_iFormaDeViaje;
this._svi_cObservacion = svi_cObservacion;
this._svi_tSalidaHaciaCliente = svi_tSalidaHaciaCliente;
this._svi_tArriboAlCliente = svi_tArriboAlCliente;
this._svi_tSalidaDelCliente = svi_tSalidaDelCliente;
this._svi_iusuarioDss = svi_iusuarioDss;
this._svi_cHorasPlanificadas = svi_cHorasPlanificadas;

            InitClass();
        }  								

				private void InitClass()
        {														
  				  base.Type = new ObjectType(3121, "SerTecVisitas");
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
			SimpleSerTecVisitas Simple = new SimpleSerTecVisitas();
			Simple.Id = base.Id;
			Simple.Name = base.Name;
			Simple.svi_tFechaHora = this._svi_tFechaHora;
Simple.svi_iEstado = this._svi_iEstado;
Simple.svi_iServicio = this._svi_iServicio;
Simple.svi_iFormaDeViaje = this._svi_iFormaDeViaje;
Simple.svi_cObservacion = this._svi_cObservacion;
Simple.svi_tSalidaHaciaCliente = this._svi_tSalidaHaciaCliente;
Simple.svi_tArriboAlCliente = this._svi_tArriboAlCliente;
Simple.svi_tSalidaDelCliente = this._svi_tSalidaDelCliente;
Simple.svi_iusuarioDss = this._svi_iusuarioDss;
Simple.svi_cHorasPlanificadas = this._svi_cHorasPlanificadas;

			return (SimpleBaseObject) Simple;
		}
 ///<summary>
     ///Sets a simpleobject   
     ///</summary>	
		public void SetSimpleObject(SimpleSerTecVisitas Simple)
		{
			base.Id = Simple.Id;
			base.Name = Simple.Name;
			this._svi_tFechaHora = Simple.svi_tFechaHora;
this._svi_iEstado = Simple.svi_iEstado;
this._svi_iServicio = Simple.svi_iServicio;
this._svi_iFormaDeViaje = Simple.svi_iFormaDeViaje;
this._svi_cObservacion = Simple.svi_cObservacion;
this._svi_tSalidaHaciaCliente = Simple.svi_tSalidaHaciaCliente;
this._svi_tArriboAlCliente = Simple.svi_tArriboAlCliente;
this._svi_tSalidaDelCliente = Simple.svi_tSalidaDelCliente;
this._svi_iusuarioDss = Simple.svi_iusuarioDss;
this._svi_cHorasPlanificadas = Simple.svi_cHorasPlanificadas;

		}
 ///<summary>
     ///Gets a baseobject   
     ///</summary>
		public override BaseObject GetBaseObject(SqlHelper SqlConfig, int UserId)
		{
			return new DalSerTecVisitas(SqlConfig, UserId, (SimpleSerTecVisitas) GetSimpleObject());
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
               dt.Columns.Add(new DataColumn("svi_tFechaHora", typeof (DateTime)));               
							 dt.Columns.Add(new DataColumn("svi_iEstado", typeof (int)));               
							 dt.Columns.Add(new DataColumn("svi_iServicio", typeof (int)));               
							 dt.Columns.Add(new DataColumn("svi_iFormaDeViaje", typeof (int)));               
							 dt.Columns.Add(new DataColumn("svi_cObservacion", typeof (string)));               
							 dt.Columns.Add(new DataColumn("svi_tSalidaHaciaCliente", typeof (DateTime)));               
							 dt.Columns.Add(new DataColumn("svi_tArriboAlCliente", typeof (DateTime)));               
							 dt.Columns.Add(new DataColumn("svi_tSalidaDelCliente", typeof (DateTime)));               
							 dt.Columns.Add(new DataColumn("svi_iusuarioDss", typeof (int)));               
							 dt.Columns.Add(new DataColumn("svi_cHorasPlanificadas", typeof (string)));               
							 										
               //create Row  
               dr = dt.NewRow();
               
               //set Row
							 dr["Id"] = base.Id;

							 dr["Name"] = base.Name;
dr["svi_tFechaHora"] = this._svi_tFechaHora;
dr["svi_iEstado"] = this._svi_iEstado;
dr["svi_iServicio"] = this._svi_iServicio;
dr["svi_iFormaDeViaje"] = this._svi_iFormaDeViaje;
dr["svi_cObservacion"] = this._svi_cObservacion;
dr["svi_tSalidaHaciaCliente"] = this._svi_tSalidaHaciaCliente;
dr["svi_tArriboAlCliente"] = this._svi_tArriboAlCliente;
dr["svi_tSalidaDelCliente"] = this._svi_tSalidaDelCliente;
dr["svi_iusuarioDss"] = this._svi_iusuarioDss;
dr["svi_cHorasPlanificadas"] = this._svi_cHorasPlanificadas;
							 
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
