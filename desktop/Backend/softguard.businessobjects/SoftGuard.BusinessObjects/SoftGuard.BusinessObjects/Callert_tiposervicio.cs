
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
    public class Callert_tiposervicio : CallerObject
    { 	
				     private string _tip_ccodigo;
					
				     private string _tip_cdescripcion;
					
				     private Decimal _tip_yvalor;
					
				     private Decimal _tip_ndias;
					
				     private Decimal _tip_nvto;
					
				     private Decimal _tip_ntipo;
					
				     private string _tip_cEventos;
				 ///<summary>
     ///tip_ccodigo property   
     ///</summary>   
     public string tip_ccodigo 
		 { 
		        
                    get{ return this._tip_ccodigo; }
        						set{ this._tip_ccodigo = value; } 										
	   }
	  ///<summary>
     ///tip_cdescripcion property   
     ///</summary>   
     public string tip_cdescripcion 
		 { 
		        
                    get{ return this._tip_cdescripcion; }
        						set{ this._tip_cdescripcion = value; } 										
	   }
	  ///<summary>
     ///tip_yvalor property   
     ///</summary>   
     public Decimal tip_yvalor 
		 { 
		        
                    get{ return this._tip_yvalor; }
        						set{ this._tip_yvalor = value; } 										
	   }
	  ///<summary>
     ///tip_ndias property   
     ///</summary>   
     public Decimal tip_ndias 
		 { 
		        
                    get{ return this._tip_ndias; }
        						set{ this._tip_ndias = value; } 										
	   }
	  ///<summary>
     ///tip_nvto property   
     ///</summary>   
     public Decimal tip_nvto 
		 { 
		        
                    get{ return this._tip_nvto; }
        						set{ this._tip_nvto = value; } 										
	   }
	  ///<summary>
     ///tip_ntipo property   
     ///</summary>   
     public Decimal tip_ntipo 
		 { 
		        
                    get{ return this._tip_ntipo; }
        						set{ this._tip_ntipo = value; } 										
	   }
	  ///<summary>
     ///tip_cEventos property   
     ///</summary>   
     public string tip_cEventos 
		 { 
		        
                    get{ return this._tip_cEventos; }
        						set{ this._tip_cEventos = value; } 										
	   }
	  ///<summary>
     ///Constructor   
     ///</summary>
        public Callert_tiposervicio() : base()
        {
            InitClass();
        }  
 ///<summary>
     ///Constructor   
     ///</summary>		
        public Callert_tiposervicio(int Id, string Name, string tip_ccodigo, string tip_cdescripcion, Decimal tip_yvalor, Decimal tip_ndias, Decimal tip_nvto, Decimal tip_ntipo, string tip_cEventos) : base()
        {
            base.Id = Id;
						base.Name = Name;				 																																					 
				    this._tip_ccodigo = tip_ccodigo;
this._tip_cdescripcion = tip_cdescripcion;
this._tip_yvalor = tip_yvalor;
this._tip_ndias = tip_ndias;
this._tip_nvto = tip_nvto;
this._tip_ntipo = tip_ntipo;
this._tip_cEventos = tip_cEventos;

            InitClass();
        }  								

				private void InitClass()
        {														
  				  base.Type = new ObjectType(3030, "t_tiposervicio");
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
			Simplet_tiposervicio Simple = new Simplet_tiposervicio();
			Simple.Id = base.Id;
			Simple.Name = base.Name;
			Simple.tip_ccodigo = this._tip_ccodigo;
Simple.tip_cdescripcion = this._tip_cdescripcion;
Simple.tip_yvalor = this._tip_yvalor;
Simple.tip_ndias = this._tip_ndias;
Simple.tip_nvto = this._tip_nvto;
Simple.tip_ntipo = this._tip_ntipo;
Simple.tip_cEventos = this._tip_cEventos;

			return (SimpleBaseObject) Simple;
		}
 ///<summary>
     ///Sets a simpleobject   
     ///</summary>	
		public void SetSimpleObject(Simplet_tiposervicio Simple)
		{
			base.Id = Simple.Id;
			base.Name = Simple.Name;
			this._tip_ccodigo = Simple.tip_ccodigo;
this._tip_cdescripcion = Simple.tip_cdescripcion;
this._tip_yvalor = Simple.tip_yvalor;
this._tip_ndias = Simple.tip_ndias;
this._tip_nvto = Simple.tip_nvto;
this._tip_ntipo = Simple.tip_ntipo;
this._tip_cEventos = Simple.tip_cEventos;

		}
 ///<summary>
     ///Gets a baseobject   
     ///</summary>
		public override BaseObject GetBaseObject(SqlHelper SqlConfig, int UserId)
		{
			return new Dalt_tiposervicio(SqlConfig, UserId, (Simplet_tiposervicio) GetSimpleObject());
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
               dt.Columns.Add(new DataColumn("tip_ccodigo", typeof (string)));               
							 dt.Columns.Add(new DataColumn("tip_cdescripcion", typeof (string)));               
							 dt.Columns.Add(new DataColumn("tip_yvalor", typeof (Decimal)));               
							 dt.Columns.Add(new DataColumn("tip_ndias", typeof (Decimal)));               
							 dt.Columns.Add(new DataColumn("tip_nvto", typeof (Decimal)));               
							 dt.Columns.Add(new DataColumn("tip_ntipo", typeof (Decimal)));               
							 dt.Columns.Add(new DataColumn("tip_cEventos", typeof (string)));               
							 										
               //create Row  
               dr = dt.NewRow();
               
               //set Row
							 dr["Id"] = base.Id;

							 dr["Name"] = base.Name;
dr["tip_ccodigo"] = this._tip_ccodigo;
dr["tip_cdescripcion"] = this._tip_cdescripcion;
dr["tip_yvalor"] = this._tip_yvalor;
dr["tip_ndias"] = this._tip_ndias;
dr["tip_nvto"] = this._tip_nvto;
dr["tip_ntipo"] = this._tip_ntipo;
dr["tip_cEventos"] = this._tip_cEventos;
							 
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
