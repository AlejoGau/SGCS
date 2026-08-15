
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
    public class Callerp_rximg : CallerObject
    { 	
				     private int _rxi_irecid;
					
				     private string _rxi_cimg;
					
				     private string _rxi_ccarpeta;
					
				     private Decimal _rxi_nestado;
					
				     private string _rxi_ctipo;
					
				     private string _rxi_cconfig;
				 ///<summary>
     ///rxi_irecid property   
     ///</summary>   
     public int rxi_irecid 
		 { 
		        
                    get{ return this._rxi_irecid; }
        						set{ this._rxi_irecid = value; } 										
	   }
	  ///<summary>
     ///rxi_cimg property   
     ///</summary>   
     public string rxi_cimg 
		 { 
		        
                    get{ return this._rxi_cimg; }
        						set{ this._rxi_cimg = value; } 										
	   }
	  ///<summary>
     ///rxi_ccarpeta property   
     ///</summary>   
     public string rxi_ccarpeta 
		 { 
		        
                    get{ return this._rxi_ccarpeta; }
        						set{ this._rxi_ccarpeta = value; } 										
	   }
	  ///<summary>
     ///rxi_nestado property   
     ///</summary>   
     public Decimal rxi_nestado 
		 { 
		        
                    get{ return this._rxi_nestado; }
        						set{ this._rxi_nestado = value; } 										
	   }
	  ///<summary>
     ///rxi_ctipo property   
     ///</summary>   
     public string rxi_ctipo 
		 { 
		        
                    get{ return this._rxi_ctipo; }
        						set{ this._rxi_ctipo = value; } 										
	   }
	  ///<summary>
     ///rxi_cconfig property   
     ///</summary>   
     public string rxi_cconfig 
		 { 
		        
                    get{ return this._rxi_cconfig; }
        						set{ this._rxi_cconfig = value; } 										
	   }
	  ///<summary>
     ///Constructor   
     ///</summary>
        public Callerp_rximg() : base()
        {
            InitClass();
        }  
 ///<summary>
     ///Constructor   
     ///</summary>		
        public Callerp_rximg(int Id, string Name, int rxi_irecid, string rxi_cimg, string rxi_ccarpeta, Decimal rxi_nestado, string rxi_ctipo, string rxi_cconfig) : base()
        {
            base.Id = Id;
						base.Name = Name;				 																																					 
				    this._rxi_irecid = rxi_irecid;
this._rxi_cimg = rxi_cimg;
this._rxi_ccarpeta = rxi_ccarpeta;
this._rxi_nestado = rxi_nestado;
this._rxi_ctipo = rxi_ctipo;
this._rxi_cconfig = rxi_cconfig;

            InitClass();
        }  								

				private void InitClass()
        {														
  				  base.Type = new ObjectType(3169, "p_rximg");
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
			Simplep_rximg Simple = new Simplep_rximg();
			Simple.Id = base.Id;
			Simple.Name = base.Name;
			Simple.rxi_irecid = this._rxi_irecid;
Simple.rxi_cimg = this._rxi_cimg;
Simple.rxi_ccarpeta = this._rxi_ccarpeta;
Simple.rxi_nestado = this._rxi_nestado;
Simple.rxi_ctipo = this._rxi_ctipo;
Simple.rxi_cconfig = this._rxi_cconfig;

			return (SimpleBaseObject) Simple;
		}
 ///<summary>
     ///Sets a simpleobject   
     ///</summary>	
		public void SetSimpleObject(Simplep_rximg Simple)
		{
			base.Id = Simple.Id;
			base.Name = Simple.Name;
			this._rxi_irecid = Simple.rxi_irecid;
this._rxi_cimg = Simple.rxi_cimg;
this._rxi_ccarpeta = Simple.rxi_ccarpeta;
this._rxi_nestado = Simple.rxi_nestado;
this._rxi_ctipo = Simple.rxi_ctipo;
this._rxi_cconfig = Simple.rxi_cconfig;

		}
 ///<summary>
     ///Gets a baseobject   
     ///</summary>
		public override BaseObject GetBaseObject(SqlHelper SqlConfig, int UserId)
		{
			return new Dalp_rximg(SqlConfig, UserId, (Simplep_rximg) GetSimpleObject());
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
               dt.Columns.Add(new DataColumn("rxi_irecid", typeof (int)));               
							 dt.Columns.Add(new DataColumn("rxi_cimg", typeof (string)));               
							 dt.Columns.Add(new DataColumn("rxi_ccarpeta", typeof (string)));               
							 dt.Columns.Add(new DataColumn("rxi_nestado", typeof (Decimal)));               
							 dt.Columns.Add(new DataColumn("rxi_ctipo", typeof (string)));               
							 dt.Columns.Add(new DataColumn("rxi_cconfig", typeof (string)));               
							 										
               //create Row  
               dr = dt.NewRow();
               
               //set Row
							 dr["Id"] = base.Id;

							 dr["Name"] = base.Name;
dr["rxi_irecid"] = this._rxi_irecid;
dr["rxi_cimg"] = this._rxi_cimg;
dr["rxi_ccarpeta"] = this._rxi_ccarpeta;
dr["rxi_nestado"] = this._rxi_nestado;
dr["rxi_ctipo"] = this._rxi_ctipo;
dr["rxi_cconfig"] = this._rxi_cconfig;
							 
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
