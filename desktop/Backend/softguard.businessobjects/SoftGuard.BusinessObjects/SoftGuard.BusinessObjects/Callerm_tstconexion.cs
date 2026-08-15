
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
    public class Callerm_tstconexion : CallerObject
    { 	
				     private int _txc_idCuenta;
					
				     private int _txc_idIRSConn;
					
				     private string _txc_cAlarmaEsperada;
					
				     private int _txc_iMinutos;
					
				     private string _txc_cAlarmaAGenerar;
					
				     private string _txc_cAlarmaAutoprocesa;
				 ///<summary>
     ///txc_idCuenta property   
     ///</summary>   
     public int txc_idCuenta 
		 { 
		        
                    get{ return this._txc_idCuenta; }
        						set{ this._txc_idCuenta = value; } 										
	   }
	  ///<summary>
     ///txc_idIRSConn property   
     ///</summary>   
     public int txc_idIRSConn 
		 { 
		        
                    get{ return this._txc_idIRSConn; }
        						set{ this._txc_idIRSConn = value; } 										
	   }
	  ///<summary>
     ///txc_cAlarmaEsperada property   
     ///</summary>   
     public string txc_cAlarmaEsperada 
		 { 
		        
                    get{ return this._txc_cAlarmaEsperada; }
        						set{ this._txc_cAlarmaEsperada = value; } 										
	   }
	  ///<summary>
     ///txc_iMinutos property   
     ///</summary>   
     public int txc_iMinutos 
		 { 
		        
                    get{ return this._txc_iMinutos; }
        						set{ this._txc_iMinutos = value; } 										
	   }
	  ///<summary>
     ///txc_cAlarmaAGenerar property   
     ///</summary>   
     public string txc_cAlarmaAGenerar 
		 { 
		        
                    get{ return this._txc_cAlarmaAGenerar; }
        						set{ this._txc_cAlarmaAGenerar = value; } 										
	   }
	  ///<summary>
     ///txc_cAlarmaAutoprocesa property   
     ///</summary>   
     public string txc_cAlarmaAutoprocesa 
		 { 
		        
                    get{ return this._txc_cAlarmaAutoprocesa; }
        						set{ this._txc_cAlarmaAutoprocesa = value; } 										
	   }
	  ///<summary>
     ///Constructor   
     ///</summary>
        public Callerm_tstconexion() : base()
        {
            InitClass();
        }  
 ///<summary>
     ///Constructor   
     ///</summary>		
        public Callerm_tstconexion(int Id, string Name, int txc_idCuenta, int txc_idIRSConn, string txc_cAlarmaEsperada, int txc_iMinutos, string txc_cAlarmaAGenerar, string txc_cAlarmaAutoprocesa) : base()
        {
            base.Id = Id;
						base.Name = Name;				 																																					 
				    this._txc_idCuenta = txc_idCuenta;
this._txc_idIRSConn = txc_idIRSConn;
this._txc_cAlarmaEsperada = txc_cAlarmaEsperada;
this._txc_iMinutos = txc_iMinutos;
this._txc_cAlarmaAGenerar = txc_cAlarmaAGenerar;
this._txc_cAlarmaAutoprocesa = txc_cAlarmaAutoprocesa;

            InitClass();
        }  								

				private void InitClass()
        {														
  				  base.Type = new ObjectType(3216, "m_tstconexion");
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
			Simplem_tstconexion Simple = new Simplem_tstconexion();
			Simple.Id = base.Id;
			Simple.Name = base.Name;
			Simple.txc_idCuenta = this._txc_idCuenta;
Simple.txc_idIRSConn = this._txc_idIRSConn;
Simple.txc_cAlarmaEsperada = this._txc_cAlarmaEsperada;
Simple.txc_iMinutos = this._txc_iMinutos;
Simple.txc_cAlarmaAGenerar = this._txc_cAlarmaAGenerar;
Simple.txc_cAlarmaAutoprocesa = this._txc_cAlarmaAutoprocesa;

			return (SimpleBaseObject) Simple;
		}
 ///<summary>
     ///Sets a simpleobject   
     ///</summary>	
		public void SetSimpleObject(Simplem_tstconexion Simple)
		{
			base.Id = Simple.Id;
			base.Name = Simple.Name;
			this._txc_idCuenta = Simple.txc_idCuenta;
this._txc_idIRSConn = Simple.txc_idIRSConn;
this._txc_cAlarmaEsperada = Simple.txc_cAlarmaEsperada;
this._txc_iMinutos = Simple.txc_iMinutos;
this._txc_cAlarmaAGenerar = Simple.txc_cAlarmaAGenerar;
this._txc_cAlarmaAutoprocesa = Simple.txc_cAlarmaAutoprocesa;

		}
 ///<summary>
     ///Gets a baseobject   
     ///</summary>
		public override BaseObject GetBaseObject(SqlHelper SqlConfig, int UserId)
		{
			return new Dalm_tstconexion(SqlConfig, UserId, (Simplem_tstconexion) GetSimpleObject());
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
               dt.Columns.Add(new DataColumn("txc_idCuenta", typeof (int)));               
							 dt.Columns.Add(new DataColumn("txc_idIRSConn", typeof (int)));               
							 dt.Columns.Add(new DataColumn("txc_cAlarmaEsperada", typeof (string)));               
							 dt.Columns.Add(new DataColumn("txc_iMinutos", typeof (int)));               
							 dt.Columns.Add(new DataColumn("txc_cAlarmaAGenerar", typeof (string)));               
							 dt.Columns.Add(new DataColumn("txc_cAlarmaAutoprocesa", typeof (string)));               
							 										
               //create Row  
               dr = dt.NewRow();
               
               //set Row
							 dr["Id"] = base.Id;

							 dr["Name"] = base.Name;
dr["txc_idCuenta"] = this._txc_idCuenta;
dr["txc_idIRSConn"] = this._txc_idIRSConn;
dr["txc_cAlarmaEsperada"] = this._txc_cAlarmaEsperada;
dr["txc_iMinutos"] = this._txc_iMinutos;
dr["txc_cAlarmaAGenerar"] = this._txc_cAlarmaAGenerar;
dr["txc_cAlarmaAutoprocesa"] = this._txc_cAlarmaAutoprocesa;
							 
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
