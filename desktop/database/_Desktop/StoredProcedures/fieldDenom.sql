--#############################################################################
-- SOFTGUARD DESKTOP
-- updated : 2017-06-15 08:45:36.357 
--#############################################################################
CREATE OR ALTER PROCEDURE [dbo].[fieldDenom]
	@objectName NVARCHAR(255),
	@nodeName NVARCHAR(255),
	@value NVARCHAR(255)
AS
BEGIN
	declare @f_sql NVARCHAR(max);
	declare @f_value NVARCHAR(128);
	declare @out NVARCHAR(max);

	SELECT @f_sql=a.DenormalizationSelect FROM _audit.dbo.AuditDenormalizationConfig a 
	WHERE (a.ObjectName = @objectName and a.FieldName = @nodeName);

	IF @f_sql != ''
		BEGIN
			EXEC sp_executesql @f_sql, 
			N'@value NVARCHAR(128), @out NVARCHAR(max) OUTPUT', 
			@value, 
			@out OUTPUT
		END
	ELSE
		BEGIN
			SET @out = @value
		END

	SELECT @out as value;

END