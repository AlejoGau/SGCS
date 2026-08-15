
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
    public class Callert_notificaciones_dealer : CallerObject
    { 	
				     private string _tnd_cDealer;
					
				     private string _tnd_cDescripcion;
					
				     private int _tnd_iNotificarAlertas;
					
				     private int _tnd_iGrupoAlarmas;
					
				     private string _tnd_cAlarmas;
					
				     private string _tnd_cMail;
					
				     private string _tnd_cPlantillaMail;
					
				     private int _tnd_iTipo;
					
				     private int _tnd_iAdmin;
					
				     private int _tnd_iNotificarSP;
					
				     private string _tnd_cSMS;
					
				     private int _tnd_iModemSMS;
				 ///<summary>
     ///tnd_cDealer property   
     ///</summary>   
     public string tnd_cDealer 
		 { 
		        
                    get{ return this._tnd_cDealer; }
        						set{ this._tnd_cDealer = value; } 										
	   }
	  ///<summary>
     ///tnd_cDescripcion property   
     ///</summary>   
     public string tnd_cDescripcion 
		 { 
		        
                    get{ return this._tnd_cDescripcion; }
        						set{ this._tnd_cDescripcion = value; } 										
	   }
	  ///<summary>
     ///tnd_iNotificarAlertas property   
     ///</summary>   
     public int tnd_iNotificarAlertas 
		 { 
		        
                    get{ return this._tnd_iNotificarAlertas; }
        						set{ this._tnd_iNotificarAlertas = value; } 										
	   }
	  ///<summary>
     ///tnd_iGrupoAlarmas property   
     ///</summary>   
     public int tnd_iGrupoAlarmas 
		 { 
		        
                    get{ return this._tnd_iGrupoAlarmas; }
        						set{ this._tnd_iGrupoAlarmas = value; } 										
	   }
	  ///<summary>
     ///tnd_cAlarmas property   
     ///</summary>   
     public string tnd_cAlarmas 
		 { 
		        
                    get{ return this._tnd_cAlarmas; }
        						set{ this._tnd_cAlarmas = value; } 										
	   }
	  ///<summary>
     ///tnd_cMail property   
     ///</summary>   
     public string tnd_cMail 
		 { 
		        
                    get{ return this._tnd_cMail; }
        						set{ this._tnd_cMail = value; } 										
	   }
	  ///<summary>
     ///tnd_cPlantillaMail property   
     ///</summary>   
     public string tnd_cPlantillaMail 
		 { 
		        
                    get{ return this._tnd_cPlantillaMail; }
        						set{ this._tnd_cPlantillaMail = value; } 										
	   }
	  ///<summary>
     ///tnd_iTipo property   
     ///</summary>   
     public int tnd_iTipo 
		 { 
		        
                    get{ return this._tnd_iTipo; }
        						set{ this._tnd_iTipo = value; } 										
	   }
	  ///<summary>
     ///tnd_iAdmin property   
     ///</summary>   
     public int tnd_iAdmin 
		 { 
		        
                    get{ return this._tnd_iAdmin; }
        						set{ this._tnd_iAdmin = value; } 										
	   }
	  ///<summary>
     ///tnd_iNotificarSP property   
     ///</summary>   
     public int tnd_iNotificarSP 
		 { 
		        
                    get{ return this._tnd_iNotificarSP; }
        						set{ this._tnd_iNotificarSP = value; } 										
	   }
	  ///<summary>
     ///tnd_cSMS property   
     ///</summary>   
     public string tnd_cSMS 
		 { 
		        
                    get{ return this._tnd_cSMS; }
        						set{ this._tnd_cSMS = value; } 										
	   }
	  ///<summary>
     ///tnd_iModemSMS property   
     ///</summary>   
     public int tnd_iModemSMS 
		 { 
		        
                    get{ return this._tnd_iModemSMS; }
        						set{ this._tnd_iModemSMS = value; } 										
	   }
	  ///<summary>
     ///Constructor   
     ///</summary>
        public Callert_notificaciones_dealer() : base()
        {
            InitClass();
        }  
 ///<summary>
     ///Constructor   
     ///</summary>		
        public Callert_notificaciones_dealer(int Id, string Name, string tnd_cDealer, string tnd_cDescripcion, int tnd_iNotificarAlertas, int tnd_iGrupoAlarmas, string tnd_cAlarmas, string tnd_cMail, string tnd_cPlantillaMail, int tnd_iTipo, int tnd_iAdmin, int tnd_iNotificarSP, string tnd_cSMS, int tnd_iModemSMS) : base()
        {
            base.Id = Id;
						base.Name = Name;				 																																					 
				    this._tnd_cDealer = tnd_cDealer;
this._tnd_cDescripcion = tnd_cDescripcion;
this._tnd_iNotificarAlertas = tnd_iNotificarAlertas;
this._tnd_iGrupoAlarmas = tnd_iGrupoAlarmas;
this._tnd_cAlarmas = tnd_cAlarmas;
this._tnd_cMail = tnd_cMail;
this._tnd_cPlantillaMail = tnd_cPlantillaMail;
this._tnd_iTipo = tnd_iTipo;
this._tnd_iAdmin = tnd_iAdmin;
this._tnd_iNotificarSP = tnd_iNotificarSP;
this._tnd_cSMS = tnd_cSMS;
this._tnd_iModemSMS = tnd_iModemSMS;

            InitClass();
        }  								

				private void InitClass()
        {														
  				  base.Type = new ObjectType(3212, "t_notificaciones_dealer");
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
			Simplet_notificaciones_dealer Simple = new Simplet_notificaciones_dealer();
			Simple.Id = base.Id;
			Simple.Name = base.Name;
			Simple.tnd_cDealer = this._tnd_cDealer;
Simple.tnd_cDescripcion = this._tnd_cDescripcion;
Simple.tnd_iNotificarAlertas = this._tnd_iNotificarAlertas;
Simple.tnd_iGrupoAlarmas = this._tnd_iGrupoAlarmas;
Simple.tnd_cAlarmas = this._tnd_cAlarmas;
Simple.tnd_cMail = this._tnd_cMail;
Simple.tnd_cPlantillaMail = this._tnd_cPlantillaMail;
Simple.tnd_iTipo = this._tnd_iTipo;
Simple.tnd_iAdmin = this._tnd_iAdmin;
Simple.tnd_iNotificarSP = this._tnd_iNotificarSP;
Simple.tnd_cSMS = this._tnd_cSMS;
Simple.tnd_iModemSMS = this._tnd_iModemSMS;

			return (SimpleBaseObject) Simple;
		}
 ///<summary>
     ///Sets a simpleobject   
     ///</summary>	
		public void SetSimpleObject(Simplet_notificaciones_dealer Simple)
		{
			base.Id = Simple.Id;
			base.Name = Simple.Name;
			this._tnd_cDealer = Simple.tnd_cDealer;
this._tnd_cDescripcion = Simple.tnd_cDescripcion;
this._tnd_iNotificarAlertas = Simple.tnd_iNotificarAlertas;
this._tnd_iGrupoAlarmas = Simple.tnd_iGrupoAlarmas;
this._tnd_cAlarmas = Simple.tnd_cAlarmas;
this._tnd_cMail = Simple.tnd_cMail;
this._tnd_cPlantillaMail = Simple.tnd_cPlantillaMail;
this._tnd_iTipo = Simple.tnd_iTipo;
this._tnd_iAdmin = Simple.tnd_iAdmin;
this._tnd_iNotificarSP = Simple.tnd_iNotificarSP;
this._tnd_cSMS = Simple.tnd_cSMS;
this._tnd_iModemSMS = Simple.tnd_iModemSMS;

		}
 ///<summary>
     ///Gets a baseobject   
     ///</summary>
		public override BaseObject GetBaseObject(SqlHelper SqlConfig, int UserId)
		{
			return new Dalt_notificaciones_dealer(SqlConfig, UserId, (Simplet_notificaciones_dealer) GetSimpleObject());
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
               dt.Columns.Add(new DataColumn("tnd_cDealer", typeof (string)));               
							 dt.Columns.Add(new DataColumn("tnd_cDescripcion", typeof (string)));               
							 dt.Columns.Add(new DataColumn("tnd_iNotificarAlertas", typeof (int)));               
							 dt.Columns.Add(new DataColumn("tnd_iGrupoAlarmas", typeof (int)));               
							 dt.Columns.Add(new DataColumn("tnd_cAlarmas", typeof (string)));               
							 dt.Columns.Add(new DataColumn("tnd_cMail", typeof (string)));               
							 dt.Columns.Add(new DataColumn("tnd_cPlantillaMail", typeof (string)));               
							 dt.Columns.Add(new DataColumn("tnd_iTipo", typeof (int)));               
							 dt.Columns.Add(new DataColumn("tnd_iAdmin", typeof (int)));               
							 dt.Columns.Add(new DataColumn("tnd_iNotificarSP", typeof (int)));               
							 dt.Columns.Add(new DataColumn("tnd_cSMS", typeof (string)));               
							 dt.Columns.Add(new DataColumn("tnd_iModemSMS", typeof (int)));               
							 										
               //create Row  
               dr = dt.NewRow();
               
               //set Row
							 dr["Id"] = base.Id;

							 dr["Name"] = base.Name;
dr["tnd_cDealer"] = this._tnd_cDealer;
dr["tnd_cDescripcion"] = this._tnd_cDescripcion;
dr["tnd_iNotificarAlertas"] = this._tnd_iNotificarAlertas;
dr["tnd_iGrupoAlarmas"] = this._tnd_iGrupoAlarmas;
dr["tnd_cAlarmas"] = this._tnd_cAlarmas;
dr["tnd_cMail"] = this._tnd_cMail;
dr["tnd_cPlantillaMail"] = this._tnd_cPlantillaMail;
dr["tnd_iTipo"] = this._tnd_iTipo;
dr["tnd_iAdmin"] = this._tnd_iAdmin;
dr["tnd_iNotificarSP"] = this._tnd_iNotificarSP;
dr["tnd_cSMS"] = this._tnd_cSMS;
dr["tnd_iModemSMS"] = this._tnd_iModemSMS;
							 
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
