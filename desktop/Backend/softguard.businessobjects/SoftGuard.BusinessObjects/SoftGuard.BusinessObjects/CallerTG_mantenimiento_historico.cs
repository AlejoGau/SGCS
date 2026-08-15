
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
    public class CallerTG_mantenimiento_historico : CallerObject
    { 	
				     private int _tgmh_idservicio;
					
				     private string _tgmh_cdescripcion;
					
				     private int _tgmh_iodometro;
					
				     private int _tgmh_idispositivomovil;
					
				     private DateTime? _tgmh_dfecha;
				 ///<summary>
     ///tgmh_idservicio property   
     ///</summary>   
     public int tgmh_idservicio 
		 { 
		        
                    get{ return this._tgmh_idservicio; }
        						set{ this._tgmh_idservicio = value; } 										
	   }
	  ///<summary>
     ///tgmh_cdescripcion property   
     ///</summary>   
     public string tgmh_cdescripcion 
		 { 
		        
                    get{ return this._tgmh_cdescripcion; }
        						set{ this._tgmh_cdescripcion = value; } 										
	   }
	  ///<summary>
     ///tgmh_iodometro property   
     ///</summary>   
     public int tgmh_iodometro 
		 { 
		        
                    get{ return this._tgmh_iodometro; }
        						set{ this._tgmh_iodometro = value; } 										
	   }
	  ///<summary>
     ///tgmh_idispositivomovil property   
     ///</summary>   
     public int tgmh_idispositivomovil 
		 { 
		        
                    get{ return this._tgmh_idispositivomovil; }
        						set{ this._tgmh_idispositivomovil = value; } 										
	   }
	  ///<summary>
     ///tgmh_dfecha property   
     ///</summary>   
     public DateTime? tgmh_dfecha 
		 { 
		        
                    get{ return this._tgmh_dfecha; }
        						set{ this._tgmh_dfecha = value; } 										
	   }
	  ///<summary>
     ///Constructor   
     ///</summary>
        public CallerTG_mantenimiento_historico() : base()
        {
            InitClass();
        }  
 ///<summary>
     ///Constructor   
     ///</summary>		
        public CallerTG_mantenimiento_historico(int Id, string Name, int tgmh_idservicio, string tgmh_cdescripcion, int tgmh_iodometro, int tgmh_idispositivomovil, DateTime? tgmh_dfecha) : base()
        {
            base.Id = Id;
						base.Name = Name;				 																																					 
				    this._tgmh_idservicio = tgmh_idservicio;
this._tgmh_cdescripcion = tgmh_cdescripcion;
this._tgmh_iodometro = tgmh_iodometro;
this._tgmh_idispositivomovil = tgmh_idispositivomovil;
this._tgmh_dfecha = tgmh_dfecha;

            InitClass();
        }  								

				private void InitClass()
        {														
  				  base.Type = new ObjectType(3188, "TG_mantenimiento_historico");
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
			SimpleTG_mantenimiento_historico Simple = new SimpleTG_mantenimiento_historico();
			Simple.Id = base.Id;
			Simple.Name = base.Name;
			Simple.tgmh_idservicio = this._tgmh_idservicio;
Simple.tgmh_cdescripcion = this._tgmh_cdescripcion;
Simple.tgmh_iodometro = this._tgmh_iodometro;
Simple.tgmh_idispositivomovil = this._tgmh_idispositivomovil;
Simple.tgmh_dfecha = this._tgmh_dfecha;

			return (SimpleBaseObject) Simple;
		}
 ///<summary>
     ///Sets a simpleobject   
     ///</summary>	
		public void SetSimpleObject(SimpleTG_mantenimiento_historico Simple)
		{
			base.Id = Simple.Id;
			base.Name = Simple.Name;
			this._tgmh_idservicio = Simple.tgmh_idservicio;
this._tgmh_cdescripcion = Simple.tgmh_cdescripcion;
this._tgmh_iodometro = Simple.tgmh_iodometro;
this._tgmh_idispositivomovil = Simple.tgmh_idispositivomovil;
this._tgmh_dfecha = Simple.tgmh_dfecha;

		}
 ///<summary>
     ///Gets a baseobject   
     ///</summary>
		public override BaseObject GetBaseObject(SqlHelper SqlConfig, int UserId)
		{
			return new DalTG_mantenimiento_historico(SqlConfig, UserId, (SimpleTG_mantenimiento_historico) GetSimpleObject());
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
               dt.Columns.Add(new DataColumn("tgmh_idservicio", typeof (int)));               
							 dt.Columns.Add(new DataColumn("tgmh_cdescripcion", typeof (string)));               
							 dt.Columns.Add(new DataColumn("tgmh_iodometro", typeof (int)));               
							 dt.Columns.Add(new DataColumn("tgmh_idispositivomovil", typeof (int)));               
							 dt.Columns.Add(new DataColumn("tgmh_dfecha", typeof (DateTime)));               
							 										
               //create Row  
               dr = dt.NewRow();
               
               //set Row
							 dr["Id"] = base.Id;

							 dr["Name"] = base.Name;
dr["tgmh_idservicio"] = this._tgmh_idservicio;
dr["tgmh_cdescripcion"] = this._tgmh_cdescripcion;
dr["tgmh_iodometro"] = this._tgmh_iodometro;
dr["tgmh_idispositivomovil"] = this._tgmh_idispositivomovil;
dr["tgmh_dfecha"] = this._tgmh_dfecha;
							 
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
