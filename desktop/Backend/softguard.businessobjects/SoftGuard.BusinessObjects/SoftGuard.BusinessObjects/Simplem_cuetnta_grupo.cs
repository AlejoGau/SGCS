
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
    ///m_cuetnta_grupo Slbf Class
    ///</summary>
    [DataContract]
    public class Simplem_cuetnta_grupo : SimpleBaseObject
    { 
			 ///<summary>
     ///cgr_cnombre   
     ///</summary>
	 [DataMember]
     public string cgr_cnombre { get;set;} 
	  ///<summary>
     ///cgr_itipo   
     ///</summary>
	 [DataMember]
     public int cgr_itipo { get;set;} 
	  ///<summary>
     ///cgr_iidcuenta   
     ///</summary>
	 [DataMember]
     public int cgr_iidcuenta { get;set;} 
	 ///<summary>
        ///m_cuetnta_grupo Constructor
        ///</summary>
        public Simplem_cuetnta_grupo() : base()
  {
  InitClass();
  }
        ///<summary>
        ///m_cuetnta_grupo Constructor
        ///</summary>
        public Simplem_cuetnta_grupo(int Id, string Name, string cgr_cnombre, int cgr_itipo, int cgr_iidcuenta) : base()
        {
            base.Id = Id;
						base.Name = Name;				 																																					 
				    this.cgr_cnombre = cgr_cnombre;
this.cgr_itipo = cgr_itipo;
this.cgr_iidcuenta = cgr_iidcuenta;

            InitClass();
        }  								

				private void InitClass()
        {														
  				  base.Type = new ObjectType(3218, "m_cuetnta_grupo");
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
			BaseObject Object = new Dalm_cuetnta_grupo(SqlConfig, UserId, this);
			if(this.CallerObject != null)
			   Object.CallerObject = this.CallerObject;			
			return Object;
		}
///<summary>
    ///Get parent object
    ///</summary>
		public override CallerObject GetCallerObject()
		{
			Callerm_cuetnta_grupo Caller = new Callerm_cuetnta_grupo();
			Caller.Id = base.Id;
			Caller.Name = base.Name;
			Caller.cgr_cnombre = this.cgr_cnombre;
Caller.cgr_itipo = this.cgr_itipo;
Caller.cgr_iidcuenta = this.cgr_iidcuenta;

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
               dt.Columns.Add(new DataColumn("cgr_cnombre", typeof (string)));               
							 dt.Columns.Add(new DataColumn("cgr_itipo", typeof (int)));               
							 dt.Columns.Add(new DataColumn("cgr_iidcuenta", typeof (int)));               
							 										
               //create Row  
               dr = dt.NewRow();
               
               //set Row
							 dr["Id"] = base.Id;

							 dr["Name"] = base.Name;
dr["cgr_cnombre"] = (object)this.cgr_cnombre ?? System.DBNull.Value;
dr["cgr_itipo"] = (object)this.cgr_itipo ?? System.DBNull.Value;
dr["cgr_iidcuenta"] = (object)this.cgr_iidcuenta ?? System.DBNull.Value;
							 
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
