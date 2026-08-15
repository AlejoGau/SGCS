
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
    public class Callerm_cuentas_video_control : CallerObject
    { 	
				     private int _cvc_iIdCta;
					
				     private int _cvc_iActivacionTotal;
					
				     private string _cvc_cActivacionParcial;
					
				     private int _cvc_iDesactivacion;
					
				     private int _cvc_iActivacionParcial;
				 ///<summary>
     ///cvc_iIdCta property   
     ///</summary>   
     public int cvc_iIdCta 
		 { 
		        
                    get{ return this._cvc_iIdCta; }
        						set{ this._cvc_iIdCta = value; } 										
	   }
	  ///<summary>
     ///cvc_iActivacionTotal property   
     ///</summary>   
     public int cvc_iActivacionTotal 
		 { 
		        
                    get{ return this._cvc_iActivacionTotal; }
        						set{ this._cvc_iActivacionTotal = value; } 										
	   }
	  ///<summary>
     ///cvc_cActivacionParcial property   
     ///</summary>   
     public string cvc_cActivacionParcial 
		 { 
		        
                    get{ return this._cvc_cActivacionParcial; }
        						set{ this._cvc_cActivacionParcial = value; } 										
	   }
	  ///<summary>
     ///cvc_iDesactivacion property   
     ///</summary>   
     public int cvc_iDesactivacion 
		 { 
		        
                    get{ return this._cvc_iDesactivacion; }
        						set{ this._cvc_iDesactivacion = value; } 										
	   }
	  ///<summary>
     ///cvc_iActivacionParcial property   
     ///</summary>   
     public int cvc_iActivacionParcial 
		 { 
		        
                    get{ return this._cvc_iActivacionParcial; }
        						set{ this._cvc_iActivacionParcial = value; } 										
	   }
	  ///<summary>
     ///Constructor   
     ///</summary>
        public Callerm_cuentas_video_control() : base()
        {
            InitClass();
        }  
 ///<summary>
     ///Constructor   
     ///</summary>		
        public Callerm_cuentas_video_control(int Id, string Name, int cvc_iIdCta, int cvc_iActivacionTotal, string cvc_cActivacionParcial, int cvc_iDesactivacion, int cvc_iActivacionParcial) : base()
        {
            base.Id = Id;
						base.Name = Name;				 																																					 
				    this._cvc_iIdCta = cvc_iIdCta;
this._cvc_iActivacionTotal = cvc_iActivacionTotal;
this._cvc_cActivacionParcial = cvc_cActivacionParcial;
this._cvc_iDesactivacion = cvc_iDesactivacion;
this._cvc_iActivacionParcial = cvc_iActivacionParcial;

            InitClass();
        }  								

				private void InitClass()
        {														
  				  base.Type = new ObjectType(7046, "m_cuentas_video_control");
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
			Simplem_cuentas_video_control Simple = new Simplem_cuentas_video_control();
			Simple.Id = base.Id;
			Simple.Name = base.Name;
			Simple.cvc_iIdCta = this._cvc_iIdCta;
Simple.cvc_iActivacionTotal = this._cvc_iActivacionTotal;
Simple.cvc_cActivacionParcial = this._cvc_cActivacionParcial;
Simple.cvc_iDesactivacion = this._cvc_iDesactivacion;
Simple.cvc_iActivacionParcial = this._cvc_iActivacionParcial;

			return (SimpleBaseObject) Simple;
		}
 ///<summary>
     ///Sets a simpleobject   
     ///</summary>	
		public void SetSimpleObject(Simplem_cuentas_video_control Simple)
		{
			base.Id = Simple.Id;
			base.Name = Simple.Name;
			this._cvc_iIdCta = Simple.cvc_iIdCta;
this._cvc_iActivacionTotal = Simple.cvc_iActivacionTotal;
this._cvc_cActivacionParcial = Simple.cvc_cActivacionParcial;
this._cvc_iDesactivacion = Simple.cvc_iDesactivacion;
this._cvc_iActivacionParcial = Simple.cvc_iActivacionParcial;

		}
 ///<summary>
     ///Gets a baseobject   
     ///</summary>
		public override BaseObject GetBaseObject(SqlHelper SqlConfig, int UserId)
		{
			return new Dalm_cuentas_video_control(SqlConfig, UserId, (Simplem_cuentas_video_control) GetSimpleObject());
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
               dt.Columns.Add(new DataColumn("cvc_iIdCta", typeof (int)));               
							 dt.Columns.Add(new DataColumn("cvc_iActivacionTotal", typeof (int)));               
							 dt.Columns.Add(new DataColumn("cvc_cActivacionParcial", typeof (string)));               
							 dt.Columns.Add(new DataColumn("cvc_iDesactivacion", typeof (int)));               
							 dt.Columns.Add(new DataColumn("cvc_iActivacionParcial", typeof (int)));               
							 										
               //create Row  
               dr = dt.NewRow();
               
               //set Row
							 dr["Id"] = base.Id;

							 dr["Name"] = base.Name;
dr["cvc_iIdCta"] = this._cvc_iIdCta;
dr["cvc_iActivacionTotal"] = this._cvc_iActivacionTotal;
dr["cvc_cActivacionParcial"] = this._cvc_cActivacionParcial;
dr["cvc_iDesactivacion"] = this._cvc_iDesactivacion;
dr["cvc_iActivacionParcial"] = this._cvc_iActivacionParcial;
							 
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
