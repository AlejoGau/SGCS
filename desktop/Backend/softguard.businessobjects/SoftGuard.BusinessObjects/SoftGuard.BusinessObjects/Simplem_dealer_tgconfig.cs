
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
    ///m_dealer_tgconfig Slbf Class
    ///</summary>
    [DataContract]
    public class Simplem_dealer_tgconfig : SimpleBaseObject
    { 
			 ///<summary>
     ///dtg_cdealer   
     ///</summary>
	 [DataMember]
     public string dtg_cdealer { get;set;} 
	  ///<summary>
     ///dtg_config   
     ///</summary>
	 [DataMember]
     public string dtg_config { get;set;} 
	  ///<summary>
     ///dtg_parking_velocidad   
     ///</summary>
	 [DataMember]
     public int dtg_parking_velocidad { get;set;} 
	  ///<summary>
     ///dtg_parking_eventos   
     ///</summary>
	 [DataMember]
     public string dtg_parking_eventos { get;set;} 
	  ///<summary>
     ///dtg_parking_eventos_hide   
     ///</summary>
	 [DataMember]
     public string dtg_parking_eventos_hide { get;set;} 
	 ///<summary>
        ///m_dealer_tgconfig Constructor
        ///</summary>
        public Simplem_dealer_tgconfig() : base()
  {
  InitClass();
  }
        ///<summary>
        ///m_dealer_tgconfig Constructor
        ///</summary>
        public Simplem_dealer_tgconfig(int Id, string Name, string dtg_cdealer, string dtg_config, int dtg_parking_velocidad, string dtg_parking_eventos, string dtg_parking_eventos_hide) : base()
        {
            base.Id = Id;
						base.Name = Name;				 																																					 
				    this.dtg_cdealer = dtg_cdealer;
this.dtg_config = dtg_config;
this.dtg_parking_velocidad = dtg_parking_velocidad;
this.dtg_parking_eventos = dtg_parking_eventos;
this.dtg_parking_eventos_hide = dtg_parking_eventos_hide;

            InitClass();
        }  								

				private void InitClass()
        {														
  				  base.Type = new ObjectType(3225, "m_dealer_tgconfig");
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
			BaseObject Object = new Dalm_dealer_tgconfig(SqlConfig, UserId, this);
			if(this.CallerObject != null)
			   Object.CallerObject = this.CallerObject;			
			return Object;
		}
///<summary>
    ///Get parent object
    ///</summary>
		public override CallerObject GetCallerObject()
		{
			Callerm_dealer_tgconfig Caller = new Callerm_dealer_tgconfig();
			Caller.Id = base.Id;
			Caller.Name = base.Name;
			Caller.dtg_cdealer = this.dtg_cdealer;
Caller.dtg_config = this.dtg_config;
Caller.dtg_parking_velocidad = this.dtg_parking_velocidad;
Caller.dtg_parking_eventos = this.dtg_parking_eventos;
Caller.dtg_parking_eventos_hide = this.dtg_parking_eventos_hide;

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
               dt.Columns.Add(new DataColumn("dtg_cdealer", typeof (string)));               
							 dt.Columns.Add(new DataColumn("dtg_config", typeof (string)));               
							 dt.Columns.Add(new DataColumn("dtg_parking_velocidad", typeof (int)));               
							 dt.Columns.Add(new DataColumn("dtg_parking_eventos", typeof (string)));               
							 dt.Columns.Add(new DataColumn("dtg_parking_eventos_hide", typeof (string)));               
							 										
               //create Row  
               dr = dt.NewRow();
               
               //set Row
							 dr["Id"] = base.Id;

							 dr["Name"] = base.Name;
dr["dtg_cdealer"] = (object)this.dtg_cdealer ?? System.DBNull.Value;
dr["dtg_config"] = (object)this.dtg_config ?? System.DBNull.Value;
dr["dtg_parking_velocidad"] = (object)this.dtg_parking_velocidad ?? System.DBNull.Value;
dr["dtg_parking_eventos"] = (object)this.dtg_parking_eventos ?? System.DBNull.Value;
dr["dtg_parking_eventos_hide"] = (object)this.dtg_parking_eventos_hide ?? System.DBNull.Value;
							 
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
