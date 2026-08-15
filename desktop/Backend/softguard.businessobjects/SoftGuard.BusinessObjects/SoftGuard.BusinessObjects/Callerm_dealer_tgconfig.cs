
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
    public class Callerm_dealer_tgconfig : CallerObject
    { 	
				     private string _dtg_cdealer;
					
				     private string _dtg_config;
					
				     private int _dtg_parking_velocidad;
					
				     private string _dtg_parking_eventos;
					
				     private string _dtg_parking_eventos_hide;
				 ///<summary>
     ///dtg_cdealer property   
     ///</summary>   
     public string dtg_cdealer 
		 { 
		        
                    get{ return this._dtg_cdealer; }
        						set{ this._dtg_cdealer = value; } 										
	   }
	  ///<summary>
     ///dtg_config property   
     ///</summary>   
     public string dtg_config 
		 { 
		        
                    get{ return this._dtg_config; }
        						set{ this._dtg_config = value; } 										
	   }
	  ///<summary>
     ///dtg_parking_velocidad property   
     ///</summary>   
     public int dtg_parking_velocidad 
		 { 
		        
                    get{ return this._dtg_parking_velocidad; }
        						set{ this._dtg_parking_velocidad = value; } 										
	   }
	  ///<summary>
     ///dtg_parking_eventos property   
     ///</summary>   
     public string dtg_parking_eventos 
		 { 
		        
                    get{ return this._dtg_parking_eventos; }
        						set{ this._dtg_parking_eventos = value; } 										
	   }
	  ///<summary>
     ///dtg_parking_eventos_hide property   
     ///</summary>   
     public string dtg_parking_eventos_hide 
		 { 
		        
                    get{ return this._dtg_parking_eventos_hide; }
        						set{ this._dtg_parking_eventos_hide = value; } 										
	   }
	  ///<summary>
     ///Constructor   
     ///</summary>
        public Callerm_dealer_tgconfig() : base()
        {
            InitClass();
        }  
 ///<summary>
     ///Constructor   
     ///</summary>		
        public Callerm_dealer_tgconfig(int Id, string Name, string dtg_cdealer, string dtg_config, int dtg_parking_velocidad, string dtg_parking_eventos, string dtg_parking_eventos_hide) : base()
        {
            base.Id = Id;
						base.Name = Name;				 																																					 
				    this._dtg_cdealer = dtg_cdealer;
this._dtg_config = dtg_config;
this._dtg_parking_velocidad = dtg_parking_velocidad;
this._dtg_parking_eventos = dtg_parking_eventos;
this._dtg_parking_eventos_hide = dtg_parking_eventos_hide;

            InitClass();
        }  								

				private void InitClass()
        {														
  				  base.Type = new ObjectType(3225, "m_dealer_tgconfig");
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
			Simplem_dealer_tgconfig Simple = new Simplem_dealer_tgconfig();
			Simple.Id = base.Id;
			Simple.Name = base.Name;
			Simple.dtg_cdealer = this._dtg_cdealer;
Simple.dtg_config = this._dtg_config;
Simple.dtg_parking_velocidad = this._dtg_parking_velocidad;
Simple.dtg_parking_eventos = this._dtg_parking_eventos;
Simple.dtg_parking_eventos_hide = this._dtg_parking_eventos_hide;

			return (SimpleBaseObject) Simple;
		}
 ///<summary>
     ///Sets a simpleobject   
     ///</summary>	
		public void SetSimpleObject(Simplem_dealer_tgconfig Simple)
		{
			base.Id = Simple.Id;
			base.Name = Simple.Name;
			this._dtg_cdealer = Simple.dtg_cdealer;
this._dtg_config = Simple.dtg_config;
this._dtg_parking_velocidad = Simple.dtg_parking_velocidad;
this._dtg_parking_eventos = Simple.dtg_parking_eventos;
this._dtg_parking_eventos_hide = Simple.dtg_parking_eventos_hide;

		}
 ///<summary>
     ///Gets a baseobject   
     ///</summary>
		public override BaseObject GetBaseObject(SqlHelper SqlConfig, int UserId)
		{
			return new Dalm_dealer_tgconfig(SqlConfig, UserId, (Simplem_dealer_tgconfig) GetSimpleObject());
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
               dt.Columns.Add(new DataColumn("dtg_cdealer", typeof (string)));               
							 dt.Columns.Add(new DataColumn("dtg_config", typeof (string)));               
							 dt.Columns.Add(new DataColumn("dtg_parking_velocidad", typeof (int)));               
							 dt.Columns.Add(new DataColumn("dtg_parking_eventos", typeof (string)));               
							 dt.Columns.Add(new DataColumn("dtg_parking_eventos_hide", typeof (string)));               
							 										
               //create Row  
               dr = dt.NewRow();
               
               //set Row
							 dr["Id"] = base.Id;

							 dr["Name"] = base.Name;
dr["dtg_cdealer"] = this._dtg_cdealer;
dr["dtg_config"] = this._dtg_config;
dr["dtg_parking_velocidad"] = this._dtg_parking_velocidad;
dr["dtg_parking_eventos"] = this._dtg_parking_eventos;
dr["dtg_parking_eventos_hide"] = this._dtg_parking_eventos_hide;
							 
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
