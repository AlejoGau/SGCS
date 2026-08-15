
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
    public class CallerTG_Routes : CallerObject
    { 	
				     private int _cuentaId;
					
				     private int _userId;
					
				     private string _routetype;
					
				     private DateTime? _datestart;
					
				     private int _time;
					
				     private int _startbeforetolerance;
					
				     private int _startaftertolerance;
					
				     private int _endbeforetolerance;
					
				     private int _endaftertolerance;
				 ///<summary>
     ///cuentaId property   
     ///</summary>   
     public int cuentaId 
		 { 
		        
                    get{ return this._cuentaId; }
        						set{ this._cuentaId = value; } 										
	   }
	  ///<summary>
     ///userId property   
     ///</summary>   
     public int userId 
		 { 
		        
                    get{ return this._userId; }
        						set{ this._userId = value; } 										
	   }
	  ///<summary>
     ///routetype property   
     ///</summary>   
     public string routetype 
		 { 
		        
                    get{ return this._routetype; }
        						set{ this._routetype = value; } 										
	   }
	  ///<summary>
     ///datestart property   
     ///</summary>   
     public DateTime? datestart 
		 { 
		        
                    get{ return this._datestart; }
        						set{ this._datestart = value; } 										
	   }
	  ///<summary>
     ///time property   
     ///</summary>   
     public int time 
		 { 
		        
                    get{ return this._time; }
        						set{ this._time = value; } 										
	   }
	  ///<summary>
     ///startbeforetolerance property   
     ///</summary>   
     public int startbeforetolerance 
		 { 
		        
                    get{ return this._startbeforetolerance; }
        						set{ this._startbeforetolerance = value; } 										
	   }
	  ///<summary>
     ///startaftertolerance property   
     ///</summary>   
     public int startaftertolerance 
		 { 
		        
                    get{ return this._startaftertolerance; }
        						set{ this._startaftertolerance = value; } 										
	   }
	  ///<summary>
     ///endbeforetolerance property   
     ///</summary>   
     public int endbeforetolerance 
		 { 
		        
                    get{ return this._endbeforetolerance; }
        						set{ this._endbeforetolerance = value; } 										
	   }
	  ///<summary>
     ///endaftertolerance property   
     ///</summary>   
     public int endaftertolerance 
		 { 
		        
                    get{ return this._endaftertolerance; }
        						set{ this._endaftertolerance = value; } 										
	   }
	  ///<summary>
     ///Constructor   
     ///</summary>
        public CallerTG_Routes() : base()
        {
            InitClass();
        }  
 ///<summary>
     ///Constructor   
     ///</summary>		
        public CallerTG_Routes(int Id, string Name, int cuentaId, int userId, string routetype, DateTime? datestart, int time, int startbeforetolerance, int startaftertolerance, int endbeforetolerance, int endaftertolerance) : base()
        {
            base.Id = Id;
						base.Name = Name;				 																																					 
				    this._cuentaId = cuentaId;
this._userId = userId;
this._routetype = routetype;
this._datestart = datestart;
this._time = time;
this._startbeforetolerance = startbeforetolerance;
this._startaftertolerance = startaftertolerance;
this._endbeforetolerance = endbeforetolerance;
this._endaftertolerance = endaftertolerance;

            InitClass();
        }  								

				private void InitClass()
        {														
  				  base.Type = new ObjectType(3170, "TG_Routes");
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
			SimpleTG_Routes Simple = new SimpleTG_Routes();
			Simple.Id = base.Id;
			Simple.Name = base.Name;
			Simple.cuentaId = this._cuentaId;
Simple.userId = this._userId;
Simple.routetype = this._routetype;
Simple.datestart = this._datestart;
Simple.time = this._time;
Simple.startbeforetolerance = this._startbeforetolerance;
Simple.startaftertolerance = this._startaftertolerance;
Simple.endbeforetolerance = this._endbeforetolerance;
Simple.endaftertolerance = this._endaftertolerance;

			return (SimpleBaseObject) Simple;
		}
 ///<summary>
     ///Sets a simpleobject   
     ///</summary>	
		public void SetSimpleObject(SimpleTG_Routes Simple)
		{
			base.Id = Simple.Id;
			base.Name = Simple.Name;
			this._cuentaId = Simple.cuentaId;
this._userId = Simple.userId;
this._routetype = Simple.routetype;
this._datestart = Simple.datestart;
this._time = Simple.time;
this._startbeforetolerance = Simple.startbeforetolerance;
this._startaftertolerance = Simple.startaftertolerance;
this._endbeforetolerance = Simple.endbeforetolerance;
this._endaftertolerance = Simple.endaftertolerance;

		}
 ///<summary>
     ///Gets a baseobject   
     ///</summary>
		public override BaseObject GetBaseObject(SqlHelper SqlConfig, int UserId)
		{
			return new DalTG_Routes(SqlConfig, UserId, (SimpleTG_Routes) GetSimpleObject());
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
               dt.Columns.Add(new DataColumn("cuentaId", typeof (int)));               
							 dt.Columns.Add(new DataColumn("userId", typeof (int)));               
							 dt.Columns.Add(new DataColumn("routetype", typeof (string)));               
							 dt.Columns.Add(new DataColumn("datestart", typeof (DateTime)));               
							 dt.Columns.Add(new DataColumn("time", typeof (int)));               
							 dt.Columns.Add(new DataColumn("startbeforetolerance", typeof (int)));               
							 dt.Columns.Add(new DataColumn("startaftertolerance", typeof (int)));               
							 dt.Columns.Add(new DataColumn("endbeforetolerance", typeof (int)));               
							 dt.Columns.Add(new DataColumn("endaftertolerance", typeof (int)));               
							 										
               //create Row  
               dr = dt.NewRow();
               
               //set Row
							 dr["Id"] = base.Id;

							 dr["Name"] = base.Name;
dr["cuentaId"] = this._cuentaId;
dr["userId"] = this._userId;
dr["routetype"] = this._routetype;
dr["datestart"] = this._datestart;
dr["time"] = this._time;
dr["startbeforetolerance"] = this._startbeforetolerance;
dr["startaftertolerance"] = this._startaftertolerance;
dr["endbeforetolerance"] = this._endbeforetolerance;
dr["endaftertolerance"] = this._endaftertolerance;
							 
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
