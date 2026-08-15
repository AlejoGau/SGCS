
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
    public class Callerm_EstadosPanel : CallerObject
    { 	
				     private int _mep_idCuenta;
					
				     private string _mep_cAlarmaControl;
					
				     private int _mep_iUsuarioControl;
					
				     private string _mep_cAlarmaEsperada;
					
				     private int _mep_iUsuarioEsperado;
					
				     private int _mep_iMinutos;
					
				     private int _mep_iAutoProcesa;
					
				     private string _mep_cAlarmaAGenerar;
				 ///<summary>
     ///mep_idCuenta property   
     ///</summary>   
     public int mep_idCuenta 
		 { 
		        
                    get{ return this._mep_idCuenta; }
        						set{ this._mep_idCuenta = value; } 										
	   }
	  ///<summary>
     ///mep_cAlarmaControl property   
     ///</summary>   
     public string mep_cAlarmaControl 
		 { 
		        
                    get{ return this._mep_cAlarmaControl; }
        						set{ this._mep_cAlarmaControl = value; } 										
	   }
	  ///<summary>
     ///mep_iUsuarioControl property   
     ///</summary>   
     public int mep_iUsuarioControl 
		 { 
		        
                    get{ return this._mep_iUsuarioControl; }
        						set{ this._mep_iUsuarioControl = value; } 										
	   }
	  ///<summary>
     ///mep_cAlarmaEsperada property   
     ///</summary>   
     public string mep_cAlarmaEsperada 
		 { 
		        
                    get{ return this._mep_cAlarmaEsperada; }
        						set{ this._mep_cAlarmaEsperada = value; } 										
	   }
	  ///<summary>
     ///mep_iUsuarioEsperado property   
     ///</summary>   
     public int mep_iUsuarioEsperado 
		 { 
		        
                    get{ return this._mep_iUsuarioEsperado; }
        						set{ this._mep_iUsuarioEsperado = value; } 										
	   }
	  ///<summary>
     ///mep_iMinutos property   
     ///</summary>   
     public int mep_iMinutos 
		 { 
		        
                    get{ return this._mep_iMinutos; }
        						set{ this._mep_iMinutos = value; } 										
	   }
	  ///<summary>
     ///mep_iAutoProcesa property   
     ///</summary>   
     public int mep_iAutoProcesa 
		 { 
		        
                    get{ return this._mep_iAutoProcesa; }
        						set{ this._mep_iAutoProcesa = value; } 										
	   }
	  ///<summary>
     ///mep_cAlarmaAGenerar property   
     ///</summary>   
     public string mep_cAlarmaAGenerar 
		 { 
		        
                    get{ return this._mep_cAlarmaAGenerar; }
        						set{ this._mep_cAlarmaAGenerar = value; } 										
	   }
	  ///<summary>
     ///Constructor   
     ///</summary>
        public Callerm_EstadosPanel() : base()
        {
            InitClass();
        }  
 ///<summary>
     ///Constructor   
     ///</summary>		
        public Callerm_EstadosPanel(int Id, string Name, int mep_idCuenta, string mep_cAlarmaControl, int mep_iUsuarioControl, string mep_cAlarmaEsperada, int mep_iUsuarioEsperado, int mep_iMinutos, int mep_iAutoProcesa, string mep_cAlarmaAGenerar) : base()
        {
            base.Id = Id;
						base.Name = Name;				 																																					 
				    this._mep_idCuenta = mep_idCuenta;
this._mep_cAlarmaControl = mep_cAlarmaControl;
this._mep_iUsuarioControl = mep_iUsuarioControl;
this._mep_cAlarmaEsperada = mep_cAlarmaEsperada;
this._mep_iUsuarioEsperado = mep_iUsuarioEsperado;
this._mep_iMinutos = mep_iMinutos;
this._mep_iAutoProcesa = mep_iAutoProcesa;
this._mep_cAlarmaAGenerar = mep_cAlarmaAGenerar;

            InitClass();
        }  								

				private void InitClass()
        {														
  				  base.Type = new ObjectType(3194, "m_EstadosPanel");
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
			Simplem_EstadosPanel Simple = new Simplem_EstadosPanel();
			Simple.Id = base.Id;
			Simple.Name = base.Name;
			Simple.mep_idCuenta = this._mep_idCuenta;
Simple.mep_cAlarmaControl = this._mep_cAlarmaControl;
Simple.mep_iUsuarioControl = this._mep_iUsuarioControl;
Simple.mep_cAlarmaEsperada = this._mep_cAlarmaEsperada;
Simple.mep_iUsuarioEsperado = this._mep_iUsuarioEsperado;
Simple.mep_iMinutos = this._mep_iMinutos;
Simple.mep_iAutoProcesa = this._mep_iAutoProcesa;
Simple.mep_cAlarmaAGenerar = this._mep_cAlarmaAGenerar;

			return (SimpleBaseObject) Simple;
		}
 ///<summary>
     ///Sets a simpleobject   
     ///</summary>	
		public void SetSimpleObject(Simplem_EstadosPanel Simple)
		{
			base.Id = Simple.Id;
			base.Name = Simple.Name;
			this._mep_idCuenta = Simple.mep_idCuenta;
this._mep_cAlarmaControl = Simple.mep_cAlarmaControl;
this._mep_iUsuarioControl = Simple.mep_iUsuarioControl;
this._mep_cAlarmaEsperada = Simple.mep_cAlarmaEsperada;
this._mep_iUsuarioEsperado = Simple.mep_iUsuarioEsperado;
this._mep_iMinutos = Simple.mep_iMinutos;
this._mep_iAutoProcesa = Simple.mep_iAutoProcesa;
this._mep_cAlarmaAGenerar = Simple.mep_cAlarmaAGenerar;

		}
 ///<summary>
     ///Gets a baseobject   
     ///</summary>
		public override BaseObject GetBaseObject(SqlHelper SqlConfig, int UserId)
		{
			return new Dalm_EstadosPanel(SqlConfig, UserId, (Simplem_EstadosPanel) GetSimpleObject());
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
               dt.Columns.Add(new DataColumn("mep_idCuenta", typeof (int)));               
							 dt.Columns.Add(new DataColumn("mep_cAlarmaControl", typeof (string)));               
							 dt.Columns.Add(new DataColumn("mep_iUsuarioControl", typeof (int)));               
							 dt.Columns.Add(new DataColumn("mep_cAlarmaEsperada", typeof (string)));               
							 dt.Columns.Add(new DataColumn("mep_iUsuarioEsperado", typeof (int)));               
							 dt.Columns.Add(new DataColumn("mep_iMinutos", typeof (int)));               
							 dt.Columns.Add(new DataColumn("mep_iAutoProcesa", typeof (int)));               
							 dt.Columns.Add(new DataColumn("mep_cAlarmaAGenerar", typeof (string)));               
							 										
               //create Row  
               dr = dt.NewRow();
               
               //set Row
							 dr["Id"] = base.Id;

							 dr["Name"] = base.Name;
dr["mep_idCuenta"] = this._mep_idCuenta;
dr["mep_cAlarmaControl"] = this._mep_cAlarmaControl;
dr["mep_iUsuarioControl"] = this._mep_iUsuarioControl;
dr["mep_cAlarmaEsperada"] = this._mep_cAlarmaEsperada;
dr["mep_iUsuarioEsperado"] = this._mep_iUsuarioEsperado;
dr["mep_iMinutos"] = this._mep_iMinutos;
dr["mep_iAutoProcesa"] = this._mep_iAutoProcesa;
dr["mep_cAlarmaAGenerar"] = this._mep_cAlarmaAGenerar;
							 
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
