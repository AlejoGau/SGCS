
    using System;
    using System.Xml;
    using System.Data;
	using System.Collections.Generic;
    using System.Data.SqlClient;
    using Slbf;
    using Slbf.Helpers;     

namespace SoftGuard.BusinessObjects
{ 
   ///<summary>
     ///Specialization class   
     ///</summary>
    public abstract class Spem_st_cabecera : ISpecialization, ICanCopyProperties
    { 
		public event SpecializationHandler BeforeAddChild;
		public event SpecializationHandler AfterAddChild;

		public event SpecializationHandler BeforeRemoveChild; 
		public event SpecializationHandler AfterRemoveChild; 

		public event SpecializationHandler BeforeNewChild;    
		public event SpecializationHandler AfterNewChild;   
 
		public event SpecializationHandler BeforeNewParent;    
		public event SpecializationHandler AfterNewParent;   
 
		public event SpecializationHandler AfterSelect; 
		public event SpecializationHandler AfterDelete; 
		public event SpecializationHandler AfterInsert; 
		public event SpecializationHandler AfterUpdate; 
		public event SpecializationHandler AfterCheck;  
	
	private bool _AutoCommit = false;	 
	protected Dalm_st_cabecera _DalObject;
	protected TaxonomyCollection _Taxonomies;
	protected RelationCollection _Relations;	
		
	
 ///<summary>
     ///Sets the transaction Autocommit property   
     ///</summary>
		public bool AutoCommit
		{
			get{ return this._AutoCommit; }
			set{ this._AutoCommit = value; }
		}		
 ///<summary>
     ///Gets taxonomyCollection   
     ///</summary>		
		public TaxonomyCollection Taxonomies
		{
			get{ return this._Taxonomies; }
		}		
		 ///<summary>
     ///Gets object's Id   
     ///</summary>
		public int Id
		{			
			get{ return this._DalObject.Id; }
		}
		 ///<summary>
     ///Gets object's Name   
     ///</summary>
		public string Name
		{
			set{ this._DalObject.Name = value; }
			get{ return this._DalObject.Name; }
		} 
		 ///<summary>
     ///Gets a frameworkSecurity object   
     ///</summary>
		public FrameworkSecurity Security
		{			
			get{ return this._DalObject.Security; }
		} 		
		 ///<summary>
     ///Gets the callerobject   
     ///</summary>
		public CallerObject CallerObject
		{
			set{ this._DalObject.CallerObject = value; }
			get{ return this._DalObject.CallerObject; }
		}
		 ///<summary>
     ///Gets a baseobject colletction   
     ///</summary>
		public BaseObjectCollection Objects
		{	
			set{ this._DalObject.Objects = value; }
			get{ return this._DalObject.Objects; }
		} 
		 ///<summary>
     ///Gets a simplebaseobjectCollection   
     ///</summary>
		public SimpleBaseObjectCollection Dependencies
		{			
			set{ this._DalObject.Dependencies = value; }
			get{ return this._DalObject.Dependencies; }
		}  				
     ///<summary>
     ///stc_iid_cuenta property   
     ///</summary>	
     public int  stc_iid_cuenta 
		 { 
		        
                    get{ return this._DalObject.stc_iid_cuenta; }
        						set{ this._DalObject.stc_iid_cuenta = value; } 										
	   }
	  ///<summary>
     ///stc_inumero property   
     ///</summary>	
     public int  stc_inumero 
		 { 
		        
                    get{ return this._DalObject.stc_inumero; }
        						set{ this._DalObject.stc_inumero = value; } 										
	   }
	  ///<summary>
     ///stc_ctipo_servicio property   
     ///</summary>	
     public string  stc_ctipo_servicio 
		 { 
		        
                    get{ return this._DalObject.stc_ctipo_servicio; }
        						set{ this._DalObject.stc_ctipo_servicio = value; } 										
	   }
	  ///<summary>
     ///stc_mobservaciones property   
     ///</summary>	
     public string  stc_mobservaciones 
		 { 
		        
                    get{ return this._DalObject.stc_mobservaciones; }
        						set{ this._DalObject.stc_mobservaciones = value; } 										
	   }
	  ///<summary>
     ///stc_dfecha_desde_1 property   
     ///</summary>	
     public DateTime?  stc_dfecha_desde_1 
		 { 
		        
                    get{ return this._DalObject.stc_dfecha_desde_1; }
        						set{ this._DalObject.stc_dfecha_desde_1 = value; } 										
	   }
	  ///<summary>
     ///stc_dfecha_hasta_1 property   
     ///</summary>	
     public DateTime?  stc_dfecha_hasta_1 
		 { 
		        
                    get{ return this._DalObject.stc_dfecha_hasta_1; }
        						set{ this._DalObject.stc_dfecha_hasta_1 = value; } 										
	   }
	  ///<summary>
     ///stc_dfecha_desde_2 property   
     ///</summary>	
     public DateTime?  stc_dfecha_desde_2 
		 { 
		        
                    get{ return this._DalObject.stc_dfecha_desde_2; }
        						set{ this._DalObject.stc_dfecha_desde_2 = value; } 										
	   }
	  ///<summary>
     ///stc_dfecha_hasta_2 property   
     ///</summary>	
     public DateTime?  stc_dfecha_hasta_2 
		 { 
		        
                    get{ return this._DalObject.stc_dfecha_hasta_2; }
        						set{ this._DalObject.stc_dfecha_hasta_2 = value; } 										
	   }
	  ///<summary>
     ///stc_dfecha_desde_3 property   
     ///</summary>	
     public DateTime?  stc_dfecha_desde_3 
		 { 
		        
                    get{ return this._DalObject.stc_dfecha_desde_3; }
        						set{ this._DalObject.stc_dfecha_desde_3 = value; } 										
	   }
	  ///<summary>
     ///stc_dfecha_hasta_3 property   
     ///</summary>	
     public DateTime?  stc_dfecha_hasta_3 
		 { 
		        
                    get{ return this._DalObject.stc_dfecha_hasta_3; }
        						set{ this._DalObject.stc_dfecha_hasta_3 = value; } 										
	   }
	  ///<summary>
     ///stc_dfecha_cierre property   
     ///</summary>	
     public DateTime?  stc_dfecha_cierre 
		 { 
		        
                    get{ return this._DalObject.stc_dfecha_cierre; }
        						set{ this._DalObject.stc_dfecha_cierre = value; } 										
	   }
	  ///<summary>
     ///stc_ccontacto property   
     ///</summary>	
     public string  stc_ccontacto 
		 { 
		        
                    get{ return this._DalObject.stc_ccontacto; }
        						set{ this._DalObject.stc_ccontacto = value; } 										
	   }
	  ///<summary>
     ///stc_nestado property   
     ///</summary>	
     public Decimal  stc_nestado 
		 { 
		        
                    get{ return this._DalObject.stc_nestado; }
        						set{ this._DalObject.stc_nestado = value; } 										
	   }
	  ///<summary>
     ///stc_ctecnico_1 property   
     ///</summary>	
     public string  stc_ctecnico_1 
		 { 
		        
                    get{ return this._DalObject.stc_ctecnico_1; }
        						set{ this._DalObject.stc_ctecnico_1 = value; } 										
	   }
	  ///<summary>
     ///stc_ctecnico_2 property   
     ///</summary>	
     public string  stc_ctecnico_2 
		 { 
		        
                    get{ return this._DalObject.stc_ctecnico_2; }
        						set{ this._DalObject.stc_ctecnico_2 = value; } 										
	   }
	  ///<summary>
     ///stc_ctecnico_3 property   
     ///</summary>	
     public string  stc_ctecnico_3 
		 { 
		        
                    get{ return this._DalObject.stc_ctecnico_3; }
        						set{ this._DalObject.stc_ctecnico_3 = value; } 										
	   }
	  ///<summary>
     ///stc_ctecnico_4 property   
     ///</summary>	
     public string  stc_ctecnico_4 
		 { 
		        
                    get{ return this._DalObject.stc_ctecnico_4; }
        						set{ this._DalObject.stc_ctecnico_4 = value; } 										
	   }
	  ///<summary>
     ///stc_ctecnico_5 property   
     ///</summary>	
     public string  stc_ctecnico_5 
		 { 
		        
                    get{ return this._DalObject.stc_ctecnico_5; }
        						set{ this._DalObject.stc_ctecnico_5 = value; } 										
	   }
	  ///<summary>
     ///stc_yValor property   
     ///</summary>	
     public Decimal  stc_yValor 
		 { 
		        
                    get{ return this._DalObject.stc_yValor; }
        						set{ this._DalObject.stc_yValor = value; } 										
	   }
	  ///<summary>
     ///stc_nreclamo_1 property   
     ///</summary>	
     public Decimal  stc_nreclamo_1 
		 { 
		        
                    get{ return this._DalObject.stc_nreclamo_1; }
        						set{ this._DalObject.stc_nreclamo_1 = value; } 										
	   }
	  ///<summary>
     ///stc_creclamo_1 property   
     ///</summary>	
     public string  stc_creclamo_1 
		 { 
		        
                    get{ return this._DalObject.stc_creclamo_1; }
        						set{ this._DalObject.stc_creclamo_1 = value; } 										
	   }
	  ///<summary>
     ///stc_nreclamo_2 property   
     ///</summary>	
     public Decimal  stc_nreclamo_2 
		 { 
		        
                    get{ return this._DalObject.stc_nreclamo_2; }
        						set{ this._DalObject.stc_nreclamo_2 = value; } 										
	   }
	  ///<summary>
     ///stc_creclamo_2 property   
     ///</summary>	
     public string  stc_creclamo_2 
		 { 
		        
                    get{ return this._DalObject.stc_creclamo_2; }
        						set{ this._DalObject.stc_creclamo_2 = value; } 										
	   }
	  ///<summary>
     ///stc_nreclamo_3 property   
     ///</summary>	
     public Decimal  stc_nreclamo_3 
		 { 
		        
                    get{ return this._DalObject.stc_nreclamo_3; }
        						set{ this._DalObject.stc_nreclamo_3 = value; } 										
	   }
	  ///<summary>
     ///stc_creclamo_3 property   
     ///</summary>	
     public string  stc_creclamo_3 
		 { 
		        
                    get{ return this._DalObject.stc_creclamo_3; }
        						set{ this._DalObject.stc_creclamo_3 = value; } 										
	   }
	  ///<summary>
     ///stc_nreclamo_4 property   
     ///</summary>	
     public Decimal  stc_nreclamo_4 
		 { 
		        
                    get{ return this._DalObject.stc_nreclamo_4; }
        						set{ this._DalObject.stc_nreclamo_4 = value; } 										
	   }
	  ///<summary>
     ///stc_creclamo_4 property   
     ///</summary>	
     public string  stc_creclamo_4 
		 { 
		        
                    get{ return this._DalObject.stc_creclamo_4; }
        						set{ this._DalObject.stc_creclamo_4 = value; } 										
	   }
	  ///<summary>
     ///stc_nreclamo_5 property   
     ///</summary>	
     public Decimal  stc_nreclamo_5 
		 { 
		        
                    get{ return this._DalObject.stc_nreclamo_5; }
        						set{ this._DalObject.stc_nreclamo_5 = value; } 										
	   }
	  ///<summary>
     ///stc_creclamo_5 property   
     ///</summary>	
     public string  stc_creclamo_5 
		 { 
		        
                    get{ return this._DalObject.stc_creclamo_5; }
        						set{ this._DalObject.stc_creclamo_5 = value; } 										
	   }
	  ///<summary>
     ///stc_cmovil_1 property   
     ///</summary>	
     public string  stc_cmovil_1 
		 { 
		        
                    get{ return this._DalObject.stc_cmovil_1; }
        						set{ this._DalObject.stc_cmovil_1 = value; } 										
	   }
	  ///<summary>
     ///stc_cmovil_2 property   
     ///</summary>	
     public string  stc_cmovil_2 
		 { 
		        
                    get{ return this._DalObject.stc_cmovil_2; }
        						set{ this._DalObject.stc_cmovil_2 = value; } 										
	   }
	  ///<summary>
     ///stc_dfecha_modificacion property   
     ///</summary>	
     public DateTime?  stc_dfecha_modificacion 
		 { 
		        
                    get{ return this._DalObject.stc_dfecha_modificacion; }
        						set{ this._DalObject.stc_dfecha_modificacion = value; } 										
	   }
	  ///<summary>
     ///stc_ioperador property   
     ///</summary>	
     public int  stc_ioperador 
		 { 
		        
                    get{ return this._DalObject.stc_ioperador; }
        						set{ this._DalObject.stc_ioperador = value; } 										
	   }
	  ///<summary>
     ///stc_minsumos property   
     ///</summary>	
     public string  stc_minsumos 
		 { 
		        
                    get{ return this._DalObject.stc_minsumos; }
        						set{ this._DalObject.stc_minsumos = value; } 										
	   }
	  ///<summary>
     ///stc_dintecnico_1 property   
     ///</summary>	
     public DateTime?  stc_dintecnico_1 
		 { 
		        
                    get{ return this._DalObject.stc_dintecnico_1; }
        						set{ this._DalObject.stc_dintecnico_1 = value; } 										
	   }
	  ///<summary>
     ///stc_doutecnico_1 property   
     ///</summary>	
     public DateTime?  stc_doutecnico_1 
		 { 
		        
                    get{ return this._DalObject.stc_doutecnico_1; }
        						set{ this._DalObject.stc_doutecnico_1 = value; } 										
	   }
	  ///<summary>
     ///stc_dintecnico_2 property   
     ///</summary>	
     public DateTime?  stc_dintecnico_2 
		 { 
		        
                    get{ return this._DalObject.stc_dintecnico_2; }
        						set{ this._DalObject.stc_dintecnico_2 = value; } 										
	   }
	  ///<summary>
     ///stc_doutecnico_2 property   
     ///</summary>	
     public DateTime?  stc_doutecnico_2 
		 { 
		        
                    get{ return this._DalObject.stc_doutecnico_2; }
        						set{ this._DalObject.stc_doutecnico_2 = value; } 										
	   }
	  ///<summary>
     ///stc_dintecnico_3 property   
     ///</summary>	
     public DateTime?  stc_dintecnico_3 
		 { 
		        
                    get{ return this._DalObject.stc_dintecnico_3; }
        						set{ this._DalObject.stc_dintecnico_3 = value; } 										
	   }
	  ///<summary>
     ///stc_doutecnico_3 property   
     ///</summary>	
     public DateTime?  stc_doutecnico_3 
		 { 
		        
                    get{ return this._DalObject.stc_doutecnico_3; }
        						set{ this._DalObject.stc_doutecnico_3 = value; } 										
	   }
	  ///<summary>
     ///stc_cdeposito property   
     ///</summary>	
     public string  stc_cdeposito 
		 { 
		        
                    get{ return this._DalObject.stc_cdeposito; }
        						set{ this._DalObject.stc_cdeposito = value; } 										
	   }
	  ///<summary>
     ///stf_dfecha_vto_orden property   
     ///</summary>	
     public DateTime?  stf_dfecha_vto_orden 
		 { 
		        
                    get{ return this._DalObject.stf_dfecha_vto_orden; }
        						set{ this._DalObject.stf_dfecha_vto_orden = value; } 										
	   }
	  ///<summary>
     ///stc_dsalida_al_cliente_DSS property   
     ///</summary>	
     public DateTime?  stc_dsalida_al_cliente_DSS 
		 { 
		        
                    get{ return this._DalObject.stc_dsalida_al_cliente_DSS; }
        						set{ this._DalObject.stc_dsalida_al_cliente_DSS = value; } 										
	   }
	  ///<summary>
     ///stc_darribo_al_cliente_DSS property   
     ///</summary>	
     public DateTime?  stc_darribo_al_cliente_DSS 
		 { 
		        
                    get{ return this._DalObject.stc_darribo_al_cliente_DSS; }
        						set{ this._DalObject.stc_darribo_al_cliente_DSS = value; } 										
	   }
	  ///<summary>
     ///stc_dsalida_desde_cliente_DSS property   
     ///</summary>	
     public DateTime?  stc_dsalida_desde_cliente_DSS 
		 { 
		        
                    get{ return this._DalObject.stc_dsalida_desde_cliente_DSS; }
        						set{ this._DalObject.stc_dsalida_desde_cliente_DSS = value; } 										
	   }
	  ///<summary>
     ///stc_iforma_viaje_DSS property   
     ///</summary>	
     public int  stc_iforma_viaje_DSS 
		 { 
		        
                    get{ return this._DalObject.stc_iforma_viaje_DSS; }
        						set{ this._DalObject.stc_iforma_viaje_DSS = value; } 										
	   }
	  ///<summary>
     ///stc_cconformidad_html  property   
     ///</summary>	
     public string  stc_cconformidad_html  
		 { 
		        
                    get{ return this._DalObject.stc_cconformidad_html ; }
        						set{ this._DalObject.stc_cconformidad_html  = value; } 										
	   }
	  ///<summary>
     ///stc_idorigenorden property   
     ///</summary>	
     public int  stc_idorigenorden 
		 { 
		        
                    get{ return this._DalObject.stc_idorigenorden; }
        						set{ this._DalObject.stc_idorigenorden = value; } 										
	   }
	  ///<summary>
     ///stc_dfechapago property   
     ///</summary>	
     public DateTime?  stc_dfechapago 
		 { 
		        
                    get{ return this._DalObject.stc_dfechapago; }
        						set{ this._DalObject.stc_dfechapago = value; } 										
	   }
	  ///<summary>
     ///stc_nvalorpagotecnico property   
     ///</summary>	
     public Decimal  stc_nvalorpagotecnico 
		 { 
		        
                    get{ return this._DalObject.stc_nvalorpagotecnico; }
        						set{ this._DalObject.stc_nvalorpagotecnico = value; } 										
	   }
	  ///<summary>
     ///stc_ncostomanodeobra property   
     ///</summary>	
     public Decimal  stc_ncostomanodeobra 
		 { 
		        
                    get{ return this._DalObject.stc_ncostomanodeobra; }
        						set{ this._DalObject.stc_ncostomanodeobra = value; } 										
	   }
	  ///<summary>
     ///stc_iPrioridad property   
     ///</summary>	
     public int  stc_iPrioridad 
		 { 
		        
                    get{ return this._DalObject.stc_iPrioridad; }
        						set{ this._DalObject.stc_iPrioridad = value; } 										
	   }
	  ///<summary>
     ///stc_iOrganizacion property   
     ///</summary>	
     public int  stc_iOrganizacion 
		 { 
		        
                    get{ return this._DalObject.stc_iOrganizacion; }
        						set{ this._DalObject.stc_iOrganizacion = value; } 										
	   }
	  ///<summary>
     ///Constructor   
     ///</summary>
    		public Spem_st_cabecera(SqlHelper SqlConfig, int UserId)
    		{
    			InitClass(SqlConfig, UserId);    			
				this._Taxonomies.Load(this.Security.UserId);
    		}	
 ///<summary>
     ///Constructor   
     ///</summary>			
    		public Spem_st_cabecera(SqlHelper SqlConfig, int UserId, int Id)
    		{
    			InitClass(SqlConfig, UserId);        			
			    Load(Id);						
    		}	
 ///<summary>
     ///Constructor   
     ///</summary>			
    		public Spem_st_cabecera(SqlHelper SqlConfig, int UserId, Simplem_st_cabecera Simple)
    		{
    			InitClass(SqlConfig, UserId);    			
    			Load(Simple);								
    		}														
 ///<summary>
     ///Load object data   
     ///</summary>
		public virtual void Load(int Id)
		{
			this._DalObject.Load(Id);
			this._Taxonomies.Load(this.Security.UserId, this._DalObject);
			this._Relations.Load(this._DalObject);			
		}
		 ///<summary>
     ///Load object data   
     ///</summary>
		public virtual void Load(Simplem_st_cabecera Simple)
		{
			this._DalObject.Load(Simple.Id);
			this._Taxonomies.Load(this.Security.UserId, this._DalObject);				
			this._Relations.Load(this._DalObject);
		}		
 ///<summary>
     ///Save object data   
     ///</summary>
        public virtual void Save()
        { 							
				   BeginTran();				        			
        		try
        		{							  
        			this._DalObject.Save();
        			this._Relations.Save(this._DalObject);
        			this._Taxonomies.Save(this._DalObject);
        			
					   CommitTran();                
        		}
        		finally
        		{
        		       EndTran();               
        		}						
        }
 ///<summary>
     ///Delete object   
     ///</summary>
		public virtual void Delete()
		{
			if(this._Relations.Count != 0)
			   throw new RuntimeException("The m_st_cabecera has dependencies.");
			
			if(this._AutoCommit)
				BeginTran();				        			
			try
			{							  
				this._DalObject.Delete();				
        			
				if(this._AutoCommit)
					CommitTran();                
			}
			catch(Exception ex)
			{
				if(this._AutoCommit)
					RollbackTran();
				throw;
			}
			finally
			{
				if(this._AutoCommit)
					EndTran();               
			}
		}
 ///<summary>
     ///Gets a baseobject   
     ///</summary>	
		public BaseObject GetObject()
		{
			return (BaseObject) this._DalObject;
		}
 ///<summary>
     ///Gets a DAL object   
     ///</summary>
		public Dalm_st_cabecera GetDalObject()
		{
			return this._DalObject;
		}
 ///<summary>
     ///Gets a transaction Object   
     ///</summary>	
		public TransactionObject GetTransactionObject()
		{
			return (TransactionObject) this._DalObject;
		}
 ///<summary>
     ///Gets object type   
     ///</summary>
	   public ObjectType GetObjectType(){
			 return this._DalObject.Type;
	   }
 ///<summary>
     ///Gets the caller object   
     ///</summary>	
		public CallerObject GetCallerObject()
		{
			return this._DalObject.GetCallerObject();;
		}
 ///<summary>
     ///Gets a SimpleBaseObject   
     ///</summary>	
		public SimpleBaseObject GetSimpleObject()
		{
			return this._DalObject.GetSimpleObject();
		}
 ///<summary>
     ///Sets a SimpleBaseObject   
     ///</summary>	
		public void SetSimpleObject(SimpleBaseObject Simple)
		{
			this._DalObject.SetSimpleObject(Simple);
		}
 ///<summary>
     ///Gets a DataTable of the object   
     ///</summary>
		public DataTable GetDataObject()
		{												                
			return this._DalObject.GetDataObject();        												    
        }
 ///<summary>
     ///Gets an Xml of the object   
     ///</summary>
		public XmlDataDocument GetXmlObject()
		{
			return this._DalObject.GetXmlObject(); 							    
        }
 ///<summary>
     ///Gets children   
     ///</summary>
		public DataTable GetDataChildsByObject(SimpleBaseObject Object)
		{
			return this._DalObject.GetDataChildsByObject(Object);
		}
		 ///<summary>
     ///Gets children   
     ///</summary>
		public SimpleBaseObjectCollection GetChildsByObject(SimpleBaseObject Object)
		{
			return this._DalObject.GetChildsByObject(Object);
		}
		
