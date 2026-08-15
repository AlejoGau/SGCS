
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
    ///t_dealerplantillas Slbf Class
    ///</summary>
    [DataContract]
    public class Simplet_dealerplantillas : SimpleBaseObject
    { 
			 ///<summary>
     ///lin_idkey   
     ///</summary>
	 [DataMember]
     public int lin_idkey { get;set;} 
	  ///<summary>
     ///pls_idkey   
     ///</summary>
	 [DataMember]
     public int pls_idkey { get;set;} 
	 ///<summary>
        ///t_dealerplantillas Constructor
        ///</summary>
        public Simplet_dealerplantillas() : base()
  {
  InitClass();
  }
        ///<summary>
        ///t_dealerplantillas Constructor
        ///</summary>
        public Simplet_dealerplantillas(int Id, string Name, int lin_idkey, int pls_idkey) : base()
        {
            base.Id = Id;
						base.Name = Name;				 																																					 
				    this.lin_idkey = lin_idkey;
this.pls_idkey = pls_idkey;

            InitClass();
        }  								

				private void InitClass()
        {														
  				  base.Type = new ObjectType(3176, "t_dealerplantillas");
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
			BaseObject Object = new Dalt_dealerplantillas(SqlConfig, UserId, this);
			if(this.CallerObject != null)
			   Object.CallerObject = this.CallerObject;			
			return Object;
		}
///<summary>
    ///Get parent object
    ///</summary>
		public override CallerObject GetCallerObject()
		{
			Callert_dealerplantillas Caller = new Callert_dealerplantillas();
			Caller.Id = base.Id;
			Caller.Name = base.Name;
			Caller.lin_idkey = this.lin_idkey;
Caller.pls_idkey = this.pls_idkey;

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
               dt.Columns.Add(new DataColumn("lin_idkey", typeof (int)));               
							 dt.Columns.Add(new DataColumn("pls_idkey", typeof (int)));               
							 										
               //create Row  
               dr = dt.NewRow();
               
               //set Row
							 dr["Id"] = base.Id;

							 dr["Name"] = base.Name;
dr["lin_idkey"] = (object)this.lin_idkey ?? System.DBNull.Value;
dr["pls_idkey"] = (object)this.pls_idkey ?? System.DBNull.Value;
							 
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
