-- =============================================
-- Author:		ROMAN RODRIGO
-- Create date: 29/07/2015
-- Description:	Modifica el id del tecnico por un id de instalador en m_st_cabecera
-- =============================================
CREATE OR ALTER PROCEDURE [dbo].[SERTEC_MIGRA_PASO2]
AS
BEGIN

	SET NOCOUNT ON;

	declare @stc_iid int
	declare @stc_ctecnico_1 char(3)
	declare @stc_ctecnico_2 char(3) 
	declare @stc_ctecnico_3 char(3) 
	declare @stc_ctecnico_4 char(3) 
	declare @stc_ctecnico_5 char(3)
	

	-- preparo el cursor
	DECLARE st_cursor CURSOR FOR 
		SELECT stc_iid, [stc_ctecnico_1],
			[stc_ctecnico_2] ,
			[stc_ctecnico_3],
			[stc_ctecnico_4],
			[stc_ctecnico_5]
		FROM _datos.[dbo].[m_st_cabecera]
	
		OPEN st_cursor

		FETCH NEXT FROM st_cursor INTO @stc_iid,@stc_ctecnico_1, @stc_ctecnico_2,@stc_ctecnico_3,@stc_ctecnico_4,@stc_ctecnico_5

		-- migro id de tecnico a su id de instalador segun la tabla de migraciones
		WHILE @@FETCH_STATUS = 0
		BEGIN
			declare @ins_ctecnico_1 char(3)
			declare @ins_ctecnico_2 char(3) 
			declare @ins_ctecnico_3 char(3) 
			declare @ins_ctecnico_4 char(3) 
			declare @ins_ctecnico_5 char(3)

			-- busco cada id en la tabla de migracion y los guardo
			select @ins_ctecnico_1 = ins_ccodigo from _tablas..SERTEC_MIGRA where tec_ccodigo = @stc_ctecnico_1
			select @ins_ctecnico_2 = ins_ccodigo from _tablas..SERTEC_MIGRA where tec_ccodigo = @stc_ctecnico_2
			select @ins_ctecnico_3 = ins_ccodigo from _tablas..SERTEC_MIGRA where tec_ccodigo = @stc_ctecnico_3
			select @ins_ctecnico_4 = ins_ccodigo from _tablas..SERTEC_MIGRA where tec_ccodigo = @stc_ctecnico_4
			select @ins_ctecnico_5 = ins_ccodigo from _tablas..SERTEC_MIGRA where tec_ccodigo = @stc_ctecnico_5

			set @ins_ctecnico_1 = ISNULL(@ins_ctecnico_1,'');
			set @ins_ctecnico_2 = ISNULL(@ins_ctecnico_2,'');
			set @ins_ctecnico_3 = ISNULL(@ins_ctecnico_3,'');
			set @ins_ctecnico_4 = ISNULL(@ins_ctecnico_4,'');
			set @ins_ctecnico_5 = ISNULL(@ins_ctecnico_5,'');

			-- actualizo los valores en el servicio tecnico
			update _datos.[dbo].[m_st_cabecera] set stc_ctecnico_1=@ins_ctecnico_1,
				stc_ctecnico_2=@ins_ctecnico_2,
				stc_ctecnico_3=@ins_ctecnico_3,
				stc_ctecnico_4=@ins_ctecnico_4,
				stc_ctecnico_5=@ins_ctecnico_5
				where stc_iid = @stc_iid

			FETCH NEXT FROM st_cursor INTO @stc_iid,@stc_ctecnico_1, @stc_ctecnico_2,@stc_ctecnico_3,@stc_ctecnico_4,@stc_ctecnico_5
		END
	CLOSE st_cursor;
	DEALLOCATE st_cursor;
	-- fin cursor




END