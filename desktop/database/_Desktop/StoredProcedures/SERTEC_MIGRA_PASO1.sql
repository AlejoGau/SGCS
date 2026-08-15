-- =============================================
-- Author:		ROMAN RODRIGO
-- Create date: 28/07/2015
-- Description:	Migra tecnicos a la tabla instaladores
-- =============================================
CREATE OR ALTER PROCEDURE [dbo].[SERTEC_MIGRA_PASO1]
AS
BEGIN

	SET NOCOUNT ON;

    IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[SERTEC_MIGRA]') AND type in (N'U'))
		RAISERROR ('ya se ejecutó la migración.',10,1)

	-- creo la base (el if no hace falta pero lo dejo por si lo necesitamos en otro lado)
	IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[SERTEC_MIGRA]') AND type in (N'U'))
	BEGIN
	CREATE TABLE _tablas.[dbo].[SERTEC_MIGRA](
		tec_ccodigo char(3) NOT NULL,
		ins_ccodigo char(3) NOT NULL,
		[fecha] [datetime]  DEFAULT getdate()
	) ON [PRIMARY]
	END


	declare @tec_ccodigo char(3) 
	declare @tec_cnombre char(30) 
	declare @tec_ctelefono varchar(30) 
	declare @tec_cmail varchar(60) 
	declare @tec_nestado numeric(1, 0)

	-- copio los productos

	insert into _datos..product (Name, Code) select pro_cdescripcion, pro_ccodigo from _tablas..t_productos
	

	-- preparo el cursor
	DECLARE tec_cursor CURSOR FOR 
		SELECT [tec_ccodigo]
			,[tec_cnombre]
			,[tec_ctelefono]
			,[tec_cmail]
			,[tec_nestado]
		FROM [_Tablas].[dbo].[t_tecnicos]
	
		OPEN tec_cursor

		FETCH NEXT FROM tec_cursor INTO @tec_ccodigo, @tec_cnombre,@tec_ctelefono,@tec_cmail,@tec_nestado

		-- migro cada técnico a un instalador y inserto los ids en la tabla de migración.
		WHILE @@FETCH_STATUS = 0
		BEGIN
			declare @ins_ccodigo char(3)
			declare @ins_itipo int = 1
			declare @new int;
			
			-- busco el email en instaladores para saber si ya existe.

			select @new = count(*) from _tablas..t_instaladores where ins_cmail = @tec_cmail and ins_cmail != ''

			if (@new > 0)
			BEGIN
				-- busco el instalador con el mismo mail
				
				select @ins_ccodigo = ins_ccodigo from _tablas..t_instaladores where ins_cmail = @tec_cmail

				print 'se actualiza el instalador ' + @tec_cnombre

				if (@tec_nestado = 0)
				BEGIN
					-- el tecnico estaba dado de baja ajusteo estado
					update _tablas..t_instaladores set ins_iTipo = 3 where ins_ccodigo=@ins_ccodigo
				END
				ELSE
				BEGIN
					-- sumo estado para que sea tecnico + instalador
					update _tablas..t_instaladores set ins_iTipo = 2 where ins_ccodigo=@ins_ccodigo
				END

			END
			ELSE
			BEGIN
				-- inserto el nuevo instalador
				select @ins_ccodigo = right('000'+ convert(varchar, convert(int, MAX(ins_ccodigo)) + 1), 3) from [_tablas]..[t_instaladores]
				Insert into _tablas..t_instaladores ([ins_cempresa],[ins_ccodigo],[ins_cnombre],[ins_ctelefono],[ins_cmail],[ins_iTipo])
				values ( '',@ins_ccodigo, @tec_cnombre, @tec_ctelefono, @tec_cmail, @ins_iTipo)

				print 'se creo el instalador ' + @tec_cnombre
			END

			insert into _tablas.[dbo].[SERTEC_MIGRA] (tec_ccodigo,ins_ccodigo) values (@tec_ccodigo,@ins_ccodigo)
		
			FETCH NEXT FROM tec_cursor INTO @tec_ccodigo, @tec_cnombre,@tec_ctelefono,@tec_cmail,@tec_nestado
		END
	CLOSE tec_cursor;
	DEALLOCATE tec_cursor;
	-- fin cursor




END