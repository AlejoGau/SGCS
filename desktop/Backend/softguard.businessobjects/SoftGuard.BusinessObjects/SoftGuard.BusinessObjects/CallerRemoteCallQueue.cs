
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
    public class CallerRemoteCallQueue : CallerObject
    { 	
				     private int _rcq_estado;
					
				     private string _rcq_tipo;
					
				     private string _rcq_url;
					
				     private string _rcq_result;
					
				     private DateTime? _rcq_fechaprograma;
					
				     private DateTime? _rcq_fechaalta;
					
				     private DateTime? _rcq_fechamodificacion;
					
				     private string _rcq_config;
				 ///<summary>
     ///rcq_estado property   
     ///</summary>   
     public int rcq_estado 
		 { 
		        
                    get{ return this._rcq_estado; }
        						set{ this._rcq_estado = value; } 										
	   }
	  ///<summary>
     ///rcq_tipo property   
     ///</summary>   
     public string rcq_tipo 
		 { 
		        
                    get{ return this._rcq_tipo; }
        						set{ this._rcq_tipo = value; } 										
	   }
	  ///<summary>
     ///rcq_url property   
     ///</summary>   
     public string rcq_url 
		 { 
		        
                    get{ return this._rcq_url; }
        						set{ this._rcq_url = value; } 										
	   }
	  ///<summary>
     ///rcq_result property   
     ///</summary>   
     public string rcq_result 
		 { 
		        
                    get{ return this._rcq_result; }
        						set{ this._rcq_result = value; } 										
	   }
	  ///<summary>
     ///rcq_fechaprograma property   
     ///</summary>   
     public DateTime? rcq_fechaprograma 
		 { 
		        
                    get{ return this._rcq_fechaprograma; }
        						set{ this._rcq_fechaprograma = value; } 										
	   }
	  ///<summary>
     ///rcq_fechaalta property   
     ///</summary>   
     public DateTime? rcq_fechaalta 
		 { 
		        
                    get{ return this._rcq_fechaalta; }
        						set{ this._rcq_fechaalta = value; } 										
	   }
	  ///<summary>
     ///rcq_fechamodificacion property   
     ///</summary>   
     public DateTime? rcq_fechamodificacion 
		 { 
		        
                    get{ return this._rcq_fechamodificacion; }
        						set{ this._rcq_fechamodificacion = value; } 										
	   }
	  ///<summary>
     ///rcq_config property   
     ///</summary>   
     public string rcq_config 
		 { 
		        
                    get{ return this._rcq_config; }
        						set{ this._rcq_config = value; } 										
	   }
	  ///<summary>
     ///Constructor   
     ///</summary>
        public CallerRemoteCallQueue() : base()
        {
            InitClass();
        }  
 ///<summary>
     ///Constructor   
     ///</summary>		
        public CallerRemoteCallQueue(int Id, string Name, int rcq_estado, string rcq_tipo, string rcq_url, string rcq_result, DateTime? rcq_fechaprograma, DateTime? rcq_fechaalta, DateTime? rcq_fechamodificacion, string rcq_config) : base()
        {
            base.Id = Id;
						base.Name = Name;				 																																					 
				    this._rcq_estado = rcq_estado;
this._rcq_tipo = rcq_tipo;
this._rcq_url = rcq_url;
this._rcq_result = rcq_result;
this._rcq_fechaprograma = rcq_fechaprograma;
this._rcq_fechaalta = rcq_fechaalta;
this._rcq_fechamodificacion = rcq_fechamodificacion;
this._rcq_config = rcq_config;

            InitClass();
        }  								

				private void InitClass()
        {														
  				  base.Type = new ObjectType(3173, "RemoteCallQueue");
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
			SimpleRemoteCallQueue Simple = new SimpleRemoteCallQueue();
			Simple.Id = base.Id;
			Simple.Name = base.Name;
			Simple.rcq_estado = this._rcq_estado;
Simple.rcq_tipo = this._rcq_tipo;
Simple.rcq_url = this._rcq_url;
Simple.rcq_result = this._rcq_result;
Simple.rcq_fechaprograma = this._rcq_fechaprograma;
Simple.rcq_fechaalta = this._rcq_fechaalta;
Simple.rcq_fechamodificacion = this._rcq_fechamodificacion;
Simple.rcq_config = this._rcq_config;

			return (SimpleBaseObject) Simple;
		}
 ///<summary>
     ///Sets a simpleobject   
     ///</summary>	
		public void SetSimpleObject(SimpleRemoteCallQueue Simple)
		{
			base.Id = Simple.Id;
			base.Name = Simple.Name;
			this._rcq_estado = Simple.rcq_estado;
this._rcq_tipo = Simple.rcq_tipo;
this._rcq_url = Simple.rcq_url;
this._rcq_result = Simple.rcq_result;
this._rcq_fechaprograma = Simple.rcq_fechaprograma;
this._rcq_fechaalta = Simple.rcq_fechaalta;
this._rcq_fechamodificacion = Simple.rcq_fechamodificacion;
this._rcq_config = Simple.rcq_config;

		}
 ///<summary>
     ///Gets a baseobject   
     ///</summary>
		public override BaseObject GetBaseObject(SqlHelper SqlConfig, int UserId)
		{
			return new DalRemoteCallQueue(SqlConfig, UserId, (SimpleRemoteCallQueue) GetSimpleObject());
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
               dt.Columns.Add(new DataColumn("rcq_estado", typeof (int)));               
							 dt.Columns.Add(new DataColumn("rcq_tipo", typeof (string)));               
							 dt.Columns.Add(new DataColumn("rcq_url", typeof (string)));               
							 dt.Columns.Add(new DataColumn("rcq_result", typeof (string)));               
							 dt.Columns.Add(new DataColumn("rcq_fechaprograma", typeof (DateTime)));               
							 dt.Columns.Add(new DataColumn("rcq_fechaalta", typeof (DateTime)));               
							 dt.Columns.Add(new DataColumn("rcq_fechamodificacion", typeof (DateTime)));               
							 dt.Columns.Add(new DataColumn("rcq_config", typeof (string)));               
							 										
               //create Row  
               dr = dt.NewRow();
               
               //set Row
							 dr["Id"] = base.Id;

							 dr["Name"] = base.Name;
dr["rcq_estado"] = this._rcq_estado;
dr["rcq_tipo"] = this._rcq_tipo;
dr["rcq_url"] = this._rcq_url;
dr["rcq_result"] = this._rcq_result;
dr["rcq_fechaprograma"] = this._rcq_fechaprograma;
dr["rcq_fechaalta"] = this._rcq_fechaalta;
dr["rcq_fechamodificacion"] = this._rcq_fechamodificacion;
dr["rcq_config"] = this._rcq_config;
							 
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
