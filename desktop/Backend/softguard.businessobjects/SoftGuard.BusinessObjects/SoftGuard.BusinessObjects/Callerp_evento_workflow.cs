
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
    public class Callerp_evento_workflow : CallerObject
    { 	
				     private string _pew_proceso_estados;
					
				     private string _pew_name;
					
				     private string _pew_evento_estados;
					
				     private string _pew_dealers;
					
				     private string _pew_codalarmas;
					
				     private int _pew_codalarmagrupo;
					
				     private string _pew_sql;
					
				     private string _pew_config;
					
				     private string _pew_form_config;
				 ///<summary>
     ///pew_proceso_estados property   
     ///</summary>   
     public string pew_proceso_estados 
		 { 
		        
                    get{ return this._pew_proceso_estados; }
        						set{ this._pew_proceso_estados = value; } 										
	   }
	  ///<summary>
     ///pew_name property   
     ///</summary>   
     public string pew_name 
		 { 
		        
                    get{ return this._pew_name; }
        						set{ this._pew_name = value; } 										
	   }
	  ///<summary>
     ///pew_evento_estados property   
     ///</summary>   
     public string pew_evento_estados 
		 { 
		        
                    get{ return this._pew_evento_estados; }
        						set{ this._pew_evento_estados = value; } 										
	   }
	  ///<summary>
     ///pew_dealers property   
     ///</summary>   
     public string pew_dealers 
		 { 
		        
                    get{ return this._pew_dealers; }
        						set{ this._pew_dealers = value; } 										
	   }
	  ///<summary>
     ///pew_codalarmas property   
     ///</summary>   
     public string pew_codalarmas 
		 { 
		        
                    get{ return this._pew_codalarmas; }
        						set{ this._pew_codalarmas = value; } 										
	   }
	  ///<summary>
     ///pew_codalarmagrupo property   
     ///</summary>   
     public int pew_codalarmagrupo 
		 { 
		        
                    get{ return this._pew_codalarmagrupo; }
        						set{ this._pew_codalarmagrupo = value; } 										
	   }
	  ///<summary>
     ///pew_sql property   
     ///</summary>   
     public string pew_sql 
		 { 
		        
                    get{ return this._pew_sql; }
        						set{ this._pew_sql = value; } 										
	   }
	  ///<summary>
     ///pew_config property   
     ///</summary>   
     public string pew_config 
		 { 
		        
                    get{ return this._pew_config; }
        						set{ this._pew_config = value; } 										
	   }
	  ///<summary>
     ///pew_form_config property   
     ///</summary>   
     public string pew_form_config 
		 { 
		        
                    get{ return this._pew_form_config; }
        						set{ this._pew_form_config = value; } 										
	   }
	  ///<summary>
     ///Constructor   
     ///</summary>
        public Callerp_evento_workflow() : base()
        {
            InitClass();
        }  
 ///<summary>
     ///Constructor   
     ///</summary>		
        public Callerp_evento_workflow(int Id, string Name, string pew_proceso_estados, string pew_name, string pew_evento_estados, string pew_dealers, string pew_codalarmas, int pew_codalarmagrupo, string pew_sql, string pew_config, string pew_form_config) : base()
        {
            base.Id = Id;
						base.Name = Name;				 																																					 
				    this._pew_proceso_estados = pew_proceso_estados;
this._pew_name = pew_name;
this._pew_evento_estados = pew_evento_estados;
this._pew_dealers = pew_dealers;
this._pew_codalarmas = pew_codalarmas;
this._pew_codalarmagrupo = pew_codalarmagrupo;
this._pew_sql = pew_sql;
this._pew_config = pew_config;
this._pew_form_config = pew_form_config;

            InitClass();
        }  								

				private void InitClass()
        {														
  				  base.Type = new ObjectType(3174, "p_evento_workflow");
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
			Simplep_evento_workflow Simple = new Simplep_evento_workflow();
			Simple.Id = base.Id;
			Simple.Name = base.Name;
			Simple.pew_proceso_estados = this._pew_proceso_estados;
Simple.pew_name = this._pew_name;
Simple.pew_evento_estados = this._pew_evento_estados;
Simple.pew_dealers = this._pew_dealers;
Simple.pew_codalarmas = this._pew_codalarmas;
Simple.pew_codalarmagrupo = this._pew_codalarmagrupo;
Simple.pew_sql = this._pew_sql;
Simple.pew_config = this._pew_config;
Simple.pew_form_config = this._pew_form_config;

			return (SimpleBaseObject) Simple;
		}
 ///<summary>
     ///Sets a simpleobject   
     ///</summary>	
		public void SetSimpleObject(Simplep_evento_workflow Simple)
		{
			base.Id = Simple.Id;
			base.Name = Simple.Name;
			this._pew_proceso_estados = Simple.pew_proceso_estados;
this._pew_name = Simple.pew_name;
this._pew_evento_estados = Simple.pew_evento_estados;
this._pew_dealers = Simple.pew_dealers;
this._pew_codalarmas = Simple.pew_codalarmas;
this._pew_codalarmagrupo = Simple.pew_codalarmagrupo;
this._pew_sql = Simple.pew_sql;
this._pew_config = Simple.pew_config;
this._pew_form_config = Simple.pew_form_config;

		}
 ///<summary>
     ///Gets a baseobject   
     ///</summary>
		public override BaseObject GetBaseObject(SqlHelper SqlConfig, int UserId)
		{
			return new Dalp_evento_workflow(SqlConfig, UserId, (Simplep_evento_workflow) GetSimpleObject());
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
               dt.Columns.Add(new DataColumn("pew_proceso_estados", typeof (string)));               
							 dt.Columns.Add(new DataColumn("pew_name", typeof (string)));               
							 dt.Columns.Add(new DataColumn("pew_evento_estados", typeof (string)));               
							 dt.Columns.Add(new DataColumn("pew_dealers", typeof (string)));               
							 dt.Columns.Add(new DataColumn("pew_codalarmas", typeof (string)));               
							 dt.Columns.Add(new DataColumn("pew_codalarmagrupo", typeof (int)));               
							 dt.Columns.Add(new DataColumn("pew_sql", typeof (string)));               
							 dt.Columns.Add(new DataColumn("pew_config", typeof (string)));               
							 dt.Columns.Add(new DataColumn("pew_form_config", typeof (string)));               
							 										
               //create Row  
               dr = dt.NewRow();
               
               //set Row
							 dr["Id"] = base.Id;

							 dr["Name"] = base.Name;
dr["pew_proceso_estados"] = this._pew_proceso_estados;
dr["pew_name"] = this._pew_name;
dr["pew_evento_estados"] = this._pew_evento_estados;
dr["pew_dealers"] = this._pew_dealers;
dr["pew_codalarmas"] = this._pew_codalarmas;
dr["pew_codalarmagrupo"] = this._pew_codalarmagrupo;
dr["pew_sql"] = this._pew_sql;
dr["pew_config"] = this._pew_config;
dr["pew_form_config"] = this._pew_form_config;
							 
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
