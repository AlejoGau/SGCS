
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
    public class Callert_CtrlEventoPrevio : CallerObject
    { 	
				     private string _cep_cAlarmaEsperada;
					
				     private string _cep_cAlarmaPrevia;
					
				     private int _cep_iHoras;
					
				     private int _cep_iCategorizacion;
					
				     private string _cep_cDescripcion;
				 ///<summary>
     ///cep_cAlarmaEsperada property   
     ///</summary>   
     public string cep_cAlarmaEsperada 
		 { 
		        
                    get{ return this._cep_cAlarmaEsperada; }
        						set{ this._cep_cAlarmaEsperada = value; } 										
	   }
	  ///<summary>
     ///cep_cAlarmaPrevia property   
     ///</summary>   
     public string cep_cAlarmaPrevia 
		 { 
		        
                    get{ return this._cep_cAlarmaPrevia; }
        						set{ this._cep_cAlarmaPrevia = value; } 										
	   }
	  ///<summary>
     ///cep_iHoras property   
     ///</summary>   
     public int cep_iHoras 
		 { 
		        
                    get{ return this._cep_iHoras; }
        						set{ this._cep_iHoras = value; } 										
	   }
	  ///<summary>
     ///cep_iCategorizacion property   
     ///</summary>   
     public int cep_iCategorizacion 
		 { 
		        
                    get{ return this._cep_iCategorizacion; }
        						set{ this._cep_iCategorizacion = value; } 										
	   }
	  ///<summary>
     ///cep_cDescripcion property   
     ///</summary>   
     public string cep_cDescripcion 
		 { 
		        
                    get{ return this._cep_cDescripcion; }
        						set{ this._cep_cDescripcion = value; } 										
	   }
	  ///<summary>
     ///Constructor   
     ///</summary>
        public Callert_CtrlEventoPrevio() : base()
        {
            InitClass();
        }  
 ///<summary>
     ///Constructor   
     ///</summary>		
        public Callert_CtrlEventoPrevio(int Id, string Name, string cep_cAlarmaEsperada, string cep_cAlarmaPrevia, int cep_iHoras, int cep_iCategorizacion, string cep_cDescripcion) : base()
        {
            base.Id = Id;
						base.Name = Name;				 																																					 
				    this._cep_cAlarmaEsperada = cep_cAlarmaEsperada;
this._cep_cAlarmaPrevia = cep_cAlarmaPrevia;
this._cep_iHoras = cep_iHoras;
this._cep_iCategorizacion = cep_iCategorizacion;
this._cep_cDescripcion = cep_cDescripcion;

            InitClass();
        }  								

				private void InitClass()
        {														
  				  base.Type = new ObjectType(7033, "t_CtrlEventoPrevio");
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
			Simplet_CtrlEventoPrevio Simple = new Simplet_CtrlEventoPrevio();
			Simple.Id = base.Id;
			Simple.Name = base.Name;
			Simple.cep_cAlarmaEsperada = this._cep_cAlarmaEsperada;
Simple.cep_cAlarmaPrevia = this._cep_cAlarmaPrevia;
Simple.cep_iHoras = this._cep_iHoras;
Simple.cep_iCategorizacion = this._cep_iCategorizacion;
Simple.cep_cDescripcion = this._cep_cDescripcion;

			return (SimpleBaseObject) Simple;
		}
 ///<summary>
     ///Sets a simpleobject   
     ///</summary>	
		public void SetSimpleObject(Simplet_CtrlEventoPrevio Simple)
		{
			base.Id = Simple.Id;
			base.Name = Simple.Name;
			this._cep_cAlarmaEsperada = Simple.cep_cAlarmaEsperada;
this._cep_cAlarmaPrevia = Simple.cep_cAlarmaPrevia;
this._cep_iHoras = Simple.cep_iHoras;
this._cep_iCategorizacion = Simple.cep_iCategorizacion;
this._cep_cDescripcion = Simple.cep_cDescripcion;

		}
 ///<summary>
     ///Gets a baseobject   
     ///</summary>
		public override BaseObject GetBaseObject(SqlHelper SqlConfig, int UserId)
		{
			return new Dalt_CtrlEventoPrevio(SqlConfig, UserId, (Simplet_CtrlEventoPrevio) GetSimpleObject());
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
               dt.Columns.Add(new DataColumn("cep_cAlarmaEsperada", typeof (string)));               
							 dt.Columns.Add(new DataColumn("cep_cAlarmaPrevia", typeof (string)));               
							 dt.Columns.Add(new DataColumn("cep_iHoras", typeof (int)));               
							 dt.Columns.Add(new DataColumn("cep_iCategorizacion", typeof (int)));               
							 dt.Columns.Add(new DataColumn("cep_cDescripcion", typeof (string)));               
							 										
               //create Row  
               dr = dt.NewRow();
               
               //set Row
							 dr["Id"] = base.Id;

							 dr["Name"] = base.Name;
dr["cep_cAlarmaEsperada"] = this._cep_cAlarmaEsperada;
dr["cep_cAlarmaPrevia"] = this._cep_cAlarmaPrevia;
dr["cep_iHoras"] = this._cep_iHoras;
dr["cep_iCategorizacion"] = this._cep_iCategorizacion;
dr["cep_cDescripcion"] = this._cep_cDescripcion;
							 
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