		 ///<summary>
     ///Gets children   
     ///</summary>
		public SimpleBaseObjectCollection GetChildsByObject(SimpleBaseObject Object, bool Recursive)
		{
			return this._DalObject.GetChildsByObject(Object, Recursive);
		}		
		
		public IEnumerable<Simplem_st_cabecera> GetByParent(string ObjectType, int ObjectId)
		{
			return this._DalObject.GetByParent(ObjectType, ObjectId);
		}
		public IEnumerable<Simplem_st_cabecera> GetByChild(string ObjectType, int ObjectId)
		{
			return this._DalObject.GetByChild(ObjectType, ObjectId);
		}
		 ///<summary>
     ///Get parents   
     ///</summary>
		public DataTable GetDataParentsByObject(SimpleBaseObject Object)
		{
			return this._DalObject.GetDataParentsByObject(Object);
		}
		 ///<summary>
     ///Get parents   
     ///</summary>
		public SimpleBaseObjectCollection GetParentsByObject(SimpleBaseObject Object)
		{
			return this._DalObject.GetParentsByObject(Object);
		}
 ///<summary>
     ///Search objects   
     ///</summary>
		public DataTable GetDataByName(string Name, TaxonomyCollection Taxonomies, int PageCount, int PagePresent, ref int PageTotal, ref int RowTotal)
		{
			return this._DalObject.GetDataByName(Name, Taxonomies, PageCount, PagePresent, ref PageTotal, ref RowTotal);
		}
		 ///<summary>
     ///Search objects   
     ///</summary>
		public DataTable GetDataByName(string Name, TaxonomyCollection Taxonomies, int PageCount, int PagePresent, string OrderBy, ref int PageTotal, ref int RowTotal)
		{
			return this._DalObject.GetDataByName(Name, Taxonomies, PageCount, PagePresent, OrderBy, ref PageTotal, ref RowTotal);
		}
		 ///<summary>
     ///Search objects   
     ///</summary>
		public DataTable GetDataByName(string Name, TaxonomyCollection Taxonomies)
		{
			int PageTotal = 0;
			int RowTotal = 0;
			return GetDataByName(Name, Taxonomies, 0, 1, ref PageTotal, ref RowTotal);
		}
		 ///<summary>
     ///Search objects   
     ///</summary>
		public DataTable GetDataByNameWithChild(string Name, TaxonomyCollection Taxonomies, SimpleBaseObject FilterChildObject, int PageCount, int PagePresent, ref int PageTotal, ref int RowTotal)
		{
		  return this._DalObject.GetDataByNameWithChild(Name, Taxonomies, FilterChildObject, PageCount, PagePresent, ref PageTotal, ref RowTotal);
		}
		 ///<summary>
     ///Search objects   
     ///</summary>
		public DataTable GetDataByNameWithParent(string Name, TaxonomyCollection Taxonomies, SimpleBaseObject FilterParentObject, int PageCount, int PagePresent, ref int PageTotal, ref int RowTotal)
		{
		  return this._DalObject.GetDataByNameWithParent(Name, Taxonomies, FilterParentObject, PageCount, PagePresent, ref PageTotal, ref RowTotal);
		}	
 ///<summary>
     ///Search objects   
     ///</summary>		
		public DataTable GetDataByText(string Text, TaxonomyCollection Taxonomies)
		{
			int PageTotal = 0;
			int RowTotal = 0;
			return GetDataByText(Text, Taxonomies, 0, 1, ref PageTotal, ref RowTotal);
		}
		
