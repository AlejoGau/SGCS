
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
    public abstract class Spem_Victimarios : ISpecialization, ICanCopyProperties
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
	protected Dalm_Victimarios _DalObject;
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
     ///vic_cApellido property   
     ///</summary>	
     public string  vic_cApellido 
		 { 
		        
                    get{ return this._DalObject.vic_cApellido; }
        						set{ this._DalObject.vic_cApellido = value; } 										
	   }
	  ///<summary>
     ///vic_cNombre property   
     ///</summary>	
     public string  vic_cNombre 
		 { 
		        
                    get{ return this._DalObject.vic_cNombre; }
        						set{ this._DalObject.vic_cNombre = value; } 										
	   }
	  ///<summary>
     ///vic_cIdentificacion property   
     ///</summary>	
     public string  vic_cIdentificacion 
		 { 
		        
                    get{ return this._DalObject.vic_cIdentificacion; }
        						set{ this._DalObject.vic_cIdentificacion = value; } 										
	   }
	  ///<summary>
     ///vic_iRestriccion property   
     ///</summary>	
     public int  vic_iRestriccion 
		 { 
		        
                    get{ return this._DalObject.vic_iRestriccion; }
        						set{ this._DalObject.vic_iRestriccion = value; } 										
	   }
	  ///<summary>
     ///vic_cCalle property   
     ///</summary>	
     public string  vic_cCalle 
		 { 
		        
                    get{ return this._DalObject.vic_cCalle; }
        						set{ this._DalObject.vic_cCalle = value; } 										
	   }
	  ///<summary>
     ///vic_cCalleNro property   
     ///</summary>	
     public string  vic_cCalleNro 
		 { 
		        
                    get{ return this._DalObject.vic_cCalleNro; }
        						set{ this._DalObject.vic_cCalleNro = value; } 										
	   }
	  ///<summary>
     ///vic_cCallePiso property   
     ///</summary>	
     public string  vic_cCallePiso 
		 { 
		        
                    get{ return this._DalObject.vic_cCallePiso; }
        						set{ this._DalObject.vic_cCallePiso = value; } 										
	   }
	  ///<summary>
     ///vic_cCalleDpto property   
     ///</summary>	
     public string  vic_cCalleDpto 
		 { 
		        
                    get{ return this._DalObject.vic_cCalleDpto; }
        						set{ this._DalObject.vic_cCalleDpto = value; } 										
	   }
	  ///<summary>
     ///vic_cCodigoPostal property   
     ///</summary>	
     public string  vic_cCodigoPostal 
		 { 
		        
                    get{ return this._DalObject.vic_cCodigoPostal; }
        						set{ this._DalObject.vic_cCodigoPostal = value; } 										
	   }
	  ///<summary>
     ///vic_cPartido property   
     ///</summary>	
     public string  vic_cPartido 
		 { 
		        
                    get{ return this._DalObject.vic_cPartido; }
        						set{ this._DalObject.vic_cPartido = value; } 										
	   }
	  ///<summary>
     ///vic_cLocalidad property   
     ///</summary>	
     public string  vic_cLocalidad 
		 { 
		        
                    get{ return this._DalObject.vic_cLocalidad; }
        						set{ this._DalObject.vic_cLocalidad = value; } 										
	   }
	  ///<summary>
     ///vic_cUbicacion property   
     ///</summary>	
     public string  vic_cUbicacion 
		 { 
		        
                    get{ return this._DalObject.vic_cUbicacion; }
        						set{ this._DalObject.vic_cUbicacion = value; } 										
	   }
	  ///<summary>
     ///vic_cPathPicture property   
     ///</summary>	
     public string  vic_cPathPicture 
		 { 
		        
                    get{ return this._DalObject.vic_cPathPicture; }
        						set{ this._DalObject.vic_cPathPicture = value; } 										
	   }
	  ///<summary>
     ///vic_iStatus property   
     ///</summary>	
     public int  vic_iStatus 
		 { 
		        
                    get{ return this._DalObject.vic_iStatus; }
        						set{ this._DalObject.vic_iStatus = value; } 										
	   }
	  ///<summary>
     ///vic_tFechaAlta property   
     ///</summary>	
     public DateTime?  vic_tFechaAlta 
		 { 
		        
                    get{ return this._DalObject.vic_tFechaAlta; }
        						set{ this._DalObject.vic_tFechaAlta = value; } 										
	   }
	  ///<summary>
     ///vic_iEdad property   
     ///</summary>	
     public int  vic_iEdad 
		 { 
		        
                    get{ return this._DalObject.vic_iEdad; }
        						set{ this._DalObject.vic_iEdad = value; } 										
	   }
	  ///<summary>
     ///vic_iAltura property   
     ///</summary>	
     public int  vic_iAltura 
		 { 
		        
                    get{ return this._DalObject.vic_iAltura; }
        						set{ this._DalObject.vic_iAltura = value; } 										
	   }
	  ///<summary>
     ///vic_iAspectoRaza property   
     ///</summary>	
     public int  vic_iAspectoRaza 
		 { 
		        
                    get{ return this._DalObject.vic_iAspectoRaza; }
        						set{ this._DalObject.vic_iAspectoRaza = value; } 										
	   }
	  ///<summary>
     ///vic_iAspectoTez property   
     ///</summary>	
     public int  vic_iAspectoTez 
		 { 
		        
                    get{ return this._DalObject.vic_iAspectoTez; }
        						set{ this._DalObject.vic_iAspectoTez = value; } 										
	   }
	  ///<summary>
     ///vic_iAspectoContextura property   
     ///</summary>	
     public int  vic_iAspectoContextura 
		 { 
		        
                    get{ return this._DalObject.vic_iAspectoContextura; }
        						set{ this._DalObject.vic_iAspectoContextura = value; } 										
	   }
	  ///<summary>
     ///vic_iCabelloTipo property   
     ///</summary>	
     public int  vic_iCabelloTipo 
		 { 
		        
                    get{ return this._DalObject.vic_iCabelloTipo; }
        						set{ this._DalObject.vic_iCabelloTipo = value; } 										
	   }
	  ///<summary>
     ///vic_iCabelloColor property   
     ///</summary>	
     public int  vic_iCabelloColor 
		 { 
		        
                    get{ return this._DalObject.vic_iCabelloColor; }
        						set{ this._DalObject.vic_iCabelloColor = value; } 										
	   }
	  ///<summary>
     ///vic_iCabelloEstilo property   
     ///</summary>	
     public int  vic_iCabelloEstilo 
		 { 
		        
                    get{ return this._DalObject.vic_iCabelloEstilo; }
        						set{ this._DalObject.vic_iCabelloEstilo = value; } 										
	   }
	  ///<summary>
     ///vic_iRostroForma property   
     ///</summary>	
     public int  vic_iRostroForma 
		 { 
		        
                    get{ return this._DalObject.vic_iRostroForma; }
        						set{ this._DalObject.vic_iRostroForma = value; } 										
	   }
	  ///<summary>
     ///vic_iOjosForma property   
     ///</summary>	
     public int  vic_iOjosForma 
		 { 
		        
                    get{ return this._DalObject.vic_iOjosForma; }
        						set{ this._DalObject.vic_iOjosForma = value; } 										
	   }
	  ///<summary>
     ///vic_iOjosColor property   
     ///</summary>	
     public int  vic_iOjosColor 
		 { 
		        
                    get{ return this._DalObject.vic_iOjosColor; }
        						set{ this._DalObject.vic_iOjosColor = value; } 										
	   }
	  ///<summary>
     ///vic_iNarizFrente property   
     ///</summary>	
     public int  vic_iNarizFrente 
		 { 
		        
                    get{ return this._DalObject.vic_iNarizFrente; }
        						set{ this._DalObject.vic_iNarizFrente = value; } 										
	   }
	  ///<summary>
     ///vic_iNarizPerfil property   
     ///</summary>	
     public int  vic_iNarizPerfil 
		 { 
		        
                    get{ return this._DalObject.vic_iNarizPerfil; }
        						set{ this._DalObject.vic_iNarizPerfil = value; } 										
	   }
	  ///<summary>
     ///vic_iNarizSize property   
     ///</summary>	
     public int  vic_iNarizSize 
		 { 
		        
                    get{ return this._DalObject.vic_iNarizSize; }
        						set{ this._DalObject.vic_iNarizSize = value; } 										
	   }
	  ///<summary>
     ///vic_iBocaLabios property   
     ///</summary>	
     public int  vic_iBocaLabios 
		 { 
		        
                    get{ return this._DalObject.vic_iBocaLabios; }
        						set{ this._DalObject.vic_iBocaLabios = value; } 										
	   }
	  ///<summary>
     ///vic_iBocaSize property   
     ///</summary>	
     public int  vic_iBocaSize 
		 { 
		        
                    get{ return this._DalObject.vic_iBocaSize; }
        						set{ this._DalObject.vic_iBocaSize = value; } 										
	   }
	  ///<summary>
     ///vic_iMentonForma property   
     ///</summary>	
     public int  vic_iMentonForma 
		 { 
		        
                    get{ return this._DalObject.vic_iMentonForma; }
        						set{ this._DalObject.vic_iMentonForma = value; } 										
	   }
	  ///<summary>
     ///vic_iOrejasForma property   
     ///</summary>	
     public int  vic_iOrejasForma 
		 { 
		        
                    get{ return this._DalObject.vic_iOrejasForma; }
        						set{ this._DalObject.vic_iOrejasForma = value; } 										
	   }
	  ///<summary>
     ///vic_iOrejasSize property   
     ///</summary>	
     public int  vic_iOrejasSize 
		 { 
		        
                    get{ return this._DalObject.vic_iOrejasSize; }
        						set{ this._DalObject.vic_iOrejasSize = value; } 										
	   }
	  ///<summary>
     ///vic_iCejasForma property   
     ///</summary>	
     public int  vic_iCejasForma 
		 { 
		        
                    get{ return this._DalObject.vic_iCejasForma; }
        						set{ this._DalObject.vic_iCejasForma = value; } 										
	   }
	  ///<summary>
     ///vic_iCejasSize property   
     ///</summary>	
     public int  vic_iCejasSize 
		 { 
		        
                    get{ return this._DalObject.vic_iCejasSize; }
        						set{ this._DalObject.vic_iCejasSize = value; } 										
	   }
	  ///<summary>
     ///vic_iPilosidadTipo property   
     ///</summary>	
     public int  vic_iPilosidadTipo 
		 { 
		        
                    get{ return this._DalObject.vic_iPilosidadTipo; }
        						set{ this._DalObject.vic_iPilosidadTipo = value; } 										
	   }
	  ///<summary>
     ///vic_iPilosidadForma property   
     ///</summary>	
     public int  vic_iPilosidadForma 
		 { 
		        
                    get{ return this._DalObject.vic_iPilosidadForma; }
        						set{ this._DalObject.vic_iPilosidadForma = value; } 										
	   }
	  ///<summary>
     ///vic_cObservaciones property   
     ///</summary>	
     public string  vic_cObservaciones 
		 { 
		        
                    get{ return this._DalObject.vic_cObservaciones; }
        						set{ this._DalObject.vic_cObservaciones = value; } 										
	   }
	  ///<summary>
     ///vic_cCaractSocial property   
     ///</summary>	
     public string  vic_cCaractSocial 
		 { 
		        
                    get{ return this._DalObject.vic_cCaractSocial; }
        						set{ this._DalObject.vic_cCaractSocial = value; } 										
	   }
	  ///<summary>
     ///vic_cAdicciones property   
     ///</summary>	
     public string  vic_cAdicciones 
		 { 
		        
                    get{ return this._DalObject.vic_cAdicciones; }
        						set{ this._DalObject.vic_cAdicciones = value; } 										
	   }
	  ///<summary>
     ///vic_iPeso property   
     ///</summary>	
     public int  vic_iPeso 
		 { 
		        
                    get{ return this._DalObject.vic_iPeso; }
        						set{ this._DalObject.vic_iPeso = value; } 										
	   }
	  ///<summary>
     ///Constructor   
     ///</summary>
    		public Spem_Victimarios(SqlHelper SqlConfig, int UserId)
    		{
    			InitClass(SqlConfig, UserId);    			
				this._Taxonomies.Load(this.Security.UserId);
    		}	
 ///<summary>
     ///Constructor   
     ///</summary>			
    		public Spem_Victimarios(SqlHelper SqlConfig, int UserId, int Id)
    		{
    			InitClass(SqlConfig, UserId);        			
			    Load(Id);						
    		}	
 ///<summary>
     ///Constructor   
     ///</summary>			
    		public Spem_Victimarios(SqlHelper SqlConfig, int UserId, Simplem_Victimarios Simple)
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
		public virtual void Load(Simplem_Victimarios Simple)
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
			   throw new RuntimeException("The m_Victimarios has dependencies.");
			
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
		public Dalm_Victimarios GetDalObject()
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
		
		public IEnumerable<Simplem_Victimarios> GetByParent(string ObjectType, int ObjectId)
		{
			return this._DalObject.GetByParent(ObjectType, ObjectId);
		}
		public IEnumerable<Simplem_Victimarios> GetByChild(string ObjectType, int ObjectId)
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
				throw new InvalidObjectException(this.GetObject(), "The m_Victimarios is null.");

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
			this._DalObject = new Dalm_Victimarios(SqlConfig, UserId);		
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
			var o = (SoftGuard.BusinessObjects.m_Victimarios)Object;
			o.Name = this.Name;

			o.vic_cApellido = this.vic_cApellido;

			o.vic_cNombre = this.vic_cNombre;

			o.vic_cIdentificacion = this.vic_cIdentificacion;

			o.vic_iRestriccion = this.vic_iRestriccion;

			o.vic_cCalle = this.vic_cCalle;

			o.vic_cCalleNro = this.vic_cCalleNro;

			o.vic_cCallePiso = this.vic_cCallePiso;

			o.vic_cCalleDpto = this.vic_cCalleDpto;

			o.vic_cCodigoPostal = this.vic_cCodigoPostal;

			o.vic_cPartido = this.vic_cPartido;

			o.vic_cLocalidad = this.vic_cLocalidad;

			o.vic_cUbicacion = this.vic_cUbicacion;

			o.vic_cPathPicture = this.vic_cPathPicture;

			o.vic_iStatus = this.vic_iStatus;

			o.vic_tFechaAlta = this.vic_tFechaAlta;

			o.vic_iEdad = this.vic_iEdad;

			o.vic_iAltura = this.vic_iAltura;

			o.vic_iAspectoRaza = this.vic_iAspectoRaza;

			o.vic_iAspectoTez = this.vic_iAspectoTez;

			o.vic_iAspectoContextura = this.vic_iAspectoContextura;

			o.vic_iCabelloTipo = this.vic_iCabelloTipo;

			o.vic_iCabelloColor = this.vic_iCabelloColor;

			o.vic_iCabelloEstilo = this.vic_iCabelloEstilo;

			o.vic_iRostroForma = this.vic_iRostroForma;

			o.vic_iOjosForma = this.vic_iOjosForma;

			o.vic_iOjosColor = this.vic_iOjosColor;

			o.vic_iNarizFrente = this.vic_iNarizFrente;

			o.vic_iNarizPerfil = this.vic_iNarizPerfil;

			o.vic_iNarizSize = this.vic_iNarizSize;

			o.vic_iBocaLabios = this.vic_iBocaLabios;

			o.vic_iBocaSize = this.vic_iBocaSize;

			o.vic_iMentonForma = this.vic_iMentonForma;

			o.vic_iOrejasForma = this.vic_iOrejasForma;

			o.vic_iOrejasSize = this.vic_iOrejasSize;

			o.vic_iCejasForma = this.vic_iCejasForma;

			o.vic_iCejasSize = this.vic_iCejasSize;

			o.vic_iPilosidadTipo = this.vic_iPilosidadTipo;

			o.vic_iPilosidadForma = this.vic_iPilosidadForma;

			o.vic_cObservaciones = this.vic_cObservaciones;

			o.vic_cCaractSocial = this.vic_cCaractSocial;

			o.vic_cAdicciones = this.vic_cAdicciones;

			o.vic_iPeso = this.vic_iPeso;

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
