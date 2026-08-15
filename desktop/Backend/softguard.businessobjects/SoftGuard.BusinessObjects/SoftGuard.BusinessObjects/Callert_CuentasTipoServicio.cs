
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
    public class Callert_CuentasTipoServicio : CallerObject
    { 	
				     private string _cts_cnombre;
					
				     private int _cts_iestado;
				 ///<summary>
     ///cts_cnombre property   
     ///</summary>   
     public string cts_cnombre 
		 { 
		        
                    get{ return this._cts_cnombre; }
        						set{ this._cts_cnombre = value; } 										
	   }
	  ///<summary>
     ///cts_iestado property   
     ///</summary>   
     public int cts_iestado 
		 { 
		        
                    get{ return this._cts_iestado; }
        						set{ this._cts_iestado = value; } 										
	   }
	  ///<summary>
     ///Constructor   
     ///</summary>
        public Callert_CuentasTipoServicio() : base()
        {
            InitClass();
        }  
 ///<summary>
     ///Constructor   
     ///</summary>		
        public Callert_CuentasTipoServicio(int Id, string Name, string cts_cnombre, int cts_iestado) : base()
        {
            base.Id = Id;
						base.Name = Name;				 																																					 
				    this._cts_cnombre = cts_cnombre;
this._cts_iestado = cts_iestado;

            InitClass();
        }  								

				private void InitClass()
        {														
  				  base.Type = new ObjectType(3224, "t_CuentasTipoServicio");
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
			Simplet_CuentasTipoServicio Simple = new Simplet_CuentasTipoServicio();
			Simple.Id = base.Id;
			Simple.Name = base.Name;
			Simple.cts_cnombre = this._cts_cnombre;
Simple.cts_iestado = this._cts_iestado;

			return (SimpleBaseObject) Simple;
		}
 ///<summary>
     ///Sets a simpleobject   
     ///</summary>	
		public void SetSimpleObject(Simplet_CuentasTipoServicio Simple)
		{
			base.Id = Simple.Id;
			base.Name = Simple.Name;
			this._cts_cnombre = Simple.cts_cnombre;
this._cts_iestado = Simple.cts_iestado;

		}
 ///<summary>
     ///Gets a baseobject   
     ///</summary>
		public override BaseObject GetBaseObject(SqlHelper SqlConfig, int UserId)
		{
			return new Dalt_CuentasTipoServicio(SqlConfig, UserId, (Simplet_CuentasTipoServicio) GetSimpleObject());
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
               dt.Columns.Add(new DataColumn("cts_cnombre", typeof (string)));               
							 dt.Columns.Add(new DataColumn("cts_iestado", typeof (int)));               
							 										
               //create Row  
               dr = dt.NewRow();
               
               //set Row
							 dr["Id"] = base.Id;

							 dr["Name"] = base.Name;
dr["cts_cnombre"] = this._cts_cnombre;
dr["cts_iestado"] = this._cts_iestado;
							 
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
