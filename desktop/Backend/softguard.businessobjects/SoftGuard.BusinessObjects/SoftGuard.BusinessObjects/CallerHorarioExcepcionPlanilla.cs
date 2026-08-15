
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
    public class CallerHorarioExcepcionPlanilla : CallerObject
    { 	
				     private int _exc_iid;
					
				     private string _exc_cevento;
					
				     private string _exc_cHoraApertura;
					
				     private string _exc_cHoraCierre;
				 ///<summary>
     ///exc_iid property   
     ///</summary>   
     public int exc_iid 
		 { 
		        
                    get{ return this._exc_iid; }
        						set{ this._exc_iid = value; } 										
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
        public CallerHorarioExcepcionPlanilla() : base()
        {
            InitClass();
        }  
 ///<summary>
     ///Constructor   
     ///</summary>		
        public CallerHorarioExcepcionPlanilla(int Id, string Name, int exc_iid, string exc_cevento, string exc_cHoraApertura, string exc_cHoraCierre) : base()
        {
            base.Id = Id;
						base.Name = Name;				 																																					 
				    this._exc_iid = exc_iid;
this._exc_cevento = exc_cevento;
this._exc_cHoraApertura = exc_cHoraApertura;
this._exc_cHoraCierre = exc_cHoraCierre;

            InitClass();
        }  								

				private void InitClass()
        {														
  				  base.Type = new ObjectType(3007, "HorarioExcepcionPlanilla");
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
			SimpleHorarioExcepcionPlanilla Simple = new SimpleHorarioExcepcionPlanilla();
			Simple.Id = base.Id;
			Simple.Name = base.Name;
			Simple.exc_iid = this._exc_iid;
Simple.exc_cevento = this._exc_cevento;
Simple.exc_cHoraApertura = this._exc_cHoraApertura;
Simple.exc_cHoraCierre = this._exc_cHoraCierre;

			return (SimpleBaseObject) Simple;
		}
 ///<summary>
     ///Sets a simpleobject   
     ///</summary>	
		public void SetSimpleObject(SimpleHorarioExcepcionPlanilla Simple)
		{
			base.Id = Simple.Id;
			base.Name = Simple.Name;
			this._exc_iid = Simple.exc_iid;
this._exc_cevento = Simple.exc_cevento;
this._exc_cHoraApertura = Simple.exc_cHoraApertura;
this._exc_cHoraCierre = Simple.exc_cHoraCierre;

		}
 ///<summary>
     ///Gets a baseobject   
     ///</summary>
		public override BaseObject GetBaseObject(SqlHelper SqlConfig, int UserId)
		{
			return new DalHorarioExcepcionPlanilla(SqlConfig, UserId, (SimpleHorarioExcepcionPlanilla) GetSimpleObject());
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
               dt.Columns.Add(new DataColumn("exc_iid", typeof (int)));               
							 dt.Columns.Add(new DataColumn("exc_cevento", typeof (string)));               
							 dt.Columns.Add(new DataColumn("exc_cHoraApertura", typeof (string)));               
							 dt.Columns.Add(new DataColumn("exc_cHoraCierre", typeof (string)));               
							 										
               //create Row  
               dr = dt.NewRow();
               
               //set Row
							 dr["Id"] = base.Id;

							 dr["Name"] = base.Name;
dr["exc_iid"] = this._exc_iid;
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
