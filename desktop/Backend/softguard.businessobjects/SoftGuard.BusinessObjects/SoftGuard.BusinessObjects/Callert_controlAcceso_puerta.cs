
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
    public class Callert_controlAcceso_puerta : CallerObject
    { 	
				     private string _cap_nombre;
					
				     private int _cap_idCta;
					
				     private long _cap_iIngreso;
					
				     private long _cap_iEgreso;
					
				     private long _cap_iIngreso2;
					
				     private long _cap_iEgreso2;
					
				     private long _cap_iIngreso3;
					
				     private long _cap_iEgreso3;
					
				     private long _cap_iIngreso4;
					
				     private long _cap_iEgreso4;
				 ///<summary>
     ///cap_nombre property   
     ///</summary>   
     public string cap_nombre 
		 { 
		        
                    get{ return this._cap_nombre; }
        						set{ this._cap_nombre = value; } 										
	   }
	  ///<summary>
     ///cap_idCta property   
     ///</summary>   
     public int cap_idCta 
		 { 
		        
                    get{ return this._cap_idCta; }
        						set{ this._cap_idCta = value; } 										
	   }
	  ///<summary>
     ///cap_iIngreso property   
     ///</summary>   
     public long cap_iIngreso 
		 { 
		        
                    get{ return this._cap_iIngreso; }
        						set{ this._cap_iIngreso = value; } 										
	   }
	  ///<summary>
     ///cap_iEgreso property   
     ///</summary>   
     public long cap_iEgreso 
		 { 
		        
                    get{ return this._cap_iEgreso; }
        						set{ this._cap_iEgreso = value; } 										
	   }
	  ///<summary>
     ///cap_iIngreso2 property   
     ///</summary>   
     public long cap_iIngreso2 
		 { 
		        
                    get{ return this._cap_iIngreso2; }
        						set{ this._cap_iIngreso2 = value; } 										
	   }
	  ///<summary>
     ///cap_iEgreso2 property   
     ///</summary>   
     public long cap_iEgreso2 
		 { 
		        
                    get{ return this._cap_iEgreso2; }
        						set{ this._cap_iEgreso2 = value; } 										
	   }
	  ///<summary>
     ///cap_iIngreso3 property   
     ///</summary>   
     public long cap_iIngreso3 
		 { 
		        
                    get{ return this._cap_iIngreso3; }
        						set{ this._cap_iIngreso3 = value; } 										
	   }
	  ///<summary>
     ///cap_iEgreso3 property   
     ///</summary>   
     public long cap_iEgreso3 
		 { 
		        
                    get{ return this._cap_iEgreso3; }
        						set{ this._cap_iEgreso3 = value; } 										
	   }
	  ///<summary>
     ///cap_iIngreso4 property   
     ///</summary>   
     public long cap_iIngreso4 
		 { 
		        
                    get{ return this._cap_iIngreso4; }
        						set{ this._cap_iIngreso4 = value; } 										
	   }
	  ///<summary>
     ///cap_iEgreso4 property   
     ///</summary>   
     public long cap_iEgreso4 
		 { 
		        
                    get{ return this._cap_iEgreso4; }
        						set{ this._cap_iEgreso4 = value; } 										
	   }
	  ///<summary>
     ///Constructor   
     ///</summary>
        public Callert_controlAcceso_puerta() : base()
        {
            InitClass();
        }  
 ///<summary>
     ///Constructor   
     ///</summary>		
        public Callert_controlAcceso_puerta(int Id, string Name, string cap_nombre, int cap_idCta, long cap_iIngreso, long cap_iEgreso, long cap_iIngreso2, long cap_iEgreso2, long cap_iIngreso3, long cap_iEgreso3, long cap_iIngreso4, long cap_iEgreso4) : base()
        {
            base.Id = Id;
						base.Name = Name;				 																																					 
				    this._cap_nombre = cap_nombre;
this._cap_idCta = cap_idCta;
this._cap_iIngreso = cap_iIngreso;
this._cap_iEgreso = cap_iEgreso;
this._cap_iIngreso2 = cap_iIngreso2;
this._cap_iEgreso2 = cap_iEgreso2;
this._cap_iIngreso3 = cap_iIngreso3;
this._cap_iEgreso3 = cap_iEgreso3;
this._cap_iIngreso4 = cap_iIngreso4;
this._cap_iEgreso4 = cap_iEgreso4;

            InitClass();
        }  								

				private void InitClass()
        {														
  				  base.Type = new ObjectType(3209, "t_controlAcceso_puerta");
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
			Simplet_controlAcceso_puerta Simple = new Simplet_controlAcceso_puerta();
			Simple.Id = base.Id;
			Simple.Name = base.Name;
			Simple.cap_nombre = this._cap_nombre;
Simple.cap_idCta = this._cap_idCta;
Simple.cap_iIngreso = this._cap_iIngreso;
Simple.cap_iEgreso = this._cap_iEgreso;
Simple.cap_iIngreso2 = this._cap_iIngreso2;
Simple.cap_iEgreso2 = this._cap_iEgreso2;
Simple.cap_iIngreso3 = this._cap_iIngreso3;
Simple.cap_iEgreso3 = this._cap_iEgreso3;
Simple.cap_iIngreso4 = this._cap_iIngreso4;
Simple.cap_iEgreso4 = this._cap_iEgreso4;

			return (SimpleBaseObject) Simple;
		}
 ///<summary>
     ///Sets a simpleobject   
     ///</summary>	
		public void SetSimpleObject(Simplet_controlAcceso_puerta Simple)
		{
			base.Id = Simple.Id;
			base.Name = Simple.Name;
			this._cap_nombre = Simple.cap_nombre;
this._cap_idCta = Simple.cap_idCta;
this._cap_iIngreso = Simple.cap_iIngreso;
this._cap_iEgreso = Simple.cap_iEgreso;
this._cap_iIngreso2 = Simple.cap_iIngreso2;
this._cap_iEgreso2 = Simple.cap_iEgreso2;
this._cap_iIngreso3 = Simple.cap_iIngreso3;
this._cap_iEgreso3 = Simple.cap_iEgreso3;
this._cap_iIngreso4 = Simple.cap_iIngreso4;
this._cap_iEgreso4 = Simple.cap_iEgreso4;

		}
 ///<summary>
     ///Gets a baseobject   
     ///</summary>
		public override BaseObject GetBaseObject(SqlHelper SqlConfig, int UserId)
		{
			return new Dalt_controlAcceso_puerta(SqlConfig, UserId, (Simplet_controlAcceso_puerta) GetSimpleObject());
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
               dt.Columns.Add(new DataColumn("cap_nombre", typeof (string)));               
							 dt.Columns.Add(new DataColumn("cap_idCta", typeof (int)));               
							 dt.Columns.Add(new DataColumn("cap_iIngreso", typeof (long)));               
							 dt.Columns.Add(new DataColumn("cap_iEgreso", typeof (long)));               
							 dt.Columns.Add(new DataColumn("cap_iIngreso2", typeof (long)));               
							 dt.Columns.Add(new DataColumn("cap_iEgreso2", typeof (long)));               
							 dt.Columns.Add(new DataColumn("cap_iIngreso3", typeof (long)));               
							 dt.Columns.Add(new DataColumn("cap_iEgreso3", typeof (long)));               
							 dt.Columns.Add(new DataColumn("cap_iIngreso4", typeof (long)));               
							 dt.Columns.Add(new DataColumn("cap_iEgreso4", typeof (long)));               
							 										
               //create Row  
               dr = dt.NewRow();
               
               //set Row
							 dr["Id"] = base.Id;

							 dr["Name"] = base.Name;
dr["cap_nombre"] = this._cap_nombre;
dr["cap_idCta"] = this._cap_idCta;
dr["cap_iIngreso"] = this._cap_iIngreso;
dr["cap_iEgreso"] = this._cap_iEgreso;
dr["cap_iIngreso2"] = this._cap_iIngreso2;
dr["cap_iEgreso2"] = this._cap_iEgreso2;
dr["cap_iIngreso3"] = this._cap_iIngreso3;
dr["cap_iEgreso3"] = this._cap_iEgreso3;
dr["cap_iIngreso4"] = this._cap_iIngreso4;
dr["cap_iEgreso4"] = this._cap_iEgreso4;
							 
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
