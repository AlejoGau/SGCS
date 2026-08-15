
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
    ///t_monedas Slbf Class
    ///</summary>
    [DataContract]
    public class Simplet_monedas : SimpleBaseObject
    { 
			 ///<summary>
     ///mon_ccodigo   
     ///</summary>
	 [DataMember]
     public string mon_ccodigo { get;set;} 
	  ///<summary>
     ///mon_cnombre   
     ///</summary>
	 [DataMember]
     public string mon_cnombre { get;set;} 
	  ///<summary>
     ///mon_csymbol   
     ///</summary>
	 [DataMember]
     public string mon_csymbol { get;set;} 
	 ///<summary>
        ///t_monedas Constructor
        ///</summary>
        public Simplet_monedas() : base()
  {
  InitClass();
  }
        ///<summary>
        ///t_monedas Constructor
        ///</summary>
        public Simplet_monedas(int Id, string Name, string mon_ccodigo, string mon_cnombre, string mon_csymbol) : base()
        {
            base.Id = Id;
						base.Name = Name;				 																																					 
				    this.mon_ccodigo = mon_ccodigo;
this.mon_cnombre = mon_cnombre;
this.mon_csymbol = mon_csymbol;

            InitClass();
        }  								

				private void InitClass()
        {														
  				  base.Type = new ObjectType(3186, "t_monedas");
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
			BaseObject Object = new Dalt_monedas(SqlConfig, UserId, this);
			if(this.CallerObject != null)
			   Object.CallerObject = this.CallerObject;			
			return Object;
		}
///<summary>
    ///Get parent object
    ///</summary>
		public override CallerObject GetCallerObject()
		{
			Callert_monedas Caller = new Callert_monedas();
			Caller.Id = base.Id;
			Caller.Name = base.Name;
			Caller.mon_ccodigo = this.mon_ccodigo;
Caller.mon_cnombre = this.mon_cnombre;
Caller.mon_csymbol = this.mon_csymbol;

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
               dt.Columns.Add(new DataColumn("mon_ccodigo", typeof (string)));               
							 dt.Columns.Add(new DataColumn("mon_cnombre", typeof (string)));               
							 dt.Columns.Add(new DataColumn("mon_csymbol", typeof (string)));               
							 										
               //create Row  
               dr = dt.NewRow();
               
               //set Row
							 dr["Id"] = base.Id;

							 dr["Name"] = base.Name;
dr["mon_ccodigo"] = (object)this.mon_ccodigo ?? System.DBNull.Value;
dr["mon_cnombre"] = (object)this.mon_cnombre ?? System.DBNull.Value;
dr["mon_csymbol"] = (object)this.mon_csymbol ?? System.DBNull.Value;
							 
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
