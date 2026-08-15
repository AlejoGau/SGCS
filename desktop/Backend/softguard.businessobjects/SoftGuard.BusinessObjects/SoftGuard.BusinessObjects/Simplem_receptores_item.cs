
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
    ///m_receptores_item Slbf Class
    ///</summary>
    [DataContract]
    public class Simplem_receptores_item : SimpleBaseObject
    { 
			 ///<summary>
     ///rec_iid   
     ///</summary>
	 [DataMember]
     public int rec_iid { get;set;} 
	  ///<summary>
     ///rec_cformato   
     ///</summary>
	 [DataMember]
     public string rec_cformato { get;set;} 
	  ///<summary>
     ///rec_iConexion   
     ///</summary>
	 [DataMember]
     public int rec_iConexion { get;set;} 
	 ///<summary>
        ///m_receptores_item Constructor
        ///</summary>
        public Simplem_receptores_item() : base()
  {
  InitClass();
  }
        ///<summary>
        ///m_receptores_item Constructor
        ///</summary>
        public Simplem_receptores_item(int Id, string Name, int rec_iid, string rec_cformato, int rec_iConexion) : base()
        {
            base.Id = Id;
						base.Name = Name;				 																																					 
				    this.rec_iid = rec_iid;
this.rec_cformato = rec_cformato;
this.rec_iConexion = rec_iConexion;

            InitClass();
        }  								

				private void InitClass()
        {														
  				  base.Type = new ObjectType(3068, "m_receptores_item");
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
			BaseObject Object = new Dalm_receptores_item(SqlConfig, UserId, this);
			if(this.CallerObject != null)
			   Object.CallerObject = this.CallerObject;			
			return Object;
		}
///<summary>
    ///Get parent object
    ///</summary>
		public override CallerObject GetCallerObject()
		{
			Callerm_receptores_item Caller = new Callerm_receptores_item();
			Caller.Id = base.Id;
			Caller.Name = base.Name;
			Caller.rec_iid = this.rec_iid;
Caller.rec_cformato = this.rec_cformato;
Caller.rec_iConexion = this.rec_iConexion;

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
               dt.Columns.Add(new DataColumn("rec_iid", typeof (int)));               
							 dt.Columns.Add(new DataColumn("rec_cformato", typeof (string)));               
							 dt.Columns.Add(new DataColumn("rec_iConexion", typeof (int)));               
							 										
               //create Row  
               dr = dt.NewRow();
               
               //set Row
							 dr["Id"] = base.Id;

							 dr["Name"] = base.Name;
dr["rec_iid"] = (object)this.rec_iid ?? System.DBNull.Value;
dr["rec_cformato"] = (object)this.rec_cformato ?? System.DBNull.Value;
dr["rec_iConexion"] = (object)this.rec_iConexion ?? System.DBNull.Value;
							 
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
