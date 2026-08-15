
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
    public class Callerp_encuesta_pregunta : CallerObject
    { 	
				     private int _epg_encidkey;
					
				     private string _epg_name;
					
				     private string _epg_descripcion;
					
				     private int _epg_tipo;
					
				     private int _epg_status;
				 ///<summary>
     ///epg_encidkey property   
     ///</summary>   
     public int epg_encidkey 
		 { 
		        
                    get{ return this._epg_encidkey; }
        						set{ this._epg_encidkey = value; } 										
	   }
	  ///<summary>
     ///epg_name property   
     ///</summary>   
     public string epg_name 
		 { 
		        
                    get{ return this._epg_name; }
        						set{ this._epg_name = value; } 										
	   }
	  ///<summary>
     ///epg_descripcion property   
     ///</summary>   
     public string epg_descripcion 
		 { 
		        
                    get{ return this._epg_descripcion; }
        						set{ this._epg_descripcion = value; } 										
	   }
	  ///<summary>
     ///epg_tipo property   
     ///</summary>   
     public int epg_tipo 
		 { 
		        
                    get{ return this._epg_tipo; }
        						set{ this._epg_tipo = value; } 										
	   }
	  ///<summary>
     ///epg_status property   
     ///</summary>   
     public int epg_status 
		 { 
		        
                    get{ return this._epg_status; }
        						set{ this._epg_status = value; } 										
	   }
	  ///<summary>
     ///Constructor   
     ///</summary>
        public Callerp_encuesta_pregunta() : base()
        {
            InitClass();
        }  
 ///<summary>
     ///Constructor   
     ///</summary>		
        public Callerp_encuesta_pregunta(int Id, string Name, int epg_encidkey, string epg_name, string epg_descripcion, int epg_tipo, int epg_status) : base()
        {
            base.Id = Id;
						base.Name = Name;				 																																					 
				    this._epg_encidkey = epg_encidkey;
this._epg_name = epg_name;
this._epg_descripcion = epg_descripcion;
this._epg_tipo = epg_tipo;
this._epg_status = epg_status;

            InitClass();
        }  								

				private void InitClass()
        {														
  				  base.Type = new ObjectType(3203, "p_encuesta_pregunta");
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
			Simplep_encuesta_pregunta Simple = new Simplep_encuesta_pregunta();
			Simple.Id = base.Id;
			Simple.Name = base.Name;
			Simple.epg_encidkey = this._epg_encidkey;
Simple.epg_name = this._epg_name;
Simple.epg_descripcion = this._epg_descripcion;
Simple.epg_tipo = this._epg_tipo;
Simple.epg_status = this._epg_status;

			return (SimpleBaseObject) Simple;
		}
 ///<summary>
     ///Sets a simpleobject   
     ///</summary>	
		public void SetSimpleObject(Simplep_encuesta_pregunta Simple)
		{
			base.Id = Simple.Id;
			base.Name = Simple.Name;
			this._epg_encidkey = Simple.epg_encidkey;
this._epg_name = Simple.epg_name;
this._epg_descripcion = Simple.epg_descripcion;
this._epg_tipo = Simple.epg_tipo;
this._epg_status = Simple.epg_status;

		}
 ///<summary>
     ///Gets a baseobject   
     ///</summary>
		public override BaseObject GetBaseObject(SqlHelper SqlConfig, int UserId)
		{
			return new Dalp_encuesta_pregunta(SqlConfig, UserId, (Simplep_encuesta_pregunta) GetSimpleObject());
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
               dt.Columns.Add(new DataColumn("epg_encidkey", typeof (int)));               
							 dt.Columns.Add(new DataColumn("epg_name", typeof (string)));               
							 dt.Columns.Add(new DataColumn("epg_descripcion", typeof (string)));               
							 dt.Columns.Add(new DataColumn("epg_tipo", typeof (int)));               
							 dt.Columns.Add(new DataColumn("epg_status", typeof (int)));               
							 										
               //create Row  
               dr = dt.NewRow();
               
               //set Row
							 dr["Id"] = base.Id;

							 dr["Name"] = base.Name;
dr["epg_encidkey"] = this._epg_encidkey;
dr["epg_name"] = this._epg_name;
dr["epg_descripcion"] = this._epg_descripcion;
dr["epg_tipo"] = this._epg_tipo;
dr["epg_status"] = this._epg_status;
							 
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
