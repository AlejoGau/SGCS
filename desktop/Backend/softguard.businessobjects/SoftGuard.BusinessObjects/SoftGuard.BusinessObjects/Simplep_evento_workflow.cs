
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
    ///p_evento_workflow Slbf Class
    ///</summary>
    [DataContract]
    public class Simplep_evento_workflow : SimpleBaseObject
    { 
			 ///<summary>
     ///pew_proceso_estados   
     ///</summary>
	 [DataMember]
     public string pew_proceso_estados { get;set;} 
	  ///<summary>
     ///pew_name   
     ///</summary>
	 [DataMember]
     public string pew_name { get;set;} 
	  ///<summary>
     ///pew_evento_estados   
     ///</summary>
	 [DataMember]
     public string pew_evento_estados { get;set;} 
	  ///<summary>
     ///pew_dealers   
     ///</summary>
	 [DataMember]
     public string pew_dealers { get;set;} 
	  ///<summary>
     ///pew_codalarmas   
     ///</summary>
	 [DataMember]
     public string pew_codalarmas { get;set;} 
	  ///<summary>
     ///pew_codalarmagrupo   
     ///</summary>
	 [DataMember]
     public int pew_codalarmagrupo { get;set;} 
	  ///<summary>
     ///pew_sql   
     ///</summary>
	 [DataMember]
     public string pew_sql { get;set;} 
	  ///<summary>
     ///pew_config   
     ///</summary>
	 [DataMember]
     public string pew_config { get;set;} 
	  ///<summary>
     ///pew_form_config   
     ///</summary>
	 [DataMember]
     public string pew_form_config { get;set;} 
	 ///<summary>
        ///p_evento_workflow Constructor
        ///</summary>
        public Simplep_evento_workflow() : base()
  {
  InitClass();
  }
        ///<summary>
        ///p_evento_workflow Constructor
        ///</summary>
        public Simplep_evento_workflow(int Id, string Name, string pew_proceso_estados, string pew_name, string pew_evento_estados, string pew_dealers, string pew_codalarmas, int pew_codalarmagrupo, string pew_sql, string pew_config, string pew_form_config) : base()
        {
            base.Id = Id;
						base.Name = Name;				 																																					 
				    this.pew_proceso_estados = pew_proceso_estados;
this.pew_name = pew_name;
this.pew_evento_estados = pew_evento_estados;
this.pew_dealers = pew_dealers;
this.pew_codalarmas = pew_codalarmas;
this.pew_codalarmagrupo = pew_codalarmagrupo;
this.pew_sql = pew_sql;
this.pew_config = pew_config;
this.pew_form_config = pew_form_config;

            InitClass();
        }  								

				private void InitClass()
        {														
  				  base.Type = new ObjectType(3174, "p_evento_workflow");
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
			BaseObject Object = new Dalp_evento_workflow(SqlConfig, UserId, this);
			if(this.CallerObject != null)
			   Object.CallerObject = this.CallerObject;			
			return Object;
		}
///<summary>
    ///Get parent object
    ///</summary>
		public override CallerObject GetCallerObject()
		{
			Callerp_evento_workflow Caller = new Callerp_evento_workflow();
			Caller.Id = base.Id;
			Caller.Name = base.Name;
			Caller.pew_proceso_estados = this.pew_proceso_estados;
Caller.pew_name = this.pew_name;
Caller.pew_evento_estados = this.pew_evento_estados;
Caller.pew_dealers = this.pew_dealers;
Caller.pew_codalarmas = this.pew_codalarmas;
Caller.pew_codalarmagrupo = this.pew_codalarmagrupo;
Caller.pew_sql = this.pew_sql;
Caller.pew_config = this.pew_config;
Caller.pew_form_config = this.pew_form_config;

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
               dt.Columns.Add(new DataColumn("pew_proceso_estados", typeof (string)));               
							 dt.Columns.Add(new DataColumn("pew_name", typeof (string)));               
							 dt.Columns.Add(new DataColumn("pew_evento_estados", typeof (string)));               
							 dt.Columns.Add(new DataColumn("pew_dealers", typeof (string)));               
							 dt.Columns.Add(new DataColumn("pew_codalarmas", typeof (string)));               
							 dt.Columns.Add(new DataColumn("pew_codalarmagrupo", typeof (int)));               
							 dt.Columns.Add(new DataColumn("pew_sql", typeof (string)));               
							 dt.Columns.Add(new DataColumn("pew_config", typeof (string)));               
							 dt.Columns.Add(new DataColumn("pew_form_config", typeof (string)));               
							 										
               //create Row  
               dr = dt.NewRow();
               
               //set Row
							 dr["Id"] = base.Id;

							 dr["Name"] = base.Name;
dr["pew_proceso_estados"] = (object)this.pew_proceso_estados ?? System.DBNull.Value;
dr["pew_name"] = (object)this.pew_name ?? System.DBNull.Value;
dr["pew_evento_estados"] = (object)this.pew_evento_estados ?? System.DBNull.Value;
dr["pew_dealers"] = (object)this.pew_dealers ?? System.DBNull.Value;
dr["pew_codalarmas"] = (object)this.pew_codalarmas ?? System.DBNull.Value;
dr["pew_codalarmagrupo"] = (object)this.pew_codalarmagrupo ?? System.DBNull.Value;
dr["pew_sql"] = (object)this.pew_sql ?? System.DBNull.Value;
dr["pew_config"] = (object)this.pew_config ?? System.DBNull.Value;
dr["pew_form_config"] = (object)this.pew_form_config ?? System.DBNull.Value;
							 
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
