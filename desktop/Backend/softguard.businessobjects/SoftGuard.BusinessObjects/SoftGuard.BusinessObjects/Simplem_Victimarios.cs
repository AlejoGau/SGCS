
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
    ///m_Victimarios Slbf Class
    ///</summary>
    [DataContract]
    public class Simplem_Victimarios : SimpleBaseObject
    { 
			 ///<summary>
     ///vic_cApellido   
     ///</summary>
	 [DataMember]
     public string vic_cApellido { get;set;} 
	  ///<summary>
     ///vic_cNombre   
     ///</summary>
	 [DataMember]
     public string vic_cNombre { get;set;} 
	  ///<summary>
     ///vic_cIdentificacion   
     ///</summary>
	 [DataMember]
     public string vic_cIdentificacion { get;set;} 
	  ///<summary>
     ///vic_iRestriccion   
     ///</summary>
	 [DataMember]
     public int vic_iRestriccion { get;set;} 
	  ///<summary>
     ///vic_cCalle   
     ///</summary>
	 [DataMember]
     public string vic_cCalle { get;set;} 
	  ///<summary>
     ///vic_cCalleNro   
     ///</summary>
	 [DataMember]
     public string vic_cCalleNro { get;set;} 
	  ///<summary>
     ///vic_cCallePiso   
     ///</summary>
	 [DataMember]
     public string vic_cCallePiso { get;set;} 
	  ///<summary>
     ///vic_cCalleDpto   
     ///</summary>
	 [DataMember]
     public string vic_cCalleDpto { get;set;} 
	  ///<summary>
     ///vic_cCodigoPostal   
     ///</summary>
	 [DataMember]
     public string vic_cCodigoPostal { get;set;} 
	  ///<summary>
     ///vic_cPartido   
     ///</summary>
	 [DataMember]
     public string vic_cPartido { get;set;} 
	  ///<summary>
     ///vic_cLocalidad   
     ///</summary>
	 [DataMember]
     public string vic_cLocalidad { get;set;} 
	  ///<summary>
     ///vic_cUbicacion   
     ///</summary>
	 [DataMember]
     public string vic_cUbicacion { get;set;} 
	  ///<summary>
     ///vic_cPathPicture   
     ///</summary>
	 [DataMember]
     public string vic_cPathPicture { get;set;} 
	  ///<summary>
     ///vic_iStatus   
     ///</summary>
	 [DataMember]
     public int vic_iStatus { get;set;} 
	  ///<summary>
     ///vic_tFechaAlta   
     ///</summary>
	 [DataMember]
     public DateTime? vic_tFechaAlta { get;set;} 
	  ///<summary>
     ///vic_iEdad   
     ///</summary>
	 [DataMember]
     public int vic_iEdad { get;set;} 
	  ///<summary>
     ///vic_iAltura   
     ///</summary>
	 [DataMember]
     public int vic_iAltura { get;set;} 
	  ///<summary>
     ///vic_iAspectoRaza   
     ///</summary>
	 [DataMember]
     public int vic_iAspectoRaza { get;set;} 
	  ///<summary>
     ///vic_iAspectoTez   
     ///</summary>
	 [DataMember]
     public int vic_iAspectoTez { get;set;} 
	  ///<summary>
     ///vic_iAspectoContextura   
     ///</summary>
	 [DataMember]
     public int vic_iAspectoContextura { get;set;} 
	  ///<summary>
     ///vic_iCabelloTipo   
     ///</summary>
	 [DataMember]
     public int vic_iCabelloTipo { get;set;} 
	  ///<summary>
     ///vic_iCabelloColor   
     ///</summary>
	 [DataMember]
     public int vic_iCabelloColor { get;set;} 
	  ///<summary>
     ///vic_iCabelloEstilo   
     ///</summary>
	 [DataMember]
     public int vic_iCabelloEstilo { get;set;} 
	  ///<summary>
     ///vic_iRostroForma   
     ///</summary>
	 [DataMember]
     public int vic_iRostroForma { get;set;} 
	  ///<summary>
     ///vic_iOjosForma   
     ///</summary>
	 [DataMember]
     public int vic_iOjosForma { get;set;} 
	  ///<summary>
     ///vic_iOjosColor   
     ///</summary>
	 [DataMember]
     public int vic_iOjosColor { get;set;} 
	  ///<summary>
     ///vic_iNarizFrente   
     ///</summary>
	 [DataMember]
     public int vic_iNarizFrente { get;set;} 
	  ///<summary>
     ///vic_iNarizPerfil   
     ///</summary>
	 [DataMember]
     public int vic_iNarizPerfil { get;set;} 
	  ///<summary>
     ///vic_iNarizSize   
     ///</summary>
	 [DataMember]
     public int vic_iNarizSize { get;set;} 
	  ///<summary>
     ///vic_iBocaLabios   
     ///</summary>
	 [DataMember]
     public int vic_iBocaLabios { get;set;} 
	  ///<summary>
     ///vic_iBocaSize   
     ///</summary>
	 [DataMember]
     public int vic_iBocaSize { get;set;} 
	  ///<summary>
     ///vic_iMentonForma   
     ///</summary>
	 [DataMember]
     public int vic_iMentonForma { get;set;} 
	  ///<summary>
     ///vic_iOrejasForma   
     ///</summary>
	 [DataMember]
     public int vic_iOrejasForma { get;set;} 
	  ///<summary>
     ///vic_iOrejasSize   
     ///</summary>
	 [DataMember]
     public int vic_iOrejasSize { get;set;} 
	  ///<summary>
     ///vic_iCejasForma   
     ///</summary>
	 [DataMember]
     public int vic_iCejasForma { get;set;} 
	  ///<summary>
     ///vic_iCejasSize   
     ///</summary>
	 [DataMember]
     public int vic_iCejasSize { get;set;} 
	  ///<summary>
     ///vic_iPilosidadTipo   
     ///</summary>
	 [DataMember]
     public int vic_iPilosidadTipo { get;set;} 
	  ///<summary>
     ///vic_iPilosidadForma   
     ///</summary>
	 [DataMember]
     public int vic_iPilosidadForma { get;set;} 
	  ///<summary>
     ///vic_cObservaciones   
     ///</summary>
	 [DataMember]
     public string vic_cObservaciones { get;set;} 
	  ///<summary>
     ///vic_cCaractSocial   
     ///</summary>
	 [DataMember]
     public string vic_cCaractSocial { get;set;} 
	  ///<summary>
     ///vic_cAdicciones   
     ///</summary>
	 [DataMember]
     public string vic_cAdicciones { get;set;} 
	  ///<summary>
     ///vic_iPeso   
     ///</summary>
	 [DataMember]
     public int vic_iPeso { get;set;} 
	 ///<summary>
        ///m_Victimarios Constructor
        ///</summary>
        public Simplem_Victimarios() : base()
  {
  InitClass();
  }
        ///<summary>
        ///m_Victimarios Constructor
        ///</summary>
        public Simplem_Victimarios(int Id, string Name, string vic_cApellido, string vic_cNombre, string vic_cIdentificacion, int vic_iRestriccion, string vic_cCalle, string vic_cCalleNro, string vic_cCallePiso, string vic_cCalleDpto, string vic_cCodigoPostal, string vic_cPartido, string vic_cLocalidad, string vic_cUbicacion, string vic_cPathPicture, int vic_iStatus, DateTime? vic_tFechaAlta, int vic_iEdad, int vic_iAltura, int vic_iAspectoRaza, int vic_iAspectoTez, int vic_iAspectoContextura, int vic_iCabelloTipo, int vic_iCabelloColor, int vic_iCabelloEstilo, int vic_iRostroForma, int vic_iOjosForma, int vic_iOjosColor, int vic_iNarizFrente, int vic_iNarizPerfil, int vic_iNarizSize, int vic_iBocaLabios, int vic_iBocaSize, int vic_iMentonForma, int vic_iOrejasForma, int vic_iOrejasSize, int vic_iCejasForma, int vic_iCejasSize, int vic_iPilosidadTipo, int vic_iPilosidadForma, string vic_cObservaciones, string vic_cCaractSocial, string vic_cAdicciones, int vic_iPeso) : base()
        {
            base.Id = Id;
						base.Name = Name;				 																																					 
				    this.vic_cApellido = vic_cApellido;
this.vic_cNombre = vic_cNombre;
this.vic_cIdentificacion = vic_cIdentificacion;
this.vic_iRestriccion = vic_iRestriccion;
this.vic_cCalle = vic_cCalle;
this.vic_cCalleNro = vic_cCalleNro;
this.vic_cCallePiso = vic_cCallePiso;
this.vic_cCalleDpto = vic_cCalleDpto;
this.vic_cCodigoPostal = vic_cCodigoPostal;
this.vic_cPartido = vic_cPartido;
this.vic_cLocalidad = vic_cLocalidad;
this.vic_cUbicacion = vic_cUbicacion;
this.vic_cPathPicture = vic_cPathPicture;
this.vic_iStatus = vic_iStatus;
this.vic_tFechaAlta = vic_tFechaAlta;
this.vic_iEdad = vic_iEdad;
this.vic_iAltura = vic_iAltura;
this.vic_iAspectoRaza = vic_iAspectoRaza;
this.vic_iAspectoTez = vic_iAspectoTez;
this.vic_iAspectoContextura = vic_iAspectoContextura;
this.vic_iCabelloTipo = vic_iCabelloTipo;
this.vic_iCabelloColor = vic_iCabelloColor;
this.vic_iCabelloEstilo = vic_iCabelloEstilo;
this.vic_iRostroForma = vic_iRostroForma;
this.vic_iOjosForma = vic_iOjosForma;
this.vic_iOjosColor = vic_iOjosColor;
this.vic_iNarizFrente = vic_iNarizFrente;
this.vic_iNarizPerfil = vic_iNarizPerfil;
this.vic_iNarizSize = vic_iNarizSize;
this.vic_iBocaLabios = vic_iBocaLabios;
this.vic_iBocaSize = vic_iBocaSize;
this.vic_iMentonForma = vic_iMentonForma;
this.vic_iOrejasForma = vic_iOrejasForma;
this.vic_iOrejasSize = vic_iOrejasSize;
this.vic_iCejasForma = vic_iCejasForma;
this.vic_iCejasSize = vic_iCejasSize;
this.vic_iPilosidadTipo = vic_iPilosidadTipo;
this.vic_iPilosidadForma = vic_iPilosidadForma;
this.vic_cObservaciones = vic_cObservaciones;
this.vic_cCaractSocial = vic_cCaractSocial;
this.vic_cAdicciones = vic_cAdicciones;
this.vic_iPeso = vic_iPeso;

            InitClass();
        }  								

				private void InitClass()
        {														
  				  base.Type = new ObjectType(3238, "m_Victimarios");
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
			BaseObject Object = new Dalm_Victimarios(SqlConfig, UserId, this);
			if(this.CallerObject != null)
			   Object.CallerObject = this.CallerObject;			
			return Object;
		}
///<summary>
    ///Get parent object
    ///</summary>
		public override CallerObject GetCallerObject()
		{
			Callerm_Victimarios Caller = new Callerm_Victimarios();
			Caller.Id = base.Id;
			Caller.Name = base.Name;
			Caller.vic_cApellido = this.vic_cApellido;
Caller.vic_cNombre = this.vic_cNombre;
Caller.vic_cIdentificacion = this.vic_cIdentificacion;
Caller.vic_iRestriccion = this.vic_iRestriccion;
Caller.vic_cCalle = this.vic_cCalle;
Caller.vic_cCalleNro = this.vic_cCalleNro;
Caller.vic_cCallePiso = this.vic_cCallePiso;
Caller.vic_cCalleDpto = this.vic_cCalleDpto;
Caller.vic_cCodigoPostal = this.vic_cCodigoPostal;
Caller.vic_cPartido = this.vic_cPartido;
Caller.vic_cLocalidad = this.vic_cLocalidad;
Caller.vic_cUbicacion = this.vic_cUbicacion;
Caller.vic_cPathPicture = this.vic_cPathPicture;
Caller.vic_iStatus = this.vic_iStatus;
Caller.vic_tFechaAlta = this.vic_tFechaAlta;
Caller.vic_iEdad = this.vic_iEdad;
Caller.vic_iAltura = this.vic_iAltura;
Caller.vic_iAspectoRaza = this.vic_iAspectoRaza;
Caller.vic_iAspectoTez = this.vic_iAspectoTez;
Caller.vic_iAspectoContextura = this.vic_iAspectoContextura;
Caller.vic_iCabelloTipo = this.vic_iCabelloTipo;
Caller.vic_iCabelloColor = this.vic_iCabelloColor;
Caller.vic_iCabelloEstilo = this.vic_iCabelloEstilo;
Caller.vic_iRostroForma = this.vic_iRostroForma;
Caller.vic_iOjosForma = this.vic_iOjosForma;
Caller.vic_iOjosColor = this.vic_iOjosColor;
Caller.vic_iNarizFrente = this.vic_iNarizFrente;
Caller.vic_iNarizPerfil = this.vic_iNarizPerfil;
Caller.vic_iNarizSize = this.vic_iNarizSize;
Caller.vic_iBocaLabios = this.vic_iBocaLabios;
Caller.vic_iBocaSize = this.vic_iBocaSize;
Caller.vic_iMentonForma = this.vic_iMentonForma;
Caller.vic_iOrejasForma = this.vic_iOrejasForma;
Caller.vic_iOrejasSize = this.vic_iOrejasSize;
Caller.vic_iCejasForma = this.vic_iCejasForma;
Caller.vic_iCejasSize = this.vic_iCejasSize;
Caller.vic_iPilosidadTipo = this.vic_iPilosidadTipo;
Caller.vic_iPilosidadForma = this.vic_iPilosidadForma;
Caller.vic_cObservaciones = this.vic_cObservaciones;
Caller.vic_cCaractSocial = this.vic_cCaractSocial;
Caller.vic_cAdicciones = this.vic_cAdicciones;
Caller.vic_iPeso = this.vic_iPeso;

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
               dt.Columns.Add(new DataColumn("vic_cApellido", typeof (string)));               
							 dt.Columns.Add(new DataColumn("vic_cNombre", typeof (string)));               
							 dt.Columns.Add(new DataColumn("vic_cIdentificacion", typeof (string)));               
							 dt.Columns.Add(new DataColumn("vic_iRestriccion", typeof (int)));               
							 dt.Columns.Add(new DataColumn("vic_cCalle", typeof (string)));               
							 dt.Columns.Add(new DataColumn("vic_cCalleNro", typeof (string)));               
							 dt.Columns.Add(new DataColumn("vic_cCallePiso", typeof (string)));               
							 dt.Columns.Add(new DataColumn("vic_cCalleDpto", typeof (string)));               
							 dt.Columns.Add(new DataColumn("vic_cCodigoPostal", typeof (string)));               
							 dt.Columns.Add(new DataColumn("vic_cPartido", typeof (string)));               
							 dt.Columns.Add(new DataColumn("vic_cLocalidad", typeof (string)));               
							 dt.Columns.Add(new DataColumn("vic_cUbicacion", typeof (string)));               
							 dt.Columns.Add(new DataColumn("vic_cPathPicture", typeof (string)));               
							 dt.Columns.Add(new DataColumn("vic_iStatus", typeof (int)));               
							 dt.Columns.Add(new DataColumn("vic_tFechaAlta", typeof (DateTime)));               
							 dt.Columns.Add(new DataColumn("vic_iEdad", typeof (int)));               
							 dt.Columns.Add(new DataColumn("vic_iAltura", typeof (int)));               
							 dt.Columns.Add(new DataColumn("vic_iAspectoRaza", typeof (int)));               
							 dt.Columns.Add(new DataColumn("vic_iAspectoTez", typeof (int)));               
							 dt.Columns.Add(new DataColumn("vic_iAspectoContextura", typeof (int)));               
							 dt.Columns.Add(new DataColumn("vic_iCabelloTipo", typeof (int)));               
							 dt.Columns.Add(new DataColumn("vic_iCabelloColor", typeof (int)));               
							 dt.Columns.Add(new DataColumn("vic_iCabelloEstilo", typeof (int)));               
							 dt.Columns.Add(new DataColumn("vic_iRostroForma", typeof (int)));               
							 dt.Columns.Add(new DataColumn("vic_iOjosForma", typeof (int)));               
							 dt.Columns.Add(new DataColumn("vic_iOjosColor", typeof (int)));               
							 dt.Columns.Add(new DataColumn("vic_iNarizFrente", typeof (int)));               
							 dt.Columns.Add(new DataColumn("vic_iNarizPerfil", typeof (int)));               
							 dt.Columns.Add(new DataColumn("vic_iNarizSize", typeof (int)));               
							 dt.Columns.Add(new DataColumn("vic_iBocaLabios", typeof (int)));               
							 dt.Columns.Add(new DataColumn("vic_iBocaSize", typeof (int)));               
							 dt.Columns.Add(new DataColumn("vic_iMentonForma", typeof (int)));               
							 dt.Columns.Add(new DataColumn("vic_iOrejasForma", typeof (int)));               
							 dt.Columns.Add(new DataColumn("vic_iOrejasSize", typeof (int)));               
							 dt.Columns.Add(new DataColumn("vic_iCejasForma", typeof (int)));               
							 dt.Columns.Add(new DataColumn("vic_iCejasSize", typeof (int)));               
							 dt.Columns.Add(new DataColumn("vic_iPilosidadTipo", typeof (int)));               
							 dt.Columns.Add(new DataColumn("vic_iPilosidadForma", typeof (int)));               
							 dt.Columns.Add(new DataColumn("vic_cObservaciones", typeof (string)));               
							 dt.Columns.Add(new DataColumn("vic_cCaractSocial", typeof (string)));               
							 dt.Columns.Add(new DataColumn("vic_cAdicciones", typeof (string)));               
							 dt.Columns.Add(new DataColumn("vic_iPeso", typeof (int)));               
							 										
               //create Row  
               dr = dt.NewRow();
               
               //set Row
							 dr["Id"] = base.Id;

							 dr["Name"] = base.Name;
dr["vic_cApellido"] = (object)this.vic_cApellido ?? System.DBNull.Value;
dr["vic_cNombre"] = (object)this.vic_cNombre ?? System.DBNull.Value;
dr["vic_cIdentificacion"] = (object)this.vic_cIdentificacion ?? System.DBNull.Value;
dr["vic_iRestriccion"] = (object)this.vic_iRestriccion ?? System.DBNull.Value;
dr["vic_cCalle"] = (object)this.vic_cCalle ?? System.DBNull.Value;
dr["vic_cCalleNro"] = (object)this.vic_cCalleNro ?? System.DBNull.Value;
dr["vic_cCallePiso"] = (object)this.vic_cCallePiso ?? System.DBNull.Value;
dr["vic_cCalleDpto"] = (object)this.vic_cCalleDpto ?? System.DBNull.Value;
dr["vic_cCodigoPostal"] = (object)this.vic_cCodigoPostal ?? System.DBNull.Value;
dr["vic_cPartido"] = (object)this.vic_cPartido ?? System.DBNull.Value;
dr["vic_cLocalidad"] = (object)this.vic_cLocalidad ?? System.DBNull.Value;
dr["vic_cUbicacion"] = (object)this.vic_cUbicacion ?? System.DBNull.Value;
dr["vic_cPathPicture"] = (object)this.vic_cPathPicture ?? System.DBNull.Value;
dr["vic_iStatus"] = (object)this.vic_iStatus ?? System.DBNull.Value;
dr["vic_tFechaAlta"] = (object)this.vic_tFechaAlta ?? System.DBNull.Value;
dr["vic_iEdad"] = (object)this.vic_iEdad ?? System.DBNull.Value;
dr["vic_iAltura"] = (object)this.vic_iAltura ?? System.DBNull.Value;
dr["vic_iAspectoRaza"] = (object)this.vic_iAspectoRaza ?? System.DBNull.Value;
dr["vic_iAspectoTez"] = (object)this.vic_iAspectoTez ?? System.DBNull.Value;
dr["vic_iAspectoContextura"] = (object)this.vic_iAspectoContextura ?? System.DBNull.Value;
dr["vic_iCabelloTipo"] = (object)this.vic_iCabelloTipo ?? System.DBNull.Value;
dr["vic_iCabelloColor"] = (object)this.vic_iCabelloColor ?? System.DBNull.Value;
dr["vic_iCabelloEstilo"] = (object)this.vic_iCabelloEstilo ?? System.DBNull.Value;
dr["vic_iRostroForma"] = (object)this.vic_iRostroForma ?? System.DBNull.Value;
dr["vic_iOjosForma"] = (object)this.vic_iOjosForma ?? System.DBNull.Value;
dr["vic_iOjosColor"] = (object)this.vic_iOjosColor ?? System.DBNull.Value;
dr["vic_iNarizFrente"] = (object)this.vic_iNarizFrente ?? System.DBNull.Value;
dr["vic_iNarizPerfil"] = (object)this.vic_iNarizPerfil ?? System.DBNull.Value;
dr["vic_iNarizSize"] = (object)this.vic_iNarizSize ?? System.DBNull.Value;
dr["vic_iBocaLabios"] = (object)this.vic_iBocaLabios ?? System.DBNull.Value;
dr["vic_iBocaSize"] = (object)this.vic_iBocaSize ?? System.DBNull.Value;
dr["vic_iMentonForma"] = (object)this.vic_iMentonForma ?? System.DBNull.Value;
dr["vic_iOrejasForma"] = (object)this.vic_iOrejasForma ?? System.DBNull.Value;
dr["vic_iOrejasSize"] = (object)this.vic_iOrejasSize ?? System.DBNull.Value;
dr["vic_iCejasForma"] = (object)this.vic_iCejasForma ?? System.DBNull.Value;
dr["vic_iCejasSize"] = (object)this.vic_iCejasSize ?? System.DBNull.Value;
dr["vic_iPilosidadTipo"] = (object)this.vic_iPilosidadTipo ?? System.DBNull.Value;
dr["vic_iPilosidadForma"] = (object)this.vic_iPilosidadForma ?? System.DBNull.Value;
dr["vic_cObservaciones"] = (object)this.vic_cObservaciones ?? System.DBNull.Value;
dr["vic_cCaractSocial"] = (object)this.vic_cCaractSocial ?? System.DBNull.Value;
dr["vic_cAdicciones"] = (object)this.vic_cAdicciones ?? System.DBNull.Value;
dr["vic_iPeso"] = (object)this.vic_iPeso ?? System.DBNull.Value;
							 
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
