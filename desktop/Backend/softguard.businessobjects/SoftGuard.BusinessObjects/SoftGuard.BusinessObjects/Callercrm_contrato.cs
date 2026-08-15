
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
    public class Callercrm_contrato : CallerObject
    { 	
				     private int _cnt_org_fc;
					
				     private int _cnt_idcliente;
					
				     private DateTime? _cnt_fechaalta;
					
				     private DateTime? _cnt_fechavto;
					
				     private int _cnt_formapago;
					
				     private string _cnt_metadata;
					
				     private int _cnt_estado;
					
				     private int _cnt_tmp_id;
					
				     private int _cnt_dinamico;
					
				     private int _cnt_cantidad_auto;
				 ///<summary>
     ///cnt_org_fc property   
     ///</summary>   
     public int cnt_org_fc 
		 { 
		        
                    get{ return this._cnt_org_fc; }
        						set{ this._cnt_org_fc = value; } 										
	   }
	  ///<summary>
     ///cnt_idcliente property   
     ///</summary>   
     public int cnt_idcliente 
		 { 
		        
                    get{ return this._cnt_idcliente; }
        						set{ this._cnt_idcliente = value; } 										
	   }
	  ///<summary>
     ///cnt_fechaalta property   
     ///</summary>   
     public DateTime? cnt_fechaalta 
		 { 
		        
                    get{ return this._cnt_fechaalta; }
        						set{ this._cnt_fechaalta = value; } 										
	   }
	  ///<summary>
     ///cnt_fechavto property   
     ///</summary>   
     public DateTime? cnt_fechavto 
		 { 
		        
                    get{ return this._cnt_fechavto; }
        						set{ this._cnt_fechavto = value; } 										
	   }
	  ///<summary>
     ///cnt_formapago property   
     ///</summary>   
     public int cnt_formapago 
		 { 
		        
                    get{ return this._cnt_formapago; }
        						set{ this._cnt_formapago = value; } 										
	   }
	  ///<summary>
     ///cnt_metadata property   
     ///</summary>   
     public string cnt_metadata 
		 { 
		        
                    get{ return this._cnt_metadata; }
        						set{ this._cnt_metadata = value; } 										
	   }
	  ///<summary>
     ///cnt_estado property   
     ///</summary>   
     public int cnt_estado 
		 { 
		        
                    get{ return this._cnt_estado; }
        						set{ this._cnt_estado = value; } 										
	   }
	  ///<summary>
     ///cnt_tmp_id property   
     ///</summary>   
     public int cnt_tmp_id 
		 { 
		        
                    get{ return this._cnt_tmp_id; }
        						set{ this._cnt_tmp_id = value; } 										
	   }
	  ///<summary>
     ///cnt_dinamico property   
     ///</summary>   
     public int cnt_dinamico 
		 { 
		        
                    get{ return this._cnt_dinamico; }
        						set{ this._cnt_dinamico = value; } 										
	   }
	  ///<summary>
     ///cnt_cantidad_auto property   
     ///</summary>   
     public int cnt_cantidad_auto 
		 { 
		        
                    get{ return this._cnt_cantidad_auto; }
        						set{ this._cnt_cantidad_auto = value; } 										
	   }
	  ///<summary>
     ///Constructor   
     ///</summary>
        public Callercrm_contrato() : base()
        {
            InitClass();
        }  
 ///<summary>
     ///Constructor   
     ///</summary>		
        public Callercrm_contrato(int Id, string Name, int cnt_org_fc, int cnt_idcliente, DateTime? cnt_fechaalta, DateTime? cnt_fechavto, int cnt_formapago, string cnt_metadata, int cnt_estado, int cnt_tmp_id, int cnt_dinamico, int cnt_cantidad_auto) : base()
        {
            base.Id = Id;
						base.Name = Name;				 																																					 
				    this._cnt_org_fc = cnt_org_fc;
this._cnt_idcliente = cnt_idcliente;
this._cnt_fechaalta = cnt_fechaalta;
this._cnt_fechavto = cnt_fechavto;
this._cnt_formapago = cnt_formapago;
this._cnt_metadata = cnt_metadata;
this._cnt_estado = cnt_estado;
this._cnt_tmp_id = cnt_tmp_id;
this._cnt_dinamico = cnt_dinamico;
this._cnt_cantidad_auto = cnt_cantidad_auto;

            InitClass();
        }  								

				private void InitClass()
        {														
  				  base.Type = new ObjectType(3148, "crm_contrato");
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
			Simplecrm_contrato Simple = new Simplecrm_contrato();
			Simple.Id = base.Id;
			Simple.Name = base.Name;
			Simple.cnt_org_fc = this._cnt_org_fc;
Simple.cnt_idcliente = this._cnt_idcliente;
Simple.cnt_fechaalta = this._cnt_fechaalta;
Simple.cnt_fechavto = this._cnt_fechavto;
Simple.cnt_formapago = this._cnt_formapago;
Simple.cnt_metadata = this._cnt_metadata;
Simple.cnt_estado = this._cnt_estado;
Simple.cnt_tmp_id = this._cnt_tmp_id;
Simple.cnt_dinamico = this._cnt_dinamico;
Simple.cnt_cantidad_auto = this._cnt_cantidad_auto;

			return (SimpleBaseObject) Simple;
		}
 ///<summary>
     ///Sets a simpleobject   
     ///</summary>	
		public void SetSimpleObject(Simplecrm_contrato Simple)
		{
			base.Id = Simple.Id;
			base.Name = Simple.Name;
			this._cnt_org_fc = Simple.cnt_org_fc;
this._cnt_idcliente = Simple.cnt_idcliente;
this._cnt_fechaalta = Simple.cnt_fechaalta;
this._cnt_fechavto = Simple.cnt_fechavto;
this._cnt_formapago = Simple.cnt_formapago;
this._cnt_metadata = Simple.cnt_metadata;
this._cnt_estado = Simple.cnt_estado;
this._cnt_tmp_id = Simple.cnt_tmp_id;
this._cnt_dinamico = Simple.cnt_dinamico;
this._cnt_cantidad_auto = Simple.cnt_cantidad_auto;

		}
 ///<summary>
     ///Gets a baseobject   
     ///</summary>
		public override BaseObject GetBaseObject(SqlHelper SqlConfig, int UserId)
		{
			return new Dalcrm_contrato(SqlConfig, UserId, (Simplecrm_contrato) GetSimpleObject());
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
               dt.Columns.Add(new DataColumn("cnt_org_fc", typeof (int)));               
							 dt.Columns.Add(new DataColumn("cnt_idcliente", typeof (int)));               
							 dt.Columns.Add(new DataColumn("cnt_fechaalta", typeof (DateTime)));               
							 dt.Columns.Add(new DataColumn("cnt_fechavto", typeof (DateTime)));               
							 dt.Columns.Add(new DataColumn("cnt_formapago", typeof (int)));               
							 dt.Columns.Add(new DataColumn("cnt_metadata", typeof (string)));               
							 dt.Columns.Add(new DataColumn("cnt_estado", typeof (int)));               
							 dt.Columns.Add(new DataColumn("cnt_tmp_id", typeof (int)));               
							 dt.Columns.Add(new DataColumn("cnt_dinamico", typeof (int)));               
							 dt.Columns.Add(new DataColumn("cnt_cantidad_auto", typeof (int)));               
							 										
               //create Row  
               dr = dt.NewRow();
               
               //set Row
							 dr["Id"] = base.Id;

							 dr["Name"] = base.Name;
dr["cnt_org_fc"] = this._cnt_org_fc;
dr["cnt_idcliente"] = this._cnt_idcliente;
dr["cnt_fechaalta"] = this._cnt_fechaalta;
dr["cnt_fechavto"] = this._cnt_fechavto;
dr["cnt_formapago"] = this._cnt_formapago;
dr["cnt_metadata"] = this._cnt_metadata;
dr["cnt_estado"] = this._cnt_estado;
dr["cnt_tmp_id"] = this._cnt_tmp_id;
dr["cnt_dinamico"] = this._cnt_dinamico;
dr["cnt_cantidad_auto"] = this._cnt_cantidad_auto;
							 
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
