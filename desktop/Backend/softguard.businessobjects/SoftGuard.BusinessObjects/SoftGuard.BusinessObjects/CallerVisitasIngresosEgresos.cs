
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
    public class CallerVisitasIngresosEgresos : CallerObject
    { 	
				     private DateTime? _vie_tFechaHora;
					
				     private string _vie_cMatricula;
					
				     private string _vie_cUnidadFuncional;
				 ///<summary>
     ///vie_tFechaHora property   
     ///</summary>   
     public DateTime? vie_tFechaHora 
		 { 
		        
                    get{ return this._vie_tFechaHora; }
        						set{ this._vie_tFechaHora = value; } 										
	   }
	  ///<summary>
     ///vie_cMatricula property   
     ///</summary>   
     public string vie_cMatricula 
		 { 
		        
                    get{ return this._vie_cMatricula; }
        						set{ this._vie_cMatricula = value; } 										
	   }
	  ///<summary>
     ///vie_cUnidadFuncional property   
     ///</summary>   
     public string vie_cUnidadFuncional 
		 { 
		        
                    get{ return this._vie_cUnidadFuncional; }
        						set{ this._vie_cUnidadFuncional = value; } 										
	   }
	  ///<summary>
     ///Constructor   
     ///</summary>
        public CallerVisitasIngresosEgresos() : base()
        {
            InitClass();
        }  
 ///<summary>
     ///Constructor   
     ///</summary>		
        public CallerVisitasIngresosEgresos(int Id, string Name, DateTime? vie_tFechaHora, string vie_cMatricula, string vie_cUnidadFuncional) : base()
        {
            base.Id = Id;
						base.Name = Name;				 																																					 
				    this._vie_tFechaHora = vie_tFechaHora;
this._vie_cMatricula = vie_cMatricula;
this._vie_cUnidadFuncional = vie_cUnidadFuncional;

            InitClass();
        }  								

				private void InitClass()
        {														
  				  base.Type = new ObjectType(7036, "VisitasIngresosEgresos");
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
			SimpleVisitasIngresosEgresos Simple = new SimpleVisitasIngresosEgresos();
			Simple.Id = base.Id;
			Simple.Name = base.Name;
			Simple.vie_tFechaHora = this._vie_tFechaHora;
Simple.vie_cMatricula = this._vie_cMatricula;
Simple.vie_cUnidadFuncional = this._vie_cUnidadFuncional;

			return (SimpleBaseObject) Simple;
		}
 ///<summary>
     ///Sets a simpleobject   
     ///</summary>	
		public void SetSimpleObject(SimpleVisitasIngresosEgresos Simple)
		{
			base.Id = Simple.Id;
			base.Name = Simple.Name;
			this._vie_tFechaHora = Simple.vie_tFechaHora;
this._vie_cMatricula = Simple.vie_cMatricula;
this._vie_cUnidadFuncional = Simple.vie_cUnidadFuncional;

		}
 ///<summary>
     ///Gets a baseobject   
     ///</summary>
		public override BaseObject GetBaseObject(SqlHelper SqlConfig, int UserId)
		{
			return new DalVisitasIngresosEgresos(SqlConfig, UserId, (SimpleVisitasIngresosEgresos) GetSimpleObject());
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
               dt.Columns.Add(new DataColumn("vie_tFechaHora", typeof (DateTime)));               
							 dt.Columns.Add(new DataColumn("vie_cMatricula", typeof (string)));               
							 dt.Columns.Add(new DataColumn("vie_cUnidadFuncional", typeof (string)));               
							 										
               //create Row  
               dr = dt.NewRow();
               
               //set Row
							 dr["Id"] = base.Id;

							 dr["Name"] = base.Name;
dr["vie_tFechaHora"] = this._vie_tFechaHora;
dr["vie_cMatricula"] = this._vie_cMatricula;
dr["vie_cUnidadFuncional"] = this._vie_cUnidadFuncional;
							 
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
