
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
    public class CallerEventosInformados : CallerObject
    { 	
				     private int _evi_iRecId;
					
				     private int _evi_iCuentaId;
					
				     private int _evi_iUsuario;
					
				     private string _evi_cUsuarioNombre;
					
				     private string _evi_cAlarma;
					
				     private string _evi_cAlarmaDesc;
					
				     private int _evi_iCheck;
					
				     private int _evi_iCheckType;
					
				     private int _evi_iDevice;
					
				     private int _evi_iStatus;
					
				     private DateTime? _evi_tStatusExec;
					
				     private int _evi_iGenRecId;
				 ///<summary>
     ///evi_iRecId property   
     ///</summary>   
     public int evi_iRecId 
		 { 
		        
                    get{ return this._evi_iRecId; }
        						set{ this._evi_iRecId = value; } 										
	   }
	  ///<summary>
     ///evi_iCuentaId property   
     ///</summary>   
     public int evi_iCuentaId 
		 { 
		        
                    get{ return this._evi_iCuentaId; }
        						set{ this._evi_iCuentaId = value; } 										
	   }
	  ///<summary>
     ///evi_iUsuario property   
     ///</summary>   
     public int evi_iUsuario 
		 { 
		        
                    get{ return this._evi_iUsuario; }
        						set{ this._evi_iUsuario = value; } 										
	   }
	  ///<summary>
     ///evi_cUsuarioNombre property   
     ///</summary>   
     public string evi_cUsuarioNombre 
		 { 
		        
                    get{ return this._evi_cUsuarioNombre; }
        						set{ this._evi_cUsuarioNombre = value; } 										
	   }
	  ///<summary>
     ///evi_cAlarma property   
     ///</summary>   
     public string evi_cAlarma 
		 { 
		        
                    get{ return this._evi_cAlarma; }
        						set{ this._evi_cAlarma = value; } 										
	   }
	  ///<summary>
     ///evi_cAlarmaDesc property   
     ///</summary>   
     public string evi_cAlarmaDesc 
		 { 
		        
                    get{ return this._evi_cAlarmaDesc; }
        						set{ this._evi_cAlarmaDesc = value; } 										
	   }
	  ///<summary>
     ///evi_iCheck property   
     ///</summary>   
     public int evi_iCheck 
		 { 
		        
                    get{ return this._evi_iCheck; }
        						set{ this._evi_iCheck = value; } 										
	   }
	  ///<summary>
     ///evi_iCheckType property   
     ///</summary>   
     public int evi_iCheckType 
		 { 
		        
                    get{ return this._evi_iCheckType; }
        						set{ this._evi_iCheckType = value; } 										
	   }
	  ///<summary>
     ///evi_iDevice property   
     ///</summary>   
     public int evi_iDevice 
		 { 
		        
                    get{ return this._evi_iDevice; }
        						set{ this._evi_iDevice = value; } 										
	   }
	  ///<summary>
     ///evi_iStatus property   
     ///</summary>   
     public int evi_iStatus 
		 { 
		        
                    get{ return this._evi_iStatus; }
        						set{ this._evi_iStatus = value; } 										
	   }
	  ///<summary>
     ///evi_tStatusExec property   
     ///</summary>   
     public DateTime? evi_tStatusExec 
		 { 
		        
                    get{ return this._evi_tStatusExec; }
        						set{ this._evi_tStatusExec = value; } 										
	   }
	  ///<summary>
     ///evi_iGenRecId property   
     ///</summary>   
     public int evi_iGenRecId 
		 { 
		        
                    get{ return this._evi_iGenRecId; }
        						set{ this._evi_iGenRecId = value; } 										
	   }
	  ///<summary>
     ///Constructor   
     ///</summary>
        public CallerEventosInformados() : base()
        {
            InitClass();
        }  
 ///<summary>
     ///Constructor   
     ///</summary>		
        public CallerEventosInformados(int Id, string Name, int evi_iRecId, int evi_iCuentaId, int evi_iUsuario, string evi_cUsuarioNombre, string evi_cAlarma, string evi_cAlarmaDesc, int evi_iCheck, int evi_iCheckType, int evi_iDevice, int evi_iStatus, DateTime? evi_tStatusExec, int evi_iGenRecId) : base()
        {
            base.Id = Id;
						base.Name = Name;				 																																					 
				    this._evi_iRecId = evi_iRecId;
this._evi_iCuentaId = evi_iCuentaId;
this._evi_iUsuario = evi_iUsuario;
this._evi_cUsuarioNombre = evi_cUsuarioNombre;
this._evi_cAlarma = evi_cAlarma;
this._evi_cAlarmaDesc = evi_cAlarmaDesc;
this._evi_iCheck = evi_iCheck;
this._evi_iCheckType = evi_iCheckType;
this._evi_iDevice = evi_iDevice;
this._evi_iStatus = evi_iStatus;
this._evi_tStatusExec = evi_tStatusExec;
this._evi_iGenRecId = evi_iGenRecId;

            InitClass();
        }  								

				private void InitClass()
        {														
  				  base.Type = new ObjectType(7031, "EventosInformados");
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
			SimpleEventosInformados Simple = new SimpleEventosInformados();
			Simple.Id = base.Id;
			Simple.Name = base.Name;
			Simple.evi_iRecId = this._evi_iRecId;
Simple.evi_iCuentaId = this._evi_iCuentaId;
Simple.evi_iUsuario = this._evi_iUsuario;
Simple.evi_cUsuarioNombre = this._evi_cUsuarioNombre;
Simple.evi_cAlarma = this._evi_cAlarma;
Simple.evi_cAlarmaDesc = this._evi_cAlarmaDesc;
Simple.evi_iCheck = this._evi_iCheck;
Simple.evi_iCheckType = this._evi_iCheckType;
Simple.evi_iDevice = this._evi_iDevice;
Simple.evi_iStatus = this._evi_iStatus;
Simple.evi_tStatusExec = this._evi_tStatusExec;
Simple.evi_iGenRecId = this._evi_iGenRecId;

			return (SimpleBaseObject) Simple;
		}
 ///<summary>
     ///Sets a simpleobject   
     ///</summary>	
		public void SetSimpleObject(SimpleEventosInformados Simple)
		{
			base.Id = Simple.Id;
			base.Name = Simple.Name;
			this._evi_iRecId = Simple.evi_iRecId;
this._evi_iCuentaId = Simple.evi_iCuentaId;
this._evi_iUsuario = Simple.evi_iUsuario;
this._evi_cUsuarioNombre = Simple.evi_cUsuarioNombre;
this._evi_cAlarma = Simple.evi_cAlarma;
this._evi_cAlarmaDesc = Simple.evi_cAlarmaDesc;
this._evi_iCheck = Simple.evi_iCheck;
this._evi_iCheckType = Simple.evi_iCheckType;
this._evi_iDevice = Simple.evi_iDevice;
this._evi_iStatus = Simple.evi_iStatus;
this._evi_tStatusExec = Simple.evi_tStatusExec;
this._evi_iGenRecId = Simple.evi_iGenRecId;

		}
 ///<summary>
     ///Gets a baseobject   
     ///</summary>
		public override BaseObject GetBaseObject(SqlHelper SqlConfig, int UserId)
		{
			return new DalEventosInformados(SqlConfig, UserId, (SimpleEventosInformados) GetSimpleObject());
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
               dt.Columns.Add(new DataColumn("evi_iRecId", typeof (int)));               
							 dt.Columns.Add(new DataColumn("evi_iCuentaId", typeof (int)));               
							 dt.Columns.Add(new DataColumn("evi_iUsuario", typeof (int)));               
							 dt.Columns.Add(new DataColumn("evi_cUsuarioNombre", typeof (string)));               
							 dt.Columns.Add(new DataColumn("evi_cAlarma", typeof (string)));               
							 dt.Columns.Add(new DataColumn("evi_cAlarmaDesc", typeof (string)));               
							 dt.Columns.Add(new DataColumn("evi_iCheck", typeof (int)));               
							 dt.Columns.Add(new DataColumn("evi_iCheckType", typeof (int)));               
							 dt.Columns.Add(new DataColumn("evi_iDevice", typeof (int)));               
							 dt.Columns.Add(new DataColumn("evi_iStatus", typeof (int)));               
							 dt.Columns.Add(new DataColumn("evi_tStatusExec", typeof (DateTime)));               
							 dt.Columns.Add(new DataColumn("evi_iGenRecId", typeof (int)));               
							 										
               //create Row  
               dr = dt.NewRow();
               
               //set Row
							 dr["Id"] = base.Id;

							 dr["Name"] = base.Name;
dr["evi_iRecId"] = this._evi_iRecId;
dr["evi_iCuentaId"] = this._evi_iCuentaId;
dr["evi_iUsuario"] = this._evi_iUsuario;
dr["evi_cUsuarioNombre"] = this._evi_cUsuarioNombre;
dr["evi_cAlarma"] = this._evi_cAlarma;
dr["evi_cAlarmaDesc"] = this._evi_cAlarmaDesc;
dr["evi_iCheck"] = this._evi_iCheck;
dr["evi_iCheckType"] = this._evi_iCheckType;
dr["evi_iDevice"] = this._evi_iDevice;
dr["evi_iStatus"] = this._evi_iStatus;
dr["evi_tStatusExec"] = this._evi_tStatusExec;
dr["evi_iGenRecId"] = this._evi_iGenRecId;
							 
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
