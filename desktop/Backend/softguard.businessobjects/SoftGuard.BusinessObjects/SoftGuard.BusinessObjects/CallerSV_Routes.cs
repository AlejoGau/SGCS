
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
    public class CallerSV_Routes : CallerObject
    { 	
				     private int _svr_iid;
					
				     private int _svr_iCuentaId;
					
				     private string _svr_cName;
					
				     private string _svr_cDescripcion;
					
				     private string _svr_cRouteType;
					
				     private DateTime? _svr_dDateStart;
					
				     private int _svr_iParallel;
				 ///<summary>
     ///svr_iid property   
     ///</summary>   
     public int svr_iid 
		 { 
		        
                    get{ return this._svr_iid; }
        						set{ this._svr_iid = value; } 										
	   }
	  ///<summary>
     ///svr_iCuentaId property   
     ///</summary>   
     public int svr_iCuentaId 
		 { 
		        
                    get{ return this._svr_iCuentaId; }
        						set{ this._svr_iCuentaId = value; } 										
	   }
	  ///<summary>
     ///svr_cName property   
     ///</summary>   
     public string svr_cName 
		 { 
		        
                    get{ return this._svr_cName; }
        						set{ this._svr_cName = value; } 										
	   }
	  ///<summary>
     ///svr_cDescripcion property   
     ///</summary>   
     public string svr_cDescripcion 
		 { 
		        
                    get{ return this._svr_cDescripcion; }
        						set{ this._svr_cDescripcion = value; } 										
	   }
	  ///<summary>
     ///svr_cRouteType property   
     ///</summary>   
     public string svr_cRouteType 
		 { 
		        
                    get{ return this._svr_cRouteType; }
        						set{ this._svr_cRouteType = value; } 										
	   }
	  ///<summary>
     ///svr_dDateStart property   
     ///</summary>   
     public DateTime? svr_dDateStart 
		 { 
		        
                    get{ return this._svr_dDateStart; }
        						set{ this._svr_dDateStart = value; } 										
	   }
	  ///<summary>
     ///svr_iParallel property   
     ///</summary>   
     public int svr_iParallel 
		 { 
		        
                    get{ return this._svr_iParallel; }
        						set{ this._svr_iParallel = value; } 										
	   }
	  ///<summary>
     ///Constructor   
     ///</summary>
        public CallerSV_Routes() : base()
        {
            InitClass();
        }  
 ///<summary>
     ///Constructor   
     ///</summary>		
        public CallerSV_Routes(int Id, string Name, int svr_iid, int svr_iCuentaId, string svr_cName, string svr_cDescripcion, string svr_cRouteType, DateTime? svr_dDateStart, int svr_iParallel) : base()
        {
            base.Id = Id;
						base.Name = Name;				 																																					 
				    this._svr_iid = svr_iid;
this._svr_iCuentaId = svr_iCuentaId;
this._svr_cName = svr_cName;
this._svr_cDescripcion = svr_cDescripcion;
this._svr_cRouteType = svr_cRouteType;
this._svr_dDateStart = svr_dDateStart;
this._svr_iParallel = svr_iParallel;

            InitClass();
        }  								

				private void InitClass()
        {														
  				  base.Type = new ObjectType(3301, "SV_Routes");
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
			SimpleSV_Routes Simple = new SimpleSV_Routes();
			Simple.Id = base.Id;
			Simple.Name = base.Name;
			Simple.svr_iid = this._svr_iid;
Simple.svr_iCuentaId = this._svr_iCuentaId;
Simple.svr_cName = this._svr_cName;
Simple.svr_cDescripcion = this._svr_cDescripcion;
Simple.svr_cRouteType = this._svr_cRouteType;
Simple.svr_dDateStart = this._svr_dDateStart;
Simple.svr_iParallel = this._svr_iParallel;

			return (SimpleBaseObject) Simple;
		}
 ///<summary>
     ///Sets a simpleobject   
     ///</summary>	
		public void SetSimpleObject(SimpleSV_Routes Simple)
		{
			base.Id = Simple.Id;
			base.Name = Simple.Name;
			this._svr_iid = Simple.svr_iid;
this._svr_iCuentaId = Simple.svr_iCuentaId;
this._svr_cName = Simple.svr_cName;
this._svr_cDescripcion = Simple.svr_cDescripcion;
this._svr_cRouteType = Simple.svr_cRouteType;
this._svr_dDateStart = Simple.svr_dDateStart;
this._svr_iParallel = Simple.svr_iParallel;

		}
 ///<summary>
     ///Gets a baseobject   
     ///</summary>
		public override BaseObject GetBaseObject(SqlHelper SqlConfig, int UserId)
		{
			return new DalSV_Routes(SqlConfig, UserId, (SimpleSV_Routes) GetSimpleObject());
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
               dt.Columns.Add(new DataColumn("svr_iid", typeof (int)));               
							 dt.Columns.Add(new DataColumn("svr_iCuentaId", typeof (int)));               
							 dt.Columns.Add(new DataColumn("svr_cName", typeof (string)));               
							 dt.Columns.Add(new DataColumn("svr_cDescripcion", typeof (string)));               
							 dt.Columns.Add(new DataColumn("svr_cRouteType", typeof (string)));               
							 dt.Columns.Add(new DataColumn("svr_dDateStart", typeof (DateTime)));               
							 dt.Columns.Add(new DataColumn("svr_iParallel", typeof (int)));               
							 										
               //create Row  
               dr = dt.NewRow();
               
               //set Row
							 dr["Id"] = base.Id;

							 dr["Name"] = base.Name;
dr["svr_iid"] = this._svr_iid;
dr["svr_iCuentaId"] = this._svr_iCuentaId;
dr["svr_cName"] = this._svr_cName;
dr["svr_cDescripcion"] = this._svr_cDescripcion;
dr["svr_cRouteType"] = this._svr_cRouteType;
dr["svr_dDateStart"] = this._svr_dDateStart;
dr["svr_iParallel"] = this._svr_iParallel;
							 
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
