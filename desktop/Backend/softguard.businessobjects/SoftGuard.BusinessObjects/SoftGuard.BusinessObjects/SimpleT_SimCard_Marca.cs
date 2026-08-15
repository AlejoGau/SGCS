
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
    ///T_SimCard_Marca Slbf Class
    ///</summary>
    [DataContract]
    public class SimpleT_SimCard_Marca : SimpleBaseObject
    { 
			 ///<summary>
     ///tsm_cDescripcion   
     ///</summary>
	 [DataMember]
     public string tsm_cDescripcion { get;set;} 
	 ///<summary>
        ///T_SimCard_Marca Constructor
        ///</summary>
        public SimpleT_SimCard_Marca() : base()
  {
  InitClass();
  }
        ///<summary>
        ///T_SimCard_Marca Constructor
        ///</summary>
        public SimpleT_SimCard_Marca(int Id, string Name, string tsm_cDescripcion) : base()
        {
            base.Id = Id;
						base.Name = Name;				 																																					 
				    this.tsm_cDescripcion = tsm_cDescripcion;

            InitClass();
        }  								

				private void InitClass()
        {														
  				  base.Type = new ObjectType(3235, "T_SimCard_Marca");
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
			BaseObject Object = new DalT_SimCard_Marca(SqlConfig, UserId, this);
			if(this.CallerObject != null)
			   Object.CallerObject = this.CallerObject;			
			return Object;
		}
///<summary>
    ///Get parent object
    ///</summary>
		public override CallerObject GetCallerObject()
		{
			CallerT_SimCard_Marca Caller = new CallerT_SimCard_Marca();
			Caller.Id = base.Id;
			Caller.Name = base.Name;
			Caller.tsm_cDescripcion = this.tsm_cDescripcion;

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
               dt.Columns.Add(new DataColumn("tsm_cDescripcion", typeof (string)));               
							 										
               //create Row  
               dr = dt.NewRow();
               
               //set Row
							 dr["Id"] = base.Id;

							 dr["Name"] = base.Name;
dr["tsm_cDescripcion"] = (object)this.tsm_cDescripcion ?? System.DBNull.Value;
							 
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
