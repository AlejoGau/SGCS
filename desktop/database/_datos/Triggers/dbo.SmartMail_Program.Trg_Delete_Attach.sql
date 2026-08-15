CREATE OR ALTER TRIGGER [dbo].[Trg_Delete_Attach] ON dbo.SmartMail_Program AFTER DELETE AS
BEGIN
	Delete From [dbo].[SmartMail_ProgramAttach] Where [ProgramId] IN (Select [Id] From deleted)
END