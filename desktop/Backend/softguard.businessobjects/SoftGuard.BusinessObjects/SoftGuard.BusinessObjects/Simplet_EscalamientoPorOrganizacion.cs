
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
    ///t_EscalamientoPorOrganizacion Slbf Class
    ///</summary>
    [DataContract]
    public class Simplet_EscalamientoPorOrganizacion : SimpleBaseObject
    { 
			 ///<summary>
     ///teo_iTiempo   
     ///</summary>
	 [DataMember]
     public int teo_iTiempo { get;set;} 
	  ///<summary>
     ///teo_nControla   
     ///</summary>
	 [DataMember]
     public Decimal teo_nControla { get;set;} 
	 ///<summary>
        ///t_EscalamientoPorOrganizacion Constructor
        ///</summary>
        public Simplet_EscalamientoPorOrganizacion() : base()
  {
  InitClass();
  }
        ///<summary>
        ///t_EscalamientoPorOrganizacion Constructor
        ///</summary>
        public Simplet_EscalamientoPorOrganizacion(int Id, string Name, int teo_iTiempo, Decimal teo_nControla) : base()
        {
            base.Id = Id;
						base.Name = Name;				 																																					 
				    this.teo_iTiempo = teo_iTiempo;
this.teo_nControla = teo_nControla;

            InitClass();
        }  								

				private void InitClass()
        {														
  				  base.Type = new ObjectType(3196, "t_EscalamientoPorOrganizacion");
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
			BaseObject Object = new Dalt_EscalamientoPorOrganizacion(SqlConfig, UserId, this);
			if(this.CallerObject != null)
			   Object.CallerObject = this.CallerObject;			
			return Object;
		}
///<summary>
    ///Get parent object
    ///</summary>
		public override CallerObject GetCallerObject()
		{
			Callert_EscalamientoPorOrganizacion Caller = new Callert_EscalamientoPorOrganizacion();
			Caller.Id = base.Id;
			Caller.Name = base.Name;
			Caller.teo_iTiempo = this.teo_iTiempo;
Caller.teo_nControla = this.teo_nControla;

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
               dt.Columns.Add(new DataColumn("teo_iTiempo", typeof (int)));               
							 dt.Columns.Add(new DataColumn("teo_nControla", typeof (Decimal)));               
							 										
               //create Row  
               dr = dt.NewRow();
               
               //set Row
							 dr["Id"] = base.Id;

							 dr["Name"] = base.Name;
dr["teo_iTiempo"] = (object)this.teo_iTiempo ?? System.DBNull.Value;
dr["teo_nControla"] = (object)this.teo_nControla ?? System.DBNull.Value;
							 
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
