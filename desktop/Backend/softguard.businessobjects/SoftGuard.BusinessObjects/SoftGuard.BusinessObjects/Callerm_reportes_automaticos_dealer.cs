
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
    public class Callerm_reportes_automaticos_dealer : CallerObject
    { 	
				     private int _rad_linidkey;
					
				     private int _rad_ntipo;
					
				     private DateTime? _rad_tproximoenvio;
					
				     private int _rad_nfrecuencia;
					
				     private string _rad_cmail;
					
				     private int _rad_idGrupo;
					
				     private int _rad_nAlerta;
				 ///<summary>
     ///rad_linidkey property   
     ///</summary>   
     public int rad_linidkey 
		 { 
		        
                    get{ return this._rad_linidkey; }
        						set{ this._rad_linidkey = value; } 										
	   }
	  ///<summary>
     ///rad_ntipo property   
     ///</summary>   
     public int rad_ntipo 
		 { 
		        
                    get{ return this._rad_ntipo; }
        						set{ this._rad_ntipo = value; } 										
	   }
	  ///<summary>
     ///rad_tproximoenvio property   
     ///</summary>   
     public DateTime? rad_tproximoenvio 
		 { 
		        
                    get{ return this._rad_tproximoenvio; }
        						set{ this._rad_tproximoenvio = value; } 										
	   }
	  ///<summary>
     ///rad_nfrecuencia property   
     ///</summary>   
     public int rad_nfrecuencia 
		 { 
		        
                    get{ return this._rad_nfrecuencia; }
        						set{ this._rad_nfrecuencia = value; } 										
	   }
	  ///<summary>
     ///rad_cmail property   
     ///</summary>   
     public string rad_cmail 
		 { 
		        
                    get{ return this._rad_cmail; }
        						set{ this._rad_cmail = value; } 										
	   }
	  ///<summary>
     ///rad_idGrupo property   
     ///</summary>   
     public int rad_idGrupo 
		 { 
		        
                    get{ return this._rad_idGrupo; }
        						set{ this._rad_idGrupo = value; } 										
	   }
	  ///<summary>
     ///rad_nAlerta property   
     ///</summary>   
     public int rad_nAlerta 
		 { 
		        
                    get{ return this._rad_nAlerta; }
        						set{ this._rad_nAlerta = value; } 										
	   }
	  ///<summary>
     ///Constructor   
     ///</summary>
        public Callerm_reportes_automaticos_dealer() : base()
        {
            InitClass();
        }  
 ///<summary>
     ///Constructor   
     ///</summary>		
        public Callerm_reportes_automaticos_dealer(int Id, string Name, int rad_linidkey, int rad_ntipo, DateTime? rad_tproximoenvio, int rad_nfrecuencia, string rad_cmail, int rad_idGrupo, int rad_nAlerta) : base()
        {
            base.Id = Id;
						base.Name = Name;				 																																					 
				    this._rad_linidkey = rad_linidkey;
this._rad_ntipo = rad_ntipo;
this._rad_tproximoenvio = rad_tproximoenvio;
this._rad_nfrecuencia = rad_nfrecuencia;
this._rad_cmail = rad_cmail;
this._rad_idGrupo = rad_idGrupo;
this._rad_nAlerta = rad_nAlerta;

            InitClass();
        }  								

				private void InitClass()
        {														
  				  base.Type = new ObjectType(3210, "m_reportes_automaticos_dealer");
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
			Simplem_reportes_automaticos_dealer Simple = new Simplem_reportes_automaticos_dealer();
			Simple.Id = base.Id;
			Simple.Name = base.Name;
			Simple.rad_linidkey = this._rad_linidkey;
Simple.rad_ntipo = this._rad_ntipo;
Simple.rad_tproximoenvio = this._rad_tproximoenvio;
Simple.rad_nfrecuencia = this._rad_nfrecuencia;
Simple.rad_cmail = this._rad_cmail;
Simple.rad_idGrupo = this._rad_idGrupo;
Simple.rad_nAlerta = this._rad_nAlerta;

			return (SimpleBaseObject) Simple;
		}
 ///<summary>
     ///Sets a simpleobject   
     ///</summary>	
		public void SetSimpleObject(Simplem_reportes_automaticos_dealer Simple)
		{
			base.Id = Simple.Id;
			base.Name = Simple.Name;
			this._rad_linidkey = Simple.rad_linidkey;
this._rad_ntipo = Simple.rad_ntipo;
this._rad_tproximoenvio = Simple.rad_tproximoenvio;
this._rad_nfrecuencia = Simple.rad_nfrecuencia;
this._rad_cmail = Simple.rad_cmail;
this._rad_idGrupo = Simple.rad_idGrupo;
this._rad_nAlerta = Simple.rad_nAlerta;

		}
 ///<summary>
     ///Gets a baseobject   
     ///</summary>
		public override BaseObject GetBaseObject(SqlHelper SqlConfig, int UserId)
		{
			return new Dalm_reportes_automaticos_dealer(SqlConfig, UserId, (Simplem_reportes_automaticos_dealer) GetSimpleObject());
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
               dt.Columns.Add(new DataColumn("rad_linidkey", typeof (int)));               
							 dt.Columns.Add(new DataColumn("rad_ntipo", typeof (int)));               
							 dt.Columns.Add(new DataColumn("rad_tproximoenvio", typeof (DateTime)));               
							 dt.Columns.Add(new DataColumn("rad_nfrecuencia", typeof (int)));               
							 dt.Columns.Add(new DataColumn("rad_cmail", typeof (string)));               
							 dt.Columns.Add(new DataColumn("rad_idGrupo", typeof (int)));               
							 dt.Columns.Add(new DataColumn("rad_nAlerta", typeof (int)));               
							 										
               //create Row  
               dr = dt.NewRow();
               
               //set Row
							 dr["Id"] = base.Id;

							 dr["Name"] = base.Name;
dr["rad_linidkey"] = this._rad_linidkey;
dr["rad_ntipo"] = this._rad_ntipo;
dr["rad_tproximoenvio"] = this._rad_tproximoenvio;
dr["rad_nfrecuencia"] = this._rad_nfrecuencia;
dr["rad_cmail"] = this._rad_cmail;
dr["rad_idGrupo"] = this._rad_idGrupo;
dr["rad_nAlerta"] = this._rad_nAlerta;
							 
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
