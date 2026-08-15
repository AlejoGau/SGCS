
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
    public class CallerHorarioExcepcion : CallerObject
    { 	
				     private int _exc_iidcuenta;
					
				     private string _exc_cevento;
					
				     private string _exc_cHoraApertura;
					
				     private string _exc_cHoraCierre;
				 ///<summary>
     ///exc_iidcuenta property   
     ///</summary>   
     public int exc_iidcuenta 
		 { 
		        
                    get{ return this._exc_iidcuenta; }
        						set{ this._exc_iidcuenta = value; } 										
	   }
	  ///<summary>
     ///exc_cevento property   
     ///</summary>   
     public string exc_cevento 
		 { 
		        
                    get{ return this._exc_cevento; }
        						set{ this._exc_cevento = value; } 										
	   }
	  ///<summary>
     ///exc_cHoraApertura property   
     ///</summary>   
     public string exc_cHoraApertura 
		 { 
		        
                    get{ return this._exc_cHoraApertura; }
        						set{ this._exc_cHoraApertura = value; } 										
	   }
	  ///<summary>
     ///exc_cHoraCierre property   
     ///</summary>   
     public string exc_cHoraCierre 
		 { 
		        
                    get{ return this._exc_cHoraCierre; }
        						set{ this._exc_cHoraCierre = value; } 										
	   }
	  ///<summary>
     ///Constructor   
     ///</summary>
        public CallerHorarioExcepcion() : base()
        {
            InitClass();
        }  
 ///<summary>
     ///Constructor   
     ///</summary>		
        public CallerHorarioExcepcion(int Id, string Name, int exc_iidcuenta, string exc_cevento, string exc_cHoraApertura, string exc_cHoraCierre) : base()
        {
            base.Id = Id;
						base.Name = Name;				 																																					 
				    this._exc_iidcuenta = exc_iidcuenta;
this._exc_cevento = exc_cevento;
this._exc_cHoraApertura = exc_cHoraApertura;
this._exc_cHoraCierre = exc_cHoraCierre;

            InitClass();
        }  								

				private void InitClass()
        {														
  				  base.Type = new ObjectType(3006, "HorarioExcepcion");
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
			SimpleHorarioExcepcion Simple = new SimpleHorarioExcepcion();
			Simple.Id = base.Id;
			Simple.Name = base.Name;
			Simple.exc_iidcuenta = this._exc_iidcuenta;
Simple.exc_cevento = this._exc_cevento;
Simple.exc_cHoraApertura = this._exc_cHoraApertura;
Simple.exc_cHoraCierre = this._exc_cHoraCierre;

			return (SimpleBaseObject) Simple;
		}
 ///<summary>
     ///Sets a simpleobject   
     ///</summary>	
		public void SetSimpleObject(SimpleHorarioExcepcion Simple)
		{
			base.Id = Simple.Id;
			base.Name = Simple.Name;
			this._exc_iidcuenta = Simple.exc_iidcuenta;
this._exc_cevento = Simple.exc_cevento;
this._exc_cHoraApertura = Simple.exc_cHoraApertura;
this._exc_cHoraCierre = Simple.exc_cHoraCierre;

		}
 ///<summary>
     ///Gets a baseobject   
     ///</summary>
		public override BaseObject GetBaseObject(SqlHelper SqlConfig, int UserId)
		{
			return new DalHorarioExcepcion(SqlConfig, UserId, (SimpleHorarioExcepcion) GetSimpleObject());
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
               dt.Columns.Add(new DataColumn("exc_iidcuenta", typeof (int)));               
							 dt.Columns.Add(new DataColumn("exc_cevento", typeof (string)));               
							 dt.Columns.Add(new DataColumn("exc_cHoraApertura", typeof (string)));               
							 dt.Columns.Add(new DataColumn("exc_cHoraCierre", typeof (string)));               
							 										
               //create Row  
               dr = dt.NewRow();
               
               //set Row
							 dr["Id"] = base.Id;

							 dr["Name"] = base.Name;
dr["exc_iidcuenta"] = this._exc_iidcuenta;
dr["exc_cevento"] = this._exc_cevento;
dr["exc_cHoraApertura"] = this._exc_cHoraApertura;
dr["exc_cHoraCierre"] = this._exc_cHoraCierre;
							 
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
