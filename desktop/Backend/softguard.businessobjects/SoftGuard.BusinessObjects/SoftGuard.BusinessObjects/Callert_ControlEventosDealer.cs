
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
    public class Callert_ControlEventosDealer : CallerObject
    { 	
				     private string _ced_cDealer;
					
				     private string _ced_cDescripcion;
					
				     private string _ced_cAlarmaControl;
					
				     private string _ced_cAlarmaEsperada;
					
				     private int _ced_iMinutos;
					
				     private string _ced_cAlarmaGenerar;
				 ///<summary>
     ///ced_cDealer property   
     ///</summary>   
     public string ced_cDealer 
		 { 
		        
                    get{ return this._ced_cDealer; }
        						set{ this._ced_cDealer = value; } 										
	   }
	  ///<summary>
     ///ced_cDescripcion property   
     ///</summary>   
     public string ced_cDescripcion 
		 { 
		        
                    get{ return this._ced_cDescripcion; }
        						set{ this._ced_cDescripcion = value; } 										
	   }
	  ///<summary>
     ///ced_cAlarmaControl property   
     ///</summary>   
     public string ced_cAlarmaControl 
		 { 
		        
                    get{ return this._ced_cAlarmaControl; }
        						set{ this._ced_cAlarmaControl = value; } 										
	   }
	  ///<summary>
     ///ced_cAlarmaEsperada property   
     ///</summary>   
     public string ced_cAlarmaEsperada 
		 { 
		        
                    get{ return this._ced_cAlarmaEsperada; }
        						set{ this._ced_cAlarmaEsperada = value; } 										
	   }
	  ///<summary>
     ///ced_iMinutos property   
     ///</summary>   
     public int ced_iMinutos 
		 { 
		        
                    get{ return this._ced_iMinutos; }
        						set{ this._ced_iMinutos = value; } 										
	   }
	  ///<summary>
     ///ced_cAlarmaGenerar property   
     ///</summary>   
     public string ced_cAlarmaGenerar 
		 { 
		        
                    get{ return this._ced_cAlarmaGenerar; }
        						set{ this._ced_cAlarmaGenerar = value; } 										
	   }
	  ///<summary>
     ///Constructor   
     ///</summary>
        public Callert_ControlEventosDealer() : base()
        {
            InitClass();
        }  
 ///<summary>
     ///Constructor   
     ///</summary>		
        public Callert_ControlEventosDealer(int Id, string Name, string ced_cDealer, string ced_cDescripcion, string ced_cAlarmaControl, string ced_cAlarmaEsperada, int ced_iMinutos, string ced_cAlarmaGenerar) : base()
        {
            base.Id = Id;
						base.Name = Name;				 																																					 
				    this._ced_cDealer = ced_cDealer;
this._ced_cDescripcion = ced_cDescripcion;
this._ced_cAlarmaControl = ced_cAlarmaControl;
this._ced_cAlarmaEsperada = ced_cAlarmaEsperada;
this._ced_iMinutos = ced_iMinutos;
this._ced_cAlarmaGenerar = ced_cAlarmaGenerar;

            InitClass();
        }  								

				private void InitClass()
        {														
  				  base.Type = new ObjectType(7052, "t_ControlEventosDealer");
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
			Simplet_ControlEventosDealer Simple = new Simplet_ControlEventosDealer();
			Simple.Id = base.Id;
			Simple.Name = base.Name;
			Simple.ced_cDealer = this._ced_cDealer;
Simple.ced_cDescripcion = this._ced_cDescripcion;
Simple.ced_cAlarmaControl = this._ced_cAlarmaControl;
Simple.ced_cAlarmaEsperada = this._ced_cAlarmaEsperada;
Simple.ced_iMinutos = this._ced_iMinutos;
Simple.ced_cAlarmaGenerar = this._ced_cAlarmaGenerar;

			return (SimpleBaseObject) Simple;
		}
 ///<summary>
     ///Sets a simpleobject   
     ///</summary>	
		public void SetSimpleObject(Simplet_ControlEventosDealer Simple)
		{
			base.Id = Simple.Id;
			base.Name = Simple.Name;
			this._ced_cDealer = Simple.ced_cDealer;
this._ced_cDescripcion = Simple.ced_cDescripcion;
this._ced_cAlarmaControl = Simple.ced_cAlarmaControl;
this._ced_cAlarmaEsperada = Simple.ced_cAlarmaEsperada;
this._ced_iMinutos = Simple.ced_iMinutos;
this._ced_cAlarmaGenerar = Simple.ced_cAlarmaGenerar;

		}
 ///<summary>
     ///Gets a baseobject   
     ///</summary>
		public override BaseObject GetBaseObject(SqlHelper SqlConfig, int UserId)
		{
			return new Dalt_ControlEventosDealer(SqlConfig, UserId, (Simplet_ControlEventosDealer) GetSimpleObject());
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
               dt.Columns.Add(new DataColumn("ced_cDealer", typeof (string)));               
							 dt.Columns.Add(new DataColumn("ced_cDescripcion", typeof (string)));               
							 dt.Columns.Add(new DataColumn("ced_cAlarmaControl", typeof (string)));               
							 dt.Columns.Add(new DataColumn("ced_cAlarmaEsperada", typeof (string)));               
							 dt.Columns.Add(new DataColumn("ced_iMinutos", typeof (int)));               
							 dt.Columns.Add(new DataColumn("ced_cAlarmaGenerar", typeof (string)));               
							 										
               //create Row  
               dr = dt.NewRow();
               
               //set Row
							 dr["Id"] = base.Id;

							 dr["Name"] = base.Name;
dr["ced_cDealer"] = this._ced_cDealer;
dr["ced_cDescripcion"] = this._ced_cDescripcion;
dr["ced_cAlarmaControl"] = this._ced_cAlarmaControl;
dr["ced_cAlarmaEsperada"] = this._ced_cAlarmaEsperada;
dr["ced_iMinutos"] = this._ced_iMinutos;
dr["ced_cAlarmaGenerar"] = this._ced_cAlarmaGenerar;
							 
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
