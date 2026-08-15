
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
    public class Callerp_comandos_ip : CallerObject
    { 	
				     private DateTime? _cmd_tfechahora;
					
				     private int _cmd_idCuenta;
					
				     private int _cmd_idReceptor;
					
				     private int _cmd_iComando;
					
				     private string _cmd_cValores;
					
				     private Decimal _cmd_nEstado;
					
				     private string _cmd_cObservaciones;
					
				     private int _cmd_iEsCustom;
					
				     private string _cmd_cAlarmaGenerar;
				 ///<summary>
     ///cmd_tfechahora property   
     ///</summary>   
     public DateTime? cmd_tfechahora 
		 { 
		        
                    get{ return this._cmd_tfechahora; }
        						set{ this._cmd_tfechahora = value; } 										
	   }
	  ///<summary>
     ///cmd_idCuenta property   
     ///</summary>   
     public int cmd_idCuenta 
		 { 
		        
                    get{ return this._cmd_idCuenta; }
        						set{ this._cmd_idCuenta = value; } 										
	   }
	  ///<summary>
     ///cmd_idReceptor property   
     ///</summary>   
     public int cmd_idReceptor 
		 { 
		        
                    get{ return this._cmd_idReceptor; }
        						set{ this._cmd_idReceptor = value; } 										
	   }
	  ///<summary>
     ///cmd_iComando property   
     ///</summary>   
     public int cmd_iComando 
		 { 
		        
                    get{ return this._cmd_iComando; }
        						set{ this._cmd_iComando = value; } 										
	   }
	  ///<summary>
     ///cmd_cValores property   
     ///</summary>   
     public string cmd_cValores 
		 { 
		        
                    get{ return this._cmd_cValores; }
        						set{ this._cmd_cValores = value; } 										
	   }
	  ///<summary>
     ///cmd_nEstado property   
     ///</summary>   
     public Decimal cmd_nEstado 
		 { 
		        
                    get{ return this._cmd_nEstado; }
        						set{ this._cmd_nEstado = value; } 										
	   }
	  ///<summary>
     ///cmd_cObservaciones property   
     ///</summary>   
     public string cmd_cObservaciones 
		 { 
		        
                    get{ return this._cmd_cObservaciones; }
        						set{ this._cmd_cObservaciones = value; } 										
	   }
	  ///<summary>
     ///cmd_iEsCustom property   
     ///</summary>   
     public int cmd_iEsCustom 
		 { 
		        
                    get{ return this._cmd_iEsCustom; }
        						set{ this._cmd_iEsCustom = value; } 										
	   }
	  ///<summary>
     ///cmd_cAlarmaGenerar property   
     ///</summary>   
     public string cmd_cAlarmaGenerar 
		 { 
		        
                    get{ return this._cmd_cAlarmaGenerar; }
        						set{ this._cmd_cAlarmaGenerar = value; } 										
	   }
	  ///<summary>
     ///Constructor   
     ///</summary>
        public Callerp_comandos_ip() : base()
        {
            InitClass();
        }  
 ///<summary>
     ///Constructor   
     ///</summary>		
        public Callerp_comandos_ip(int Id, string Name, DateTime? cmd_tfechahora, int cmd_idCuenta, int cmd_idReceptor, int cmd_iComando, string cmd_cValores, Decimal cmd_nEstado, string cmd_cObservaciones, int cmd_iEsCustom, string cmd_cAlarmaGenerar) : base()
        {
            base.Id = Id;
						base.Name = Name;				 																																					 
				    this._cmd_tfechahora = cmd_tfechahora;
this._cmd_idCuenta = cmd_idCuenta;
this._cmd_idReceptor = cmd_idReceptor;
this._cmd_iComando = cmd_iComando;
this._cmd_cValores = cmd_cValores;
this._cmd_nEstado = cmd_nEstado;
this._cmd_cObservaciones = cmd_cObservaciones;
this._cmd_iEsCustom = cmd_iEsCustom;
this._cmd_cAlarmaGenerar = cmd_cAlarmaGenerar;

            InitClass();
        }  								

				private void InitClass()
        {														
  				  base.Type = new ObjectType(3065, "p_comandos_ip");
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
			Simplep_comandos_ip Simple = new Simplep_comandos_ip();
			Simple.Id = base.Id;
			Simple.Name = base.Name;
			Simple.cmd_tfechahora = this._cmd_tfechahora;
Simple.cmd_idCuenta = this._cmd_idCuenta;
Simple.cmd_idReceptor = this._cmd_idReceptor;
Simple.cmd_iComando = this._cmd_iComando;
Simple.cmd_cValores = this._cmd_cValores;
Simple.cmd_nEstado = this._cmd_nEstado;
Simple.cmd_cObservaciones = this._cmd_cObservaciones;
Simple.cmd_iEsCustom = this._cmd_iEsCustom;
Simple.cmd_cAlarmaGenerar = this._cmd_cAlarmaGenerar;

			return (SimpleBaseObject) Simple;
		}
 ///<summary>
     ///Sets a simpleobject   
     ///</summary>	
		public void SetSimpleObject(Simplep_comandos_ip Simple)
		{
			base.Id = Simple.Id;
			base.Name = Simple.Name;
			this._cmd_tfechahora = Simple.cmd_tfechahora;
this._cmd_idCuenta = Simple.cmd_idCuenta;
this._cmd_idReceptor = Simple.cmd_idReceptor;
this._cmd_iComando = Simple.cmd_iComando;
this._cmd_cValores = Simple.cmd_cValores;
this._cmd_nEstado = Simple.cmd_nEstado;
this._cmd_cObservaciones = Simple.cmd_cObservaciones;
this._cmd_iEsCustom = Simple.cmd_iEsCustom;
this._cmd_cAlarmaGenerar = Simple.cmd_cAlarmaGenerar;

		}
 ///<summary>
     ///Gets a baseobject   
     ///</summary>
		public override BaseObject GetBaseObject(SqlHelper SqlConfig, int UserId)
		{
			return new Dalp_comandos_ip(SqlConfig, UserId, (Simplep_comandos_ip) GetSimpleObject());
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
               dt.Columns.Add(new DataColumn("cmd_tfechahora", typeof (DateTime)));               
							 dt.Columns.Add(new DataColumn("cmd_idCuenta", typeof (int)));               
							 dt.Columns.Add(new DataColumn("cmd_idReceptor", typeof (int)));               
							 dt.Columns.Add(new DataColumn("cmd_iComando", typeof (int)));               
							 dt.Columns.Add(new DataColumn("cmd_cValores", typeof (string)));               
							 dt.Columns.Add(new DataColumn("cmd_nEstado", typeof (Decimal)));               
							 dt.Columns.Add(new DataColumn("cmd_cObservaciones", typeof (string)));               
							 dt.Columns.Add(new DataColumn("cmd_iEsCustom", typeof (int)));               
							 dt.Columns.Add(new DataColumn("cmd_cAlarmaGenerar", typeof (string)));               
							 										
               //create Row  
               dr = dt.NewRow();
               
               //set Row
							 dr["Id"] = base.Id;

							 dr["Name"] = base.Name;
dr["cmd_tfechahora"] = this._cmd_tfechahora;
dr["cmd_idCuenta"] = this._cmd_idCuenta;
dr["cmd_idReceptor"] = this._cmd_idReceptor;
dr["cmd_iComando"] = this._cmd_iComando;
dr["cmd_cValores"] = this._cmd_cValores;
dr["cmd_nEstado"] = this._cmd_nEstado;
dr["cmd_cObservaciones"] = this._cmd_cObservaciones;
dr["cmd_iEsCustom"] = this._cmd_iEsCustom;
dr["cmd_cAlarmaGenerar"] = this._cmd_cAlarmaGenerar;
							 
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
