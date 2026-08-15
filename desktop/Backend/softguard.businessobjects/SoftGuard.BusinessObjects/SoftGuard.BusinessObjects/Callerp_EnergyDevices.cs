
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
    public class Callerp_EnergyDevices : CallerObject
    { 	
				     private int _ped_idCta;
					
				     private string _ped_cUri;
					
				     private string _ped_cDeviceID;
					
				     private string _ped_cLabel;
					
				     private string _ped_cName;
					
				     private DateTime? _ped_tCreatedAt;
					
				     private int _ped_iVarCount;
					
				     private string _ped_cLastActivity;
				 ///<summary>
     ///ped_idCta property   
     ///</summary>   
     public int ped_idCta 
		 { 
		        
                    get{ return this._ped_idCta; }
        						set{ this._ped_idCta = value; } 										
	   }
	  ///<summary>
     ///ped_cUri property   
     ///</summary>   
     public string ped_cUri 
		 { 
		        
                    get{ return this._ped_cUri; }
        						set{ this._ped_cUri = value; } 										
	   }
	  ///<summary>
     ///ped_cDeviceID property   
     ///</summary>   
     public string ped_cDeviceID 
		 { 
		        
                    get{ return this._ped_cDeviceID; }
        						set{ this._ped_cDeviceID = value; } 										
	   }
	  ///<summary>
     ///ped_cLabel property   
     ///</summary>   
     public string ped_cLabel 
		 { 
		        
                    get{ return this._ped_cLabel; }
        						set{ this._ped_cLabel = value; } 										
	   }
	  ///<summary>
     ///ped_cName property   
     ///</summary>   
     public string ped_cName 
		 { 
		        
                    get{ return this._ped_cName; }
        						set{ this._ped_cName = value; } 										
	   }
	  ///<summary>
     ///ped_tCreatedAt property   
     ///</summary>   
     public DateTime? ped_tCreatedAt 
		 { 
		        
                    get{ return this._ped_tCreatedAt; }
        						set{ this._ped_tCreatedAt = value; } 										
	   }
	  ///<summary>
     ///ped_iVarCount property   
     ///</summary>   
     public int ped_iVarCount 
		 { 
		        
                    get{ return this._ped_iVarCount; }
        						set{ this._ped_iVarCount = value; } 										
	   }
	  ///<summary>
     ///ped_cLastActivity property   
     ///</summary>   
     public string ped_cLastActivity 
		 { 
		        
                    get{ return this._ped_cLastActivity; }
        						set{ this._ped_cLastActivity = value; } 										
	   }
	  ///<summary>
     ///Constructor   
     ///</summary>
        public Callerp_EnergyDevices() : base()
        {
            InitClass();
        }  
 ///<summary>
     ///Constructor   
     ///</summary>		
        public Callerp_EnergyDevices(int Id, string Name, int ped_idCta, string ped_cUri, string ped_cDeviceID, string ped_cLabel, string ped_cName, DateTime? ped_tCreatedAt, int ped_iVarCount, string ped_cLastActivity) : base()
        {
            base.Id = Id;
						base.Name = Name;				 																																					 
				    this._ped_idCta = ped_idCta;
this._ped_cUri = ped_cUri;
this._ped_cDeviceID = ped_cDeviceID;
this._ped_cLabel = ped_cLabel;
this._ped_cName = ped_cName;
this._ped_tCreatedAt = ped_tCreatedAt;
this._ped_iVarCount = ped_iVarCount;
this._ped_cLastActivity = ped_cLastActivity;

            InitClass();
        }  								

				private void InitClass()
        {														
  				  base.Type = new ObjectType(7029, "p_EnergyDevices");
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
			Simplep_EnergyDevices Simple = new Simplep_EnergyDevices();
			Simple.Id = base.Id;
			Simple.Name = base.Name;
			Simple.ped_idCta = this._ped_idCta;
Simple.ped_cUri = this._ped_cUri;
Simple.ped_cDeviceID = this._ped_cDeviceID;
Simple.ped_cLabel = this._ped_cLabel;
Simple.ped_cName = this._ped_cName;
Simple.ped_tCreatedAt = this._ped_tCreatedAt;
Simple.ped_iVarCount = this._ped_iVarCount;
Simple.ped_cLastActivity = this._ped_cLastActivity;

			return (SimpleBaseObject) Simple;
		}
 ///<summary>
     ///Sets a simpleobject   
     ///</summary>	
		public void SetSimpleObject(Simplep_EnergyDevices Simple)
		{
			base.Id = Simple.Id;
			base.Name = Simple.Name;
			this._ped_idCta = Simple.ped_idCta;
this._ped_cUri = Simple.ped_cUri;
this._ped_cDeviceID = Simple.ped_cDeviceID;
this._ped_cLabel = Simple.ped_cLabel;
this._ped_cName = Simple.ped_cName;
this._ped_tCreatedAt = Simple.ped_tCreatedAt;
this._ped_iVarCount = Simple.ped_iVarCount;
this._ped_cLastActivity = Simple.ped_cLastActivity;

		}
 ///<summary>
     ///Gets a baseobject   
     ///</summary>
		public override BaseObject GetBaseObject(SqlHelper SqlConfig, int UserId)
		{
			return new Dalp_EnergyDevices(SqlConfig, UserId, (Simplep_EnergyDevices) GetSimpleObject());
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
               dt.Columns.Add(new DataColumn("ped_idCta", typeof (int)));               
							 dt.Columns.Add(new DataColumn("ped_cUri", typeof (string)));               
							 dt.Columns.Add(new DataColumn("ped_cDeviceID", typeof (string)));               
							 dt.Columns.Add(new DataColumn("ped_cLabel", typeof (string)));               
							 dt.Columns.Add(new DataColumn("ped_cName", typeof (string)));               
							 dt.Columns.Add(new DataColumn("ped_tCreatedAt", typeof (DateTime)));               
							 dt.Columns.Add(new DataColumn("ped_iVarCount", typeof (int)));               
							 dt.Columns.Add(new DataColumn("ped_cLastActivity", typeof (string)));               
							 										
               //create Row  
               dr = dt.NewRow();
               
               //set Row
							 dr["Id"] = base.Id;

							 dr["Name"] = base.Name;
dr["ped_idCta"] = this._ped_idCta;
dr["ped_cUri"] = this._ped_cUri;
dr["ped_cDeviceID"] = this._ped_cDeviceID;
dr["ped_cLabel"] = this._ped_cLabel;
dr["ped_cName"] = this._ped_cName;
dr["ped_tCreatedAt"] = this._ped_tCreatedAt;
dr["ped_iVarCount"] = this._ped_iVarCount;
dr["ped_cLastActivity"] = this._ped_cLastActivity;
							 
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
