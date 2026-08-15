
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
    public class CallerT_AccesosVehiculoProveedor : CallerObject
    { 	
				     private int _avp_iVehicleBrand;
					
				     private int _avp_iVehicleModel;
					
				     private string _avp_cMatricula;
					
				     private string _avp_cColor;
					
				     private int _avp_iYear;
					
				     private string _avp_cTipo;
					
				     private string _avp_cCiaSeguro;
					
				     private DateTime? _avp_tVtoSeguro;
					
				     private DateTime? _avp_tVtoVTV;
					
				     private string _avp_cIdentificacion;
					
				     private DateTime? _avp_tVtoIdentificacion;
					
				     private string _avp_cObservaciones;
					
				     private string _avp_cPathPicture;
				 ///<summary>
     ///avp_iVehicleBrand property   
     ///</summary>   
     public int avp_iVehicleBrand 
		 { 
		        
                    get{ return this._avp_iVehicleBrand; }
        						set{ this._avp_iVehicleBrand = value; } 										
	   }
	  ///<summary>
     ///avp_iVehicleModel property   
     ///</summary>   
     public int avp_iVehicleModel 
		 { 
		        
                    get{ return this._avp_iVehicleModel; }
        						set{ this._avp_iVehicleModel = value; } 										
	   }
	  ///<summary>
     ///avp_cMatricula property   
     ///</summary>   
     public string avp_cMatricula 
		 { 
		        
                    get{ return this._avp_cMatricula; }
        						set{ this._avp_cMatricula = value; } 										
	   }
	  ///<summary>
     ///avp_cColor property   
     ///</summary>   
     public string avp_cColor 
		 { 
		        
                    get{ return this._avp_cColor; }
        						set{ this._avp_cColor = value; } 										
	   }
	  ///<summary>
     ///avp_iYear property   
     ///</summary>   
     public int avp_iYear 
		 { 
		        
                    get{ return this._avp_iYear; }
        						set{ this._avp_iYear = value; } 										
	   }
	  ///<summary>
     ///avp_cTipo property   
     ///</summary>   
     public string avp_cTipo 
		 { 
		        
                    get{ return this._avp_cTipo; }
        						set{ this._avp_cTipo = value; } 										
	   }
	  ///<summary>
     ///avp_cCiaSeguro property   
     ///</summary>   
     public string avp_cCiaSeguro 
		 { 
		        
                    get{ return this._avp_cCiaSeguro; }
        						set{ this._avp_cCiaSeguro = value; } 										
	   }
	  ///<summary>
     ///avp_tVtoSeguro property   
     ///</summary>   
     public DateTime? avp_tVtoSeguro 
		 { 
		        
                    get{ return this._avp_tVtoSeguro; }
        						set{ this._avp_tVtoSeguro = value; } 										
	   }
	  ///<summary>
     ///avp_tVtoVTV property   
     ///</summary>   
     public DateTime? avp_tVtoVTV 
		 { 
		        
                    get{ return this._avp_tVtoVTV; }
        						set{ this._avp_tVtoVTV = value; } 										
	   }
	  ///<summary>
     ///avp_cIdentificacion property   
     ///</summary>   
     public string avp_cIdentificacion 
		 { 
		        
                    get{ return this._avp_cIdentificacion; }
        						set{ this._avp_cIdentificacion = value; } 										
	   }
	  ///<summary>
     ///avp_tVtoIdentificacion property   
     ///</summary>   
     public DateTime? avp_tVtoIdentificacion 
		 { 
		        
                    get{ return this._avp_tVtoIdentificacion; }
        						set{ this._avp_tVtoIdentificacion = value; } 										
	   }
	  ///<summary>
     ///avp_cObservaciones property   
     ///</summary>   
     public string avp_cObservaciones 
		 { 
		        
                    get{ return this._avp_cObservaciones; }
        						set{ this._avp_cObservaciones = value; } 										
	   }
	  ///<summary>
     ///avp_cPathPicture property   
     ///</summary>   
     public string avp_cPathPicture 
		 { 
		        
                    get{ return this._avp_cPathPicture; }
        						set{ this._avp_cPathPicture = value; } 										
	   }
	  ///<summary>
     ///Constructor   
     ///</summary>
        public CallerT_AccesosVehiculoProveedor() : base()
        {
            InitClass();
        }  
 ///<summary>
     ///Constructor   
     ///</summary>		
        public CallerT_AccesosVehiculoProveedor(int Id, string Name, int avp_iVehicleBrand, int avp_iVehicleModel, string avp_cMatricula, string avp_cColor, int avp_iYear, string avp_cTipo, string avp_cCiaSeguro, DateTime? avp_tVtoSeguro, DateTime? avp_tVtoVTV, string avp_cIdentificacion, DateTime? avp_tVtoIdentificacion, string avp_cObservaciones, string avp_cPathPicture) : base()
        {
            base.Id = Id;
						base.Name = Name;				 																																					 
				    this._avp_iVehicleBrand = avp_iVehicleBrand;
this._avp_iVehicleModel = avp_iVehicleModel;
this._avp_cMatricula = avp_cMatricula;
this._avp_cColor = avp_cColor;
this._avp_iYear = avp_iYear;
this._avp_cTipo = avp_cTipo;
this._avp_cCiaSeguro = avp_cCiaSeguro;
this._avp_tVtoSeguro = avp_tVtoSeguro;
this._avp_tVtoVTV = avp_tVtoVTV;
this._avp_cIdentificacion = avp_cIdentificacion;
this._avp_tVtoIdentificacion = avp_tVtoIdentificacion;
this._avp_cObservaciones = avp_cObservaciones;
this._avp_cPathPicture = avp_cPathPicture;

            InitClass();
        }  								

				private void InitClass()
        {														
  				  base.Type = new ObjectType(3232, "T_AccesosVehiculoProveedor");
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
			SimpleT_AccesosVehiculoProveedor Simple = new SimpleT_AccesosVehiculoProveedor();
			Simple.Id = base.Id;
			Simple.Name = base.Name;
			Simple.avp_iVehicleBrand = this._avp_iVehicleBrand;
Simple.avp_iVehicleModel = this._avp_iVehicleModel;
Simple.avp_cMatricula = this._avp_cMatricula;
Simple.avp_cColor = this._avp_cColor;
Simple.avp_iYear = this._avp_iYear;
Simple.avp_cTipo = this._avp_cTipo;
Simple.avp_cCiaSeguro = this._avp_cCiaSeguro;
Simple.avp_tVtoSeguro = this._avp_tVtoSeguro;
Simple.avp_tVtoVTV = this._avp_tVtoVTV;
Simple.avp_cIdentificacion = this._avp_cIdentificacion;
Simple.avp_tVtoIdentificacion = this._avp_tVtoIdentificacion;
Simple.avp_cObservaciones = this._avp_cObservaciones;
Simple.avp_cPathPicture = this._avp_cPathPicture;

			return (SimpleBaseObject) Simple;
		}
 ///<summary>
     ///Sets a simpleobject   
     ///</summary>	
		public void SetSimpleObject(SimpleT_AccesosVehiculoProveedor Simple)
		{
			base.Id = Simple.Id;
			base.Name = Simple.Name;
			this._avp_iVehicleBrand = Simple.avp_iVehicleBrand;
this._avp_iVehicleModel = Simple.avp_iVehicleModel;
this._avp_cMatricula = Simple.avp_cMatricula;
this._avp_cColor = Simple.avp_cColor;
this._avp_iYear = Simple.avp_iYear;
this._avp_cTipo = Simple.avp_cTipo;
this._avp_cCiaSeguro = Simple.avp_cCiaSeguro;
this._avp_tVtoSeguro = Simple.avp_tVtoSeguro;
this._avp_tVtoVTV = Simple.avp_tVtoVTV;
this._avp_cIdentificacion = Simple.avp_cIdentificacion;
this._avp_tVtoIdentificacion = Simple.avp_tVtoIdentificacion;
this._avp_cObservaciones = Simple.avp_cObservaciones;
this._avp_cPathPicture = Simple.avp_cPathPicture;

		}
 ///<summary>
     ///Gets a baseobject   
     ///</summary>
		public override BaseObject GetBaseObject(SqlHelper SqlConfig, int UserId)
		{
			return new DalT_AccesosVehiculoProveedor(SqlConfig, UserId, (SimpleT_AccesosVehiculoProveedor) GetSimpleObject());
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
               dt.Columns.Add(new DataColumn("avp_iVehicleBrand", typeof (int)));               
							 dt.Columns.Add(new DataColumn("avp_iVehicleModel", typeof (int)));               
							 dt.Columns.Add(new DataColumn("avp_cMatricula", typeof (string)));               
							 dt.Columns.Add(new DataColumn("avp_cColor", typeof (string)));               
							 dt.Columns.Add(new DataColumn("avp_iYear", typeof (int)));               
							 dt.Columns.Add(new DataColumn("avp_cTipo", typeof (string)));               
							 dt.Columns.Add(new DataColumn("avp_cCiaSeguro", typeof (string)));               
							 dt.Columns.Add(new DataColumn("avp_tVtoSeguro", typeof (DateTime)));               
							 dt.Columns.Add(new DataColumn("avp_tVtoVTV", typeof (DateTime)));               
							 dt.Columns.Add(new DataColumn("avp_cIdentificacion", typeof (string)));               
							 dt.Columns.Add(new DataColumn("avp_tVtoIdentificacion", typeof (DateTime)));               
							 dt.Columns.Add(new DataColumn("avp_cObservaciones", typeof (string)));               
							 dt.Columns.Add(new DataColumn("avp_cPathPicture", typeof (string)));               
							 										
               //create Row  
               dr = dt.NewRow();
               
               //set Row
							 dr["Id"] = base.Id;

							 dr["Name"] = base.Name;
dr["avp_iVehicleBrand"] = this._avp_iVehicleBrand;
dr["avp_iVehicleModel"] = this._avp_iVehicleModel;
dr["avp_cMatricula"] = this._avp_cMatricula;
dr["avp_cColor"] = this._avp_cColor;
dr["avp_iYear"] = this._avp_iYear;
dr["avp_cTipo"] = this._avp_cTipo;
dr["avp_cCiaSeguro"] = this._avp_cCiaSeguro;
dr["avp_tVtoSeguro"] = this._avp_tVtoSeguro;
dr["avp_tVtoVTV"] = this._avp_tVtoVTV;
dr["avp_cIdentificacion"] = this._avp_cIdentificacion;
dr["avp_tVtoIdentificacion"] = this._avp_tVtoIdentificacion;
dr["avp_cObservaciones"] = this._avp_cObservaciones;
dr["avp_cPathPicture"] = this._avp_cPathPicture;
							 
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
