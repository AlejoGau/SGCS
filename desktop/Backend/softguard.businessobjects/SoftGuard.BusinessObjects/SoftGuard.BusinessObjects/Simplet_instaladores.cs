
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
    ///t_instaladores Slbf Class
    ///</summary>
    [DataContract]
    public class Simplet_instaladores : SimpleBaseObject
    { 
			 ///<summary>
     ///ins_ccodigo   
     ///</summary>
	 [DataMember]
     public string ins_ccodigo { get;set;} 
	  ///<summary>
     ///ins_cnombre   
     ///</summary>
	 [DataMember]
     public string ins_cnombre { get;set;} 
	  ///<summary>
     ///ins_cempresa   
     ///</summary>
	 [DataMember]
     public string ins_cempresa { get;set;} 
	  ///<summary>
     ///ins_ccalle   
     ///</summary>
	 [DataMember]
     public string ins_ccalle { get;set;} 
	  ///<summary>
     ///ins_inumero   
     ///</summary>
	 [DataMember]
     public int ins_inumero { get;set;} 
	  ///<summary>
     ///ins_npiso   
     ///</summary>
	 [DataMember]
     public Decimal ins_npiso { get;set;} 
	  ///<summary>
     ///ins_cdepartamento   
     ///</summary>
	 [DataMember]
     public string ins_cdepartamento { get;set;} 
	  ///<summary>
     ///ins_ctelefono   
     ///</summary>
	 [DataMember]
     public string ins_ctelefono { get;set;} 
	  ///<summary>
     ///ins_cmail   
     ///</summary>
	 [DataMember]
     public string ins_cmail { get;set;} 
	  ///<summary>
     ///ins_cDealer   
     ///</summary>
	 [DataMember]
     public string ins_cDealer { get;set;} 
	  ///<summary>
     ///ins_iTipo   
     ///</summary>
	 [DataMember]
     public int ins_iTipo { get;set;} 
	  ///<summary>
     ///ins_irelacion   
     ///</summary>
	 [DataMember]
     public int ins_irelacion { get;set;} 
	  ///<summary>
     ///ins_iOrganizacion    
     ///</summary>
	 [DataMember]
     public int ins_iOrganizacion  { get;set;} 
	 ///<summary>
        ///t_instaladores Constructor
        ///</summary>
        public Simplet_instaladores() : base()
  {
  InitClass();
  }
        ///<summary>
        ///t_instaladores Constructor
        ///</summary>
        public Simplet_instaladores(int Id, string Name, string ins_ccodigo, string ins_cnombre, string ins_cempresa, string ins_ccalle, int ins_inumero, Decimal ins_npiso, string ins_cdepartamento, string ins_ctelefono, string ins_cmail, string ins_cDealer, int ins_iTipo, int ins_irelacion, int ins_iOrganizacion ) : base()
        {
            base.Id = Id;
						base.Name = Name;				 																																					 
				    this.ins_ccodigo = ins_ccodigo;
this.ins_cnombre = ins_cnombre;
this.ins_cempresa = ins_cempresa;
this.ins_ccalle = ins_ccalle;
this.ins_inumero = ins_inumero;
this.ins_npiso = ins_npiso;
this.ins_cdepartamento = ins_cdepartamento;
this.ins_ctelefono = ins_ctelefono;
this.ins_cmail = ins_cmail;
this.ins_cDealer = ins_cDealer;
this.ins_iTipo = ins_iTipo;
this.ins_irelacion = ins_irelacion;
this.ins_iOrganizacion  = ins_iOrganizacion ;

            InitClass();
        }  								

				private void InitClass()
        {														
  				  base.Type = new ObjectType(3080, "t_instaladores");
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
			BaseObject Object = new Dalt_instaladores(SqlConfig, UserId, this);
			if(this.CallerObject != null)
			   Object.CallerObject = this.CallerObject;			
			return Object;
		}
///<summary>
    ///Get parent object
    ///</summary>
		public override CallerObject GetCallerObject()
		{
			Callert_instaladores Caller = new Callert_instaladores();
			Caller.Id = base.Id;
			Caller.Name = base.Name;
			Caller.ins_ccodigo = this.ins_ccodigo;
Caller.ins_cnombre = this.ins_cnombre;
Caller.ins_cempresa = this.ins_cempresa;
Caller.ins_ccalle = this.ins_ccalle;
Caller.ins_inumero = this.ins_inumero;
Caller.ins_npiso = this.ins_npiso;
Caller.ins_cdepartamento = this.ins_cdepartamento;
Caller.ins_ctelefono = this.ins_ctelefono;
Caller.ins_cmail = this.ins_cmail;
Caller.ins_cDealer = this.ins_cDealer;
Caller.ins_iTipo = this.ins_iTipo;
Caller.ins_irelacion = this.ins_irelacion;
Caller.ins_iOrganizacion  = this.ins_iOrganizacion ;

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
               dt.Columns.Add(new DataColumn("ins_ccodigo", typeof (string)));               
							 dt.Columns.Add(new DataColumn("ins_cnombre", typeof (string)));               
							 dt.Columns.Add(new DataColumn("ins_cempresa", typeof (string)));               
							 dt.Columns.Add(new DataColumn("ins_ccalle", typeof (string)));               
							 dt.Columns.Add(new DataColumn("ins_inumero", typeof (int)));               
							 dt.Columns.Add(new DataColumn("ins_npiso", typeof (Decimal)));               
							 dt.Columns.Add(new DataColumn("ins_cdepartamento", typeof (string)));               
							 dt.Columns.Add(new DataColumn("ins_ctelefono", typeof (string)));               
							 dt.Columns.Add(new DataColumn("ins_cmail", typeof (string)));               
							 dt.Columns.Add(new DataColumn("ins_cDealer", typeof (string)));               
							 dt.Columns.Add(new DataColumn("ins_iTipo", typeof (int)));               
							 dt.Columns.Add(new DataColumn("ins_irelacion", typeof (int)));               
							 dt.Columns.Add(new DataColumn("ins_iOrganizacion ", typeof (int)));               
							 										
               //create Row  
               dr = dt.NewRow();
               
               //set Row
							 dr["Id"] = base.Id;

							 dr["Name"] = base.Name;
dr["ins_ccodigo"] = (object)this.ins_ccodigo ?? System.DBNull.Value;
dr["ins_cnombre"] = (object)this.ins_cnombre ?? System.DBNull.Value;
dr["ins_cempresa"] = (object)this.ins_cempresa ?? System.DBNull.Value;
dr["ins_ccalle"] = (object)this.ins_ccalle ?? System.DBNull.Value;
dr["ins_inumero"] = (object)this.ins_inumero ?? System.DBNull.Value;
dr["ins_npiso"] = (object)this.ins_npiso ?? System.DBNull.Value;
dr["ins_cdepartamento"] = (object)this.ins_cdepartamento ?? System.DBNull.Value;
dr["ins_ctelefono"] = (object)this.ins_ctelefono ?? System.DBNull.Value;
dr["ins_cmail"] = (object)this.ins_cmail ?? System.DBNull.Value;
dr["ins_cDealer"] = (object)this.ins_cDealer ?? System.DBNull.Value;
dr["ins_iTipo"] = (object)this.ins_iTipo ?? System.DBNull.Value;
dr["ins_irelacion"] = (object)this.ins_irelacion ?? System.DBNull.Value;
dr["ins_iOrganizacion "] = (object)this.ins_iOrganizacion  ?? System.DBNull.Value;
							 
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
