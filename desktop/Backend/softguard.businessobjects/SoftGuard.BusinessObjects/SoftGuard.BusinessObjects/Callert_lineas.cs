
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
    public class Callert_lineas : CallerObject
    { 	
				     private string _lin_ccodigo;
					
				     private string _lin_crazonsocial;
					
				     private string _lin_ccalle;
					
				     private int _lin_inumero;
					
				     private Decimal _lin_npiso;
					
				     private string _lin_cdepartamento;
					
				     private string _lin_clocalidad;
					
				     private string _lin_cprovincia;
					
				     private string _lin_cestado;
					
				     private string _lin_ccodigopostal;
					
				     private string _lin_ctelfono;
					
				     private string _lin_cfax;
					
				     private string _lin_cimagen;
					
				     private string _lin_cusuario;
					
				     private string _lin_cclave;
					
				     private Decimal _lin_nacceso;
					
				     private string _lin_cmail;
					
				     private int _lin_iEnviaMailPorFalloTest;
					
				     private int _lin_iAutoProcesa;
					
				     private string _lin_cMetaData;
					
				     private int _lin_iEscala;
					
				     private int _lin_iOpnDespuesAlerta;
					
				     private int _lin_iGeneraAlarmaPorDesactivacion;
					
				     private int _lin_iOrganizacion;
					
				     private int _lin_iControlaCierreDespuesDeApertura;
					
				     private int _lin_iMinutosControlCDDA;
				 ///<summary>
     ///lin_ccodigo property   
     ///</summary>   
     public string lin_ccodigo 
		 { 
		        
                    get{ return this._lin_ccodigo; }
        						set{ this._lin_ccodigo = value; } 										
	   }
	  ///<summary>
     ///lin_crazonsocial property   
     ///</summary>   
     public string lin_crazonsocial 
		 { 
		        
                    get{ return this._lin_crazonsocial; }
        						set{ this._lin_crazonsocial = value; } 										
	   }
	  ///<summary>
     ///lin_ccalle property   
     ///</summary>   
     public string lin_ccalle 
		 { 
		        
                    get{ return this._lin_ccalle; }
        						set{ this._lin_ccalle = value; } 										
	   }
	  ///<summary>
     ///lin_inumero property   
     ///</summary>   
     public int lin_inumero 
		 { 
		        
                    get{ return this._lin_inumero; }
        						set{ this._lin_inumero = value; } 										
	   }
	  ///<summary>
     ///lin_npiso property   
     ///</summary>   
     public Decimal lin_npiso 
		 { 
		        
                    get{ return this._lin_npiso; }
        						set{ this._lin_npiso = value; } 										
	   }
	  ///<summary>
     ///lin_cdepartamento property   
     ///</summary>   
     public string lin_cdepartamento 
		 { 
		        
                    get{ return this._lin_cdepartamento; }
        						set{ this._lin_cdepartamento = value; } 										
	   }
	  ///<summary>
     ///lin_clocalidad property   
     ///</summary>   
     public string lin_clocalidad 
		 { 
		        
                    get{ return this._lin_clocalidad; }
        						set{ this._lin_clocalidad = value; } 										
	   }
	  ///<summary>
     ///lin_cprovincia property   
     ///</summary>   
     public string lin_cprovincia 
		 { 
		        
                    get{ return this._lin_cprovincia; }
        						set{ this._lin_cprovincia = value; } 										
	   }
	  ///<summary>
     ///lin_cestado property   
     ///</summary>   
     public string lin_cestado 
		 { 
		        
                    get{ return this._lin_cestado; }
        						set{ this._lin_cestado = value; } 										
	   }
	  ///<summary>
     ///lin_ccodigopostal property   
     ///</summary>   
     public string lin_ccodigopostal 
		 { 
		        
                    get{ return this._lin_ccodigopostal; }
        						set{ this._lin_ccodigopostal = value; } 										
	   }
	  ///<summary>
     ///lin_ctelfono property   
     ///</summary>   
     public string lin_ctelfono 
		 { 
		        
                    get{ return this._lin_ctelfono; }
        						set{ this._lin_ctelfono = value; } 										
	   }
	  ///<summary>
     ///lin_cfax property   
     ///</summary>   
     public string lin_cfax 
		 { 
		        
                    get{ return this._lin_cfax; }
        						set{ this._lin_cfax = value; } 										
	   }
	  ///<summary>
     ///lin_cimagen property   
     ///</summary>   
     public string lin_cimagen 
		 { 
		        
                    get{ return this._lin_cimagen; }
        						set{ this._lin_cimagen = value; } 										
	   }
	  ///<summary>
     ///lin_cusuario property   
     ///</summary>   
     public string lin_cusuario 
		 { 
		        
                    get{ return this._lin_cusuario; }
        						set{ this._lin_cusuario = value; } 										
	   }
	  ///<summary>
     ///lin_cclave property   
     ///</summary>   
     public string lin_cclave 
		 { 
		        
                    get{ return this._lin_cclave; }
        						set{ this._lin_cclave = value; } 										
	   }
	  ///<summary>
     ///lin_nacceso property   
     ///</summary>   
     public Decimal lin_nacceso 
		 { 
		        
                    get{ return this._lin_nacceso; }
        						set{ this._lin_nacceso = value; } 										
	   }
	  ///<summary>
     ///lin_cmail property   
     ///</summary>   
     public string lin_cmail 
		 { 
		        
                    get{ return this._lin_cmail; }
        						set{ this._lin_cmail = value; } 										
	   }
	  ///<summary>
     ///lin_iEnviaMailPorFalloTest property   
     ///</summary>   
     public int lin_iEnviaMailPorFalloTest 
		 { 
		        
                    get{ return this._lin_iEnviaMailPorFalloTest; }
        						set{ this._lin_iEnviaMailPorFalloTest = value; } 										
	   }
	  ///<summary>
     ///lin_iAutoProcesa property   
     ///</summary>   
     public int lin_iAutoProcesa 
		 { 
		        
                    get{ return this._lin_iAutoProcesa; }
        						set{ this._lin_iAutoProcesa = value; } 										
	   }
	  ///<summary>
     ///lin_cMetaData property   
     ///</summary>   
     public string lin_cMetaData 
		 { 
		        
                    get{ return this._lin_cMetaData; }
        						set{ this._lin_cMetaData = value; } 										
	   }
	  ///<summary>
     ///lin_iEscala property   
     ///</summary>   
     public int lin_iEscala 
		 { 
		        
                    get{ return this._lin_iEscala; }
        						set{ this._lin_iEscala = value; } 										
	   }
	  ///<summary>
     ///lin_iOpnDespuesAlerta property   
     ///</summary>   
     public int lin_iOpnDespuesAlerta 
		 { 
		        
                    get{ return this._lin_iOpnDespuesAlerta; }
        						set{ this._lin_iOpnDespuesAlerta = value; } 										
	   }
	  ///<summary>
     ///lin_iGeneraAlarmaPorDesactivacion property   
     ///</summary>   
     public int lin_iGeneraAlarmaPorDesactivacion 
		 { 
		        
                    get{ return this._lin_iGeneraAlarmaPorDesactivacion; }
        						set{ this._lin_iGeneraAlarmaPorDesactivacion = value; } 										
	   }
	  ///<summary>
     ///lin_iOrganizacion property   
     ///</summary>   
     public int lin_iOrganizacion 
		 { 
		        
                    get{ return this._lin_iOrganizacion; }
        						set{ this._lin_iOrganizacion = value; } 										
	   }
	  ///<summary>
     ///lin_iControlaCierreDespuesDeApertura property   
     ///</summary>   
     public int lin_iControlaCierreDespuesDeApertura 
		 { 
		        
                    get{ return this._lin_iControlaCierreDespuesDeApertura; }
        						set{ this._lin_iControlaCierreDespuesDeApertura = value; } 										
	   }
	  ///<summary>
     ///lin_iMinutosControlCDDA property   
     ///</summary>   
     public int lin_iMinutosControlCDDA 
		 { 
		        
                    get{ return this._lin_iMinutosControlCDDA; }
        						set{ this._lin_iMinutosControlCDDA = value; } 										
	   }
	  ///<summary>
     ///Constructor   
     ///</summary>
        public Callert_lineas() : base()
        {
            InitClass();
        }  
 ///<summary>
     ///Constructor   
     ///</summary>		
        public Callert_lineas(int Id, string Name, string lin_ccodigo, string lin_crazonsocial, string lin_ccalle, int lin_inumero, Decimal lin_npiso, string lin_cdepartamento, string lin_clocalidad, string lin_cprovincia, string lin_cestado, string lin_ccodigopostal, string lin_ctelfono, string lin_cfax, string lin_cimagen, string lin_cusuario, string lin_cclave, Decimal lin_nacceso, string lin_cmail, int lin_iEnviaMailPorFalloTest, int lin_iAutoProcesa, string lin_cMetaData, int lin_iEscala, int lin_iOpnDespuesAlerta, int lin_iGeneraAlarmaPorDesactivacion, int lin_iOrganizacion, int lin_iControlaCierreDespuesDeApertura, int lin_iMinutosControlCDDA) : base()
        {
            base.Id = Id;
						base.Name = Name;				 																																					 
				    this._lin_ccodigo = lin_ccodigo;
this._lin_crazonsocial = lin_crazonsocial;
this._lin_ccalle = lin_ccalle;
this._lin_inumero = lin_inumero;
this._lin_npiso = lin_npiso;
this._lin_cdepartamento = lin_cdepartamento;
this._lin_clocalidad = lin_clocalidad;
this._lin_cprovincia = lin_cprovincia;
this._lin_cestado = lin_cestado;
this._lin_ccodigopostal = lin_ccodigopostal;
this._lin_ctelfono = lin_ctelfono;
this._lin_cfax = lin_cfax;
this._lin_cimagen = lin_cimagen;
this._lin_cusuario = lin_cusuario;
this._lin_cclave = lin_cclave;
this._lin_nacceso = lin_nacceso;
this._lin_cmail = lin_cmail;
this._lin_iEnviaMailPorFalloTest = lin_iEnviaMailPorFalloTest;
this._lin_iAutoProcesa = lin_iAutoProcesa;
this._lin_cMetaData = lin_cMetaData;
this._lin_iEscala = lin_iEscala;
this._lin_iOpnDespuesAlerta = lin_iOpnDespuesAlerta;
this._lin_iGeneraAlarmaPorDesactivacion = lin_iGeneraAlarmaPorDesactivacion;
this._lin_iOrganizacion = lin_iOrganizacion;
this._lin_iControlaCierreDespuesDeApertura = lin_iControlaCierreDespuesDeApertura;
this._lin_iMinutosControlCDDA = lin_iMinutosControlCDDA;

            InitClass();
        }  								

				private void InitClass()
        {														
  				  base.Type = new ObjectType(3090, "t_lineas");
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
			Simplet_lineas Simple = new Simplet_lineas();
			Simple.Id = base.Id;
			Simple.Name = base.Name;
			Simple.lin_ccodigo = this._lin_ccodigo;
Simple.lin_crazonsocial = this._lin_crazonsocial;
Simple.lin_ccalle = this._lin_ccalle;
Simple.lin_inumero = this._lin_inumero;
Simple.lin_npiso = this._lin_npiso;
Simple.lin_cdepartamento = this._lin_cdepartamento;
Simple.lin_clocalidad = this._lin_clocalidad;
Simple.lin_cprovincia = this._lin_cprovincia;
Simple.lin_cestado = this._lin_cestado;
Simple.lin_ccodigopostal = this._lin_ccodigopostal;
Simple.lin_ctelfono = this._lin_ctelfono;
Simple.lin_cfax = this._lin_cfax;
Simple.lin_cimagen = this._lin_cimagen;
Simple.lin_cusuario = this._lin_cusuario;
Simple.lin_cclave = this._lin_cclave;
Simple.lin_nacceso = this._lin_nacceso;
Simple.lin_cmail = this._lin_cmail;
Simple.lin_iEnviaMailPorFalloTest = this._lin_iEnviaMailPorFalloTest;
Simple.lin_iAutoProcesa = this._lin_iAutoProcesa;
Simple.lin_cMetaData = this._lin_cMetaData;
Simple.lin_iEscala = this._lin_iEscala;
Simple.lin_iOpnDespuesAlerta = this._lin_iOpnDespuesAlerta;
Simple.lin_iGeneraAlarmaPorDesactivacion = this._lin_iGeneraAlarmaPorDesactivacion;
Simple.lin_iOrganizacion = this._lin_iOrganizacion;
Simple.lin_iControlaCierreDespuesDeApertura = this._lin_iControlaCierreDespuesDeApertura;
Simple.lin_iMinutosControlCDDA = this._lin_iMinutosControlCDDA;

			return (SimpleBaseObject) Simple;
		}
 ///<summary>
     ///Sets a simpleobject   
     ///</summary>	
		public void SetSimpleObject(Simplet_lineas Simple)
		{
			base.Id = Simple.Id;
			base.Name = Simple.Name;
			this._lin_ccodigo = Simple.lin_ccodigo;
this._lin_crazonsocial = Simple.lin_crazonsocial;
this._lin_ccalle = Simple.lin_ccalle;
this._lin_inumero = Simple.lin_inumero;
this._lin_npiso = Simple.lin_npiso;
this._lin_cdepartamento = Simple.lin_cdepartamento;
this._lin_clocalidad = Simple.lin_clocalidad;
this._lin_cprovincia = Simple.lin_cprovincia;
this._lin_cestado = Simple.lin_cestado;
this._lin_ccodigopostal = Simple.lin_ccodigopostal;
this._lin_ctelfono = Simple.lin_ctelfono;
this._lin_cfax = Simple.lin_cfax;
this._lin_cimagen = Simple.lin_cimagen;
this._lin_cusuario = Simple.lin_cusuario;
this._lin_cclave = Simple.lin_cclave;
this._lin_nacceso = Simple.lin_nacceso;
this._lin_cmail = Simple.lin_cmail;
this._lin_iEnviaMailPorFalloTest = Simple.lin_iEnviaMailPorFalloTest;
this._lin_iAutoProcesa = Simple.lin_iAutoProcesa;
this._lin_cMetaData = Simple.lin_cMetaData;
this._lin_iEscala = Simple.lin_iEscala;
this._lin_iOpnDespuesAlerta = Simple.lin_iOpnDespuesAlerta;
this._lin_iGeneraAlarmaPorDesactivacion = Simple.lin_iGeneraAlarmaPorDesactivacion;
this._lin_iOrganizacion = Simple.lin_iOrganizacion;
this._lin_iControlaCierreDespuesDeApertura = Simple.lin_iControlaCierreDespuesDeApertura;
this._lin_iMinutosControlCDDA = Simple.lin_iMinutosControlCDDA;

		}
 ///<summary>
     ///Gets a baseobject   
     ///</summary>
		public override BaseObject GetBaseObject(SqlHelper SqlConfig, int UserId)
		{
			return new Dalt_lineas(SqlConfig, UserId, (Simplet_lineas) GetSimpleObject());
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
               dt.Columns.Add(new DataColumn("lin_ccodigo", typeof (string)));               
							 dt.Columns.Add(new DataColumn("lin_crazonsocial", typeof (string)));               
							 dt.Columns.Add(new DataColumn("lin_ccalle", typeof (string)));               
							 dt.Columns.Add(new DataColumn("lin_inumero", typeof (int)));               
							 dt.Columns.Add(new DataColumn("lin_npiso", typeof (Decimal)));               
							 dt.Columns.Add(new DataColumn("lin_cdepartamento", typeof (string)));               
							 dt.Columns.Add(new DataColumn("lin_clocalidad", typeof (string)));               
							 dt.Columns.Add(new DataColumn("lin_cprovincia", typeof (string)));               
							 dt.Columns.Add(new DataColumn("lin_cestado", typeof (string)));               
							 dt.Columns.Add(new DataColumn("lin_ccodigopostal", typeof (string)));               
							 dt.Columns.Add(new DataColumn("lin_ctelfono", typeof (string)));               
							 dt.Columns.Add(new DataColumn("lin_cfax", typeof (string)));               
							 dt.Columns.Add(new DataColumn("lin_cimagen", typeof (string)));               
							 dt.Columns.Add(new DataColumn("lin_cusuario", typeof (string)));               
							 dt.Columns.Add(new DataColumn("lin_cclave", typeof (string)));               
							 dt.Columns.Add(new DataColumn("lin_nacceso", typeof (Decimal)));               
							 dt.Columns.Add(new DataColumn("lin_cmail", typeof (string)));               
							 dt.Columns.Add(new DataColumn("lin_iEnviaMailPorFalloTest", typeof (int)));               
							 dt.Columns.Add(new DataColumn("lin_iAutoProcesa", typeof (int)));               
							 dt.Columns.Add(new DataColumn("lin_cMetaData", typeof (string)));               
							 dt.Columns.Add(new DataColumn("lin_iEscala", typeof (int)));               
							 dt.Columns.Add(new DataColumn("lin_iOpnDespuesAlerta", typeof (int)));               
							 dt.Columns.Add(new DataColumn("lin_iGeneraAlarmaPorDesactivacion", typeof (int)));               
							 dt.Columns.Add(new DataColumn("lin_iOrganizacion", typeof (int)));               
							 dt.Columns.Add(new DataColumn("lin_iControlaCierreDespuesDeApertura", typeof (int)));               
							 dt.Columns.Add(new DataColumn("lin_iMinutosControlCDDA", typeof (int)));               
							 										
               //create Row  
               dr = dt.NewRow();
               
               //set Row
							 dr["Id"] = base.Id;

							 dr["Name"] = base.Name;
dr["lin_ccodigo"] = this._lin_ccodigo;
dr["lin_crazonsocial"] = this._lin_crazonsocial;
dr["lin_ccalle"] = this._lin_ccalle;
dr["lin_inumero"] = this._lin_inumero;
dr["lin_npiso"] = this._lin_npiso;
dr["lin_cdepartamento"] = this._lin_cdepartamento;
dr["lin_clocalidad"] = this._lin_clocalidad;
dr["lin_cprovincia"] = this._lin_cprovincia;
dr["lin_cestado"] = this._lin_cestado;
dr["lin_ccodigopostal"] = this._lin_ccodigopostal;
dr["lin_ctelfono"] = this._lin_ctelfono;
dr["lin_cfax"] = this._lin_cfax;
dr["lin_cimagen"] = this._lin_cimagen;
dr["lin_cusuario"] = this._lin_cusuario;
dr["lin_cclave"] = this._lin_cclave;
dr["lin_nacceso"] = this._lin_nacceso;
dr["lin_cmail"] = this._lin_cmail;
dr["lin_iEnviaMailPorFalloTest"] = this._lin_iEnviaMailPorFalloTest;
dr["lin_iAutoProcesa"] = this._lin_iAutoProcesa;
dr["lin_cMetaData"] = this._lin_cMetaData;
dr["lin_iEscala"] = this._lin_iEscala;
dr["lin_iOpnDespuesAlerta"] = this._lin_iOpnDespuesAlerta;
dr["lin_iGeneraAlarmaPorDesactivacion"] = this._lin_iGeneraAlarmaPorDesactivacion;
dr["lin_iOrganizacion"] = this._lin_iOrganizacion;
dr["lin_iControlaCierreDespuesDeApertura"] = this._lin_iControlaCierreDespuesDeApertura;
dr["lin_iMinutosControlCDDA"] = this._lin_iMinutosControlCDDA;
							 
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
