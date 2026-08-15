CREATE OR ALTER TRIGGER [dbo].[trg_for_cprotocolo] ON [dbo].[m_formatos] INSTEAD OF INSERT
AS 
BEGIN
	SET NOCOUNT ON;
	
	Declare @for_cProtocolo nVarChar(Max) = 
		(
			Select Case 
				When [for_cProtocolo] Is Null Or [for_cProtocolo] = '' 
				Then Substring([for_cdescripcion],0, Charindex(':',[for_cdescripcion])+1) 
				Else [for_cProtocolo] End
			From Inserted
		)

	Insert Into [dbo].[m_formatos] ([for_ccodigo],[for_cdescripcion],[for_cformato],[for_cnombre],[for_calarma],[for_cProtocolo],[for_ckey])
	Select [for_ccodigo],[for_cdescripcion],[for_cformato],[for_cnombre],[for_calarma],@for_cProtocolo,Rtrim([for_cformato])+'|'+Rtrim([for_calarma])+'|'+Rtrim(@for_cProtocolo)
	From Inserted
END