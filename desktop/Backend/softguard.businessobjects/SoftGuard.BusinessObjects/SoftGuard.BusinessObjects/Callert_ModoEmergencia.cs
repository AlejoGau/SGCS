
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
    public class Callert_ModoEmergencia : CallerObject
    { 	
				     private int _tme_nEstado;
					
				     private string _tme_cEventos;
					
				     private string _tme_cDealer;
				 ///<summary>
     ///tme_nEstado property   
     ///</summary>   
     public int tme_nEstado 
		 { 
		        
                    get{ return this._tme_nEstado; }
        						set{ this._tme_nEstado = value; } 										
	   }
	  ///<summary>
     ///tme_cEventos property   
     ///</summary>   
     public string tme_cEventos 
		 { 
		        
                    get{ return this._tme_cEventos; }
        						set{ this._tme_cEventos = value; } 										
	   }
	  ///<summary>
     ///tme_cDealer property   
     ///</summary>   
     public string tme_cDealer 
		 { 
		        
                    get{ return this._tme_cDealer; }
        						set{ this._tme_cDealer = value; } 										
	   }
	  ///<summary>
     ///Constructor   
     ///</summary>
        public Callert_ModoEmergencia() : base()
        {
            InitClass();
        }  
 ///<summary>
     ///Constructor   
     ///</summary>		
        public Callert_ModoEmergencia(int Id, string Name, int tme_nEstado, string tme_cEventos, string tme_cDealer) : base()
        {
            base.Id = Id;
						base.Name = Name;				 																																					 
				    this._tme_nEstado = tme_nEstado;
this._tme_cEventos = tme_cEventos;
this._tme_cDealer = tme_cDealer;

            InitClass();
        }  								

				private void InitClass()
        {														
  				  base.Type = new ObjectType(7032, "t_ModoEmergencia");
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
			Simplet_ModoEmergencia Simple = new Simplet_ModoEmergencia();
			Simple.Id = base.Id;
			Simple.Name = base.Name;
			Simple.tme_nEstado = this._tme_nEstado;
Simple.tme_cEventos = this._tme_cEventos;
Simple.tme_cDealer = this._tme_cDealer;

			return (SimpleBaseObject) Simple;
		}
 ///<summary>
     ///Sets a simpleobject   
     ///</summary>	
		public void SetSimpleObject(Simplet_ModoEmergencia Simple)
		{
			base.Id = Simple.Id;
			base.Name = Simple.Name;
			this._tme_nEstado = Simple.tme_nEstado;
this._tme_cEventos = Simple.tme_cEventos;
this._tme_cDealer = Simple.tme_cDealer;

		}
 ///<summary>
     ///Gets a baseobject   
     ///</summary>
		public override BaseObject GetBaseObject(SqlHelper SqlConfig, int UserId)
		{
			return new Dalt_ModoEmergencia(SqlConfig, UserId, (Simplet_ModoEmergencia) GetSimpleObject());
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
               dt.Columns.Add(new DataColumn("tme_nEstado", typeof (int)));               
							 dt.Columns.Add(new DataColumn("tme_cEventos", typeof (string)));               
							 dt.Columns.Add(new DataColumn("tme_cDealer", typeof (string)));               
							 										
               //create Row  
               dr = dt.NewRow();
               
               //set Row
							 dr["Id"] = base.Id;

							 dr["Name"] = base.Name;
dr["tme_nEstado"] = this._tme_nEstado;
dr["tme_cEventos"] = this._tme_cEventos;
dr["tme_cDealer"] = this._tme_cDealer;
							 
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
