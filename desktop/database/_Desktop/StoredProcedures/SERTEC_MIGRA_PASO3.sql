-- =============================================
-- Author:		ROMAN RODRIGO
-- Create date: 30/07/2015
-- Description:	crea una visita con los datos de m_st_cabecera
-- =============================================
CREATE OR ALTER PROCEDURE [dbo].[SERTEC_MIGRA_PASO3]
AS
BEGIN

	SET NOCOUNT ON;

	declare @stc_iid int
	declare @stc_ctecnico_1 char(3)
	declare @stc_dfecha_desde_1 datetime
    declare @stc_dfecha_hasta_1 datetime
	declare @stc_cmovil_1 char(3)
	

	-- preparo el cursor
	DECLARE st_cursor CURSOR FOR 
		SELECT stc_iid, [stc_ctecnico_1],
			stc_dfecha_desde_1 ,
			stc_dfecha_hasta_1,
			stc_cmovil_1
		FROM _datos.[dbo].[m_st_cabecera]
	
		OPEN st_cursor

		FETCH NEXT FROM st_cursor INTO @stc_iid,@stc_ctecnico_1, @stc_dfecha_desde_1,@stc_dfecha_hasta_1,@stc_cmovil_1

		-- creao la visita y los valores asociados
		WHILE @@FETCH_STATUS = 0
		BEGIN
			-- creo la visita
			insert into _datos..sertecvisitas (svi_tfechahora, svi_iestado, svi_iservicio) values(@stc_dfecha_desde_1,1,@stc_iid)
			declare @idVisita int;
			select @idVisita = SCOPE_IDENTITY();

			-- busco el idkey del tecnico
			declare @stv_itecnico int
			select @stv_itecnico = ins_idkey from _tablas..t_instaladores where ins_ccodigo = @stc_ctecnico_1

			-- inserto el tecnico a la visita
			insert into _datos..sertectecnicovisitas (stv_itecnico,stv_ivisita) values (@stv_itecnico,@idVisita)

			-- inserto el movil en la visita
			insert into _datos..SerTecMovilesVisitas (smv_imovil,smv_ivisita) values(CAST(@stc_cmovil_1 AS INT),@idVisita)


			FETCH NEXT FROM st_cursor INTO @stc_iid,@stc_ctecnico_1, @stc_dfecha_desde_1,@stc_dfecha_hasta_1,@stc_cmovil_1
		END
	CLOSE st_cursor;
	DEALLOCATE st_cursor;
	-- fin cursor




END