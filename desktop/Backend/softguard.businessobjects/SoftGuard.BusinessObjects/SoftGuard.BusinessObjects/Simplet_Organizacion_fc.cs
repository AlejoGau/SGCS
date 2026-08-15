
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
    ///t_organizacion_fc Slbf Class
    ///</summary>
    [DataContract]
    public class Simplet_organizacion_fc : SimpleBaseObject
    { 
			 ///<summary>
     ///org_cnombre   
     ///</summary>
	 [DataMember]
     public string org_cnombre { get;set;} 
	  ///<summary>
     ///org_ccallefiscal   
     ///</summary>
	 [DataMember]
     public string org_ccallefiscal { get;set;} 
	  ///<summary>
     ///org_clocalidadfiscal   
     ///</summary>
	 [DataMember]
     public string org_clocalidadfiscal { get;set;} 
	  ///<summary>
     ///org_cprovinciafiscal   
     ///</summary>
	 [DataMember]
     public string org_cprovinciafiscal { get;set;} 
	  ///<summary>
     ///org_ccodigopostalfiscal   
     ///</summary>
	 [DataMember]
     public string org_ccodigopostalfiscal { get;set;} 
	  ///<summary>
     ///org_ctelefono   
     ///</summary>
	 [DataMember]
     public string org_ctelefono { get;set;} 
	  ///<summary>
     ///org_cmail   
     ///</summary>
	 [DataMember]
     public string org_cmail { get;set;} 
	  ///<summary>
     ///org_ccategoriaimpositiva   
     ///</summary>
	 [DataMember]
     public string org_ccategoriaimpositiva { get;set;} 
	  ///<summary>
     ///org_cidentificacion   
     ///</summary>
	 [DataMember]
     public string org_cidentificacion { get;set;} 
	  ///<summary>
     ///org_cinicioactividades   
     ///</summary>
	 [DataMember]
     public string org_cinicioactividades { get;set;} 
	  ///<summary>
     ///org_cempresacb   
     ///</summary>
	 [DataMember]
     public string org_cempresacb { get;set;} 
	  ///<summary>
     ///org_cheadercbte   
     ///</summary>
	 [DataMember]
     public string org_cheadercbte { get;set;} 
	  ///<summary>
     ///org_csymbol   
     ///</summary>
	 [DataMember]
     public string org_csymbol { get;set;} 
	  ///<summary>
     ///org_cmetadata   
     ///</summary>
	 [DataMember]
     public string org_cmetadata { get;set;} 
	  ///<summary>
     ///org_factelect   
     ///</summary>
	 [DataMember]
     public string org_factelect { get;set;} 
	  ///<summary>
     ///org_organizacionId   
     ///</summary>
	 [DataMember]
     public int org_organizacionId { get;set;} 
	 ///<summary>
        ///t_organizacion_fc Constructor
        ///</summary>
        public Simplet_organizacion_fc() : base()
  {
  InitClass();
  }
        ///<summary>
        ///t_organizacion_fc Constructor
        ///</summary>
        public Simplet_organizacion_fc(int Id, string Name, string org_cnombre, string org_ccallefiscal, string org_clocalidadfiscal, string org_cprovinciafiscal, string org_ccodigopostalfiscal, string org_ctelefono, string org_cmail, string org_ccategoriaimpositiva, string org_cidentificacion, string org_cinicioactividades, string org_cempresacb, string org_cheadercbte, string org_csymbol, string org_cmetadata, string org_factelect, int org_organizacionId) : base()
        {
            base.Id = Id;
						base.Name = Name;				 																																					 
				    this.org_cnombre = org_cnombre;
this.org_ccallefiscal = org_ccallefiscal;
this.org_clocalidadfiscal = org_clocalidadfiscal;
this.org_cprovinciafiscal = org_cprovinciafiscal;
this.org_ccodigopostalfiscal = org_ccodigopostalfiscal;
this.org_ctelefono = org_ctelefono;
this.org_cmail = org_cmail;
this.org_ccategoriaimpositiva = org_ccategoriaimpositiva;
this.org_cidentificacion = org_cidentificacion;
this.org_cinicioactividades = org_cinicioactividades;
this.org_cempresacb = org_cempresacb;
this.org_cheadercbte = org_cheadercbte;
this.org_csymbol = org_csymbol;
this.org_cmetadata = org_cmetadata;
this.org_factelect = org_factelect;
this.org_organizacionId = org_organizacionId;

            InitClass();
        }  								

				private void InitClass()
        {														
  				  base.Type = new ObjectType(3147, "t_organizacion_fc");
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
			BaseObject Object = new Dalt_organizacion_fc(SqlConfig, UserId, this);
			if(this.CallerObject != null)
			   Object.CallerObject = this.CallerObject;			
			return Object;
		}
///<summary>
    ///Get parent object
    ///</summary>
		public override CallerObject GetCallerObject()
		{
			Callert_organizacion_fc Caller = new Callert_organizacion_fc();
			Caller.Id = base.Id;
			Caller.Name = base.Name;
			Caller.org_cnombre = this.org_cnombre;
Caller.org_ccallefiscal = this.org_ccallefiscal;
Caller.org_clocalidadfiscal = this.org_clocalidadfiscal;
Caller.org_cprovinciafiscal = this.org_cprovinciafiscal;
Caller.org_ccodigopostalfiscal = this.org_ccodigopostalfiscal;
Caller.org_ctelefono = this.org_ctelefono;
Caller.org_cmail = this.org_cmail;
Caller.org_ccategoriaimpositiva = this.org_ccategoriaimpositiva;
Caller.org_cidentificacion = this.org_cidentificacion;
Caller.org_cinicioactividades = this.org_cinicioactividades;
Caller.org_cempresacb = this.org_cempresacb;
Caller.org_cheadercbte = this.org_cheadercbte;
Caller.org_csymbol = this.org_csymbol;
Caller.org_cmetadata = this.org_cmetadata;
Caller.org_factelect = this.org_factelect;
Caller.org_organizacionId = this.org_organizacionId;

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
               dt.Columns.Add(new DataColumn("org_cnombre", typeof (string)));               
							 dt.Columns.Add(new DataColumn("org_ccallefiscal", typeof (string)));               
							 dt.Columns.Add(new DataColumn("org_clocalidadfiscal", typeof (string)));               
							 dt.Columns.Add(new DataColumn("org_cprovinciafiscal", typeof (string)));               
							 dt.Columns.Add(new DataColumn("org_ccodigopostalfiscal", typeof (string)));               
							 dt.Columns.Add(new DataColumn("org_ctelefono", typeof (string)));               
							 dt.Columns.Add(new DataColumn("org_cmail", typeof (string)));               
							 dt.Columns.Add(new DataColumn("org_ccategoriaimpositiva", typeof (string)));               
							 dt.Columns.Add(new DataColumn("org_cidentificacion", typeof (string)));               
							 dt.Columns.Add(new DataColumn("org_cinicioactividades", typeof (string)));               
							 dt.Columns.Add(new DataColumn("org_cempresacb", typeof (string)));               
							 dt.Columns.Add(new DataColumn("org_cheadercbte", typeof (string)));               
							 dt.Columns.Add(new DataColumn("org_csymbol", typeof (string)));               
							 dt.Columns.Add(new DataColumn("org_cmetadata", typeof (string)));               
							 dt.Columns.Add(new DataColumn("org_factelect", typeof (string)));               
							 dt.Columns.Add(new DataColumn("org_organizacionId", typeof (int)));               
							 										
               //create Row  
               dr = dt.NewRow();
               
               //set Row
							 dr["Id"] = base.Id;

							 dr["Name"] = base.Name;
dr["org_cnombre"] = (object)this.org_cnombre ?? System.DBNull.Value;
dr["org_ccallefiscal"] = (object)this.org_ccallefiscal ?? System.DBNull.Value;
dr["org_clocalidadfiscal"] = (object)this.org_clocalidadfiscal ?? System.DBNull.Value;
dr["org_cprovinciafiscal"] = (object)this.org_cprovinciafiscal ?? System.DBNull.Value;
dr["org_ccodigopostalfiscal"] = (object)this.org_ccodigopostalfiscal ?? System.DBNull.Value;
dr["org_ctelefono"] = (object)this.org_ctelefono ?? System.DBNull.Value;
dr["org_cmail"] = (object)this.org_cmail ?? System.DBNull.Value;
dr["org_ccategoriaimpositiva"] = (object)this.org_ccategoriaimpositiva ?? System.DBNull.Value;
dr["org_cidentificacion"] = (object)this.org_cidentificacion ?? System.DBNull.Value;
dr["org_cinicioactividades"] = (object)this.org_cinicioactividades ?? System.DBNull.Value;
dr["org_cempresacb"] = (object)this.org_cempresacb ?? System.DBNull.Value;
dr["org_cheadercbte"] = (object)this.org_cheadercbte ?? System.DBNull.Value;
dr["org_csymbol"] = (object)this.org_csymbol ?? System.DBNull.Value;
dr["org_cmetadata"] = (object)this.org_cmetadata ?? System.DBNull.Value;
dr["org_factelect"] = (object)this.org_factelect ?? System.DBNull.Value;
dr["org_organizacionId"] = (object)this.org_organizacionId ?? System.DBNull.Value;
							 
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
