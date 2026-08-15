CREATE OR ALTER TRIGGER [dbo].[m_st_cabecera_INSERT] 
   ON [dbo].[m_st_cabecera]
   AFTER INSERT
AS 
BEGIN
	SET NOCOUNT ON;

	declare @iservicio int;
	declare @observacion varchar(max);
	declare @iusuario int
	Declare @idCta Int = 0,
			@iNumero Int = 0
	Declare @dfecha_creacion DateTime

	--2024-07-17 Pablo : hace un Join x que sino da error "Cannot use text, ntext, or image columns in the 'inserted' and 'deleted' tables."
	select top 1 @iservicio = c.stc_iid, @observacion = c.stc_mobservaciones ,@iusuario = c.stc_ioperador, @idCta=c.[stc_iid_cuenta], @iNumero=c.[stc_inumero], @dfecha_creacion=c.[stc_dfecha_creacion]
	from m_st_cabecera c inner join inserted i on c.stc_iid = i.stc_iid
	
	Insert Into _datos..SertecTimeLine (stl_iServicio,stl_tFechaHora, stl_cAccion, stl_cObservacion, stl_iUsuarioDSS)
	VALUES (@iservicio,GETDATE(),'ALTA',@observacion, @iusuario)

	Declare @Obs Varchar(50) = 'Orden de Servicio : '+ Cast(@iNumero As VarChar(10))

	Execute _Desktop..AlarmaGenerar @idCta=@idCta, @cAlarma='_NS', @cUser='SoftGuard', @cObservaciones=@Obs, @cContenido='', @idUsuario=0, @fecha=@dfecha_creacion

END