		 ///<summary>
     ///Search objects   
     ///</summary>
		public DataTable GetDataByText(string Text, TaxonomyCollection Taxonomies, int PageCount, int PagePresent, ref int PageTotal, ref int RowTotal)
		{
			return this._DalObject.GetDataByText(Text, Taxonomies, PageCount, PagePresent, ref PageTotal, ref RowTotal);
		}
		
		public DataTable GetDataByFilter(int Page, int Start, int Limit, string Sort, string Group, string Filter, ref int TotalRows)
        {
            return this._DalObject.GetDataByFilter(Page, Start, Limit, Sort, Group, Filter, ref TotalRows);
        }
 ///<summary>
     ///Add child   
     ///</summary>
		public BaseObject NewChild(ISpecialization Child)
		{
			return NewChild(Child, null);
		}
		 ///<summary>
     ///Add child   
     ///</summary>
		public BaseObject NewChild(ISpecialization Child, ValueCollection Values)
		{
			TransactionObject TranObject = Child.GetTransactionObject();
			if(this._DalObject.Id == 0)
				throw new InvalidObjectException(this.GetObject(), "The m_st_cabecera is null.");

			if(BeforeNewChild != null)
				BeforeNewChild(this, new SimpleEventArgs(Child.GetSimpleObject()));

			RelationCollection Relations = new RelationCollection(this.Security.SqlConfig);

			try
			{
				TranObject.BeginTran();
				Relations.BeginTran();
				
				TranObject.Save();				
				
				if(Values == null)			
					Relations.CreateRelation(TranObject);
				else
					Relations.CreateRelation(TranObject, Values);
							
				Relations.Save(this._DalObject);
				
				TranObject.CommitTran();
				Relations.CommitTran();		
				
				if(AfterNewChild != null)
					AfterNewChild(this, new SimpleEventArgs(Child.GetSimpleObject()));									
			}
			catch(Exception ex)
			{
				TranObject.RollbackTran();
				Relations.RollbackTran();
				throw;
			}
			finally
			{
				TranObject.EndTran();
				Relations.EndTran();
			}		
			return TranObject;
		}
		 ///<summary>
     ///Add child   
     ///</summary>
		public void AddChild(ISpecialization Child)
		{
			AddChild(Child, null);
		}
		 ///<summary>
     ///Add child   
     ///</summary>
		public void AddChild(ISpecialization Child, ValueCollection Values)
		{
			TransactionObject TranObject = Child.GetTransactionObject();
			if(TranObject.Id == 0)
				throw new InvalidObjectException(TranObject, "The " + TranObject.Type.Name + " is null.");
			
			if(BeforeAddChild != null)
				BeforeAddChild(this, new SimpleEventArgs(Child.GetSimpleObject()));
			
			if(Values == null)
				this._Relations.CreateRelation(TranObject);
			else
				this._Relations.CreateRelation(TranObject, Values);
				
			if(AfterAddChild != null)
				AfterAddChild(this, new SimpleEventArgs(Child.GetSimpleObject()));				
		}
			 ///<summary>
     ///Add Parent   
     ///</summary>	
    public void NewParent(ISpecialization Parent, ValueCollection Values)
    {                 
        if(this.Id == 0)
              throw new InvalidObjectException(this.GetTransactionObject(), "The " + GetObjectType().Name + " is null.");

		if(BeforeNewParent != null)
			BeforeNewParent(this, new SimpleEventArgs(Parent.GetSimpleObject()));

        if(Values == null)
              Parent.NewChild(this);

        if(Values != null)
           Parent.NewChild(this, Values);
           
		if(AfterNewParent != null)
			AfterNewParent(this, new SimpleEventArgs(Parent.GetSimpleObject()));           
    }
	 ///<summary>
     ///Add Parent   
     ///</summary>
    public void NewParent(ISpecialization Parent)
    {                 
        NewParent(Parent, null);
    }		
 ///<summary>
     ///Remove child   
     ///</summary>
		public void RemoveChild(ISpecialization Child)
		{
			TransactionObject TranObject = Child.GetTransactionObject();
			if(TranObject.Id == 0)
				throw new InvalidObjectException(TranObject, "The " + TranObject.Type.Name + " is null.");

			if(BeforeRemoveChild != null)
				BeforeRemoveChild(this, new SimpleEventArgs(Child.GetSimpleObject()));
						
			this._Relations.RemoveRelation(TranObject);
			
			if(AfterRemoveChild != null)
				AfterRemoveChild(this, new SimpleEventArgs(Child.GetSimpleObject()));			
		}		
 ///<summary>
     ///Initialices class instance   
     ///</summary>
		private void InitClass(SqlHelper SqlConfig, int UserId)
		{			
			this._DalObject = new Dalm_st_cabecera(SqlConfig, UserId);		
			this._Taxonomies = new TaxonomyCollection(SqlConfig, UserId);
			this._Relations = new RelationCollection(SqlConfig);

			this._AutoCommit = true;
			this._DalObject.AutoCommit = false;
			this._Taxonomies.AutoCommit = false;						
			this._Relations.AutoCommit = false;		
		}
 ///<summary>
     ///Transaction   
     ///</summary>
		public void BeginTran()
		{
			this._DalObject.BeginTran();
			this._Taxonomies.BeginTran();
			this._Relations.BeginTran();			
		}
		 ///<summary>
     ///Transaction   
     ///</summary>
		public void CommitTran()
		{					
			this._DalObject.CommitTran();			
			this._Taxonomies.CommitTran();
			this._Relations.CommitTran();			
		}
		 ///<summary>
     ///Transaction   
     ///</summary>
		public void RollbackTran()
		{					    
			this._DalObject.RollbackTran();
			this._Taxonomies.RollbackTran();			
			this._Relations.RollbackTran();
		}
		 ///<summary>
     ///Transaction   
     ///</summary>
		public void EndTran()
		{			
			this._DalObject.EndTran();
			this._Taxonomies.EndTran();
			this._Relations.EndTran();
		}

