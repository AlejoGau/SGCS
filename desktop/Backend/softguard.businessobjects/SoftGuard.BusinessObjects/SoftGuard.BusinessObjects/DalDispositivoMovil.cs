
    using System;
    using System.Xml;
    using System.Collections.Generic;
    using System.Data;
    using System.Data.SqlClient;
    using Slbf;
    using Slbf.Helpers;
  
    namespace SoftGuard.BusinessObjects
    {
     ///<summary>
     ///DispositivoMovil data access layer   
     ///</summary>
    public class DalDispositivoMovil : TransactionObject
    { 

    string _ConnectionString = null;
    private bool _AutoCommit = false;
    
      private string _Brand;
    
      private string _Model;
    
      private int _Year;
    
      private string _Domain;
    
      private string _Colour;
    
      private string _VehicleType;
    
      private string _Photo;
    
      private string _PhotoType;
    
      private int _VehicleBrand;
    
      private int _VehicleModel;
    
      private int _OwnerTypeId;
    
      private int _OwnerId;
    
      private int _DriverTypeId;
    
      private int _DriverId;
    
      private string _SIM1;
    
      private string _CompaniaSIM1;
    
      private string _SIM2;
    
      private string _CompaniaSIM2;
    
      private string _NroMotor;
    
      private string _NroChasis;
    
      private string _PersonaDNI;
    
      private string _PersonaGenero;
    
      private DateTime? _PersonaFechaNacimiento ;
    
      private string _MascotaRaza;
    
      private DateTime? _MascotaFechaNacimiento;
    
      private string _MascotaGenero;
    
      private string _MascotaColor;
    
      private string _OtroTextolibre;
    
      private int _MaxSpeed;
    
      private int _Odometer;
    
      private DateTime? _OdometerDate;
    
      private bool _ParkingLot;
     ///<summary>
     ///Sets transaction Autocommit value   
     ///</summary>
    public override bool AutoCommit
    {
    get{ return this._AutoCommit; }
    set{ this._AutoCommit = value; }
    }
     ///<summary>
     ///Brand   
     ///</summary>
      public string Brand
      {
      
          get{ return this._Brand; }
          set{ this._Brand = value; }
        
      }
     ///<summary>
     ///Model   
     ///</summary>
      public string Model
      {
      
          get{ return this._Model; }
          set{ this._Model = value; }
        
      }
     ///<summary>
     ///Year   
     ///</summary>
      public int Year
      {
      
          get{ return this._Year; }
          set{ this._Year = value; }
        
      }
     ///<summary>
     ///Domain   
     ///</summary>
      public string Domain
      {
      
          get{ return this._Domain; }
          set{ this._Domain = value; }
        
      }
     ///<summary>
     ///Colour   
     ///</summary>
      public string Colour
      {
      
          get{ return this._Colour; }
          set{ this._Colour = value; }
        
      }
     ///<summary>
     ///VehicleType   
     ///</summary>
      public string VehicleType
      {
      
          get{ return this._VehicleType; }
          set{ this._VehicleType = value; }
        
      }
     ///<summary>
     ///Photo   
     ///</summary>
      public string Photo
      {
      
          get{ return this._Photo; }
          set{ this._Photo = value; }
        
      }
     ///<summary>
     ///PhotoType   
     ///</summary>
      public string PhotoType
      {
      
          get{ return this._PhotoType; }
          set{ this._PhotoType = value; }
        
      }
     ///<summary>
     ///VehicleBrand   
     ///</summary>
      public int VehicleBrand
      {
      
          get{ return this._VehicleBrand; }
          set{ this._VehicleBrand = value; }
        
      }
     ///<summary>
     ///VehicleModel   
     ///</summary>
      public int VehicleModel
      {
      
          get{ return this._VehicleModel; }
          set{ this._VehicleModel = value; }
        
      }
     ///<summary>
     ///OwnerTypeId   
     ///</summary>
      public int OwnerTypeId
      {
      
          get{ return this._OwnerTypeId; }
          set{ this._OwnerTypeId = value; }
        
      }
     ///<summary>
     ///OwnerId   
     ///</summary>
      public int OwnerId
      {
      
          get{ return this._OwnerId; }
          set{ this._OwnerId = value; }
        
      }
     ///<summary>
     ///DriverTypeId   
     ///</summary>
      public int DriverTypeId
      {
      
          get{ return this._DriverTypeId; }
          set{ this._DriverTypeId = value; }
        
      }
     ///<summary>
     ///DriverId   
     ///</summary>
      public int DriverId
      {
      
          get{ return this._DriverId; }
          set{ this._DriverId = value; }
        
      }
     ///<summary>
     ///SIM1   
     ///</summary>
      public string SIM1
      {
      
          get{ return this._SIM1; }
          set{ this._SIM1 = value; }
        
      }
     ///<summary>
     ///CompaniaSIM1   
     ///</summary>
      public string CompaniaSIM1
      {
      
          get{ return this._CompaniaSIM1; }
          set{ this._CompaniaSIM1 = value; }
        
      }
     ///<summary>
     ///SIM2   
     ///</summary>
      public string SIM2
      {
      
          get{ return this._SIM2; }
          set{ this._SIM2 = value; }
        
      }
     ///<summary>
     ///CompaniaSIM2   
     ///</summary>
      public string CompaniaSIM2
      {
      
          get{ return this._CompaniaSIM2; }
          set{ this._CompaniaSIM2 = value; }
        
      }
     ///<summary>
     ///NroMotor   
     ///</summary>
      public string NroMotor
      {
      
          get{ return this._NroMotor; }
          set{ this._NroMotor = value; }
        
      }
     ///<summary>
     ///NroChasis   
     ///</summary>
      public string NroChasis
      {
      
          get{ return this._NroChasis; }
          set{ this._NroChasis = value; }
        
      }
     ///<summary>
     ///PersonaDNI   
     ///</summary>
      public string PersonaDNI
      {
      
          get{ return this._PersonaDNI; }
          set{ this._PersonaDNI = value; }
        
      }
     ///<summary>
     ///PersonaGenero   
     ///</summary>
      public string PersonaGenero
      {
      
          get{ return this._PersonaGenero; }
          set{ this._PersonaGenero = value; }
        
      }
     ///<summary>
     ///PersonaFechaNacimiento    
     ///</summary>
      public DateTime? PersonaFechaNacimiento 
      {
      
          get{ return this._PersonaFechaNacimiento ; }
          set{ this._PersonaFechaNacimiento  = value; }
        
      }
     ///<summary>
     ///MascotaRaza   
     ///</summary>
      public string MascotaRaza
      {
      
          get{ return this._MascotaRaza; }
          set{ this._MascotaRaza = value; }
        
      }
     ///<summary>
     ///MascotaFechaNacimiento   
     ///</summary>
      public DateTime? MascotaFechaNacimiento
      {
      
          get{ return this._MascotaFechaNacimiento; }
          set{ this._MascotaFechaNacimiento = value; }
        
      }
     ///<summary>
     ///MascotaGenero   
     ///</summary>
      public string MascotaGenero
      {
      
          get{ return this._MascotaGenero; }
          set{ this._MascotaGenero = value; }
        
      }
     ///<summary>
     ///MascotaColor   
     ///</summary>
      public string MascotaColor
      {
      
          get{ return this._MascotaColor; }
          set{ this._MascotaColor = value; }
        
      }
     ///<summary>
     ///OtroTextolibre   
     ///</summary>
      public string OtroTextolibre
      {
      
          get{ return this._OtroTextolibre; }
          set{ this._OtroTextolibre = value; }
        
      }
     ///<summary>
     ///MaxSpeed   
     ///</summary>
      public int MaxSpeed
      {
      
          get{ return this._MaxSpeed; }
          set{ this._MaxSpeed = value; }
        
      }
     ///<summary>
     ///Odometer   
     ///</summary>
      public int Odometer
      {
      
          get{ return this._Odometer; }
          set{ this._Odometer = value; }
        
      }
     ///<summary>
     ///OdometerDate   
     ///</summary>
      public DateTime? OdometerDate
      {
      
          get{ return this._OdometerDate; }
          set{ this._OdometerDate = value; }
        
      }
     ///<summary>
     ///ParkingLot   
     ///</summary>
      public bool ParkingLot
      {
      
          get{ return this._ParkingLot; }
          set{ this._ParkingLot = value; }
        
      }
     ///<summary>
     ///Constructor   
     ///</summary>
    public DalDispositivoMovil(SqlHelper SqlConfig, int UserId) : base(SqlConfig, UserId)
    {
    InitClass();
    SetConfig(SqlConfig);
    }

     ///<summary>
     ///Constructor   
     ///</summary>
    public DalDispositivoMovil(SqlHelper SqlConfig, int UserId, int Id) : base(SqlConfig, UserId)
    {
    InitClass();
    SetConfig(SqlConfig);
    Load(Id);
    }

     ///<summary>
     ///Constructor   
     ///</summary>
    public DalDispositivoMovil(SqlHelper SqlConfig, int UserId, SimpleDispositivoMovil Simple) : base(SqlConfig, UserId)
    {
    InitClass();
    SetConfig(SqlConfig);
    base.Id = Simple.Id;
    base.Name = Simple.Name;
    
      this._Brand = Simple.Brand;

      this._Model = Simple.Model;

      this._Year = Simple.Year;

      this._Domain = Simple.Domain;

      this._Colour = Simple.Colour;

      this._VehicleType = Simple.VehicleType;

      this._Photo = Simple.Photo;

      this._PhotoType = Simple.PhotoType;

      this._VehicleBrand = Simple.VehicleBrand;

      this._VehicleModel = Simple.VehicleModel;

      this._OwnerTypeId = Simple.OwnerTypeId;

      this._OwnerId = Simple.OwnerId;

      this._DriverTypeId = Simple.DriverTypeId;

      this._DriverId = Simple.DriverId;

      this._SIM1 = Simple.SIM1;

      this._CompaniaSIM1 = Simple.CompaniaSIM1;

      this._SIM2 = Simple.SIM2;

      this._CompaniaSIM2 = Simple.CompaniaSIM2;

      this._NroMotor = Simple.NroMotor;

      this._NroChasis = Simple.NroChasis;

      this._PersonaDNI = Simple.PersonaDNI;

      this._PersonaGenero = Simple.PersonaGenero;

      this._PersonaFechaNacimiento  = Simple.PersonaFechaNacimiento ;

      this._MascotaRaza = Simple.MascotaRaza;

      this._MascotaFechaNacimiento = Simple.MascotaFechaNacimiento;

      this._MascotaGenero = Simple.MascotaGenero;

      this._MascotaColor = Simple.MascotaColor;

      this._OtroTextolibre = Simple.OtroTextolibre;

      this._MaxSpeed = Simple.MaxSpeed;

      this._Odometer = Simple.Odometer;

      this._OdometerDate = Simple.OdometerDate;

      this._ParkingLot = Simple.ParkingLot;

    }

   ///<summary>
     ///Transaction   
     ///</summary>
    public override void BeginTran()
    {
    }
     ///<summary>
     ///Transaction   
     ///</summary>
    public override void CommitTran()
    {
    }
     ///<summary>
     ///Transaction   
     ///</summary>
    public override void RollbackTran()
    {
    }
     ///<summary>
     ///Transaction   
     ///</summary>
    public override void EndTran()
    {

    }
     ///<summary>
     ///Saves object data   
     ///</summary>
    public override void Save()
    {
    base.Save();

    BeginTran();
    try{
    if(base.Id == 0)
    {
    //new
    using(var conn = new SqlConnection(_ConnectionString))
    using(var cmd = new SqlCommand("DispositivoMovilIns", conn))
    {
    // Insert
    cmd.CommandType = CommandType.StoredProcedure;
    cmd.Parameters.Add(new SqlParameter("@Name", SqlDbType.NVarChar));
    cmd.Parameters.Add(new SqlParameter("@Brand", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@Model", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@Year", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@Domain", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@Colour", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@VehicleType", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@Photo", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@PhotoType", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@VehicleBrand", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@VehicleModel", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@OwnerTypeId", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@OwnerId", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@DriverTypeId", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@DriverId", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@SIM1", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@CompaniaSIM1", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@SIM2", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@CompaniaSIM2", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@NroMotor", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@NroChasis", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@PersonaDNI", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@PersonaGenero", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@PersonaFechaNacimiento ", SqlDbType.DateTime));cmd.Parameters.Add(new SqlParameter("@MascotaRaza", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@MascotaFechaNacimiento", SqlDbType.DateTime));cmd.Parameters.Add(new SqlParameter("@MascotaGenero", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@MascotaColor", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@OtroTextolibre", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@MaxSpeed", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@Odometer", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@OdometerDate", SqlDbType.DateTime));cmd.Parameters.Add(new SqlParameter("@ParkingLot", SqlDbType.Bit));

    cmd.Parameters["@Name"].Value = base.Name;

		cmd.Parameters["@Brand"].Value = (this._Brand == null) ? (object) DBNull.Value : (object) this._Brand;

		cmd.Parameters["@Model"].Value = (this._Model == null) ? (object) DBNull.Value : (object) this._Model;

		cmd.Parameters["@Year"].Value = this._Year;

		cmd.Parameters["@Domain"].Value = (this._Domain == null) ? (object) DBNull.Value : (object) this._Domain;

		cmd.Parameters["@Colour"].Value = (this._Colour == null) ? (object) DBNull.Value : (object) this._Colour;

		cmd.Parameters["@VehicleType"].Value = (this._VehicleType == null) ? (object) DBNull.Value : (object) this._VehicleType;

		cmd.Parameters["@Photo"].Value = (this._Photo == null) ? (object) DBNull.Value : (object) this._Photo;

		cmd.Parameters["@PhotoType"].Value = (this._PhotoType == null) ? (object) DBNull.Value : (object) this._PhotoType;

		cmd.Parameters["@VehicleBrand"].Value = this._VehicleBrand;

		cmd.Parameters["@VehicleModel"].Value = this._VehicleModel;

		cmd.Parameters["@OwnerTypeId"].Value = this._OwnerTypeId;

		cmd.Parameters["@OwnerId"].Value = this._OwnerId;

		cmd.Parameters["@DriverTypeId"].Value = this._DriverTypeId;

		cmd.Parameters["@DriverId"].Value = this._DriverId;

		cmd.Parameters["@SIM1"].Value = (this._SIM1 == null) ? (object) DBNull.Value : (object) this._SIM1;

		cmd.Parameters["@CompaniaSIM1"].Value = (this._CompaniaSIM1 == null) ? (object) DBNull.Value : (object) this._CompaniaSIM1;

		cmd.Parameters["@SIM2"].Value = (this._SIM2 == null) ? (object) DBNull.Value : (object) this._SIM2;

		cmd.Parameters["@CompaniaSIM2"].Value = (this._CompaniaSIM2 == null) ? (object) DBNull.Value : (object) this._CompaniaSIM2;

		cmd.Parameters["@NroMotor"].Value = (this._NroMotor == null) ? (object) DBNull.Value : (object) this._NroMotor;

		cmd.Parameters["@NroChasis"].Value = (this._NroChasis == null) ? (object) DBNull.Value : (object) this._NroChasis;

		cmd.Parameters["@PersonaDNI"].Value = (this._PersonaDNI == null) ? (object) DBNull.Value : (object) this._PersonaDNI;

		cmd.Parameters["@PersonaGenero"].Value = (this._PersonaGenero == null) ? (object) DBNull.Value : (object) this._PersonaGenero;

		cmd.Parameters["@PersonaFechaNacimiento "].Value = (this._PersonaFechaNacimiento  == new DateTime(1,1,1)) ? (object) DBNull.Value : (object) this._PersonaFechaNacimiento ;

		cmd.Parameters["@MascotaRaza"].Value = (this._MascotaRaza == null) ? (object) DBNull.Value : (object) this._MascotaRaza;

		cmd.Parameters["@MascotaFechaNacimiento"].Value = (this._MascotaFechaNacimiento == new DateTime(1,1,1)) ? (object) DBNull.Value : (object) this._MascotaFechaNacimiento;

		cmd.Parameters["@MascotaGenero"].Value = (this._MascotaGenero == null) ? (object) DBNull.Value : (object) this._MascotaGenero;

		cmd.Parameters["@MascotaColor"].Value = (this._MascotaColor == null) ? (object) DBNull.Value : (object) this._MascotaColor;

		cmd.Parameters["@OtroTextolibre"].Value = (this._OtroTextolibre == null) ? (object) DBNull.Value : (object) this._OtroTextolibre;

		cmd.Parameters["@MaxSpeed"].Value = this._MaxSpeed;

		cmd.Parameters["@Odometer"].Value = this._Odometer;

		cmd.Parameters["@OdometerDate"].Value = (this._OdometerDate == new DateTime(1,1,1)) ? (object) DBNull.Value : (object) this._OdometerDate;

		cmd.Parameters["@ParkingLot"].Value = this._ParkingLot;

    conn.Open();
    FillObject(cmd.ExecuteReader());
    }
    }
    else
    {
    //update

    // Update
    using(var conn = new SqlConnection(_ConnectionString))
    using(var cmd = new SqlCommand("DispositivoMovilUpd", conn))
    {
    cmd.CommandType = CommandType.StoredProcedure;
    cmd.Parameters.Add(new SqlParameter("@Id", SqlDbType.Int));
    cmd.Parameters.Add(new SqlParameter("@Name", SqlDbType.NVarChar));
    cmd.Parameters.Add(new SqlParameter("@Brand", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@Model", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@Year", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@Domain", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@Colour", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@VehicleType", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@Photo", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@PhotoType", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@VehicleBrand", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@VehicleModel", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@OwnerTypeId", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@OwnerId", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@DriverTypeId", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@DriverId", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@SIM1", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@CompaniaSIM1", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@SIM2", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@CompaniaSIM2", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@NroMotor", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@NroChasis", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@PersonaDNI", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@PersonaGenero", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@PersonaFechaNacimiento ", SqlDbType.DateTime));cmd.Parameters.Add(new SqlParameter("@MascotaRaza", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@MascotaFechaNacimiento", SqlDbType.DateTime));cmd.Parameters.Add(new SqlParameter("@MascotaGenero", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@MascotaColor", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@OtroTextolibre", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@MaxSpeed", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@Odometer", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@OdometerDate", SqlDbType.DateTime));cmd.Parameters.Add(new SqlParameter("@ParkingLot", SqlDbType.Bit));

    cmd.Parameters["@Id"].Value = base.Id;

    cmd.Parameters["@Name"].Value = base.Name;

		cmd.Parameters["@Brand"].Value = (this._Brand == null) ? (object) DBNull.Value : (object) this._Brand;

		cmd.Parameters["@Model"].Value = (this._Model == null) ? (object) DBNull.Value : (object) this._Model;

		cmd.Parameters["@Year"].Value = this._Year;

		cmd.Parameters["@Domain"].Value = (this._Domain == null) ? (object) DBNull.Value : (object) this._Domain;

		cmd.Parameters["@Colour"].Value = (this._Colour == null) ? (object) DBNull.Value : (object) this._Colour;

		cmd.Parameters["@VehicleType"].Value = (this._VehicleType == null) ? (object) DBNull.Value : (object) this._VehicleType;

		cmd.Parameters["@Photo"].Value = (this._Photo == null) ? (object) DBNull.Value : (object) this._Photo;

		cmd.Parameters["@PhotoType"].Value = (this._PhotoType == null) ? (object) DBNull.Value : (object) this._PhotoType;

		cmd.Parameters["@VehicleBrand"].Value = this._VehicleBrand;

		cmd.Parameters["@VehicleModel"].Value = this._VehicleModel;

		cmd.Parameters["@OwnerTypeId"].Value = this._OwnerTypeId;

		cmd.Parameters["@OwnerId"].Value = this._OwnerId;

		cmd.Parameters["@DriverTypeId"].Value = this._DriverTypeId;

		cmd.Parameters["@DriverId"].Value = this._DriverId;

		cmd.Parameters["@SIM1"].Value = (this._SIM1 == null) ? (object) DBNull.Value : (object) this._SIM1;

		cmd.Parameters["@CompaniaSIM1"].Value = (this._CompaniaSIM1 == null) ? (object) DBNull.Value : (object) this._CompaniaSIM1;

		cmd.Parameters["@SIM2"].Value = (this._SIM2 == null) ? (object) DBNull.Value : (object) this._SIM2;

		cmd.Parameters["@CompaniaSIM2"].Value = (this._CompaniaSIM2 == null) ? (object) DBNull.Value : (object) this._CompaniaSIM2;

		cmd.Parameters["@NroMotor"].Value = (this._NroMotor == null) ? (object) DBNull.Value : (object) this._NroMotor;

		cmd.Parameters["@NroChasis"].Value = (this._NroChasis == null) ? (object) DBNull.Value : (object) this._NroChasis;

		cmd.Parameters["@PersonaDNI"].Value = (this._PersonaDNI == null) ? (object) DBNull.Value : (object) this._PersonaDNI;

		cmd.Parameters["@PersonaGenero"].Value = (this._PersonaGenero == null) ? (object) DBNull.Value : (object) this._PersonaGenero;

		cmd.Parameters["@PersonaFechaNacimiento "].Value = (this._PersonaFechaNacimiento  == new DateTime(1,1,1)) ? (object) DBNull.Value : (object) this._PersonaFechaNacimiento ;

		cmd.Parameters["@MascotaRaza"].Value = (this._MascotaRaza == null) ? (object) DBNull.Value : (object) this._MascotaRaza;

		cmd.Parameters["@MascotaFechaNacimiento"].Value = (this._MascotaFechaNacimiento == new DateTime(1,1,1)) ? (object) DBNull.Value : (object) this._MascotaFechaNacimiento;

		cmd.Parameters["@MascotaGenero"].Value = (this._MascotaGenero == null) ? (object) DBNull.Value : (object) this._MascotaGenero;

		cmd.Parameters["@MascotaColor"].Value = (this._MascotaColor == null) ? (object) DBNull.Value : (object) this._MascotaColor;

		cmd.Parameters["@OtroTextolibre"].Value = (this._OtroTextolibre == null) ? (object) DBNull.Value : (object) this._OtroTextolibre;

		cmd.Parameters["@MaxSpeed"].Value = this._MaxSpeed;

		cmd.Parameters["@Odometer"].Value = this._Odometer;

		cmd.Parameters["@OdometerDate"].Value = (this._OdometerDate == new DateTime(1,1,1)) ? (object) DBNull.Value : (object) this._OdometerDate;

		cmd.Parameters["@ParkingLot"].Value = this._ParkingLot;

    conn.Open();
    FillObject(cmd.ExecuteReader());
    }
    }
    }
    finally{
    EndTran();
    }
    }
   ///<summary>
     ///Deletes object   
     ///</summary>
    public override void Delete()
    {
    base.Delete();
    if(base.Id == 0)
    {
    throw new RuntimeException("The DispositivoMovil is null");
    }
    else
    {
    //delete
    try
    {

    BeginTran();

    // Delete
    using(var conn = new SqlConnection(_ConnectionString))
    using(var CmdDel = new SqlCommand("DispositivoMovilDel", conn))
    {
    CmdDel.CommandType = CommandType.StoredProcedure;
    CmdDel.Parameters.Add(new SqlParameter("@Id", SqlDbType.Int));
    CmdDel.Parameters["@Id"].Value = base.Id;
    conn.Open();
    CmdDel.ExecuteNonQuery();
    }

    }
    finally
    {
    EndTran();
    }
    }
    }
   ///<summary>
     ///Load object data   
     ///</summary>
    public virtual void Load(int Id)
    {
    //base.Load();
    base.Load(Id); // esto es para la auditoria

    // Select
    using(var conn = new SqlConnection(_ConnectionString))
    using(var CmdSel = new SqlCommand("DispositivoMovilSel", conn))
    {
    CmdSel.CommandType = CommandType.StoredProcedure;
    CmdSel.Parameters.Add(new SqlParameter("@Id", SqlDbType.Int));

    conn.Open();
    CmdSel.Parameters["@Id"].Value = Id;
    FillObject(CmdSel.ExecuteReader());

    //save original object
    this.OriginalObject = this.GetSimpleObject();
    }
    }
   ///<summary>
     ///Gets baseobject   
     ///</summary>
    public override BaseObject GetObject()
    {
    return (BaseObject) this;
    }
   ///<summary>
     ///Gets SimpleBaseObject   
     ///</summary>
    public override SimpleBaseObject GetSimpleObject()
    {
    SimpleDispositivoMovil Simple = new SimpleDispositivoMovil();
    Simple.Id = base.Id;
    Simple.Name = base.Name;
    
      Simple.Brand = this._Brand;

      Simple.Model = this._Model;

      Simple.Year = this._Year;

      Simple.Domain = this._Domain;

      Simple.Colour = this._Colour;

      Simple.VehicleType = this._VehicleType;

      Simple.Photo = this._Photo;

      Simple.PhotoType = this._PhotoType;

      Simple.VehicleBrand = this._VehicleBrand;

      Simple.VehicleModel = this._VehicleModel;

      Simple.OwnerTypeId = this._OwnerTypeId;

      Simple.OwnerId = this._OwnerId;

      Simple.DriverTypeId = this._DriverTypeId;

      Simple.DriverId = this._DriverId;

      Simple.SIM1 = this._SIM1;

      Simple.CompaniaSIM1 = this._CompaniaSIM1;

      Simple.SIM2 = this._SIM2;

      Simple.CompaniaSIM2 = this._CompaniaSIM2;

      Simple.NroMotor = this._NroMotor;

      Simple.NroChasis = this._NroChasis;

      Simple.PersonaDNI = this._PersonaDNI;

      Simple.PersonaGenero = this._PersonaGenero;

      Simple.PersonaFechaNacimiento  = this._PersonaFechaNacimiento ;

      Simple.MascotaRaza = this._MascotaRaza;

      Simple.MascotaFechaNacimiento = this._MascotaFechaNacimiento;

      Simple.MascotaGenero = this._MascotaGenero;

      Simple.MascotaColor = this._MascotaColor;

      Simple.OtroTextolibre = this._OtroTextolibre;

      Simple.MaxSpeed = this._MaxSpeed;

      Simple.Odometer = this._Odometer;

      Simple.OdometerDate = this._OdometerDate;

      Simple.ParkingLot = this._ParkingLot;

    if(this.CallerObject != null)
    Simple.CallerObject = this.CallerObject;
    return (SimpleBaseObject) Simple;
    }
   ///<summary>
     ///Sets SimpleBaseObject   
     ///</summary>
    public void SetSimpleObject(SimpleBaseObject BaseSimple)
    {
    var Simple = (SimpleDispositivoMovil)BaseSimple;
    base.Id = Simple.Id;
    base.Name = Simple.Name;
    
      this._Brand = Simple.Brand;

      this._Model = Simple.Model;

      this._Year = Simple.Year;

      this._Domain = Simple.Domain;

      this._Colour = Simple.Colour;

      this._VehicleType = Simple.VehicleType;

      this._Photo = Simple.Photo;

      this._PhotoType = Simple.PhotoType;

      this._VehicleBrand = Simple.VehicleBrand;

      this._VehicleModel = Simple.VehicleModel;

      this._OwnerTypeId = Simple.OwnerTypeId;

      this._OwnerId = Simple.OwnerId;

      this._DriverTypeId = Simple.DriverTypeId;

      this._DriverId = Simple.DriverId;

      this._SIM1 = Simple.SIM1;

      this._CompaniaSIM1 = Simple.CompaniaSIM1;

      this._SIM2 = Simple.SIM2;

      this._CompaniaSIM2 = Simple.CompaniaSIM2;

      this._NroMotor = Simple.NroMotor;

      this._NroChasis = Simple.NroChasis;

      this._PersonaDNI = Simple.PersonaDNI;

      this._PersonaGenero = Simple.PersonaGenero;

      this._PersonaFechaNacimiento  = Simple.PersonaFechaNacimiento ;

      this._MascotaRaza = Simple.MascotaRaza;

      this._MascotaFechaNacimiento = Simple.MascotaFechaNacimiento;

      this._MascotaGenero = Simple.MascotaGenero;

      this._MascotaColor = Simple.MascotaColor;

      this._OtroTextolibre = Simple.OtroTextolibre;

      this._MaxSpeed = Simple.MaxSpeed;

      this._Odometer = Simple.Odometer;

      this._OdometerDate = Simple.OdometerDate;

      this._ParkingLot = Simple.ParkingLot;

    if(Simple.CallerObject != null)
    this.CallerObject = Simple.CallerObject;

    //Save original Object
    this.OriginalObject = this.GetSimpleObject();
    }
   ///<summary>
     ///Gets caller object   
     ///</summary>
    public override CallerObject GetCallerObject()
    {
    CallerDispositivoMovil Caller = new CallerDispositivoMovil();
    Caller.Id = base.Id;
    Caller.Name = base.Name;
    
      Caller.Brand = this._Brand;

      Caller.Model = this._Model;

      Caller.Year = this._Year;

      Caller.Domain = this._Domain;

      Caller.Colour = this._Colour;

      Caller.VehicleType = this._VehicleType;

      Caller.Photo = this._Photo;

      Caller.PhotoType = this._PhotoType;

      Caller.VehicleBrand = this._VehicleBrand;

      Caller.VehicleModel = this._VehicleModel;

      Caller.OwnerTypeId = this._OwnerTypeId;

      Caller.OwnerId = this._OwnerId;

      Caller.DriverTypeId = this._DriverTypeId;

      Caller.DriverId = this._DriverId;

      Caller.SIM1 = this._SIM1;

      Caller.CompaniaSIM1 = this._CompaniaSIM1;

      Caller.SIM2 = this._SIM2;

      Caller.CompaniaSIM2 = this._CompaniaSIM2;

      Caller.NroMotor = this._NroMotor;

      Caller.NroChasis = this._NroChasis;

      Caller.PersonaDNI = this._PersonaDNI;

      Caller.PersonaGenero = this._PersonaGenero;

      Caller.PersonaFechaNacimiento  = this._PersonaFechaNacimiento ;

      Caller.MascotaRaza = this._MascotaRaza;

      Caller.MascotaFechaNacimiento = this._MascotaFechaNacimiento;

      Caller.MascotaGenero = this._MascotaGenero;

      Caller.MascotaColor = this._MascotaColor;

      Caller.OtroTextolibre = this._OtroTextolibre;

      Caller.MaxSpeed = this._MaxSpeed;

      Caller.Odometer = this._Odometer;

      Caller.OdometerDate = this._OdometerDate;

      Caller.ParkingLot = this._ParkingLot;

    return (CallerObject) Caller;
    }
   ///<summary>
     ///Gets a datatable with object data   
     ///</summary>
    public override DataTable GetDataObject()
    {
    //create Table
    DataTable dt = new DataTable("Data");
    DataRow dr;

    dt.Columns.Add(new DataColumn("Id", typeof(int)));
    dt.Columns.Add(new DataColumn("Name", typeof(string)));
    
      dt.Columns.Add(new DataColumn("Brand", typeof (string)));
    
      dt.Columns.Add(new DataColumn("Model", typeof (string)));
    
      dt.Columns.Add(new DataColumn("Year", typeof (int)));
    
      dt.Columns.Add(new DataColumn("Domain", typeof (string)));
    
      dt.Columns.Add(new DataColumn("Colour", typeof (string)));
    
      dt.Columns.Add(new DataColumn("VehicleType", typeof (string)));
    
      dt.Columns.Add(new DataColumn("Photo", typeof (string)));
    
      dt.Columns.Add(new DataColumn("PhotoType", typeof (string)));
    
      dt.Columns.Add(new DataColumn("VehicleBrand", typeof (int)));
    
      dt.Columns.Add(new DataColumn("VehicleModel", typeof (int)));
    
      dt.Columns.Add(new DataColumn("OwnerTypeId", typeof (int)));
    
      dt.Columns.Add(new DataColumn("OwnerId", typeof (int)));
    
      dt.Columns.Add(new DataColumn("DriverTypeId", typeof (int)));
    
      dt.Columns.Add(new DataColumn("DriverId", typeof (int)));
    
      dt.Columns.Add(new DataColumn("SIM1", typeof (string)));
    
      dt.Columns.Add(new DataColumn("CompaniaSIM1", typeof (string)));
    
      dt.Columns.Add(new DataColumn("SIM2", typeof (string)));
    
      dt.Columns.Add(new DataColumn("CompaniaSIM2", typeof (string)));
    
      dt.Columns.Add(new DataColumn("NroMotor", typeof (string)));
    
      dt.Columns.Add(new DataColumn("NroChasis", typeof (string)));
    
      dt.Columns.Add(new DataColumn("PersonaDNI", typeof (string)));
    
      dt.Columns.Add(new DataColumn("PersonaGenero", typeof (string)));
    
      dt.Columns.Add(new DataColumn("PersonaFechaNacimiento ", typeof (DateTime)));
    
      dt.Columns.Add(new DataColumn("MascotaRaza", typeof (string)));
    
      dt.Columns.Add(new DataColumn("MascotaFechaNacimiento", typeof (DateTime)));
    
      dt.Columns.Add(new DataColumn("MascotaGenero", typeof (string)));
    
      dt.Columns.Add(new DataColumn("MascotaColor", typeof (string)));
    
      dt.Columns.Add(new DataColumn("OtroTextolibre", typeof (string)));
    
      dt.Columns.Add(new DataColumn("MaxSpeed", typeof (int)));
    
      dt.Columns.Add(new DataColumn("Odometer", typeof (int)));
    
      dt.Columns.Add(new DataColumn("OdometerDate", typeof (DateTime)));
    
      dt.Columns.Add(new DataColumn("ParkingLot", typeof (bool)));
    
    //create Row
    dr = dt.NewRow();

    //set Row
    dr["Id"] = base.Id;

    dr["Name"] = base.Name;

      dr["Brand"] = this._Brand;

      dr["Model"] = this._Model;

      dr["Year"] = this._Year;

      dr["Domain"] = this._Domain;

      dr["Colour"] = this._Colour;

      dr["VehicleType"] = this._VehicleType;

      dr["Photo"] = this._Photo;

      dr["PhotoType"] = this._PhotoType;

      dr["VehicleBrand"] = this._VehicleBrand;

      dr["VehicleModel"] = this._VehicleModel;

      dr["OwnerTypeId"] = this._OwnerTypeId;

      dr["OwnerId"] = this._OwnerId;

      dr["DriverTypeId"] = this._DriverTypeId;

      dr["DriverId"] = this._DriverId;

      dr["SIM1"] = this._SIM1;

      dr["CompaniaSIM1"] = this._CompaniaSIM1;

      dr["SIM2"] = this._SIM2;

      dr["CompaniaSIM2"] = this._CompaniaSIM2;

      dr["NroMotor"] = this._NroMotor;

      dr["NroChasis"] = this._NroChasis;

      dr["PersonaDNI"] = this._PersonaDNI;

      dr["PersonaGenero"] = this._PersonaGenero;

      dr["PersonaFechaNacimiento "] = (object)this._PersonaFechaNacimiento   ?? DBNull.Value;

      dr["MascotaRaza"] = this._MascotaRaza;

      dr["MascotaFechaNacimiento"] = (object)this._MascotaFechaNacimiento  ?? DBNull.Value;

      dr["MascotaGenero"] = this._MascotaGenero;

      dr["MascotaColor"] = this._MascotaColor;

      dr["OtroTextolibre"] = this._OtroTextolibre;

      dr["MaxSpeed"] = this._MaxSpeed;

      dr["Odometer"] = this._Odometer;

      dr["OdometerDate"] = (object)this._OdometerDate  ?? DBNull.Value;

      dr["ParkingLot"] = this._ParkingLot;

    //Insert Row in Table
    dt.Rows.Add(dr);

    return dt;

    }
   ///<summary>
     ///Gets xml representation of object   
     ///</summary>
    public override XmlDataDocument GetXmlObject()
    {
    DataSet ds = new DataSet("Object");
    ds.EnforceConstraints = false;

    ds.Tables.Add(GetDataObject().Copy());
    ds.Tables.Add(this.Type.GetDataObject().Copy());

    if(this.CallerObject != null)
    ds.Tables.Add(this.CallerObject.GetDataObject().Copy());

    XmlDataDocument XmlDoc = new XmlDataDocument(ds);

    if(this.Dependencies.Count != 0)
    XmlDoc.SelectSingleNode("//Object").InnerXml += this.Dependencies.GetXmlObjects().InnerXml;

    return XmlDoc;
    }
   ///<summary>
     ///Gets children of object   
     ///</summary>
    public DataTable GetDataChildsByObject(SimpleBaseObject Object)
    {
    base.Load();
    DataTable Data = new DataTable("Childs");

    using(var conn = new SqlConnection(_ConnectionString))
    using(var CmdChilds = new SqlCommand("DispositivoMovilByChildObject", conn))
    using(var Adapter = new SqlDataAdapter(CmdChilds))
    {
    // Childs By Type
    CmdChilds.CommandType = CommandType.StoredProcedure;
    CmdChilds.Parameters.Add(new SqlParameter("@ObjectType", SqlDbType.NVarChar));
    CmdChilds.Parameters.Add(new SqlParameter("@Id", SqlDbType.Int));

    CmdChilds.Parameters["@ObjectType"].Value = Object.Type.Name;
    CmdChilds.Parameters["@Id"].Value = Object.Id;

    conn.Open();
    Adapter.Fill(Data);
    conn.Close();

    return Data;
    }
    }
     ///<summary>
     ///Gets a collection of children object   
     ///</summary>
    public SimpleBaseObjectCollection GetChildsByObject(SimpleBaseObject Object)
    {
    base.Load();
    SimpleBaseObjectCollection Collection = new SimpleBaseObjectCollection();
    SimpleDispositivoMovil Simple;

    using(var conn = new SqlConnection(_ConnectionString))
    using(var CmdChilds = new SqlCommand("DispositivoMovilByChildObject", conn))
    {
    // Childs By Type
    CmdChilds.CommandType = CommandType.StoredProcedure;
    CmdChilds.Parameters.Add(new SqlParameter("@ObjectType", SqlDbType.NVarChar));
    CmdChilds.Parameters.Add(new SqlParameter("@Id", SqlDbType.Int));
    CmdChilds.Parameters["@ObjectType"].Value = Object.Type.Name;
    CmdChilds.Parameters["@Id"].Value = Object.Id;

    conn.Open();
    using(SqlDataReader Reader = CmdChilds.ExecuteReader())
    while(Reader.Read())
    {
    Simple = new SimpleDispositivoMovil();
    Simple.Id = Reader.GetInt32(0);
    Simple.Name = Reader.GetString(1);
    if (Reader.FieldCount > 2)Simple.Brand = (Reader.IsDBNull(2)) ? "" : Reader.GetString(2);
if (Reader.FieldCount > 3)Simple.Model = (Reader.IsDBNull(3)) ? "" : Reader.GetString(3);
if (Reader.FieldCount > 4)Simple.Year = (Reader.IsDBNull(4)) ? 0 : Reader.GetInt32(4);
if (Reader.FieldCount > 5)Simple.Domain = (Reader.IsDBNull(5)) ? "" : Reader.GetString(5);
if (Reader.FieldCount > 6)Simple.Colour = (Reader.IsDBNull(6)) ? "" : Reader.GetString(6);
if (Reader.FieldCount > 7)Simple.VehicleType = (Reader.IsDBNull(7)) ? "" : Reader.GetString(7);
if (Reader.FieldCount > 8)Simple.Photo = (Reader.IsDBNull(8)) ? "" : Reader.GetString(8);
if (Reader.FieldCount > 9)Simple.PhotoType = (Reader.IsDBNull(9)) ? "" : Reader.GetString(9);
if (Reader.FieldCount > 10)Simple.VehicleBrand = (Reader.IsDBNull(10)) ? 0 : Reader.GetInt32(10);
if (Reader.FieldCount > 11)Simple.VehicleModel = (Reader.IsDBNull(11)) ? 0 : Reader.GetInt32(11);
if (Reader.FieldCount > 12)Simple.OwnerTypeId = (Reader.IsDBNull(12)) ? 0 : Reader.GetInt32(12);
if (Reader.FieldCount > 13)Simple.OwnerId = (Reader.IsDBNull(13)) ? 0 : Reader.GetInt32(13);
if (Reader.FieldCount > 14)Simple.DriverTypeId = (Reader.IsDBNull(14)) ? 0 : Reader.GetInt32(14);
if (Reader.FieldCount > 15)Simple.DriverId = (Reader.IsDBNull(15)) ? 0 : Reader.GetInt32(15);
if (Reader.FieldCount > 16)Simple.SIM1 = (Reader.IsDBNull(16)) ? "" : Reader.GetString(16);
if (Reader.FieldCount > 17)Simple.CompaniaSIM1 = (Reader.IsDBNull(17)) ? "" : Reader.GetString(17);
if (Reader.FieldCount > 18)Simple.SIM2 = (Reader.IsDBNull(18)) ? "" : Reader.GetString(18);
if (Reader.FieldCount > 19)Simple.CompaniaSIM2 = (Reader.IsDBNull(19)) ? "" : Reader.GetString(19);
if (Reader.FieldCount > 20)Simple.NroMotor = (Reader.IsDBNull(20)) ? "" : Reader.GetString(20);
if (Reader.FieldCount > 21)Simple.NroChasis = (Reader.IsDBNull(21)) ? "" : Reader.GetString(21);
if (Reader.FieldCount > 22)Simple.PersonaDNI = (Reader.IsDBNull(22)) ? "" : Reader.GetString(22);
if (Reader.FieldCount > 23)Simple.PersonaGenero = (Reader.IsDBNull(23)) ? "" : Reader.GetString(23);
if (Reader.FieldCount > 24)Simple.PersonaFechaNacimiento  = (Reader.IsDBNull(24)) ? new DateTime(1,1,1) : Reader.GetDateTime(24);
if (Reader.FieldCount > 25)Simple.MascotaRaza = (Reader.IsDBNull(25)) ? "" : Reader.GetString(25);
if (Reader.FieldCount > 26)Simple.MascotaFechaNacimiento = (Reader.IsDBNull(26)) ? new DateTime(1,1,1) : Reader.GetDateTime(26);
if (Reader.FieldCount > 27)Simple.MascotaGenero = (Reader.IsDBNull(27)) ? "" : Reader.GetString(27);
if (Reader.FieldCount > 28)Simple.MascotaColor = (Reader.IsDBNull(28)) ? "" : Reader.GetString(28);
if (Reader.FieldCount > 29)Simple.OtroTextolibre = (Reader.IsDBNull(29)) ? "" : Reader.GetString(29);
if (Reader.FieldCount > 30)Simple.MaxSpeed = (Reader.IsDBNull(30)) ? 0 : Reader.GetInt32(30);
if (Reader.FieldCount > 31)Simple.Odometer = (Reader.IsDBNull(31)) ? 0 : Reader.GetInt32(31);
if (Reader.FieldCount > 32)Simple.OdometerDate = (Reader.IsDBNull(32)) ? new DateTime(1,1,1) : Reader.GetDateTime(32);
if (Reader.FieldCount > 33)Simple.ParkingLot = (Reader.IsDBNull(33)) ? false : Reader.GetBoolean(33);


    Simple.CallerObject = Object.GetCallerObject();
    Simple.CallerObject.Relation = new RelationHelper(this.Security.SqlConfig).GetValuesWithRelation(Object, Simple);

    Collection.Add(Simple);
    }
    conn.Close();
    }

    return Collection;
    }
    public SimpleBaseObjectCollection GetChildsByObject(SimpleBaseObject Object, bool Recursive)
    {
    base.Load();
    SimpleDispositivoMovil Simple;
    SimpleBaseObjectCollection Collection = new SimpleBaseObjectCollection();
    DataTable Data = GetDataChildsByObject(Object);

    foreach(DataRow Row in Data.Rows)
    {
    Simple = new SimpleDispositivoMovil();
    Simple.Id = (int) Row["Id"];
    Simple.Name = (string) Row["Name"];
    
Simple.Brand = (Row["Brand"] == DBNull.Value) ? "" : (string) Row["Brand"];

Simple.Model = (Row["Model"] == DBNull.Value) ? "" : (string) Row["Model"];

Simple.Year = (Row["Year"] == DBNull.Value) ? 0 : (int) Row["Year"];

Simple.Domain = (Row["Domain"] == DBNull.Value) ? "" : (string) Row["Domain"];

Simple.Colour = (Row["Colour"] == DBNull.Value) ? "" : (string) Row["Colour"];

Simple.VehicleType = (Row["VehicleType"] == DBNull.Value) ? "" : (string) Row["VehicleType"];

Simple.Photo = (Row["Photo"] == DBNull.Value) ? "" : (string) Row["Photo"];

Simple.PhotoType = (Row["PhotoType"] == DBNull.Value) ? "" : (string) Row["PhotoType"];

Simple.VehicleBrand = (Row["VehicleBrand"] == DBNull.Value) ? 0 : (int) Row["VehicleBrand"];

Simple.VehicleModel = (Row["VehicleModel"] == DBNull.Value) ? 0 : (int) Row["VehicleModel"];

Simple.OwnerTypeId = (Row["OwnerTypeId"] == DBNull.Value) ? 0 : (int) Row["OwnerTypeId"];

Simple.OwnerId = (Row["OwnerId"] == DBNull.Value) ? 0 : (int) Row["OwnerId"];

Simple.DriverTypeId = (Row["DriverTypeId"] == DBNull.Value) ? 0 : (int) Row["DriverTypeId"];

Simple.DriverId = (Row["DriverId"] == DBNull.Value) ? 0 : (int) Row["DriverId"];

Simple.SIM1 = (Row["SIM1"] == DBNull.Value) ? "" : (string) Row["SIM1"];

Simple.CompaniaSIM1 = (Row["CompaniaSIM1"] == DBNull.Value) ? "" : (string) Row["CompaniaSIM1"];

Simple.SIM2 = (Row["SIM2"] == DBNull.Value) ? "" : (string) Row["SIM2"];

Simple.CompaniaSIM2 = (Row["CompaniaSIM2"] == DBNull.Value) ? "" : (string) Row["CompaniaSIM2"];

Simple.NroMotor = (Row["NroMotor"] == DBNull.Value) ? "" : (string) Row["NroMotor"];

Simple.NroChasis = (Row["NroChasis"] == DBNull.Value) ? "" : (string) Row["NroChasis"];

Simple.PersonaDNI = (Row["PersonaDNI"] == DBNull.Value) ? "" : (string) Row["PersonaDNI"];

Simple.PersonaGenero = (Row["PersonaGenero"] == DBNull.Value) ? "" : (string) Row["PersonaGenero"];

Simple.PersonaFechaNacimiento  = (Row["PersonaFechaNacimiento "] == DBNull.Value) ? new DateTime(1,1,1) : (DateTime?) Row["PersonaFechaNacimiento "];

Simple.MascotaRaza = (Row["MascotaRaza"] == DBNull.Value) ? "" : (string) Row["MascotaRaza"];

Simple.MascotaFechaNacimiento = (Row["MascotaFechaNacimiento"] == DBNull.Value) ? new DateTime(1,1,1) : (DateTime?) Row["MascotaFechaNacimiento"];

Simple.MascotaGenero = (Row["MascotaGenero"] == DBNull.Value) ? "" : (string) Row["MascotaGenero"];

Simple.MascotaColor = (Row["MascotaColor"] == DBNull.Value) ? "" : (string) Row["MascotaColor"];

Simple.OtroTextolibre = (Row["OtroTextolibre"] == DBNull.Value) ? "" : (string) Row["OtroTextolibre"];

Simple.MaxSpeed = (Row["MaxSpeed"] == DBNull.Value) ? 0 : (int) Row["MaxSpeed"];

Simple.Odometer = (Row["Odometer"] == DBNull.Value) ? 0 : (int) Row["Odometer"];

Simple.OdometerDate = (Row["OdometerDate"] == DBNull.Value) ? new DateTime(1,1,1) : (DateTime?) Row["OdometerDate"];

Simple.ParkingLot = (Row["ParkingLot"] == DBNull.Value) ? false : (bool) Row["ParkingLot"];


    Simple.CallerObject = Object.GetCallerObject();
    Simple.CallerObject.Relation = new RelationHelper(this.Security.SqlConfig).GetValuesWithRelation(Object, Simple);

    if(Recursive)
    Simple.Dependencies = GetChildsByObject(Simple, Recursive);

    Collection.Add(Simple);
    }
    return Collection;
    }
   ///<summary>
     ///Gets all parents   
     ///</summary>
    public DataTable GetDataParentsByObject(SimpleBaseObject Object)
    {
    base.Load();
    DataTable Data = new DataTable("Parents");

    using(var conn = new SqlConnection(_ConnectionString))
    using(var CmdParents = new SqlCommand("DispositivoMovilByParentObject", conn))
    using(var Adapter = new SqlDataAdapter(CmdParents))
    {
    // Parents By Type
    CmdParents.CommandType = CommandType.StoredProcedure;
    CmdParents.Parameters.Add(new SqlParameter("@ObjectType", SqlDbType.NVarChar));
    CmdParents.Parameters.Add(new SqlParameter("@Id", SqlDbType.Int));

    CmdParents.Parameters["@ObjectType"].Value = Object.Type.Name;
    CmdParents.Parameters["@Id"].Value = Object.Id;

    conn.Open();
    Adapter.Fill(Data);
    conn.Close();

    return Data;
    }
    }
     ///<summary>
     ///Gets a collection of parents   
     ///</summary>
    public SimpleBaseObjectCollection GetParentsByObject(SimpleBaseObject Object)
    {
    base.Load();
    SimpleBaseObjectCollection Collection = new SimpleBaseObjectCollection();
    SimpleDispositivoMovil Simple;


    using(var conn = new SqlConnection(_ConnectionString))
    using(var CmdParents = new SqlCommand("DispositivoMovilByParentObject", conn))
    {
    // Parents By Type
    CmdParents.CommandType = CommandType.StoredProcedure;
    CmdParents.Parameters.Add(new SqlParameter("@ObjectType", SqlDbType.NVarChar));
    CmdParents.Parameters.Add(new SqlParameter("@Id", SqlDbType.Int));
    CmdParents.Parameters["@ObjectType"].Value = Object.Type.Name;
    CmdParents.Parameters["@Id"].Value = Object.Id;

    conn.Open();
    using(SqlDataReader Reader = CmdParents.ExecuteReader())
    while(Reader.Read())
    {
    Simple = new SimpleDispositivoMovil();
    Simple.Id = Reader.GetInt32(0);
    Simple.Name = Reader.GetString(1);
    if (Reader.FieldCount > 2)Simple.Brand = (Reader.IsDBNull(2)) ? "" : Reader.GetString(2);
if (Reader.FieldCount > 3)Simple.Model = (Reader.IsDBNull(3)) ? "" : Reader.GetString(3);
if (Reader.FieldCount > 4)Simple.Year = (Reader.IsDBNull(4)) ? 0 : Reader.GetInt32(4);
if (Reader.FieldCount > 5)Simple.Domain = (Reader.IsDBNull(5)) ? "" : Reader.GetString(5);
if (Reader.FieldCount > 6)Simple.Colour = (Reader.IsDBNull(6)) ? "" : Reader.GetString(6);
if (Reader.FieldCount > 7)Simple.VehicleType = (Reader.IsDBNull(7)) ? "" : Reader.GetString(7);
if (Reader.FieldCount > 8)Simple.Photo = (Reader.IsDBNull(8)) ? "" : Reader.GetString(8);
if (Reader.FieldCount > 9)Simple.PhotoType = (Reader.IsDBNull(9)) ? "" : Reader.GetString(9);
if (Reader.FieldCount > 10)Simple.VehicleBrand = (Reader.IsDBNull(10)) ? 0 : Reader.GetInt32(10);
if (Reader.FieldCount > 11)Simple.VehicleModel = (Reader.IsDBNull(11)) ? 0 : Reader.GetInt32(11);
if (Reader.FieldCount > 12)Simple.OwnerTypeId = (Reader.IsDBNull(12)) ? 0 : Reader.GetInt32(12);
if (Reader.FieldCount > 13)Simple.OwnerId = (Reader.IsDBNull(13)) ? 0 : Reader.GetInt32(13);
if (Reader.FieldCount > 14)Simple.DriverTypeId = (Reader.IsDBNull(14)) ? 0 : Reader.GetInt32(14);
if (Reader.FieldCount > 15)Simple.DriverId = (Reader.IsDBNull(15)) ? 0 : Reader.GetInt32(15);
if (Reader.FieldCount > 16)Simple.SIM1 = (Reader.IsDBNull(16)) ? "" : Reader.GetString(16);
if (Reader.FieldCount > 17)Simple.CompaniaSIM1 = (Reader.IsDBNull(17)) ? "" : Reader.GetString(17);
if (Reader.FieldCount > 18)Simple.SIM2 = (Reader.IsDBNull(18)) ? "" : Reader.GetString(18);
if (Reader.FieldCount > 19)Simple.CompaniaSIM2 = (Reader.IsDBNull(19)) ? "" : Reader.GetString(19);
if (Reader.FieldCount > 20)Simple.NroMotor = (Reader.IsDBNull(20)) ? "" : Reader.GetString(20);
if (Reader.FieldCount > 21)Simple.NroChasis = (Reader.IsDBNull(21)) ? "" : Reader.GetString(21);
if (Reader.FieldCount > 22)Simple.PersonaDNI = (Reader.IsDBNull(22)) ? "" : Reader.GetString(22);
if (Reader.FieldCount > 23)Simple.PersonaGenero = (Reader.IsDBNull(23)) ? "" : Reader.GetString(23);
if (Reader.FieldCount > 24)Simple.PersonaFechaNacimiento  = (Reader.IsDBNull(24)) ? new DateTime(1,1,1) : Reader.GetDateTime(24);
if (Reader.FieldCount > 25)Simple.MascotaRaza = (Reader.IsDBNull(25)) ? "" : Reader.GetString(25);
if (Reader.FieldCount > 26)Simple.MascotaFechaNacimiento = (Reader.IsDBNull(26)) ? new DateTime(1,1,1) : Reader.GetDateTime(26);
if (Reader.FieldCount > 27)Simple.MascotaGenero = (Reader.IsDBNull(27)) ? "" : Reader.GetString(27);
if (Reader.FieldCount > 28)Simple.MascotaColor = (Reader.IsDBNull(28)) ? "" : Reader.GetString(28);
if (Reader.FieldCount > 29)Simple.OtroTextolibre = (Reader.IsDBNull(29)) ? "" : Reader.GetString(29);
if (Reader.FieldCount > 30)Simple.MaxSpeed = (Reader.IsDBNull(30)) ? 0 : Reader.GetInt32(30);
if (Reader.FieldCount > 31)Simple.Odometer = (Reader.IsDBNull(31)) ? 0 : Reader.GetInt32(31);
if (Reader.FieldCount > 32)Simple.OdometerDate = (Reader.IsDBNull(32)) ? new DateTime(1,1,1) : Reader.GetDateTime(32);
if (Reader.FieldCount > 33)Simple.ParkingLot = (Reader.IsDBNull(33)) ? false : Reader.GetBoolean(33);


    Simple.CallerObject = Object.GetCallerObject();
    Simple.CallerObject.Relation = new RelationHelper(this.Security.SqlConfig).GetValuesWithRelation(Object, Simple);

    Collection.Add(Simple);
    }
    return Collection;
    }
    }
   ///<summary>
     ///Searchs objects using Name   
     ///</summary>
    public DataTable GetDataByName(string Name, TaxonomyCollection Taxonomies, int PageCount, int PagePresent, ref int PageTotal, ref int RowTotal)
    {
    return GetDataByName(Name, Taxonomies, PageCount, PagePresent, "Id", ref PageTotal, ref RowTotal);
    }

     ///<summary>
     ///Searchs objects using Name   
     ///</summary>
    public DataTable GetDataByName(string Name, TaxonomyCollection Taxonomies, int PageCount, int PagePresent, string OrderBy, ref int PageTotal, ref int RowTotal)
    {
    base.Load();
    DataTable Data = new DataTable("Object");

    using (var conn = new SqlConnection(_ConnectionString))
    using (var CmdDataByName = new SqlCommand("DispositivoMovilByName", conn))
    using (var Adapter = new SqlDataAdapter(CmdDataByName))
    {
    // Search By Name
    CmdDataByName.CommandType = CommandType.StoredProcedure;
    CmdDataByName.Parameters.Add(new SqlParameter("@Name", SqlDbType.NVarChar));
    CmdDataByName.Parameters.Add(new SqlParameter("@Taxonomies", SqlDbType.NVarChar));
    CmdDataByName.Parameters.Add(new SqlParameter("@PageCount", SqlDbType.Int));
    CmdDataByName.Parameters.Add(new SqlParameter("@PagePresent", SqlDbType.Int));
    CmdDataByName.Parameters.Add(new SqlParameter("@PageTotal", SqlDbType.Int));
    CmdDataByName.Parameters.Add(new SqlParameter("@RowTotal", SqlDbType.Int));
    CmdDataByName.Parameters.Add(new SqlParameter("@OrderBy", SqlDbType.NVarChar));
    CmdDataByName.Parameters["@PageTotal"].Direction = ParameterDirection.Output;
    CmdDataByName.Parameters["@RowTotal"].Direction = ParameterDirection.Output;

    CmdDataByName.Parameters["@Name"].Value = Name;
    CmdDataByName.Parameters["@Taxonomies"].Value = Taxonomies.GetTaxnonomiesByChecked();
    CmdDataByName.Parameters["@PageCount"].Value = PageCount;
    CmdDataByName.Parameters["@PagePresent"].Value = PagePresent;
    CmdDataByName.Parameters["@PageTotal"].Value = PageTotal;
    CmdDataByName.Parameters["@RowTotal"].Value = RowTotal;
    CmdDataByName.Parameters["@OrderBy"].Value = OrderBy;


    conn.Open();
    Adapter.Fill(Data);

    if (CmdDataByName.Parameters["@PageTotal"].Value != DBNull.Value)
    PageTotal = int.Parse(CmdDataByName.Parameters["@PageTotal"].Value.ToString());

    if (CmdDataByName.Parameters["@RowTotal"].Value != DBNull.Value)
    RowTotal = int.Parse(CmdDataByName.Parameters["@RowTotal"].Value.ToString());

    conn.Close();
    return Data;
    }
    }
     ///<summary>
     ///Gets object by name including its children   
     ///</summary>
    public DataTable GetDataByNameWithChild(string Name, TaxonomyCollection Taxonomies, SimpleBaseObject FilterChildObject, int PageCount, int PagePresent, ref int PageTotal, ref int RowTotal)
    {
    base.Load();
    DataTable Data = new DataTable("Object");

    using(var conn = new SqlConnection(_ConnectionString))
    using(var CmdDataByNameWithChild = new SqlCommand("DispositivoMovilByNameWithChild", conn))
    using(var Adapter = new SqlDataAdapter(CmdDataByNameWithChild))
    {
    // Search By Name Whit Child
    CmdDataByNameWithChild.CommandType = CommandType.StoredProcedure;
    CmdDataByNameWithChild.Parameters.Add(new SqlParameter("@Name", SqlDbType.NVarChar));
    CmdDataByNameWithChild.Parameters.Add(new SqlParameter("@Taxonomies", SqlDbType.NVarChar));
    CmdDataByNameWithChild.Parameters.Add(new SqlParameter("@PageCount", SqlDbType.Int));
    CmdDataByNameWithChild.Parameters.Add(new SqlParameter("@PagePresent", SqlDbType.Int));
    CmdDataByNameWithChild.Parameters.Add(new SqlParameter("@PageTotal", SqlDbType.Int));
    CmdDataByNameWithChild.Parameters.Add(new SqlParameter("@RowTotal", SqlDbType.Int));
    CmdDataByNameWithChild.Parameters.Add(new SqlParameter("@ObjectType", SqlDbType.NVarChar));
    CmdDataByNameWithChild.Parameters.Add(new SqlParameter("@ObjectId", SqlDbType.Int));
    CmdDataByNameWithChild.Parameters["@PageTotal"].Direction = ParameterDirection.Output;
    CmdDataByNameWithChild.Parameters["@RowTotal"].Direction = ParameterDirection.Output;

    CmdDataByNameWithChild.Parameters["@Name"].Value = Name;
    CmdDataByNameWithChild.Parameters["@Taxonomies"].Value = Taxonomies.GetTaxnonomiesByChecked();

    CmdDataByNameWithChild.Parameters["@ObjectType"].Value = FilterChildObject.Type.Name ;
    CmdDataByNameWithChild.Parameters["@ObjectId"].Value = FilterChildObject.Id ;

    CmdDataByNameWithChild.Parameters["@PageCount"].Value = PageCount;
    CmdDataByNameWithChild.Parameters["@PagePresent"].Value = PagePresent;
    CmdDataByNameWithChild.Parameters["@PageTotal"].Value = PageTotal;
    CmdDataByNameWithChild.Parameters["@RowTotal"].Value = RowTotal;


    conn.Open();
    Adapter.Fill(Data);

    if (CmdDataByNameWithChild.Parameters["@PageTotal"].Value != DBNull.Value)
    PageTotal = int.Parse(CmdDataByNameWithChild.Parameters["@PageTotal"].Value.ToString());

    if (CmdDataByNameWithChild.Parameters["@RowTotal"].Value != DBNull.Value)
    RowTotal = int.Parse(CmdDataByNameWithChild.Parameters["@RowTotal"].Value.ToString());

    conn.Close();
    return Data;
    }
    }
     ///<summary>
     ///Gets object data with parent   
     ///</summary>
    public DataTable GetDataByNameWithParent(string Name, TaxonomyCollection Taxonomies, SimpleBaseObject FilterParentObject, int PageCount, int PagePresent, ref int PageTotal, ref int RowTotal)
    {
    base.Load();
    DataTable Data = new DataTable("Object");

    using(var conn = new SqlConnection(_ConnectionString))
    using(var CmdDataByNameWithParent = new SqlCommand("DispositivoMovilByNameWithParent", conn))
    using(var Adapter = new SqlDataAdapter(CmdDataByNameWithParent))
    {
    // Search By Name Whit Parent
    CmdDataByNameWithParent.CommandType = CommandType.StoredProcedure;
    CmdDataByNameWithParent.Parameters.Add(new SqlParameter("@Name", SqlDbType.NVarChar));
    CmdDataByNameWithParent.Parameters.Add(new SqlParameter("@Taxonomies", SqlDbType.NVarChar));
    CmdDataByNameWithParent.Parameters.Add(new SqlParameter("@PageCount", SqlDbType.Int));
    CmdDataByNameWithParent.Parameters.Add(new SqlParameter("@PagePresent", SqlDbType.Int));
    CmdDataByNameWithParent.Parameters.Add(new SqlParameter("@PageTotal", SqlDbType.Int));
    CmdDataByNameWithParent.Parameters.Add(new SqlParameter("@RowTotal", SqlDbType.Int));
    CmdDataByNameWithParent.Parameters.Add(new SqlParameter("@ObjectType", SqlDbType.NVarChar));
    CmdDataByNameWithParent.Parameters.Add(new SqlParameter("@ObjectId", SqlDbType.Int));
    CmdDataByNameWithParent.Parameters["@PageTotal"].Direction = ParameterDirection.Output;
    CmdDataByNameWithParent.Parameters["@RowTotal"].Direction = ParameterDirection.Output;

    CmdDataByNameWithParent.Parameters["@Name"].Value = Name;
    CmdDataByNameWithParent.Parameters["@Taxonomies"].Value = Taxonomies.GetTaxnonomiesByChecked();

    CmdDataByNameWithParent.Parameters["@ObjectType"].Value = FilterParentObject.Type.Name ;
    CmdDataByNameWithParent.Parameters["@ObjectId"].Value = FilterParentObject.Id ;

    CmdDataByNameWithParent.Parameters["@PageCount"].Value = PageCount;
    CmdDataByNameWithParent.Parameters["@PagePresent"].Value = PagePresent;
    CmdDataByNameWithParent.Parameters["@PageTotal"].Value = PageTotal;
    CmdDataByNameWithParent.Parameters["@RowTotal"].Value = RowTotal;

    conn.Open();
    Adapter.Fill(Data);

    if (CmdDataByNameWithParent.Parameters["@PageTotal"].Value != DBNull.Value)
    PageTotal = int.Parse(CmdDataByNameWithParent.Parameters["@PageTotal"].Value.ToString());

    if (CmdDataByNameWithParent.Parameters["@RowTotal"].Value != DBNull.Value)
    RowTotal = int.Parse(CmdDataByNameWithParent.Parameters["@RowTotal"].Value.ToString());

    conn.Close();
    return Data;
    }
    }

    public DataTable GetDataByFilter(int Page, int Start, int Limit, string Sort, string Group, string Filter, ref int TotalRows)
    {
    base.Load();

    DataTable Data = new DataTable("Object");
    using( var conn = new SqlConnection(_ConnectionString))
    using (var cmd = new SqlCommand("DispositivoMovilByFilter", conn))
    using (var Adapter = new SqlDataAdapter(cmd))
    {
    cmd.CommandType = CommandType.StoredProcedure;
    cmd.Parameters.AddWithValue("@page", Page);
    cmd.Parameters.AddWithValue("@start", Start);
    cmd.Parameters.AddWithValue("@limit", Limit);
    cmd.Parameters.AddWithValue("@sort", Sort);
    cmd.Parameters.AddWithValue("@group", Group);
    cmd.Parameters.AddWithValue("@filter", Filter);
    cmd.Parameters.Add("@totalrows", SqlDbType.Int).Direction = ParameterDirection.Output;

    Adapter.Fill(Data);
    var v = cmd.Parameters["@totalrows"].Value;
    if (v != null && v != DBNull.Value)
    TotalRows = (int)v;
    }
    return Data;
    }

     ///<summary>
     ///Gets objects using text   
     ///</summary>
    public DataTable GetDataByText(string Text, TaxonomyCollection Taxonomies, int PageCount, int PagePresent, ref int PageTotal, ref int RowTotal)
    {
    base.Load();
    DataTable Data = new DataTable("Object");
    using(var conn = new SqlConnection(_ConnectionString))
    using(var CmdDataByText = new SqlCommand("DispositivoMovilByText", conn))
    using(var Adapter = new SqlDataAdapter(CmdDataByText))
    {

    CmdDataByText.CommandType = CommandType.StoredProcedure;
    CmdDataByText.Parameters.Add(new SqlParameter("@Text", SqlDbType.NVarChar));
    CmdDataByText.Parameters.Add(new SqlParameter("@Taxonomies", SqlDbType.NVarChar));
    CmdDataByText.Parameters.Add(new SqlParameter("@PageCount", SqlDbType.Int));
    CmdDataByText.Parameters.Add(new SqlParameter("@PagePresent", SqlDbType.Int));
    CmdDataByText.Parameters.Add(new SqlParameter("@PageTotal", SqlDbType.Int));
    CmdDataByText.Parameters.Add(new SqlParameter("@RowTotal", SqlDbType.Int));
    CmdDataByText.Parameters["@PageTotal"].Direction = ParameterDirection.Output;
    CmdDataByText.Parameters["@RowTotal"].Direction = ParameterDirection.Output;

    CmdDataByText.Parameters["@Text"].Value = Text;
    CmdDataByText.Parameters["@Taxonomies"].Value = Taxonomies.GetTaxnonomiesByChecked();
    CmdDataByText.Parameters["@PageCount"].Value = PageCount;
    CmdDataByText.Parameters["@PagePresent"].Value = PagePresent;
    CmdDataByText.Parameters["@PageTotal"].Value = PageTotal;
    CmdDataByText.Parameters["@RowTotal"].Value = RowTotal;

    conn.Open();
    Adapter.Fill(Data);

    if (CmdDataByText.Parameters["@PageTotal"].Value != DBNull.Value)
    PageTotal = int.Parse(CmdDataByText.Parameters["@PageTotal"].Value.ToString());

    if (CmdDataByText.Parameters["@RowTotal"].Value != DBNull.Value)
    RowTotal = int.Parse(CmdDataByText.Parameters["@RowTotal"].Value.ToString());

    conn.Close();
    return Data;
    }
    }
     ///<summary>
     ///Load object using its simpleObject representation   
     ///</summary>
    public DataTable GetDataBySimpleObject(SimpleDispositivoMovil Simple, TaxonomyCollection Taxonomies, int PageCount, int PagePresent, ref int PageTotal, ref int RowTotal)
    {
    base.Load();
    using(var conn = new SqlConnection(_ConnectionString))
    using(var cmd = new SqlCommand("DispositivoMovilBySimpleDispositivoMovil", conn))
    using(var Adapter = new SqlDataAdapter(cmd))
    {
    cmd.CommandType = CommandType.StoredProcedure;
    cmd.Parameters.Add(new SqlParameter("@Name", SqlDbType.NVarChar));
    cmd.Parameters.Add(new SqlParameter("@Taxonomies", SqlDbType.NVarChar));
    cmd.Parameters.Add(new SqlParameter("@Brand", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@Model", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@Year", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@Domain", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@Colour", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@VehicleType", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@Photo", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@PhotoType", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@VehicleBrand", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@VehicleModel", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@OwnerTypeId", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@OwnerId", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@DriverTypeId", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@DriverId", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@SIM1", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@CompaniaSIM1", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@SIM2", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@CompaniaSIM2", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@NroMotor", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@NroChasis", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@PersonaDNI", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@PersonaGenero", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@PersonaFechaNacimiento ", SqlDbType.DateTime));cmd.Parameters.Add(new SqlParameter("@MascotaRaza", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@MascotaFechaNacimiento", SqlDbType.DateTime));cmd.Parameters.Add(new SqlParameter("@MascotaGenero", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@MascotaColor", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@OtroTextolibre", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@MaxSpeed", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@Odometer", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@OdometerDate", SqlDbType.DateTime));cmd.Parameters.Add(new SqlParameter("@ParkingLot", SqlDbType.Bit));
    cmd.Parameters.Add(new SqlParameter("@PageCount", SqlDbType.Int));
    cmd.Parameters.Add(new SqlParameter("@PagePresent", SqlDbType.Int));
    cmd.Parameters.Add(new SqlParameter("@PageTotal", SqlDbType.Int));
    cmd.Parameters.Add(new SqlParameter("@RowTotal", SqlDbType.Int));
    cmd.Parameters["@PageTotal"].Direction = ParameterDirection.Output;
    cmd.Parameters["@RowTotal"].Direction = ParameterDirection.Output;


    DataTable Data = new DataTable("Object");

    cmd.Parameters["@Name"].Value = Simple.Name;

    cmd.Parameters["@Taxonomies"].Value = Taxonomies.GetTaxnonomiesByChecked();
    
		cmd.Parameters["@Brand"].Value = (this._Brand == null) ? (object) DBNull.Value : (object) this._Brand;

		cmd.Parameters["@Model"].Value = (this._Model == null) ? (object) DBNull.Value : (object) this._Model;

		cmd.Parameters["@Year"].Value = this._Year;

		cmd.Parameters["@Domain"].Value = (this._Domain == null) ? (object) DBNull.Value : (object) this._Domain;

		cmd.Parameters["@Colour"].Value = (this._Colour == null) ? (object) DBNull.Value : (object) this._Colour;

		cmd.Parameters["@VehicleType"].Value = (this._VehicleType == null) ? (object) DBNull.Value : (object) this._VehicleType;

		cmd.Parameters["@Photo"].Value = (this._Photo == null) ? (object) DBNull.Value : (object) this._Photo;

		cmd.Parameters["@PhotoType"].Value = (this._PhotoType == null) ? (object) DBNull.Value : (object) this._PhotoType;

		cmd.Parameters["@VehicleBrand"].Value = this._VehicleBrand;

		cmd.Parameters["@VehicleModel"].Value = this._VehicleModel;

		cmd.Parameters["@OwnerTypeId"].Value = this._OwnerTypeId;

		cmd.Parameters["@OwnerId"].Value = this._OwnerId;

		cmd.Parameters["@DriverTypeId"].Value = this._DriverTypeId;

		cmd.Parameters["@DriverId"].Value = this._DriverId;

		cmd.Parameters["@SIM1"].Value = (this._SIM1 == null) ? (object) DBNull.Value : (object) this._SIM1;

		cmd.Parameters["@CompaniaSIM1"].Value = (this._CompaniaSIM1 == null) ? (object) DBNull.Value : (object) this._CompaniaSIM1;

		cmd.Parameters["@SIM2"].Value = (this._SIM2 == null) ? (object) DBNull.Value : (object) this._SIM2;

		cmd.Parameters["@CompaniaSIM2"].Value = (this._CompaniaSIM2 == null) ? (object) DBNull.Value : (object) this._CompaniaSIM2;

		cmd.Parameters["@NroMotor"].Value = (this._NroMotor == null) ? (object) DBNull.Value : (object) this._NroMotor;

		cmd.Parameters["@NroChasis"].Value = (this._NroChasis == null) ? (object) DBNull.Value : (object) this._NroChasis;

		cmd.Parameters["@PersonaDNI"].Value = (this._PersonaDNI == null) ? (object) DBNull.Value : (object) this._PersonaDNI;

		cmd.Parameters["@PersonaGenero"].Value = (this._PersonaGenero == null) ? (object) DBNull.Value : (object) this._PersonaGenero;

		cmd.Parameters["@PersonaFechaNacimiento "].Value = (this._PersonaFechaNacimiento  == new DateTime(1,1,1)) ? (object) DBNull.Value : (object) this._PersonaFechaNacimiento ;

		cmd.Parameters["@MascotaRaza"].Value = (this._MascotaRaza == null) ? (object) DBNull.Value : (object) this._MascotaRaza;

		cmd.Parameters["@MascotaFechaNacimiento"].Value = (this._MascotaFechaNacimiento == new DateTime(1,1,1)) ? (object) DBNull.Value : (object) this._MascotaFechaNacimiento;

		cmd.Parameters["@MascotaGenero"].Value = (this._MascotaGenero == null) ? (object) DBNull.Value : (object) this._MascotaGenero;

		cmd.Parameters["@MascotaColor"].Value = (this._MascotaColor == null) ? (object) DBNull.Value : (object) this._MascotaColor;

		cmd.Parameters["@OtroTextolibre"].Value = (this._OtroTextolibre == null) ? (object) DBNull.Value : (object) this._OtroTextolibre;

		cmd.Parameters["@MaxSpeed"].Value = this._MaxSpeed;

		cmd.Parameters["@Odometer"].Value = this._Odometer;

		cmd.Parameters["@OdometerDate"].Value = (this._OdometerDate == new DateTime(1,1,1)) ? (object) DBNull.Value : (object) this._OdometerDate;

		cmd.Parameters["@ParkingLot"].Value = this._ParkingLot;


    cmd.Parameters["@PageCount"].Value = PageCount;
    cmd.Parameters["@PagePresent"].Value = PagePresent;
    cmd.Parameters["@PageTotal"].Value = PageTotal;
    cmd.Parameters["@RowTotal"].Value = RowTotal;

    conn.Open();
    Adapter.Fill(Data);

    if (cmd.Parameters["@PageTotal"].Value != DBNull.Value)
    PageTotal = int.Parse(cmd.Parameters["@PageTotal"].Value.ToString());

    if (cmd.Parameters["@RowTotal"].Value != DBNull.Value)
    RowTotal = int.Parse(cmd.Parameters["@RowTotal"].Value.ToString());

    conn.Close();
    return Data;
    }
    }
   ///<summary>
     ///Get by child
     ///</summary>
		 
		public IEnumerable<SimpleDispositivoMovil> GetByChild(string ObjectType, int ObjectId)
		{
			base.Load();
			
			using(var conn = new SqlConnection(_ConnectionString))
			using(var Cmd = new SqlCommand("DispositivoMovilByParentObject", conn))
			{
				conn.Open();
				Cmd.CommandType = CommandType.StoredProcedure;
				Cmd.Parameters.Add(new SqlParameter("@ObjectType", SqlDbType.NVarChar)).Value = ObjectType;
				Cmd.Parameters.Add(new SqlParameter("@Id", SqlDbType.Int)).Value = ObjectId;
				using(var Reader = Cmd.ExecuteReader())
				while(Reader.Read())
				{
				SimpleDispositivoMovil Simple = new SimpleDispositivoMovil();
    Simple.Id = Reader.GetInt32(0);
    Simple.Name = Reader.GetString(1);
    if (Reader.FieldCount > 2)Simple.Brand = (Reader.IsDBNull(2)) ? "" : Reader.GetString(2);
if (Reader.FieldCount > 3)Simple.Model = (Reader.IsDBNull(3)) ? "" : Reader.GetString(3);
if (Reader.FieldCount > 4)Simple.Year = (Reader.IsDBNull(4)) ? 0 : Reader.GetInt32(4);
if (Reader.FieldCount > 5)Simple.Domain = (Reader.IsDBNull(5)) ? "" : Reader.GetString(5);
if (Reader.FieldCount > 6)Simple.Colour = (Reader.IsDBNull(6)) ? "" : Reader.GetString(6);
if (Reader.FieldCount > 7)Simple.VehicleType = (Reader.IsDBNull(7)) ? "" : Reader.GetString(7);
if (Reader.FieldCount > 8)Simple.Photo = (Reader.IsDBNull(8)) ? "" : Reader.GetString(8);
if (Reader.FieldCount > 9)Simple.PhotoType = (Reader.IsDBNull(9)) ? "" : Reader.GetString(9);
if (Reader.FieldCount > 10)Simple.VehicleBrand = (Reader.IsDBNull(10)) ? 0 : Reader.GetInt32(10);
if (Reader.FieldCount > 11)Simple.VehicleModel = (Reader.IsDBNull(11)) ? 0 : Reader.GetInt32(11);
if (Reader.FieldCount > 12)Simple.OwnerTypeId = (Reader.IsDBNull(12)) ? 0 : Reader.GetInt32(12);
if (Reader.FieldCount > 13)Simple.OwnerId = (Reader.IsDBNull(13)) ? 0 : Reader.GetInt32(13);
if (Reader.FieldCount > 14)Simple.DriverTypeId = (Reader.IsDBNull(14)) ? 0 : Reader.GetInt32(14);
if (Reader.FieldCount > 15)Simple.DriverId = (Reader.IsDBNull(15)) ? 0 : Reader.GetInt32(15);
if (Reader.FieldCount > 16)Simple.SIM1 = (Reader.IsDBNull(16)) ? "" : Reader.GetString(16);
if (Reader.FieldCount > 17)Simple.CompaniaSIM1 = (Reader.IsDBNull(17)) ? "" : Reader.GetString(17);
if (Reader.FieldCount > 18)Simple.SIM2 = (Reader.IsDBNull(18)) ? "" : Reader.GetString(18);
if (Reader.FieldCount > 19)Simple.CompaniaSIM2 = (Reader.IsDBNull(19)) ? "" : Reader.GetString(19);
if (Reader.FieldCount > 20)Simple.NroMotor = (Reader.IsDBNull(20)) ? "" : Reader.GetString(20);
if (Reader.FieldCount > 21)Simple.NroChasis = (Reader.IsDBNull(21)) ? "" : Reader.GetString(21);
if (Reader.FieldCount > 22)Simple.PersonaDNI = (Reader.IsDBNull(22)) ? "" : Reader.GetString(22);
if (Reader.FieldCount > 23)Simple.PersonaGenero = (Reader.IsDBNull(23)) ? "" : Reader.GetString(23);
if (Reader.FieldCount > 24)Simple.PersonaFechaNacimiento  = (Reader.IsDBNull(24)) ? new DateTime(1,1,1) : Reader.GetDateTime(24);
if (Reader.FieldCount > 25)Simple.MascotaRaza = (Reader.IsDBNull(25)) ? "" : Reader.GetString(25);
if (Reader.FieldCount > 26)Simple.MascotaFechaNacimiento = (Reader.IsDBNull(26)) ? new DateTime(1,1,1) : Reader.GetDateTime(26);
if (Reader.FieldCount > 27)Simple.MascotaGenero = (Reader.IsDBNull(27)) ? "" : Reader.GetString(27);
if (Reader.FieldCount > 28)Simple.MascotaColor = (Reader.IsDBNull(28)) ? "" : Reader.GetString(28);
if (Reader.FieldCount > 29)Simple.OtroTextolibre = (Reader.IsDBNull(29)) ? "" : Reader.GetString(29);
if (Reader.FieldCount > 30)Simple.MaxSpeed = (Reader.IsDBNull(30)) ? 0 : Reader.GetInt32(30);
if (Reader.FieldCount > 31)Simple.Odometer = (Reader.IsDBNull(31)) ? 0 : Reader.GetInt32(31);
if (Reader.FieldCount > 32)Simple.OdometerDate = (Reader.IsDBNull(32)) ? new DateTime(1,1,1) : Reader.GetDateTime(32);
if (Reader.FieldCount > 33)Simple.ParkingLot = (Reader.IsDBNull(33)) ? false : Reader.GetBoolean(33);

    yield return Simple;
    }
    }
    }
   ///<summary>
     ///Get by parent
     ///</summary>
		 
		public IEnumerable<SimpleDispositivoMovil> GetByParent(string ObjectType, int ObjectId)
		{
			base.Load();
			using(var conn = new SqlConnection(_ConnectionString))
			using(var Cmd = new SqlCommand("DispositivoMovilByChildObject", conn))
			{
				conn.Open();
				Cmd.CommandType = CommandType.StoredProcedure;
				Cmd.Parameters.Add(new SqlParameter("@ObjectType", SqlDbType.NVarChar)).Value = ObjectType;
				Cmd.Parameters.Add(new SqlParameter("@Id", SqlDbType.Int)).Value = ObjectId;
				using(var Reader = Cmd.ExecuteReader())
				while(Reader.Read())
				{
				SimpleDispositivoMovil Simple = new SimpleDispositivoMovil();
    Simple.Id = Reader.GetInt32(0);
    Simple.Name = Reader.GetString(1);
    if (Reader.FieldCount > 2)Simple.Brand = (Reader.IsDBNull(2)) ? "" : Reader.GetString(2);
if (Reader.FieldCount > 3)Simple.Model = (Reader.IsDBNull(3)) ? "" : Reader.GetString(3);
if (Reader.FieldCount > 4)Simple.Year = (Reader.IsDBNull(4)) ? 0 : Reader.GetInt32(4);
if (Reader.FieldCount > 5)Simple.Domain = (Reader.IsDBNull(5)) ? "" : Reader.GetString(5);
if (Reader.FieldCount > 6)Simple.Colour = (Reader.IsDBNull(6)) ? "" : Reader.GetString(6);
if (Reader.FieldCount > 7)Simple.VehicleType = (Reader.IsDBNull(7)) ? "" : Reader.GetString(7);
if (Reader.FieldCount > 8)Simple.Photo = (Reader.IsDBNull(8)) ? "" : Reader.GetString(8);
if (Reader.FieldCount > 9)Simple.PhotoType = (Reader.IsDBNull(9)) ? "" : Reader.GetString(9);
if (Reader.FieldCount > 10)Simple.VehicleBrand = (Reader.IsDBNull(10)) ? 0 : Reader.GetInt32(10);
if (Reader.FieldCount > 11)Simple.VehicleModel = (Reader.IsDBNull(11)) ? 0 : Reader.GetInt32(11);
if (Reader.FieldCount > 12)Simple.OwnerTypeId = (Reader.IsDBNull(12)) ? 0 : Reader.GetInt32(12);
if (Reader.FieldCount > 13)Simple.OwnerId = (Reader.IsDBNull(13)) ? 0 : Reader.GetInt32(13);
if (Reader.FieldCount > 14)Simple.DriverTypeId = (Reader.IsDBNull(14)) ? 0 : Reader.GetInt32(14);
if (Reader.FieldCount > 15)Simple.DriverId = (Reader.IsDBNull(15)) ? 0 : Reader.GetInt32(15);
if (Reader.FieldCount > 16)Simple.SIM1 = (Reader.IsDBNull(16)) ? "" : Reader.GetString(16);
if (Reader.FieldCount > 17)Simple.CompaniaSIM1 = (Reader.IsDBNull(17)) ? "" : Reader.GetString(17);
if (Reader.FieldCount > 18)Simple.SIM2 = (Reader.IsDBNull(18)) ? "" : Reader.GetString(18);
if (Reader.FieldCount > 19)Simple.CompaniaSIM2 = (Reader.IsDBNull(19)) ? "" : Reader.GetString(19);
if (Reader.FieldCount > 20)Simple.NroMotor = (Reader.IsDBNull(20)) ? "" : Reader.GetString(20);
if (Reader.FieldCount > 21)Simple.NroChasis = (Reader.IsDBNull(21)) ? "" : Reader.GetString(21);
if (Reader.FieldCount > 22)Simple.PersonaDNI = (Reader.IsDBNull(22)) ? "" : Reader.GetString(22);
if (Reader.FieldCount > 23)Simple.PersonaGenero = (Reader.IsDBNull(23)) ? "" : Reader.GetString(23);
if (Reader.FieldCount > 24)Simple.PersonaFechaNacimiento  = (Reader.IsDBNull(24)) ? new DateTime(1,1,1) : Reader.GetDateTime(24);
if (Reader.FieldCount > 25)Simple.MascotaRaza = (Reader.IsDBNull(25)) ? "" : Reader.GetString(25);
if (Reader.FieldCount > 26)Simple.MascotaFechaNacimiento = (Reader.IsDBNull(26)) ? new DateTime(1,1,1) : Reader.GetDateTime(26);
if (Reader.FieldCount > 27)Simple.MascotaGenero = (Reader.IsDBNull(27)) ? "" : Reader.GetString(27);
if (Reader.FieldCount > 28)Simple.MascotaColor = (Reader.IsDBNull(28)) ? "" : Reader.GetString(28);
if (Reader.FieldCount > 29)Simple.OtroTextolibre = (Reader.IsDBNull(29)) ? "" : Reader.GetString(29);
if (Reader.FieldCount > 30)Simple.MaxSpeed = (Reader.IsDBNull(30)) ? 0 : Reader.GetInt32(30);
if (Reader.FieldCount > 31)Simple.Odometer = (Reader.IsDBNull(31)) ? 0 : Reader.GetInt32(31);
if (Reader.FieldCount > 32)Simple.OdometerDate = (Reader.IsDBNull(32)) ? new DateTime(1,1,1) : Reader.GetDateTime(32);
if (Reader.FieldCount > 33)Simple.ParkingLot = (Reader.IsDBNull(33)) ? false : Reader.GetBoolean(33);

    yield return Simple;
    }
    }
    }
  
    private void InitClass()
    {
    base.Type = new ObjectType(3045, "DispositivoMovil");
    }
  
    private void SetConfig(SqlHelper SqlConfig)
    {
    //Connection
    _ConnectionString = SqlConfig.GetConnString();
    }
  
    private void FillObject(SqlDataReader Reader)
    {
    while(Reader.Read())
    {
    base.Id = Reader.GetInt32(0);
    base.Name = Reader.GetString(1);
    if (Reader.FieldCount > 2)this._Brand = (Reader.IsDBNull(2)) ? "" : Reader.GetString(2);
if (Reader.FieldCount > 3)this._Model = (Reader.IsDBNull(3)) ? "" : Reader.GetString(3);
if (Reader.FieldCount > 4)this._Year = (Reader.IsDBNull(4)) ? 0 : Reader.GetInt32(4);
if (Reader.FieldCount > 5)this._Domain = (Reader.IsDBNull(5)) ? "" : Reader.GetString(5);
if (Reader.FieldCount > 6)this._Colour = (Reader.IsDBNull(6)) ? "" : Reader.GetString(6);
if (Reader.FieldCount > 7)this._VehicleType = (Reader.IsDBNull(7)) ? "" : Reader.GetString(7);
if (Reader.FieldCount > 8)this._Photo = (Reader.IsDBNull(8)) ? "" : Reader.GetString(8);
if (Reader.FieldCount > 9)this._PhotoType = (Reader.IsDBNull(9)) ? "" : Reader.GetString(9);
if (Reader.FieldCount > 10)this._VehicleBrand = (Reader.IsDBNull(10)) ? 0 : Reader.GetInt32(10);
if (Reader.FieldCount > 11)this._VehicleModel = (Reader.IsDBNull(11)) ? 0 : Reader.GetInt32(11);
if (Reader.FieldCount > 12)this._OwnerTypeId = (Reader.IsDBNull(12)) ? 0 : Reader.GetInt32(12);
if (Reader.FieldCount > 13)this._OwnerId = (Reader.IsDBNull(13)) ? 0 : Reader.GetInt32(13);
if (Reader.FieldCount > 14)this._DriverTypeId = (Reader.IsDBNull(14)) ? 0 : Reader.GetInt32(14);
if (Reader.FieldCount > 15)this._DriverId = (Reader.IsDBNull(15)) ? 0 : Reader.GetInt32(15);
if (Reader.FieldCount > 16)this._SIM1 = (Reader.IsDBNull(16)) ? "" : Reader.GetString(16);
if (Reader.FieldCount > 17)this._CompaniaSIM1 = (Reader.IsDBNull(17)) ? "" : Reader.GetString(17);
if (Reader.FieldCount > 18)this._SIM2 = (Reader.IsDBNull(18)) ? "" : Reader.GetString(18);
if (Reader.FieldCount > 19)this._CompaniaSIM2 = (Reader.IsDBNull(19)) ? "" : Reader.GetString(19);
if (Reader.FieldCount > 20)this._NroMotor = (Reader.IsDBNull(20)) ? "" : Reader.GetString(20);
if (Reader.FieldCount > 21)this._NroChasis = (Reader.IsDBNull(21)) ? "" : Reader.GetString(21);
if (Reader.FieldCount > 22)this._PersonaDNI = (Reader.IsDBNull(22)) ? "" : Reader.GetString(22);
if (Reader.FieldCount > 23)this._PersonaGenero = (Reader.IsDBNull(23)) ? "" : Reader.GetString(23);
if (Reader.FieldCount > 24)this._PersonaFechaNacimiento  = (Reader.IsDBNull(24)) ? new DateTime(1,1,1) : Reader.GetDateTime(24);
if (Reader.FieldCount > 25)this._MascotaRaza = (Reader.IsDBNull(25)) ? "" : Reader.GetString(25);
if (Reader.FieldCount > 26)this._MascotaFechaNacimiento = (Reader.IsDBNull(26)) ? new DateTime(1,1,1) : Reader.GetDateTime(26);
if (Reader.FieldCount > 27)this._MascotaGenero = (Reader.IsDBNull(27)) ? "" : Reader.GetString(27);
if (Reader.FieldCount > 28)this._MascotaColor = (Reader.IsDBNull(28)) ? "" : Reader.GetString(28);
if (Reader.FieldCount > 29)this._OtroTextolibre = (Reader.IsDBNull(29)) ? "" : Reader.GetString(29);
if (Reader.FieldCount > 30)this._MaxSpeed = (Reader.IsDBNull(30)) ? 0 : Reader.GetInt32(30);
if (Reader.FieldCount > 31)this._Odometer = (Reader.IsDBNull(31)) ? 0 : Reader.GetInt32(31);
if (Reader.FieldCount > 32)this._OdometerDate = (Reader.IsDBNull(32)) ? new DateTime(1,1,1) : Reader.GetDateTime(32);
if (Reader.FieldCount > 33)this._ParkingLot = (Reader.IsDBNull(33)) ? false : Reader.GetBoolean(33);

    }
    Reader.Close();
    }
   }
  
    }
  