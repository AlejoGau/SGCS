
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
    public class CallerRedirectorQueue : CallerObject
    { 	
				     private int _rdq_iReDirector;
					
				     private int _rdq_idRec;
					
				     private DateTime? _rdq_tFechaHora;
					
				     private string _rdq_cLlamado;
					
				     private string _rdq_cRespuesta;
					
				     private int _rdq_iStatus;
					
				     private DateTime? _rdq_tStatusExec;
				 ///<summary>
     ///rdq_iReDirector property   
     ///</summary>   
     public int rdq_iReDirector 
		 { 
		        
                    get{ return this._rdq_iReDirector; }
        						set{ this._rdq_iReDirector = value; } 										
	   }
	  ///<summary>
     ///rdq_idRec property   
     ///</summary>   
     public int rdq_idRec 
		 { 
		        
                    get{ return this._rdq_idRec; }
        						set{ this._rdq_idRec = value; } 										
	   }
	  ///<summary>
     ///rdq_tFechaHora property   
     ///</summary>   
     public DateTime? rdq_tFechaHora 
		 { 
		        
                    get{ return this._rdq_tFechaHora; }
        						set{ this._rdq_tFechaHora = value; } 										
	   }
	  ///<summary>
     ///rdq_cLlamado property   
     ///</summary>   
     public string rdq_cLlamado 
		 { 
		        
                    get{ return this._rdq_cLlamado; }
        						set{ this._rdq_cLlamado = value; } 										
	   }
	  ///<summary>
     ///rdq_cRespuesta property   
     ///</summary>   
     public string rdq_cRespuesta 
		 { 
		        
                    get{ return this._rdq_cRespuesta; }
        						set{ this._rdq_cRespuesta = value; } 										
	   }
	  ///<summary>
     ///rdq_iStatus property   
     ///</summary>   
     public int rdq_iStatus 
		 { 
		        
                    get{ return this._rdq_iStatus; }
        						set{ this._rdq_iStatus = value; } 										
	   }
	  ///<summary>
     ///rdq_tStatusExec property   
     ///</summary>   
     public DateTime? rdq_tStatusExec 
		 { 
		        
                    get{ return this._rdq_tStatusExec; }
        						set{ this._rdq_tStatusExec = value; } 										
	   }
	  ///<summary>
     ///Constructor   
     ///</summary>
        public CallerRedirectorQueue() : base()
        {
            InitClass();
        }  
 ///<summary>
     ///Constructor   
     ///</summary>		
        public CallerRedirectorQueue(int Id, string Name, int rdq_iReDirector, int rdq_idRec, DateTime? rdq_tFechaHora, string rdq_cLlamado, string rdq_cRespuesta, int rdq_iStatus, DateTime? rdq_tStatusExec) : base()
        {
            base.Id = Id;
						base.Name = Name;				 																																					 
				    this._rdq_iReDirector = rdq_iReDirector;
this._rdq_idRec = rdq_idRec;
this._rdq_tFechaHora = rdq_tFechaHora;
this._rdq_cLlamado = rdq_cLlamado;
this._rdq_cRespuesta = rdq_cRespuesta;
this._rdq_iStatus = rdq_iStatus;
this._rdq_tStatusExec = rdq_tStatusExec;

            InitClass();
        }  								

				private void InitClass()
        {														
  				  base.Type = new ObjectType(3223, "RedirectorQueue");
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
			SimpleRedirectorQueue Simple = new SimpleRedirectorQueue();
			Simple.Id = base.Id;
			Simple.Name = base.Name;
			Simple.rdq_iReDirector = this._rdq_iReDirector;
Simple.rdq_idRec = this._rdq_idRec;
Simple.rdq_tFechaHora = this._rdq_tFechaHora;
Simple.rdq_cLlamado = this._rdq_cLlamado;
Simple.rdq_cRespuesta = this._rdq_cRespuesta;
Simple.rdq_iStatus = this._rdq_iStatus;
Simple.rdq_tStatusExec = this._rdq_tStatusExec;

			return (SimpleBaseObject) Simple;
		}
 ///<summary>
     ///Sets a simpleobject   
     ///</summary>	
		public void SetSimpleObject(SimpleRedirectorQueue Simple)
		{
			base.Id = Simple.Id;
			base.Name = Simple.Name;
			this._rdq_iReDirector = Simple.rdq_iReDirector;
this._rdq_idRec = Simple.rdq_idRec;
this._rdq_tFechaHora = Simple.rdq_tFechaHora;
this._rdq_cLlamado = Simple.rdq_cLlamado;
this._rdq_cRespuesta = Simple.rdq_cRespuesta;
this._rdq_iStatus = Simple.rdq_iStatus;
this._rdq_tStatusExec = Simple.rdq_tStatusExec;

		}
 ///<summary>
     ///Gets a baseobject   
     ///</summary>
		public override BaseObject GetBaseObject(SqlHelper SqlConfig, int UserId)
		{
			return new DalRedirectorQueue(SqlConfig, UserId, (SimpleRedirectorQueue) GetSimpleObject());
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
               dt.Columns.Add(new DataColumn("rdq_iReDirector", typeof (int)));               
							 dt.Columns.Add(new DataColumn("rdq_idRec", typeof (int)));               
							 dt.Columns.Add(new DataColumn("rdq_tFechaHora", typeof (DateTime)));               
							 dt.Columns.Add(new DataColumn("rdq_cLlamado", typeof (string)));               
							 dt.Columns.Add(new DataColumn("rdq_cRespuesta", typeof (string)));               
							 dt.Columns.Add(new DataColumn("rdq_iStatus", typeof (int)));               
							 dt.Columns.Add(new DataColumn("rdq_tStatusExec", typeof (DateTime)));               
							 										
               //create Row  
               dr = dt.NewRow();
               
               //set Row
							 dr["Id"] = base.Id;

							 dr["Name"] = base.Name;
dr["rdq_iReDirector"] = this._rdq_iReDirector;
dr["rdq_idRec"] = this._rdq_idRec;
dr["rdq_tFechaHora"] = this._rdq_tFechaHora;
dr["rdq_cLlamado"] = this._rdq_cLlamado;
dr["rdq_cRespuesta"] = this._rdq_cRespuesta;
dr["rdq_iStatus"] = this._rdq_iStatus;
dr["rdq_tStatusExec"] = this._rdq_tStatusExec;
							 
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
