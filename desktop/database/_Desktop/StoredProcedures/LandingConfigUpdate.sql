CREATE OR ALTER PROCEDURE [dbo].[LandingConfigUpdate]
    @lcfg_cname VarChar(100) = '',
    @lcfg_ccontent VarChar(MAX) = '',
    @lcfg_iid Int = 0
AS
    set noCount on
    DECLARE @Id INT = 0;

    if @lcfg_iid = 0
    BEGIN
        update _datos..LandingConfig set [lcfg_ccontent] = @lcfg_ccontent
        where [lcfg_cname] = @lcfg_cname
    END
    ELSE
    BEGIN
        update _datos..LandingConfig set [lcfg_ccontent] = @lcfg_ccontent
        where [lcfg_iid] = @lcfg_iid
    END
    
    exec LandingConfigSel @Id