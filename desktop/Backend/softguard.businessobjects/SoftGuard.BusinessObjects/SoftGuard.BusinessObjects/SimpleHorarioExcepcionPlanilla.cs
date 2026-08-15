
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
    ///HorarioExcepcionPlanilla Slbf Class
    ///</summary>
    [DataContract]
    public class SimpleHorarioExcepcionPlanilla : SimpleBaseObject
    { 
			 ///<summary>
     ///exc_iid   
     ///</summary>
	 [DataMember]
     public int exc_iid { get;set;} 
	  ///<summary>
     ///exc_cevento   
     ///</summary>
	 [DataMember]
     public string exc_cevento { get;set;} 
	  ///<summary>
     ///exc_cHoraApertura   
     ///</summary>
	 [DataMember]
     public string exc_cHoraApertura { get;set;} 
	  ///<summary>
     ///exc_cHoraCierre   
     ///</summary>
	 [DataMember]
     public string exc_cHoraCierre { get;set;} 
	 ///<summary>
        ///HorarioExcepcionPlanilla Constructor
        ///</summary>
        public SimpleHorarioExcepcionPlanilla() : base()
  {
  InitClass();
  }
        ///<summary>
        ///HorarioExcepcionPlanilla Constructor
        ///</summary>
        public SimpleHorarioExcepcionPlanilla(int Id, string Name, int exc_iid, string exc_cevento, string exc_cHoraApertura, string exc_cHoraCierre) : base()
        {
            base.Id = Id;
						base.Name = Name;				 																																					 
				    this.exc_iid = exc_iid;
this.exc_cevento = exc_cevento;
this.exc_cHoraApertura = exc_cHoraApertura;
this.exc_cHoraCierre = exc_cHoraCierre;

            InitClass();
        }  								

				private void InitClass()
        {														
  				  base.Type = new ObjectType(3007, "HorarioExcepcionPlanilla");
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
			BaseObject Object = new DalHorarioExcepcionPlanilla(SqlConfig, UserId, this);
			if(this.CallerObject != null)
			   Object.CallerObject = this.CallerObject;			
			return Object;
		}
///<summary>
    ///Get parent object
    ///</summary>
		public override CallerObject GetCallerObject()
		{
			CallerHorarioExcepcionPlanilla Caller = new CallerHorarioExcepcionPlanilla();
			Caller.Id = base.Id;
			Caller.Name = base.Name;
			Caller.exc_iid = this.exc_iid;
Caller.exc_cevento = this.exc_cevento;
Caller.exc_cHoraApertura = this.exc_cHoraApertura;
Caller.exc_cHoraCierre = this.exc_cHoraCierre;

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
               dt.Columns.Add(new DataColumn("exc_iid", typeof (int)));               
							 dt.Columns.Add(new DataColumn("exc_cevento", typeof (string)));               
							 dt.Columns.Add(new DataColumn("exc_cHoraApertura", typeof (string)));               
							 dt.Columns.Add(new DataColumn("exc_cHoraCierre", typeof (string)));               
							 										
               //create Row  
               dr = dt.NewRow();
               
               //set Row
							 dr["Id"] = base.Id;

							 dr["Name"] = base.Name;
dr["exc_iid"] = (object)this.exc_iid ?? System.DBNull.Value;
dr["exc_cevento"] = (object)this.exc_cevento ?? System.DBNull.Value;
dr["exc_cHoraApertura"] = (object)this.exc_cHoraApertura ?? System.DBNull.Value;
dr["exc_cHoraCierre"] = (object)this.exc_cHoraCierre ?? System.DBNull.Value;
							 
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
