
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
    public class Callert_tipos : CallerObject
    { 	
				     private string _tip_ccodigo;
					
				     private string _tip_cdescripcion;
					
				     private string _tip_curlimagen;
					
				     private string _tip_cservicio;
					
				     private int _tip_nTipo;
					
				     private int _tip_nCondicion;
					
				     private string _tip_cRubro;
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
     ///tip_curlimagen property   
     ///</summary>   
     public string tip_curlimagen 
		 { 
		        
                    get{ return this._tip_curlimagen; }
        						set{ this._tip_curlimagen = value; } 										
	   }
	  ///<summary>
     ///tip_cservicio property   
     ///</summary>   
     public string tip_cservicio 
		 { 
		        
                    get{ return this._tip_cservicio; }
        						set{ this._tip_cservicio = value; } 										
	   }
	  ///<summary>
     ///tip_nTipo property   
     ///</summary>   
     public int tip_nTipo 
		 { 
		        
                    get{ return this._tip_nTipo; }
        						set{ this._tip_nTipo = value; } 										
	   }
	  ///<summary>
     ///tip_nCondicion property   
     ///</summary>   
     public int tip_nCondicion 
		 { 
		        
                    get{ return this._tip_nCondicion; }
        						set{ this._tip_nCondicion = value; } 										
	   }
	  ///<summary>
     ///tip_cRubro property   
     ///</summary>   
     public string tip_cRubro 
		 { 
		        
                    get{ return this._tip_cRubro; }
        						set{ this._tip_cRubro = value; } 										
	   }
	  ///<summary>
     ///Constructor   
     ///</summary>
        public Callert_tipos() : base()
        {
            InitClass();
        }  
 ///<summary>
     ///Constructor   
     ///</summary>		
        public Callert_tipos(int Id, string Name, string tip_ccodigo, string tip_cdescripcion, string tip_curlimagen, string tip_cservicio, int tip_nTipo, int tip_nCondicion, string tip_cRubro) : base()
        {
            base.Id = Id;
						base.Name = Name;				 																																					 
				    this._tip_ccodigo = tip_ccodigo;
this._tip_cdescripcion = tip_cdescripcion;
this._tip_curlimagen = tip_curlimagen;
this._tip_cservicio = tip_cservicio;
this._tip_nTipo = tip_nTipo;
this._tip_nCondicion = tip_nCondicion;
this._tip_cRubro = tip_cRubro;

            InitClass();
        }  								

				private void InitClass()
        {														
  				  base.Type = new ObjectType(3070, "t_tipos");
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
			Simplet_tipos Simple = new Simplet_tipos();
			Simple.Id = base.Id;
			Simple.Name = base.Name;
			Simple.tip_ccodigo = this._tip_ccodigo;
Simple.tip_cdescripcion = this._tip_cdescripcion;
Simple.tip_curlimagen = this._tip_curlimagen;
Simple.tip_cservicio = this._tip_cservicio;
Simple.tip_nTipo = this._tip_nTipo;
Simple.tip_nCondicion = this._tip_nCondicion;
Simple.tip_cRubro = this._tip_cRubro;

			return (SimpleBaseObject) Simple;
		}
 ///<summary>
     ///Sets a simpleobject   
     ///</summary>	
		public void SetSimpleObject(Simplet_tipos Simple)
		{
			base.Id = Simple.Id;
			base.Name = Simple.Name;
			this._tip_ccodigo = Simple.tip_ccodigo;
this._tip_cdescripcion = Simple.tip_cdescripcion;
this._tip_curlimagen = Simple.tip_curlimagen;
this._tip_cservicio = Simple.tip_cservicio;
this._tip_nTipo = Simple.tip_nTipo;
this._tip_nCondicion = Simple.tip_nCondicion;
this._tip_cRubro = Simple.tip_cRubro;

		}
 ///<summary>
     ///Gets a baseobject   
     ///</summary>
		public override BaseObject GetBaseObject(SqlHelper SqlConfig, int UserId)
		{
			return new Dalt_tipos(SqlConfig, UserId, (Simplet_tipos) GetSimpleObject());
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
							 dt.Columns.Add(new DataColumn("tip_curlimagen", typeof (string)));               
							 dt.Columns.Add(new DataColumn("tip_cservicio", typeof (string)));               
							 dt.Columns.Add(new DataColumn("tip_nTipo", typeof (int)));               
							 dt.Columns.Add(new DataColumn("tip_nCondicion", typeof (int)));               
							 dt.Columns.Add(new DataColumn("tip_cRubro", typeof (string)));               
							 										
               //create Row  
               dr = dt.NewRow();
               
               //set Row
							 dr["Id"] = base.Id;

							 dr["Name"] = base.Name;
dr["tip_ccodigo"] = this._tip_ccodigo;
dr["tip_cdescripcion"] = this._tip_cdescripcion;
dr["tip_curlimagen"] = this._tip_curlimagen;
dr["tip_cservicio"] = this._tip_cservicio;
dr["tip_nTipo"] = this._tip_nTipo;
dr["tip_nCondicion"] = this._tip_nCondicion;
dr["tip_cRubro"] = this._tip_cRubro;
							 
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
