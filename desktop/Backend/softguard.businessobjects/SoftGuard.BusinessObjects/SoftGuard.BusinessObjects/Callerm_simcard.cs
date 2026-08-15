
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
    public class Callerm_simcard : CallerObject
    { 	
				     private int _sim_cuenta;
					
				     private int _sim_apn;
					
				     private int _sim_csid;
					
				     private DateTime? _sim_fecha_activacion;
					
				     private string _sim_iccid;
					
				     private int _sim_marca;
					
				     private int _sim_estado;
					
				     private string _sim_codigo;
					
				     private string _sim_observaciones;
					
				     private string _sim_ClaveMaster;
					
				     private int _sim_udw_idKey;
				 ///<summary>
     ///sim_cuenta property   
     ///</summary>   
     public int sim_cuenta 
		 { 
		        
                    get{ return this._sim_cuenta; }
        						set{ this._sim_cuenta = value; } 										
	   }
	  ///<summary>
     ///sim_apn property   
     ///</summary>   
     public int sim_apn 
		 { 
		        
                    get{ return this._sim_apn; }
        						set{ this._sim_apn = value; } 										
	   }
	  ///<summary>
     ///sim_csid property   
     ///</summary>   
     public int sim_csid 
		 { 
		        
                    get{ return this._sim_csid; }
        						set{ this._sim_csid = value; } 										
	   }
	  ///<summary>
     ///sim_fecha_activacion property   
     ///</summary>   
     public DateTime? sim_fecha_activacion 
		 { 
		        
                    get{ return this._sim_fecha_activacion; }
        						set{ this._sim_fecha_activacion = value; } 										
	   }
	  ///<summary>
     ///sim_iccid property   
     ///</summary>   
     public string sim_iccid 
		 { 
		        
                    get{ return this._sim_iccid; }
        						set{ this._sim_iccid = value; } 										
	   }
	  ///<summary>
     ///sim_marca property   
     ///</summary>   
     public int sim_marca 
		 { 
		        
                    get{ return this._sim_marca; }
        						set{ this._sim_marca = value; } 										
	   }
	  ///<summary>
     ///sim_estado property   
     ///</summary>   
     public int sim_estado 
		 { 
		        
                    get{ return this._sim_estado; }
        						set{ this._sim_estado = value; } 										
	   }
	  ///<summary>
     ///sim_codigo property   
     ///</summary>   
     public string sim_codigo 
		 { 
		        
                    get{ return this._sim_codigo; }
        						set{ this._sim_codigo = value; } 										
	   }
	  ///<summary>
     ///sim_observaciones property   
     ///</summary>   
     public string sim_observaciones 
		 { 
		        
                    get{ return this._sim_observaciones; }
        						set{ this._sim_observaciones = value; } 										
	   }
	  ///<summary>
     ///sim_ClaveMaster property   
     ///</summary>   
     public string sim_ClaveMaster 
		 { 
		        
                    get{ return this._sim_ClaveMaster; }
        						set{ this._sim_ClaveMaster = value; } 										
	   }
	  ///<summary>
     ///sim_udw_idKey property   
     ///</summary>   
     public int sim_udw_idKey 
		 { 
		        
                    get{ return this._sim_udw_idKey; }
        						set{ this._sim_udw_idKey = value; } 										
	   }
	  ///<summary>
     ///Constructor   
     ///</summary>
        public Callerm_simcard() : base()
        {
            InitClass();
        }  
 ///<summary>
     ///Constructor   
     ///</summary>		
        public Callerm_simcard(int Id, string Name, int sim_cuenta, int sim_apn, int sim_csid, DateTime? sim_fecha_activacion, string sim_iccid, int sim_marca, int sim_estado, string sim_codigo, string sim_observaciones, string sim_ClaveMaster, int sim_udw_idKey) : base()
        {
            base.Id = Id;
						base.Name = Name;				 																																					 
				    this._sim_cuenta = sim_cuenta;
this._sim_apn = sim_apn;
this._sim_csid = sim_csid;
this._sim_fecha_activacion = sim_fecha_activacion;
this._sim_iccid = sim_iccid;
this._sim_marca = sim_marca;
this._sim_estado = sim_estado;
this._sim_codigo = sim_codigo;
this._sim_observaciones = sim_observaciones;
this._sim_ClaveMaster = sim_ClaveMaster;
this._sim_udw_idKey = sim_udw_idKey;

            InitClass();
        }  								

				private void InitClass()
        {														
  				  base.Type = new ObjectType(3233, "m_simcard");
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
			Simplem_simcard Simple = new Simplem_simcard();
			Simple.Id = base.Id;
			Simple.Name = base.Name;
			Simple.sim_cuenta = this._sim_cuenta;
Simple.sim_apn = this._sim_apn;
Simple.sim_csid = this._sim_csid;
Simple.sim_fecha_activacion = this._sim_fecha_activacion;
Simple.sim_iccid = this._sim_iccid;
Simple.sim_marca = this._sim_marca;
Simple.sim_estado = this._sim_estado;
Simple.sim_codigo = this._sim_codigo;
Simple.sim_observaciones = this._sim_observaciones;
Simple.sim_ClaveMaster = this._sim_ClaveMaster;
Simple.sim_udw_idKey = this._sim_udw_idKey;

			return (SimpleBaseObject) Simple;
		}
 ///<summary>
     ///Sets a simpleobject   
     ///</summary>	
		public void SetSimpleObject(Simplem_simcard Simple)
		{
			base.Id = Simple.Id;
			base.Name = Simple.Name;
			this._sim_cuenta = Simple.sim_cuenta;
this._sim_apn = Simple.sim_apn;
this._sim_csid = Simple.sim_csid;
this._sim_fecha_activacion = Simple.sim_fecha_activacion;
this._sim_iccid = Simple.sim_iccid;
this._sim_marca = Simple.sim_marca;
this._sim_estado = Simple.sim_estado;
this._sim_codigo = Simple.sim_codigo;
this._sim_observaciones = Simple.sim_observaciones;
this._sim_ClaveMaster = Simple.sim_ClaveMaster;
this._sim_udw_idKey = Simple.sim_udw_idKey;

		}
 ///<summary>
     ///Gets a baseobject   
     ///</summary>
		public override BaseObject GetBaseObject(SqlHelper SqlConfig, int UserId)
		{
			return new Dalm_simcard(SqlConfig, UserId, (Simplem_simcard) GetSimpleObject());
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
               dt.Columns.Add(new DataColumn("sim_cuenta", typeof (int)));               
							 dt.Columns.Add(new DataColumn("sim_apn", typeof (int)));               
							 dt.Columns.Add(new DataColumn("sim_csid", typeof (int)));               
							 dt.Columns.Add(new DataColumn("sim_fecha_activacion", typeof (DateTime)));               
							 dt.Columns.Add(new DataColumn("sim_iccid", typeof (string)));               
							 dt.Columns.Add(new DataColumn("sim_marca", typeof (int)));               
							 dt.Columns.Add(new DataColumn("sim_estado", typeof (int)));               
							 dt.Columns.Add(new DataColumn("sim_codigo", typeof (string)));               
							 dt.Columns.Add(new DataColumn("sim_observaciones", typeof (string)));               
							 dt.Columns.Add(new DataColumn("sim_ClaveMaster", typeof (string)));               
							 dt.Columns.Add(new DataColumn("sim_udw_idKey", typeof (int)));               
							 										
               //create Row  
               dr = dt.NewRow();
               
               //set Row
							 dr["Id"] = base.Id;

							 dr["Name"] = base.Name;
dr["sim_cuenta"] = this._sim_cuenta;
dr["sim_apn"] = this._sim_apn;
dr["sim_csid"] = this._sim_csid;
dr["sim_fecha_activacion"] = this._sim_fecha_activacion;
dr["sim_iccid"] = this._sim_iccid;
dr["sim_marca"] = this._sim_marca;
dr["sim_estado"] = this._sim_estado;
dr["sim_codigo"] = this._sim_codigo;
dr["sim_observaciones"] = this._sim_observaciones;
dr["sim_ClaveMaster"] = this._sim_ClaveMaster;
dr["sim_udw_idKey"] = this._sim_udw_idKey;
							 
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
