
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
    public class CallerMG_Afip_Cae_Ws : CallerObject
    { 	
				     private int _mcw_macidkey;
					
				     private int _mcw_estado;
					
				     private DateTime? _mcw_fecha;
					
				     private string _mcw_requesturl;
					
				     private string _mcw_requestxml;
					
				     private string _mcw_responsexml;
				 ///<summary>
     ///mcw_macidkey property   
     ///</summary>   
     public int mcw_macidkey 
		 { 
		        
                    get{ return this._mcw_macidkey; }
        						set{ this._mcw_macidkey = value; } 										
	   }
	  ///<summary>
     ///mcw_estado property   
     ///</summary>   
     public int mcw_estado 
		 { 
		        
                    get{ return this._mcw_estado; }
        						set{ this._mcw_estado = value; } 										
	   }
	  ///<summary>
     ///mcw_fecha property   
     ///</summary>   
     public DateTime? mcw_fecha 
		 { 
		        
                    get{ return this._mcw_fecha; }
        						set{ this._mcw_fecha = value; } 										
	   }
	  ///<summary>
     ///mcw_requesturl property   
     ///</summary>   
     public string mcw_requesturl 
		 { 
		        
                    get{ return this._mcw_requesturl; }
        						set{ this._mcw_requesturl = value; } 										
	   }
	  ///<summary>
     ///mcw_requestxml property   
     ///</summary>   
     public string mcw_requestxml 
		 { 
		        
                    get{ return this._mcw_requestxml; }
        						set{ this._mcw_requestxml = value; } 										
	   }
	  ///<summary>
     ///mcw_responsexml property   
     ///</summary>   
     public string mcw_responsexml 
		 { 
		        
                    get{ return this._mcw_responsexml; }
        						set{ this._mcw_responsexml = value; } 										
	   }
	  ///<summary>
     ///Constructor   
     ///</summary>
        public CallerMG_Afip_Cae_Ws() : base()
        {
            InitClass();
        }  
 ///<summary>
     ///Constructor   
     ///</summary>		
        public CallerMG_Afip_Cae_Ws(int Id, string Name, int mcw_macidkey, int mcw_estado, DateTime? mcw_fecha, string mcw_requesturl, string mcw_requestxml, string mcw_responsexml) : base()
        {
            base.Id = Id;
						base.Name = Name;				 																																					 
				    this._mcw_macidkey = mcw_macidkey;
this._mcw_estado = mcw_estado;
this._mcw_fecha = mcw_fecha;
this._mcw_requesturl = mcw_requesturl;
this._mcw_requestxml = mcw_requestxml;
this._mcw_responsexml = mcw_responsexml;

            InitClass();
        }  								

				private void InitClass()
        {														
  				  base.Type = new ObjectType(3198, "MG_Afip_Cae_Ws");
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
			SimpleMG_Afip_Cae_Ws Simple = new SimpleMG_Afip_Cae_Ws();
			Simple.Id = base.Id;
			Simple.Name = base.Name;
			Simple.mcw_macidkey = this._mcw_macidkey;
Simple.mcw_estado = this._mcw_estado;
Simple.mcw_fecha = this._mcw_fecha;
Simple.mcw_requesturl = this._mcw_requesturl;
Simple.mcw_requestxml = this._mcw_requestxml;
Simple.mcw_responsexml = this._mcw_responsexml;

			return (SimpleBaseObject) Simple;
		}
 ///<summary>
     ///Sets a simpleobject   
     ///</summary>	
		public void SetSimpleObject(SimpleMG_Afip_Cae_Ws Simple)
		{
			base.Id = Simple.Id;
			base.Name = Simple.Name;
			this._mcw_macidkey = Simple.mcw_macidkey;
this._mcw_estado = Simple.mcw_estado;
this._mcw_fecha = Simple.mcw_fecha;
this._mcw_requesturl = Simple.mcw_requesturl;
this._mcw_requestxml = Simple.mcw_requestxml;
this._mcw_responsexml = Simple.mcw_responsexml;

		}
 ///<summary>
     ///Gets a baseobject   
     ///</summary>
		public override BaseObject GetBaseObject(SqlHelper SqlConfig, int UserId)
		{
			return new DalMG_Afip_Cae_Ws(SqlConfig, UserId, (SimpleMG_Afip_Cae_Ws) GetSimpleObject());
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
               dt.Columns.Add(new DataColumn("mcw_macidkey", typeof (int)));               
							 dt.Columns.Add(new DataColumn("mcw_estado", typeof (int)));               
							 dt.Columns.Add(new DataColumn("mcw_fecha", typeof (DateTime)));               
							 dt.Columns.Add(new DataColumn("mcw_requesturl", typeof (string)));               
							 dt.Columns.Add(new DataColumn("mcw_requestxml", typeof (string)));               
							 dt.Columns.Add(new DataColumn("mcw_responsexml", typeof (string)));               
							 										
               //create Row  
               dr = dt.NewRow();
               
               //set Row
							 dr["Id"] = base.Id;

							 dr["Name"] = base.Name;
dr["mcw_macidkey"] = this._mcw_macidkey;
dr["mcw_estado"] = this._mcw_estado;
dr["mcw_fecha"] = this._mcw_fecha;
dr["mcw_requesturl"] = this._mcw_requesturl;
dr["mcw_requestxml"] = this._mcw_requestxml;
dr["mcw_responsexml"] = this._mcw_responsexml;
							 
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
