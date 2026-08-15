CREATE OR ALTER PROCEDURE [dbo].[auditarProceso]
@idLogin int,
@terminal char(3),
@proceso varchar(50),
@accion char(1),
@app varchar(15)

AS


declare @operador varchar(20)

Select @operador = ope_cLogin FROM s_operadores where ope_iid = @idLogin

INSERT INTO s_auditoria VALUES (@terminal, @idLogin , @operador, getdate(), @proceso, @accion, @app )