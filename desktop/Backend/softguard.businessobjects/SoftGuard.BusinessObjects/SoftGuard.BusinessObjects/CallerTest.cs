
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
    public class CallerTest : CallerObject
    { 	
				     private Decimal _tst_ncada;
					
				     private Decimal _tst_ntipo;
					
				     private int _tst_ireinicio;
					
				     private string _tst_calarma;
					
				     private Decimal _tst_ncada2;
					
				     private Decimal _tst_ntipo2;
					
				     private string _tst_calarmaesperada;
					
				     private string _tst_calarmagenerar;
					
				     private Decimal _tst_ncada3;
					
				     private Decimal _tst_ntipo3;
					
				     private string _tst_calarma3esperada;
					
				     private string _tst_calarma3generar;
					
				     private string _tst_cAlarmaAutoprocesa;
					
				     private string _tst_cAlarma2Autoprocesa;
					
				     private string _tst_cAlarma3Autoprocesa;
					
				     private int _tst_iTiempoCtrl;
					
				     private int _tst_iCtrlExec;
					
				     private string _tst_cAlarmaCtrlGenerar;
				 ///<summary>
     ///tst_ncada property   
     ///</summary>   
     public Decimal tst_ncada 
		 { 
		        
                    get{ return this._tst_ncada; }
        						set{ this._tst_ncada = value; } 										
	   }
	  ///<summary>
     ///tst_ntipo property   
     ///</summary>   
     public Decimal tst_ntipo 
		 { 
		        
                    get{ return this._tst_ntipo; }
        						set{ this._tst_ntipo = value; } 										
	   }
	  ///<summary>
     ///tst_ireinicio property   
     ///</summary>   
     public int tst_ireinicio 
		 { 
		        
                    get{ return this._tst_ireinicio; }
        						set{ this._tst_ireinicio = value; } 										
	   }
	  ///<summary>
     ///tst_calarma property   
     ///</summary>   
     public string tst_calarma 
		 { 
		        
                    get{ return this._tst_calarma; }
        						set{ this._tst_calarma = value; } 										
	   }
	  ///<summary>
     ///tst_ncada2 property   
     ///</summary>   
     public Decimal tst_ncada2 
		 { 
		        
                    get{ return this._tst_ncada2; }
        						set{ this._tst_ncada2 = value; } 										
	   }
	  ///<summary>
     ///tst_ntipo2 property   
     ///</summary>   
     public Decimal tst_ntipo2 
		 { 
		        
                    get{ return this._tst_ntipo2; }
        						set{ this._tst_ntipo2 = value; } 										
	   }
	  ///<summary>
     ///tst_calarmaesperada property   
     ///</summary>   
     public string tst_calarmaesperada 
		 { 
		        
                    get{ return this._tst_calarmaesperada; }
        						set{ this._tst_calarmaesperada = value; } 										
	   }
	  ///<summary>
     ///tst_calarmagenerar property   
     ///</summary>   
     public string tst_calarmagenerar 
		 { 
		        
                    get{ return this._tst_calarmagenerar; }
        						set{ this._tst_calarmagenerar = value; } 										
	   }
	  ///<summary>
     ///tst_ncada3 property   
     ///</summary>   
     public Decimal tst_ncada3 
		 { 
		        
                    get{ return this._tst_ncada3; }
        						set{ this._tst_ncada3 = value; } 										
	   }
	  ///<summary>
     ///tst_ntipo3 property   
     ///</summary>   
     public Decimal tst_ntipo3 
		 { 
		        
                    get{ return this._tst_ntipo3; }
        						set{ this._tst_ntipo3 = value; } 										
	   }
	  ///<summary>
     ///tst_calarma3esperada property   
     ///</summary>   
     public string tst_calarma3esperada 
		 { 
		        
                    get{ return this._tst_calarma3esperada; }
        						set{ this._tst_calarma3esperada = value; } 										
	   }
	  ///<summary>
     ///tst_calarma3generar property   
     ///</summary>   
     public string tst_calarma3generar 
		 { 
		        
                    get{ return this._tst_calarma3generar; }
        						set{ this._tst_calarma3generar = value; } 										
	   }
	  ///<summary>
     ///tst_cAlarmaAutoprocesa property   
     ///</summary>   
     public string tst_cAlarmaAutoprocesa 
		 { 
		        
                    get{ return this._tst_cAlarmaAutoprocesa; }
        						set{ this._tst_cAlarmaAutoprocesa = value; } 										
	   }
	  ///<summary>
     ///tst_cAlarma2Autoprocesa property   
     ///</summary>   
     public string tst_cAlarma2Autoprocesa 
		 { 
		        
                    get{ return this._tst_cAlarma2Autoprocesa; }
        						set{ this._tst_cAlarma2Autoprocesa = value; } 										
	   }
	  ///<summary>
     ///tst_cAlarma3Autoprocesa property   
     ///</summary>   
     public string tst_cAlarma3Autoprocesa 
		 { 
		        
                    get{ return this._tst_cAlarma3Autoprocesa; }
        						set{ this._tst_cAlarma3Autoprocesa = value; } 										
	   }
	  ///<summary>
     ///tst_iTiempoCtrl property   
     ///</summary>   
     public int tst_iTiempoCtrl 
		 { 
		        
                    get{ return this._tst_iTiempoCtrl; }
        						set{ this._tst_iTiempoCtrl = value; } 										
	   }
	  ///<summary>
     ///tst_iCtrlExec property   
     ///</summary>   
     public int tst_iCtrlExec 
		 { 
		        
                    get{ return this._tst_iCtrlExec; }
        						set{ this._tst_iCtrlExec = value; } 										
	   }
	  ///<summary>
     ///tst_cAlarmaCtrlGenerar property   
     ///</summary>   
     public string tst_cAlarmaCtrlGenerar 
		 { 
		        
                    get{ return this._tst_cAlarmaCtrlGenerar; }
        						set{ this._tst_cAlarmaCtrlGenerar = value; } 										
	   }
	  ///<summary>
     ///Constructor   
     ///</summary>
        public CallerTest() : base()
        {
            InitClass();
        }  
 ///<summary>
     ///Constructor   
     ///</summary>		
        public CallerTest(int Id, string Name, Decimal tst_ncada, Decimal tst_ntipo, int tst_ireinicio, string tst_calarma, Decimal tst_ncada2, Decimal tst_ntipo2, string tst_calarmaesperada, string tst_calarmagenerar, Decimal tst_ncada3, Decimal tst_ntipo3, string tst_calarma3esperada, string tst_calarma3generar, string tst_cAlarmaAutoprocesa, string tst_cAlarma2Autoprocesa, string tst_cAlarma3Autoprocesa, int tst_iTiempoCtrl, int tst_iCtrlExec, string tst_cAlarmaCtrlGenerar) : base()
        {
            base.Id = Id;
						base.Name = Name;				 																																					 
				    this._tst_ncada = tst_ncada;
this._tst_ntipo = tst_ntipo;
this._tst_ireinicio = tst_ireinicio;
this._tst_calarma = tst_calarma;
this._tst_ncada2 = tst_ncada2;
this._tst_ntipo2 = tst_ntipo2;
this._tst_calarmaesperada = tst_calarmaesperada;
this._tst_calarmagenerar = tst_calarmagenerar;
this._tst_ncada3 = tst_ncada3;
this._tst_ntipo3 = tst_ntipo3;
this._tst_calarma3esperada = tst_calarma3esperada;
this._tst_calarma3generar = tst_calarma3generar;
this._tst_cAlarmaAutoprocesa = tst_cAlarmaAutoprocesa;
this._tst_cAlarma2Autoprocesa = tst_cAlarma2Autoprocesa;
this._tst_cAlarma3Autoprocesa = tst_cAlarma3Autoprocesa;
this._tst_iTiempoCtrl = tst_iTiempoCtrl;
this._tst_iCtrlExec = tst_iCtrlExec;
this._tst_cAlarmaCtrlGenerar = tst_cAlarmaCtrlGenerar;

            InitClass();
        }  								

				private void InitClass()
        {														
  				  base.Type = new ObjectType(3031, "Test");
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
			SimpleTest Simple = new SimpleTest();
			Simple.Id = base.Id;
			Simple.Name = base.Name;
			Simple.tst_ncada = this._tst_ncada;
Simple.tst_ntipo = this._tst_ntipo;
Simple.tst_ireinicio = this._tst_ireinicio;
Simple.tst_calarma = this._tst_calarma;
Simple.tst_ncada2 = this._tst_ncada2;
Simple.tst_ntipo2 = this._tst_ntipo2;
Simple.tst_calarmaesperada = this._tst_calarmaesperada;
Simple.tst_calarmagenerar = this._tst_calarmagenerar;
Simple.tst_ncada3 = this._tst_ncada3;
Simple.tst_ntipo3 = this._tst_ntipo3;
Simple.tst_calarma3esperada = this._tst_calarma3esperada;
Simple.tst_calarma3generar = this._tst_calarma3generar;
Simple.tst_cAlarmaAutoprocesa = this._tst_cAlarmaAutoprocesa;
Simple.tst_cAlarma2Autoprocesa = this._tst_cAlarma2Autoprocesa;
Simple.tst_cAlarma3Autoprocesa = this._tst_cAlarma3Autoprocesa;
Simple.tst_iTiempoCtrl = this._tst_iTiempoCtrl;
Simple.tst_iCtrlExec = this._tst_iCtrlExec;
Simple.tst_cAlarmaCtrlGenerar = this._tst_cAlarmaCtrlGenerar;

			return (SimpleBaseObject) Simple;
		}
 ///<summary>
     ///Sets a simpleobject   
     ///</summary>	
		public void SetSimpleObject(SimpleTest Simple)
		{
			base.Id = Simple.Id;
			base.Name = Simple.Name;
			this._tst_ncada = Simple.tst_ncada;
this._tst_ntipo = Simple.tst_ntipo;
this._tst_ireinicio = Simple.tst_ireinicio;
this._tst_calarma = Simple.tst_calarma;
this._tst_ncada2 = Simple.tst_ncada2;
this._tst_ntipo2 = Simple.tst_ntipo2;
this._tst_calarmaesperada = Simple.tst_calarmaesperada;
this._tst_calarmagenerar = Simple.tst_calarmagenerar;
this._tst_ncada3 = Simple.tst_ncada3;
this._tst_ntipo3 = Simple.tst_ntipo3;
this._tst_calarma3esperada = Simple.tst_calarma3esperada;
this._tst_calarma3generar = Simple.tst_calarma3generar;
this._tst_cAlarmaAutoprocesa = Simple.tst_cAlarmaAutoprocesa;
this._tst_cAlarma2Autoprocesa = Simple.tst_cAlarma2Autoprocesa;
this._tst_cAlarma3Autoprocesa = Simple.tst_cAlarma3Autoprocesa;
this._tst_iTiempoCtrl = Simple.tst_iTiempoCtrl;
this._tst_iCtrlExec = Simple.tst_iCtrlExec;
this._tst_cAlarmaCtrlGenerar = Simple.tst_cAlarmaCtrlGenerar;

		}
 ///<summary>
     ///Gets a baseobject   
     ///</summary>
		public override BaseObject GetBaseObject(SqlHelper SqlConfig, int UserId)
		{
			return new DalTest(SqlConfig, UserId, (SimpleTest) GetSimpleObject());
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
               dt.Columns.Add(new DataColumn("tst_ncada", typeof (Decimal)));               
							 dt.Columns.Add(new DataColumn("tst_ntipo", typeof (Decimal)));               
							 dt.Columns.Add(new DataColumn("tst_ireinicio", typeof (int)));               
							 dt.Columns.Add(new DataColumn("tst_calarma", typeof (string)));               
							 dt.Columns.Add(new DataColumn("tst_ncada2", typeof (Decimal)));               
							 dt.Columns.Add(new DataColumn("tst_ntipo2", typeof (Decimal)));               
							 dt.Columns.Add(new DataColumn("tst_calarmaesperada", typeof (string)));               
							 dt.Columns.Add(new DataColumn("tst_calarmagenerar", typeof (string)));               
							 dt.Columns.Add(new DataColumn("tst_ncada3", typeof (Decimal)));               
							 dt.Columns.Add(new DataColumn("tst_ntipo3", typeof (Decimal)));               
							 dt.Columns.Add(new DataColumn("tst_calarma3esperada", typeof (string)));               
							 dt.Columns.Add(new DataColumn("tst_calarma3generar", typeof (string)));               
							 dt.Columns.Add(new DataColumn("tst_cAlarmaAutoprocesa", typeof (string)));               
							 dt.Columns.Add(new DataColumn("tst_cAlarma2Autoprocesa", typeof (string)));               
							 dt.Columns.Add(new DataColumn("tst_cAlarma3Autoprocesa", typeof (string)));               
							 dt.Columns.Add(new DataColumn("tst_iTiempoCtrl", typeof (int)));               
							 dt.Columns.Add(new DataColumn("tst_iCtrlExec", typeof (int)));               
							 dt.Columns.Add(new DataColumn("tst_cAlarmaCtrlGenerar", typeof (string)));               
							 										
               //create Row  
               dr = dt.NewRow();
               
               //set Row
							 dr["Id"] = base.Id;

							 dr["Name"] = base.Name;
dr["tst_ncada"] = this._tst_ncada;
dr["tst_ntipo"] = this._tst_ntipo;
dr["tst_ireinicio"] = this._tst_ireinicio;
dr["tst_calarma"] = this._tst_calarma;
dr["tst_ncada2"] = this._tst_ncada2;
dr["tst_ntipo2"] = this._tst_ntipo2;
dr["tst_calarmaesperada"] = this._tst_calarmaesperada;
dr["tst_calarmagenerar"] = this._tst_calarmagenerar;
dr["tst_ncada3"] = this._tst_ncada3;
dr["tst_ntipo3"] = this._tst_ntipo3;
dr["tst_calarma3esperada"] = this._tst_calarma3esperada;
dr["tst_calarma3generar"] = this._tst_calarma3generar;
dr["tst_cAlarmaAutoprocesa"] = this._tst_cAlarmaAutoprocesa;
dr["tst_cAlarma2Autoprocesa"] = this._tst_cAlarma2Autoprocesa;
dr["tst_cAlarma3Autoprocesa"] = this._tst_cAlarma3Autoprocesa;
dr["tst_iTiempoCtrl"] = this._tst_iTiempoCtrl;
dr["tst_iCtrlExec"] = this._tst_iCtrlExec;
dr["tst_cAlarmaCtrlGenerar"] = this._tst_cAlarmaCtrlGenerar;
							 
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
