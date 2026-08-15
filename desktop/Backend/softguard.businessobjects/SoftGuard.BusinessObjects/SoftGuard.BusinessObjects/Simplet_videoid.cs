
using System;
using System.Xml;
using System.Data;
using Slbf;
using Slbf.Helpers;    	    	 
using System.Runtime.Serialization;
using System.Collections.Generic;

namespace SoftGuard.BusinessObjects
{ 	
  ///<summary>
    ///t_videoid Slbf Class
    ///</summary>
    [DataContract]
    public class Simplet_videoid : SimpleBaseObject
    { 
			 ///<summary>
     ///tvi_cdescripcion   
     ///</summary>
	 [DataMember]
     public string tvi_cdescripcion { get;set;} 
	  ///<summary>
     ///tvi_cnombre   
     ///</summary>
	 [DataMember]
     public string tvi_cnombre { get;set;} 
	  ///<summary>
     ///tvi_cconfig   
     ///</summary>
	 [DataMember]
     public string tvi_cconfig { get;set;} 
	  ///<summary>
     ///tvi_nLaunch   
     ///</summary>
	 [DataMember]
     public Decimal tvi_nLaunch { get;set;} 
	  ///<summary>
     ///tvi_cTemplate   
     ///</summary>
	 [DataMember]
     public string tvi_cTemplate { get;set;} 
	  ///<summary>
     ///tvi_iNativeMWR   
     ///</summary>
	 [DataMember]
     public int tvi_iNativeMWR { get;set;} 
	 ///<summary>
        ///t_videoid Constructor
        ///</summary>
        public Simplet_videoid() : base()
  {
  InitClass();
  }
        ///<summary>
        ///t_videoid Constructor
        ///</summary>
        public Simplet_videoid(int Id, string Name, string tvi_cdescripcion, string tvi_cnombre, string tvi_cconfig, Decimal tvi_nLaunch, string tvi_cTemplate, int tvi_iNativeMWR) : base()
        {
            base.Id = Id;
						base.Name = Name;				 																																					 
				    this.tvi_cdescripcion = tvi_cdescripcion;
this.tvi_cnombre = tvi_cnombre;
this.tvi_cconfig = tvi_cconfig;
this.tvi_nLaunch = tvi_nLaunch;
this.tvi_cTemplate = tvi_cTemplate;
this.tvi_iNativeMWR = tvi_iNativeMWR;

            InitClass();
        }  								

				private void InitClass()
        {														
  				  base.Type = new ObjectType(3111, "t_videoid");
        }
///<summary>
    ///Returns SimpleBaseObject
    ///</summary>
		public override SimpleBaseObject GetObject()
		{
			return (SimpleBaseObject) this;
		}
///<summary>
    ///Returns BaseObject
    ///</summary>  
		public override BaseObject GetBaseObject(SqlHelper SqlConfig, int UserId)
		{
			BaseObject Object = new Dalt_videoid(SqlConfig, UserId, this);
			if(this.CallerObject != null)
			   Object.CallerObject = this.CallerObject;			
			return Object;
		}
///<summary>
    ///Get parent object
    ///</summary>
		public override CallerObject GetCallerObject()
		{
			Callert_videoid Caller = new Callert_videoid();
			Caller.Id = base.Id;
			Caller.Name = base.Name;
			Caller.tvi_cdescripcion = this.tvi_cdescripcion;
Caller.tvi_cnombre = this.tvi_cnombre;
Caller.tvi_cconfig = this.tvi_cconfig;
Caller.tvi_nLaunch = this.tvi_nLaunch;
Caller.tvi_cTemplate = this.tvi_cTemplate;
Caller.tvi_iNativeMWR = this.tvi_iNativeMWR;

			return (CallerObject) Caller;
		}
///<summary>
    ///Get DataTable of objetdata
    ///</summary>
		public override DataTable GetDataObject()
    {												                
               //create Table
               DataTable dt = new DataTable("Data");                              
               DataRow dr;
							 
							 dt.Columns.Add(new DataColumn("Id", typeof(int)));
							 dt.Columns.Add(new DataColumn("Name", typeof(string)));							 
               dt.Columns.Add(new DataColumn("tvi_cdescripcion", typeof (string)));               
							 dt.Columns.Add(new DataColumn("tvi_cnombre", typeof (string)));               
							 dt.Columns.Add(new DataColumn("tvi_cconfig", typeof (string)));               
							 dt.Columns.Add(new DataColumn("tvi_nLaunch", typeof (Decimal)));               
							 dt.Columns.Add(new DataColumn("tvi_cTemplate", typeof (string)));               
							 dt.Columns.Add(new DataColumn("tvi_iNativeMWR", typeof (int)));               
							 										
               //create Row  
               dr = dt.NewRow();
               
               //set Row
							 dr["Id"] = base.Id;

							 dr["Name"] = base.Name;
dr["tvi_cdescripcion"] = (object)this.tvi_cdescripcion ?? System.DBNull.Value;
dr["tvi_cnombre"] = (object)this.tvi_cnombre ?? System.DBNull.Value;
dr["tvi_cconfig"] = (object)this.tvi_cconfig ?? System.DBNull.Value;
dr["tvi_nLaunch"] = (object)this.tvi_nLaunch ?? System.DBNull.Value;
dr["tvi_cTemplate"] = (object)this.tvi_cTemplate ?? System.DBNull.Value;
dr["tvi_iNativeMWR"] = (object)this.tvi_iNativeMWR ?? System.DBNull.Value;
							 
               //Insert Row in Table
               dt.Rows.Add(dr);
							 
							 return dt;	 
												    
        }
///<summary>
  ///Get XmlDataDocument
  ///</summary>
	public override XmlDataDocument GetXmlObject()
    {
		  DataSet ds = new DataSet("Object"); 
		  ds.EnforceConstraints = false;														                
               							 
 		  ds.Tables.Add(GetDataObject());
	  	  ds.Tables.Add(this.Type.GetDataObject());  	  

          XmlDataDocument XmlDoc = new XmlDataDocument(ds);
		  if(this.CallerObject != null)			 	 
		     XmlDoc.SelectSingleNode("//Object").InnerXml += this.CallerObject.GetXmlObject().InnerXml;                    
		  if(this.Dependencies.Count != 0)
			 XmlDoc.SelectSingleNode("//Object").InnerXml += this.Dependencies.GetXmlObjects().InnerXml;          
			 
          return XmlDoc;							    
    }
 
			}

}
