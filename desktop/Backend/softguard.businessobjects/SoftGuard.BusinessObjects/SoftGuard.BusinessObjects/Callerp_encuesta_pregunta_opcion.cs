
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
    public class Callerp_encuesta_pregunta_opcion : CallerObject
    { 	
				     private int _epo_epgidkey;
					
				     private string _epo_name;
					
				     private string _epo_descripcion;
					
				     private int _epo_status;
					
				     private int _epo_tipo;
					
				     private string _epo_values;
				 ///<summary>
     ///epo_epgidkey property   
     ///</summary>   
     public int epo_epgidkey 
		 { 
		        
                    get{ return this._epo_epgidkey; }
        						set{ this._epo_epgidkey = value; } 										
	   }
	  ///<summary>
     ///epo_name property   
     ///</summary>   
     public string epo_name 
		 { 
		        
                    get{ return this._epo_name; }
        						set{ this._epo_name = value; } 										
	   }
	  ///<summary>
     ///epo_descripcion property   
     ///</summary>   
     public string epo_descripcion 
		 { 
		        
                    get{ return this._epo_descripcion; }
        						set{ this._epo_descripcion = value; } 										
	   }
	  ///<summary>
     ///epo_status property   
     ///</summary>   
     public int epo_status 
		 { 
		        
                    get{ return this._epo_status; }
        						set{ this._epo_status = value; } 										
	   }
	  ///<summary>
     ///epo_tipo property   
     ///</summary>   
     public int epo_tipo 
		 { 
		        
                    get{ return this._epo_tipo; }
        						set{ this._epo_tipo = value; } 										
	   }
	  ///<summary>
     ///epo_values property   
     ///</summary>   
     public string epo_values 
		 { 
		        
                    get{ return this._epo_values; }
        						set{ this._epo_values = value; } 										
	   }
	  ///<summary>
     ///Constructor   
     ///</summary>
        public Callerp_encuesta_pregunta_opcion() : base()
        {
            InitClass();
        }  
 ///<summary>
     ///Constructor   
     ///</summary>		
        public Callerp_encuesta_pregunta_opcion(int Id, string Name, int epo_epgidkey, string epo_name, string epo_descripcion, int epo_status, int epo_tipo, string epo_values) : base()
        {
            base.Id = Id;
						base.Name = Name;				 																																					 
				    this._epo_epgidkey = epo_epgidkey;
this._epo_name = epo_name;
this._epo_descripcion = epo_descripcion;
this._epo_status = epo_status;
this._epo_tipo = epo_tipo;
this._epo_values = epo_values;

            InitClass();
        }  								

				private void InitClass()
        {														
  				  base.Type = new ObjectType(3204, "p_encuesta_pregunta_opcion");
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
			Simplep_encuesta_pregunta_opcion Simple = new Simplep_encuesta_pregunta_opcion();
			Simple.Id = base.Id;
			Simple.Name = base.Name;
			Simple.epo_epgidkey = this._epo_epgidkey;
Simple.epo_name = this._epo_name;
Simple.epo_descripcion = this._epo_descripcion;
Simple.epo_status = this._epo_status;
Simple.epo_tipo = this._epo_tipo;
Simple.epo_values = this._epo_values;

			return (SimpleBaseObject) Simple;
		}
 ///<summary>
     ///Sets a simpleobject   
     ///</summary>	
		public void SetSimpleObject(Simplep_encuesta_pregunta_opcion Simple)
		{
			base.Id = Simple.Id;
			base.Name = Simple.Name;
			this._epo_epgidkey = Simple.epo_epgidkey;
this._epo_name = Simple.epo_name;
this._epo_descripcion = Simple.epo_descripcion;
this._epo_status = Simple.epo_status;
this._epo_tipo = Simple.epo_tipo;
this._epo_values = Simple.epo_values;

		}
 ///<summary>
     ///Gets a baseobject   
     ///</summary>
		public override BaseObject GetBaseObject(SqlHelper SqlConfig, int UserId)
		{
			return new Dalp_encuesta_pregunta_opcion(SqlConfig, UserId, (Simplep_encuesta_pregunta_opcion) GetSimpleObject());
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
               dt.Columns.Add(new DataColumn("epo_epgidkey", typeof (int)));               
							 dt.Columns.Add(new DataColumn("epo_name", typeof (string)));               
							 dt.Columns.Add(new DataColumn("epo_descripcion", typeof (string)));               
							 dt.Columns.Add(new DataColumn("epo_status", typeof (int)));               
							 dt.Columns.Add(new DataColumn("epo_tipo", typeof (int)));               
							 dt.Columns.Add(new DataColumn("epo_values", typeof (string)));               
							 										
               //create Row  
               dr = dt.NewRow();
               
               //set Row
							 dr["Id"] = base.Id;

							 dr["Name"] = base.Name;
dr["epo_epgidkey"] = this._epo_epgidkey;
dr["epo_name"] = this._epo_name;
dr["epo_descripcion"] = this._epo_descripcion;
dr["epo_status"] = this._epo_status;
dr["epo_tipo"] = this._epo_tipo;
dr["epo_values"] = this._epo_values;
							 
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