		public void CopyPropertiesTo(ISpecialization Object)
        {
			var o = (SoftGuard.BusinessObjects.m_st_cabecera)Object;
			o.Name = this.Name;

			o.stc_iid_cuenta = this.stc_iid_cuenta;

			o.stc_inumero = this.stc_inumero;

			o.stc_ctipo_servicio = this.stc_ctipo_servicio;

			o.stc_mobservaciones = this.stc_mobservaciones;

			o.stc_dfecha_desde_1 = this.stc_dfecha_desde_1;

			o.stc_dfecha_hasta_1 = this.stc_dfecha_hasta_1;

			o.stc_dfecha_desde_2 = this.stc_dfecha_desde_2;

			o.stc_dfecha_hasta_2 = this.stc_dfecha_hasta_2;

			o.stc_dfecha_desde_3 = this.stc_dfecha_desde_3;

			o.stc_dfecha_hasta_3 = this.stc_dfecha_hasta_3;

			o.stc_dfecha_cierre = this.stc_dfecha_cierre;

			o.stc_ccontacto = this.stc_ccontacto;

			o.stc_nestado = this.stc_nestado;

			o.stc_ctecnico_1 = this.stc_ctecnico_1;

			o.stc_ctecnico_2 = this.stc_ctecnico_2;

			o.stc_ctecnico_3 = this.stc_ctecnico_3;

			o.stc_ctecnico_4 = this.stc_ctecnico_4;

			o.stc_ctecnico_5 = this.stc_ctecnico_5;

			o.stc_yValor = this.stc_yValor;

			o.stc_nreclamo_1 = this.stc_nreclamo_1;

			o.stc_creclamo_1 = this.stc_creclamo_1;

			o.stc_nreclamo_2 = this.stc_nreclamo_2;

			o.stc_creclamo_2 = this.stc_creclamo_2;

			o.stc_nreclamo_3 = this.stc_nreclamo_3;

			o.stc_creclamo_3 = this.stc_creclamo_3;

			o.stc_nreclamo_4 = this.stc_nreclamo_4;

			o.stc_creclamo_4 = this.stc_creclamo_4;

			o.stc_nreclamo_5 = this.stc_nreclamo_5;

			o.stc_creclamo_5 = this.stc_creclamo_5;

			o.stc_cmovil_1 = this.stc_cmovil_1;

			o.stc_cmovil_2 = this.stc_cmovil_2;

			o.stc_dfecha_modificacion = this.stc_dfecha_modificacion;

			o.stc_ioperador = this.stc_ioperador;

			o.stc_minsumos = this.stc_minsumos;

			o.stc_dintecnico_1 = this.stc_dintecnico_1;

			o.stc_doutecnico_1 = this.stc_doutecnico_1;

			o.stc_dintecnico_2 = this.stc_dintecnico_2;

			o.stc_doutecnico_2 = this.stc_doutecnico_2;

			o.stc_dintecnico_3 = this.stc_dintecnico_3;

			o.stc_doutecnico_3 = this.stc_doutecnico_3;

			o.stc_cdeposito = this.stc_cdeposito;

			o.stf_dfecha_vto_orden = this.stf_dfecha_vto_orden;

			o.stc_dsalida_al_cliente_DSS = this.stc_dsalida_al_cliente_DSS;

			o.stc_darribo_al_cliente_DSS = this.stc_darribo_al_cliente_DSS;

			o.stc_dsalida_desde_cliente_DSS = this.stc_dsalida_desde_cliente_DSS;

			o.stc_iforma_viaje_DSS = this.stc_iforma_viaje_DSS;

			o.stc_cconformidad_html  = this.stc_cconformidad_html ;

			o.stc_idorigenorden = this.stc_idorigenorden;

			o.stc_dfechapago = this.stc_dfechapago;

			o.stc_nvalorpagotecnico = this.stc_nvalorpagotecnico;

			o.stc_ncostomanodeobra = this.stc_ncostomanodeobra;

			o.stc_iPrioridad = this.stc_iPrioridad;

			o.stc_iOrganizacion = this.stc_iOrganizacion;

        }

		protected void OnAfterSelect(SimpleEventArgs Arg)
		{
			if (AfterSelect != null) AfterSelect(this, Arg);
		}
		protected void OnAfterInsert(SimpleEventArgs Arg)
		{
			if (AfterInsert != null) AfterInsert(this, Arg);
		}
		protected void OnAfterUpdate(SimpleEventArgs Arg)
		{
			if (AfterUpdate != null) AfterUpdate(this, Arg);
		}
		protected void OnAfterDelete(SimpleEventArgs Arg)
		{
			if (AfterDelete != null) AfterDelete(this, Arg);
		}
		protected void OnAfterCheck(SimpleEventArgs Arg)
		{
			if (AfterCheck != null) AfterCheck(this, Arg);
		}
 }

}
