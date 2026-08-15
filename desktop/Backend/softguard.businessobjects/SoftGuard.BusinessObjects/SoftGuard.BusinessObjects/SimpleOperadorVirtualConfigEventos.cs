
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
    ///OperadorVirtualConfigEventos Slbf Class
    ///</summary>
    [DataContract]
    public class SimpleOperadorVirtualConfigEventos : SimpleBaseObject
    { 
			 ///<summary>
     ///ove_iOperadorVirtualConfigId   
     ///</summary>
	 [DataMember]
     public int ove_iOperadorVirtualConfigId { get;set;} 
	  ///<summary>
     ///ove_cEvento   
     ///</summary>
	 [DataMember]
     public string ove_cEvento { get;set;} 
	 ///<summary>
        ///OperadorVirtualConfigEventos Constructor
        ///</summary>
        public SimpleOperadorVirtualConfigEventos() : base()
  {
  InitClass();
  }
        ///<summary>
        ///OperadorVirtualConfigEventos Constructor
        ///</summary>
        public SimpleOperadorVirtualConfigEventos(int Id, string Name, int ove_iOperadorVirtualConfigId, string ove_cEvento) : base()
        {
            base.Id = Id;
						base.Name = Name;				 																																					 
				    this.ove_iOperadorVirtualConfigId = ove_iOperadorVirtualConfigId;
this.ove_cEvento = ove_cEvento;

            InitClass();
        }  								

				private void InitClass()
        {														
  				  base.Type = new ObjectType(7049, "OperadorVirtualConfigEventos");
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
			BaseObject Object = new DalOperadorVirtualConfigEventos(SqlConfig, UserId, this);
			if(this.CallerObject != null)
			   Object.CallerObject = this.CallerObject;			
			return Object;
		}
///<summary>
    ///Get parent object
    ///</summary>
		public override CallerObject GetCallerObject()
		{
			CallerOperadorVirtualConfigEventos Caller = new CallerOperadorVirtualConfigEventos();
			Caller.Id = base.Id;
			Caller.Name = base.Name;
			Caller.ove_iOperadorVirtualConfigId = this.ove_iOperadorVirtualConfigId;
Caller.ove_cEvento = this.ove_cEvento;

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
               dt.Columns.Add(new DataColumn("ove_iOperadorVirtualConfigId", typeof (int)));               
							 dt.Columns.Add(new DataColumn("ove_cEvento", typeof (string)));               
							 										
               //create Row  
               dr = dt.NewRow();
               
               //set Row
							 dr["Id"] = base.Id;

							 dr["Name"] = base.Name;
dr["ove_iOperadorVirtualConfigId"] = (object)this.ove_iOperadorVirtualConfigId ?? System.DBNull.Value;
dr["ove_cEvento"] = (object)this.ove_cEvento ?? System.DBNull.Value;
							 
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
