
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
    ///t_CategoriaVC Slbf Class
    ///</summary>
    [DataContract]
    public class Simplet_CategoriaVC : SimpleBaseObject
    { 
			 ///<summary>
     ///cvc_cDescripcion   
     ///</summary>
	 [DataMember]
     public string cvc_cDescripcion { get;set;} 
	  ///<summary>
     ///cvc_iWork   
     ///</summary>
	 [DataMember]
     public int cvc_iWork { get;set;} 
	 ///<summary>
        ///t_CategoriaVC Constructor
        ///</summary>
        public Simplet_CategoriaVC() : base()
  {
  InitClass();
  }
        ///<summary>
        ///t_CategoriaVC Constructor
        ///</summary>
        public Simplet_CategoriaVC(int Id, string Name, string cvc_cDescripcion, int cvc_iWork) : base()
        {
            base.Id = Id;
						base.Name = Name;				 																																					 
				    this.cvc_cDescripcion = cvc_cDescripcion;
this.cvc_iWork = cvc_iWork;

            InitClass();
        }  								

				private void InitClass()
        {														
  				  base.Type = new ObjectType(7050, "t_CategoriaVC");
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
			BaseObject Object = new Dalt_CategoriaVC(SqlConfig, UserId, this);
			if(this.CallerObject != null)
			   Object.CallerObject = this.CallerObject;			
			return Object;
		}
///<summary>
    ///Get parent object
    ///</summary>
		public override CallerObject GetCallerObject()
		{
			Callert_CategoriaVC Caller = new Callert_CategoriaVC();
			Caller.Id = base.Id;
			Caller.Name = base.Name;
			Caller.cvc_cDescripcion = this.cvc_cDescripcion;
Caller.cvc_iWork = this.cvc_iWork;

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
               dt.Columns.Add(new DataColumn("cvc_cDescripcion", typeof (string)));               
							 dt.Columns.Add(new DataColumn("cvc_iWork", typeof (int)));               
							 										
               //create Row  
               dr = dt.NewRow();
               
               //set Row
							 dr["Id"] = base.Id;

							 dr["Name"] = base.Name;
dr["cvc_cDescripcion"] = (object)this.cvc_cDescripcion ?? System.DBNull.Value;
dr["cvc_iWork"] = (object)this.cvc_iWork ?? System.DBNull.Value;
							 
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
