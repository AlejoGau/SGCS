
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
    ///t_controlAcceso_puerta Slbf Class
    ///</summary>
    [DataContract]
    public class Simplet_controlAcceso_puerta : SimpleBaseObject
    { 
			 ///<summary>
     ///cap_nombre   
     ///</summary>
	 [DataMember]
     public string cap_nombre { get;set;} 
	  ///<summary>
     ///cap_idCta   
     ///</summary>
	 [DataMember]
     public int cap_idCta { get;set;} 
	  ///<summary>
     ///cap_iIngreso   
     ///</summary>
	 [DataMember]
     public long cap_iIngreso { get;set;} 
	  ///<summary>
     ///cap_iEgreso   
     ///</summary>
	 [DataMember]
     public long cap_iEgreso { get;set;} 
	  ///<summary>
     ///cap_iIngreso2   
     ///</summary>
	 [DataMember]
     public long cap_iIngreso2 { get;set;} 
	  ///<summary>
     ///cap_iEgreso2   
     ///</summary>
	 [DataMember]
     public long cap_iEgreso2 { get;set;} 
	  ///<summary>
     ///cap_iIngreso3   
     ///</summary>
	 [DataMember]
     public long cap_iIngreso3 { get;set;} 
	  ///<summary>
     ///cap_iEgreso3   
     ///</summary>
	 [DataMember]
     public long cap_iEgreso3 { get;set;} 
	  ///<summary>
     ///cap_iIngreso4   
     ///</summary>
	 [DataMember]
     public long cap_iIngreso4 { get;set;} 
	  ///<summary>
     ///cap_iEgreso4   
     ///</summary>
	 [DataMember]
     public long cap_iEgreso4 { get;set;} 
	 ///<summary>
        ///t_controlAcceso_puerta Constructor
        ///</summary>
        public Simplet_controlAcceso_puerta() : base()
  {
  InitClass();
  }
        ///<summary>
        ///t_controlAcceso_puerta Constructor
        ///</summary>
        public Simplet_controlAcceso_puerta(int Id, string Name, string cap_nombre, int cap_idCta, long cap_iIngreso, long cap_iEgreso, long cap_iIngreso2, long cap_iEgreso2, long cap_iIngreso3, long cap_iEgreso3, long cap_iIngreso4, long cap_iEgreso4) : base()
        {
            base.Id = Id;
						base.Name = Name;				 																																					 
				    this.cap_nombre = cap_nombre;
this.cap_idCta = cap_idCta;
this.cap_iIngreso = cap_iIngreso;
this.cap_iEgreso = cap_iEgreso;
this.cap_iIngreso2 = cap_iIngreso2;
this.cap_iEgreso2 = cap_iEgreso2;
this.cap_iIngreso3 = cap_iIngreso3;
this.cap_iEgreso3 = cap_iEgreso3;
this.cap_iIngreso4 = cap_iIngreso4;
this.cap_iEgreso4 = cap_iEgreso4;

            InitClass();
        }  								

				private void InitClass()
        {														
  				  base.Type = new ObjectType(3209, "t_controlAcceso_puerta");
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
			BaseObject Object = new Dalt_controlAcceso_puerta(SqlConfig, UserId, this);
			if(this.CallerObject != null)
			   Object.CallerObject = this.CallerObject;			
			return Object;
		}
///<summary>
    ///Get parent object
    ///</summary>
		public override CallerObject GetCallerObject()
		{
			Callert_controlAcceso_puerta Caller = new Callert_controlAcceso_puerta();
			Caller.Id = base.Id;
			Caller.Name = base.Name;
			Caller.cap_nombre = this.cap_nombre;
Caller.cap_idCta = this.cap_idCta;
Caller.cap_iIngreso = this.cap_iIngreso;
Caller.cap_iEgreso = this.cap_iEgreso;
Caller.cap_iIngreso2 = this.cap_iIngreso2;
Caller.cap_iEgreso2 = this.cap_iEgreso2;
Caller.cap_iIngreso3 = this.cap_iIngreso3;
Caller.cap_iEgreso3 = this.cap_iEgreso3;
Caller.cap_iIngreso4 = this.cap_iIngreso4;
Caller.cap_iEgreso4 = this.cap_iEgreso4;

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
               dt.Columns.Add(new DataColumn("cap_nombre", typeof (string)));               
							 dt.Columns.Add(new DataColumn("cap_idCta", typeof (int)));               
							 dt.Columns.Add(new DataColumn("cap_iIngreso", typeof (long)));               
							 dt.Columns.Add(new DataColumn("cap_iEgreso", typeof (long)));               
							 dt.Columns.Add(new DataColumn("cap_iIngreso2", typeof (long)));               
							 dt.Columns.Add(new DataColumn("cap_iEgreso2", typeof (long)));               
							 dt.Columns.Add(new DataColumn("cap_iIngreso3", typeof (long)));               
							 dt.Columns.Add(new DataColumn("cap_iEgreso3", typeof (long)));               
							 dt.Columns.Add(new DataColumn("cap_iIngreso4", typeof (long)));               
							 dt.Columns.Add(new DataColumn("cap_iEgreso4", typeof (long)));               
							 										
               //create Row  
               dr = dt.NewRow();
               
               //set Row
							 dr["Id"] = base.Id;

							 dr["Name"] = base.Name;
dr["cap_nombre"] = (object)this.cap_nombre ?? System.DBNull.Value;
dr["cap_idCta"] = (object)this.cap_idCta ?? System.DBNull.Value;
dr["cap_iIngreso"] = (object)this.cap_iIngreso ?? System.DBNull.Value;
dr["cap_iEgreso"] = (object)this.cap_iEgreso ?? System.DBNull.Value;
dr["cap_iIngreso2"] = (object)this.cap_iIngreso2 ?? System.DBNull.Value;
dr["cap_iEgreso2"] = (object)this.cap_iEgreso2 ?? System.DBNull.Value;
dr["cap_iIngreso3"] = (object)this.cap_iIngreso3 ?? System.DBNull.Value;
dr["cap_iEgreso3"] = (object)this.cap_iEgreso3 ?? System.DBNull.Value;
dr["cap_iIngreso4"] = (object)this.cap_iIngreso4 ?? System.DBNull.Value;
dr["cap_iEgreso4"] = (object)this.cap_iEgreso4 ?? System.DBNull.Value;
							 
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
